import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const output = join(process.cwd(), "out");
const site = "https://olga-clinic-murino.ru";
const services = [...readFileSync("lib/services.ts", "utf8").matchAll(/\bslug:\s*"([^"]+)"/g)]
  .map((match) => `/services/${match[1]}/`);
const legal = ["/privacy/", "/consent/"];
const routes = ["/", "/about/", "/contact/", "/doctors/", "/promotions/", "/services/", ...legal, ...services];
const failures = [];
const titles = new Set();
const htmlFile = (route) => join(output, route.replace(/^\//, ""), "index.html");
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'");

for (const route of routes) {
  const file = htmlFile(route);
  if (!existsSync(file)) {
    failures.push(`${route}: missing static HTML`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title || titles.has(title)) failures.push(`${route}: missing or duplicate title`);
  titles.add(title);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) failures.push(`${route}: expected one h1`);
  if ((html.match(/<main\b/g) ?? []).length !== 1) failures.push(`${route}: expected one main landmark`);
  if (!html.includes('<html lang="ru"')) failures.push(`${route}: missing Russian document language`);
  if (legal.includes(route)) {
    if (!/<meta name="robots" content="[^"]*noindex/.test(html)) failures.push(`${route}: draft legal document is indexable`);
  } else if (!html.includes(`rel="canonical" href="${site}${route}"`)) {
    failures.push(`${route}: incorrect canonical URL`);
  }
  if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`${route}: missing description`);
  if (!/<meta property="og:image" content="[^"]+"/.test(html)) failures.push(`${route}: missing social image`);

  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = decode(match[1]);
    if (src.startsWith("/") && !existsSync(join(output, decodeURIComponent(src.split("?")[0])))) {
      failures.push(`${route}: missing image ${src}`);
    }
  }
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href, site + route);
    const target = url.pathname.endsWith("/") ? htmlFile(url.pathname) : join(output, url.pathname);
    const targetHtml = url.pathname.endsWith("/") ? target : htmlFile(url.pathname);
    if (!existsSync(target) && !existsSync(targetHtml)) {
      failures.push(`${route}: broken local link ${href}`);
    } else if (url.hash && existsSync(targetHtml)) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!readFileSync(targetHtml, "utf8").includes(`id="${id}"`)) failures.push(`${route}: missing anchor ${href}`);
    }
  }
}

const sitemapFile = join(output, "sitemap.xml");
if (!existsSync(sitemapFile)) failures.push("Missing sitemap.xml");
else {
  const sitemap = readFileSync(sitemapFile, "utf8");
  for (const route of routes.filter((path) => !legal.includes(path))) {
    if (!sitemap.includes(`<loc>${site}${route}</loc>`)) failures.push(`${route}: missing from sitemap`);
  }
}
if (!existsSync(join(output, "robots.txt"))) failures.push("Missing robots.txt");
if (!existsSync(join(output, "404.html"))) failures.push("Missing static 404.html");
if (existsSync(join(output, "clinic-admin"))) failures.push("Admin directory must not be published in frontend export");
function inspect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) inspect(path);
    else if (/\.php$/i.test(entry.name)) failures.push("PHP source must not be published in frontend export");
  }
}
inspect(output);

if (failures.length) {
  for (const failure of [...new Set(failures)]) console.error("ERROR:", failure);
  process.exit(1);
}
console.log(`PASS: ${routes.length} routes, metadata, landmarks, local links/images, sitemap, static 404, no PHP/admin exposure.`);
