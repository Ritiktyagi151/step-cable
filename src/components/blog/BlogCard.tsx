import Link from "next/link";
import type { BlogPost } from "@/lib/content";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="border border-black bg-white">
      {post.image ? <img src={post.image} alt={post.title} className="aspect-[4/3] w-full object-cover grayscale" /> : null}
      <div className="p-5">
        <time className="text-xs uppercase tracking-[0.25em] text-neutral-500">{new Date(post.date).toLocaleDateString("en-IN")}</time>
        <h2 className="mt-3 text-2xl font-black leading-tight">
          <Link href={post.url}>{post.title}</Link>
        </h2>
        <p className="mt-3 line-clamp-4 text-sm leading-6 text-neutral-700">{post.description || post.excerpt}</p>
        <Link href={post.url} className="mt-5 inline-block border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white">
          Read
        </Link>
      </div>
    </article>
  );
}
