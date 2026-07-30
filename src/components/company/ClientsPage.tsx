import { CleanContent } from "@/components/content/CleanContent";
import { PageHero } from "@/components/PageHero";
import type { SitePage } from "@/lib/content";

type ClientsPageProps = {
  page: SitePage;
};

export function ClientsPage({ page }: ClientsPageProps) {
  const introBlocks = page.contentBlocks.filter((block) => block.type === "heading" || block.type === "paragraph");

  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <section className="bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <CleanContent blocks={introBlocks} />
          {page.images.length ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {page.images.map((image) => (
                <div key={image.src} className="rounded-[20px] border border-brand-teal/15 bg-white/78 shadow-xl shadow-slate-900/5 backdrop-blur-lg flex min-h-32 items-center justify-center p-4 transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35">
                  <img src={image.src} alt={image.alt} className="max-h-24 object-contain" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
