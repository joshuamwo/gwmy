"use client";

import { useSupabase } from "@/context/supabase-context";
import { Track } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TrackViewPage({ params }: { params: { id: string } }) {
  const { supabase } = useSupabase();
  const [track, setTrack] = useState<Track>();
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState();

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
  useEffect(() => {
    getTrack();
  }, [0]);

  return (
    <>
      {track && (
        <div>
          {/* Album name and cover */}
          <div className="flex h-[25vh] min-h-[200px] items-end rounded bg-light-400 dark:bg-dark-400 ">
            <div className="flex items-end pb-4 pl-4">
              <Image
                src={track.cover}
                alt={track.name}
                width={150}
                height={150}
                className="aspect-square rounded object-cover"
              />

              <div className="flex flex-col gap-2 pl-4">
                <h3 className="text-xs">Song</h3>
                <h1 className="text-4xl font-bold">{track.name} </h1>
                <h3 className="flex flex-wrap gap-2 text-xs">
                  <span>{track.artist}</span>
                  {track.other_artists &&
                    track.other_artists.map((artist, index) => (
                      <span key={index}>• {artist}</span>
                    ))}
                  {/*  */}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
