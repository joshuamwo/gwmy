import { useState } from "react";
import { TrendingIcon } from "../icons/trending-icon";
import { LoaderIcon } from "react-hot-toast";

export default function Trending() {
  const [fetching, setFetching] = useState(true);

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="flex gap-4 text-sm font-semibold tracking-wide  ">
        <TrendingIcon className="h-6 w-6  stroke-2" />
        Trending
      </h1>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <LoaderIcon />
      </div>
    </div>
  );
}
