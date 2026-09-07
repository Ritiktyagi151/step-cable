import { getCadillacProducts, getLincolnProducts } from "@/components/product/rangeProducts";
import { getBlogPosts, getPages, type BlogPost, type SitePage } from "./content";

type SearchDocument = {
  id: string;
  title: string;
  url: string;
  description: string;
  type: "Page" | "Blog" | "Product";
  text: string;
  priority: number;
};

export type SearchResult = Pick<SearchDocument, "title" | "url" | "description" | "type"> & {
  score: number;
};

const stopWords = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "in", "is", "it", "of", "on", "or", "the", "to", "with"]);

const relatedTerms: Record<string, string[]> = {
  cable: ["wire", "wires", "wiring", "conductor"],
  cables: ["wire", "wires", "wiring", "conductor"],
  electrical: ["electric", "power"],
  electric: ["electrical", "power"],
  fireproof: ["fire", "fr", "frls", "retardant", "low", "smoke"],
  home: ["house", "housing", "building", "domestic"],
  house: ["home", "housing", "building", "domestic"],
  housing: ["house", "home", "building", "domestic"],
  mcb: ["miniature", "circuit", "breaker", "distribution"],
  modular: ["switch", "switches", "plate", "box", "accessories"],
  switch: ["switches", "modular", "cadillac"],
  switches: ["switch", "modular", "cadillac"],
  wire: ["wires", "wiring", "cable", "conductor", "electrical"],
  wires: ["wire", "wiring", "cable", "conductor", "electrical"],
  wiring: ["wire", "wires", "cable", "house", "housing", "building"],
};

function normalizeToken(token: string) {
  const lowerToken = token.toLowerCase();
  const aliases: Record<string, string> = {
    cables: "cable",
    switches: "switch",
    wired: "wire",
    wires: "wire",
    wiring: "wire",
  };

  if (aliases[lowerToken]) return aliases[lowerToken];
  if (lowerToken.endsWith("ies") && lowerToken.length > 4) return `${lowerToken.slice(0, -3)}y`;
  if (lowerToken.endsWith("s") && lowerToken.length > 4) return lowerToken.slice(0, -1);
  return lowerToken;
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .match(/[a-z0-9]+/g)
    ?.map(normalizeToken)
    .filter((token) => token.length > 1 && !stopWords.has(token)) ?? [];
}

function expandQueryTokens(tokens: string[]) {
  const expanded = new Map<string, number>();

  tokens.forEach((token) => {
    expanded.set(token, (expanded.get(token) ?? 0) + 2);
    relatedTerms[token]?.forEach((related) => {
      const normalized = normalizeToken(related);
      expanded.set(normalized, (expanded.get(normalized) ?? 0) + 0.7);
    });
  });

  return expanded;
}

function termFrequency(tokens: string[]) {
  const vector = new Map<string, number>();
  tokens.forEach((token) => vector.set(token, (vector.get(token) ?? 0) + 1));
  return vector;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>) {
  let dot = 0;
  let aMagnitude = 0;
  let bMagnitude = 0;

  a.forEach((value, token) => {
    dot += value * (b.get(token) ?? 0);
    aMagnitude += value * value;
  });
  b.forEach((value) => {
    bMagnitude += value * value;
  });

  if (!aMagnitude || !bMagnitude) return 0;
  return dot / (Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude));
}

function excerpt(text: string, query: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const queryTokens = tokenize(query);
  const lowerClean = clean.toLowerCase();
  const index = queryTokens.reduce((best, token) => {
    const nextIndex = lowerClean.indexOf(token);
    return nextIndex === -1 || (best !== -1 && best < nextIndex) ? best : nextIndex;
  }, lowerClean.indexOf(query.toLowerCase()));

  if (index === -1) return clean.slice(0, 180);
  return clean.slice(Math.max(0, index - 70), index + 140);
}

function buildPageText(page: SitePage) {
  return [page.title, page.h1, page.description, page.keywords, page.slug, page.contentText, page.links.map((link) => link.text).join(" ")].filter(Boolean).join(" ");
}

function buildBlogText(post: BlogPost) {
  return [post.title, post.description, post.keywords, post.slug, post.contentText].filter(Boolean).join(" ");
}

function buildSearchDocuments(): SearchDocument[] {
  const pages = getPages();
  const documents: SearchDocument[] = [
    ...pages.map((page) => ({
      id: `page-${page.url}`,
      title: page.h1 || page.title,
      url: page.url,
      description: page.description || excerpt(page.contentText, page.title),
      type: "Page" as const,
      text: buildPageText(page),
      priority: page.slug === "sitemap" ? 0.35 : 1.15,
    })),
    ...getBlogPosts().map((post) => ({
      id: `blog-${post.slug}`,
      title: post.title,
      url: `/blog/${post.slug}`,
      description: post.description || post.excerpt || excerpt(post.contentText, post.title),
      type: "Blog" as const,
      text: buildBlogText(post),
      priority: 1,
    })),
  ];

  pages.forEach((page) => {
    const products = page.slug === "step-cadillac" ? getCadillacProducts(page) : page.slug === "step-lincoln" ? getLincolnProducts(page) : [];

    products.forEach((product) => {
      const title = product.title || product.alt;
      const specs = product.specs?.join(" ") ?? "";
      documents.push({
        id: `product-${page.slug}-${product.slug}`,
        title,
        url: `${page.url}/${product.slug}`,
        description: product.specs?.find((spec) => spec.startsWith("Category: ")) || product.code || page.description,
        type: "Product",
        text: [title, product.alt, product.code, specs, page.title, page.h1, page.keywords].filter(Boolean).join(" "),
        priority: 1.35,
      });
    });
  });

  return documents;
}

export function searchSite(query: string, limit = 40): SearchResult[] {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  const documents = buildSearchDocuments();
  const queryVector = expandQueryTokens(tokenize(cleanQuery));
  const documentTermCounts = documents.map((document) => termFrequency(tokenize(document.text)));
  const documentFrequency = new Map<string, number>();

  documentTermCounts.forEach((terms) => {
    terms.forEach((_, token) => documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1));
  });

  const toTfIdf = (terms: Map<string, number>) => {
    const vector = new Map<string, number>();
    terms.forEach((count, token) => {
      const idf = Math.log((documents.length + 1) / ((documentFrequency.get(token) ?? 0) + 1)) + 1;
      vector.set(token, count * idf);
    });
    return vector;
  };

  const weightedQueryVector = toTfIdf(queryVector);
  const lowerQuery = cleanQuery.toLowerCase();
  const importantQueryTokens = [...queryVector.entries()].filter(([, weight]) => weight >= 0.7).map(([token]) => token);

  return documents
    .map((document, index) => {
      const haystack = document.text.toLowerCase();
      const titleTokens = new Set(tokenize(document.title));
      const urlTokens = new Set(tokenize(document.url));
      const titleTokenBoost = importantQueryTokens.filter((token) => titleTokens.has(token)).length * 0.16;
      const urlTokenBoost = importantQueryTokens.filter((token) => urlTokens.has(token)).length * 0.1;
      const exactBoost = haystack.includes(lowerQuery) ? 0.35 : 0;
      const titleBoost = document.title.toLowerCase().includes(lowerQuery) ? 0.3 : 0;
      const score = (cosineSimilarity(weightedQueryVector, toTfIdf(documentTermCounts[index])) + exactBoost + titleBoost + titleTokenBoost + urlTokenBoost) * document.priority;

      return {
        title: document.title,
        url: document.url,
        description: document.description || excerpt(document.text, cleanQuery),
        type: document.type,
        score,
      };
    })
    .filter((result) => result.score > 0.03)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
