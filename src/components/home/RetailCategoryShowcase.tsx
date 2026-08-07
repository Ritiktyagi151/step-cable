import { FaHome, FaLongArrowAltRight, FaPlug, FaStore, FaTint } from "react-icons/fa";
import { retailCategories } from "./homeData";

const categoryIcons = [FaHome, FaTint, FaPlug, FaStore] as const;

export function RetailCategoryShowcase() {
  return (
    <section className="overflow-hidden border-b border-brand-teal/15 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="home-section-eyebrow">Shop by need</p>
            <h2 className="home-section-heading">Retail products customers ask for every day.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-slate-600">
            A cleaner home layout for Step Cables retail business: practical categories, visible products and quick enquiry paths for dealers, electricians and buyers.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {retailCategories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];

            return (
              <a
                key={category.title}
                href={category.href}
                className="group flex min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-brand-teal/15 bg-slate-50 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35 hover:bg-white"
              >
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-brand-dark shadow-sm">
                    <Icon aria-hidden="true" />
                    {category.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-xl font-black leading-tight text-slate-950">{category.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-3 text-sm font-black uppercase tracking-wide text-brand-dark">
                    View Products <FaLongArrowAltRight aria-hidden="true" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
