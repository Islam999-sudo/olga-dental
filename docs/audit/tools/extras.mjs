import path from "node:path";
const root = process.env.REPO_ROOT || "/workspace/olga-dental";
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const results = {
  timestamp: new Date().toISOString(),
  method:
    "Headless Chromium. Zoom coverage: 1366x768 desktop at 200% represented by 683x384 CSS viewport with deviceScaleFactor2 (reflow equivalence, not Chrome UI zoom). Keyboard coverage: viewport reduced to390x420, not a real system keyboard. Actual iOS Safari/safe-area unavailable.",
  checks: [],
};
async function test(name, fn) {
  try {
    const details = await fn();
    if (details === false) throw Error("Assertion failed");
    results.checks.push({ name, pass: true, details });
  } catch (e) {
    results.checks.push({ name, pass: false, error: e.message.slice(0, 500) });
  }
}
async function ctx(viewport = { width: 1366, height: 768 }, options = {}) {
  const c = await b.newContext({ viewport, ...options });
  await c.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  const p = await c.newPage();
  p.setDefaultTimeout(5000);
  await p.goto(base + "/", { waitUntil: "networkidle" });
  return { c, p };
}
let { c, p } = await ctx();
await test("Booking backdrop click closes and unlocks scroll", async () => {
  await p.getByRole("button", { name: "Запись", exact: true }).click();
  await p.waitForTimeout(400);
  await p.mouse.click(2, 2);
  return (
    (await p.getByRole("dialog").count()) === 0 &&
    (await p.evaluate(() => document.body.style.overflow !== "hidden"))
  );
});
await test("Doctor backdrop click closes", async () => {
  await p.goto(base + "/doctors/", { waitUntil: "networkidle" });
  await p
    .getByRole("button", { name: "Подробнее", exact: true })
    .first()
    .click();
  await p.waitForTimeout(200);
  await p.mouse.click(2, 2);
  return (await p.getByRole("dialog").count()) === 0;
});
await c.close();
({ c, p } = await ctx({ width: 390, height: 844 }));
await test("Drawer backdrop click closes", async () => {
  await p.getByRole("button", { name: "Открыть меню", exact: true }).click();
  await p.waitForTimeout(700);
  await p.mouse.click(2, 400);
  await p.waitForTimeout(700);
  return (await p.getByRole("dialog").count()) === 0;
});
await test("Rotation and reduced height keep booking scrollable", async () => {
  await p
    .getByRole("button", { name: "Записаться", exact: true })
    .first()
    .click();
  await p.setViewportSize({ width: 844, height: 390 });
  await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Проверить форму", exact: true })
    .scrollIntoViewIfNeeded();
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Проверить форму", exact: true })
    .click();
  await p.setViewportSize({ width: 390, height: 420 });
  await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Проверить форму", exact: true })
    .scrollIntoViewIfNeeded();
  return (
    (await p
      .getByRole("dialog")
      .getByRole("button", { name: "Проверить форму", exact: true })
      .isVisible()) &&
    (await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  );
});
await c.close();
({ c, p } = await ctx({ width: 683, height: 384 }, { deviceScaleFactor: 2 }));
for (const route of [
  "/",
  "/services/",
  "/doctors/",
  "/contact/",
  "/privacy/",
  "/services/caries/",
])
  await test("200% equivalent reflow " + route, async () => {
    await p.goto(base + route, { waitUntil: "networkidle" });
    return await p.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    );
  });
await test("200% equivalent booking controls remain reachable", async () => {
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p
    .getByRole("button", { name: "Записаться", exact: true })
    .first()
    .click();
  await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
  const submit = p
    .getByRole("dialog")
    .getByRole("button", { name: "Проверить форму", exact: true });
  await submit.scrollIntoViewIfNeeded();
  await submit.click();
  return await p.getByRole("dialog").getByRole("alert").isVisible();
});
await c.close();
({ c, p } = await ctx(
  { width: 390, height: 844 },
  { reducedMotion: "reduce" },
));
await test("Reduced motion CSS and drawer action", async () => {
  const state = await p.evaluate(() => ({
    prefers: matchMedia("(prefers-reduced-motion: reduce)").matches,
    duration: getComputedStyle(document.querySelector(".animate-float"))
      .animationDuration,
  }));
  await p.getByRole("button", { name: "Открыть меню", exact: true }).click();
  await p
    .getByRole("dialog")
    .getByRole("button", { name: "Записаться на приём", exact: true })
    .click();
  await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
  return {
    prefers: state.prefers,
    cssAnimationDuration: state.duration,
    dialogEditable: await p
      .getByLabel("Ваше имя", { exact: true })
      .isEditable(),
  };
});
await c.close();
await b.close();
await writeFile(
  path.join(root, "docs/audit/evidence/browser-extras.json"),
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
