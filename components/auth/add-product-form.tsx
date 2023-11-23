import { useModalAction } from "../modals/modal-controller";
import { RegisterInput } from "@/types";
import Input from "../forms/input";
import Button from "../ui/button";
import Password from "../forms/password";
import { FormEvent, useEffect, useState } from "react";
import { FormBgPattern } from "./form-bg-pattern";
import { useSupabase } from "@/context/supabase-context";
import Image from "next/image";
import { ImageCourosel, ImageSlide } from "../ui/image-courosel";
import "@splidejs/react-splide/css";

interface ProductInput {
  productName: string;
  price: number;
  productDescription: string;
  productImages?: string[];
}

export default function AddProductForm() {
  const { openModal, closeModal } = useModalAction();
  const [product, setProduct] = useState<ProductInput>({
    productName: "",
    price: 0,
    productDescription: "",
    productImages: [],
  });
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  // Supabase
  const { supabase } = useSupabase();

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //set image preview
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview((prevImages) => prevImages.concat(fileArray));
    }
    console.log(files);
    console.log(imagePreview);
  };

  return (
    <div className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12">
      <FormBgPattern className="hidden xs:flex absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              Add Product
            </h2>
          </div>
          <div className="space-y-4 lg:space-y-5 flex flex-col items-center">
            <div className="flex flex-row w-full justify-between">
              {" "}
              <Input
                id="productName"
                label="Product Name"
                className="mr-4"
                inputClassName="bg-light dark:bg-dark-300 "
                onChange={onInputChange}
              />
              <Input
                id="price"
                label="Price Ksh."
                className="ml-4 w-20"
                type="number"
                inputClassName="bg-light dark:bg-dark-300"
                onChange={onInputChange}
              />
            </div>
            <Input
              id="productDescription"
              className="w-full h-36"
              label="Product Desctiption"
              inputClassName="bg-light dark:bg-dark-300 w-full h-32"
              type="textarea"
              onChange={onInputChange}
            />

            {/* Image Preview */}

            {imagePreview.length !== 0 && (
              <div className="w-full h-40 relative !my-10">
                <ImageCourosel>
                  {imagePreview.map((image, index) => (
                    <ImageSlide key={index}>
                      <img
                        src={image}
                        className="object-cover"
                        alt={`image ${index}`}
                      />
                    </ImageSlide>
                  ))}
                </ImageCourosel>
              </div>
            )}

            <Button
              className="mt-2 w-full text-sm tracking-[0.2px] lg:!my-7"
              variant="outline"
            >
              <label htmlFor="product-images-upload" className="w-full h-full">
                {imagePreview.length == 0 ? "Upload Images" : "Add Images"}
                <Input
                  label="Product Images"
                  type="file"
                  id="product-images-upload"
                  className="w-full h-full opacity-0 "
                  onChange={handleImageUpload}
                  multiple
                />
              </label>
            </Button>

            <Button
              type="submit"
              className="!my-5 w-full text-sm tracking-[0.2px] lg:!my-7"
              onClick={() => window.alert("Product added successfully")}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
