import { useRecoilValue } from "recoil";
import { artistsState, mySingleTracksState } from "@/recoil/atoms";
import React from "react";
import ArtistCard from "./artist-card";

export default function Artists() {
  const artists = useRecoilValue(artistsState);

  return (
    <div className="w-full pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:pb-12">
      <div className="grid grid-cols-2 gap-4 xs:grid-cols-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {artists.length > 0
          ? artists.map((artist) => (
              <div key={artist.id} className="max-w-[200px]">
                <ArtistCard artist={artist} isMyMusicPage={true} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
