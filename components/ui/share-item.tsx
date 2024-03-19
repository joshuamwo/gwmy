import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { LinkIcon } from "./link-icon";
import { classnames } from "@/utils/classnames";
import Button from "./button";
import { useState } from "react";

interface ShareItemProps {
  className?: string;
  itemUrl: string;
}

export default function ShareItem({ className, itemUrl }: ShareItemProps) {
  const [copyButtonStatus, setCopyButtonStatus] = useState("Copy Link");

  function handleCopyLink() {
    try {
      navigator.clipboard.writeText(itemUrl);
      setCopyButtonStatus("Copied");
      setTimeout(() => {
        setCopyButtonStatus("Copy Link");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classnames(className, "flex gap-3 lg:items-center")}>
      <div className="flex-shrink-0 pr-4  pt-2 text-base dark:text-light-600 sm:w-36 lg:pt-0">
        Share Item:
      </div>
      {/* share buttons */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        <div className="product-share flex flex-shrink-0 flex-wrap items-center gap-1.5 md:gap-2.5 xl:gap-3">
          <WhatsappShareButton url={itemUrl}>
            <WhatsappIcon size={28} round />
          </WhatsappShareButton>

          <FacebookShareButton url={itemUrl}>
            <FacebookIcon size={28} round />
          </FacebookShareButton>

          <TwitterShareButton url={itemUrl}>
            <TwitterIcon size={28} round />
          </TwitterShareButton>
        </div>
        <Button
          onClick={handleCopyLink}
          variant="icon"
          className="flex h-7 flex-shrink-0 items-center rounded-full border border-light-600 px-3 text-dark-600 hover:bg-light-200 hover:text-dark dark:border-dark-500 dark:text-light-600 hover:dark:bg-dark-500 dark:hover:text-light md:px-4 xl:h-10"
        >
          <LinkIcon className="mr-1.5 h-3.5 w-3.5 text-dark-700  dark:text-light lg:h-4 lg:w-4" />
          <span className="text-xs">{copyButtonStatus}</span>
        </Button>
      </div>
    </div>
  );
}
