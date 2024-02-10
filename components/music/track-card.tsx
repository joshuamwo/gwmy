import { SingleTrack } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { classnames } from "@/utils/classnames";
import { DetailsIcon } from "../ui/details-icon";
import { PreviewIcon } from "../ui/preview-icon";
import { EditIcon } from "../ui/edit-icon";
import { useModalAction } from "../modals/modal-controller";
import { DeleteIcon } from "../icons/delete-icon";
import Link from "next/link";
import placeholder from "@/public/images/placeholders/product.svg";
import { ShoppingBagIcon } from "../ui/shopping-bag-icon";
import { PlusIcon } from "../icons/plus-icon";

interface CardProps {
  track: SingleTrack;
  isMyMusicPage?: boolean;
}

export default function TrackCard({ track, isMyMusicPage }: CardProps) {
  const src = track.cover ? track.cover : placeholder;

  const [isGridCompact, setIsGridCompact] = useState(false);
  const { openModal, closeModal } = useModalAction();
  const modalName1 = "EDITPRODUCTFORM";
  const modalName2 = "PRODUCTVIEWMODAL";
  return (
    <div className="rounded  p-2  md:p-4">
      <div className="group relative flex aspect-square w-full  ">
        {/* <pre>{JSON.stringify(product.image_urls, null, 4)}</pre> */}

        <Image
          alt={track.name}
          src={src}
          fill
          priority={true}
          quality={100}
          className="aspect-square rounded-md bg-light-500 object-cover shadow-lg dark:bg-dark-400 "
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        {/* overlay */}
        {/* <div
          className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center gap-9 rounded bg-light/70 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100 dark:bg-dark/70"
          onClick={() => !isMyMusicPage && openModal(modalName2, album)}
        >
          <button
            className={classnames(
              "text-center text-xs font-medium text-light md:text-[13] ",
              isGridCompact ? "text-xs" : "text-13px",
            )}
            onClick={() =>
              isMyMusicPage
                ? openModal(modalName1, album)
                : openModal(modalName2, album)
            }
          >
            <div
              className={classnames(
                "mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand",
                isGridCompact ? "h-11 w-11" : "h-[50px] w-[50px]",
              )}
            >
              {isMyMusicPage ? (
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
            {isMyMusicPage ? "Edit" : "Preview"}
          </button>

          {isMyMusicPage && (
            <button
              onClick={() => openModal(modalName2, album)}
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
                {isMyMusicPage ? (
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
              {isMyMusicPage ? "Preview" : "Details"}
            </button>
          )}
          {isMyMusicPage && (
            <button
              onClick={() => openModal("DELETEPRODUCTFORM", isMyMusicPage)}
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
        </div> */}
      </div>
      <div className="flex flex-col px-1 pt-2 ">
        <div className="group -mt-[1px] mr-auto cursor-pointer truncate">
          <Link
            href={
              isMyMusicPage ? `/admin/my-music/track/${track.id}` : "/music"
            }
            className="flex flex-col"
          >
            <span className="mb-0.5 truncate text-xs font-medium group-hover:text-brand">
              {track.name}
            </span>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="truncate text-xs   text-dark-400 group-hover:text-brand dark:text-light-800">
            {track.artist}
          </span>
        </div>
        <div className="mt-1 flex w-full justify-end">
          <span className="flex w-full items-center justify-center gap-2 rounded-2xl bg-light-400 px-1.5 py-1  text-[11px] font-semibold uppercase text-brand shadow-inner dark:bg-dark-400 dark:text-brand-dark">
            {!isMyMusicPage && (
              <PlusIcon className="h-4 w-4 rounded-full border border-brand fill-brand p-0.5" />
            )}{" "}
            Ksh.
            {track.price}
          </span>
        </div>
      </div>
    </div>
  );
}
