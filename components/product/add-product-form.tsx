import { ProductType } from "@/types";
import { useState } from "react";
import { FormBgPattern } from "../auth/form-bg-pattern";
import "@splidejs/react-splide/css";
import AddFashionForm from "./add-fashion-form";
import ProductTypeSelector from "./product-type-selector";
import AddMusicForm from "./add-music-form";

interface addProductFormProps {
  data: {
    productType: ProductType;
    productSubType: string;
    album?: {
      name: string;
      id: string;
    };
    action?: {
      onSuccess?: () => any;
      onFailure?: () => any;
    };
  };
}

export default function AddProductForm({ data }: addProductFormProps) {
  //modal state
  const [productType, setProductType] = useState(data.productType);
  const [productSubType, setProductSubType] = useState(data.productSubType);

  return (
    <div className="bg-light px-6 pb-8 pt-10 dark:bg-dark-300 sm:px-8 lg:p-12">
      <FormBgPattern className="absolute bottom-0 left-0 hidden text-light dark:text-dark-300 dark:opacity-60 xs:flex" />
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              {data.album
                ? "Add Track To Album"
                : productSubType === "Track"
                  ? "Add Single Track"
                  : productSubType === "Album"
                    ? "Add Album"
                    : `Add ${productType} Product`}
            </h2>
          </div>
          {!data.album && (
            <div>
              <ProductTypeSelector
                productType={productType}
                handleTypeChange={setProductType}
                productSubType={productSubType}
                handleSubTypeChange={setProductSubType}
              />
            </div>
          )}

          {/* input forms per product type */}

          {productType === "Fashion" && <AddFashionForm />}
          {productType === "Music" && (
            <AddMusicForm
              type={productSubType}
              album={data.album}
              action={data.action}
            />
          )}
        </div>
      </div>
    </div>
  );
}
