import Link from "next/link";
import { FaArrowRight, FaDownload } from "react-icons/fa6";
import { CleanContent } from "@/components/content/CleanContent";
import { PageHero } from "@/components/PageHero";
import type { SitePage } from "@/lib/content";
import type { CadillacProduct } from "../rangeProducts";
import { getCadillacProducts } from "../rangeProducts";

type CadillacListingPageProps = {
  page: SitePage;
};

function CadillacProductCard({ product }: { product: CadillacProduct }) {
  return (
    <Link
      href={`/step-cadillac/${product.slug}`}
      className="group flex min-h-[360px] flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#5BC0BB]/35 hover:shadow-2xl hover:shadow-[#5BC0BB]/10"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f8fb] p-5">
        <img src={product.src} alt={product.alt} loading="lazy" className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5BC0BB]">{product.code || "STEP Cadillac"}</p>
        <h3 className="mt-3 text-lg font-black leading-snug text-slate-950">{product.title || product.alt}</h3>
        {product.specs?.length ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.specs[0]}</p> : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-slate-950">
          View Details <FaArrowRight aria-hidden="true" className="text-xs transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function CadillacListingPage({ page }: CadillacListingPageProps) {
  const products = getCadillacProducts(page);
  const pdfLinks = page.links.filter((link) => link.href.toLowerCase().endsWith(".pdf"));

  return (
    <>
      <PageHero slug={page.slug} title={page.h1 || page.title} description={page.description} image={page.image} />

      <section className="bg-[#f5f4f1] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 border-b border-slate-300/70 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5BC0BB]">Product List</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                STEP Cadillac switches, plates, boxes and accessories.
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center sm:min-w-[360px]">
              {[
                [`${products.length}+`, "Items"],
                ["12", "Groups"],
                ["2026", "Price List"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xl font-black text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <CadillacProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0">
            <CleanContent blocks={page.contentBlocks} />
          </div>
          <aside className="space-y-5">
            {pdfLinks.length ? (
              <div className="rounded-[8px] border border-slate-200 bg-[#f7f8fb] p-5 shadow-xl shadow-slate-900/5">
                <h2 className="text-lg font-black text-slate-950">Downloads</h2>
                <div className="mt-4 grid gap-3">
                  {pdfLinks.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" className="inline-flex items-center justify-between gap-3 rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-[#5BC0BB]/35 hover:text-[#5BC0BB]">
                      {link.text || "View Details"}
                      <FaDownload aria-hidden="true" className="shrink-0 text-xs" />
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
