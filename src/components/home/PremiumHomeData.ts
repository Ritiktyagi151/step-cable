import {
  FaAward,
  FaBoxesStacked,
  FaHeadset,
  FaNetworkWired,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";

export const premiumAdvantages = [
  [FaAward, "Quality"],
  [FaShieldHalved, "Safety"],
  [FaBoxesStacked, "Wide Product Range"],
  [FaNetworkWired, "Dealer Network"],
  [FaTruckFast, "Reliable Supply"],
  [FaHeadset, "Customer Support"],
] as const;

export const premiumFeaturedProducts = [
  ["Cadillac FR Wires", "/product-images/cadillac/cadillac-p01-01.png", "Studio"],
  ["Lincoln House Wires", "/product-images/lincoln/lincoln-p02-01.jpg", "Best seller"],
  ["Power Control Cable", "/assets/img/Power-Control-Cable-Core.png", "Demo"],
  ["Submersible Cable", "/wiresforhome/Best-Submersible-Cable-For-Pump.JPG", "Spin view"],
] as const;

export const premiumCertifications = ["IS 694", "IS 7098", "ISO 9001", "ISO 14001", "FRLS", "ZHFR"] as const;
