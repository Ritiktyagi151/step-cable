"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";

const premiumCategories = [
  {
    title: "House & Building Wires",
    eyebrow: "FR / FRLS / Z+",
    href: "/housing-wiring-electrical-building-wire",
    image: "/homepage-img/catogory-img/house-wire.png",
    links: [
      ["Housing Wiring", "/housing-wiring-electrical-building-wire"],
      ["Z+ Security Wire", "/electrical-building-wire"],
      ["FR / FRLS Wires", "/frls-wires"],
    ],
  },
  {
    title: "Industrial Cables",
    eyebrow: "Single & Multicore",
    href: "/single-core-multicore-industrial-cables",
    image: "/homepage-img/catogory-img/industrial-cable.png",
    links: [
      ["Single Core / Multicore", "/single-core-multicore-industrial-cables"],
      ["Armoured Cable", "/armoured-cable"],
      ["Elevator Cable", "/elevator-escalator-cable"],
    ],
  },
  {
    title: "Flat Submersible Cables",
    eyebrow: "Pump Cables",
    href: "/three-core-pvc-insulated-flat-cable",
    image: "/homepage-img/catogory-img/flat-submersible-cables.png",
    links: [
      ["3 Core PVC Flat Cable", "/three-core-pvc-insulated-flat-cable"],
      ["3 Core XLPE Flat Cable", "/three-core-xlpe-insulated-flat-cable"],
      ["Submersible Wire", "/submersible-wire"],
    ],
  },
  {
    title: "Power & Control Cables",
    eyebrow: "PVC / XLPE",
    href: "/pvc-insulated-power-control-cable",
    image: "/homepage-img/catogory-img/power-control-cables.png",
    links: [
      ["PVC Power & Control", "/pvc-insulated-power-control-cable"],
      ["XLPE Power & Control", "/xlpe-insulated-power-control-cable"],
      ["Aerial Bunched Cable", "/ab-cable"],
    ],
  },
  {
    title: "Conductors",
    eyebrow: "AAC / AAAC / ACSR",
    href: "/conductor",
    image: "/homepage-img/catogory-img/conductor.png",
    links: [
      ["AAC", "/all-aluminum-conductor"],
      ["AAAC", "/all-alloy-aluminum-conductor"],
      ["ACSR", "/aluminum-conductor-steel-reinforced"],
    ],
  },
  {
    title: "Switches & Accessories",
    eyebrow: "Lincoln / Cadillac / MCB",
    href: "/modular-switches",
    image: "/homepage-img/catogory-img/switches-accessories.png",
    links: [
      ["Lincoln", "/step-lincoln"],
      ["Cadillac", "/step-cadillac"],
      ["MCB & Switchgear", "/mcb"],
    ],
  },
];

// Small L-shaped viewfinder marks — reads like crop/registration marks on a
// technical drawing, echoing the spec-sheet language cable catalogues use.
function CornerMarks() {
  const base = "absolute h-4 w-4 border-[#0877ff] transition-all duration-300";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l-2 border-t-2 group-hover:h-5 group-hover:w-5`} />
      <span className={`${base} right-3 top-3 border-r-2 border-t-2 group-hover:h-5 group-hover:w-5`} />
      <span className={`${base} bottom-3 left-3 border-b-2 border-l-2 group-hover:h-5 group-hover:w-5`} />
      <span className={`${base} bottom-3 right-3 border-b-2 border-r-2 group-hover:h-5 group-hover:w-5`} />
    </>
  );
}

// Scroll-triggered slide-up + fade card wrapper
function RevealCard({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // animate once, not every scroll pass
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${(index % 3) * 100}ms` : "0ms",
      }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export function PremiumProductCategories() {
  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#f5f4f1] px-4 py-16 text-[#171717] sm:px-6 sm:py-20 lg:px-10 lg:py-14"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        #products, #products * { font-family: 'Inter', system-ui, sans-serif; }
        #products .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        #products .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* hazard rule — thin repeating diagonal stripe, industrial tape reference */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-[#0877ff]/18"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,119,255,0.08), transparent 42%), radial-gradient(circle at 18% 0%, rgba(8,119,255,0.12), transparent 34%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] font-black uppercase tracking-[0.28em] text-[#0877ff]">
              Product Catalogue
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-[#171717] sm:text-5xl lg:text-[3.1rem]">
              Six product lines.
              <br />
              One rated standard.
            </h2>
          </div>

          <a
            href="/wire-and-cable"
            className="font-mono group inline-flex w-fit items-center gap-2 rounded-full bg-[#0877ff] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#005fd0]"
          >
            View Full Range
            <FaArrowRight
              aria-hidden="true"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {premiumCategories.map((category, i) => (
            <RevealCard key={category.href} index={i}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-black/10 bg-white/78 shadow-xl shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-[#0877ff]/25 hover:bg-white hover:shadow-2xl hover:shadow-black/10">
                <a
                  href={category.href}
                  className="relative block h-64 shrink-0 overflow-hidden bg-white sm:h-60"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-fill transition duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <CornerMarks />
                </a>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <h3 className="font-display text-xl font-black leading-tight tracking-tight text-[#171717]">
                    <a href={category.href} className="transition-colors hover:text-[#0877ff]">
                      {category.title}
                    </a>
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.links.map(([label, href]) => (
                      <a
                        key={href}
                        href={href}
                        className="font-mono rounded-full border border-[#0877ff]/10 bg-[#0877ff]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[#24527f] transition-colors hover:border-[#0877ff]/25 hover:bg-[#0877ff] hover:text-white"
                      >
                        {label}
                      </a>
                    ))}
                  </div>

                  <a
                    href={category.href}
                    className="font-mono group/cta mt-auto inline-flex items-center gap-2 border-t border-black/10 pt-4 text-[11px] font-black uppercase tracking-[0.16em] text-[#0877ff]"
                  >
                    Explore Category
                    <FaArrowUpRightFromSquare
                      aria-hidden="true"
                      size={13}
                      className="transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
                    />
                  </a>
                </div>
              </article>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PremiumProductCategories;
