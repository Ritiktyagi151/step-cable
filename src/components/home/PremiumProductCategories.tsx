"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ConductorCategorySection } from "./ConductorCategorySection";
import { SwitchAccessoryCategorySection } from "./SwitchAccessoryCategorySection";
import { WireCableCategorySection } from "./WireCableCategorySection";

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px", threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ProductCategoryReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={
        "transition-all duration-1000 ease-out will-change-transform " +
        (inView ? "translate-y-0 opacity-100" : "translate-y-14 opacity-0")
      }
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
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

      <div className="relative mx-auto grid max-w-8xl gap-14">
        <ProductCategoryReveal>
          <WireCableCategorySection />
        </ProductCategoryReveal>
        <ProductCategoryReveal delay={120}>
          <SwitchAccessoryCategorySection />
        </ProductCategoryReveal>
        <ProductCategoryReveal delay={240}>
          <ConductorCategorySection />
        </ProductCategoryReveal>
      </div>
    </section>
  );
}

export default PremiumProductCategories;
