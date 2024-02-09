"use client";

import { useSupabase } from "@/context/supabase-context";
import { useState } from "react";
import Image from "next/image";
import { Album, Track } from "@/types";
import Button from "@/components/ui/button";
import { useModalAction } from "@/components/modals/modal-controller";
import AlbumTrackList from "@/components/music/album-track-list";

export default function AlbumViewPage({ params }: { params: { id: string } }) {
  const { supabase } = useSupabase();
  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<Track[]>();

  async function getAlbum() {
    if (album) return;
    try {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("id", params.id);

      if (!data) throw "Not found";
      if (error) throw error;

      const album = data[0] as Album;
      setAlbum(album);
      console.log(album);
    } catch (error) {
      console.log(error);
    }
  }

  //
  const { openModal } = useModalAction();

  //
  async function getTracks() {
    if (tracks) return;
    try {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .eq("album", params.id);

      const tracks = data as Track[];
      setTracks(tracks);
    } catch (error) {
      console.log(error);
    }
  }

  getAlbum();
  getTracks();

  return (
    <>
      {album && (
        <div className="h-full">
          {/* Album name and cover */}
          <div className="flex h-[25vh] items-end bg-light-400 dark:bg-dark-400 ">
            <div className="flex items-center pb-4 pl-4">
              <Image
                src={album.cover}
                alt={album.name}
                width={100}
                height={100}
                className="rounded"
              />

              <div className="flex flex-col gap-2 pl-4">
                <h3 className="text-xs">Album</h3>
                <h1 className="text-4xl font-bold">{album.name}</h1>
                <h3 className="flex gap-2 text-xs">
                  <span>{album.artist}</span>
                  <span>
                    {" "}
                    {tracks ? `${tracks.length} Tracks` : "No Tracks"}
                  </span>
                </h3>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className="flex justify-end p-4">
            <Button
              variant="solid"
              className=" h-8 rounded-full text-sm"
              onClick={() =>
                openModal("ADDPRODUCTFORM", {
                  productType: "Music",
                  productSubType: "Track",
                  album: {
                    id: album.id,
                    name: album.name,
                  },
                })
              }
            >
              Add Tracks
            </Button>
          </div>

          {/* tracks */}

          <div className="w-full overflow-y-auto ">
            {tracks ? (
              <AlbumTrackList tracks={tracks} />
            ) : (
              <span className=" flex w-full justify-center text-sm ">
                Add tracks to this album.
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
