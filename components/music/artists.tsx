import { useRecoilValue } from "recoil";
import { artistsState, mySingleTracksState } from "@/recoil/atoms";
import React from "react";
import ArtistCard from "./artist-card";

export default function Artists({
  isMyMusicPage = true,
}: {
  isMyMusicPage?: boolean;
}) {
  const artists = useRecoilValue(artistsState);

  return (
    <div className="w-full px-2 pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:pb-12">
      <div className="grid grid-cols-2 gap-2.5 xs:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        {artists.length > 0
          ? artists.map((artist) => (
              <div
                key={artist.id}
                className="h-full w-full max-w-[300px] items-center"
              >
                <ArtistCard artist={artist} isMyMusicPage={isMyMusicPage} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
