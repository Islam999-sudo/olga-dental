#!/usr/bin/env python3
"""Synthetic-only real PHP + MySQL integration checks. Never targets a website.

Requires PHP 8.2+ with pdo_mysql and a disposable localhost MySQL/MariaDB DB
named exactly olga_audit_synthetic. Creates/drops tables only in that DB.
PHP_BINARY may point to a local wrapper; OLGA_TEST_DB_PORT defaults to 3306.
The built-in HTTP server binds an ephemeral localhost port, not the network.
"""
import http.client
import json
import os
from pathlib import Path
import re
import shutil
import socket
import subprocess
import tempfile
import time
import urllib.parse
import uuid
import signal
from concurrent.futures import ThreadPoolExecutor

SOURCE = Path(__file__).resolve().parents[1]
PHP = os.environ.get("PHP_BINARY", "php")
# This harness deliberately rewrites its private test config between requests.
# setup-php/CLI OPcache settings must not serve a cached config from another
# scenario. Disable only this test process's opcode cache, including all workers.
PHP_COMMAND = [PHP, "-d", "opcache.enable=0", "-d", "opcache.enable_cli=0"]
PORT = int(os.environ.get("OLGA_TEST_DB_PORT", "3306"))
CHECKS = []


def check(label, condition):
    if not condition:
        raise AssertionError(label)
    CHECKS.append(label)
    print("PASS:", label, flush=True)


