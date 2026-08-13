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
      <div className="flex min-h-14 items-center overflow-hidden border-y border-brand-teal/15 bg-slate-50 text-slate-900">
        <h2
          id="network-stats-title"
          className="flex h-14 shrink-0 items-center bg-brand-teal px-6 text-base font-black uppercase text-white sm:px-8"
        >
          What&apos;s New
        </h2>
        <div className="relative flex min-w-0 flex-1 overflow-hidden whitespace-nowrap">
          <p className="network-news-marquee py-4 text-base font-semibold text-slate-600">
            Introducing a complete range of wires, cables and conductors crafted for modern homes, industries, utilities and EPC projects.
          </p>
        </div>
      </div>

      
    </section>
  );
}
