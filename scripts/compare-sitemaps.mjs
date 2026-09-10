import fs from "fs";

const OLD_SITEMAP = "_legacy_unused_backup/sitemap.xml";
const NEW_SITEMAP = "public/sitemap.xml";
const REPORT_FILE = "url-comparison-report.md";
const ADDED_FILE = "url-diff-added-new-urls.txt";
const REMOVED_FILE = "url-diff-removed-old-urls.txt";
const CHANGED_FILE = "url-diff-html-to-clean-urls.txt";
const SITE_URL = "https://www.stepcable.com";

function locs(file) {
  return (fs.readFileSync(file, "utf8").match(/<loc>(.*?)<\/loc>/g) || []).map((value) =>
    value.replace(/<\/?loc>/g, "")
  );
}

function cleanUrl(url) {
  return url
    .replace(/^https?:\/\/(www\.)?stepcable\.com\/?/i, `${SITE_URL}/`)
    .replace(/\/index\.html$/i, "/")
    .replace(/\.html$/i, "");
}

function category(url) {
  if (url.includes("/step-cadillac/")) return "STEP Cadillac product detail URLs";
  if (url === `${SITE_URL}/step-cadillac`) return "STEP Cadillac listing page";
  if (url.includes("/step-lincoln/")) return "STEP Lincoln product detail URLs";
  if (url === `${SITE_URL}/step-lincoln`) return "STEP Lincoln listing page";
  if (url.includes("/blog/tag/")) return "Old WordPress blog tag URLs";
  if (url.includes("/blog/category/")) return "Old WordPress blog category URLs";
  if (url.includes("/blog/author/")) return "Old WordPress blog author URLs";
  if (url.includes("/blog/")) return "Blog URLs";
  if (url.includes("/pdf/")) return "PDF URLs";
  return "Main site page URLs";
}

function lines(items) {
  return items.length ? items.map((item, index) => `${index + 1}. ${item}`).join("\n") : "None";
}

function groupedLines(items) {
  const groups = new Map();
  for (const item of items) {
    const name = category(item);
    groups.set(name, [...(groups.get(name) || []), item]);
  }

  return [...groups.entries()]
    .map(([name, values]) => `### ${name} (${values.length})\n\n${lines(values)}`)
    .join("\n\n");
}

const oldRaw = locs(OLD_SITEMAP);
const newRaw = locs(NEW_SITEMAP);
const oldNormalized = [...new Set(oldRaw.map(cleanUrl))];
const newNormalized = [...new Set(newRaw.map(cleanUrl))];
const added = newNormalized.filter((url) => !oldNormalized.includes(url));
const removed = oldNormalized.filter((url) => !newNormalized.includes(url));
const same = newNormalized.filter((url) => oldNormalized.includes(url));
const htmlChanged = oldRaw
  .filter((url) => url.endsWith(".html") && newNormalized.includes(cleanUrl(url)))
  .map((url) => `${url} -> ${cleanUrl(url)}`);

const addedByCategory = [...added.reduce((map, url) => {
  const name = category(url);
  map.set(name, (map.get(name) || 0) + 1);
  return map;
}, new Map()).entries()];

const removedByCategory = [...removed.reduce((map, url) => {
  const name = category(url);
  map.set(name, (map.get(name) || 0) + 1);
  return map;
}, new Map()).entries()];

const report = `# Step Cable URL Comparison Report

Source files compared:
- Old URLs: \`${OLD_SITEMAP}\`
- New URLs: \`${NEW_SITEMAP}\`

## Summary

- Old sitemap URLs: ${oldRaw.length}
- New sitemap URLs: ${newRaw.length}
- Same URLs after normalizing old \`.html\` URLs: ${same.length}
- Old \`.html\` URLs now changed to clean URLs: ${htmlChanged.length}
- New URLs added: ${added.length}
- Old URLs removed: ${removed.length}

## What Changed

- Main old HTML pages are now clean URLs. Example: \`/about-step-industry.html\` -> \`/about-step-industry\`.
- New sitemap now includes product detail URLs for STEP Cadillac and STEP Lincoln.
- New sitemap now includes product range listing pages: \`/step-cadillac\` and \`/step-lincoln\`.
- New sitemap now includes extra PDF download URLs.
- Old WordPress tag/category/author archive URLs are removed from sitemap.

## Added URLs By Category

${addedByCategory.map(([name, count]) => `- ${name}: ${count}`).join("\n")}

## Removed URLs By Category

${removedByCategory.map(([name, count]) => `- ${name}: ${count}`).join("\n")}

## Added URLs

${groupedLines(added)}

## Removed Old URLs

${groupedLines(removed)}

## Old HTML URLs Changed To Clean URLs

${lines(htmlChanged)}
`;

fs.writeFileSync(REPORT_FILE, report);
fs.writeFileSync(ADDED_FILE, `${added.join("\n")}\n`);
fs.writeFileSync(REMOVED_FILE, `${removed.join("\n")}\n`);
fs.writeFileSync(CHANGED_FILE, `${htmlChanged.join("\n")}\n`);

console.log(`Compared ${oldRaw.length} old URLs with ${newRaw.length} new URLs.`);
console.log(`Same: ${same.length}, Added: ${added.length}, Removed: ${removed.length}, HTML changed: ${htmlChanged.length}.`);
