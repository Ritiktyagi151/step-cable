import Link from "next/link";
import { FaArrowRight, FaDownload } from "react-icons/fa6";
import { CleanContent } from "@/components/content/CleanContent";
import { PageHero } from "@/components/PageHero";
import type { SitePage } from "@/lib/content";
import type { CadillacProduct } from "../rangeProducts";
import { getLincolnProducts } from "../rangeProducts";
import { LincolnGroupSelect } from "./LincolnGroupSelect";

type LincolnListingPageProps = {
  page: SitePage;
};

function getProductCategory(product: CadillacProduct) {
  const categorySpec = product.specs?.find((spec) => spec.startsWith("Category: "))?.replace("Category: ", "");
  if (categorySpec) return categorySpec;

  const title = product.title || product.alt || "";
  const code = product.code || "";

  if (code.startsWith("LINC-MAX")) return "Maxtron Switches";
  if (code.startsWith("LINC-OPT")) return "Optimus Switches";
  if (code.startsWith("LINC-SOC")) return "6A / 16A Sockets";
  if (code.startsWith("LINC-TVS") || code.startsWith("LINC-TJ") || code.startsWith("LINC-UC")) return "Communication Accessories";
  if (code.startsWith("LINC-BP") || code.startsWith("LINC-NI")) return "Support Accessories";
  if (code.startsWith("LINC-FL")) return "LED Foot Light";
  if (code.startsWith("LINC-TD") || code.startsWith("LINC-T4S") || code.startsWith("LINC-T5S")) return "Typhoon Dimmers & Regulators";
  if (code.startsWith("LINC-CD") || code.startsWith("LINC-C4S") || code.startsWith("LINC-C5S")) return "Caspian Dimmers & Regulators";
  if (code.startsWith("LINC-SP MC")) return "Modular MCB";
  if (code.startsWith("LINC-MS")) return "Motor Starter";
  if (code.startsWith("LINC-MIR")) return "Mirage Cover Plates";
  if (code.startsWith("LINC-MAR")) return "Marsh Cover Plates";
  if (code.startsWith("LINC-MOS")) return "Mosaic Cover Plates";

  return title.split(" ").slice(0, 2).join(" ") || "STEP Lincoln";
}

function slugifyGroup(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function LincolnProductCard({ product }: { product: CadillacProduct }) {
  return (
    <Link
      href={`/step-lincoln/${product.slug}`}
      className="group flex min-h-[360px] flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#5BC0BB]/35 hover:shadow-2xl hover:shadow-[#5BC0BB]/10"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f8fb] p-5">
        <img src={product.src} alt={product.alt} loading="lazy" className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5BC0BB]">{product.code || "STEP Lincoln"}</p>
        <h3 className="mt-3 text-lg font-black leading-snug text-slate-950">{product.title || product.alt}</h3>
        {product.specs?.length ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.specs[0]}</p> : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-slate-950">
          View Details <FaArrowRight aria-hidden="true" className="text-xs transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function LincolnListingPage({ page }: LincolnListingPageProps) {
  const products = getLincolnProducts(page);
  const pdfLinks = page.links.filter((link) => link.href.toLowerCase().endsWith(".pdf"));
  const productGroups = products.reduce<{ category: string; products: CadillacProduct[] }[]>((groups, product) => {
    const category = getProductCategory(product);
    const group = groups.find((item) => item.category === category);

    if (group) {
      group.products.push(product);
      return groups;
    }

    return [...groups, { category, products: [product] }];
  }, []);
  const groupCount = productGroups.length;

  return (
    <>
      <PageHero slug={page.slug} title={page.h1 || page.title} description={page.description} image={page.image} />

      <section className="bg-[#f5f4f1] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 border-b border-slate-300/70 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5BC0BB]">Product List</p>
              <h2 className="mt-4 max-w-3xl text-2xl font-black  text-slate-950 md:text-3xl ">
                STEP Lincoln switches, sockets, plates and accessories.
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center sm:min-w-[360px]">
              {[
                [`${products.length}`, "Items"],
                [`${groupCount || 1}`, "Groups"],
                ["2026", "Price List"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xl font-black text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <LincolnGroupSelect groups={productGroups.map((group) => ({ category: group.category, count: group.products.length, id: slugifyGroup(group.category) }))} />

          <div className="mt-10 space-y-12">
            {productGroups.map((group) => (
              <section key={group.category} id={slugifyGroup(group.category)} className="scroll-mt-24">
                <div className="mb-5 flex flex-col gap-2 border-b border-slate-300/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5BC0BB]">Lincoln Group</p>
                    <h3 className="mt-2 text-2xl font-black text-slate-950">{group.category}</h3>
                  </div>
                  <p className="text-sm font-bold text-slate-600">{group.products.length} products</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.products.map((product) => (
                    <LincolnProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </section>
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
