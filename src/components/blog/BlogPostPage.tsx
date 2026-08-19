import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaEnvelope, FaLayerGroup } from "react-icons/fa";
import { CleanContent } from "@/components/content/CleanContent";
import type { BlogPost } from "@/lib/content";

type BlogPostPageProps = {
  post: BlogPost;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 190));
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  const readingTime = getReadingTime(post.contentText);
  const headings = post.contentBlocks
    .filter((block) => block.type === "heading")
    .slice(0, 5)
    .map((block) => block.text.replace(/^#+\s*/, ""));

  return (
    <article className="bg-[#f7faf9] text-slate-900">
      <header className="relative isolate overflow-hidden border-b border-brand-teal/15 bg-slate-950 text-white">
        {post.image ? <img src={post.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" /> : null}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(6,24,31,0.94),rgba(6,24,31,0.76)_48%,rgba(91,192,187,0.38))]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:pb-16 lg:pt-32">
          <div className="flex min-w-0 flex-col justify-end">
            <Link href="/blog" className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/18">
              <FaArrowLeft aria-hidden="true" className="text-xs" />
              Blog
            </Link>
            <div className="flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.18em] text-white/85">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 backdrop-blur">
                <FaCalendarAlt aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-2 backdrop-blur">
                <FaClock aria-hidden="true" />
                {readingTime} min read
              </span>
            </div>
            <h1 className="mt-5 max-w-5xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
            {post.description ? <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">{post.description}</p> : null}
          </div>

          {post.image ? (
            <div className="hidden self-end overflow-hidden rounded-[18px] border border-white/18 bg-white/10 p-2 shadow-2xl shadow-black/25 backdrop-blur lg:block">
              <img src={post.image} alt={post.title} className="aspect-[4/3] w-full rounded-[12px] object-cover" />
            </div>
          ) : null}
        </div>
      </header>

      {post.image ? (
        <section className="bg-white lg:hidden">
          <img src={post.image} alt={post.title} className="h-[260px] w-full object-cover sm:h-[360px]" />
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="min-w-0 rounded-[18px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8 lg:p-10">
          <CleanContent blocks={post.contentBlocks} />
        </div>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-28">
          <div className="rounded-[18px] border border-brand-teal/15 bg-white p-5 shadow-lg shadow-slate-900/5">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-brand-dark">
              <FaLayerGroup aria-hidden="true" />
              Article
            </p>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-700">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <span>Published</span>
                <time dateTime={post.date} className="text-right text-slate-950">
                  {formatDate(post.date)}
                </time>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <span>Reading time</span>
                <span className="text-slate-950">{readingTime} min</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Topic</span>
                <span className="text-right text-slate-950">Electrical Insights</span>
              </div>
            </div>
          </div>

          {headings.length ? (
            <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">In This Guide</p>
              <ol className="mt-4 grid gap-3">
                {headings.map((heading, index) => (
                  <li key={`${heading}-${index}`} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4B544] text-xs font-black text-slate-950">{index + 1}</span>
                    <span>{heading}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="rounded-[18px] border border-brand-teal/20 bg-[#06222a] p-5 text-white shadow-xl shadow-slate-900/10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#7ee0da]">Need Product Help?</p>
            <p className="mt-3 text-sm leading-6 text-white/78">Talk to Step Cables for wires, cables, conductors, switches, and accessories.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#5BC0BB] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#3AA9A4]">
              <FaEnvelope aria-hidden="true" className="text-xs" />
              Reach Us
            </Link>
          </div>
        </aside>
      </section>
    </article>
  );
}
