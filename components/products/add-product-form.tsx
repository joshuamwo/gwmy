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
import SwitchToggle from "../ui/switch-toggle";
import { useRecoilState } from "recoil";
import { productState } from "@/recoil/atoms";
import { Product } from "@/types";

export default function AddProductForm() {
  // Supabase
  const { supabase } = useSupabase();
  // global products	state
  const [products, setProducts] = useRecoilState(productState);
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;
    if (data) {
      const products = data as Product[];
      setProducts(products);
    }
  };

  const [product, setProduct] = useState<ProductInput>(productInputDefaults);
  const product_category = product.category as ProductCategoryType;
  const product_sub_category = product.sub_category as string;
  const [variationAdded, setVariationAdded] = useState<boolean>(false);
  const [colorPriceVariation, setColorPriceVariation] =
    useState<boolean>(false);
  const [sizePriceVariation, setSizePriceVariation] = useState<boolean>(false);

  //images
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[] | null>(null);

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
        window.URL.createObjectURL(file)
      );

      setImagePreview([...imagePreview, ...fileArray]);
      //if images is not null, apped new image file otherwise setImages(files)
      const imageArray = Array.from(files);
      images ? setImages([...images, ...imageArray]) : setImages(imageArray);
    }
  };

  //image input remove
  const handleImageInputRemove = (index: number) => {
    // remove image from preview
    const newImagePreview = imagePreview.filter((image, i) => i !== index);
    setImagePreview(newImagePreview);
    // remove image from images
    const newImages = images?.filter((image, i) => i !== index);
  };

  //hanlde input
  function handleInput(id: string, value: any) {
    // const { id, value } = args;
    const updatedProduct: ProductInput = {
      ...product,
      [id]: value,
      // Other properties you want to update or keep unchanged
    };
    // Now, set the updated product using setProduct
    setProduct(updatedProduct);
  }

  // upload images

  const uploadImages = async () => {
    if (!images) return;
    let imageUrls: string[] = [];
    if (images) {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      const userId = user?.id;
      const promises = images.map(async (image) => {
        const imageName = image.name;
        const filePath = `public/${userId + imageName}`;
        const { error, data } = await supabase.storage
          .from("product-images")
          .upload(filePath, image);
        if (error) {
          throw error;
        }
        imageUrls.push(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`
        );
      });
      setProduct({
        ...product,
        image_urls: imageUrls,
      });
      await Promise.all(promises);
      return imageUrls;
    }
  };

  const handleAddProducts = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setLoading(true);
    uploadImages().then(
      //add product to database
      async (imageUrls) => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        const userId = user?.id;
        const { error } = await supabase
          .from("products")
          .insert([
            {
              category: product.category,
              sub_category: product.sub_category,
              product_name: product.product_name,
              product_description: product.product_description,
              price: product.price,
              product_variations: product.product_variations,
              image_urls: imageUrls,
              is_published: publish,
              is_product_varied: product.is_product_varied,
            },
          ])
          .single();
        if (error) {
          setLoading(false);
          throw error;
        }
        await fetchProducts;
        setLoading(false);
        setSuccess(true);
        setImagePreview([]);
        setImages(null);
      }
    );
  };

  return (
    <form className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12">
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
              <div className="flex flex-row items-center justify-between hover:animate-pulse">
                <span className=" cursor-pointer text-sm flex justify-center font-normal text-dark/70 rtl:text-right dark:text-light/70">
                  Product has different colors or sizes?
                </span>
                <SwitchToggle
                  state={product.is_product_varied}
                  setState={handleInput}
                  stateName="is_product_varied"
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

              {product.is_product_varied &&
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
                ))}
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
                className="w-full my-5"
                type="number"
                inputClassName="bg-light dark:bg-dark-300"
                onChange={(e) => handleInput("price", e.target.valueAsNumber)}
                value={product.price}
                required
                placeholder="KES."
              />

              {/* image preview */}
              {imagePreview.length !== 0 && (
                <div className="w-full !mt-5">
                  <ImageCourosel>
                    {imagePreview.map((image, index) => (
                      <ImageSlide key={index}>
                        {/* delete image */}
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="icon"
                            onClick={() => handleImageInputRemove(index)}
                            className="w-10 h-10 rounded-full bg-dark-300 dark:bg-dark-400 hover:bg-red-500"
                          >
                            <DeleteIcon className="h-5 w-5 text-white opacity-80 hover:opacity-100 hover:animate-pulse hover:scale-125 " />
                          </Button>
                        </div>
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

              {/* Toggle published */}

              <div className="flex flex-row items-center justify-between hover:animate-pulse">
                <span className=" cursor-pointer text-sm flex justify-center font-normal text-dark/70 rtl:text-right dark:text-light/70">
                  Publish the product?
                </span>
                <SwitchToggle
                  state={product.is_published}
                  setState={handleInput}
                  stateName="is_published"
                  className="scale-90"
                />
              </div>
              {/* submit button */}

              <Button
                type="button"
                className="w-full text-sm tracking-[0.2px]"
                onClick={(e) => handleAddProducts(e, true)}
                disabled={
                  !product.product_name ||
                  !product.product_description ||
                  (!product.price && !product.is_product_varied) ||
                  (!variationAdded && product.is_product_varied) ||
                  loading
                }
              >
                {loading ? (
                  <CircularProgress color="success" />
                ) : success && product.is_published ? (
                  "Product Published"
                ) : success && !product.is_published ? (
                  "Draft Saved"
                ) : product.is_published ? (
                  "Publish Product"
                ) : (
                  "Save as Draft"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
