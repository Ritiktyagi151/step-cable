import type { SitePage } from "@/lib/content";

type PageSummaryProps = {
  page: SitePage;
  eyebrow: string;
};

export function PageSummary({ page, eyebrow }: PageSummaryProps) {
  const paragraphs = page.contentBlocks.filter((block) => block.type === "paragraph").slice(0, 2);

  if (!paragraphs.length) return null;

  return (
    <section className="border-b border-brand-teal/15 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-dark sm:tracking-[0.35em]">{eyebrow}</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {paragraphs.map((block, index) => (
            block.type === "paragraph" ? <p key={index} className="break-words rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 text-sm leading-7 text-slate-600 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6 sm:text-base sm:leading-8">{block.text}</p> : null
          ))}
        </div>
      </div>
    </section>
  );
}
