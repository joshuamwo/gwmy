import { useRecoilValue } from "recoil";
import { productState } from "@/recoil/atoms";
import React from "react";
import Card from "../ui/card";

export default function MyProductsList() {
  const products = useRecoilValue(productState);

  return (
    <div className="w-full px-4 pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8">
      <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:gap-6 3xl:gap-7 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {products.length > 0
          ? products.map((product) => (
              <Card
                product={product}
                key={product.id}
                isMyProductsPage={true}
              />
            ))
          : ""}
      </div>
    </div>
  );
}
