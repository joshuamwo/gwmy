import { useRecoilValue } from "recoil";
import { productsState } from "@/recoil/atoms";
import React, { Suspense } from "react";
import Card from "../ui/card";
import ProductCardUiLoader from "../ui/ui-preloaders/product-card-ui-loader";
import rangeMap from "@/lib/range-map";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

type publishedProductsProps = {
  limit?: number;
};

export default function AllPublishedProductsList({
  limit = 15,
}: publishedProductsProps) {
  const products = useRecoilValue(productsState);
  const isMounted = useIsMounted();

  return (
    <div className="w-full px-4 pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 3xl:grid-cols-5 3xl:gap-6">
        {products.length > 0
          ? products.map((product) => (
              <Card
                product={product}
                key={product.id}
                isMyProductsPage={false}
              />
            ))
          : rangeMap(
              limit,
              (i) =>
                isMounted && (
                  <ProductCardUiLoader key={i} uniqueKey={`product-${i}`} />
                ),
            )}
      </div>
    </div>
  );
}
