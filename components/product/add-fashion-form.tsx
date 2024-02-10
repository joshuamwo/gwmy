import { FashionProduct, FashionProductInput } from "@/types";
import Input from "../forms/input";
import { DeleteIcon } from "../icons/delete-icon";
import Button from "../ui/button";
import { ImageCourosel, ImageSlide } from "../ui/image-courosel";
import SwitchToggle from "../ui/switch-toggle";
import ProductDescriptionInput from "./product-description-input";
import ProductNameInput from "./product-name-input";
import ProductVariations from "./product-variations";
import Image from "next/image";
import { productVariationTypes } from "@/constants/product";
import { useSupabase, userContext } from "@/context/supabase-context";
import { useRecoilState } from "recoil";
import { myFashionProductsState, myProductsState } from "@/recoil/atoms";
import { useState } from "react";
import resizeImage from "@/lib/resize-image";
import toast from "react-hot-toast";
import ImageArrayInput from "../forms/ImageArrayInput";

interface AddFashionFormProps {
	productType: string,
	productSubType: string,
}

export default function AddFashionForm({productType, productSubType}: AddFashionFormProps) {
  // Supabase
  const { supabase } = useSupabase();
  // global products	state
  const [myFashionProducts, setMyFashionProducts] = useRecoilState(
    myFashionProductsState,
  );
	const user = userContext();
	//
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("owner", user?.id);
    if (error) throw error;
    if (data) {
      const products = data as FashionProduct[];
      setMyFashionProducts(products);
    }
  };

  const productInputDefaults: FashionProductInput = {
    category: "",
    sub_category: "",
    product_name: "",
    price: 0,
    product_variations: {},
    product_description: "",
    image_urls: [],
    is_published: false,
    colors: [],
    sizes: [],
  };

  const [product, setProduct] =
    useState<FashionProductInput>(productInputDefaults);

  //images
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

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
      images ? setImages([...images, ...imageArray]) : setImages(imageArray);
    }
  };

  //image input remove
  const handleImageInputRemove = (index: number) => {
    // remove image from preview
    if (imagePreview.length === 1) {
      setImagePreview([]);
      setImages([]);
      return;
    }
    const newImagePreview = imagePreview.filter((image, i) => i !== index);
    setImagePreview(newImagePreview);
    // remove image from images
    const newImages = images?.filter((image, i) => i !== index);
    setImages(newImages);
  };

  //hanlde input
  function handleInput(id: string, value: any) {
    setProduct((items) => ({
      ...items,
      [id]: value,
    }));
    console.log(product);
    return;
  }

  // upload images
  const uploadImages = async () => {
    // Exit if there are no images to process
    if (images.length < 1) return;

    // This will hold the URLs of the uploaded images
    let imageUrls: string[] = [];

    // Get the current user's session to retrieve the user's ID
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // User's ID is used as part of the file path for better organization of images in storage
    const userId = session?.user?.id;

    // Define the prefix for the file path where images will be stored
    const filePathPrefix = `public/${userId}`;

    // Resize each image to ensure consistency and possibly reduce upload time
    const resizedImagesPromises: Promise<Blob>[] = images.map((image) =>
      resizeImage(image, 795, 480),
    );

    // Wait for all the images to be resized
    const resizedImagesBlobs: Blob[] = await Promise.all(resizedImagesPromises);

    // Convert each resized image blob to a File
    const resizedImages: File[] = resizedImagesBlobs.map((blob, index) => {
      // Generate a unique name for each image using UUID
      const fileName = `resized_${self.crypto.randomUUID()}.png`;
      return new File([blob], fileName, { type: "image/png" });
    });

    // Upload each image to the storage
    const promises = resizedImages.map(async (image) => {
      const filePath = `${filePathPrefix}/${image.name}`;
      const { error, data } = await supabase.storage
        .from("product-images")
        .upload(filePath, image);
      if (error) {
        throw error;
      }
      // Store the URL of the uploaded image for later use
      imageUrls.push(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`,
      );
    });

    // Wait for all the images to be uploaded
    await Promise.all(promises);

    // Update the product with the URLs of the uploaded images
    setProduct({
      ...product,
      image_urls: imageUrls,
    });

    // Return the URLs of the uploaded images
    return imageUrls;
  };
  const handleAddProducts = async (e: React.FormEvent) => {
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
              category: productType,
              sub_category: productSubType,
              product_name: product.product_name,
              product_description: product.product_description,
              price: product.price,
              product_variations: product.product_variations,
              image_urls: imageUrls,
              is_published: product.is_published,
              colors: product.colors,
              sizes: product.sizes,
            },
          ])
          .single();
        if (error) {
          setLoading(false);
          toast.error("Product add failed! Try again later");
        }
        await fetchProducts();
        setLoading(false);
        setSuccess(true);
        setImagePreview([]);
        setImages([]);
        setProduct(productInputDefaults);
        setTimeout(() => setSuccess(false), 3000);
      },
    );
  };

  return (
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

      {productVariationTypes["Fashion"].map((variation) => (
        <div key={variation.type}>
          <ProductVariations
            placeholder={variation.placeholder}
            variation_name={variation.type}
            variations={{
              colors: product.colors,
              sizes: product.sizes,
            }}
            handleInput={handleInput}
          />
        </div>
      ))}

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

      {/* image input & preview */}

      <ImageArrayInput
        images={images}
        setImages={(images) => setImages(images)}
        multiple
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />

      {/* Toggle published */}
      <SwitchToggle
        state={product.is_published}
        setState={(state) => handleInput("is_published", state)}
        label="Publish the product?"
      />

      {/* submit button */}

      <Button
        isLoading={loading}
        type="button"
        className="w-full text-sm tracking-[0.2px]"
        onClick={(e) => handleAddProducts(e)}
        disabled={
          !product.product_name ||
          !product.product_description ||
          !productType ||
          !productSubType ||
          !product.price ||
          !product.colors ||
          !product.sizes ||
          !images ||
          loading
        }
      >
        {loading
          ? "Saving..."
          : success && product.is_published
            ? "Product Published"
            : success && !product.is_published
              ? "Draft Saved"
              : product.is_published
                ? "Publish Product"
                : "Save as Draft"}
      </Button>
    </div>
  );
}
