import { chromium } from "playwright-core";
import fs from "node:fs";
(async () => {
  const label = process.argv[2];
  const base = process.argv[3] || "http://127.0.0.1:4173";
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  await ctx.addInitScript(() => {
    window.__audit = { cls: 0, lcp: [], longtasks: [], interactions: [] };
    for (const [type, handler] of [
      [
        "layout-shift",
        (e) => {
          if (!e.hadRecentInput) window.__audit.cls += e.value;
        },
      ],
      [
        "largest-contentful-paint",
        (e) =>
          window.__audit.lcp.push({
            startTime: e.startTime,
            size: e.size,
            url: e.url,
            element: e.element?.tagName,
          }),
      ],
      [
        "longtask",
        (e) =>
          window.__audit.longtasks.push({
            startTime: e.startTime,
            duration: e.duration,
          }),
      ],
      [
        "event",
        (e) => {
          if (e.interactionId)
            window.__audit.interactions.push({
              name: e.name,
              duration: e.duration,
              interactionId: e.interactionId,
            });
        },
      ],
    ])
      try {
        new PerformanceObserver((list) =>
          list.getEntries().forEach(handler),
        ).observe({ type, buffered: true, durationThreshold: 16 });
      } catch {}
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Performance.enable");
  await cdp.send("Network.enable");
  const responses = [],
    failedRequests = [];
  page.on("response", (r) =>
    responses.push({
      url: r.url(),
      status: r.status(),
      type: r.request().resourceType(),
    }),
  );
  page.on("requestfailed", (r) =>
    failedRequests.push({ url: r.url(), error: r.failure()?.errorText }),
  );
  const requests = [];
  let encodedBytes = 0;
  cdp.on(
    "Network.loadingFinished",
    (e) => (encodedBytes += e.encodedDataLength || 0),
  );
  page.on("request", (r) =>
    requests.push({
      url: r.url(),
      method: r.method(),
      resourceType: r.resourceType(),
    }),
  );
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(5000);
  const initial = await cdp.send("Performance.getMetrics");
  const load = await page.evaluate(() => ({
    audit: window.__audit,
    navigation: performance
      .getEntriesByType("navigation")
      .map((x) => x.toJSON()),
    paints: performance.getEntriesByType("paint").map((x) => x.toJSON()),
    resources: performance
      .getEntriesByType("resource")
      .map((x) => ({
        name: x.name,
        initiatorType: x.initiatorType,
        transferSize: x.transferSize,
        encodedBodySize: x.encodedBodySize,
        duration: x.duration,
      })),
    memory: performance.memory && {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
    },
  }));
  const initialBytes = encodedBytes;
  const initialRequests = requests.length;
  await page.waitForTimeout(5000);
  const idle = await cdp.send("Performance.getMetrics");
  const start = Date.now();
  await page
    .getByRole("button", { name: "Записаться", exact: true })
    .first()
    .click();
  await page.waitForTimeout(1000);
  const bookingResponseMs = Date.now() - start - 1000;
  await page.keyboard.press("Escape");
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 600) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      y,
    );
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(5000);
  const final = await cdp.send("Performance.getMetrics");
  const afterScroll = await page.evaluate(() => ({
    audit: window.__audit,
    memory: performance.memory && {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
    },
  }));
  const result = {
    label,
    url: base,
    timestamp: new Date().toISOString(),
    browser: browser.version(),
    conditions: {
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      mobileEmulation: true,
      headless: true,
      network: "unthrottled local HTTP, external requests allowed",
      cpu: "unthrottled",
      idleWindowMs: 5000,
    },
    load: {
      ...load,
      requestCount: initialRequests,
      encodedBytes: initialBytes,
      cdp: initial.metrics,
    },
    idle: idle.metrics,
    bookingResponseApproxMs: bookingResponseMs,
    afterScroll: {
      ...afterScroll,
      requestCount: requests.length,
      encodedBytes,
      cdp: final.metrics,
    },
    requests,
    responses,
    failedRequests,
    errors,
  };
  const outputDir = `${process.env.PERF_OUTPUT || "/tmp/olga-perf"}/${label}`;
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(`${outputDir}/cdp.json`, JSON.stringify(result, null, 2));
  await browser.close();
})();
