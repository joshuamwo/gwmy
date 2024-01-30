import { useModalAction } from "../modals/modal-controller";
import { ProductType, RegisterInput } from "@/types";
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

import ProductCategorySelector from "./product-category-selector";
import {
  productInputDefaults,
  productVariationTypes,
} from "@/constants/product";
import ProductNameInput from "./product-name-input";
import ProductDescriptionInput from "./product-description-input";
import ProductVariations from "./product-variations";
import SwitchToggle from "../ui/switch-toggle";
import { useRecoilState, useRecoilValue } from "recoil";
import { myProductsState, productsState } from "@/recoil/atoms";
import { Product } from "@/types";
import { useModalState } from "../modals/modal-controller";
import { randomUUID } from "crypto";

export default function AddProductForm() {
  // Supabase
  const { supabase } = useSupabase();
  // global products	state
  const [products, setProducts] = useRecoilState(myProductsState);

  const { data } = useModalState();
  const productData = data as Product;
  const [product, setProduct] = useState<Product>(productData);
  const product_category = product.category as ProductType;
  const product_sub_category = product.sub_category as string;
  const [variationAdded, setVariationAdded] = useState<boolean>(
    product.is_product_varied,
  );
  const [colorPriceVariation, setColorPriceVariation] =
    useState<boolean>(false);
  const [sizePriceVariation, setSizePriceVariation] = useState<boolean>(false);

  //images
  const [imagePreview, setImagePreview] = useState<string[]>(
    product.image_urls,
  );
  const [images, setImages] = useState<File[]>([]);
  const [imagesToBeDeleted, setImagesToBeDeleted] = useState<string[]>([]);

  //
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Image input and preview set
  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    //set image preview
    if (e.target.files) {
      const files = e.target.files;
      const fileArray = Array.from(files).map((file) =>
        window.URL.createObjectURL(file),
      );

      setImagePreview([...imagePreview, ...fileArray]);
      //if images is not null, apped new image file otherwise setImages(files)
      const imageArray = Array.from(files);
      images.length > 0
        ? setImages([...images, ...imageArray])
        : setImages(imageArray);
    }
  };

  //image input remove
  const handleImageInputRemove = (image: string, index: number) => {
    if (image.includes("https://")) {
      const newImageUrls = product.image_urls.filter(
        (imageUrl, i) => imageUrl !== image,
      );
      handleInput("image_urls", newImageUrls);
      console.log(product.image_urls);
      setImagesToBeDeleted([...imagesToBeDeleted, image]);
      // remove image from preview
      const newImagePreview = imagePreview.filter((image, i) => i !== index);
      setImagePreview(newImagePreview);
      return;
    }
    // remove image from preview
    const newImagePreview = imagePreview.filter((image, i) => i !== index);
    setImagePreview(newImagePreview);
    // remove image from images
    const newImages = images?.filter((image, i) => i !== index);
    setImages(newImages);
  };

  //hanlde input
  function handleInput(id: string, value: any) {
    // const { id, value } = args;
    const updatedProduct: Product = {
      ...product,
      [id]: value,
    };
    setProduct(updatedProduct);
  }

  //update products state
  const updateProductsState = async () => {
    const updatedProductState: Product[] = products.map((item) => {
      if (item.id === product.id) {
        // Return updated product if the IDs match
        return product;
      } else {
        // Return the original product if no match
        return item;
      }
    });
    setProducts(updatedProductState);
  };
  // upload images

  const uploadImages = async () => {
    if (images.length < 1) return [...product.image_urls];
    let imageUrls: string[] = [...product.image_urls];
    const randomUUID = self.crypto.randomUUID();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
    const userId = user?.id;
    const promises = images.map(async (image) => {
      const filePath = `public/${userId + randomUUID}`;
      const { error, data } = await supabase.storage
        .from("product-images")
        .upload(filePath, image);
      if (error) {
        throw error;
      }
      if (data) {
        imageUrls.push(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`,
        );
      }
    });
    await Promise.all(promises);
    return imageUrls;
  };

  const deleteImagesFromSupabase = async () => {
    console.log(imagesToBeDeleted);

    if (imagesToBeDeleted.length < 1) return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
    const userId = user?.id;
    let fileNames: string[] = [];
    imagesToBeDeleted.map(async (imageUrl) => {
      const parts = imageUrl.split("/");
      const fileName = `public/${parts[parts.length - 1]}`;
      fileNames.push(fileName);
    });
    const { error } = await supabase.storage
      .from("product-images")
      .remove(fileNames);
    if (error) throw error;
    return;
  };

  const handleUpdateProducts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!product.is_product_varied) {
      handleInput("product_variations", {});
    }
    deleteImagesFromSupabase().then(async () =>
      uploadImages().then(
        //add product to database
        async (imageUrls) => {
          const { error } = await supabase
            .from("products")
            .update({
              category: product.category,
              sub_category: product.sub_category,
              product_name: product.product_name,
              product_description: product.product_description,
              price: product.price,
              product_variations: product.product_variations,
              image_urls: imageUrls,
              is_published: product.is_published,
              is_product_varied: product.is_product_varied,
            })
            .eq("id", product.id);
          if (error) {
            setLoading(false);
            throw error;
          }
          handleInput("image_urls", imageUrls);
          updateProductsState().then(() => {
            setLoading(false);
            setSuccess(true);
            setImages([]);
          });
        },
      ),
    );
  };

  return (
    <form className="bg-light px-6 pb-8 pt-10 dark:bg-dark-300 sm:px-8 lg:p-12">
      <FormBgPattern className="absolute bottom-0 left-0 hidden text-light dark:text-dark-300 dark:opacity-60 xs:flex" />
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              Edit Product
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

          {product_category === "Fashion" && (
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
              <span className=" flex cursor-pointer justify-center pb-2.5 font-normal text-dark/70 rtl:text-right dark:text-light/70">
                Pricing and Variations
              </span>
              <div className="flex flex-row items-center justify-between hover:animate-pulse">
                <span className=" flex cursor-pointer justify-center text-sm font-normal text-dark/70 rtl:text-right dark:text-light/70">
                  Product has different colors or sizes?
                </span>
                <SwitchToggle
                  state={product.is_product_varied}
                  setState={(value) => handleInput("is_product_varied", value)}
                  className="scale-90"
                />
              </div>
              {/* <div className="flex flex-row items-center justify-between hover:animate-pulse">
                <span className=" cursor-pointer text-sm flex justify-center font-normal text-dark/70 rtl:text-right dark:text-light/70">
                  Sizes are priced differently?
                </span>
                <SwitchToggle
                  state={sizePriceVariation}
                  setState={(id, state) => setSizePriceVariation(state)}
                  stateName="sizePriceVariation"
                  className="scale-90"
                />
              </div> */}

              {/* {product.is_product_varied &&
                productVariationTypes[product_category].map((variation) => (
                  <div key={variation.type}>
                    <ProductVariations
                      placeholder={variation.placeholder}
                      handleVariationsInput={handleInput}
                      variation_name={variation.type}
                      variations={product.product_variations}
                      setVariationAdded={setVariationAdded}
                    />
                  </div>
                ))} */}
              {/* {product.is_product_varied &&
                sizePriceVariation &&
                productVariationTypes[product_category].map((variation) => (
                  <div>
                    <ProductVariations
                      key={variation.type}
                      placeholder={variation.placeholder}
                      handleVariationsInput={handleInput}
                      variation_name={variation.type}
                      variations={product.product_variations}
                      product={product}
                      setProduct={setProduct}
                      setVariationAdded={setVariationAdded}
                    />
                  </div>
                ))} */}

              <Input
                id="price_per_variation"
                label="Price"
                className="my-5 w-full"
                type="number"
                inputClassName="bg-light dark:bg-dark-300"
                onChange={(e) => handleInput("price", e.target.valueAsNumber)}
                value={product.price}
                required
                placeholder="KES."
              />

              {/* image preview */}
              {imagePreview.length !== 0 && (
                <div className="!mt-5 w-full">
                  <ImageCourosel>
                    {imagePreview.map((image, index) => (
                      <ImageSlide key={index}>
                        {/* delete image */}
                        <div className="absolute right-2 top-2">
                          <Button
                            variant="icon"
                            onClick={() => handleImageInputRemove(image, index)}
                            className="h-10 w-10 rounded-full bg-dark-300 hover:bg-red-500 dark:bg-dark-400"
                          >
                            <DeleteIcon className="h-5 w-5 text-white opacity-80 hover:scale-125 hover:animate-pulse hover:opacity-100 " />
                          </Button>
                        </div>
                        <Image
                          src={image}
                          className="rounded object-cover"
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
              {/* Add images */}
              <Button
                type="button"
                className="w-full text-sm  tracking-[0.2px]"
                variant="outline"
              >
                <label htmlFor="product-images-upload" className="w-full ">
                  {imagePreview.length == 0 ? "Upload Images" : "Add Images"}
                  <input
                    type="file"
                    id="product-images-upload"
                    className="w-full opacity-0 "
                    onChange={(e) => handleImageInput(e)}
                    multiple
                    hidden
                    accept="image/*"
                  />
                </label>
              </Button>
              {/* submit button */}
              {/* Toggle published */}

              <div className="flex flex-row items-center justify-between hover:animate-pulse">
                <span className=" flex cursor-pointer justify-center text-sm font-normal text-dark/70 rtl:text-right dark:text-light/70">
                  Product is published?
                </span>
                <SwitchToggle
                  state={product.image_urls[0] ? product.is_published : false}
                  setState={(value) => handleInput("is_published", value)}
                  className="scale-90"
                  disabled={product.image_urls[0] ? false : true}
                />
              </div>
              <Button
                isLoading={loading}
                type="button"
                className="w-full text-sm tracking-[0.2px]"
                onClick={(e) => handleUpdateProducts(e)}
                disabled={
                  !product.product_name ||
                  !product.product_description ||
                  (!product.price && !product.is_product_varied) ||
                  (!variationAdded && product.is_product_varied) ||
                  loading
                }
              >
                {loading ? "" : success ? "Product Updated" : "Update Product"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
