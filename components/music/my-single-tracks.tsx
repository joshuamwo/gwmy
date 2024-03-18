import { useRecoilValue } from "recoil";
import { mySingleTracksState } from "@/recoil/atoms";
import React from "react";
import Card from "../ui/card";
import AlbumCard from "./album-card";
import TrackCard from "./track-card";
import { SingleTrack } from "@/types";

export default function SingleTracks({ tracks }: { tracks: SingleTrack[] }) {
  return (
    <div className="w-full pb-9 pt-5 md:px-6 md:pb-10 md:pt-6 lg:pb-12">
      <div className="grid grid-cols-2 gap-4 xs:grid-cols-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {tracks.length > 0
          ? tracks.map((track) => (
              <div key={track.id} className="max-w-[200px]">
                <TrackCard track={track} isMyMusicPage={true} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
