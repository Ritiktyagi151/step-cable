import { CleanContent } from "@/components/content/CleanContent";
import { PageHero } from "@/components/PageHero";
import type { SitePage } from "@/lib/content";

type ClientsPageProps = {
  page: SitePage;
};

export function ClientsPage({ page }: ClientsPageProps) {
  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {page.images.length ? (
            <div className="mb-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {page.images.map((image) => (
                <div key={image.src} className="flex min-h-32 items-center justify-center border border-neutral-300 bg-white p-4">
                  <img src={image.src} alt={image.alt} className="max-h-24 object-contain grayscale" />
                </div>
              ))}
            </div>
          ) : null}
          <CleanContent blocks={page.contentBlocks} />
        </div>
      </section>
    </>
  );
}
