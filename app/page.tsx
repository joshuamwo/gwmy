"use client";

import Button from "@/components/ui/button";
import { useSupabase } from "@/context/supabase-context";
import { useModalAction } from "@/components/modals/modal-controller";
import { useRecoilValue } from "recoil";
import {
  artistsState,
  myAlbumsState,
  mySingleTracksState,
  productsState,
  tracksState,
} from "@/recoil/atoms";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import MyProductsList from "@/components/sections/my-products-list";
import { Album, Artist, Product, Track } from "@/types";
import AllPublishedProductsList from "@/components/product/all-published-products-list";
import AllPublishedMusicList from "@/components/music/all-published-music-list";

export default function HomePage() {
  const { supabase } = useSupabase();
  const { openModal, closeModal } = useModalAction();
  const router = useRouter();

  const [tracks, setTracks] = useRecoilState(tracksState);
  const [albums, setAlbums] = useRecoilState(myAlbumsState);
  const [artists, setArtists] = useRecoilState(artistsState);

  //fetch music
  const fetchTracks = async () => {
    const { data, error } = await supabase
      .from("tracks")
      .select("*")
      .eq("published", "TRUE")
      .returns<Track[]>();
    if (error) console.log(error);
    if (data) {
      setTracks(data);
    }
  };

  const fetchAlbums = async () => {
    const { data, error } = await supabase
      .from("albums")
      .select("*")
      .eq("published", "TRUE")
      .returns<Album[]>();
    if (error) console.log(error);
    if (data) {
      console.log(data);
      setAlbums(data);
    }
  };
  const fetchArtists = async () => {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .returns<Artist[]>();

    if (error) console.log(error);
    if (data) {
      setArtists(data);
    }
  };

  useEffect(() => {
    fetchTracks();
    fetchAlbums();
    fetchArtists();
  }, []);

  return (
    <div className="pb-20">
      <AllPublishedMusicList />
    </div>
  );
}
