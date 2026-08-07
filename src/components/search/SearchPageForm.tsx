"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type SearchPageFormProps = {
  query: string;
};

type SearchPageFormValues = {
  q: string;
};

export function SearchPageForm({ query }: SearchPageFormProps) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SearchPageFormValues>({
    defaultValues: { q: query },
  });

  const submitSearch = handleSubmit(({ q }) => {
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  });

  return (
    <form onSubmit={submitSearch} className="mt-8 flex max-w-2xl gap-3 rounded-[20px] border border-brand-teal/15 bg-white/78 p-3 shadow-xl shadow-slate-900/5 backdrop-blur-lg">
      <label htmlFor="search-page-input" className="sr-only">
        Search
      </label>
      <input
        id="search-page-input"
        {...register("q")}
        type="search"
        placeholder="Search products, pages, blogs"
        className="min-w-0 flex-1 rounded-full border border-brand-teal/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-teal/35"
      />
      <button type="submit" className="rounded-full bg-gradient-to-r from-brand-teal to-brand-dark px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-teal/25 transition duration-300 hover:-translate-y-0.5">
        Search
      </button>
    </form>
  );
}
