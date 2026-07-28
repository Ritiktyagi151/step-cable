import Link from "next/link";
import { getBlogPosts, getPages } from "@/lib/content";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

function excerpt(text: string, query: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const index = clean.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return clean.slice(0, 180);
  return clean.slice(Math.max(0, index - 70), index + 140);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const lowerQuery = query.toLowerCase();

  const pageResults = query
    ? getPages()
        .filter((page) => `${page.title} ${page.description} ${page.contentText}`.toLowerCase().includes(lowerQuery))
        .map((page) => ({ title: page.h1 || page.title, url: page.url, description: page.description || excerpt(page.contentText, query), type: "Page" }))
    : [];

  const blogResults = query
    ? getBlogPosts()
        .filter((post) => `${post.title} ${post.description} ${post.contentText}`.toLowerCase().includes(lowerQuery))
        .map((post) => ({ title: post.title, url: `/blog/${post.slug}`, description: post.description || excerpt(post.contentText, query), type: "Blog" }))
    : [];

  const results = [...pageResults, ...blogResults].slice(0, 40);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">Search</p>
        <h1 className="mt-3 text-4xl font-black text-black">{query ? `Results for "${query}"` : "Search Step Cables"}</h1>

        <form action="/search" className="mt-8 flex max-w-2xl gap-3">
          <label htmlFor="search-page-input" className="sr-only">
            Search
          </label>
          <input
            id="search-page-input"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search products, pages, blogs"
            className="min-w-0 flex-1 border border-neutral-300 px-4 py-3 text-sm text-black outline-none focus:border-black"
          />
          <button type="submit" className="bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-800">
            Search
          </button>
        </form>

        <div className="mt-10 grid gap-4">
          {query && results.length === 0 ? <p className="text-neutral-600">No results found.</p> : null}
          {results.map((result) => (
            <Link key={`${result.type}-${result.url}`} href={result.url} className="border border-neutral-200 p-5 transition hover:border-black">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">{result.type}</span>
              <h2 className="mt-2 text-xl font-black text-black">{result.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{result.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
