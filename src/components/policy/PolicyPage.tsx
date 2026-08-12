import { PageHero } from "@/components/PageHero";
import { PageBody } from "@/components/pages/PageBody";
import type { SitePage } from "@/lib/content";

type PolicyPageProps = {
  page: SitePage;
};

export function PolicyPage({ page }: PolicyPageProps) {
  return (
    <>
      <PageHero slug={page.slug} title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
