<?php
declare(strict_types=1);

/**
 * OLGA Dental booking backend, PHP 8.2+.
 *
 * Deploy this file outside public_html at:
 *   ~/olga-clinic-murino.ru/booking-private/bootstrap.php
 *
 * The config.php file is intentionally NOT part of the repository.
 */
function booking_config(): array
{
    static $configuration = null;
    if ($configuration !== null) {
        return $configuration;
    }

    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        throw new RuntimeException('Booking is not configured.');
    }

    $value = require $path;
    if (!is_array($value)) {
        throw new RuntimeException('Invalid booking configuration.');
    }
    foreach (['db_host', 'db_name', 'db_user', 'db_pass', 'encryption_key_b64', 'rate_key_b64', 'admin_password_hash', 'allowed_origins', 'consent_version'] as $key) {
        if (!isset($value[$key])) {
            throw new RuntimeException('Incomplete booking configuration.');
        }
    }
    $configuration = $value;
    return $configuration;
}

function booking_database(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $cfg = booking_config();
    $dsn = 'mysql:host=' . $cfg['db_host'] . ';dbname=' . $cfg['db_name'] . ';charset=utf8mb4';
    $pdo = new PDO($dsn, (string) $cfg['db_user'], (string) $cfg['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 5,
    ]);
    return $pdo;
}

function booking_secret(string $name): string
{
    $configured = booking_config()[$name] ?? '';
    $key = is_string($configured) ? base64_decode($configured, true) : false;
    if ($key === false || strlen($key) !== 32) {
        throw new RuntimeException('Invalid cryptographic configuration.');
    }
    return $key;
}

function booking_encrypt(array $data): string
{
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    $nonce = random_bytes(12);
    $tag = '';
    $ciphertext = openssl_encrypt(
        $json,
        'aes-256-gcm',
        booking_secret('encryption_key_b64'),
        OPENSSL_RAW_DATA,
        $nonce,
        $tag
    );
    if ($ciphertext === false || strlen($tag) !== 16) {
        throw new RuntimeException('Encryption failed.');
    }
    return base64_encode($nonce . $tag . $ciphertext);
}

function booking_decrypt(string $stored): array
{
    $raw = base64_decode($stored, true);
    if ($raw === false || strlen($raw) < 29) {
        throw new RuntimeException('Invalid encrypted record.');
    }
    $value = openssl_decrypt(
        substr($raw, 28),
        'aes-256-gcm',
        booking_secret('encryption_key_b64'),
        OPENSSL_RAW_DATA,
        substr($raw, 0, 12),
        substr($raw, 12, 16)
    );
    if ($value === false) {
        throw new RuntimeException('Record decryption failed.');
    }
    $decoded = json_decode($value, true, 32, JSON_THROW_ON_ERROR);
    if (!is_array($decoded)) {
        throw new RuntimeException('Invalid record.');
    }
    return $decoded;
}

/**
 * Atomic MySQL rate-limit counter. No raw IP address is written to the DB.
 */
function booking_rate_limited(string $category, int $maxCount, int $periodSeconds): bool
{
    $pdo = booking_database();
    $remoteAddress = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $hash = hash_hmac(
        'sha256',
        $category . '|' . $remoteAddress,
        booking_secret('rate_key_b64')
    );

    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare(
            'INSERT INTO booking_rate_limits (ip_hash, window_started, attempts)
             VALUES (:ip_hash, UTC_TIMESTAMP(), 1)
             ON DUPLICATE KEY UPDATE
               attempts = IF(window_started < DATE_SUB(UTC_TIMESTAMP(), INTERVAL ' . (int) $periodSeconds . ' SECOND), 1, attempts + 1),
               window_started = IF(window_started < DATE_SUB(UTC_TIMESTAMP(), INTERVAL ' . (int) $periodSeconds . ' SECOND), UTC_TIMESTAMP(), window_started)'
        );
        $stmt->execute(['ip_hash' => $hash]);

        $check = $pdo->prepare('SELECT attempts FROM booking_rate_limits WHERE ip_hash = :ip_hash FOR UPDATE');
        $check->execute(['ip_hash' => $hash]);
        $attempts = (int) $check->fetchColumn();
        $pdo->commit();

        return $attempts > $maxCount;
    } catch (Throwable $error) {
        $pdo->rollBack();
        throw $error;
    }
}

function booking_reply(int $status, array $payload): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function booking_start_admin_session(): void
{
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'off') {
        http_response_code(403);
        exit('HTTPS required');
    }

    ini_set('session.use_strict_mode', '1');
    session_name('olga_booking_admin');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/clinic-admin',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();

    $now = time();
    if (isset($_SESSION['last_action']) && $now - (int) $_SESSION['last_action'] > 900) {
        $_SESSION = [];
        session_regenerate_id(true);
    }
    $_SESSION['last_action'] = $now;
    $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
}

function booking_html(string $input): string
{
    return htmlspecialchars($input, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
