import { CleanContent } from "@/components/content/CleanContent";
import { PageHero } from "@/components/PageHero";
import { PageSummary } from "@/components/pages/PageSummary";
import type { SitePage } from "@/lib/content";

type ProductPageProps = {
  page: SitePage;
};

export function ProductPage({ page }: ProductPageProps) {
  const pdfLinks = page.links.filter((link) => link.href.toLowerCase().endsWith(".pdf"));
  const pageImages = page.images.filter((image) => image.src !== page.image).slice(0, 6);

  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageSummary page={page} eyebrow="Product Detail" />
      <section className="bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_18rem] lg:px-8">
          <div>
            <CleanContent blocks={page.contentBlocks} />
          </div>
          <aside className="space-y-5">
            {pdfLinks.length ? (
              <div className="border border-black bg-white p-5">
                <h2 className="text-lg font-black">Downloads</h2>
                <div className="mt-4 grid gap-3">
                  {pdfLinks.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" className="border border-neutral-300 px-4 py-3 text-sm font-bold hover:border-black hover:bg-black hover:text-white">
                      {link.text || "View Details"}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            {pageImages.length ? (
              <div className="border border-neutral-300 bg-white p-5">
                <h2 className="text-lg font-black">Product Media</h2>
                <div className="mt-4 grid gap-3">
                  {pageImages.map((image) => (
                    <img key={image.src} src={image.src} alt={image.alt} className="border border-neutral-200 grayscale" />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}
