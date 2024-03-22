"use client";

import { useSupabase } from "@/context/supabase-context";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Album, Track } from "@/types";
import Button from "@/components/ui/button";
import { useModalAction } from "@/components/modals/modal-controller";
import AlbumTrackList from "@/components/music/album-track-list";
import { publishAlbum } from "@/app/actions/publish-album";
import { unpublishAlbum } from "@/app/actions/unpublish-album";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@/components/icons/plus-icon";

export default function AlbumViewPage({ params }: { params: { id: string } }) {
  const { supabase } = useSupabase();
  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<Track[]>();
  const [loading, setLoading] = useState(false);

  //router
  const router = useRouter();

  async function getAlbum() {
    // if (album) return;
    try {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("id", params.id);

      if (error) throw error;
      if (data.length < 1) throw "Not found";

      const album = data[0] as Album;

      //return user to home if album is not published
      if (!album.published) {
        toast.error("Album not found");
        router.push("/");
      }
      setAlbum(album);
    } catch (error) {
      console.log(error);
    }
  }

  //
  const { openModal } = useModalAction();

  //
  async function getTracks() {
    // if (tracks) return;
    if (!album) return;
    try {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .eq("album", params.id);

      if (error) throw error;
      if (data.length < 1) throw "No Tracks found";

      const tracks = data as Track[];
      setTracks(tracks);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  //
  useEffect(() => {
    getAlbum();
    if (album) getTracks();
  }, [album]);

  return (
    <>
      {album && (
        <div className="h-full  rounded pb-16">
          {/* Album name and cover */}
          <div className="flex h-[25vh] min-h-[200px] items-end rounded bg-light-400 dark:bg-dark-400 md:h-[33vh] ">
            <div className="flex items-end pb-4 pl-4">
              <div className="relative h-[15vw] max-h-[200px] min-h-[150px] w-[15vw] min-w-[150px] max-w-[200px]">
                <Image
                  src={album.cover}
                  alt={album.name}
                  fill
                  className="aspect-square rounded object-cover"
                />
              </div>

              <div className="flex flex-col gap-2 pl-4 md:gap-4">
                <h3 className="text-sm font-medium">Album</h3>
                <h1 className="text-2xl font-bold xs:text-4xl sm:text-5xl md:text-6xl  lg:text-7xl">
                  {album.name}{" "}
                </h1>
                <h3 className="flex flex-wrap gap-2 text-sm">
                  <span>{album.artist}</span>
                  {album.other_artists &&
                    album.other_artists.map((artist, index) => (
                      <span key={index}>• {artist}</span>
                    ))}
                  <span>
                    • {tracks ? `${tracks.length} Tracks` : "No Tracks"}
                  </span>
                </h3>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className=" flex justify-end gap-2 p-4">
            <Button variant="solid" className=" h-8 rounded-full text-sm">
              <PlusIcon className="h-5 w-5  rounded-full border fill-light-300	" />{" "}
              KES.
              {album.price}
            </Button>
            {/* <Button
              isLoading={loading}
              variant="outline"
              className=" relative h-8 rounded-full !bg-blue-600 text-sm "
            >
              <span className="px-4 text-light-300">
                {album.published ? "UnPublish" : "Publish"}
              </span>
            </Button> */}
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
