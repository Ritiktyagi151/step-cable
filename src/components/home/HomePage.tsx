import { Applications } from "./Applications";
import { CertificationsStandards } from "./CertificationsStandards";
import { ConnectPossibilities } from "./ConnectPossibilities";
import { HomeHero } from "./HomeHero";
import { NetworkStats } from "./NetworkStats";
import { NumbersSpeak } from "./NumbersSpeak";
import { OurClients } from "./OurClients";
import { ProductRange } from "./ProductRange";
import { ProjectWorkflow } from "./ProjectWorkflow";
import { QualityApproach } from "./QualityApproach";
import { ServicesOffered } from "./ServicesOffered";
import { StepAdvantage } from "./StepAdvantage";

export function HomePage() {
  return (
    <>
      <HomeHero />
      <NetworkStats />
      <ConnectPossibilities />
      {/* <NumbersSpeak /> */}
      <ProductRange />
      <ServicesOffered />
      <StepAdvantage />
      <CertificationsStandards />
      <QualityApproach />
      <Applications />
      <ProjectWorkflow />
      <OurClients />
    </>
  );
}
