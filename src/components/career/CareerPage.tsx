import { PageHero } from "@/components/PageHero";
import { PageBody } from "@/components/pages/PageBody";
import type { SitePage } from "@/lib/content";

type CareerPageProps = {
  page: SitePage;
};

export function CareerPage({ page }: CareerPageProps) {
  return (
    <>
      <PageHero title={page.h1 || page.title} description="Explore career information and application details at Step Cables." image={page.image} />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
