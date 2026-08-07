import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaBolt, FaBoxOpen, FaDownload, FaLayerGroup, FaShieldHalved } from "react-icons/fa6";
import { CleanContent } from "@/components/content/CleanContent";
import { PageHero } from "@/components/PageHero";
import type { CadillacProduct } from "./cadillacProducts";
import type { SitePage } from "@/lib/content";

const detailFeatures = [
  [FaLayerGroup, "Modular range"],
  [FaShieldHalved, "Reliable build"],
  [FaBoxOpen, "Dealer supply"],
] as const;

export type RangeProductPageProps = {
  page: SitePage;
};

export type RangeProductDetailPageProps = {
  page: SitePage;
  product: CadillacProduct;
};

export type RangeConfig = {
  brand: "Cadillac" | "Lincoln";
  routeBase: "/step-cadillac" | "/step-lincoln";
  products: CadillacProduct[];
  heading: string;
  groupCount: string;
};

function ProductCard({ product, routeBase, fallbackCode }: { product: CadillacProduct; routeBase: string; fallbackCode: string }) {
  return (
    <Link
      href={`${routeBase}/${product.slug}`}
      className="group flex min-h-[360px] flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#0877ff]/35 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f8fb] p-5">
        <img src={product.src} alt={product.alt} loading="lazy" className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0877ff]">{product.code || fallbackCode}</p>
        <h3 className="mt-3 text-lg font-black leading-snug text-slate-950">{product.title || product.alt}</h3>
        {product.specs?.length ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.specs[0]}</p> : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-slate-950">
          View Details <FaArrowRight aria-hidden="true" className="text-xs transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function RangeListingPage({ page, config }: RangeProductPageProps & { config: RangeConfig }) {
  const pdfLinks = page.links.filter((link) => link.href.toLowerCase().endsWith(".pdf"));

  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />

      <section className="bg-[#f5f4f1] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 border-b border-slate-300/70 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0877ff]">Product List</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {config.heading}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center sm:min-w-[360px]">
              {[
                [`${config.products.length}+`, "Items"],
                [config.groupCount, "Groups"],
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
            {config.products.map((product) => (
              <ProductCard key={product.slug} product={product} routeBase={config.routeBase} fallbackCode={`STEP ${config.brand}`} />
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
                    <a key={link.href} href={link.href} target="_blank" className="inline-flex items-center justify-between gap-3 rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-[#0877ff]/35 hover:text-[#0877ff]">
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

export function RangeProductDetailPage({ page: _page, product, config }: RangeProductDetailPageProps & { config: RangeConfig }) {
  const products = config.products.filter((item) => item.slug !== product.slug).slice(0, 4);

  return (
    <main className="bg-[#f5f4f1]">
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href={config.routeBase} className="inline-flex items-center gap-2 text-sm font-black text-slate-700 transition hover:text-[#0877ff]">
            <FaArrowLeft aria-hidden="true" className="text-xs" /> Back to {config.brand} Products
          </Link>

          <div className="mt-8 grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex min-h-[360px] items-center justify-center bg-[#f7f8fb] p-6 sm:min-h-[520px] lg:p-10">
              <img src={product.src} alt={product.alt} className="max-h-[560px] w-full object-contain" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0877ff]">STEP {config.brand} Product</p>
              <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">{product.title || product.alt}</h1>
              {product.code ? <p className="mt-5 inline-flex w-fit rounded-full bg-[#0877ff]/10 px-4 py-2 text-sm font-black text-[#0877ff]">{product.code}</p> : null}
              {product.specs?.length ? (
                <ul className="mt-8 grid gap-4">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex gap-3 rounded-[8px] border border-slate-200 bg-[#f7f8fb] p-4 text-sm font-bold leading-6 text-slate-700">
                      <FaBolt aria-hidden="true" className="mt-1 shrink-0 text-[#0877ff]" />
                      {spec}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {detailFeatures.map(([Icon, label]) => (
                  <div key={label} className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
                    <Icon aria-hidden="true" className="text-[#0877ff]" />
                    <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {products.length ? (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-black text-slate-950">More {config.brand} Products</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((item) => (
                <ProductCard key={item.slug} product={item} routeBase={config.routeBase} fallbackCode={`STEP ${config.brand}`} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
