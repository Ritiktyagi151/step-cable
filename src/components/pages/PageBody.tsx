import { CleanContent } from "@/components/content/CleanContent";
import type { ContentBlock } from "@/lib/content";

type PageBodyProps = {
  blocks: ContentBlock[];
  isHome?: boolean;
};

export function PageBody({ blocks, isHome = false }: PageBodyProps) {
  return (
    <section className={isHome ? "bg-white" : "bg-neutral-50"}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <CleanContent blocks={blocks} />
      </div>
    </section>
  );
}
