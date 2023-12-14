import { classnames } from "@/utils/classnames";
import Button from "../ui/button";
import { Product } from "@/types";
import { useState } from "react";

interface AddToCartProps {
  className?: string;
  item: any;
  toastClassName?: string;
}

export default function AddToCart({
  className,
  item,
  toastClassName,
}: AddToCartProps) {
  const [cartingSuccess, setCartingSuccess] = useState(false);

  return (
    <Button
      // onClick={() => handleAddToCart()}
      // isLoading={addToCartLoader}
      className={classnames(
        "relative",
        cartingSuccess
          ? "is-carting pointer-events-none cursor-not-allowed"
          : "pointer-events-auto cursor-pointer",
        className
      )}
    >
      Add to Bag Ksh.{item.price}
      {/* <svg
        viewBox="0 0 37 37"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-auto bottom-auto right-3 h-auto w-5 xs:right-4 xs:w-6"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2.3"
          d="M30.5 6.5h0c6.6 6.6 6.6 17.4 0 24h0c-6.6 6.6-17.4 6.6-24 0h0c-6.6-6.6-6.6-17.4 0-24h0c6.6-6.7 17.4-6.7 24 0z"
          className="circle path"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2.3"
          d="M11.6 20L15.9 24.2 26.4 13.8"
          className="tick path"
        />
      </svg> */}
    </Button>
  );
}
