import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostPage } from "@/components/blog/BlogPostPage";
import { SiteShell } from "@/components/SiteShell";
import { getBlogPost, getBlogPosts } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://www.stepcable.com${post.url}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.description,
      url: post.url,
      images: post.image ? [post.image] : undefined
    },
    twitter: {
      card: "summary",
      title: post.seoTitle || post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined
    },
    robots: "index, follow"
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <BlogPostPage post={post} />
    </SiteShell>
  );
}
