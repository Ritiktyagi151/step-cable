import type { SitePage } from "@/lib/content";

type PageSummaryProps = {
  page: SitePage;
  eyebrow: string;
};

export function PageSummary({ page, eyebrow }: PageSummaryProps) {
  const paragraphs = page.contentBlocks.filter((block) => block.type === "paragraph").slice(0, 2);

  if (!paragraphs.length) return null;

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-neutral-500">{eyebrow}</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {paragraphs.map((block, index) => (
            block.type === "paragraph" ? <p key={index} className="text-base leading-8 text-neutral-700">{block.text}</p> : null
          ))}
        </div>
      </div>
    </section>
  );
}
