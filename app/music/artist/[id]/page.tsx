"use client";

import { useSupabase } from "@/context/supabase-context";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Album, Artist, SingleTrack, Track } from "@/types";
import Button from "@/components/ui/button";
import { useModalAction } from "@/components/modals/modal-controller";
import HorizontalSlider from "@/components/ui/horizontal-slider";
import SingleTracks from "@/components/music/my-single-tracks";
import Albums from "@/components/music/my-albums";

export default function ArtistPage({ params }: { params: { id: string } }) {
  const { supabase } = useSupabase();
  const [artist, setArtist] = useState<Artist>();
  const [albums, setAlbums] = useState<Album[]>();
  const [singles, setSingles] = useState<SingleTrack[]>();

  const [loading, setLoading] = useState(false);

  //
  const { openModal } = useModalAction();

  async function getArtist() {
    // if (album) return;
    try {
      console.log(params.id);
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      if (!data) throw "Not found";

      console.log(artist);
      setArtist(data as Artist);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAlbums() {
    try {
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("owner", params.id)
        .eq("published", true)
        .returns<Album[]>();

      if (error) throw error;
      if (!data) throw "Not found";
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async function getSingles() {
    // if (tracks) return;
    console.log("getting singles");
    try {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .eq("owner", params.id)
        .is("album", null)
        .eq("published", true)
        .returns<SingleTrack[]>();

      if (error) throw error;
      if (data.length < 1) throw "No Tracks found";

      console.log(data);
      setSingles(data);
      return;
    } catch (error) {
      console.log("get singles error", error);
      return;
    }
  }

  //
  useEffect(() => {
    getArtist();
    getSingles();
    getAlbums();
  }, []);

  return (
    <>
      {artist && (
        <div className="h-full  rounded pb-16">
          {/* Album name and cover */}
          <div className="flex h-[25vh] min-h-[200px] items-end rounded bg-light-200 dark:bg-dark-400 md:h-[33vh] ">
            <div className="flex items-end pb-4 pl-4">
              <div className="relative h-[15vw] max-h-[200px] min-h-[150px] w-[15vw] min-w-[150px] max-w-[200px]">
                <Image
                  src={artist.profile_picture}
                  alt={artist.alias}
                  fill
                  className="aspect-square rounded object-cover"
                />
              </div>

              <div className="flex flex-col gap-2 pl-4 md:gap-4">
                <h1 className="text-2xl font-bold xs:text-4xl sm:text-5xl md:text-6xl  lg:text-7xl">
                  {artist.alias}{" "}
                </h1>
                <h3 className="text-base font-medium">Artist</h3>
              </div>
            </div>
          </div>

          {/* actions */}
          {/* <div className=" flex justify-end gap-2 p-4">
            <Button
              variant="solid"
              className=" h-8 rounded-full text-sm"
              onClick={() =>
                openModal("ADDPRODUCTFORM", {
                  productType: "Music",
                  productSubType: "Track",
                  artist: {
                    name: artist.alias,
                    id: artist.id,
                  },
                  action: {
                    onSuccess: getSingles,
                  },
                })
              }
            >
              Add Single
            </Button>
            <Button
              isLoading={loading}
              variant="outline"
              className=" relative h-8 rounded-full !bg-blue-600 text-sm "
              onClick={() =>
                openModal("ADDPRODUCTFORM", {
                  productType: "Music",
                  productSubType: "Album",
                  album: null,
                  artist: {
                    alias: artist.alias,
                    id: artist.id,
                  },
                  action: {
                    onSuccess: getAlbums,
                  },
                })
              }
            >
              <span className="px-4 text-light-300">Add Album</span>
            </Button>
          </div> */}

          <div className="p-4">
            {/* nothing found */}
            {albums && albums.length < 1 && !singles && (
              <div className="flex h-full w-full justify-center">
                <h1 className="text-2xl font-semibold text-dark-600 dark:text-light-600">
                  Your added music will appear here.
                </h1>
              </div>
            )}

            {/* Albums */}

            {albums && albums?.length > 0 && (
              <div className="">
                <h1 className="text-lg md:pl-4">Albums</h1>
                {/* <HorizontalSlider className="hidden sm:flex" albums={albums} /> */}
                <Albums albums={albums} isMyMusicPage={false} />
              </div>
            )}

            {singles && (
              <div className="">
                <h1 className="text-lg md:pl-4">Singles</h1>
                <SingleTracks tracks={singles} isMyMusicPage={false} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
