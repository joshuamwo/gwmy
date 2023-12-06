import Input from "../forms/input";
import Button from "../ui/button";
import { useState } from "react";
import { FormBgPattern } from "../auth/form-bg-pattern";
import { useSupabase } from "@/context/supabase-context";
import { ImageCourosel, ImageSlide } from "../ui/image-courosel";
import "@splidejs/react-splide/css";
import { DeleteIcon } from "../icons/delete-icon";
import { CircularProgress, LinearProgress } from "@mui/material";
import { useModalState } from "../modals/modal-controller";
import { Product } from "@/types";
import AutocompleteDropdown from "../ui/autocomplete-dropdown";

export default function AddProductForm() {
  // get product from	modal state
  const { data } = useModalState();
  const productData = data as Product;
  const [product, setProduct] = useState<Product>(productData);
  const [imagePreview, setImagePreview] = useState<string[]>(
    product.image_urls
  );
  const [images, setImages] = useState<File[] | null>(null);
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (success) setSuccess(false);
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  // Supabase
  const { supabase } = useSupabase();

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
      await Promise.all(promises);
      // setProduct({
      //   ...product,
      //   productImageLinks: imageUrls,
      // });
    }
  };

  const handleAddProducts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    uploadImages().then(
      //add product to database
      async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        const userId = user?.id;
        const { data, error } = await supabase
          .from("products")
          .insert([
            {
              product_name: product.product_name,
              product_description: product.product_description,
              price: product.price,
              image_urls: product.image_urls,
              owner: product.owner,
            },
          ])
          .single();
        if (error) {
          setLoading(false);
          throw error;
        }
        setLoading(false);
        setSuccess(true);
        setImagePreview([]);
        setImages(null);
        // setProduct({
        //   product_name: "",
        //   price: 0,
        //   product_description: "",
        // 	image_urls: [""],
        // 		{... product}
        // });
      }
    );
  };

  // Autocomplete Dropdown items
  const categories = ["Luku", "Music", "Event"];
  const subCategories = {
    Luku: ["Tops", "Hats", "Pants"],
    Music: ["Single", "Album"],
    Event: ["Concert", "Confrence"],
  };
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="flex max-w-full flex-col bg-light text-left dark:bg-dark-250 xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <form
        onSubmit={(e) => handleAddProducts(e)}
        className="bg-light px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12"
      >
        <FormBgPattern className="hidden xs:flex absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" />
        <div className="relative z-10 flex items-center">
          <div className="w-full shrink-0 text-left md:w-[380px]">
            <div className="flex flex-col pb-5 text-center lg:pb-9 xl:pb-10 xl:pt-2">
              <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
                Edit Product
              </h2>
            </div>
            <div className="space-y-4 lg:space-y-5 flex flex-col items-center">
              <div className="flex flex-row w-full justify-between">
                {" "}
                <Input
                  id="product_name"
                  label="Product Name"
                  className="mr-4"
                  inputClassName="bg-light dark:bg-dark-300 "
                  onChange={(e) => onInputChange(e)}
                  required
                  placeholder="Product Name"
                  value={product.product_name}
                />
                <Input
                  id="price"
                  label="Price"
                  className="ml-4 w-20"
                  type="number"
                  inputClassName="bg-light dark:bg-dark-300"
                  onChange={(e) => onInputChange(e)}
                  required
                  placeholder="Ksh."
                  value={product.price}
                />
              </div>
              <Input
                id="product_escription"
                className="w-full "
                label="Product Desctiption"
                inputClassName="bg-light dark:bg-dark-300 w-full !mb-5"
                type="text"
                onChange={(e) => onInputChange(e)}
                required
                placeholder="Write Product Description"
                value={product.product_description}
              />

              <div className="flex flex-row w-full gap-4 justify-between h-32">
                <AutocompleteDropdown
                  options={categories}
                  selectedOption={selectedCategory}
                  setSelectedOption={setSelectedCategory}
                  label="Category"
                />
                <AutocompleteDropdown
                  options={categories}
                  selectedOption={selectedCategory}
                  setSelectedOption={setSelectedCategory}
                  label="Sub Category"
                />
              </div>
              {/* Image Preview */}

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
                          >
                            <DeleteIcon className="h-5 w-5 fill-white opacity-50 hover:opacity-100 hover:animate-pulse hover:scale-125 hover:fill-red-500" />
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

              <Button
                type="submit"
                className="w-full text-sm tracking-[0.2px]"
                onClick={(e) => handleAddProducts(e)}
                disabled={
                  !product.product_name ||
                  !product.product_description ||
                  !product.price ||
                  loading
                }
              >
                {loading ? (
                  <CircularProgress color="success" />
                ) : success ? (
                  "Product Added. Add Another? "
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
