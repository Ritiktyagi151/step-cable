import { CleanContent } from "@/components/content/CleanContent";
import { PageHero } from "@/components/PageHero";
import { PageSummary } from "@/components/pages/PageSummary";
import { CadillacListingPage } from "./CadillacProductPage";
import { LincolnListingPage } from "./LincolnProductPage";
import type { SitePage } from "@/lib/content";

type ProductPageProps = {
  page: SitePage;
};

function getProductFallbackImage(page: SitePage) {
  const value = `${page.slug} ${page.title} ${page.h1} ${page.description}`.toLowerCase();

  if (value.includes("house") || value.includes("housing") || value.includes("building-wire")) {
    return "/wiresforhome/Safest-Electrical-Wires-For-Home.JPG";
  }

  if (value.includes("fire") || value.includes("frls") || value.includes("halogen")) {
    return "/wiresforhome/Fire-Proof-Low-Smoke-Non-Toxic-Wires.JPG";
  }

  if (value.includes("submersible") || value.includes("flat-cable") || value.includes("flat cable")) {
    return "/assets/img/3-core-submersible-cable-XPLE.jpg";
  }

  if (value.includes("multicore") || value.includes("single-core") || value.includes("industrial")) {
    return "/wiresforhome/Best-Multicore-3core-4core-Cables.JPG";
  }

  if (value.includes("elevator") || value.includes("escalator")) {
    return "/assets/img/Elevator-Cable.jpg";
  }

  if (value.includes("conductor") || value.includes("aac") || value.includes("aaac") || value.includes("acsr") || value.includes("acar") || value.includes("al-59")) {
    return "/assets/img/conductor.jpg";
  }

  if (value.includes("power") || value.includes("control") || value.includes("xlpe") || value.includes("pvc")) {
    return "/assets/img/cable.jpg";
  }

  if (value.includes("epc")) {
    return "/assets/img/epc.jpg";
  }

  return "/assets/img/cable-wires.jpg";
}

export function ProductPage({ page }: ProductPageProps) {
  if (page.slug === "step-cadillac") {
    return <CadillacListingPage page={page} />;
  }

  if (page.slug === "step-lincoln") {
    return <LincolnListingPage page={page} />;
  }

  const pdfLinks = page.links.filter((link) => link.href.toLowerCase().endsWith(".pdf"));
  const pageImages = page.images.filter((image) => image.src !== page.image);
  const productImage = page.image || page.images[0]?.src || getProductFallbackImage(page);
  const productImageAlt = page.images.find((image) => image.src === productImage)?.alt || page.h1 || page.title;

  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageSummary page={page} eyebrow="Product Detail" />
      <section className="bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <div className="grid overflow-hidden rounded-[20px] border border-brand-teal/15 bg-white/78 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-lg lg:grid-cols-[1.05fr_0.95fr] lg:p-6">
            <div className="flex min-h-56 items-center justify-center rounded-[20px] bg-white p-3 sm:min-h-80 sm:p-4 lg:min-h-96">
              <img src={productImage} alt={productImageAlt} className="max-h-[320px] w-full object-contain sm:max-h-[440px] lg:max-h-[520px]" />
            </div>
            <div className="flex flex-col justify-center p-4 text-slate-900 sm:p-6 lg:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-dark sm:tracking-[0.32em]">Product Image</p>
              <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">{page.h1 || page.title}</h2>
              {page.description ? <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{page.description}</p> : null}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8">
          <div className="min-w-0">
            <CleanContent blocks={page.contentBlocks} />
            {pageImages.length ? (
              <div className="mt-10 rounded-[20px] border border-brand-teal/15 bg-white/78 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-5">
                <h2 className="text-2xl font-black text-slate-900">Product Images</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {pageImages.map((image, index) => (
                    <figure key={`${image.src}-${index}`} className="overflow-hidden rounded-2xl border border-brand-teal/15 bg-white">
                      <div className="flex aspect-[4/3] items-center justify-center bg-slate-50 p-3">
                        <img src={image.src} alt={image.alt} className="max-h-full w-full object-contain" />
                      </div>
                      <figcaption className="border-t border-brand-teal/10 px-3 py-3">
                        <h3 className="text-sm font-black leading-snug text-slate-900">{image.title || image.alt}</h3>
                        {image.code ? <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-dark">{image.code}</p> : null}
                        {image.specs?.length ? (
                          <ul className="mt-2 grid gap-1 text-xs leading-5 text-slate-500">
                            {image.specs.map((spec) => (
                              <li key={spec}>{spec}</li>
                            ))}
                          </ul>
                        ) : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <aside className="space-y-5">
            {pdfLinks.length ? (
              <div className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg">
                <h2 className="text-lg font-black text-slate-900">Downloads</h2>
                <div className="mt-4 grid gap-3">
                  {pdfLinks.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" className="rounded-2xl border border-brand-teal/15 bg-white/70 px-4 py-3 text-sm font-bold text-slate-800 transition duration-300 hover:border-brand-teal/35 hover:bg-brand-teal/10 hover:text-brand-dark">
                      {link.text || "View Details"}
                    </a>
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
