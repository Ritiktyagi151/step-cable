import { FaArrowRight, FaBolt, FaBuilding, FaShieldHalved } from "react-icons/fa6";
import type { SitePage } from "@/lib/content";
import { wireAndCableProducts } from "./wireAndCableData";

type WireAndCableListingPageProps = {
  page: SitePage;
};

export function WireAndCableListingPage({ page }: WireAndCableListingPageProps) {
  return (
    <main className="bg-[#f5f4f1] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <img src={page.image || "/assets/img/cable-wires.jpg"} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.9),rgba(2,6,23,0.68),rgba(8,119,255,0.28))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:56px_56px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="wire-page-rise max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5BC0BB]">Wire & Cable Catalogue</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">Wire and Cable Products</h1>
            {page.description ? <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-white/78 sm:text-lg">{page.description}</p> : null}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [FaShieldHalved, "Safety Focused"],
              [FaBuilding, "Building Ready"],
              [FaBolt, "Power Grade"],
            ].map(([Icon, label], index) => (
              <div key={label as string} style={{ animationDelay: `${(index + 1) * 90}ms` }} className="wire-page-rise rounded-[8px] border border-white/15 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur">
                <Icon aria-hidden="true" className="text-2xl text-[#5BC0BB]" />
                <p className="mt-5 text-lg font-black">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="wire-page-rise flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5BC0BB]">Wire & Cable Range</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
                Select a wire or cable to view complete details.
              </h2>
            </div>
            <a href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#5BC0BB] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-[#5BC0BB]/20 transition hover:-translate-y-0.5 hover:bg-[#3AA9A4]">
              Ask for Quote <FaArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wireAndCableProducts.map((product, index) => (
              <a
                key={product.href}
                href={product.href}
                style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                className="wire-page-rise group overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#5BC0BB]/35 hover:shadow-2xl hover:shadow-[#5BC0BB]/10"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50 p-4">
                  <img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-contain transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#5BC0BB] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                    {product.shortName}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black leading-tight text-slate-950">{product.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#5BC0BB]">
                    View Details <FaArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
