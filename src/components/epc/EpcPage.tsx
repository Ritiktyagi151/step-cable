import { PageHero } from "@/components/PageHero";
import { PageBody } from "@/components/pages/PageBody";
import { PageSummary } from "@/components/pages/PageSummary";
import type { SitePage } from "@/lib/content";

type EpcPageProps = {
  page: SitePage;
};

export function EpcPage({ page }: EpcPageProps) {
  return (
    <>
      <PageHero slug={page.slug} title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageSummary page={page} eyebrow="EPC Business" />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
