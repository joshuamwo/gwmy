"use client";
import { useState } from "react";
import { ProductInput, Product } from "@/types";
import { XIcon } from "../ui/x-icon";
import Button from "../ui/button";
import Input from "../forms/input";
import { ProductVariationType } from "@/types";

interface Props {
  variation_name: string;
  placeholder: string;
  handleInput: any;
  variations: Record<string, any[]>;
}

export default function ProductVariations({
  variation_name,
  placeholder,
  handleInput,
  variations,
}: Props) {
  //handle product colors add	and remove
  const [variationTemp, setVariationTemp] = useState<string>("");

  function handleAddVariation(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleInput(variation_name, [
        ...variations[variation_name],
        variationTemp,
      ]);
      setVariationTemp("");
    }
  }

  function handleRemoveVariation(index: number) {
    const newVariations = variations[variation_name].filter(
      (item, i) => i !== index
    );
    handleInput(variation_name, newVariations);
  }

  return (
    <div className="gap-1 flex flex-col">
      {/* <span className="block cursor-pointer font-normal text-dark/70 rtl:text-right dark:text-light/70">
        Product {variation_name}
      </span> */}
      <div className="flex flex-wrap gap-2">
        {variations[variation_name] &&
          variations[variation_name].map((variation, index) => (
            <span
              key={index}
              className=" flex flex-row gap-1 h-[30px] shrink-0 !rounded-full border py-1.5 px-3.5 text-xs font-medium outline-none border-light-500 bg-light-400 text-dark-100 hover:bg-light-500 dark:border-dark-500 dark:bg-dark-400 dark:text-light-100 hover:dark:bg-dark-500 hover:dark:text-light"
            >
              <span>{variation}</span>
              {/* <span className="rounded-2xl text-13px font-semibold uppercase text-brand  dark:text-brand-dark">
                {variation.price}
              </span> */}
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
      <div className="flex w-full">
        {" "}
        <Input
          id="product_variation"
          label={`Add	${variation_name} & Press ENTER`}
          className="w-full"
          inputClassName="bg-light dark:bg-dark-300 "
          onChange={(e) => setVariationTemp(e.target.value)}
          onKeyDown={(e) => handleAddVariation(e)}
          value={variationTemp}
          required
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
