import { PageHero } from "@/components/PageHero";
import { PageBody } from "@/components/pages/PageBody";
import type { SitePage } from "@/lib/content";

type CompanyPageProps = {
  page: SitePage;
};

export function CompanyPage({ page }: CompanyPageProps) {
  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
