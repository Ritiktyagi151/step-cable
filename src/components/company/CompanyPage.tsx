"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { PageBody } from "@/components/pages/PageBody";
import type { ContentBlock, SitePage } from "@/lib/content";

type CompanyPageProps = {
  page: SitePage;
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
};

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

  const hiddenPosition = direction === "left" ? "-translate-x-12" : direction === "right" ? "translate-x-12" : "translate-y-10";

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

function getCertificationCards(blocks: ContentBlock[]) {
  const cards: Array<{ title: string; description: string; image: string; alt: string }> = [];
  let title = "";
  let description = "";

  blocks.forEach((block) => {
    if (block.type === "heading") {
      title = block.text;
      description = "";
    }

    if (block.type === "paragraph") {
      description = block.text;
    }

    if (block.type === "image") {
      cards.push({
        title: block.alt || title || "Certification",
        description,
        image: block.src,
        alt: block.alt,
      });
    }
  });

  return cards;
}

function CertificationPage({ page }: CompanyPageProps) {
  const cards = getCertificationCards(page.contentBlocks);
  const intro = page.contentBlocks.find((block) => block.type === "paragraph");
  const heroImage = "/assets/img/certification.jpg";

  return (
    <>
      <section className="relative min-h-[380px] overflow-hidden bg-slate-950 text-white sm:min-h-[460px] lg:min-h-[540px]">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-fill" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center px-4 py-12 sm:min-h-[460px] sm:px-6 sm:py-16 lg:min-h-[540px] lg:px-8 lg:py-20">
          <Reveal direction="left" className="max-w-4xl">
            <div className="mb-6 h-1 w-24 rounded-full bg-brand-teal" />
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-teal sm:tracking-[0.34em]">Quality Compliance</p>
            <h1 className="mt-5 text-3xl font-black leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">{page.h1 || page.title}</h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-white/82 sm:text-lg sm:leading-8">{page.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden border-b border-brand-teal/15 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal direction="left" className="relative min-h-[240px] overflow-hidden rounded-[20px] border border-brand-teal/15 bg-slate-950 shadow-2xl shadow-slate-900/10 sm:min-h-[360px]">
            <img src="/assets/img/Safety-Management-Practice.jpg" alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105" />
            <div className="absolute inset-0 bg-black/35" />
          </Reveal>
          <Reveal direction="right" className="flex items-center">
            <div className="rounded-[20px] border border-brand-teal/15 bg-white/88 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark sm:tracking-[0.3em]">Certified Manufacturing</p>
              <h2 className="mt-4 text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">{page.h1 || page.title}</h2>
              {intro?.type === "paragraph" ? <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{intro.text}</p> : null}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-dark">Approvals & Standards</p>
            <h2 className="mt-4 text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">CERTIFICATIONS</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <Reveal key={`${card.image}-${index}`} delay={index * 80}>
                <article className="group overflow-hidden rounded-[20px] border border-brand-teal/15 bg-white/88 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35 hover:shadow-2xl hover:shadow-slate-900/10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={card.image} alt={card.alt} className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="border-t border-brand-teal/15 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark">{card.title}</p>
                    {card.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p> : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ManufacturingPage({ page }: CompanyPageProps) {
  const images = page.images.length ? page.images : page.contentBlocks.filter((block) => block.type === "image").map((block) => ({ src: block.src, alt: block.alt }));
  const heroImage = images[0]?.src || "/assets/img/fwdfinalplantimages/Step-Cables-manufacturing-unit1.jpg";
  const introBlocks = page.contentBlocks.filter((block) => block.type === "heading" || block.type === "paragraph");
  const featureImages = images.slice(0, 2);
  const galleryImages = images.slice(2);

  return (
    <>
      <section className="relative min-h-[380px] overflow-hidden bg-slate-950 text-white sm:min-h-[460px] lg:min-h-[560px]">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-fill" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center px-4 py-12 sm:min-h-[460px] sm:px-6 sm:py-16 lg:min-h-[560px] lg:px-8 lg:py-20">
          <Reveal direction="left" className="max-w-4xl">
            <div className="mb-6 h-1 w-24 rounded-full bg-brand-teal" />
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-teal sm:tracking-[0.34em]">Manufacturing Excellence</p>
            <h1 className="mt-5 text-3xl font-black leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">{page.h1 || page.title}</h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-7 text-white/82 sm:text-lg sm:leading-8">{page.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden border-b border-brand-teal/15 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
          <Reveal direction="left" className="grid gap-4">
            {featureImages.map((image, index) => (
              <div key={image.src} className={`relative overflow-hidden rounded-[20px] border border-brand-teal/15 bg-slate-950 shadow-2xl shadow-slate-900/10 ${index === 0 ? "min-h-[240px] sm:min-h-[340px]" : "min-h-[180px] sm:min-h-[220px]"}`}>
                <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{image.alt}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="grid content-center gap-5">
            {introBlocks.map((block, index) => (
              <Reveal key={`${block.type}-${index}`} direction="right" delay={index * 100}>
                {block.type === "heading" ? (
                  <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">{block.text}</h2>
                ) : (
                  <p className="rounded-[20px] border border-brand-teal/15 bg-white/88 p-5 text-sm leading-7 text-slate-600 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-6 sm:text-base sm:leading-8">{block.text}</p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-dark">Plant Gallery</p>
            <h2 className="mt-4 text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">Manufacturing Plant</h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <Reveal key={image.src} delay={index * 70}>
                <article className="group overflow-hidden rounded-[20px] border border-brand-teal/15 bg-white/88 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35 hover:shadow-2xl hover:shadow-slate-900/10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="border-t border-brand-teal/15 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-900">{image.alt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function CompanyPage({ page }: CompanyPageProps) {
  if (page.slug === "certification") {
    return <CertificationPage page={page} />;
  }

  if (page.slug === "manufacturing-plant" || page.slug === "manufacturing-plant-2") {
    return <ManufacturingPage page={page} />;
  }

  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
