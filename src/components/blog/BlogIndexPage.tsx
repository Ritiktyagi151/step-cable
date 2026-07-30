import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/lib/content";

type BlogIndexPageProps = {
  posts: BlogPost[];
};

export function BlogIndexPage({ posts }: BlogIndexPageProps) {
  return (
    <>
      <section className="bg-[linear-gradient(rgba(91,192,187,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,187,0.08)_1px,transparent_1px)] bg-[size:44px_44px] border-b border-brand-teal/15 bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="w-fit rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-dark sm:text-sm sm:tracking-[0.35em]">Insights</p>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl">Blog</h1>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 bg-white px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:px-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>
    </>
  );
}
