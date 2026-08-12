import path from "path";
import type { ContentImage, SitePage } from "@/lib/content";

export type CadillacProduct = ContentImage & {
  slug: string;
};

export function getRangeProducts(page: SitePage, range: "cadillac" | "lincoln"): CadillacProduct[] {
  return page.images
    .filter((image) => image.src.includes(`/product-images/${range}/`))
    .map((image) => ({
      ...image,
      slug: path.basename(image.src).replace(/\.[^.]+$/, ""),
    }));
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
