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
      <div className="grid grid-cols-3 gap-2 xs:grid-cols-4 md:grid-cols-5 lg:gap-3 3xl:grid-cols-6 3xl:gap-4">
        {albums.length > 0
          ? albums.map((album) => (
              <AlbumCard album={album} key={album.id} isMyMusicPage={true} />
            ))
          : ""}
      </div>
    </div>
  );
}
