"use client";

import { useEffect, useRef, useState } from "react";
import { FaBolt, FaIndustry, FaLayerGroup, FaLongArrowAltRight } from "react-icons/fa";
import { homeProducts } from "./homeData";

const productIcons = [FaBolt, FaIndustry, FaLayerGroup, FaLongArrowAltRight];

export function ProductRange() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className={`product-reveal ${visible ? "is-visible" : ""} border border-black bg-black p-8 text-white lg:min-h-[520px]`}>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-white/55">Product Range</p>
            <h2 className="mt-5 text-4xl font-black leading-tight">Engineered cable solutions for every site.</h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              House wiring, industrial cables, power control systems and conductors, built for dependable electrical performance.
            </p>
            <div className="mt-10 grid gap-3 border-t border-white/15 pt-6">
              {["Wires", "Cables", "Conductors", "EPC Support"].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-wide last:border-b-0">
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
                  className={`product-reveal group relative min-h-60 overflow-hidden border border-neutral-200 bg-white p-6 text-black transition hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-2xl ${
                    visible ? "is-visible" : ""
                  }`}
                  style={{ transitionDelay: `${index * 110}ms` }}
                >
                  <div className="absolute -right-4 -top-4 text-8xl text-neutral-100 transition group-hover:text-white/10">
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <span className="text-xs font-black uppercase tracking-[0.25em] text-neutral-400 transition group-hover:text-white/50">0{index + 1}</span>
                      <h3 className="mt-5 text-2xl font-black leading-tight">{title}</h3>
                      <p className="mt-4 text-sm leading-7 text-neutral-600 transition group-hover:text-white/72">{copy}</p>
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
      </div>
    </section>
  );
}
