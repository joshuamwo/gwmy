import { useModalAction } from "../modals/modal-controller";
import { RegisterInput, ProductCategoryType } from "@/types";
import Input from "../forms/input";
import Button from "../ui/button";
import Password from "../forms/password";
import { FormEvent, useEffect, useState } from "react";
import { FormBgPattern } from "../auth/form-bg-pattern";
import { useSupabase } from "@/context/supabase-context";
import Image from "next/image";
import { ImageCourosel, ImageSlide } from "../ui/image-courosel";
import "@splidejs/react-splide/css";
import { DeleteIcon } from "../icons/delete-icon";
import { CircularProgress, LinearProgress } from "@mui/material";
import { ProductInput } from "@/types";
import ProductCategorySelector from "./product-category-selector";
import {
  productInputDefaults,
  productVariationTypes,
} from "@/constants/product";
import ProductNameInput from "./product-name-input";
import ProductDescriptionInput from "./product-description-input";
import ProductVariations from "./product-variations";

export default function AddProductForm() {
  const [product, setProduct] = useState<ProductInput>(productInputDefaults);
  const product_category = product.category as ProductCategoryType;
  const product_sub_category = product.sub_category as string;

  //hanlde input
  function handleInput(id: string, value: any) {
    // const { id, value } = args;
    console.log(id, value);
    const updatedProduct: ProductInput = {
      ...product,
      [id]: value,
      // Other properties you want to update or keep unchanged
    };
    // Now, set the updated product using setProduct
    setProduct(updatedProduct);
    // console.log(product.product_variations["color"]);
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12"
    >
      <FormBgPattern className="hidden xs:flex absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              Add Product
            </h2>
          </div>
          <div>
            <ProductCategorySelector
              product_category={product_category}
              handleCategoryChange={handleInput}
              handleSubCategoryChange={handleInput}
              product_sub_category={product_sub_category}
            />
          </div>

          {/* dynamic inputs */}

          {product_category === "Luku" && (
            <div className="flex flex-col gap-4">
              <ProductNameInput
                product_name={product.product_name}
                handleInput={handleInput}
              />

              <ProductDescriptionInput
                product_description={product.product_description}
                handleInput={handleInput}
              />

              {/* Product Pricing and Variations */}

              <span className=" cursor-pointer pb-2.5 flex justify-center font-normal text-dark/70 rtl:text-right dark:text-light/70">
                Pricing and Variations
              </span>

              {productVariationTypes[product_category].map((variation) => (
                <div>
                  <ProductVariations
                    key={variation.type}
                    placeholder={variation.placeholder}
                    handleVariationsInput={handleInput}
                    variation_name={variation.type}
                    variations={product.product_variations}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
