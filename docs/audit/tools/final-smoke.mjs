import { chromium } from "playwright-core";
import { readFile, writeFile } from "node:fs/promises";
const root = process.env.REPO_ROOT || "/workspace/olga-dental",
  base = process.env.BASE_URL || "http://127.0.0.1:4173";
const s = await readFile(root + "/lib/services.ts", "utf8");
const routes = [
  "/",
  "/services/",
  "/doctors/",
  "/about/",
  "/contact/",
  "/promotions/",
  "/privacy/",
  "/consent/",
  ...[...s.matchAll(/slug:\s*"([^"]+)"/g)].map(
    (m) => "/services/" + m[1] + "/",
  ),
];
const results = {
    timestamp: new Date().toISOString(),
    build:
      "Final normal static export: initial pathname scroll guard + compact ICO favicon; visual/layout matrix was run before these two targeted changes.",
    routes: [],
    assets: [],
    flows: [],
    runtimeErrors: [],
  },
  assets = new Set(["/icon.ico"]);
for (const route of routes) {
  const r = await fetch(base + route),
    html = await r.text();
  results.routes.push({ route, status: r.status });
  for (const [, src] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (
      src.startsWith("/_next/") ||
      (/^\//.test(src) && /\.(ico|webp|png|jpg|svg)(\?|$)/.test(src))
    )
      assets.add(src.replaceAll("&amp;", "&"));
  }
}
for (const asset of assets) {
  const r = await fetch(base + asset);
  const bytes = (await r.arrayBuffer()).byteLength;
  results.assets.push({
    asset,
    status: r.status,
    bytes,
    contentType: r.headers.get("content-type"),
  });
}
const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const c = await b.newContext({ viewport: { width: 1366, height: 768 } });
await c.route("**/*", (r) =>
  new URL(r.request().url()).hostname === "127.0.0.1"
    ? r.continue()
    : r.abort(),
);
const p = await c.newPage();
p.setDefaultTimeout(5000);
p.on("pageerror", (e) => results.runtimeErrors.push(e.message));
async function test(name, fn) {
  try {
    if ((await fn()) === false) throw Error("Assertion failed");
    results.flows.push({ name, pass: true });
  } catch (e) {
    results.flows.push({ name, pass: false, error: e.message.slice(0, 300) });
  }
}
await test("Final navbar booking validates and demo succeeds", async () => {
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Запись", exact: true }).click();
  await p.getByRole("button", { name: "Проверить форму", exact: true }).click();
  await p
    .getByRole("dialog")
    .getByRole("alert")
    .filter({ hasText: /Укажите имя от 2 до 60/ })
    .waitFor();
  await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
  await p.getByLabel("Номер телефона", { exact: true }).fill("9991234567");
  await p.getByRole("checkbox").check();
  await p.getByRole("button", { name: "Проверить форму", exact: true }).click();
  await p.getByRole("heading", { name: "Форма проверена" }).waitFor();
  await p.keyboard.press("Escape");
});
await test("Final doctor profile context", async () => {
  await p.goto(base + "/doctors/", { waitUntil: "networkidle" });
  await p
    .getByRole("button", { name: "Подробнее", exact: true })
    .first()
    .click();
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Записаться", exact: true })
    .click();
  const ok = await p.getByText(/^Врач:/).isVisible();
  await p.keyboard.press("Escape");
  return ok;
});
await test("Final service booking context", async () => {
  await p.goto(base + "/services/caries/", { waitUntil: "networkidle" });
  await p
    .getByRole("button", { name: "Записаться на консультацию", exact: true })
    .first()
    .click();
  const ok = await p
    .getByText("Услуга: Лечение кариеса", { exact: true })
    .isVisible();
  await p.keyboard.press("Escape");
  return ok;
});
await test("Final mobile menu Escape and booking", async () => {
  await p.setViewportSize({ width: 390, height: 844 });
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Открыть меню", exact: true }).click();
  await p.keyboard.press("Escape");
  await p.waitForTimeout(600);
  await p.getByRole("button", { name: "Открыть меню", exact: true }).click();
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Записаться на приём", exact: true })
    .click();
  await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
  await p.keyboard.press("Escape");
  return await p.evaluate(() => document.body.style.overflow !== "hidden");
});
await b.close();
results.summary = {
  routes: results.routes.length,
  routeFailures: results.routes.filter((r) => r.status !== 200).length,
  assets: results.assets.length,
  assetFailures: results.assets.filter((r) => r.status !== 200).length,
  flowFailures: results.flows.filter((f) => !f.pass).length,
  runtimeErrors: results.runtimeErrors.length,
};
await writeFile(
  root + "/docs/audit/evidence/final-smoke.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results.summary, null, 2));
