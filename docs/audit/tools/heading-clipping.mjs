import path from "node:path";
const root = process.env.REPO_ROOT || "/workspace/olga-dental";
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const data = [];
for (const width of [320, 390, 430, 768]) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  await page.route("**/*", (route) =>
    new URL(route.request().url()).hostname === "127.0.0.1"
      ? route.continue()
      : route.abort(),
  );
  for (const route of [
    "/",
    "/services/",
    "/doctors/",
    "/contact/",
    "/privacy/",
    "/services/caries/",
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const clips = await page.evaluate(() =>
      [...document.querySelectorAll("h1,h2,h3")].flatMap((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const bounds = [...range.getClientRects()];
        return bounds.some((r) => r.left < -1 || r.right > innerWidth + 1)
          ? [
              {
                text: el.textContent.trim(),
                width: innerWidth,
                bounds: bounds.map((r) => ({ left: r.left, right: r.right })),
              },
            ]
          : [];
      }),
    );
    data.push({ width, route, clips });
  }
  await page.close();
}
await browser.close();
await writeFile(
  path.join(
    root,
    `docs/audit/evidence/heading-clipping-${process.env.PHASE || "before"}.json`,
  ),
  JSON.stringify(data, null, 2),
);
console.log(
  JSON.stringify(
    data.filter((x) => x.clips.length),
    null,
    2,
  ),
);
