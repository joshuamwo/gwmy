import { useCart } from "@/context/cart-context";
import { CartItem } from "@/types";
import classnames from "classnames";
import toast from "react-hot-toast";
import { CloseIcon } from "../icons/close-icon";
import CartItemView from "./cart-item-view";

type CartItemListProps = {
  cart: CartItem[];
  removeFromCart: (item: CartItem) => void;
  className?: string;
};

export default function CartItemList({
  cart,
  removeFromCart,
  className,
}: CartItemListProps) {
  return (
    <ul role="list" className={classnames("-my-6 w-full", className)}>
      {cart.map((item) => {
        return (
          <li
            key={item.id}
            className="relative ml-4 flex border-b border-light-300 last-of-type:border-b-0 dark:border-dark-500 xs:ml-6"
          >
            <button
              type="button"
              className="absolute -left-8 top-1/2 -mt-3.5 flex-shrink-0 p-2 font-medium text-dark-900 hover:text-dark dark:text-dark-800 dark:hover:text-light-900 xs:-left-10"
              onClick={() => removeFromCart(item)}
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
            <CartItemView item={item} />
          </li>
        );
      })}
    </ul>
  );
}
