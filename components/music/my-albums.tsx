import { useRecoilValue } from "recoil";
import { myAlbumsState } from "@/recoil/atoms";
import React from "react";
import Card from "../ui/card";
import AlbumCard from "./album-card";
import { classnames } from "@/utils/classnames";

export default function MyAlbums({ className }: { className?: string }) {
  const albums = useRecoilValue(myAlbumsState);

  return (
    <div
      className={classnames(
        "w-full pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:pb-12",
        className,
      )}
    >
      <div className=" grid w-full grid-cols-2  gap-4 md:grid-cols-3 3xl:grid-cols-5 ">
        {albums.length > 0 &&
          albums.map((album) => (
            <div className="!w-[200px]" key={album.id}>
              <AlbumCard album={album} isMyMusicPage={true} />
            </div>
          ))}
      </div>
    </div>
  );
}
