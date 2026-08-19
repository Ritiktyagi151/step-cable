import { NetworkStats } from "./NetworkStats";
import { PremiumAboutSection } from "./PremiumAboutSection";
import { PremiumContactCta } from "./PremiumContactCta";
import { PremiumDealerBanner } from "./PremiumDealerBanner";
import { PremiumDistributionNetwork } from "./PremiumDistributionNetwork";
import { PremiumFeaturedProducts } from "./PremiumFeaturedProducts";
import { PremiumHeroSection } from "./PremiumHeroSection";
import { PremiumProductCategories } from "./PremiumProductCategories";
import { PremiumPromoGrid } from "./PremiumPromoGrid";
import { PremiumReelsSection } from "./PremiumReelsSection";
import { PremiumScrollReveal } from "./PremiumScrollReveal";
import { PremiumTestimonials } from "./PremiumTestimonials";
import { PremiumTrustSection } from "./PremiumTrustSection";
import { PremiumWhyChooseSection } from "./PremiumWhyChooseSection";

export function HomePage() {
  return (
    <div className="step-premium-home bg-[#f5f4f1] text-[#171717]">
      <PremiumScrollReveal />
      <PremiumHeroSection />
      <NetworkStats />
      <PremiumProductCategories />
      <PremiumAboutSection />
      <PremiumPromoGrid />
      <PremiumDistributionNetwork />
      <PremiumWhyChooseSection />
      <PremiumReelsSection /> 
      {/* <PremiumFeaturedProducts /> */}
      {/* <PremiumTrustSection /> */}
      {/* <PremiumTestimonials /> */}
      {/* <PremiumContactCta /> */}
      {/* <PremiumDealerBanner /> */}
    </div>
  );
}
