"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FaArrowRight, FaAward, FaBolt, FaBuilding, FaCheck, FaHandshake, FaImage, FaLeaf } from "react-icons/fa";
import type { ContentBlock, SitePage } from "@/lib/content";

type AboutPageProps = {
  page: SitePage;
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
};

type LeadershipProfile = {
  name: string;
  role: string;
  paragraphs: string[];
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

const aboutHighlights = [
  [FaAward, "30+ Years", "Electrical industry experience"],
  [FaBuilding, "Modern Plant", "In-house manufacturing strength"],
  [FaHandshake, "Pan India", "Dealer and partner network"],
] as const;

const valueCards = [
  [FaBolt, "Performance", "Reliable products engineered for homes, industry and EPC needs."],
  [FaLeaf, "Responsibility", "A practical focus on quality, safety and sustainable growth."],
] as const;

const leadershipImage = "/assets/img/leadership.jpg";

function getPageImage(page: SitePage) {
  if (page.image?.startsWith("/")) return page.image;
  return aboutImages[page.slug] || "/assets/img/Step-Cables-Manufacturing-Plant-LR.jpg";
}

function getLeadershipProfiles(blocks: SitePage["contentBlocks"]) {
  return blocks.reduce<LeadershipProfile[]>((profiles, block) => {
    if (block.type === "heading") {
      const [name, ...roleParts] = block.text.split(",");
      profiles.push({
        name: name.trim(),
        role: roleParts.join(",").trim() || "Leadership Team",
        paragraphs: [],
      });
    }

    if (block.type === "paragraph" && profiles.length) {
      profiles[profiles.length - 1].paragraphs.push(block.text);
    }

    return profiles;
  }, []);
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

function LeadershipDirectorsSection({ profiles }: { profiles: LeadershipProfile[] }) {
  if (!profiles.length) return null;

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-dark">Directors</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">Guided by experienced industry leaders.</h2>
        </Reveal>

        <div className="mt-8 grid gap-5">
          {profiles.map((profile, index) => (
            <Reveal key={profile.name} direction={index % 2 === 0 ? "left" : "right"} delay={index * 100}>
              <article className={`grid overflow-hidden rounded-[18px] border border-brand-teal/15 bg-[#f7faf9] shadow-2xl shadow-slate-900/6 lg:grid-cols-2 ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="relative min-h-[220px] overflow-hidden bg-slate-950 sm:min-h-[300px]">
                  <img src={leadershipImage} alt={profile.name} className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-teal">{profile.role}</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">{profile.name}</h3>
                  </div>
                </div>

                <div className="grid content-center gap-3 p-5 sm:p-7 lg:p-8">
                  <span className="h-1 w-20 rounded-full bg-brand-teal" />
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Leadership Profile</p>
                  {profile.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutBodyContent({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) return null;

  return (
    <div className="grid gap-4">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = block.level === 2 ? "h2" : "h3";

          return (
            <Reveal key={`${block.text}-${index}`} delay={index * 45}>
              <div className="rounded-[18px] border border-brand-teal/15 bg-[#06222a] p-5 text-white shadow-xl shadow-slate-900/8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-teal">Step Insight</p>
                <HeadingTag className="mt-3 text-2xl font-black leading-tight sm:text-3xl">{block.text}</HeadingTag>
              </div>
            </Reveal>
          );
        }

        if (block.type === "paragraph") {
          return (
            <Reveal key={`${block.text.slice(0, 32)}-${index}`} direction={index % 2 ? "right" : "left"} delay={index * 45}>
              <div className="group relative overflow-hidden rounded-[18px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal/30 hover:shadow-xl sm:p-6">
                <span className="absolute left-0 top-0 h-full w-1 bg-brand-teal" />
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{block.text}</p>
              </div>
            </Reveal>
          );
        }

        if (block.type === "list") {
          return (
            <Reveal key={`list-${index}`} delay={index * 45}>
              <ul className="grid gap-3 rounded-[18px] border border-brand-teal/15 bg-[#f7faf9] p-4 shadow-lg shadow-slate-900/5 sm:grid-cols-2 sm:p-5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 rounded-[14px] bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-teal text-[10px] text-white">
                      <FaCheck aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        }

        if (block.type === "image") {
          return (
            <Reveal key={`${block.src}-${index}`} delay={index * 45}>
              <figure className="overflow-hidden rounded-[18px] border border-brand-teal/15 bg-white p-2 shadow-xl shadow-slate-900/5">
                <img src={block.src} alt={block.alt} className="max-h-[360px] w-full rounded-[12px] object-cover" />
              </figure>
            </Reveal>
          );
        }

        if (block.type === "table") {
          return (
            <Reveal key={`table-${index}`} delay={index * 45}>
              <div className="overflow-x-auto rounded-[18px] border border-brand-teal/15 bg-white shadow-xl shadow-slate-900/5">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${row.join("-")}-${rowIndex}`} className={rowIndex === 0 ? "bg-brand-teal text-white" : "border-t border-brand-teal/15"}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`} className="border-r border-brand-teal/10 px-4 py-3 align-top last:border-r-0">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          );
        }

        return null;
      })}
    </div>
  );
}

export function AboutPage({ page }: AboutPageProps) {
  const heroImage = getPageImage(page);
  const isLeadershipPage = page.slug === "our-leadership";
  const summaryParagraphs = page.contentBlocks.filter((block) => block.type === "paragraph").slice(0, 2);
  const pageGallery = page.images.length ? page.images.slice(0, 3).map((image) => image.src) : galleryImages;
  const sectionLinks = page.links.filter((link) => link.href && link.text).slice(0, 6);
  const leadershipProfiles = isLeadershipPage ? getLeadershipProfiles(page.contentBlocks) : [];
  const bodyBlocks = page.contentBlocks.filter((block) => !(block.type === "paragraph" && summaryParagraphs.some((summary) => summary.text === block.text)));

  return (
    <>
      <section className="relative isolate min-h-[420px] overflow-hidden bg-slate-950 text-white">
        <img src={heroImage} alt="" className="about-hero-image absolute inset-0 -z-30 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_28%,rgba(91,192,187,0.34),transparent_34%),linear-gradient(105deg,rgba(5,18,24,0.96),rgba(5,18,24,0.78)_48%,rgba(5,18,24,0.36))]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:52px_52px]" />

        <div className="mx-auto grid min-h-[420px] max-w-7xl items-end gap-8 px-4 pb-8 pt-24 sm:px-6 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-8 lg:pb-12">
          <Reveal direction="left" className="max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1 w-16 rounded-full bg-brand-teal" />
              <span className="h-1 w-8 rounded-full bg-[#F4B544]" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-teal sm:tracking-[0.34em]">Step Industries</p>
            <h1 className="mt-4 text-4xl font-black leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">{page.h1 || page.title}</h1>
            {page.description ? <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/84">{page.description}</p> : null}
          </Reveal>

          <Reveal direction="right" delay={160} className="hidden lg:block">
            <div className="about-float-panel rounded-[18px] border border-white/18 bg-white/12 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#7ee0da]">Built On</p>
              <div className="mt-5 grid gap-4">
                {aboutHighlights.map(([Icon, value, label]) => (
                  <div key={value} className="flex items-center gap-4 rounded-[14px] border border-white/12 bg-white/10 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-lg font-black">{value}</span>
                      <span className="mt-1 block text-sm font-medium text-white/72">{label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden border-b border-brand-teal/15 bg-white">
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

      {isLeadershipPage ? <LeadershipDirectorsSection profiles={leadershipProfiles} /> : null}

      {!isLeadershipPage && summaryParagraphs.length ? (
        <section className="overflow-hidden border-b border-brand-teal/15 bg-[#f7faf9]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <Reveal direction="left" className="relative min-h-[230px] overflow-hidden rounded-[18px] border border-brand-teal/15 bg-slate-950 shadow-2xl shadow-slate-900/10 sm:min-h-[340px]">
              <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-88 transition duration-700 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/86 to-transparent p-6">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-teal">About Step</p>
                <h2 className="mt-3 text-2xl font-black text-white">Miles ahead with dependable electrical solutions.</h2>
              </div>
            </Reveal>

            <div className="grid content-center gap-5">
              {summaryParagraphs.map((block, index) =>
                block.type === "paragraph" ? (
                  <Reveal key={index} direction="right" delay={index * 120}>
                    <p className="rounded-[18px] border border-brand-teal/15 bg-white p-5 text-sm leading-7 text-slate-600 shadow-xl shadow-slate-900/5">
                      {block.text}
                    </p>
                  </Reveal>
                ) : null
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {valueCards.map(([Icon, title, text], index) => (
                  <Reveal key={title} direction="right" delay={260 + index * 120}>
                    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#06222a] text-brand-teal">
                        <Icon aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {!isLeadershipPage ? <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_0.45fr] lg:gap-8 lg:px-8">
          <Reveal direction="left">
            <div className="rounded-[18px] border border-brand-teal/15 bg-[#f7faf9] p-4 shadow-2xl shadow-slate-900/5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-white">
                  <FaImage aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-dark">Company Story</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">Explore the details</h2>
                </div>
              </div>
              <AboutBodyContent blocks={bodyBlocks} />
            </div>
          </Reveal>

          <aside className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
            {pageGallery.map((src, index) => (
              <Reveal key={src} direction="right" delay={index * 120}>
                <div className="about-gallery-card overflow-hidden rounded-[18px] border border-brand-teal/15 bg-slate-950 shadow-xl shadow-slate-900/10">
                  <img src={src} alt="" className="h-40 w-full object-cover transition duration-500 hover:scale-105 sm:h-48" />
                </div>
              </Reveal>
            ))}
          </aside>
        </div>
      </section> : null}
    </>
  );
}
