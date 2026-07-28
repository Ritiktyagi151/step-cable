type PageHeroProps = {
  title: string;
  description?: string;
  image?: string;
};

export function PageHero({ title, description, image }: PageHeroProps) {
  const heroImage = image && image.startsWith("/") ? image : "/assets/img/cable-wires.jpg";

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
      <div className="absolute inset-0 opacity-35">
        <img src={heroImage} alt="" className="h-full w-full object-cover grayscale" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/65">Step Cables</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{title}</h1>
        {description ? <p className="mt-5 max-w-3xl text-lg leading-8 text-white/82">{description}</p> : null}
      </div>
    </section>
  );
}
