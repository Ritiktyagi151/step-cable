import { PageHero } from "@/components/PageHero";
import { PageBody } from "@/components/pages/PageBody";
import { PageSummary } from "@/components/pages/PageSummary";
import type { SitePage } from "@/lib/content";

type AboutPageProps = {
  page: SitePage;
};

export function AboutPage({ page }: AboutPageProps) {
  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageSummary page={page} eyebrow="About Step" />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
