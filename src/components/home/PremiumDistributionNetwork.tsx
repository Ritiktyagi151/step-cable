"use client";

import { useEffect, useRef, useState } from "react";
import { FaBoxOpen, FaClock, FaTruckFast, FaUsers } from "react-icons/fa6";

const reachPoints = [
  [FaTruckFast, "Pan India Presence"],
  [FaBoxOpen, "Consistent Product Availability"],
  [FaClock, "Timely Delivery to Customers"],
  [FaUsers, "Strong Channel Partner Network"],
] as const;

/**
 * Generic scroll-reveal hook.
 * Returns a ref to attach + boolean "visible" that flips true
 * once the element scrolls into the viewport.
 */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // animate once, not every scroll pass
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function PremiumDistributionNetwork() {
  const { ref: videoRef, inView: videoInView } = useInView<HTMLDivElement>();
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>();
  const { ref: pointsRef, inView: pointsInView } = useInView<HTMLDivElement>();

  return (
    <section className="bg-white px-4 py-14 text-[#171717] sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[8px] border border-black/10 bg-white shadow-2xl shadow-black/5 lg:grid-cols-[0.78fr_1.08fr]">
        {/* Video panel — slides in from the left */}
        <div
          ref={videoRef}
          className={`relative min-h-[420px] overflow-hidden bg-[#d9d8d4] transition-all duration-1000 ease-out lg:min-h-[640px] ${
            videoInView
              ? "translate-x-0 opacity-100"
              : "-translate-x-16 opacity-0"
          }`}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/home-banner/india-distribution-network.png"
            aria-label="Step Cable distribution network across India"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video/step-presence.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="grid content-center gap-8 p-6 sm:p-8 lg:p-12">
          {/* Heading block — slides up */}
          <div
            ref={textRef}
            className={`transition-all duration-1000 ease-out ${
              textInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-[0.36em] text-[#0877ff]">
              Our Reach
            </p>
            <span className="mt-4 block h-1 w-14 bg-[#0877ff]" />
            <h2 className="mt-8 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              Our Distribution Network in <span className="text-[#0877ff]">India</span>
            </h2>

            <div className="mt-8 grid gap-5 text-base leading-8 text-[#2f2f2f] sm:text-lg">
              <p>
                Step Cable supplies quality electrical products across India through a growing network of dealers, retailers, distributors and channel partners.
              </p>
              <p>
                This reach helps customers access product availability, responsive support and dependable supply coordination for residential, commercial, industrial and infrastructure requirements.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <div
              ref={pointsRef}
              className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              <span className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[#0877ff]/45 to-transparent lg:block" />
              {reachPoints.map(([Icon, label], index) => (
                <div
                  key={label}
                  className={`relative z-10 grid justify-items-center gap-4 text-center transition-all duration-700 ease-out ${
                    pointsInView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: pointsInView ? `${index * 150}ms` : "0ms" }}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#eef6ff] bg-[#eaf5ff] text-[#0877ff] shadow-lg shadow-blue-500/10">
                    <Icon aria-hidden="true" className="text-2xl" />
                  </span>
                  <p className="max-w-40 text-sm font-black leading-snug text-[#171717]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}