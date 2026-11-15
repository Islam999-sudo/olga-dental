import path from "node:path";
const root = process.env.REPO_ROOT || "/workspace/olga-dental";
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const results = { flows: [], axe: [], anchors: [] };
const c = await b.newContext({ viewport: { width: 1366, height: 768 } });
await c.route("**/*", (r) =>
  new URL(r.request().url()).hostname === "127.0.0.1"
    ? r.continue()
    : r.abort(),
);
const p = await c.newPage();
p.setDefaultTimeout(5000);
const go = (route) => p.goto(base + route, { waitUntil: "networkidle" });
async function test(name, fn) {
  try {
    if ((await fn()) === false) throw Error("Assertion failed");
    results.flows.push({ name, pass: true });
  } catch (e) {
    results.flows.push({ name, pass: false, error: e.message.slice(0, 400) });
  }
}
async function trap() {
  for (let i = 0; i < 15; i++) await p.keyboard.press("Tab");
  return p.evaluate(() => !!document.activeElement.closest('[role="dialog"]'));
}
await test("Desktop booking accessible inputs+trap+restore", async () => {
  await go("/");
  await p.getByRole("button", { name: "Запись", exact: true }).click();
  await p.getByRole("textbox", { name: "Ваше имя", exact: true }).waitFor();
  if (!(await trap())) return false;
  await p.keyboard.press("Escape");
  await p.waitForTimeout(200);
  return p.evaluate(
    () => document.activeElement.textContent.trim() === "Запись",
  );
});
await test("Form Enter validates and demo succeeds", async () => {
  await p.getByRole("button", { name: "Запись", exact: true }).click();
  await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
  await p
    .getByRole("textbox", { name: "Номер телефона", exact: true })
    .fill("9991234567");
  await p
    .getByRole("textbox", { name: "Номер телефона", exact: true })
    .press("Enter");
  await p.getByRole("dialog").getByRole("alert").waitFor();
  await p.getByRole("checkbox").check();
  await p
    .getByRole("textbox", { name: "Номер телефона", exact: true })
    .press("Enter");
  await p.getByRole("heading", { name: "Форма проверена" }).waitFor();
  await p.keyboard.press("Escape");
});
await test("Doctor dialog focus trap and booking context", async () => {
  await go("/doctors/");
  await p
    .getByRole("button", { name: "Подробнее", exact: true })
    .first()
    .click();
  if (!(await trap())) return false;
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Записаться", exact: true })
    .click();
  return await p.getByText(/^Врач:/).isVisible();
});
await p.keyboard.press("Escape");
for (const [w, h] of [
  [320, 568],
  [390, 844],
  [844, 390],
  [768, 1024],
]) {
  await p.setViewportSize({ width: w, height: h });
  await go("/");
  await test(`Menu escape focus ${w}x${h}`, async () => {
    await p.getByRole("button", { name: "Открыть меню", exact: true }).click();
    await p.waitForTimeout(650);
    if (!(await trap())) return false;
    await p.keyboard.press("Escape");
    await p.waitForTimeout(650);
    return p.evaluate(
      () =>
        document.activeElement.getAttribute("aria-label") === "Открыть меню",
    );
  });
  await test(`Menu booking transition ${w}x${h}`, async () => {
    await p.getByRole("button", { name: "Открыть меню", exact: true }).click();
    await p.waitForTimeout(650);
    await p
      .getByRole("dialog")
      .getByRole("button", { name: "Записаться на приём", exact: true })
      .click();
    await p.waitForTimeout(850);
    if (!(await trap())) return false;
    await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
    await p.keyboard.press("Escape");
    await p.waitForTimeout(350);
    return p.evaluate(() => document.body.style.overflow !== "hidden");
  });
}
await p.setViewportSize({ width: 1366, height: 768 });
await go("/promotions/");
const links = await p
  .locator('a[href^="/services"][href*="#"]')
  .evaluateAll((xs) => xs.map((a) => a.getAttribute("href")));
for (const href of [...new Set(links)]) {
  await go("/promotions/");
  await p
    .locator(`a[href=${JSON.stringify(href)}]`)
    .first()
    .click();
  await p.waitForTimeout(1800);
  results.anchors.push({
    href,
    ...(await p.evaluate(() => ({
      hash: location.hash,
      scrollY,
      targetY: location.hash
        ? document.querySelector(location.hash)?.getBoundingClientRect().top
        : null,
    }))),
  });
}
for (const route of ["/", "/services/", "/doctors/"]) {
  await go(route);
  const a = await new AxeBuilder({ page: p })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22aa",
      "best-practice",
    ])
    .analyze();
  results.axe.push({
    route,
    violations: a.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
}
await c.close();
await b.close();
await writeFile(
  path.join(root, "docs/audit/evidence/focused-after-interim.json"),
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
