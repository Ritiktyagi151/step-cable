import { RangeListingPage } from "./RangeProductPage";
import type { RangeProductPageProps } from "./RangeProductPage";
import { getLincolnProducts } from "./cadillacProducts";

export function LincolnListingPage({ page }: RangeProductPageProps) {
  return (
    <RangeListingPage
      page={page}
      config={{
        brand: "Lincoln",
        routeBase: "/step-lincoln",
        products: getLincolnProducts(page),
        heading: "STEP Lincoln switches, sockets, plates and accessories.",
        groupCount: "9",
      }}
    />
  );
}
