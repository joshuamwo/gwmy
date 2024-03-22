"use client";

import { useSupabase } from "@/context/supabase-context";
import { Track } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { unpublishTrack } from "@/app/actions/unpublish-track";
import { publishTrack } from "@/app/actions/publish-track";
import toast from "react-hot-toast";
import { PlusIcon } from "@/components/icons/plus-icon";

export default function TrackViewPage({ params }: { params: { id: string } }) {
  const { supabase } = useSupabase();
  const [track, setTrack] = useState<Track>();
  const [loading, setLoading] = useState(false);

  //

  async function getTrack() {
    // if (album) return;
    try {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .eq("id", params.id)
        .returns<Track[]>();

      if (error) throw error;
      if (data.length < 1) throw "Not found";

      console.log(data);

      const trak = data[0];
      setTrack(trak);
      console.log(trak);
    } catch (error) {
      console.log(error);
    }
  }

  //
  useEffect(() => {
    getTrack();
  }, [0]);

  return (
    <>
      {track && (
        <div>
          {/* Album name and cover */}
          <div className="flex h-[25vh] min-h-[200px] items-end bg-light-400  dark:bg-dark-400 md:h-[33vh] ">
            <div className="flex items-end pb-4 pl-4">
              <div className="relative h-[15vw] max-h-[200px] min-h-[150px] w-[15vw] min-w-[150px] max-w-[200px]">
                <Image
                  src={track.cover}
                  alt={track.name}
                  fill
                  className="aspect-square rounded object-cover shadow-lg"
                />
              </div>

              <div className="flex flex-col gap-2 pl-4 md:gap-4">
                <h3 className="text-sm font-medium">Song</h3>
                <h1 className="text-2xl font-bold xs:text-4xl sm:text-5xl md:text-6xl  lg:text-7xl">
                  {track.name}{" "}
                </h1>
                <h3 className="flex flex-wrap gap-2 text-sm">
                  <span>{track.artist}</span>
                  {/* {track.other_artists &&
                    track.other_artists.map((artist, index) => (
                      <span key={index}>• {artist}</span>
                    ))} */}
                  {/*  */}
                </h3>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className=" flex justify-end gap-2 p-4">
            <Button
              isLoading={loading}
              className="relative h-8 rounded-full text-sm "
            >
              <PlusIcon className="h-5 w-5  rounded-full border fill-light-300	" />{" "}
              KES.
              {track.price}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
