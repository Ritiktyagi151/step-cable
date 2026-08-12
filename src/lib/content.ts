import fs from "fs";
import path from "path";
import { cleanSlug } from "./urls";

export type SitePage = {
  slug: string;
  url: string;
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  h1: string;
  contentText: string;
  contentBlocks: ContentBlock[];
  links: ContentLink[];
  images: ContentImage[];
  schema: string[];
};

export type BlogPost = {
  id: number;
  slug: string;
  url: string;
  title: string;
  description: string;
  contentText: string;
  contentBlocks: ContentBlock[];
  links: ContentLink[];
  images: ContentImage[];
  excerpt: string;
  date: string;
  modified: string;
  image?: string;
  seoTitle?: string;
  keywords?: string;
};

export type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string }
  | { type: "table"; rows: string[][] }
  | { type: "form"; fields: ContentFormField[]; buttons: string[] };

export type ContentLink = {
  href: string;
  text: string;
};

export type ContentImage = {
  src: string;
  alt: string;
  title?: string;
  code?: string;
  specs?: string[];
};

export type ContentFormField = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
};

const dataDir = path.join(process.cwd(), "src", "data");

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
  "conductors.json",
] as const;

function readJson<T>(file: string, fallback: T): T {
  const target = path.join(dataDir, file);
  if (!fs.existsSync(target)) return fallback;
  return JSON.parse(fs.readFileSync(target, "utf8")) as T;
}

export function getPages() {
  const pages = readJson<SitePage[]>("static-pages.json", []);
  const groupedPages = pageDataFiles.flatMap((file) => readJson<SitePage[]>(file, []));

  return [...groupedPages, ...pages];
}

export function getPageBySlug(slug: string) {
  const targetSlug = cleanSlug(slug);
  return getPages().find((page) => cleanSlug(page.slug) === targetSlug || cleanSlug(page.url) === targetSlug);
}

export function getBlogPosts() {
  return readJson<BlogPost[]>("static-blog-posts.json", []).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}
