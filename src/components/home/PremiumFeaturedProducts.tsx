import { premiumFeaturedProducts } from "./PremiumHomeData";

export function PremiumFeaturedProducts() {
  return (
    <section className="premium-section premium-reveal overflow-hidden">
      <div className="premium-section-head premium-section-head-left">
        <p>Featured Products</p>
        <h2>Clean product stories.</h2>
      </div>
      <div className="premium-slider">
        {premiumFeaturedProducts.map(([title, image, tag], index) => (
          <article key={title} className="premium-slide">
            <img src={image} alt={title} loading={index === 0 ? "eager" : "lazy"} />
            <div>
              <span>{tag}</span>
              <h3>{title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
