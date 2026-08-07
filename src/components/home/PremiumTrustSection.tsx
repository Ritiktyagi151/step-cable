import { FaCertificate } from "react-icons/fa6";
import { premiumCertifications } from "./PremiumHomeData";

export function PremiumTrustSection() {
  return (
    <section className="premium-section premium-reveal">
      <div className="premium-logo-row">
        {premiumCertifications.map((item) => (
          <div key={item} className="premium-cert-logo">
            <FaCertificate aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="premium-stats">
        {[
          ["900+", "Dealers"],
          ["1100+", "Workforce"],
          ["100%", "Quality Checks"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
