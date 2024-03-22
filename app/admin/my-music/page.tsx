"use client";

import { PlusIcon } from "@/components/icons/plus-icon";
import { useModalAction } from "@/components/modals/modal-controller";
import Artists from "@/components/music/artists";
import Albums from "@/components/music/my-albums";
import SingleTracks from "@/components/music/my-single-tracks";
import Search from "@/components/search";
import Button from "@/components/ui/button";
import HorizontalSlider from "@/components/ui/horizontal-slider";
import { useSupabase, userContext } from "@/context/supabase-context";
import {
  artistsState,
  myAlbumsState,
  mySingleTracksState,
} from "@/recoil/atoms";
import { Album, Artist, SingleTrack } from "@/types";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function MyMusic() {
  const { supabase } = useSupabase();
  const { openModal } = useModalAction();

  const user = userContext();

  const [myAlbums, setMyAlbums] = useRecoilState(myAlbumsState);
  const [mySingleTracks, setMySingleTracks] =
    useRecoilState(mySingleTracksState);
  const [artists, setArtists] = useRecoilState(artistsState);

  //fetch albums
  const fetchAlbums = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select("*")
      .eq("owner", user?.id);
    if (error) console.log(error);
    if (data) {
      console.log(data);
      const albums = data as Album[];
      setMyAlbums(albums);
    }
  };

  //fetch single tracks
  const fetchSingleTracks = async () => {
    const { data, error } = await supabase
      .from("tracks")
      .select("*")
      .eq("owner", user?.id)
      .is("album", null)
      // .match({ owner: user?.id, album: "NULL" })
      .returns<SingleTrack[]>();

    if (error) console.log(error);
    if (data) {
      console.log(data);
      setMySingleTracks(data);
    }
  };

  //fetch single tracks
  const fetchArtists = async () => {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .returns<Artist[]>();

    if (error) console.log(error);
    if (data) {
      console.log(data);
      setArtists(data);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchSingleTracks();
    fetchArtists();
  }, []);

  return (
    <div className="rounded">
      <>
        <div className="mb-24 flex-col px-3 py-5 md:px-3 md:py-8">
          <div className=" sticky top-16 z-10 mb-8 hidden flex-col rounded bg-light p-5 shadow-lg dark:bg-dark-300 sm:flex md:p-8">
            <div className=" flex w-full flex-col  items-center md:flex-row">
              <div className="mb-4 sm:block md:mb-0 md:w-1/4">
                <h1 className="text-heading text-lg font-semibold">My Music</h1>
              </div>
              <div className="ms-auto flex w-full flex-col items-center md:w-3/4">
                <Search />
              </div>
              <div className="text-accent mt-5 hidden items-center whitespace-nowrap text-base font-semibold md:ms-5 md:mt-0 md:flex">
                <Button
                  onClick={() =>
                    openModal("ADDARTISTFORM", {
                      action: {
                        onSuccess: fetchArtists,
                      },
                    })
                  }
                  className="bottom-24 right-6 h-8"
                >
                  <label
                    htmlFor="add-product-button"
                    className="sm:text-md text-xs"
                  >
                    Add Artist
                  </label>
                </Button>
              </div>
            </div>
          </div>
          {artists && (
            <div className="">
              <h1 className="text-lg ">Artists</h1>
              <Artists />
            </div>
          )}

          {myAlbums && myAlbums.length > 0 && (
            <div className="">
              <h1 className="text-lg ">Albums</h1>
              <HorizontalSlider className="hidden sm:flex" albums={myAlbums} />
              <Albums
                className="flex sm:hidden"
                isMyMusicPage={true}
                albums={myAlbums}
              />
            </div>
          )}

          {mySingleTracks && mySingleTracks.length > 0 && (
            <div className="">
              <h1 className="text-lg ">Single Tracks</h1>
              <SingleTracks tracks={mySingleTracks} />
            </div>
          )}
        </div>

        <Button
          onClick={() => openModal("ADDARTISTFORM")}
          className="z-999 fixed bottom-24 right-6 h-12 w-12 rounded-full sm:bottom-6 md:hidden"
        >
          <PlusIcon className="h-6 fill-white" />
        </Button>
      </>
    </div>
  );
}
