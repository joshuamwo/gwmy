import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { classnames } from "@/utils/classnames";
import { DetailsIcon } from "./details-icon";
import { PreviewIcon } from "./preview-icon";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  product.image_urls[0] && console.log(product.image_urls[0]);
  const src = product.image_urls[0]
    ? product.image_urls[0]
    : "/images/product-image-placeholder.jpeg";

  const [isGridCompact, setIsGridCompact] = useState(false);
  return (
    <div>
      <div className="group relative flex aspect-[3/2] w-full ">
        {/* <pre>{JSON.stringify(product.image_urls, null, 4)}</pre> */}
        <Image
          alt={product.product_name}
          src={src}
          fill
          quality={100}
          className="bg-light-500 object-cover dark:bg-dark-400"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        //overlay
        <div
          // onClick={() => openModal("PRODUCT_DETAILS", { slug })}
          className="absolute top-0 left-0 z-10 flex h-full w-full cursor-pointer items-center justify-center gap-9 bg-dark/60 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100 dark:bg-dark/70"
        >
          <button
            className={classnames(
              "text-center font-medium text-light",
              isGridCompact ? "text-xs" : "text-13px"
            )}
          >
            <div
              className={classnames(
                "mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand",
                isGridCompact ? "h-11 w-11" : "h-[50px] w-[50px]"
              )}
            >
              <PreviewIcon
                className={classnames(isGridCompact ? "h-4 w-4" : "h-5 w-5")}
              />
            </div>
            Preview
          </button>
          <button
            // onClick={goToDetailsPage}
            className={classnames(
              "relative z-[11] text-center font-medium text-light",
              isGridCompact ? "text-xs" : "text-13px"
            )}
          >
            <div
              className={classnames(
                "mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand",
                isGridCompact ? "h-11 w-11" : "h-[50px] w-[50px]"
              )}
            >
              <DetailsIcon
                className={classnames(isGridCompact ? "h-4 w-4" : "h-5 w-5")}
              />
            </div>
            Details
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between pt-3.5">
        <div className="-mt-[1px] flex flex-col truncate ltr:mr-auto ltr:pl-2.5 rtl:ml-auto rtl:pr-2.5 rtl:text-right">
          <h3 className="mb-0.5 truncate font-medium text-dark-100 dark:text-light">
            {product.product_name}
          </h3>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end pl-2.5">
          <span className="rounded-2xl bg-light-500 px-1.5 py-0.5 text-13px font-semibold uppercase text-brand dark:bg-dark-300 dark:text-brand-dark">
            Ksh. {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
