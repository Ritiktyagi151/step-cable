import { RangeProductDetailPage } from "./RangeProductPage";
import type { RangeProductDetailPageProps } from "./RangeProductPage";
import { getLincolnProducts } from "./cadillacProducts";

export function LincolnProductDetailPage({ page, product }: RangeProductDetailPageProps) {
  return (
    <RangeProductDetailPage
      page={page}
      product={product}
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
