import { PageHero } from "@/components/PageHero";
import { PageBody } from "./PageBody";
import type { SitePage } from "@/lib/content";

type StandardPageProps = {
  page: SitePage;
};

export function StandardPage({ page }: StandardPageProps) {
  return (
    <>
      <PageHero title={page.h1 || page.title} description={page.description} image={page.image} />
      <PageBody blocks={page.contentBlocks} />
    </>
  );
}
