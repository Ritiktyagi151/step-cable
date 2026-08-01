const heroSlides = [
  "/home-banner/banner.png",
  "/home-banner/banner1.png",
  "/home-banner/banner2.png",
  // "/home-banner/banner3.png",
  // "/assets/img/slider/Electric-Wires-Step-Cables.jpg",
  // "/assets/img/slider/Electric-Cables-Step-Cables.jpg",
  // "/assets/img/slider/Power-Cables-Step-Cables.jpg",
  // "/assets/img/slider/Power-Transmission-Cables-Step-Industries.jpg",
  // "/assets/img/slider/EPC-Companies-Step-Industries.jpg",
];

export function HomeHero() {
  const slideDuration = heroSlides.length * 4;

  return (
    <section className="relative h-[320px] overflow-hidden sm:h-[460px] lg:h-[620px] xl:h-[720px] 2xl:h-[750px]">
      {heroSlides.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Banner ${index + 1}`}
          className="absolute inset-0 h-full w-full object-fill opacity-0 [animation:hero-slide-fade_var(--slide-duration)_ease-in-out_infinite]"
          style={{
            animationDelay: `${index * 4}s`,
            ["--slide-duration" as string]: `${slideDuration}s`,
          }}
        />
      ))}
    </section>
  );
}
