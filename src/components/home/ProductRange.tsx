"use client";

import { useEffect, useRef, useState } from "react";
import { FaBolt, FaIndustry, FaLayerGroup, FaLongArrowAltRight } from "react-icons/fa";
import { pageRegistry } from "@/components/pages/pageRegistry";
import conductors from "@/data/conductors.json";
import switchesAndAccessories from "@/data/switches-and-accessories.json";
import wireAndCables from "@/data/wire-and-cables.json";
import { homeProducts } from "./homeData";

const productIcons = [FaBolt, FaIndustry, FaLayerGroup, FaLongArrowAltRight];
const productSlugSet = new Set<string>(pageRegistry.product);
const productPages = [...wireAndCables, ...conductors, ...switchesAndAccessories];
const productMarqueeItems = productPages
  .filter((product) => productSlugSet.has(product.slug))
  .map((product) => ({
    title: product.h1 || product.title.replace(/\s*\|.*$/, "").replace(/\s*-\s*STEP.*$/, ""),
    href: product.url || `/${product.slug}`,
  }));

export function ProductRange() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const marqueeProducts = [...productMarqueeItems, ...productMarqueeItems];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.22 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden border-b border-brand-teal/15 bg-slate-50/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className={`rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 text-slate-900 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition-all duration-700 ease-out sm:p-8 lg:min-h-[520px] ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-dark sm:tracking-[0.28em]">Product Range</p>
            <h2 className="mt-4 text-[1.55rem] font-black leading-[1.2] text-slate-900 sm:text-3xl lg:text-4xl">Engineered cable solutions for every site.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              House wiring, industrial cables, power control systems and conductors, built for dependable electrical performance.
            </p>
            <div className="mt-10 grid gap-3 border-t border-brand-teal/15 pt-6">
              {["Wires", "Cables", "Conductors", "EPC Support"].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-brand-teal/15 pb-3 text-sm font-bold uppercase tracking-wide last:border-b-0">
                  <span>{item}</span>
                  <FaLongArrowAltRight aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {homeProducts.map(([title, copy, href], index) => {
              const Icon = productIcons[index % productIcons.length];
              return (
                <a
                  key={title}
                  href={href}
                  className={`group relative min-h-52 overflow-hidden rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 text-slate-900 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition-all duration-700 ease-out hover:-translate-y-1 hover:border-brand-teal/35 hover:bg-white/90 hover:shadow-xl sm:min-h-60 sm:p-6 ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 110}ms` }}
                >
                  <div className="absolute -right-4 -top-4 text-8xl text-brand-teal/14 transition group-hover:text-brand-teal/25">
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-dark/70">0{index + 1}</span>
                      <h3 className="mt-5 text-xl font-black leading-tight sm:text-2xl">{title}</h3>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{copy}</p>
                    </div>
                    <span className="mt-8 inline-flex items-center gap-3 text-sm font-black uppercase tracking-wide">
                      View Range <FaLongArrowAltRight aria-hidden="true" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

          <div className={`relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden border-y border-brand-teal/15 bg-white/80 py-4 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition-all duration-700 ease-out sm:mt-10 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="flex w-max items-center gap-4 whitespace-nowrap [animation:productRangeMarquee_120s_linear_infinite] hover:[animation-play-state:paused]">
            {marqueeProducts.map(({ title, href }, index) => (
              <a
                key={`${title}-${index}`}
                href={href}
                className="inline-flex items-center gap-4 rounded-full border border-brand-teal/15 bg-slate-50 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-700 transition duration-300 hover:border-brand-teal/40 hover:bg-brand-teal hover:text-white sm:px-6 sm:text-sm"
              >
                <span className="h-2 w-2 rounded-full bg-brand-teal" />
                {title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes productRangeMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
