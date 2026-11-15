import { chromium } from "playwright-core";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
const root = process.env.REPO_ROOT || "/workspace/olga-dental";
const out = process.env.MOCK_OUT || "/tmp/olga-enabled/out",
  origin = "https://olga-clinic-murino.ru";
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".txt": "text/plain",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};
const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const evidence = {
  timestamp: new Date().toISOString(),
  browser: await b.version(),
  networkPolicy:
    "All HTTP fulfilled locally; no actual metrika or production requests sent.",
  cases: [],
};
for (const blockedStorage of [false, true]) {
  const c = await b.newContext({ viewport: { width: 1366, height: 768 } });
  if (blockedStorage)
    await c.addInitScript(() => {
      Storage.prototype.getItem = function () {
        throw new DOMException("Storage disabled", "SecurityError");
      };
      Storage.prototype.setItem = function () {
        throw new DOMException("Storage disabled", "SecurityError");
      };
      Storage.prototype.removeItem = function () {
        throw new DOMException("Storage disabled", "SecurityError");
      };
    });
  const external = [],
    errors = [];
  await c.route("**/*", async (r) => {
    const req = r.request(),
      u = new URL(req.url());
    if (u.origin !== origin) {
      external.push({ origin: u.origin, path: u.pathname });
      return r.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "window.__metrikaMockLoaded = true;",
      });
    }
    if (req.method() !== "GET") return r.fulfill({ status: 405, body: "" });
    let f = path.resolve(
      out,
      decodeURIComponent(u.pathname).replace(/^\//, "") || "index.html",
    );
    try {
      if ((await stat(f)).isDirectory()) f = path.join(f, "index.html");
      return r.fulfill({
        status: 200,
        contentType: mime[path.extname(f)] || "application/octet-stream",
        body: await readFile(f),
      });
    } catch {
      return r.fulfill({ status: 404, body: "" });
    }
  });
  const p = await c.newPage();
  p.setDefaultTimeout(5000);
  p.on("pageerror", (e) => errors.push(e.message));
  const checks = [];
  async function check(name, fn) {
    try {
      if ((await fn()) === false) throw Error("Assertion failed");
      checks.push({ name, pass: true });
    } catch (e) {
      checks.push({ name, pass: false, error: e.message.slice(0, 400) });
    }
  }
  const analyticsRequests = () =>
    external.filter((u) => u.origin === "https://mc.yandex.ru").length;
  await p.goto(origin + "/?audit_synthetic=1", { waitUntil: "networkidle" });
  await check("No analytics before explicit consent", async () => {
    await p.getByRole("button", { name: "Отклонить", exact: true }).waitFor();
    return (
      analyticsRequests() === 0 &&
      (await p.evaluate(() => window.disableYaCounter105008013 === true))
    );
  });
  await check("Decline hides banner with storage configuration", async () => {
    await p.getByRole("button", { name: "Отклонить", exact: true }).click();
    await p.waitForTimeout(100);
    return (
      (await p
        .getByRole("button", { name: "Отклонить", exact: true })
        .count()) === 0 && analyticsRequests() === 0
    );
  });
  await check("Settings reopens choice", async () => {
    await p
      .getByRole("button", { name: "Настройки аналитики", exact: true })
      .click();
    return await p
      .getByRole("button", { name: "Разрешить аналитику", exact: true })
      .isVisible();
  });
  await check(
    "Accept initiates one mock script without query in hit",
    async () => {
      await p
        .getByRole("button", { name: "Разрешить аналитику", exact: true })
        .click();
      await p.waitForTimeout(350);
      const state = await p.evaluate(() => ({
        disabled: window.disableYaCounter105008013,
        hits: window.ym?.a?.filter((a) => a[1] === "hit") ?? [],
      }));
      return (
        analyticsRequests() === 1 &&
        state.disabled === false &&
        state.hits.every((a) => !a[2].includes("?") && !a[2].includes("#"))
      );
    },
  );
  await check("Opening settings revokes tracking immediately", async () => {
    await p
      .getByRole("button", { name: "Настройки аналитики", exact: true })
      .click();
    return await p.evaluate(() => window.disableYaCounter105008013 === true);
  });
  await check(
    "Declining after acceptance keeps tracking disabled",
    async () => {
      await p.getByRole("button", { name: "Отклонить", exact: true }).click();
      await p.waitForTimeout(100);
      return (
        (await p.evaluate(() => window.disableYaCounter105008013 === true)) &&
        analyticsRequests() === 1 &&
        (await p
          .getByRole("button", { name: "Отклонить", exact: true })
          .count()) === 0
      );
    },
  );
  evidence.cases.push({ blockedStorage, checks, external, errors });
  await c.close();
}
await b.close();
evidence.summary = {
  total: evidence.cases.flatMap((c) => c.checks).length,
  passed: evidence.cases.flatMap((c) => c.checks).filter((c) => c.pass).length,
  failed: evidence.cases.flatMap((c) => c.checks).filter((c) => !c.pass).length,
};
await writeFile(
  path.join(root, "docs/audit/evidence/analytics-mock.json"),
  JSON.stringify(evidence, null, 2),
);
console.log(JSON.stringify(evidence.summary));
