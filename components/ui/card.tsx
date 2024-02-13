import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { classnames } from "@/utils/classnames";
import { DetailsIcon } from "./details-icon";
import { PreviewIcon } from "./preview-icon";
import { EditIcon } from "./edit-icon";
import { useModalAction } from "../modals/modal-controller";
import { DeleteIcon } from "../icons/delete-icon";
import Link from "next/link";
import placeholder from "@/public/images/placeholders/product.svg";

interface CardProps {
  product: Product;
  isMyProductsPage?: boolean;
}

export default function Card({ product, isMyProductsPage }: CardProps) {
  const src =
    product.image_urls && product.image_urls[0]
      ? product.image_urls[0]
      : placeholder;
  // const src = "/images/product-image-placeholder.jpeg";

  const [isGridCompact, setIsGridCompact] = useState(false);
  const { openModal, closeModal } = useModalAction();
  const modalName1 = "EDITPRODUCTFORM";
  const modalName2 = "PRODUCTVIEWMODAL";
  return (
    <div className="rounded bg-light-200 p-2 shadow-lg dark:bg-dark-300 md:p-4">
      <div className="group relative flex aspect-[4/5] w-full  ">
        {/* <pre>{JSON.stringify(product.image_urls, null, 4)}</pre> */}

        <Image
          alt={product.product_name}
          src={src}
          fill
          priority={true}
          quality={100}
          className="rounded bg-light-500 object-cover dark:bg-dark-400 "
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        {/* overlay */}
        <div
          className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center gap-9 rounded bg-light/70 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100 dark:bg-dark/70"
          onClick={() => !isMyProductsPage && openModal(modalName2, product)}
        >
          <button
            className={classnames(
              "text-center text-xs font-medium text-light md:text-[13] ",
              isGridCompact ? "text-xs" : "text-13px",
            )}
            onClick={() =>
              isMyProductsPage
                ? openModal(modalName1, product)
                : openModal(modalName2, product)
            }
          >
            <div
              className={classnames(
                "mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand",
                isGridCompact ? "h-11 w-11" : "h-[50px] w-[50px]",
              )}
            >
              {isMyProductsPage ? (
                <EditIcon
                  className={classnames(
                    isGridCompact ? "h-4 w-4 md:h-5 md:w-5 " : "h-6 w-6",
                  )}
                />
              ) : (
                <PreviewIcon
                  className={classnames(isGridCompact ? "h-5 w-5" : "h-6 w-6")}
                />
              )}
            </div>
            {isMyProductsPage ? "Edit" : "Preview"}
          </button>

          {isMyProductsPage && (
            <button
              onClick={() => openModal(modalName2, product)}
              className={classnames(
                "relative z-[11] text-center font-medium text-light",
                isGridCompact ? "text-xs" : "text-13px",
              )}
            >
              <div
                className={classnames(
                  "mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand",
                  isGridCompact ? "h-11 w-11" : "h-[50px] w-[50px]",
                )}
              >
                {isMyProductsPage ? (
                  <PreviewIcon
                    className={classnames(
                      isGridCompact ? "h-5 w-5" : "h-6 w-6",
                    )}
                  />
                ) : (
                  <DetailsIcon
                    className={classnames(
                      "fill-white",
                      isGridCompact ? "h-4 w-4" : "h-5 w-5",
                    )}
                  />
                )}
              </div>
              {isMyProductsPage ? "Preview" : "Details"}
            </button>
          )}
          {isMyProductsPage && (
            <button
              onClick={() => openModal("DELETEPRODUCTFORM", product)}
              className={classnames(
                "relative z-[11] text-center font-medium text-light",
                isGridCompact ? "text-xs" : "text-13px",
              )}
            >
              <div
                className={classnames(
                  "mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand",
                  isGridCompact ? "h-11 w-11" : "h-[50px] w-[50px]",
                )}
              >
                <DeleteIcon
                  className={classnames(
                    "",
                    isGridCompact ? "h-4 w-4" : "h-5 w-5",
                  )}
                />
              </div>
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between px-1 pt-3.5 ">
        <div className="group -mt-[1px] mr-auto cursor-pointer truncate">
          <Link href={`/product/${product.id}`} className="flex flex-col ">
            <span className="mb-0.5 truncate font-medium group-hover:text-brand">
              {product.product_name}
            </span>
            <span className="text-xs group-hover:text-brand">
              {product.product_description}
            </span>
          </Link>
        </div>
        <div className="mr-0.5 flex flex-shrink-0 flex-col items-end pl-2.5">
          <span className="rounded-2xl bg-light-400 px-1.5 py-0.5 text-13px font-semibold uppercase text-brand shadow-inner dark:bg-dark-300 dark:text-brand-dark">
            Ksh. {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
