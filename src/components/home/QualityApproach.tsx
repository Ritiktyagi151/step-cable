import { homeProcess } from "./homeData";

export function QualityApproach() {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-white/55">Quality Approach</p>
          <h2 className="mt-4 text-4xl font-black leading-tight">Engineered for safety, consistency and dependable supply.</h2>
        </div>
        <div className="grid gap-4">
          {homeProcess.map((item, index) => (
            <div key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/15 pt-4">
              <span className="text-sm font-black text-white/45">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-base leading-7 text-white/78">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
