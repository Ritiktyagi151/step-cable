import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/blog/BlogIndexPage";
import { SiteShell } from "@/components/SiteShell";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog - Step Cables",
  description: "Latest articles from Step Cables.",
  alternates: { canonical: "https://www.stepcable.com/blog/" }
};

export default function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <SiteShell>
      <BlogIndexPage posts={posts} />
    </SiteShell>
  );
}
