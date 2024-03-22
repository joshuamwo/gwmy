import { Artist } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { useModalAction } from "../modals/modal-controller";
import Link from "next/link";
import placeholder from "@/public/images/placeholders/product.svg";
import { PlusIcon } from "../icons/plus-icon";

interface CardProps {
  artist: Artist;
  isMyMusicPage?: boolean;
}

export default function ArtistCard({ artist, isMyMusicPage }: CardProps) {
  const src = artist.profile_picture ? artist.profile_picture : placeholder;

  const [isGridCompact, setIsGridCompact] = useState(false);
  const { openModal, closeModal } = useModalAction();
  const modalName1 = "EDITPRODUCTFORM";
  const modalName2 = "PRODUCTVIEWMODAL";
  return (
    <div className="group h-full w-full rounded-md p-2 shadow-lg ring-2  ring-light-500 hover:bg-light-300 dark:bg-dark-250 dark:ring-dark-400 dark:hover:bg-dark-300  md:p-4">
      <Link
        href={isMyMusicPage ? `/admin/my-music/artist/${artist.id}` : "/music"}
      >
        <div className=" relative flex aspect-square">
          <Image
            alt={`${artist.alias} profile picture`}
            src={src}
            fill
            priority={true}
            quality={100}
            className="aspect-square rounded-full bg-light-500 object-cover shadow-lg dark:bg-dark-400 "
          />
        </div>
        <div className="flex flex-col px-1 pt-4 ">
          <div className=" -mt-[1px] mr-auto cursor-pointer truncate">
            <div className="flex flex-col justify-center">
              <span className="text-md mb-0.5 truncate text-center font-medium group-hover:text-brand">
                {artist.alias}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="truncate text-sm font-medium text-dark-400 group-hover:text-brand dark:text-light-800">
              Artist
            </span>
          </div>
          {/* <div className="mt-3 flex w-full">
            <span className="flex w-full items-center justify-center gap-2 rounded-2xl bg-light-400 px-1.5 py-1  text-sm font-semibold uppercase text-brand shadow-inner dark:bg-dark-400 dark:text-brand-dark">
              {!isMyMusicPage && (
                <PlusIcon className="h-4 w-4 rounded-full border border-brand fill-brand p-0.5" />
              )}{" "}
              Ksh.
              {track.price}
            </span>
          </div> */}
        </div>
      </Link>
    </div>
  );
}
