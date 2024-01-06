import { useModalState } from "../modals/modal-controller";
import { Product } from "@/types";
import ProductThumbnailGallery from "./product-thumbnail-gallery";
import ShareItem from "../ui/share-item";
import AddToCart from "./add-to-cart";
import ColorSelector from "../ui/color-selector";
import { useState } from "react";
import SizeSelector from "../ui/size-selector";
import QuantityInput from "../ui/quantityInput";

export default function ProductViewModal() {
  const { data } = useModalState();
  const product = data as Product;
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.id}`;

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleColorSelect(color: any) {
    setSelectedColor(color);
  }

  function handleSizeSelect(size: any) {
    setSelectedSize(size);
  }

  return (
    <div className="flex max-w-full flex-col bg-light text-left dark:bg-dark-250 xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center bg-light-300 py-3 pl-4 pr-16   dark:bg-dark-100 md:py-4 md:pl-6  lg:-mx-4 lg:py-5 xl:pl-8 ">
        <h2 className="truncate px-2.5 py-1 text-base font-medium text-dark dark:text-light md:text-lg lg:pl-4 lg:pr-5  3xl:text-xl">
          {product.product_name}
        </h2>
      </div>
      {/* content */}
      <div className="flex flex-col p-4  md:p-6 lg:flex-row lg:space-x-7 xl:space-x-8 xl:p-8 3xl:space-x-10">
        {/* image gallery */}
        <div className="mb-4 w-full shrink-0 items-center justify-center overflow-hidden md:mb-6 lg:mb-auto  lg:max-w-[480px]">
          <ProductThumbnailGallery gallery={product.image_urls} />
        </div>

        {/* Content */}

        <div className="flex shrink-0 flex-col justify-between text-13px lg:w-[400px] xl:w-[520px] 3xl:w-[555px]">
          <div className="pb-7 xs:pb-8 lg:pb-10">
            {/* product description */}
            <div className="pb-5 leading-[1.9em] text-dark-500 dark:text-light-600 xl:pb-6 3xl:pb-8">
              {product.product_description}
            </div>
            {/* color select */}
            <div className="my-3">
              <ColorSelector
                colors={product.colors}
                handleColorSelect={handleColorSelect}
                selectedColor={selectedColor}
              />
            </div>

            {/* size select */}
            <div className="my-7">
              <SizeSelector
                sizes={product.sizes}
                handleSizeSelect={handleSizeSelect}
                selectedSize={selectedSize}
              />
            </div>

            {/* quantity input */}
            <div className="my-7">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>
            {/* share item */}
            <div className="border-t border-light-500 pt-5 dark:border-dark-500">
              <ShareItem itemUrl={productUrl} />
            </div>
          </div>

          <div className="flex flex-col-reverse items-center xs:flex-row xs:gap-2.5 xs:pb-4 md:flex-nowrap md:gap-3.5 lg:gap-4 3xl:pb-14">
            <AddToCart
              disabled={selectedColor === "" || selectedSize === ""}
								item={product}
								quantity={quantity}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              className="mt-2.5 w-full flex-1 xs:mt-0"
              toastClassName="-mt-10 xs:mt-0 dark:bg-dark-300 dark:text-light-600  "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
