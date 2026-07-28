import fs from "fs";
import path from "path";

const slugs = new Set([
  "electrical-switch.html",
  "electrical-tapes.html",
  "mcb.html",
  "modular-plates.html",
  "modular-switch-board.html",
  "modular-switches.html",
  "switch-plates.html"
]);

function metaDescription(html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  return match ? match[1].replace(/&amp;/g, "&").replace(/\s+/g, " ").trim() : "";
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

for (const file of ["src/data/static-pages.json", "src/data/static-products.json"]) {
  const pages = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const page of pages) {
    if (!slugs.has(page.slug)) continue;
    const html = fs.readFileSync(path.join("_legacy_unused_backup", page.slug), "utf8");
    const text = metaDescription(html) || page.description;
    if (!text) continue;
    const hasParagraph = page.contentBlocks.some((block) => block.type === "paragraph" && block.text === text);
    if (!hasParagraph) {
      const descriptionIndex = page.contentBlocks.findIndex((block) => block.type === "heading" && /^Description$/i.test(block.text));
      page.contentBlocks.splice(descriptionIndex >= 0 ? descriptionIndex + 1 : page.contentBlocks.length, 0, { type: "paragraph", text });
    }
    page.contentText = contentText(page.contentBlocks);
  }
  fs.writeFileSync(file, `${JSON.stringify(pages, null, 2)}\n`);
}

console.log("Added meta description content to short product pages.");
