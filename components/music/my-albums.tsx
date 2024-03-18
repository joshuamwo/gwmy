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
}: {
  className?: string;
  albums: Album[];
}) {
  return (
    <div
      className={classnames(
        "w-full pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:pb-12",
        className,
      )}
    >
      <div className=" flex w-full flex-wrap ">
        {albums.length > 0 &&
          albums.map((album) => (
            <div className="!max-w-[300px]" key={album.id}>
              <AlbumCard album={album} isMyMusicPage={true} />
            </div>
          ))}
      </div>
    </div>
  );
}
