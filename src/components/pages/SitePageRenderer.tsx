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
import { getPageGroup } from "./pageRegistry";
import type { SitePage } from "@/lib/content";

type SitePageRendererProps = {
  page: SitePage;
};

function renderPage(page: SitePage) {
  const pageGroup = getPageGroup(page.slug);

  switch (pageGroup) {
    case "home":
      return <HomePage />;
    case "contact":
      return <ContactPage page={page} />;
    case "product":
      return <ProductPage page={page} />;
    case "about":
      return <AboutPage page={page} />;
    case "epc":
      return <EpcPage page={page} />;
    case "company":
      return <CompanyPage page={page} />;
    case "clients":
      return <ClientsPage page={page} />;
    case "career":
      return page.slug === "current-openings" ? <CurrentOpeningsPage page={page} /> : <CareerPage page={page} />;
    case "policy":
      return <PolicyPage page={page} />;
    case "sitemap":
      return <SitemapPage page={page} />;
    default:
      return <StandardPage page={page} />;
  }
}

export function SitePageRenderer({ page }: SitePageRendererProps) {
  return (
    <>
      {renderPage(page)}
      <PageSchema schema={page.schema} />
    </>
  );
}
