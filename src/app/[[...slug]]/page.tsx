import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { CadillacProductDetailPage } from "@/components/product/CadillacProductDetailPage";
import { LincolnProductDetailPage } from "@/components/product/LincolnProductDetailPage";
import { getCadillacProductBySlug, getCadillacProducts, getLincolnProductBySlug, getLincolnProducts } from "@/components/product/cadillacProducts";
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
  const cadillacPage = getPageBySlug("step-cadillac");
  const cadillacProductParams = cadillacPage
    ? getCadillacProducts(cadillacPage).map((product) => ({ slug: ["step-cadillac", product.slug] }))
    : [];
  const lincolnPage = getPageBySlug("step-lincoln");
  const lincolnProductParams = lincolnPage
    ? getLincolnProducts(lincolnPage).map((product) => ({ slug: ["step-lincoln", product.slug] }))
    : [];

  return [
    { slug: [] },
    ...getPages()
    .filter((page) => page.slug !== "")
    .map((page) => ({ slug: cleanPath(page.slug).replace(/^\/+/, "").split("/") })),
    ...cadillacProductParams,
    ...lincolnProductParams
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawSlug = toSlug(slug);
  if (slug?.[0] === "step-cadillac" && slug[1]) {
    const cadillacPage = getPageBySlug("step-cadillac");
    const product = cadillacPage ? getCadillacProductBySlug(cadillacPage, slug[1]) : undefined;
    if (!cadillacPage || !product) return {};

    const title = `${product.title || product.alt} | STEP Cadillac - Step Cables`;
    const description = product.specs?.join(", ") || cadillacPage.description;

    return {
      title,
      description,
      alternates: {
        canonical: `/step-cadillac/${product.slug}`
      },
      openGraph: {
        title,
        description,
        url: `/step-cadillac/${product.slug}`,
        images: [product.src]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [product.src]
      },
      robots: "index, follow"
    };
  }
  if (slug?.[0] === "step-lincoln" && slug[1]) {
    const lincolnPage = getPageBySlug("step-lincoln");
    const product = lincolnPage ? getLincolnProductBySlug(lincolnPage, slug[1]) : undefined;
    if (!lincolnPage || !product) return {};

    const title = `${product.title || product.alt} | STEP Lincoln - Step Cables`;
    const description = product.specs?.join(", ") || lincolnPage.description;

    return {
      title,
      description,
      alternates: {
        canonical: `/step-lincoln/${product.slug}`
      },
      openGraph: {
        title,
        description,
        url: `/step-lincoln/${product.slug}`,
        images: [product.src]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [product.src]
      },
      robots: "index, follow"
    };
  }

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
  if (slug?.[0] === "step-cadillac" && slug[1]) {
    const cadillacPage = getPageBySlug("step-cadillac");
    const product = cadillacPage ? getCadillacProductBySlug(cadillacPage, slug[1]) : undefined;
    if (!cadillacPage || !product) notFound();

    return (
      <SiteShell>
        <CadillacProductDetailPage page={cadillacPage} product={product} />
      </SiteShell>
    );
  }
  if (slug?.[0] === "step-lincoln" && slug[1]) {
    const lincolnPage = getPageBySlug("step-lincoln");
    const product = lincolnPage ? getLincolnProductBySlug(lincolnPage, slug[1]) : undefined;
    if (!lincolnPage || !product) notFound();

    return (
      <SiteShell>
        <LincolnProductDetailPage page={lincolnPage} product={product} />
      </SiteShell>
    );
  }

  const page = getPageBySlug(rawSlug);
  if (!page) notFound();

  return (
    <SiteShell>
      <SitePageRenderer page={page} />
    </SiteShell>
  );
}
