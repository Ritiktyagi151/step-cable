"use client";

import { useEffect, useRef, useState } from "react";
import { FaBuilding, FaHeadset, FaStore, FaUserTie, FaUsersCog } from "react-icons/fa";

const networkStats = [
  ["900+", "Dealers & Distributors", "dealer"],
  ["90", "Branch & Representative Offices", "branch"],
  ["1100+", "Team Members", "workforce"],
  ["85000+", "Retail Touchpoints", "retailer"],
  ["100+", "Enquiry Support Lines", "support"],
] as const;

const statIcons = {
  dealer: FaUserTie,
  branch: FaBuilding,
  workforce: FaUsersCog,
  retailer: FaStore,
  support: FaHeadset,
} as const;

function CountUpValue({ value, start }: { value: string; start: boolean }) {
  const target = Number(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || !target) return;

    let frame = 0;
    const totalFrames = 70;
    const counter = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * easedProgress));

      if (progress === 1) {
        window.clearInterval(counter);
      }
    }, 24);

    return () => window.clearInterval(counter);
  }, [start, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export function NetworkStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStartCount(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white text-slate-900" aria-labelledby="network-stats-title">
      <div className="flex flex-col overflow-hidden border-y border-brand-teal/15 bg-slate-50 text-slate-900 sm:min-h-14 sm:flex-row sm:items-center">
        <h2
          id="network-stats-title"
          className="flex h-10 shrink-0 items-center justify-center bg-brand-teal px-4 text-xs font-black uppercase tracking-[0.12em] text-white sm:h-14 sm:px-8 sm:text-base sm:tracking-normal"
        >
          What&apos;s New
        </h2>
        <div className="relative h-11 min-w-0 flex-1 overflow-hidden whitespace-nowrap sm:h-14">
          <p className="network-news-marquee absolute top-0 flex h-full items-center text-sm font-semibold leading-6 text-slate-600 sm:text-base">
            STEP Cable delivers a comprehensive range of high-quality wires, cables and conductors engineered for reliable performance, superior durability and safe power transmission across residential, commercial, industrial, utility, infrastructure and EPC projects. Our products are designed to meet diverse electrical requirements while ensuring consistent quality, efficiency and long-lasting performance.
          </p>
        </div>
      </div>

      
    </section>
  );
}
