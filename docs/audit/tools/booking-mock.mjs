import { chromium } from "playwright-core";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const root = process.env.REPO_ROOT || "/workspace/olga-dental";
const out = process.env.MOCK_OUT || "/tmp/olga-enabled/out";
const origin = "https://olga-clinic-murino.ru";
const output = process.env.AUDIT_OUTPUT || path.join(root, "docs/audit");
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const evidence = {
  timestamp: new Date().toISOString(),
  browser: await browser.version(),
  origin,
  out,
  networkPolicy:
    "Every HTTP request intercepted; no route.continue used. App static files fulfilled from isolated enabled export. Booking responses synthetic. Production host DNS/network never reached.",
  cases: [],
  unexpected: [],
};
async function run(name, mode, action, { storageUnavailable = false } = {}) {
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    colorScheme: "light",
  });
  await context.addInitScript((storageUnavailable) => {
    if (storageUnavailable) {
      Storage.prototype.getItem = function () {
        throw new DOMException("Storage disabled", "SecurityError");
      };
      Storage.prototype.setItem = function () {
        throw new DOMException("Storage disabled", "SecurityError");
      };
    }
  }, storageUnavailable);
  const calls = [],
    errors = [];
  let count = 0;
  await context.route("**/*", async (route) => {
    const req = route.request(),
      url = new URL(req.url());
    if (url.origin !== origin) {
      evidence.unexpected.push({
        test: name,
        url: url.origin + url.pathname,
        method: req.method(),
      });
      return route.fulfill({ status: 204, body: "" });
    }
    if (url.pathname === "/api/booking.php") {
      let body = {};
      try {
        body = JSON.parse(req.postData() || "{}");
      } catch {}
      calls.push({
        method: req.method(),
        url: url.origin + url.pathname,
        keys: Object.keys(body).sort(),
        consent: body.consent,
        source: body.source,
        request_id: body.request_id ?? null,
        idempotency_key: body.idempotency_key ?? null,
      });
      count++;
      if (mode === "500" || (mode === "retry" && count === 1))
        return route.fulfill({
          status: 503,
          contentType: "application/json",
          body: '{"success":false,"message":"Synthetic service unavailable"}',
        });
      if (mode === "malformed")
        return route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "<html>Synthetic proxy error</html>",
        });
      if (mode === "network") return route.abort("connectionfailed");
      if (mode === "timeout") {
        await new Promise((r) => setTimeout(r, 22000));
        try {
          return await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: '{"success":true}',
          });
        } catch {
          return;
        }
      }
      if (mode === "pending") {
        await new Promise((r) => setTimeout(r, 2000));
        try {
          return await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: '{"success":true}',
          });
        } catch {
          return;
        }
      }
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"success":true}',
      });
    }
    if (!["GET", "HEAD"].includes(req.method())) {
      errors.push("Unexpected non-booking mutation intercepted");
      return route.fulfill({ status: 405, body: "" });
    }
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, ""),
      file = path.resolve(out, relative || "index.html");
    if (
      !file.startsWith(path.resolve(out) + path.sep) &&
      file !== path.resolve(out)
    ) {
      errors.push("Path outside mock output");
      return route.fulfill({ status: 403, body: "" });
    }
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
      const content = await readFile(file);
      return route.fulfill({
        status: 200,
        contentType: mime[path.extname(file)] || "application/octet-stream",
        body: content,
      });
    } catch {
      errors.push("Static asset missing: " + url.pathname);
      return route.fulfill({ status: 404, body: "" });
    }
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.setDefaultTimeout(5000);
  const start = Date.now();
  try {
    await page.goto(origin + "/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Запись", exact: true }).click();
    await page.getByPlaceholder("Ваше имя").fill("Синтетический Тест");
    await page.getByPlaceholder("+7 (___) ___-__-__").fill("9991234567");
    await page.getByRole("checkbox").check();
    await action(page, calls);
    evidence.cases.push({
      name,
      mode,
      pass: true,
      calls,
      errors,
      durationMs: Date.now() - start,
    });
  } catch (e) {
    evidence.cases.push({
      name,
      mode,
      pass: false,
      message: e.message.slice(0, 800),
      calls,
      errors,
      durationMs: Date.now() - start,
    });
  }
  await context.close();
}
const submit = (p) =>
  p.getByRole("button", { name: "Отправить заявку", exact: true });