with tempfile.TemporaryDirectory(prefix="olga-synthetic-security-") as folder:
    root = Path(folder)
    shutil.copytree(SOURCE / "booking-private", root / "booking-private")
    shutil.copytree(SOURCE / "public_html", root / "public_html")
    (root / "sessions").mkdir()
    configuration = root / "booking-private/config.php"
    # All credentials and records below are synthetic and local to this test.
    config_code = """<?php return [
      'db_host'=>'127.0.0.1;port=%d', 'db_name'=>'olga_audit_synthetic',
      'db_user'=>'synthetic', 'db_pass'=>'synthetic-isolated-only',
      'encryption_key_b64'=>'%s', 'rate_key_b64'=>'%s',
      'admin_password_hash'=>password_hash('synthetic-login-only',PASSWORD_DEFAULT),
      'allowed_origins'=>['https://synthetic.invalid'], 'consent_version'=>'synthetic-test-v1',
      'accept_bookings'=>true, 'admin_enabled'=>true, 'retention_days'=>30,
      'retention_approved'=>true,
    ];"""
    import base64
    config_code = config_code % (PORT, base64.b64encode(os.urandom(32)).decode(), base64.b64encode(os.urandom(32)).decode())
    configuration.write_text(config_code)
    bootstrap = root / "booking-private/bootstrap.php"

    def php_code(code):
        result = subprocess.run([*PHP_COMMAND, "-r", "require " + json.dumps(str(bootstrap)) + ";" + code], check=True, text=True, capture_output=True)
        return result.stdout.strip()

    php_code("$db=booking_database();$db->exec('DROP TABLE IF EXISTS booking_requests');$db->exec('DROP TABLE IF EXISTS booking_rate_limits');$db->exec(file_get_contents(" + json.dumps(str(root / "booking-private/schema.sql")) + "));")
    # Exercise the separate migration on a pre-request_id table as well.
    php_code("$db=booking_database();$db->exec('ALTER TABLE booking_requests DROP INDEX booking_request_id, DROP COLUMN request_id');$db->exec(file_get_contents(" + json.dumps(str(root / "booking-private/migrations/2026-11-idempotency.sql")) + "));")
    check("existing-schema migration applied", php_code("echo booking_database()->query(\"SHOW COLUMNS FROM booking_requests LIKE 'request_id'\")->rowCount();") == "1")
    check("DB session uses UTC", php_code("echo booking_database()->query('SELECT @@session.time_zone')->fetchColumn();") == "+00:00")

    # Test adapter emulates Apache TLS flags only in this temporary test tree.
    router = root / "router.php"
    router.write_text("<?php $_SERVER['HTTPS']=$_SERVER['HTTP_X_TEST_TLS']??'on';$p=parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);if(in_array($p,['/api/booking.php','/clinic-admin/index.php'],true)){require __DIR__.'/public_html'.$p;}else{http_response_code(404);}")
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        http_port = sock.getsockname()[1]
    log = (root / "php.log").open("w+")
    server = subprocess.Popen([*PHP_COMMAND, "-d", "display_errors=0", "-d", "session.save_path=" + str(root / "sessions"), "-S", f"127.0.0.1:{http_port}", str(router)], stdout=log, stderr=log, env={**os.environ, "PHP_CLI_SERVER_WORKERS": "4"}, start_new_session=True)

    def request(path="/api/booking.php", method="POST", body=None, headers=None):
        connection = http.client.HTTPConnection("127.0.0.1", http_port, timeout=5)
        base_headers = {"Content-Type": "application/json", "Origin": "https://synthetic.invalid"}
        base_headers.update(headers or {})
        if isinstance(body, dict):
            body = json.dumps(body, ensure_ascii=False).encode()
        connection.request(method, path, body, base_headers)
        response = connection.getresponse()
        result = (response.status, dict(response.getheaders()), response.read().decode())
        connection.close()
        return result

    def payload(**overrides):
        return {"request_id": str(uuid.uuid4()), "name": "Синтетический Тест", "phone": "+70000000000", "source": "service", "doctor": "", "service": "<script>alert('synthetic')</script>", "consent": True, "consent_version": "synthetic-test-v1", "website": "", **overrides}

    def admin(data=None, cookie="", tls="on"):
        return request("/clinic-admin/index.php", "POST" if data else "GET", urllib.parse.urlencode(data) if data else None, {"Content-Type": "application/x-www-form-urlencoded", "Cookie": cookie, "X-Test-TLS": tls})

    def cookie_of(response):
        return response[1].get("Set-Cookie", "").split(";", 1)[0]

    def csrf_of(response):
        return re.search(r'name="csrf" value="([0-9a-f]+)"', response[2]).group(1)

    try:
        for attempt in range(100):
            try:
                request(method="GET")
                break
            except OSError:
                time.sleep(.05)
        check("method rejected", request(method="GET")[0] == 405)
        check("TLS required", request(body=payload(), headers={"X-Test-TLS": "off"})[0] == 403)
        check("origin rejected", request(body=payload(), headers={"Origin": "https://wrong.invalid"})[0] == 403)
        check("content type rejected", request(body="{}", headers={"Content-Type": "text/plain"})[0] == 415)
        check("oversized payload rejected", request(body="x" * 4097)[0] == 413)
        check("malformed JSON rejected", request(body="{")[0] == 400)
        for label, overrides in [("consent missing", {"consent": False}), ("consent version rejected", {"consent_version": "wrong"}), ("name type rejected", {"name": []}), ("name injection rejected", {"name": "<script>bad</script>"}), ("phone rejected", {"phone": "123"}), ("source rejected", {"source": "wrong"}), ("doctor type rejected", {"doctor": []}), ("honeypot rejected", {"website": "spam"}), ("request ID rejected", {"request_id": "bad"})]:
            check(label, request(body=payload(**overrides))[0] == 400)
        first = payload()
        with ThreadPoolExecutor(max_workers=2) as pool:
            concurrent = list(pool.map(lambda _: request(body=first), range(2)))
        check("concurrent replay creates one request", sorted(item[0] for item in concurrent) == [200, 201])
        response = next(item for item in concurrent if item[0] == 201)
        check("valid request accepted", json.loads(response[2])["success"])
        check("PII absent from response", first["name"] not in response[2] and first["phone"] not in response[2])
        check("identical replay accepted once", request(body=first)[0] == 200 and php_code("echo booking_database()->query('SELECT COUNT(*) FROM booking_requests')->fetchColumn();") == "1")
        check("changed replay rejected", request(body={**first, "name": "Другой Тест"})[0] == 409)
        # Concurrency may consume two counter slots before the unique insert.
        # Reset the counter to test the independent threshold deterministically.
        php_code("booking_database()->exec('DELETE FROM booking_rate_limits');")
        check("fresh requests accepted before limit", all(request(body=payload())[0] == 201 for _ in range(3)))
        limited = request(body=payload())
        check("rate limit enforced", limited[0] == 429 and limited[1].get("Retry-After") == "1800")
        check("replay works despite rate limit", request(body=first)[0] == 200)
        check("stored payload encrypted", php_code("$x=booking_database()->query('SELECT payload_ciphertext FROM booking_requests LIMIT 1')->fetchColumn();echo str_contains($x,'Синтетический')?'bad':'encrypted';") == "encrypted")
        check("admin HTTP rejected", admin(tls="off")[0] == 403)
        anonymous = admin()
        cookie = cookie_of(anonymous)
        check("anonymous sees login, no requests", "Вход для сотрудников" in anonymous[2] and first["name"] not in anonymous[2])
        check("session cookie flags", all(flag in anonymous[1].get("Set-Cookie", "").lower() for flag in ["secure", "httponly", "samesite=strict"]))
        check("CSRF rejected", admin({"action": "login", "password": "synthetic-login-only", "csrf": "bad"}, cookie)[0] == 403)
        csrf = csrf_of(anonymous)
        for attempt in range(9):
            wrong = admin({"action": "login", "password": "wrong", "csrf": csrf}, cookie)
        check("login brute force limited", "Слишком много попыток" in wrong[2])
        php_code("booking_database()->exec('DELETE FROM booking_rate_limits');")
        authenticated = admin({"action": "login", "password": "synthetic-login-only", "csrf": csrf}, cookie)
        new_cookie = cookie_of(authenticated)
        check("successful login rotates session", authenticated[0] == 303 and new_cookie and new_cookie != cookie)
        inbox = admin(cookie=new_cookie)
        check("authorized inbox escapes XSS", first["name"] in inbox[2] and "&lt;script&gt;" in inbox[2] and "<script>" not in inbox[2])
        session_file = root / "sessions" / ("sess_" + new_cookie.split("=", 1)[1])
        session_file.write_text(re.sub(r"last_action\|i:\d+;", "last_action|i:" + str(int(time.time()) - 901) + ";", session_file.read_text()))
        expired = admin(cookie=new_cookie)
        check("idle session expires after 15 minutes", "Вход для сотрудников" in expired[2] and first["name"] not in expired[2])
        renewed = admin({"action": "login", "password": "synthetic-login-only", "csrf": csrf_of(expired)}, cookie_of(expired))
        new_cookie = cookie_of(renewed)
        inbox = admin(cookie=new_cookie)
        logout = admin({"action": "logout", "csrf": csrf_of(inbox)}, new_cookie)
        check("logout invalidates old session", logout[0] == 303 and "Вход для сотрудников" in admin(cookie=new_cookie)[2])
        fresh_login = admin()
        signed_in = admin({"action": "login", "password": "synthetic-login-only", "csrf": csrf_of(fresh_login)}, cookie_of(fresh_login))
        failure_test_cookie = cookie_of(signed_in)
        php_code("booking_database()->exec(\"UPDATE booking_requests SET created_at=DATE_SUB(UTC_TIMESTAMP(),INTERVAL 31 DAY) WHERE id=1\");")
        configuration.write_text(config_code.replace("'accept_bookings'=>true", "'accept_bookings'=>false"))
        cleanup = subprocess.run([*PHP_COMMAND, str(root / "booking-private/maintenance.php")], capture_output=True, text=True)
        check("retention runs while intake paused", cleanup.returncode == 0 and php_code("echo booking_database()->query('SELECT COUNT(*) FROM booking_requests')->fetchColumn();") == "3")
        check("intake flag fails closed", request(body=payload())[0] == 503)
        configuration.write_text(config_code.replace("'admin_enabled'=>true", "'admin_enabled'=>false"))
        check("admin flag fails closed", admin()[0] == 503)
        configuration.write_text(config_code.replace("127.0.0.1;port=" + str(PORT), "127.0.0.1;port=1"))
        failure = request(body=payload())
        check("DB failure is generic 503", failure[0] == 503 and "SQLSTATE" not in failure[2] and "db_pass" not in failure[2])
        inbox_failure = admin(cookie=failure_test_cookie)
        check("admin DB failure is generic", "Не удалось загрузить заявки" in inbox_failure[2] and "SQLSTATE" not in inbox_failure[2] and first["name"] not in inbox_failure[2])
        print(f"PASS: {len(CHECKS)} isolated PHP/MySQL security checks. No production requests.")
    finally:
        configuration.write_text(config_code)
        php_code("booking_database()->exec('DROP TABLE IF EXISTS booking_requests');booking_database()->exec('DROP TABLE IF EXISTS booking_rate_limits');")
        os.killpg(server.pid, signal.SIGTERM)
        server.wait(timeout=5)
        log.close()
