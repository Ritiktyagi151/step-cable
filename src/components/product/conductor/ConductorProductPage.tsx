import { FaBolt, FaDownload, FaLayerGroup, FaShieldHalved } from "react-icons/fa6";
import type { ContentBlock, SitePage } from "@/lib/content";
import { ProductQuoteButton } from "../ProductQuoteButton";
import { conductorProducts } from "./conductorData";

type ConductorProductPageProps = {
  page: SitePage;
};

const conductorSlugSet = new Set(
  conductorProducts.map((product) => product.href.replace(/^\/+/, ""))
);

export function isConductorProductPage(slug: string) {
  return conductorSlugSet.has(slug);
}

function getConductorIntro(page: SitePage) {
  return conductorProducts.find((product) => product.href.replace(/^\/+/, "") === page.slug);
}

function getValidImages(page: SitePage) {
  return page.images.filter((image) => Boolean(image && typeof image.src === "string" && image.src.trim()));
}

function cleanBlocks(blocks: ContentBlock[]) {
  return blocks.filter((block) => block.type !== "heading" || block.text.trim().toLowerCase() !== "view details");
}

function ConductorContentBlock({ block }: { block: ContentBlock }) {
  if (block.type === "heading") {
    const HeadingTag = block.level === 2 ? "h2" : "h3";
    return (
      <HeadingTag className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
        {block.text}
      </HeadingTag>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className="rounded-[8px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-lg shadow-slate-900/5 sm:p-6 sm:text-base sm:leading-8">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 rounded-[8px] border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
            <FaBolt aria-hidden="true" className="mt-1 shrink-0 text-[#5BC0BB]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="overflow-hidden rounded-[8px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
        <img src={block.src} alt={block.alt} loading="lazy" className="max-h-[520px] w-full object-contain" />
      </figure>
    );
  }

  if (block.type === "form") {
    return null;
  }

  return (
    <div className="overflow-x-auto rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={`${row.join("-")}-${rowIndex}`} className={rowIndex === 0 ? "bg-slate-950 text-white" : "border-t border-slate-200"}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className={`border-r border-slate-200 px-4 py-3 align-top last:border-r-0 ${rowIndex === 0 ? "font-black text-white" : "text-slate-600"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ConductorProductPage({ page }: ConductorProductPageProps) {
  const product = getConductorIntro(page);
  const productImage = page.image || product?.image || getValidImages(page)[0]?.src || "/new-product-img/conductor/aac.png";
  const pdfLinks = page.links.filter((link) => link.href.toLowerCase().endsWith(".pdf"));
  const pageImages = getValidImages(page).filter((image) => image.src !== page.image && image.src !== productImage);
  const contentBlocks = cleanBlocks(page.contentBlocks);
  const productName = page.h1 || product?.title || page.title;
  const heroBadges = [product?.shortName, product?.standard, "Utility Grade"].filter(
    (item): item is string => Boolean(item)
  );

  return (
    <main className="bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[#f5f4f1] px-4 pb-12 pt-10 sm:px-6 sm:pb-16 lg:px-8 lg:pt-14">
        <div className="absolute inset-x-0 top-0 h-40 bg-white" />
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex min-h-[340px] items-center justify-center bg-[#eef4fb] p-6 sm:min-h-[460px] lg:p-10">
            <img src={productImage} alt={productName} className="max-h-[520px] w-full object-contain drop-shadow-2xl" />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5BC0BB]">Aluminium Conductor</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-5xl">{productName}</h1>
            {page.description ? <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{page.description}</p> : null}
            <div className="mt-7 flex flex-wrap gap-3">
              {heroBadges.map((item) => (
                <span key={item} className="rounded-full border border-[#5BC0BB]/20 bg-[#5BC0BB]/8 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#5BC0BB]">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <ProductQuoteButton
                productName={productName}
                productCode={product?.shortName}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#5BC0BB] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#5BC0BB]/20 transition hover:-translate-y-0.5 hover:bg-[#3AA9A4]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [FaShieldHalved, "Line performance"],
                [FaBolt, "Transmission ready"],
                [FaLayerGroup, "Multiple conductor types"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">
                  <Icon aria-hidden="true" className="text-xl text-[#5BC0BB]" />
                  <p className="mt-4 text-sm font-black text-slate-950">{label as string}</p>
                </div>
              ))}
            </div>

            {contentBlocks.length ? (
              contentBlocks.map((block, index) => (
                <ConductorContentBlock key={index} block={block} />
              ))
            ) : (
              <p className="rounded-[8px] border border-slate-200 bg-white p-6 text-base leading-8 text-slate-600 shadow-xl shadow-slate-900/5">
                {page.description}
              </p>
            )}

            {pageImages.length ? (
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
                <h2 className="text-2xl font-black text-slate-950">Product Images</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {pageImages.map((image, index) => (
                    <figure key={`${image.src}-${index}`} className="overflow-hidden rounded-[8px] border border-slate-200 bg-[#f7f8fb] p-3">
                      <img src={image.src} alt={image.alt} loading="lazy" className="aspect-[4/3] w-full object-contain" />
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5BC0BB]">Explore</p>
              <h2 className="mt-2 text-lg font-black text-slate-950">Conductor Range</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {conductorProducts.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-2 text-xs font-black uppercase tracking-wide transition ${item.href === page.url ? "bg-[#5BC0BB] text-white" : "bg-[#eef4fb] text-slate-700 hover:bg-[#5BC0BB]/10 hover:text-[#5BC0BB]"}`}
                  >
                    <span>{item.shortName}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[8px] border border-slate-200 bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5BC0BB]">Need Pricing?</p>
              <h2 className="mt-3 text-xl font-black">Request conductor quote</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">Share your requirement and our team will connect with details.</p>
              <div className="mt-5">
                <ProductQuoteButton productName={productName} productCode={product?.shortName} />
              </div>
            </div>

            {pdfLinks.length ? (
              <div className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
                <h2 className="text-lg font-black text-slate-950">Downloads</h2>
                <div className="mt-4 grid gap-3">
                  {pdfLinks.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" className="inline-flex items-center justify-between gap-3 rounded-[8px] border border-slate-200 bg-[#f7f8fb] px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#5BC0BB]/35 hover:text-[#5BC0BB]">
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
    </main>
  );
}
