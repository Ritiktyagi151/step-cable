import Link from "next/link";
import type { BlogPost } from "@/lib/content";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35">
      {post.image ? <img src={post.image} alt={post.title} className="aspect-[4/3] w-full object-cover" /> : null}
      <div className="p-5">
        <time className="text-xs uppercase tracking-[0.25em] text-brand-dark">{new Date(post.date).toLocaleDateString("en-IN")}</time>
        <h2 className="mt-3 text-2xl font-black leading-tight text-slate-900">
          <Link href={post.url}>{post.title}</Link>
        </h2>
        <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{post.description || post.excerpt}</p>
        <Link href={post.url} className="mt-5 inline-block rounded-full border border-brand-teal/35 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-brand-teal/10 hover:text-brand-dark">
          Read
        </Link>
      </div>
    </article>
  );
}
