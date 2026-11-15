import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.env.REPO_ROOT || "/workspace/olga-dental";
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
const phase = process.env.PHASE || "before";
const output = process.env.AUDIT_OUTPUT || path.join(root, "docs/audit");
await mkdir(path.join(output, "screenshots", phase), { recursive: true });
await mkdir(path.join(output, "evidence"), { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const evidence = {
  phase,
  timestamp: new Date().toISOString(),
  browser: await browser.version(),
  base,
  externalPolicy:
    "All non-local HTTP requests aborted; third-party attempted URLs recorded. No real booking request permitted.",
  routes: [],
  responsive: [],
  axe: [],
  flows: [],
  errors: [],
  blockedRequests: [],
};
const contexts = [];
const origin = new URL(base).origin;
async function contextFor(
  theme,
  viewport = { width: 1366, height: 768 },
  reducedMotion = "no-preference",
) {
  const context = await browser.newContext({
    viewport,
    colorScheme: theme,
    reducedMotion,
  });
  contexts.push(context);
  await context.addInitScript((theme) => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, theme);
  await context.route("**/*", async (route) => {
    const request = route.request(),
      url = request.url();
    if (/^https?:/.test(url) && new URL(url).origin !== origin) {
      evidence.blockedRequests.push({ url, method: request.method() });
      return route.abort("blockedbyclient");
    }
    if (url.includes("/api/booking.php")) {
      evidence.flows.push({
        test: "unexpected booking HTTP blocked",
        pass: false,
      });
      return route.fulfill({
        status: 503,
        contentType: "application/json",
        body: '{"success":false}',
      });
    }
    return route.continue();
  });
  return context;
}
function track(page, label) {
  page.setDefaultTimeout(5000);
  page.on("pageerror", (error) =>
    evidence.errors.push({ label, type: "pageerror", message: error.message }),
  );
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().includes("net::ERR_BLOCKED_BY_CLIENT")
    )
      evidence.errors.push({ label, type: "console", message: message.text() });
  });
}
async function go(page, route) {
  const res = await page.goto(base + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  return res;
}
async function snapshot(page, name, fullPage = false) {
  if (fullPage) {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 90));
      }
      await Promise.race([
        Promise.all(
          [...document.images]
            .filter((i) => i.getClientRects().length)
            .map((i) => i.decode().catch(() => {})),
        ),
        new Promise((r) => setTimeout(r, 2000)),
      ]);
      scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(150);
  }
  await page.screenshot({
    path: path.join(output, "screenshots", phase, name + ".png"),
    fullPage,
    animations: "disabled",
    timeout: 30000,
  });
}
async function layout(page) {
  return page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    overflowElements: [...document.querySelectorAll("body *")]
      .filter((el) => {
        const r = el.getBoundingClientRect(),
          s = getComputedStyle(el);
        return (
          s.position !== "fixed" &&
          s.visibility !== "hidden" &&
          s.display !== "none" &&
          (r.left < -1 || r.right > innerWidth + 1) &&
          r.width > 0
        );
      })
      .slice(0, 8)
      .map((el) => ({
        tag: el.tagName,
        text: el.textContent?.trim().slice(0, 80),
        class: el.className?.toString().slice(0, 100),
      })),
    h1: [...document.querySelectorAll("h1")].map((x) => x.textContent.trim()),
    brokenImages: [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.getAttribute("src")),
    visibleImages: [...document.images].filter((i) => {
      const r = i.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }).length,
  }));
}
async function axe(page, label) {
  const r = await new AxeBuilder({ page })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22aa",
      "best-practice",
    ])
    .analyze();
  evidence.axe.push({
    label,
    violations: r.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      help: v.help,
      nodes: v.nodes
        .map((n) => ({ target: n.target, summary: n.failureSummary }))
        .slice(0, 20),
    })),
    incomplete: r.incomplete.map((v) => ({ id: v.id, count: v.nodes.length })),
    passes: r.passes.length,
  });
}
const catalog = await readFile(path.join(root, "lib/services.ts"), "utf8");
const serviceSlugs = [...catalog.matchAll(/slug:\s*"([^"]+)"/g)].map(
  (m) => m[1],
);
const routes = [
  "/",
  "/services/",
  "/doctors/",
  "/about/",
  "/contact/",
  "/promotions/",
  "/privacy/",
  "/consent/",
  ...serviceSlugs.map((s) => `/services/${s}/`),
];
const mainScreens = [
  "/",
  "/services/",
  "/doctors/",
  "/about/",
  "/contact/",
  "/promotions/",
  "/privacy/",
  "/consent/",
  "/services/caries/",
];
for (const theme of ["light", "dark"]) {
  const context = await contextFor(theme),
    page = await context.newPage();
  track(page, "route-" + theme);
  for (const route of routes) {
    const response = await go(page, route);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 25));
      }
      scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(300);
    const details = await layout(page);
    const meta = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      links: [...document.querySelectorAll("a[href]")].map((x) =>
        x.getAttribute("href"),
      ),
      imageCount: document.images.length,
    }));
    const invalid = [];
    for (const href of new Set(meta.links)) {
      if (
        href.startsWith("#") &&
        !(await page.locator(`[id=${JSON.stringify(href.slice(1))}]`).count())
      )
        invalid.push({ href, reason: "missing anchor" });
      else if (href.startsWith("/") && !href.startsWith("//")) {
        const url = new URL(href, base),
          pathname = url.pathname;
        if (
          !/\.[a-z0-9]+$/i.test(pathname) &&
          !routes.includes(pathname.endsWith("/") ? pathname : pathname + "/")
        )
          invalid.push({ href, reason: "unknown route" });
      }
    }
    evidence.routes.push({
      route,
      theme,
      status: response.status(),
      ...details,
      ...meta,
      invalidLinks: invalid,
    });
    if (mainScreens.includes(route)) {
      await axe(page, route + " " + theme);
      if (theme === "light" || ["/", "/services/", "/contact/"].includes(route))
        await snapshot(
          page,
          route.replaceAll("/", "-").replace(/^-|-$/g, "") +
            "-desktop-" +
            theme,
          true,
        );
    }
  }
  console.log("Completed routes", theme, evidence.routes.length);
  await context.close();
}
const viewports = [
  [320, 568],
  [390, 844],
  [430, 932],
  [844, 390],
  [768, 1024],
  [1366, 768],
  [1920, 1080],
  [2560, 1440],
];
for (const theme of ["light", "dark"])
  for (const [width, height] of viewports) {
    const context = await contextFor(theme, { width, height }),
      page = await context.newPage();
    track(page, `${width}x${height}-${theme}`);
    for (const route of [
      "/",
      "/services/",
      "/doctors/",
      "/contact/",
      "/privacy/",
      "/services/caries/",
    ]) {
      await go(page, route);
      const details = await layout(page);
      evidence.responsive.push({ route, theme, width, height, ...details });
      if (route === "/")
        await snapshot(page, `home-${width}x${height}-${theme}`);
    }
    console.log("Completed viewport", theme, width, height);
    await context.close();
  }