const expect = async (value, message) => {
  if (!value) throw new Error(message);
};
const error = async (p) => {
  await p.getByRole("dialog").getByRole("alert").waitFor({ timeout: 20000 });
  await expect(
    /Не удалось|Сервер долго не отвечает/.test(
      await p.getByRole("dialog").getByRole("alert").textContent(),
    ),
    "Expected safe network error",
  );
};
await run(
  "Successful request and exactly one POST",
  "success",
  async (p, calls) => {
    await submit(p).click();
    await p
      .getByRole("heading", { name: "Заявка отправлена", exact: true })
      .waitFor();
    await expect(calls.length === 1, "Expected one POST");
    await expect(
      calls[0].method === "POST" && !calls[0].url.includes("?"),
      "PII must not enter URL",
    );
  },
);
for (const mode of ["500", "malformed", "network"])
  await run("Server failure " + mode, mode, async (p, calls) => {
    await submit(p).click();
    await error(p);
    await expect(calls.length === 1, "Expected one request");
    await expect(await submit(p).isEnabled(), "Submit should allow retry");
    await expect(
      (await p.getByPlaceholder("Ваше имя").inputValue()) ===
        "Синтетический Тест",
      "Inputs must persist after failure",
    );
  });
await run("Bounded network timeout", "timeout", async (p) => {
  await submit(p).click();
  await error(p);
  await expect(await submit(p).isEnabled(), "Timeout must unlock submit");
});
await run(
  "Retry preserves idempotency identifier",
  "retry",
  async (p, calls) => {
    await submit(p).click();
    await error(p);
    await submit(p).click();
    await p
      .getByRole("heading", { name: "Заявка отправлена", exact: true })
      .waitFor();
    await expect(calls.length === 2, "Expected retry");
    const a = calls[0].request_id || calls[0].idempotency_key,
      b = calls[1].request_id || calls[1].idempotency_key;
    await expect(
      a && a === b,
      "Idempotency identifier should remain stable on retry",
    );
  },
);
await run(
  "Unavailable localStorage does not break submission",
  "success",
  async (p, calls) => {
    await submit(p).click();
    await p
      .getByRole("heading", { name: "Заявка отправлена", exact: true })
      .waitFor();
    await expect(calls.length === 1, "Expected one request");
  },
  { storageUnavailable: true },
);
await run("Double click sends one request", "pending", async (p, calls) => {
  await submit(p).dblclick({ force: true });
  await p
    .getByRole("heading", { name: "Заявка отправлена", exact: true })
    .waitFor();
  await expect(
    calls.length === 1,
    "Expected single request during pending state",
  );
});
await run(
  "Closing pending dialog does not leak success into new dialog",
  "pending",
  async (p) => {
    await submit(p).click();
    await p.keyboard.press("Escape");
    await p.getByRole("button", { name: "Запись", exact: true }).click();
    await p.waitForTimeout(2500);
    await expect(
      await p.getByPlaceholder("Ваше имя").isVisible(),
      "New booking should remain editable",
    );
    await expect(
      (await p
        .getByRole("heading", { name: "Заявка отправлена", exact: true })
        .count()) === 0,
      "Stale response should not mark new dialog successful",
    );
  },
);
await browser.close();
evidence.summary = {
  total: evidence.cases.length,
  passed: evidence.cases.filter((c) => c.pass).length,
  failed: evidence.cases.filter((c) => !c.pass).length,
};
await mkdir(path.join(output, "evidence"), { recursive: true });
await writeFile(
  path.join(output, "evidence", "booking-mock.json"),
  JSON.stringify(evidence, null, 2),
);
console.log(JSON.stringify(evidence.summary, null, 2));
