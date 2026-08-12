"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clientsPages from "@/data/clients-pages.json";
import type { ContentBlock } from "@/lib/content";

type ImageBlock = Extract<ContentBlock, { type: "image" }>;

function isImageBlock(block: ContentBlock): block is ImageBlock {
  return block.type === "image";
}

export function OurClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const clientsPage = clientsPages.find((page) => page.slug === "clients1");
  const logos = ((clientsPage?.contentBlocks || []) as ContentBlock[])
    .filter(isImageBlock)
    .map((block) => ({ src: block.src, alt: block.alt }))
    .slice(0, 18);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!logos.length) return null;

  return (
    <section ref={sectionRef} className="overflow-hidden border-b border-brand-teal/15 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className={`flex flex-col justify-between gap-6 border-b border-brand-teal/15 pb-8 transition-all duration-700 ease-out lg:flex-row lg:items-end ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-dark">Our Clients</p>
            <h2 className="mt-4 text-[1.75rem] font-black leading-[1.2] text-slate-900 sm:text-4xl">Trusted by public, industrial and corporate organizations.</h2>
          </div>
          <Link href="/clients1" className="w-fit rounded-full border border-brand-teal/35 bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-teal/10 hover:text-brand-dark">
            View All Clients
          </Link>
        </div>

        <div className={`mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-brand-teal/15 bg-brand-teal/10 p-1 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition-all duration-700 ease-out sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          {logos.slice(0, 12).map((logo) => (
            <div key={`${logo.src}-${logo.alt}`} className="flex h-36 items-center justify-center rounded-2xl bg-white p-3 transition duration-300 hover:bg-brand-teal/10 sm:p-4">
              <img src={logo.src} alt={logo.alt} className="max-h-28 w-full object-contain transition duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>

      <div className={`border-t border-brand-teal/15 bg-slate-50 py-4 transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className="client-logo-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.src}-${index}`} className="flex h-28 w-72 items-center justify-center rounded-2xl border border-brand-teal/15 bg-white px-4 shadow-sm">
              <img src={logo.src} alt={logo.alt} className="max-h-20 w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
