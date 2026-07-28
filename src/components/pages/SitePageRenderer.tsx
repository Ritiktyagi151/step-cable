import { AboutPage } from "@/components/company/AboutPage";
import { ClientsPage } from "@/components/company/ClientsPage";
import { CompanyPage } from "@/components/company/CompanyPage";
import { ContactPage } from "@/components/contact/ContactPage";
import { EpcPage } from "@/components/epc/EpcPage";
import { CareerPage } from "@/components/career/CareerPage";
import { CurrentOpeningsPage } from "@/components/career/CurrentOpeningsPage";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { ProductPage } from "@/components/product/ProductPage";
import { SitemapPage } from "@/components/sitemap/SitemapPage";
import { HomePage } from "@/components/home/HomePage";
import { PageSchema } from "./PageSchema";
import { StandardPage } from "./StandardPage";
import type { SitePage } from "@/lib/content";

type SitePageRendererProps = {
  page: SitePage;
};

const productSlugs = new Set([
  "ab-cable",
  "advantages-of-insulated-power-cable",
  "al-conductor",
  "all-alloy-aluminum-conductor-steel-reinforced-aluminum-wires",
  "all-alloy-aluminum-conductor-steel-reinforced",
  "all-alloy-aluminum-conductor",
  "all-aluminum-conductor",
  "aluminum-conductor-alloy-reinforced",
  "aluminum-conductor-steel-reinforced",
  "armoured-cable",
  "drum-handling-practices",
  "electrical-building-wire",
  "electrical-switch",
  "electrical-tapes",
  "elevator-escalator-cable",
  "fireproof-wire",
  "frls-wires",
  "house-wire",
  "housing-wiring-electrical-building-wire",
  "mcb",
  "modular-plates",
  "modular-switch-board",
  "modular-switches",
  "multicore-wire-and-cable",
  "pvc-insulated-power-control-cable",
  "single-core-multicore-industrial-cables",
  "submersible-wire",
  "switch-plates",
  "three-core-pvc-insulated-flat-cable",
  "three-core-xlpe-insulated-flat-cable",
  "wire-and-cable",
  "xlpe-insulated-power-control-cable"
]);

const aboutSlugs = new Set([
  "about-step-cables",
  "about-step-industry",
  "core-values",
  "csr-activity",
  "our-leadership",
  "philosophy",
  "vision-misiion"
]);

const epcSlugs = new Set([
  "about-epc-business",
  "design-engineering-capabilities",
  "project-monitoring",
  "quality-assurance-system",
  "safety-management-pratice"
]);

const companySlugs = new Set([
  "certification",
  "iso-certification",
  "manufacturing-plant",
  "manufacturing-plant-2"
]);

const clientSlugs = new Set(["clients", "clients1", "clients2"]);
const careerSlugs = new Set(["application-form", "current-openings", "hr-philosophy"]);
const policySlugs = new Set(["privacy-policy", "return-policy", "terms-and-conditions"]);

function renderPage(page: SitePage) {
  if (page.slug === "") return <HomePage />;
  if (page.slug === "contact") return <ContactPage page={page} />;
  if (productSlugs.has(page.slug)) return <ProductPage page={page} />;
  if (aboutSlugs.has(page.slug)) return <AboutPage page={page} />;
  if (epcSlugs.has(page.slug)) return <EpcPage page={page} />;
  if (companySlugs.has(page.slug)) return <CompanyPage page={page} />;
  if (clientSlugs.has(page.slug)) return <ClientsPage page={page} />;
  if (page.slug === "current-openings") return <CurrentOpeningsPage page={page} />;
  if (careerSlugs.has(page.slug)) return <CareerPage page={page} />;
  if (policySlugs.has(page.slug)) return <PolicyPage page={page} />;
  if (page.slug === "sitemap") return <SitemapPage page={page} />;
  return <StandardPage page={page} />;
}

export function SitePageRenderer({ page }: SitePageRendererProps) {
  return (
    <>
      {renderPage(page)}
      <PageSchema schema={page.schema} />
    </>
  );
}

