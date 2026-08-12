import { BlogCard } from "./BlogCard";
import { PageHero } from "@/components/PageHero";
import type { BlogPost } from "@/lib/content";

type BlogIndexPageProps = {
  posts: BlogPost[];
};

export function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <>
      <PageHero slug="blog" title="Blog" description="Latest articles, cable guides and electrical industry insights from Step Cables." />
      <section className="mx-auto grid max-w-7xl gap-5 bg-white px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:px-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>
    </>
  );
}
