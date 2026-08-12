import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaBolt, FaBoxOpen, FaLayerGroup, FaShieldHalved } from "react-icons/fa6";
import type { SitePage } from "@/lib/content";
import type { CadillacProduct } from "../rangeProducts";
import { getLincolnProducts } from "../rangeProducts";

const lincolnDetailFeatures = [
  [FaLayerGroup, "Modular range"],
  [FaShieldHalved, "Reliable build"],
  [FaBoxOpen, "Dealer supply"],
] as const;

type LincolnProductDetailPageProps = {
  page: SitePage;
  product: CadillacProduct;
};

function LincolnProductCard({ product }: { product: CadillacProduct }) {
  return (
    <Link
      href={`/step-lincoln/${product.slug}`}
      className="group flex min-h-[360px] flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#0877ff]/35 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f8fb] p-5">
        <img src={product.src} alt={product.alt} loading="lazy" className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0877ff]">{product.code || "STEP Lincoln"}</p>
        <h3 className="mt-3 text-lg font-black leading-snug text-slate-950">{product.title || product.alt}</h3>
        {product.specs?.length ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.specs[0]}</p> : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-slate-950">
          View Details <FaArrowRight aria-hidden="true" className="text-xs transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function LincolnProductDetailPage({ page, product }: LincolnProductDetailPageProps) {
  const products = getLincolnProducts(page).filter((item) => item.slug !== product.slug).slice(0, 4);

  return (
    <main className="bg-[#f5f4f1]">
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/step-lincoln" className="inline-flex items-center gap-2 text-sm font-black text-slate-700 transition hover:text-[#0877ff]">
            <FaArrowLeft aria-hidden="true" className="text-xs" /> Back to Lincoln Products
          </Link>

          <div className="mt-8 grid overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex min-h-[360px] items-center justify-center bg-[#f7f8fb] p-6 sm:min-h-[520px] lg:p-10">
              <img src={product.src} alt={product.alt} className="max-h-[560px] w-full object-contain" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0877ff]">STEP Lincoln Product</p>
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
                {lincolnDetailFeatures.map(([Icon, label]) => (
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
            <h2 className="text-2xl font-black text-slate-950">More Lincoln Products</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((item) => (
                <LincolnProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
