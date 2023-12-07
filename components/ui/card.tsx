import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { classnames } from "@/utils/classnames";
import { DetailsIcon } from "./details-icon";
import { PreviewIcon } from "./preview-icon";
import { EditIcon } from "./edit-icon";
import { useModalAction } from "../modals/modal-controller";
import { DeleteIcon } from "../icons/delete-icon";

interface CardProps {
  product: Product;
  isMyProductsPage?: boolean;
}

export default function Card({ product, isMyProductsPage }: CardProps) {
  const src = product.image_urls[0]
    ? product.image_urls[0]
    : "/images/product-image-placeholder.jpeg";

  const [isGridCompact, setIsGridCompact] = useState(false);
  const { openModal, closeModal } = useModalAction();
  const modalName1 = "EDITPRODUCTFORM";
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
        {/* overlay */}
        <div
          // onClick={() => openModal("PRODUCT_DETAILS", { slug })}
          className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center gap-9 bg-dark/60 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100 dark:bg-dark/70"
        >
          <button
            className={classnames(
              "text-center font-medium text-light",
              isGridCompact ? "text-xs" : "text-13px"
            )}
            onClick={() => openModal(modalName1, product)}
          >
            <div
              className={classnames(
                "mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand",
                isGridCompact ? "h-11 w-11" : "h-[50px] w-[50px]"
              )}
            >
              {isMyProductsPage ? (
                <EditIcon
                  className={classnames(isGridCompact ? "h-5 w-5" : "h-6 w-6")}
                />
              ) : (
                <PreviewIcon
                  className={classnames(isGridCompact ? "h-5 w-5" : "h-6 w-6")}
                />
              )}
            </div>
            {isMyProductsPage ? "Edit" : "Preview"}
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
                className={classnames(
                  "fill-white",
                  isGridCompact ? "h-4 w-4" : "h-5 w-5"
                )}
              />
            </div>
            {isMyProductsPage ? "Preview" : "Details"}
          </button>
          {isMyProductsPage && (
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
                <DeleteIcon
                  className={classnames(
                    "",
                    isGridCompact ? "h-4 w-4" : "h-5 w-5"
                  )}
                />
              </div>
              Delete
            </button>
          )}
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
