"use client";

import { ConductorCategorySection } from "./ConductorCategorySection";
import { SwitchAccessoryCategorySection } from "./SwitchAccessoryCategorySection";
import { WireCableCategorySection } from "./WireCableCategorySection";

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

      <div className="relative mx-auto grid max-w-7xl gap-14">
        <WireCableCategorySection />
        <SwitchAccessoryCategorySection />
        <ConductorCategorySection />
      </div>
    </section>
  );
}

export default PremiumProductCategories;