const context = await contextFor("light"),
  page = await context.newPage();
track(page, "flows");
async function test(name, action) {
  try {
    const result = await action();
    evidence.flows.push({
      test: name,
      pass: result === undefined ? true : !!result,
    });
  } catch (e) {
    evidence.flows.push({
      test: name,
      pass: false,
      error: e.message.slice(0, 300),
    });
  }
}
await test("Navbar opens booking", async () => {
  await go(page, "/");
  await page.getByRole("button", { name: "Запись", exact: true }).click();
  await page
    .getByRole("heading", { name: "Запись на прием", exact: true })
    .waitFor();
});
await test("Booking dialog semantics", async () =>
  (await page.getByRole("dialog").count()) > 0);
await test("Booking inputs accessible names", async () => {
  const name = page.getByRole("textbox", { name: /имя/i });
  const phone = page.getByRole("textbox", { name: /телефон/i });
  return (await name.count()) > 0 && (await phone.count()) > 0;
});
await test("Empty booking validates", async () => {
  await page
    .getByRole("button", { name: "Проверить форму", exact: true })
    .click();
  return await page
    .getByRole("dialog")
    .getByRole("alert")
    .filter({ hasText: /Укажите имя от 2 до 60/ })
    .isVisible();
});
await test("Consent required", async () => {
  await page.getByPlaceholder("Ваше имя").fill("Тест Аудита");
  await page.getByPlaceholder("+7 (___) ___-__-__").fill("9991234567");
  await page
    .getByRole("button", { name: "Проверить форму", exact: true })
    .click();
  return await page
    .getByText(
      "Для отправки заявки необходимо отдельное согласие на обработку данных.",
    )
    .isVisible();
});
await test("Booking focus contained on Tab", async () => {
  const input = page.getByPlaceholder("Ваше имя");
  await input.focus();
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  return await page.evaluate(
    () => !!document.activeElement.closest('[role="dialog"]'),
  );
});
await test("Demo booking no transmission", async () => {
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Проверить форму", exact: true })
    .click();
  return await page
    .getByText("Это демонстрация: заявка не отправлена, данные не сохранены.")
    .isVisible();
});
await snapshot(page, "booking-demo-desktop", false);
await test("Escape closes booking", async () => {
  await page.keyboard.press("Escape");
  return (
    (await page
      .getByRole("heading", { name: "Запись на прием", exact: true })
      .count()) === 0
  );
});
await test("Focus restored to navbar booking opener", async () =>
  await page.evaluate(
    () => document.activeElement?.textContent?.trim() === "Запись",
  ));
