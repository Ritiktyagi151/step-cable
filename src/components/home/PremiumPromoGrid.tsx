const galleryCards = [
  {
    title: "House & Building Wires",
    subtitle: "FR, FRLS and Z+ wiring options for safer electrical installations.",
    href: "/housing-wiring-electrical-building-wire",
    image: "/homepage-img/grid-image-range/wiring-range.png",
    eyebrow: "WIRING RANGE",
    badge: { text: "FR / FRLS", tone: "blue" as const },
  },
  {
    title: "Switches & Accessories",
    subtitle: "Modular switches, MCBs, plates and everyday electrical essentials.",
    href: "/modular-switches",
    image: "/homepage-img/grid-image-range/swtiches-range.png",
    eyebrow: "RETAIL ESSENTIALS",
    badge: { text: "MCB", tone: "blue" as const },
  },
  {
    title: "Power & Control Cables",
    subtitle: "PVC and XLPE cable options for dependable power distribution.",
    href: "/pvc-insulated-power-control-cable",
    image: "/homepage-img/grid-image-range/power-cable-range.png",
    eyebrow: "CABLE SOLUTIONS",
    badge: { text: "PVC / XLPE", tone: "dark" as const },
  },
  {
    title: "Conductors",
    subtitle: "AAC, AAAC and ACSR conductors for transmission and distribution needs.",
    href: "/conductor",
    image: "/homepage-img/grid-image-range/conductor-range.png",
    eyebrow: "CONDUCTOR RANGE",
    badge: { text: "AAC / ACSR", tone: "blue" as const },
  },
] as const;

const badgeTones = {
  blue: "bg-[#0057B8] text-white",
  orange: "bg-[#FF7A1A] text-white",
  dark: "bg-[#161616] text-white",
} as const;

function GalleryImageCard({
  href,
  image,
  title,
  subtitle,
  eyebrow,
  badge,
  className = "",
}: {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  badge?: { text: string; tone: keyof typeof badgeTones };
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-[8px] bg-[#111] shadow-[0_14px_38px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(0,87,184,0.14)] ${className}`}
    >
      {/* image */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-full w-full object-fill transition duration-700 group-hover:scale-105"
      />

      {/* bottom gradient scrim for text legibility */}
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent" /> */}

      {/* top-right product category badge */}
      {badge && (
        <span
          className={`absolute right-4 top-4 rounded-[4px] px-3 py-1 text-xs font-bold tracking-wide shadow-md ${badgeTones[badge.tone]}`}
        >
          {badge.text}
        </span>
      )}

      {/* bottom-left text block */}
      {/* <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {eyebrow && (
          <span className="mb-1 block text-[11px] font-semibold tracking-[0.15em] text-orange-400">
            {eyebrow}
          </span>
        )}
        <h3 className="text-lg font-extrabold uppercase leading-tight text-white sm:text-xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm text-white/80">{subtitle}</p>
        )}
      </div> */}
    </a>
  );
}

export function PremiumPromoGrid() {
  return (
    <section className="premium-reveal bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[92rem] gap-6 lg:grid-cols-3 lg:items-stretch">
        <GalleryImageCard
          {...galleryCards[0]}
          className="h-[420px] sm:h-[560px] lg:h-[690px]"
        />

        <div className="grid gap-6">
          <GalleryImageCard
            {...galleryCards[1]}
            className="h-[220px] sm:h-[300px] lg:h-[333px]"
          />
          <GalleryImageCard
            {...galleryCards[2]}
            className="h-[220px] sm:h-[300px] lg:h-[333px]"
          />
        </div>

        <GalleryImageCard
          {...galleryCards[3]}
          className="h-[420px] sm:h-[560px] lg:h-[690px]"
        />
      </div>
    </section>
  );
}
