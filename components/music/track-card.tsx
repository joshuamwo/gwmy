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
    <div className="rounded-md p-2 shadow-md dark:bg-dark-250 dark:hover:bg-dark-300  md:p-4">
      <Link
        href={isMyMusicPage ? `/admin/my-music/track/${track.id}` : "/music"}
      >
        <div className="group relative flex aspect-square  min-w-[150px]">
          <Image
            alt={track.name}
            src={src}
            fill
            priority={true}
            quality={100}
            className="aspect-square rounded-full bg-light-500 object-cover shadow-lg dark:bg-dark-400 "
          />
        </div>
        <div className="flex flex-col px-1 pt-4 ">
          <div className="group -mt-[1px] mr-auto cursor-pointer truncate">
            <div className="flex flex-col">
              <span className="mb-0.5 truncate text-base font-medium group-hover:text-brand">
                {track.name}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="truncate text-sm text-dark-400 group-hover:text-brand dark:text-light-800">
              {track.artist}
            </span>
          </div>
          <div className="mt-3 flex w-full">
            <span className="flex w-full items-center justify-center gap-2 rounded-2xl bg-light-400 px-1.5 py-1  text-sm font-semibold uppercase text-brand shadow-inner dark:bg-dark-400 dark:text-brand-dark">
              {!isMyMusicPage && (
                <PlusIcon className="h-4 w-4 rounded-full border border-brand fill-brand p-0.5" />
              )}{" "}
              Ksh.
              {track.price}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
