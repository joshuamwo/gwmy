import { useModalState } from "../modals/modal-controller";
import { Product } from "@/types";
import ProductThumbnailGallery from "./product-thumbnail-gallery";

export default function ProductViewModal() {
  const { data } = useModalState();
  const product = data as Product;

  return (
    <div className="flex max-w-full flex-col bg-light text-left dark:bg-dark-250 xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center bg-light-300 py-3 pl-4 pr-16   dark:bg-dark-100 md:py-4 md:pl-6  lg:-mx-4 lg:py-5 xl:pl-8 ">
        <h2 className="truncate px-2.5 py-1 text-base font-medium text-dark dark:text-light md:text-lg lg:pl-4 lg:pr-5  3xl:text-xl">
          {/* {product.product_name} */}
          Product Preview Modal
        </h2>
      </div>

      {/* content */}
      <div className="flex flex-col p-4  md:p-6 lg:flex-row lg:space-x-7 xl:space-x-8 xl:p-8 3xl:space-x-10">
        {/* image */}
        <div className="mb-4 w-full shrink-0 items-center justify-center overflow-hidden md:mb-6 lg:mb-auto lg:max-w-[480px] xl:flex xl:max-w-[570px] 2xl:max-w-[650px] 3xl:max-w-[795px]">
          <ProductThumbnailGallery gallery={product.image_urls} />
        </div>
      </div>
    </div>
  );
}
