import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
const origin = new URL(base).origin;
const evidenceFile =
  process.env.SCROLL_EVIDENCE ||
  join(
    process.env.REPO_ROOT || process.cwd(),
    "docs/audit/evidence/scroll-final.json",
  );
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];
const context = await browser.newContext({
  viewport: { width: 1366, height: 768 },
});
await context.route("**/*", (r) =>
  new URL(r.request().url()).origin === origin && r.request().method() === "GET"
    ? r.continue()
    : r.abort(),
);
const state = (p) =>
  p.evaluate(() => ({
    url: location.href,
    y: scrollY,
    hash: location.hash,
    targetTop: location.hash
      ? document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.getBoundingClientRect().top
      : null,
    viewport: innerHeight,
  }));
async function ready(p) {
  const b = p.getByRole("button", { name: "Переключить тему", exact: true });
  await b.click();
  await p.waitForFunction(() =>
    document.documentElement.classList.contains("dark"),
  );
  await b.click();
  await p.waitForFunction(() =>
    document.documentElement.classList.contains("light"),
  );
  await p.waitForTimeout(1100);
}
for (let i = 0; i < 3; i++) {
  const p = await context.newPage();
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await ready(p);
  await p.evaluate(() => scrollTo({ top: 1200, behavior: "instant" }));
  await p.waitForTimeout(200);
  const original = await state(p);
  await p.locator('header nav a[href="/services/"]').click();
  await p.waitForURL("**/services/");
  await p.waitForTimeout(1100);
  await p.goBack();
  await p.waitForURL(base + "/");
  await p.waitForTimeout(1400);
  const back = await state(p);
  results.push({
    test: "history restores scrolled home",
    iteration: i + 1,
    original,
    back,
    pass: Math.abs(back.y - original.y) < 5,
  });
  await p.close();
}
const p = await context.newPage();
await p.goto(base + "/promotions/", { waitUntil: "networkidle" });
await ready(p);
for (const slug of ["hygiene", "caries", "implant-tooth-package"]) {
  await p.locator(`a[href="/services/#${slug}"]`).first().click();
  await p.waitForURL(`**/services/#${slug}`);
  await p.waitForTimeout(1800);
  const s = await state(p);
  results.push({
    test: "promotion to service fragment",
    slug,
    ...s,
    pass: s.targetTop >= -2 && s.targetTop < s.viewport,
  });
  await p.locator('header nav a[href="/promotions/"]').click();
  await p.waitForURL("**/promotions/");
  await p.waitForTimeout(900);
}
await p.close();
const direct = await context.newPage();
await direct.goto(base + "/services/#caries", { waitUntil: "networkidle" });
await ready(direct);
const d = await state(direct);
results.push({
  test: "direct document fragment",
  ...d,
  pass: d.targetTop >= -2 && d.targetTop < d.viewport,
});
await direct.close();
// A visitor may scroll the exported HTML before delayed scripts hydrate it.
const slowContext = await browser.newContext({
  viewport: { width: 1366, height: 768 },
});
await slowContext.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== origin || route.request().method() !== "GET")
    return route.abort();
  if (url.pathname.endsWith(".js"))
    await new Promise((resolve) => setTimeout(resolve, 1800));
  return route.continue();
});
const slow = await slowContext.newPage();
await slow.goto(base + "/", { waitUntil: "commit" });
await slow.locator("h1").waitFor({ state: "attached" });
await slow.evaluate(() => scrollTo({ top: 1200, behavior: "instant" }));
const originalSlow = await slow.evaluate(() => scrollY);
await slow.waitForTimeout(5000);
await ready(slow);
const finalSlow = await slow.evaluate(() => scrollY);
results.push({
  test: "scroll before delayed hydration",
  javascriptDelayMs: 1800,
  original: originalSlow,
  actual: finalSlow,
  pass: Math.abs(finalSlow - originalSlow) < 5,
});
await mkdir(dirname(evidenceFile), { recursive: true });
await writeFile(
  evidenceFile,
  JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      browser: await browser.version(),
      base,
      method:
        "Chromium real browser, static export; only same-origin GET requests allowed. Three independent history documents; three promotion fragment targets; direct fragment document; 1800ms delayed JavaScript hydration.",
      results,
    },
    null,
    2,
  ) + "\n",
);
console.log(JSON.stringify(results));
await browser.close();
if (results.some((result) => !result.pass)) process.exitCode = 1;
