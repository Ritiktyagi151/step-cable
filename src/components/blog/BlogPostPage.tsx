import { CleanContent } from "@/components/content/CleanContent";
import type { BlogPost } from "@/lib/content";

type BlogPostPageProps = {
  post: BlogPost;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <article>
      <header className="border-b border-black bg-black text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <time className="text-sm uppercase tracking-[0.35em] text-neutral-300">{new Date(post.date).toLocaleDateString("en-IN")}</time>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">{post.title}</h1>
          {post.description ? <p className="mt-5 text-lg leading-8 text-neutral-200">{post.description}</p> : null}
        </div>
      </header>
      {post.image ? <img src={post.image} alt={post.title} className="h-[52vh] min-h-80 w-full object-cover grayscale" /> : null}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <CleanContent blocks={post.contentBlocks} />
      </section>
    </article>
  );
}
