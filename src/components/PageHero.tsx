import pageHeroBanners from "@/data/page-hero-banners.json";

type HeroBannerConfig =
  | string
  | {
      desktop?: string;
      mobile?: string;
    };

type PageHeroProps = {
  slug?: string;
  title: string;
  description?: string;
  image?: string;
};

const heroBannerMap = pageHeroBanners as Record<string, HeroBannerConfig>;
const emptyHeroBanner = getHeroBanner();

function getValidHeroImage(image?: string) {
  return image && image.startsWith("/") ? image : undefined;
}

function getHeroBanner(config?: HeroBannerConfig) {
  if (typeof config === "string") {
    const image = getValidHeroImage(config);
    return {
      desktop: image,
      mobile: image,
    };
  }

  return {
    desktop: getValidHeroImage(config?.desktop),
    mobile: getValidHeroImage(config?.mobile),
  };
}

export function PageHero({ slug, title, description, image }: PageHeroProps) {
  const configuredBanner = slug ? getHeroBanner(heroBannerMap[slug]) : emptyHeroBanner;
  const fallbackBanner = getHeroBanner(heroBannerMap._default);
  const propImage = getValidHeroImage(image);
  const desktopImage = configuredBanner.desktop || propImage || fallbackBanner.desktop || "/assets/img/cable-wires.jpg";
  const mobileImage = configuredBanner.mobile || configuredBanner.desktop || propImage || fallbackBanner.mobile || fallbackBanner.desktop || desktopImage;

  return (
    <section className="relative overflow-hidden border-b border-brand-teal/15 bg-white text-slate-900">
      <div className="absolute inset-0 opacity-45">
        <picture className="block h-full w-full">
          <source media="(max-width: 767px)" srcSet={mobileImage} />
          <img src={desktopImage} alt="" className="h-full w-full object-cover" />
        </picture>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(91,192,187,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,187,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-5xl rounded-[20px] border border-brand-teal/15 bg-white/76 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-lg sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark sm:text-sm sm:tracking-[0.32em]">Step Cables</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">{title}</h1>
          {description ? <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