await test("Hero opens booking", async () => {
  await page
    .getByRole("button", { name: "Записаться", exact: true })
    .first()
    .click();
  await page
    .getByRole("heading", { name: "Запись на прием", exact: true })
    .waitFor();
  await page.keyboard.press("Escape");
});
await test("Service context preserved", async () => {
  await go(page, "/services/caries/");
  await page
    .getByRole("button", { name: "Записаться на консультацию", exact: true })
    .first()
    .click();
  return await page
    .getByText("Услуга: Лечение кариеса", { exact: true })
    .isVisible();
});
await page.keyboard.press("Escape");
await test("Doctor profile opens", async () => {
  await go(page, "/doctors/");
  await page
    .getByRole("button", { name: "Подробнее", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Закрыть профиль врача" }).waitFor();
});
await test("Doctor profile dialog semantics", async () =>
  (await page.getByRole("dialog").count()) > 0);
await snapshot(page, "doctor-profile-desktop", false);
await test("Doctor to booking context", async () => {
  await page
    .getByRole("button", { name: "Записаться", exact: true })
    .last()
    .click();
  return await page.getByText(/^Врач:/).isVisible();
});
await page.keyboard.press("Escape");
await test("Contact tel and organization links", async () => {
  await go(page, "/contact/");
  return (
    (await page.locator('a[href="tel:+78126036364"]').count()) > 0 &&
    (await page
      .locator('a[href="https://yandex.ru/maps/org/olga/99713820273/"]')
      .count()) > 0
  );
});
await context.grantPermissions(["clipboard-read", "clipboard-write"]);
await test("Address copy", async () => {
  await page.getByRole("button", { name: "Скопировать адрес" }).click();
  return (await page.evaluate(() => navigator.clipboard.readText())).includes(
    "Воронцовский",
  );
});
await context.close();
for (const [width, height] of [
  [320, 568],
  [390, 844],
  [844, 390],
  [768, 1024],
]) {
  const context = await contextFor("light", { width, height }),
    page = await context.newPage();
  track(page, "mobile-" + width);
  await go(page, "/");
  await test(`Mobile menu opens ${width}x${height}`, async () => {
    await page
      .getByRole("button", { name: "Открыть меню", exact: true })
      .click();
    return (
      (await page
        .getByRole("button", { name: "Закрыть меню", exact: true })
        .count()) > 0
    );
  });
  await page.waitForTimeout(750);
  await snapshot(page, `menu-${width}x${height}`);
  evidence.responsive.push({
    route: "mobile-menu",
    theme: "light",
    width,
    height,
    ...(await layout(page)),
    menu: await page.evaluate(() => ({
      links: [...document.querySelectorAll("a")]
        .filter((a) => a.getClientRects().length > 0)
        .map((a) => ({
          text: a.textContent.trim(),
          bottom: a.getBoundingClientRect().bottom,
        }))
        .filter((a) => a.bottom > innerHeight),
      bodyOverflow: document.body.style.overflow,
    })),
  });
  await test(`Mobile Escape ${width}x${height}`, async () => {
    await page.keyboard.press("Escape");
    await page.waitForTimeout(750);
    return (
      (await page
        .getByRole("button", { name: "Закрыть меню", exact: true })
        .count()) === 0
    );
  });
  await page.keyboard.press("Escape");
  await test(`Drawer booking transition ${width}x${height}`, async () => {
    await page
      .getByRole("button", { name: "Открыть меню", exact: true })
      .click();
    await page.waitForTimeout(450);
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Записаться на приём", exact: true })
      .click();
    await page.waitForTimeout(600);
    return (
      (await page.getByPlaceholder("Ваше имя").isVisible()) &&
      (await page.evaluate(
        () => !!document.activeElement.closest('[role="dialog"]'),
      ))
    );
  });
  await page.keyboard.press("Escape");
  // Fresh page ensures baseline Escape failure cannot poison booking test.
  await go(page, "/");
  await test(`Mobile booking ${width}x${height}`, async () => {
    await page
      .getByRole("button", { name: "Записаться", exact: true })
      .first()
      .click();
    return await page
      .getByRole("heading", { name: "Запись на прием", exact: true })
      .isVisible();
  });
  await snapshot(page, `booking-${width}x${height}`);
  await axe(page, `booking ${width}x${height}`);
  await context.close();
}
await browser.close();
evidence.summary = {
  routes: evidence.routes.length,
  routeErrors: evidence.routes.filter(
    (x) => x.status !== 200 || x.invalidLinks.length || x.brokenImages.length,
  ).length,
  responsive: evidence.responsive.length,
  overflows: evidence.responsive.filter((x) => x.overflow).length,
  flows: evidence.flows.length,
  failedFlows: evidence.flows.filter((x) => !x.pass).length,
  axeViolations: evidence.axe.reduce((sum, x) => sum + x.violations.length, 0),
  runtimeErrors: evidence.errors.length,
};
await writeFile(
  path.join(output, "evidence", `browser-${phase}.json`),
  JSON.stringify(evidence, null, 2),
);
console.log(JSON.stringify(evidence.summary, null, 2));
