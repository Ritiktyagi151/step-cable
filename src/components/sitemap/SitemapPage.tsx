import { PageHero } from "@/components/PageHero";
import { PageBody } from "@/components/pages/PageBody";
import type { SitePage } from "@/lib/content";

type SitemapPageProps = {
  page: SitePage;
};

export function SitemapPage({ page }: SitemapPageProps) {
  return (
    <>
      <PageHero slug={page.slug} title={page.h1 || page.title} description="Browse Step Cables pages and important website links." image={page.image} />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
