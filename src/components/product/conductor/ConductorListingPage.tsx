import { FaArrowRight, FaBolt, FaCertificate, FaIndustry } from "react-icons/fa6";
import { PageHero } from "@/components/PageHero";
import type { SitePage } from "@/lib/content";
import { conductorProducts } from "./conductorData";

type ConductorListingPageProps = {
  page: SitePage;
};

export function ConductorListingPage({ page }: ConductorListingPageProps) {
  return (
    <>
      <PageHero slug={page.slug} title={page.h1 || page.title} description={page.description} image={page.image || "/assets/img/banner/aluminium-conductor-manufacturer.jpg"} />
      <section className="bg-[#f5f4f1] py-12 text-slate-950 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [FaIndustry, "Transmission Ready"],
              [FaCertificate, "IS Standards"],
              [FaBolt, "Utility Grade"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="rounded-[8px] border border-brand-teal/15 bg-white/80 p-5 shadow-xl shadow-slate-900/5">
                <Icon aria-hidden="true" className="text-2xl text-brand-dark" />
                <p className="mt-5 text-lg font-black">{label as string}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 sm:mt-16 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-dark">Conductor Range</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
                Select a conductor to view complete details.
              </h2>
            </div>
            <a href="/contact" className="premium-solid-button w-fit">
              Ask for Quote
            </a>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {conductorProducts.map((product) => (
              <a
                key={product.href}
                href={product.href}
                className="group overflow-hidden rounded-[8px] border border-brand-teal/15 bg-white shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-dark px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                    {product.shortName}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-dark">{product.standard}</p>
                  <h3 className="mt-3 text-xl font-black leading-tight text-slate-950">{product.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brand-dark">
                    View Details <FaArrowRight aria-hidden="true" className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
