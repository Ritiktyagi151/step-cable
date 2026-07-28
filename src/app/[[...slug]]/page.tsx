import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { SitePageRenderer } from "@/components/pages/SitePageRenderer";
import { SiteShell } from "@/components/SiteShell";
import { getPageBySlug, getPages } from "@/lib/content";
import { cleanPath } from "@/lib/urls";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

function toSlug(parts?: string[]) {
  if (!parts || parts.length === 0) return "";
  return parts.join("/");
}

export function generateStaticParams() {
  return [
    { slug: [] },
    ...getPages()
    .filter((page) => page.slug !== "")
    .map((page) => ({ slug: cleanPath(page.slug).replace(/^\/+/, "").split("/") }))
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawSlug = toSlug(slug);
  const page = getPageBySlug(rawSlug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.canonical || page.url
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.url,
      images: page.image ? [page.image] : undefined
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
      images: page.image ? [page.image] : undefined
    },
    robots: "index, follow"
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const rawSlug = toSlug(slug);
  if (slug?.length && rawSlug.endsWith(".html")) redirect(cleanPath(rawSlug));
  const page = getPageBySlug(rawSlug);
  if (!page) notFound();

  return (
    <SiteShell>
      <SitePageRenderer page={page} />
    </SiteShell>
  );
}
