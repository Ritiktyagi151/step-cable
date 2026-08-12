import path from "path";
import type { ContentImage, SitePage } from "@/lib/content";

export type CadillacProduct = ContentImage & {
  slug: string;
};

function slugifyProductTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidProductImage(image: ContentImage): image is ContentImage & { src: string } {
  return Boolean(image && typeof image.src === "string" && image.src.trim());
}

export function getRangeProducts(page: SitePage, range: "cadillac" | "lincoln"): CadillacProduct[] {
  const slugCounts = new Map<string, number>();

  return page.images
    .filter(isValidProductImage)
    .filter((image) => image.src.trim() !== page.image)
    .map((image) => {
      const src = image.src.trim();
      const title = image.title || image.alt || path.basename(src).replace(/\.[^.]+$/, "");
      const titleSlug = slugifyProductTitle(title);
      const fallbackSlug = path.basename(image.src).replace(/\.[^.]+$/, "");
      const baseSlug = titleSlug || fallbackSlug;
      const count = slugCounts.get(baseSlug) || 0;
      slugCounts.set(baseSlug, count + 1);

      return {
        ...image,
        src,
        alt: image.alt || title,
        title,
        slug: count ? `${baseSlug}-${count + 1}` : baseSlug,
      };
    });
}

export function getCadillacProducts(page: SitePage): CadillacProduct[] {
  return getRangeProducts(page, "cadillac");
}

export function getCadillacProductBySlug(page: SitePage, slug: string) {
  return getCadillacProducts(page).find((product) => product.slug === slug);
}

export function getLincolnProducts(page: SitePage): CadillacProduct[] {
  return getRangeProducts(page, "lincoln");
}

export function getLincolnProductBySlug(page: SitePage, slug: string) {
  return getLincolnProducts(page).find((product) => product.slug === slug);
}
