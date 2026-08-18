import { FaBolt, FaDownload, FaLayerGroup, FaShieldHalved } from "react-icons/fa6";
import type { ContentBlock, SitePage } from "@/lib/content";
import { ProductQuoteButton } from "../ProductQuoteButton";
import { wireAndCablePageSlugs, wireAndCableProducts } from "./wireAndCableData";

type WireAndCableProductPageProps = {
  page: SitePage;
  fallbackImage: string;
};

const wireCableSlugSet = new Set<string>(wireAndCablePageSlugs);

export function isWireAndCablePage(slug: string) {
  return wireCableSlugSet.has(slug);
}

function getProductIntro(page: SitePage) {
  return wireAndCableProducts.find((product) => product.href.replace(/^\/+/, "") === page.slug);
}

function getValidImages(page: SitePage) {
  return page.images.filter((image) => Boolean(image && typeof image.src === "string" && image.src.trim()));
}

function getHeroImage(page: SitePage, fallbackImage: string) {
  const productIntro = getProductIntro(page);
  const pageImage = page.image && page.image.startsWith("/") ? page.image : "";
  return pageImage || productIntro?.image || getValidImages(page)[0]?.src || fallbackImage;
}

function splitBlocks(blocks: ContentBlock[]) {
  const firstParagraphIndex = blocks.findIndex((block) => block.type === "paragraph");
  const intro = firstParagraphIndex >= 0 ? blocks[firstParagraphIndex] : undefined;
  const rest = blocks.filter((_, index) => index !== firstParagraphIndex);
  return { intro, rest };
}

function WireContentBlock({ block, index }: { block: ContentBlock; index: number }) {
  const delay = `${Math.min(index, 8) * 70}ms`;

  if (block.type === "heading") {
    const HeadingTag = block.level === 2 ? "h2" : "h3";
    return (
      <HeadingTag style={{ animationDelay: delay }} className="wire-page-rise text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
        {block.text}
      </HeadingTag>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p style={{ animationDelay: delay }} className="wire-page-rise rounded-[8px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-lg shadow-slate-900/5 sm:p-6 sm:text-base sm:leading-8">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul style={{ animationDelay: delay }} className="wire-page-rise grid gap-3">
        {block.items.map((item) => (
          <li key={item} className="rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-600 shadow-sm">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "image") {
    return (
      <figure style={{ animationDelay: delay }} className="wire-page-rise overflow-hidden rounded-[8px] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5">
        <img src={block.src} alt={block.alt} loading="lazy" className="max-h-[460px] w-full object-contain" />
      </figure>
    );
  }

  if (block.type === "form") {
    return null;
  }

  return (
    <div style={{ animationDelay: delay }} className="wire-page-rise overflow-x-auto rounded-[8px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
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

export function WireAndCableProductPage({ page, fallbackImage }: WireAndCableProductPageProps) {
  const heroImage = getHeroImage(page, fallbackImage);
  const productIntro = getProductIntro(page);
  const pdfLinks = page.links.filter((link) => link.href.toLowerCase().endsWith(".pdf"));
  const pageImages = getValidImages(page).filter((image) => image.src !== page.image && image.src !== heroImage);
  const { intro, rest } = splitBlocks(page.contentBlocks);

  return (
    <main className="bg-[#f5f4f1] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-28" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,119,255,0.32),rgba(2,6,23,0.88)_48%,rgba(2,6,23,0.72))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:56px_56px]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="wire-page-rise">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5BC0BB]">Wire & Cable</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">{page.h1 || page.title}</h1>
            {page.description ? <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-white/78 sm:text-lg">{page.description}</p> : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {["ISI Focused", "Industrial Grade", productIntro?.shortName || "Step Cable"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="wire-page-rise wire-page-float overflow-hidden rounded-[8px] border border-white/15 bg-white p-4 shadow-2xl shadow-[#5BC0BB]/10 [animation-delay:120ms]">
            <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f8fb] p-4">
              <img src={heroImage} alt={page.h1 || page.title} className="max-h-full w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-7">
            {intro && intro.type === "paragraph" ? (
              <div className="wire-page-rise rounded-[8px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5BC0BB]">Overview</p>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{intro.text}</p>
              </div>
            ) : null}

            <figure className="wire-page-rise overflow-hidden rounded-[8px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 [animation-delay:90ms] sm:p-5">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[8px] bg-[#f7f8fb] p-4">
                <img src={heroImage} alt={page.h1 || page.title} loading="lazy" className="max-h-full w-full object-contain" />
              </div>
              <figcaption className="pt-4">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5BC0BB]">Product Image</p>
                <h2 className="mt-2 text-xl font-black leading-tight text-slate-950">{page.h1 || page.title}</h2>
              </figcaption>
            </figure>

            {rest.map((block, index) => (
              <WireContentBlock key={index} block={block} index={index + 1} />
            ))}

            {pageImages.length ? (
              <div className="wire-page-rise rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
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
            <div className="wire-page-rise rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 [animation-delay:160ms]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5BC0BB]">Quick Actions</p>
              <div className="mt-5">
                <ProductQuoteButton productName={page.h1 || page.title} />
              </div>
            </div>

            <div className="wire-page-rise grid gap-3 [animation-delay:230ms]">
              {[
                [FaShieldHalved, "Safety tested"],
                [FaBolt, "Power ready"],
                [FaLayerGroup, "Wide range"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5">
                  <Icon aria-hidden="true" className="text-[#5BC0BB]" />
                  <p className="mt-3 text-sm font-black text-slate-950">{label as string}</p>
                </div>
              ))}
            </div>

            {pdfLinks.length ? (
              <div className="wire-page-rise rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 [animation-delay:300ms]">
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
