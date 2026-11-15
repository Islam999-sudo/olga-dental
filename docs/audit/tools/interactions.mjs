import { chromium } from "playwright-core";
import { readFile, writeFile } from "node:fs/promises";
const root = process.env.REPO_ROOT || "/workspace/olga-dental",
  base = process.env.BASE_URL || "http://127.0.0.1:4173";
const names = [
  ...(await readFile(root + "/data/doctors.ts", "utf8")).matchAll(
    /\bname:\s*"([^"]+)"/g,
  ),
].map((m) => m[1]);
const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const c = await b.newContext({
  viewport: { width: 1366, height: 768 },
  colorScheme: "light",
});
await c.route("**/*", (r) =>
  new URL(r.request().url()).origin === base ? r.continue() : r.abort(),
);
const p = await c.newPage();
p.setDefaultTimeout(6000);
const evidence = {
  timestamp: new Date().toISOString(),
  source: "Application commit e3d3375; final normal export",
  checks: [],
  errors: [],
};
p.on("pageerror", (e) => evidence.errors.push(e.message));
async function test(name, fn) {
  try {
    let details = await fn();
    if (details === false) throw Error("Assertion failed");
    evidence.checks.push({ name, pass: true, details });
  } catch (e) {
    evidence.checks.push({ name, pass: false, error: e.message.slice(0, 500) });
  }
}
await p.goto(base + "/", { waitUntil: "networkidle" });
await test("Theme toggles to dark", async () => {
  await p
    .getByRole("button", { name: "Переключить тему", exact: true })
    .click();
  await p.waitForTimeout(1000);
  return await p.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );
});
await test("Theme persists on reload", async () => {
  await p.reload({ waitUntil: "networkidle" });
  return await p.evaluate(
    () =>
      document.documentElement.classList.contains("dark") &&
      localStorage.getItem("theme") === "dark",
  );
});
await test("Theme returns to light", async () => {
  await p
    .getByRole("button", { name: "Переключить тему", exact: true })
    .click();
  await p.waitForTimeout(1000);
  return await p.evaluate(
    () => !document.documentElement.classList.contains("dark"),
  );
});
const active = () => p.locator('#doctors [role="button"][tabindex="0"]');
await test("Home carousel next and previous arrows", async () => {
  await p.getByRole("button", { name: "Следующий врач", exact: true }).click();
  await p.waitForTimeout(700);
  if (!(await active().textContent()).includes(names[1])) return false;
  await p.getByRole("button", { name: "Предыдущий врач", exact: true }).click();
  await p.waitForTimeout(700);
  return (await active().textContent()).includes(names[0]);
});
await test("Home carousel active card keyboard opens profile", async () => {
  await active().focus();
  await active().press("Enter");
  await p
    .getByRole("dialog")
    .getByRole("heading", { name: names[0], exact: true })
    .waitFor();
  await p.keyboard.press("Escape");
  return (await p.getByRole("dialog").count()) === 0;
});
await p.goto(base + "/doctors/", { waitUntil: "networkidle" });
for (const filter of [
  "Все",
  "Терапия",
  "Хирургия",
  "Имплантация",
  "Ортопедия",
  "Ортодонтия",
  "Гигиена",
])
  await test("Doctor filter " + filter, async () => {
    await p.getByRole("button", { name: filter, exact: true }).click();
    await p.waitForTimeout(550);
    const count = await p.locator("article").count();
    if (
      count < 1 ||
      count > names.length ||
      (filter === "Все" && count !== names.length)
    )
      return false;
    return { count };
  });
await p.getByRole("button", { name: "Все", exact: true }).click();
await p.waitForTimeout(550);
for (let i = 0; i < names.length; i++)
  await test("Doctor profile " + (i + 1), async () => {
    await p
      .getByRole("button", { name: "Подробнее", exact: true })
      .nth(i)
      .click();
    await p
      .getByRole("dialog")
      .getByRole("heading", { name: names[i], exact: true })
      .waitFor();
    await p
      .getByRole("button", { name: "Закрыть профиль врача", exact: true })
      .click();
    return (await p.getByRole("dialog").count()) === 0;
  });
await p.goto(base + "/services/caries/", { waitUntil: "networkidle" });
await test("Service FAQ opens by click and closes by keyboard", async () => {
  const item = p.locator("details").first(),
    summary = item.locator("summary");
  await summary.click();
  if (!(await item.evaluate((x) => x.open))) return false;
  await summary.focus();
  await summary.press("Enter");
  return await item.evaluate((x) => !x.open);
});
for (const route of ["/privacy/", "/consent/"])
  await test("Legal mailto rendered " + route, async () => {
    await p.goto(base + route, { waitUntil: "networkidle" });
    const links = await p
      .locator('a[href^="mailto:"]')
      .evaluateAll((xs) => xs.map((x) => x.getAttribute("href")));
    if (!links.includes("mailto:mail@olga-clinic.ru")) return false;
    return {
      hrefs: links,
      navigation: "Email client not launched; no message sent",
    };
  });
await b.close();
evidence.summary = {
  total: evidence.checks.length,
  passed: evidence.checks.filter((x) => x.pass).length,
  failed: evidence.checks.filter((x) => !x.pass).length,
  runtimeErrors: evidence.errors.length,
};
await writeFile(
  root + "/docs/audit/evidence/interactions-final.json",
  JSON.stringify(evidence, null, 2),
);
console.log(JSON.stringify(evidence.summary, null, 2));
