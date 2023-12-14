import {
  Navigation,
  Thumbs,
  Pagination,
  Autoplay,
  Grid,
  FreeMode,
  Swiper,
  SwiperSlide,
} from "@/components/ui/image-slider";
import Image from "next/image";

import { useRef, useState } from "react";
import { ChevronRightIcon } from "../ui/chevron-right-icon";
import { ChevronLeftIcon } from "../ui/chevron-left-icon";

import placeholder from "@/public/images/placeholders/product.svg";

interface ProductThumbnailGalleryProps {
  gallery: any[];
  className?: string;
}

const swiperParams = {
  slidesPerView: 1,
  spaceBetween: 0,
};

export default function ProductThumbnailGallery({
  gallery,
  className,
}: ProductThumbnailGalleryProps) {
  let [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  return (
    <div className={className}>
      <div className="relative mb-3 w-full overflow-hidden xl:mb-5">
        <Swiper
          id="productGallery"
          speed={400}
          allowTouchMove={false}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs, FreeMode]}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          {...swiperParams}
        >
          {gallery?.map((item: string) => (
            <SwiperSlide
              key={`product-gallery-${item}`}
              className="relative flex aspect-[16/9] lg:aspect-[4/5] items-center justify-center bg-light-200 dark:bg-dark-200"
            >
              <Image
                fill
                src={item ? item : placeholder}
                alt={`Product gallery ${item}`}
                className="object-cover"
                sizes="(max-width:795px), (max-height:480px)"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-2/4 z-10 flex w-full items-center justify-between px-2.5 xl:px-4">
          <div
            ref={prevRef}
            className="flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark/90 shadow-xl transition duration-300 hover:bg-light-200 hover:text-brand-dark focus:outline-none rtl:rotate-180 xl:h-9 xl:w-9"
          >
            <ChevronLeftIcon className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
          </div>
          <div
            ref={nextRef}
            className="flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark/90 shadow-xl transition duration-300 hover:bg-light-200 hover:text-brand-dark focus:outline-none rtl:rotate-180 xl:h-9 xl:w-9"
          >
            <ChevronRightIcon className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Swiper
          id="productGalleryThumbs"
          freeMode={true}
          modules={[Navigation, Thumbs, FreeMode]}
          observer={true}
          slidesPerView={4}
          onSwiper={setThumbsSwiper}
          observeParents={true}
          watchSlidesProgress={true}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item}`}
              className="relative flex gap-2 aspect-[5/4] cursor-pointer items-center justify-center border border-light-500 transition hover:opacity-75 dark:border-dark-500"
            >
              <Image
                fill
                src={item ?? placeholder}
                alt={`Product thumb gallery ${item}`}
                className="object-cover"
                sizes="(max-width:200px)"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
