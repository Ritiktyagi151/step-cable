"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CleanContent } from "@/components/content/CleanContent";
import type { SitePage } from "@/lib/content";

type AboutPageProps = {
  page: SitePage;
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
};

const aboutImages: Record<string, string> = {
  "about-step-cables": "/assets/img/cable-wires.jpg",
  "about-step-industry": "/assets/img/Step-Cables-Manufacturing-Plant.jpg",
  "our-leadership": "/assets/img/our-leadership.jpg",
  philosophy: "/assets/img/philosophy.jpg",
  "vision-misiion": "/assets/img/banner/Step-Industries-Vision-Mission.jpg",
  "core-values": "/assets/img/Step-Industries-CSR-Policy.jpg",
  "csr-activity": "/assets/img/Step-Industries-CSR-Policy.jpg",
};

const galleryImages = [
  "/assets/img/fwdfinalplantimages/Step-Cables-manufacturing-unit1.jpg",
  "/assets/img/fwdfinalplantimages/Wires-Cables-Quality-Control.jpg",
  "/assets/img/fwdfinalplantimages/Power-and-Control-Cables-Manufacturing-Unit.jpg",
] as const;

function getPageImage(page: SitePage) {
  if (page.image?.startsWith("/")) return page.image;
  return aboutImages[page.slug] || "/assets/img/Step-Cables-Manufacturing-Plant-LR.jpg";
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
      { threshold: 0.18 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenPosition = direction === "left" ? "-translate-x-14" : direction === "right" ? "translate-x-14" : "translate-y-12";

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${isVisible ? "translate-x-0 translate-y-0 opacity-100" : `${hiddenPosition} opacity-0`} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function AboutPage({ page }: AboutPageProps) {
  const heroImage = getPageImage(page);
  const summaryParagraphs = page.contentBlocks.filter((block) => block.type === "paragraph").slice(0, 2);
  const pageGallery = page.images.length ? page.images.slice(0, 3).map((image) => image.src) : galleryImages;

  return (
    <>
      <section className="relative min-h-[380px] overflow-hidden bg-slate-950 text-white sm:min-h-[460px] lg:min-h-[520px]">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-fill" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center px-4 py-12 sm:min-h-[460px] sm:px-6 sm:py-16 lg:min-h-[520px] lg:px-8 lg:py-20">
          <Reveal direction="left" className="max-w-4xl">
            <div className="mb-6 h-1 w-24 rounded-full bg-brand-teal" />
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-teal sm:tracking-[0.34em]">Step Cables</p>
            <h1 className="mt-5 text-3xl font-black leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">{page.h1 || page.title}</h1>
            {page.description ? <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-white/82 sm:text-lg sm:leading-8">{page.description}</p> : null}
          </Reveal>
        </div>
      </section>

      {summaryParagraphs.length ? (
        <section className="overflow-hidden border-b border-brand-teal/15 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <Reveal direction="left" className="relative min-h-[240px] overflow-hidden rounded-[20px] border border-brand-teal/15 shadow-2xl shadow-slate-900/10 sm:min-h-[360px]">
              <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105" />
            </Reveal>

            <div className="grid content-center gap-5">
              {summaryParagraphs.map((block, index) =>
                block.type === "paragraph" ? (
                  <Reveal key={index} direction="right" delay={index * 120}>
                    <p className="rounded-[20px] border border-brand-teal/15 bg-white/85 p-5 text-sm leading-7 text-slate-600 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6 sm:text-base sm:leading-8">
                      {block.text}
                    </p>
                  </Reveal>
                ) : null
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="overflow-hidden bg-slate-50/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_0.45fr] lg:gap-10 lg:px-8">
          <Reveal direction="left">
            <div className="rounded-[20px] border border-brand-teal/15 bg-white/88 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-lg sm:p-8">
              <CleanContent blocks={page.contentBlocks} />
            </div>
          </Reveal>

          <aside className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
            {pageGallery.map((src, index) => (
              <Reveal key={src} direction="right" delay={index * 120}>
                <div className="overflow-hidden rounded-[20px] border border-brand-teal/15 bg-slate-950 shadow-xl shadow-slate-900/10">
                  <img src={src} alt="" className="h-48 w-full object-cover transition duration-500 hover:scale-105 sm:h-56" />
                </div>
              </Reveal>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
