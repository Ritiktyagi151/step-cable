import { FaArrowRight } from "react-icons/fa6";

export type GalleryCategory = {
  title: string;
  eyebrow: string;
  href: string;
  image: string;
};

type GalleryLayout = "mosaic" | "featured" | "compact";

function GalleryGrid({ categories, layout = "mosaic" }: { categories: GalleryCategory[]; layout?: GalleryLayout }) {
  if (layout === "featured") {
    const [featured, ...items] = categories;

    return (
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        {featured ? (
          <a
            href={featured.href}
            className="group relative min-h-[420px] overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5"
          >
            <img src={featured.image} alt={featured.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white/75">{featured.eyebrow}</p>
              <h3 className="font-display mt-2 text-3xl font-black leading-tight">{featured.title}</h3>
            </div>
          </a>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((category) => (
            <a key={category.href} href={category.href} className="group grid min-h-[150px] grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5">
              <img src={category.image} alt={category.title} loading="lazy" className="h-full min-h-[150px] w-full object-cover" />
              <div className="flex flex-col justify-end p-5">
                <p className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-[#5BC0BB]">{category.eyebrow}</p>
                <h3 className="font-display mt-2 text-xl font-black leading-tight text-[#171717]">{category.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "compact") {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a key={category.href} href={category.href} className="group overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <img src={category.image} alt={category.title} loading="lazy" className="h-full w-full object-fill" />
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#5BC0BB]">{category.eyebrow}</p>
              <h3 className="font-display mt-2 text-lg font-black leading-tight text-[#171717]">{category.title}</h3>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-6">
      {categories.map((category, index) => {
        const cardLayout = index === 0 ? "lg:col-span-4" : "lg:col-span-2";

        return (
          <a
            key={category.href}
            href={category.href}
            className={`group relative min-h-[260px] overflow-hidden rounded-[8px] bg-white shadow-xl shadow-black/5 ${cardLayout}`}
          >
            <img
              src={category.image}
              alt={category.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white/75">
                {category.eyebrow}
              </p>
              <h3 className="font-display mt-2 text-2xl font-black leading-tight">
                {category.title}
              </h3>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export function PremiumProductGallerySection({
  eyebrow,
  title,
  href,
  cta,
  categories,
  layout = "mosaic",
  showDivider = true,
}: {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
  categories: GalleryCategory[];
  layout?: GalleryLayout;
  showDivider?: boolean;
}) {
  return (
    <div className={showDivider ? "border-b border-black/10 pb-14" : ""}>
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.28em] text-[#5BC0BB]">
            {eyebrow}
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-[#171717] sm:text-5xl lg:text-[3.1rem]">
            {title}
          </h2>
        </div>

        <a
          href={href}
          className="font-mono group inline-flex w-fit items-center gap-2 rounded-full bg-[#5BC0BB] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-[#5BC0BB]/20 transition hover:-translate-y-0.5 hover:bg-[#3AA9A4]"
        >
          {cta}
          <FaArrowRight
            aria-hidden="true"
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      <GalleryGrid categories={categories} layout={layout} />
    </div>
  );
}
