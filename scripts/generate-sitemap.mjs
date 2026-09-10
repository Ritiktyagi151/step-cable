import fs from "fs";
import path from "path";

const SITE_URL = "https://www.stepcable.com";
const DATA_DIR = path.join(process.cwd(), "src", "data");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const pageDataFiles = [
  "home-page.json",
  "contact-page.json",
  "about-pages.json",
  "epc-pages.json",
  "company-pages.json",
  "clients-pages.json",
  "career-pages.json",
  "policy-pages.json",
  "sitemap-pages.json",
  "wire-and-cables.json",
  "switches-and-accessories.json",
  "step-lincoln.json",
  "step-cadillac.json",
  "conductors.json",
];

function readJson(file, fallback = []) {
  const target = path.join(DATA_DIR, file);
  if (!fs.existsSync(target)) return fallback;
  return JSON.parse(fs.readFileSync(target, "utf8").replace(/^\uFEFF/, ""));
}

function cleanPath(value) {
  if (!value || value === "/" || value === "index.html" || value === "/index.html") return "/";
  const withoutDomain = value.replace(/^https?:\/\/www\.stepcable\.com\/?/i, "");
  const normalized = withoutDomain.startsWith("/") ? withoutDomain : `/${withoutDomain}`;
  return normalized.replace(/\/index\.html$/i, "/").replace(/\.html$/i, "");
}

function absoluteUrl(value) {
  const clean = cleanPath(value);
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
}

function xmlEscape(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function slugifyProductTitle(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getRangeProducts(page) {
  const slugCounts = new Map();
  const pageImage = page.image?.trim();

  return (page.images || [])
    .filter((image) => image?.src?.trim())
    .filter((image) => image.src.trim() !== pageImage)
    .map((image) => {
      const src = image.src.trim();
      const title = image.title || image.alt || path.basename(src).replace(/\.[^.]+$/, "");
      const titleSlug = slugifyProductTitle(title);
      const fallbackSlug = path.basename(src).replace(/\.[^.]+$/, "");
      const baseSlug = titleSlug || fallbackSlug;
      const count = slugCounts.get(baseSlug) || 0;
      slugCounts.set(baseSlug, count + 1);
      return count ? `${baseSlug}-${count + 1}` : baseSlug;
    });
}

function addUrl(urls, value, priority) {
  urls.set(absoluteUrl(value), priority);
}

const pages = pageDataFiles.flatMap((file) => readJson(file));
const blogPosts = readJson("static-blog-posts.json");
const urls = new Map();

for (const page of pages) {
  if (page.url) addUrl(urls, page.url, page.slug === "" ? "1.00" : "0.80");
}

addUrl(urls, "/blog/", "0.80");

for (const post of blogPosts) {
  if (post.url) addUrl(urls, post.url, "0.70");
}

for (const page of pages.filter((page) => page.slug === "step-cadillac" || page.slug === "step-lincoln")) {
  for (const productSlug of getRangeProducts(page)) {
    addUrl(urls, `/${page.slug}/${productSlug}`, "0.60");
  }
}

const pdfDir = path.join(PUBLIC_DIR, "pdf");
if (fs.existsSync(pdfDir)) {
  for (const file of fs.readdirSync(pdfDir).filter((file) => file.toLowerCase().endsWith(".pdf")).sort()) {
    addUrl(urls, `/pdf/${file}`, "0.50");
  }
}

const sortedUrls = [...urls.entries()].sort(([a], [b]) => {
  if (a === `${SITE_URL}/`) return -1;
  if (b === `${SITE_URL}/`) return 1;
  return a.localeCompare(b);
});

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sortedUrls.flatMap(([loc, priority]) => [
    "  <url>",
    `    <loc>${xmlEscape(loc)}</loc>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml);

console.log(`Generated public/sitemap.xml with ${sortedUrls.length} URLs.`);
