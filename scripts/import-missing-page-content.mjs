import fs from "fs";
import path from "path";

const root = process.cwd();
const legacyDir = path.join(root, "_legacy_unused_backup");
const targets = new Set([
  "electrical-switch.html",
  "electrical-tapes.html",
  "mcb.html",
  "modular-plates.html",
  "modular-switch-board.html",
  "modular-switches.html",
  "switch-plates.html",
  "core-values.html",
  "manufacturing-plant.html",
  "application-form.html",
  "clients1.html",
  "hr-philosophy.html",
  "manufacturing-plant-2.html",
  "return-policy.html",
  "contact.html",
  "certification.html",
  "iso-certification.html"
]);

function decodeEntities(value) {
  return value
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/&#8211;|&ndash;/gi, "-")
    .replace(/&#8212;|&mdash;/gi, "-")
    .replace(/&#8216;|&lsquo;/gi, "'")
    .replace(/&#8217;|&rsquo;/gi, "'")
    .replace(/&#8220;|&ldquo;/gi, '"')
    .replace(/&#8221;|&rdquo;/gi, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? decodeEntities(match[1].trim()) : "";
}

function mainHtml(html) {
  const start = html.search(/<div[^>]+id=["']main-content["'][^>]*>/i);
  if (start === -1) return html;
  const footer = html.slice(start).search(/<footer\b|<div[^>]+id=["']footer["']|<div[^>]+class=["'][^"']*footer/i);
  return footer === -1 ? html.slice(start) : html.slice(start, start + footer);
}

function collectLinks(html) {
  const links = [];
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = attr(match[1], "href");
    const text = cleanText(match[2]);
    if (!href || !text || href.startsWith("#") || href.startsWith("javascript:")) continue;
    links.push({ href: href.replace(/\.html$/i, ""), text });
  }
  return [...new Map(links.map((link) => [`${link.href}|${link.text}`, link])).values()];
}

function collectImages(html) {
  const images = [];
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    const src = attr(match[1], "src");
    if (!src || src.includes("facebook.com/tr")) continue;
    images.push({ src: src.startsWith("/") ? src : `/${src}`, alt: attr(match[1], "alt") || "Step Cables" });
  }
  return [...new Map(images.map((image) => [image.src, image])).values()];
}

function collectFormFields(html) {
  const fields = [];
  for (const match of html.matchAll(/<(input|textarea|select)\b([^>]*)>/gi)) {
    const tag = match[1].toLowerCase();
    const attrs = match[2];
    const type = tag === "input" ? attr(attrs, "type") || "text" : tag;
    if (["hidden", "submit", "button", "reset"].includes(type)) continue;
    const name = attr(attrs, "name") || attr(attrs, "id") || attr(attrs, "placeholder") || type;
    fields.push({
      label: attr(attrs, "placeholder") || name.replace(/[-_]/g, " "),
      name,
      type,
      placeholder: attr(attrs, "placeholder"),
      required: /\brequired\b/i.test(attrs)
    });
  }
  const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>|<input\b([^>]*)>/gi)]
    .map((match) => cleanText(match[1] || attr(match[2] || "", "value")))
    .filter(Boolean);
  return fields.length ? { type: "form", fields, buttons } : null;
}

function parseBlocks(html) {
  const blocks = [];
  const tokenRe = /<(h[1-6]|p|ul|ol|table|img|form)\b([^>]*)>([\s\S]*?)<\/\1>|<img\b([^>]*)>/gi;
  for (const match of html.matchAll(tokenRe)) {
    const tag = (match[1] || "img").toLowerCase();
    const attrs = match[2] || match[4] || "";
    const inner = match[3] || "";
    if (/widget-title|breadcrumbs|menu-item|footer|top-bar|site-logo/i.test(attrs)) continue;

    if (/^h[1-6]$/.test(tag)) {
      const text = cleanText(inner);
      if (text && !["ABOUT US", "COMPANY LINKS", "CONTACT INFO"].includes(text.toUpperCase())) {
        blocks.push({ type: "heading", level: tag === "h2" ? 2 : 3, text });
      }
      continue;
    }

    if (tag === "p") {
      const text = cleanText(inner);
      if (text && text.length > 2) blocks.push({ type: "paragraph", text });
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((item) => cleanText(item[1])).filter(Boolean);
      if (items.length) blocks.push({ type: "list", items });
      continue;
    }

    if (tag === "table") {
      const rows = [...inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
        .map((row) => [...row[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => cleanText(cell[1])).filter(Boolean))
        .filter((row) => row.length);
      if (rows.length) blocks.push({ type: "table", rows });
      continue;
    }

    if (tag === "img") {
      const src = attr(attrs, "src");
      if (src && !src.includes("facebook.com/tr")) blocks.push({ type: "image", src: src.startsWith("/") ? src : `/${src}`, alt: attr(attrs, "alt") || "Step Cables" });
      continue;
    }

    if (tag === "form") {
      const form = collectFormFields(inner);
      if (form) blocks.push(form);
    }
  }

  const meaningful = blocks.filter((block) => {
    if (block.type === "paragraph") return block.text.length > 8;
    if (block.type === "heading") return block.text.length > 2;
    return true;
  });

  if (meaningful.length) return meaningful;
  const fallback = cleanText(html);
  return fallback ? [{ type: "paragraph", text: fallback }] : [];
}

function contentText(blocks) {
  return blocks
    .flatMap((block) => {
      if (block.type === "heading" || block.type === "paragraph") return [block.text];
      if (block.type === "list") return block.items;
      if (block.type === "table") return block.rows.flat();
      if (block.type === "form") return [...block.fields.map((field) => field.label), ...block.buttons];
      return [block.alt];
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function updateFile(file) {
  const fullPath = path.join(root, file);
  const pages = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  let changed = 0;
  for (const page of pages) {
    if (!targets.has(page.slug)) continue;
    const legacyPath = path.join(legacyDir, page.slug);
    if (!fs.existsSync(legacyPath)) continue;
    const section = mainHtml(fs.readFileSync(legacyPath, "utf8"));
    const blocks = parseBlocks(section);
    const text = contentText(blocks);
    if (text.length <= (page.contentText || "").length) continue;
    page.contentBlocks = blocks;
    page.contentText = text;
    page.links = collectLinks(section);
    page.images = collectImages(section);
    changed += 1;
  }
  fs.writeFileSync(fullPath, `${JSON.stringify(pages, null, 2)}\n`);
  return changed;
}

const changedPages = updateFile("src/data/static-pages.json");
const changedProducts = updateFile("src/data/static-products.json");
console.log(`Updated ${changedPages} pages and ${changedProducts} product entries.`);
