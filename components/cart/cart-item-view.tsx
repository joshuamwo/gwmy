import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/images/placeholders/product.svg";
import { CartItem } from "@/types";

export default function CartItemView({ item }: { item: CartItem }) {
  const { name, image, id, price, quantity } = item;

  return (
    <div className="flex w-full items-start gap-4 py-3">
      <div className="relative aspect-[5/3.4] w-28 flex-shrink-0 border border-light-300 bg-light-300 dark:border-0 dark:bg-dark-500 xs:w-32">
        <Image
          alt={name}
          fill
          src={image ?? placeholder}
          className="object-cover"
        />
      </div>
      <div className="w-[calc(100%-125px)] text-13px font-medium xs:w-[calc(100%-145px)] sm:w-[calc(100%-150px)] h-full flex flex-col gap-1 justify-center ">
        <h3 className="truncate text-dark dark:text-light">
          <Link
            href={`/product/${id}`}
            className="transition-colors hover:text-brand-dark"
          >
            {name}
          </Link>
        </h3>

        <p className="flex items-center gap-2 text-xs">
          <span className="rounded-2xl bg-light-300 p-1.5 font-semibold uppercase leading-none text-brand-dark dark:bg-dark-500">
            Ksh. {price}
          </span>
          <span className="text-light-base dark:text-dark-base">
            X {quantity}
          </span>
        </p>
      </div>
    </div>
  );
}
