import { useRecoilValue } from "recoil";
import {
  albumsState,
  artistsState,
  productsState,
  tracksState,
} from "@/recoil/atoms";
import React, { Suspense } from "react";
import Card from "../ui/card";
import ProductCardUiLoader from "../ui/ui-preloaders/product-card-ui-loader";
import rangeMap from "@/lib/range-map";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import Artists from "./artists";
import Albums from "./my-albums";
import Tracks from "./tracks";
import HorizontalSlider from "../ui/horizontal-slider";

type publishedProductsProps = {
  limit?: number;
};

export default function AllPublishedMusicList({
  limit = 15,
}: publishedProductsProps) {
  const tracks = useRecoilValue(tracksState);
  const albums = useRecoilValue(albumsState);
  const artists = useRecoilValue(artistsState);
  const isMounted = useIsMounted();

  return (
    <div className="my-4">
      {artists && (
        <div className="">
          <h1 className="mx-5 text-xl font-semibold ">Artists</h1>
          <Artists isMyMusicPage={false} />
        </div>
      )}

      {albums && albums.length > 0 && (
        <div className="">
          <h1 className="mx-6 text-xl font-semibold">Albums</h1>
          {/* <HorizontalSlider className="hidden sm:flex" albums={albums} /> */}
          <Albums
            className="flex sm:hidden"
            isMyMusicPage={false}
            albums={albums}
          />
        </div>
      )}

      {tracks && tracks.length > 0 && (
        <div className="">
          <h1 className="mx-6 text-xl font-semibold">Singles</h1>
          <Tracks tracks={tracks} />
        </div>
      )}
    </div>
  );
}
