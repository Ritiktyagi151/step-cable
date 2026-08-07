import { RangeListingPage } from "./RangeProductPage";
import type { RangeProductPageProps } from "./RangeProductPage";
import { getCadillacProducts } from "./cadillacProducts";

export function CadillacListingPage({ page }: RangeProductPageProps) {
  return (
    <RangeListingPage
      page={page}
      config={{
        brand: "Cadillac",
        routeBase: "/step-cadillac",
        products: getCadillacProducts(page),
        heading: "STEP Cadillac switches, plates, boxes and accessories.",
        groupCount: "12",
      }}
    />
  );
}
