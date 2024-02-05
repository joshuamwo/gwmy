import { useRecoilValue } from "recoil";
import { myAlbumsState } from "@/recoil/atoms";
import React from "react";
import AlbumCard from "../music/album-card";
import { useScrollableSlider } from "@/lib/hooks/use-scrollable-slider";
import { ChevronLeftIcon } from "./chevron-left-icon";
import { ChevronRightIcon } from "./chevron-right-icon";

export default function HorizontalSlider() {
  const albums = useRecoilValue(myAlbumsState);

  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider("/");

  return (
    <div
      className="relative flex items-center overflow-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        title={"prev"}
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="mb-7 flex h-7 w-7 flex-row items-center justify-center rounded-full text-dark-200 hover:text-dark focus:text-dark  dark:text-light-200 dark:hover:text-light dark:focus:text-light sm:left-3 md:left-4 lg:left-6"
      >
        <ChevronLeftIcon className="h-[18px] w-[18px]" />
      </button>
      <div className="flex items-start overflow-hidden px-2 pb-9 pt-5 md:pb-10 md:pt-6 lg:pb-12 ">
        <div
          className="scrollbar-hide flex w-full overflow-x-auto scroll-smooth"
          ref={sliderEl}
        >
          {albums.length > 0
            ? albums.map((album) => (
                <div className="w-32 ">
                  <AlbumCard
                    album={album}
                    key={album.id}
                    isMyMusicPage={true}
                  />
                </div>
              ))
            : ""}
        </div>
      </div>
      <button
        title="next"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className=" mb-7 flex h-6 w-6 items-center justify-end rounded-full text-dark-200 hover:text-dark  focus:text-dark dark:text-light-200  dark:hover:text-light dark:focus:text-light sm:right-3 md:right-4 lg:right-6"
      >
        <ChevronRightIcon className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}
