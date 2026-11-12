import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const file = (name) => readFileSync(join(root, name), "utf8");
const catalog = file("lib/services.ts");
const doctorData = file("data/doctors.ts");
const articles =
  file("lib/service-articles-restorative.ts") + "\n" +
  file("lib/service-articles-advanced.ts");

const getSlugs = (text) => [...text.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
const slugs = getSlugs(catalog);
const articleSlugs = [...articles.matchAll(/^\s{2}(?:"([^"]+)"|([a-z]+)):\s*\{/gm)]
  .map((match) => match[1] ?? match[2]);

const failures = [];

function checkUniqueness(items, name) {
  if (new Set(items).size !== items.length) failures.push(`Duplicate ${name} identifier`);
}

checkUniqueness(slugs, "service");
checkUniqueness(articleSlugs, "article");

for (const slug of slugs) {
  if (!articleSlugs.includes(slug)) failures.push(`Missing article for service: ${slug}`);
}
for (const slug of articleSlugs) {
  if (!slugs.includes(slug)) failures.push(`Orphaned article: ${slug}`);
}

function checkImages(text, label) {
  const images = [...text.matchAll(/\bimage:\s*"(\/[^"]+)"/g)].map((match) => match[1]);
  for (const src of images) {
    if (!existsSync(join(root, "public", src.replace(/^\//, "")))) {
      failures.push(`Missing ${label} image: ${src}`);
    }
  }
  return images.length;
}

const serviceImages = checkImages(catalog, "service");
const doctorImages = checkImages(doctorData, "doctor");

if (failures.length > 0) {
  for (const failure of failures) console.error("ERROR:", failure);
  process.exit(1);
}

console.log(`PASS: ${slugs.length} services, ${articleSlugs.length} articles, ${serviceImages} service images, ${doctorImages} doctor photos.`);
