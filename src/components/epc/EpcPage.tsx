"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FaArrowRight, FaClipboardCheck, FaDraftingCompass, FaHardHat, FaProjectDiagram, FaShieldAlt } from "react-icons/fa";
import { CleanContent } from "@/components/content/CleanContent";
import type { SitePage } from "@/lib/content";

type EpcPageProps = {
  page: SitePage;
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
};

const epcImages: Record<string, string> = {
  "about-epc-business": "/assets/img/slider/EPC-Companies-Step-Industries.jpg",
  "design-engineering-capabilities": "/assets/img/banner/Step-Industries-Design-and-Engineering.jpg",
  "quality-assurance-system": "/assets/img/banner/Quality-Assurance-Step-Industries.jpg",
  "safety-management-pratice": "/assets/img/Safety-Management-Practice.jpg",
  "project-monitoring": "/assets/img/Project-Monitoring-Step-Industries.jpg",
};

const epcHighlights = [
  [FaDraftingCompass, "Engineering", "Design-led planning for complex electrical work."],
  [FaClipboardCheck, "Procurement", "Material selection with quality and compliance focus."],
  [FaHardHat, "Construction", "Execution support for reliable project delivery."],
] as const;

function getEpcImage(page: SitePage) {
  if (page.image?.startsWith("/")) return page.image;
  return epcImages[page.slug] || "/assets/img/epc.jpg";
}

function Reveal({ children, className = "", direction = "up", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.16 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenPosition = direction === "left" ? "-translate-x-10" : direction === "right" ? "translate-x-10" : "translate-y-10";

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-900 ease-out ${isVisible ? "translate-x-0 translate-y-0 opacity-100" : `${hiddenPosition} opacity-0`} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function EpcPage({ page }: EpcPageProps) {
  const heroImage = getEpcImage(page);
  const introBlocks = page.contentBlocks.filter((block) => block.type === "paragraph").slice(0, 2);
  const sectionLinks = page.links.filter((link) => link.href && link.text).slice(0, 5);
  const contentImage = page.images[0]?.src || heroImage;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img src={heroImage} alt="" className="epc-hero-image absolute inset-0 -z-30 h-full w-full object-cover opacity-62" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(110deg,rgba(4,20,27,0.97),rgba(4,20,27,0.76)_52%,rgba(91,192,187,0.30))]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="mx-auto grid min-h-[420px] max-w-7xl items-end gap-8 px-4 pb-8 pt-24 sm:px-6 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:pb-12">
          <Reveal direction="left" className="max-w-5xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-1 w-14 rounded-full bg-brand-teal" />
              <span className="h-1 w-8 rounded-full bg-[#F4B544]" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-teal">EPC Business</p>
            <h1 className="mt-4 text-4xl font-black leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">{page.h1 || page.title}</h1>
            {page.description ? <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/82">{page.description}</p> : null}
          </Reveal>

          <Reveal direction="right" delay={140} className="hidden lg:block">
            <div className="epc-float-panel rounded-[18px] border border-white/18 bg-white/12 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#7ee0da]">Core Scope</p>
              <div className="mt-4 grid gap-3">
                {epcHighlights.map(([Icon, title, text]) => (
                  <div key={title} className="flex gap-3 rounded-[14px] border border-white/12 bg-white/10 p-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-base font-black">{title}</span>
                      <span className="mt-1 block text-xs leading-5 text-white/72">{text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-brand-teal/15 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {sectionLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.text}`}
                  href={link.href.startsWith("/") ? link.href : `/${link.href}`}
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition duration-300 ${
                    link.href.replace(/^\//, "") === page.slug ? "border-brand-teal bg-brand-teal text-white" : "border-brand-teal/20 bg-white text-slate-700 hover:bg-brand-teal/10 hover:text-brand-dark"
                  }`}
                >
                  {link.text}
                  <FaArrowRight aria-hidden="true" className="text-[10px] transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {introBlocks.length ? (
        <section className="overflow-hidden border-b border-brand-teal/15 bg-[#f7faf9]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
            <Reveal direction="left" className="relative min-h-[230px] overflow-hidden rounded-[18px] border border-brand-teal/15 bg-slate-950 shadow-2xl shadow-slate-900/10 sm:min-h-[330px]">
              <img src={contentImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/88 to-transparent p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-teal">Planning To Delivery</p>
                <h2 className="mt-2 text-2xl font-black text-white">Electrical EPC support built around execution clarity.</h2>
              </div>
            </Reveal>

            <div className="grid content-center gap-4">
              {introBlocks.map((block, index) =>
                block.type === "paragraph" ? (
                  <Reveal key={index} direction="right" delay={index * 110}>
                    <p className="rounded-[18px] border border-brand-teal/15 bg-white p-5 text-sm leading-7 text-slate-600 shadow-xl shadow-slate-900/5">{block.text}</p>
                  </Reveal>
                ) : null
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-8 lg:px-8">
          <Reveal direction="left">
            <div className="rounded-[18px] border border-brand-teal/15 bg-white p-4 shadow-2xl shadow-slate-900/5 sm:p-8">
              <CleanContent blocks={page.contentBlocks} />
            </div>
          </Reveal>

          <aside className="grid h-fit gap-4 lg:sticky lg:top-28">
            <Reveal direction="right">
              <div className="rounded-[18px] border border-brand-teal/15 bg-[#06222a] p-5 text-white shadow-xl shadow-slate-900/10">
                <FaProjectDiagram aria-hidden="true" className="text-2xl text-brand-teal" />
                <h2 className="mt-4 text-xl font-black">EPC Delivery Focus</h2>
                <p className="mt-3 text-sm leading-6 text-white/76">Design, quality, safety and project monitoring aligned for dependable execution.</p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={120}>
              <div className="rounded-[18px] border border-slate-200 bg-[#f7faf9] p-5 shadow-lg shadow-slate-900/5">
                <FaShieldAlt aria-hidden="true" className="text-2xl text-brand-dark" />
                <h2 className="mt-4 text-xl font-black text-slate-950">Quality First</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">Processes are shaped around compliance, safety checks and consistent project control.</p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
