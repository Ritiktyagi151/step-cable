import { Applications } from "./Applications";
import { HomeHero } from "./HomeHero";
import { OurClients } from "./OurClients";
import { ProductRange } from "./ProductRange";
import { QualityApproach } from "./QualityApproach";

export function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductRange />
      <QualityApproach />
      <Applications />
      <OurClients />
    </>
  );
}
