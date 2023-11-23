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
  productImageLinks?: string[];
}

export default function AddProductForm() {
  const { openModal, closeModal } = useModalAction();
  const [product, setProduct] = useState<ProductInput>({
    productName: "",
    price: 0,
    productDescription: "",
    productImageLinks: [],
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
    console.log("image upload");
    //set image preview
    if (e.target.files) {
      const files = e.target.files;
      const fileArray = Array.from(files).map((file) =>
        window.URL.createObjectURL(file)
      );
      console.log(fileArray);
      setImagePreview([...imagePreview, ...fileArray]);
    }
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
              <div className="w-full !mt-5">
                <ImageCourosel>
                  {imagePreview.map((image, index) => (
                    <ImageSlide key={index}>
                      <img
                        src={image}
                        className="object-cover"
                        style={{
                          width: "100%",
                          height: "15rem",
                          objectFit: "cover",
                        }}
                        alt={`image ${index}`}
                      />
                    </ImageSlide>
                  ))}
                </ImageCourosel>
              </div>
            )}

            <Button
              className="w-full text-sm  tracking-[0.2px]"
              variant="outline"
            >
              <label htmlFor="product-images-upload" className="w-full ">
                {imagePreview.length == 0 ? "Upload Images" : "Add Images"}
                <input
                  type="file"
                  id="product-images-upload"
                  className="w-full opacity-0 "
                  onChange={handleImageUpload}
                  multiple
                  hidden
                  accept="image/*"
                />
              </label>
            </Button>

            <Button
              type="submit"
              className="w-full text-sm tracking-[0.2px]"
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
