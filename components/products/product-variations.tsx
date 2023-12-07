"use client";
import { useState } from "react";
import { Product } from "@/types";
import { XIcon } from "../ui/x-icon";
import Button from "../ui/button";
import Input from "../forms/input";
import { ProductVariationType } from "@/types";

interface Props {
  variation_name: string;
  placeholder: string;
  variations: Record<string, ProductVariationType[]>;
  handleVariationsInput: (id: string, value: any) => void;
}

export default function ProductVariations({
  variation_name,
  placeholder,
  variations,
  handleVariationsInput,
}: Props) {
  //handle product colors add	and remove
  const [productVariations, setProductVariations] =
    useState<Record<string, ProductVariationType[]>>(variations);
  const [variationTemp, setVariationTemp] = useState<string>("");
  const [variationPrice, setVariationPrice] = useState<number>(0);

  function handleAddVariation(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // Check if the variation exists or initialize it as an empty array
      const tempVariation = productVariations[variation_name] || [];

      const newVariation = {
        variation: variationTemp,
        price: variationPrice,
      };

      // Update the state with the new variation added
      setProductVariations((prevVariations) => ({
        ...prevVariations,
        [variation_name]: [...tempVariation, newVariation],
      }));
      handleVariationsInput("product_variations", productVariations);
      setVariationTemp("");
    }
  }

  function handleRemoveVariation(index: number) {
    const newVariations = productVariations[variation_name].filter(
      (color, i) => i !== index
    );
    setProductVariations({
      ...productVariations,
      [variation_name]: newVariations,
    });
    handleVariationsInput("product_variations", productVariations);
  }

  return (
    <div className="gap-1 flex flex-col">
      {/* <span className="block cursor-pointer font-normal text-dark/70 rtl:text-right dark:text-light/70">
        Product {variation_name}
      </span> */}
      <div className="flex flex-wrap gap-2">
        {productVariations[variation_name] &&
          productVariations[variation_name].map((variation, index) => (
            <span className=" flex flex-row gap-1 h-[30px] shrink-0 !rounded-full border py-1.5 px-3.5 text-xs font-medium outline-none border-light-500 bg-light-400 text-dark-100 hover:bg-light-500 dark:border-dark-500 dark:bg-dark-400 dark:text-light-100 hover:dark:bg-dark-500 hover:dark:text-light">
              <span>{variation.variation} |</span>
              <span className="rounded-2xl text-13px font-semibold uppercase text-brand  dark:text-brand-dark">
                {variation.price}
              </span>
              <Button
                variant="icon"
                className="hover:bg-light-900 dark:hover:bg-dark-400 scale-90 hover:scale-110 rounded-full group"
                onClick={() => handleRemoveVariation(index)}
              >
                <XIcon className="w-4 h-4  group-hover:text-white" />
              </Button>
            </span>
          ))}
      </div>
      <div className="flex flex-row gap-16 w-full justify-between">
        {" "}
        <Input
          id="product_variation"
          label={`Add	${variation_name}`}
          className=""
          inputClassName="bg-light dark:bg-dark-300 "
          onChange={(e) => setVariationTemp(e.target.value)}
          onKeyDown={(e) => handleAddVariation(e)}
          value={variationTemp}
          required
          placeholder={placeholder}
        />
        <Input
          id="price_per_variation"
          label={`${variation_name} Price`}
          className=" w-20"
          type="number"
          inputClassName="bg-light dark:bg-dark-300"
          onChange={(e) => setVariationPrice(e.target.valueAsNumber)}
          onKeyDown={(e) => handleAddVariation(e)}
          value={variationPrice}
          required
          placeholder="KES."
        />
      </div>
    </div>
  );
}
