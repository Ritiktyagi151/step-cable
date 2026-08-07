import { RangeProductDetailPage } from "./RangeProductPage";
import type { RangeProductDetailPageProps } from "./RangeProductPage";
import { getCadillacProducts } from "./cadillacProducts";

export function CadillacProductDetailPage({ page, product }: RangeProductDetailPageProps) {
  return (
    <RangeProductDetailPage
      page={page}
      product={product}
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
