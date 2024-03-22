import { useRecoilValue } from "recoil";
import { myAlbumsState } from "@/recoil/atoms";
import React from "react";
import Card from "../ui/card";
import AlbumCard from "./album-card";
import { classnames } from "@/utils/classnames";
import { Album } from "@/types";

export default function Albums({
  className,
  albums,
  isMyMusicPage,
}: {
  className?: string;
  albums: Album[];
  isMyMusicPage: boolean;
}) {
  return (
    <div
      className={classnames(
        "w-full pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:pb-12",
        className,
      )}
    >
      <div className=" grid grid-cols-2 gap-2.5 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5">
        {albums.length > 0 &&
          albums.map((album) => (
            <div className="!max-w-[300px]" key={album.id}>
              <AlbumCard album={album} isMyMusicPage={isMyMusicPage} />
            </div>
          ))}
      </div>
    </div>
  );
}
