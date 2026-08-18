"use client";

import Link from "next/link";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import type { CadillacProduct } from "./rangeProducts";

type MoreProductsSliderProps = {
  products: CadillacProduct[];
  title: string;
  basePath: "/step-cadillac" | "/step-lincoln";
  fallbackCode: string;
};

export function MoreProductsSlider({ products, title, basePath, fallbackCode }: MoreProductsSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === "left" ? -slider.clientWidth : slider.clientWidth,
      behavior: "smooth",
    });
  };

  if (!products.length) return null;

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-950">{title}</h2>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => scrollSlider("left")}
              className="inline-flex size-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:border-[#5BC0BB]/40 hover:text-[#5BC0BB]"
            >
              <FaArrowLeft aria-hidden="true" className="text-sm" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => scrollSlider("right")}
              className="inline-flex size-11 items-center justify-center rounded-[8px] border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:border-[#5BC0BB]/40 hover:text-[#5BC0BB]"
            >
              <FaArrowRight aria-hidden="true" className="text-sm" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`${basePath}/${product.slug}`}
              className="group flex min-h-[360px] w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#5BC0BB]/35 hover:shadow-2xl hover:shadow-[#5BC0BB]/10 sm:w-[45%] lg:w-[calc((100%_-_3.75rem)/4)]"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f8fb] p-5">
                <img src={product.src} alt={product.alt} loading="lazy" className="max-h-full w-full object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5BC0BB]">{product.code || fallbackCode}</p>
                <h3 className="mt-3 text-lg font-black leading-snug text-slate-950">{product.title || product.alt}</h3>
                {product.specs?.length ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.specs[0]}</p> : null}
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-slate-950">
                  View Details <FaArrowRight aria-hidden="true" className="text-xs transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
