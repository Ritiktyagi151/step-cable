import Link from "next/link";
import { SearchPageForm } from "@/components/search/SearchPageForm";
import { searchSite } from "@/lib/search";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchSite(query);

  return (
    <section className="bg-slate-50/80 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-dark">Search</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">{query ? `Results for "${query}"` : "Search Step Cables"}</h1>

        <SearchPageForm query={query} />

        <div className="mt-10 grid gap-4">
          {query && results.length === 0 ? <p className="text-neutral-600">No relevant results found.</p> : null}
          {results.map((result) => (
            <Link key={`${result.type}-${result.url}`} href={result.url} className="rounded-[20px] border border-brand-teal/15 bg-white/78 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-lg transition hover:-translate-y-1 hover:border-brand-teal/35 hover:bg-white/90">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">{result.type}</span>
              <h2 className="mt-2 text-xl font-black text-slate-900">{result.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{result.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
