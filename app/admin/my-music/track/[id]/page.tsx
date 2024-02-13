"use client";

import { useSupabase } from "@/context/supabase-context";
import { Track } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { unpublishTrack } from "@/app/actions/unpublish-track";
import { publishTrack } from "@/app/actions/publish-track";
import toast from "react-hot-toast";

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

      const trak = data[0];
      setTrack(trak);
      console.log(trak);
    } catch (error) {
      console.log(error);
    }
  }

  //

  async function handleTogglePublishTrack() {
    if (!track) return;
    try {
      setLoading(true);
      console.log("Publishing Track");

      const { ok } = await (track.published
        ? unpublishTrack(track.id)
        : publishTrack(track.id));

      if (ok) {
        toast.success(
          track.published ? "Album Unpublished" : "Album Published",
        );
      } else {
        //reverse any changes
        toast.error(
          track.published ? "Failed to Unpublish" : "Failed to Publish",
        );
        track.published
          ? await publishTrack(track.id)
          : await unpublishTrack(track.id);
      }

      //
      getTrack();

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
              variant="outline"
              className=" relative h-8 rounded-full !bg-blue-600 text-sm "
              onClick={() => handleTogglePublishTrack()}
            >
              <span className="px-4">
                {track.published ? "UnPublish" : "Publish"}
              </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
