import { useRecoilValue } from "recoil";
import { mySingleTracksState } from "@/recoil/atoms";
import React from "react";
import Card from "../ui/card";
import AlbumCard from "./album-card";
import TrackCard from "./track-card";
import { Track } from "@/types";

export default function Tracks({ tracks }: { tracks: Track[] }) {
  return (
    <div className="w-full px-2 pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:pb-12">
      <div className="grid grid-cols-2 gap-2.5 gap-y-10 xs:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5	">
        {tracks.length > 0
          ? tracks.map((track) => (
              <div key={track.id} className="h-full w-full  max-w-[300px] ">
                <TrackCard track={track} isMyMusicPage={true} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
