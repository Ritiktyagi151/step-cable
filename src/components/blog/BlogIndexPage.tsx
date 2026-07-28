import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/lib/content";

type BlogIndexPageProps = {
  posts: BlogPost[];
};

export function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <>
      <section className="border-b border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-300">Insights</p>
          <h1 className="mt-4 text-5xl font-black">Blog</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>
    </>
  );
}
