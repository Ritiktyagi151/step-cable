import { CleanContent } from "@/components/content/CleanContent";
import type { BlogPost } from "@/lib/content";

type BlogPostPageProps = {
  post: BlogPost;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <article>
      <header className="bg-[linear-gradient(rgba(91,192,187,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,187,0.08)_1px,transparent_1px)] bg-[size:44px_44px] border-b border-brand-teal/15 bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-10">
            <time className="text-xs uppercase tracking-[0.22em] text-brand-dark sm:text-sm sm:tracking-[0.35em]">{new Date(post.date).toLocaleDateString("en-IN")}</time>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
            {post.description ? <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{post.description}</p> : null}
          </div>
        </div>
      </header>
      {post.image ? <img src={post.image} alt={post.title} className="h-[280px] w-full object-cover sm:h-[52vh] sm:min-h-80" /> : null}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <CleanContent blocks={post.contentBlocks} />
      </section>
    </article>
  );
}
