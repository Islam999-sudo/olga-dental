import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
const root = process.env.REPO_ROOT || "/workspace/olga-dental";
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
const apiCalls = [];
await p.route("**/*", (r) => {
  const u = new URL(r.request().url());
  if (u.pathname.includes("/api/booking.php")) {
    apiCalls.push(u.pathname);
    return r.fulfill({ status: 503, body: "Synthetic API disabled" });
  }
  return u.hostname === "127.0.0.1" ? r.continue() : r.abort();
});
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.getByRole("button", { name: "Запись", exact: true }).click();
const d = p.getByRole("dialog"),
  cases = [];
async function submit(name, expected) {
  await d.getByRole("button", { name: "Проверить форму", exact: true }).click();
  const alert = await d.getByRole("alert").textContent();
  cases.push({
    name,
    alert,
    pass: expected.test(alert) && apiCalls.length === 0,
  });
}
await submit(
  "Empty booking validates with specific name alert",
  /Укажите имя от 2 до 60/,
);
await p.getByLabel("Ваше имя", { exact: true }).fill("123");
await submit("Name rejects digits", /Укажите имя от 2 до 60/);
await p.getByLabel("Ваше имя", { exact: true }).fill("Тест");
await submit(
  "Missing phone produces phone alert",
  /Укажите корректный номер телефона/,
);
await p.getByLabel("Номер телефона", { exact: true }).fill("9991234567");
await submit("Missing consent produces separate alert", /отдельное согласие/);
await b.close();
const result = {
  timestamp: new Date().toISOString(),
  explains:
    "The original after runner asserted the old combined validation paragraph. Current form uses noValidate and specific custom name/phone alerts. The initial native-validation hypothesis was disproved and is not a product failure.",
  cases,
  apiCalls,
  summary: {
    total: cases.length,
    passed: cases.filter((x) => x.pass).length,
    failed: cases.filter((x) => !x.pass).length,
  },
};
await writeFile(
  root + "/docs/audit/evidence/validation-followup-after.json",
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result, null, 2));
