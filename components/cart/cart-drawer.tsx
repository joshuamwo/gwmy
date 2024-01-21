import { useCart } from "@/context/cart-context";
import { useDrawer } from "../drawer/drawer-context";
import { CloseIcon } from "../icons/close-icon";
import Scrollbar from "../ui/scrollbars";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartEmpty from "./cart-empty";
import CartItemList from "./cart-item-list";

export default function CartDrawer() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { closeDrawer } = useDrawer();
  const { getCartTotalCount, getCartTotalPrice, cart, removeFromCart } =
    useCart();

  const isEmpty = getCartTotalCount() === 0;
  const totalPrice = getCartTotalPrice();

  function handleCheckout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setLoading(true);

    try {
      setTimeout(() => {
        setLoading(false);
        router.push("/checkout");
        closeDrawer();
      }, 600);
    } catch (error) {
      console.log("error");
    }
  }
  return (
    <>
      <div className="flex h-[70px] items-center justify-between py-2 px-5 sm:px-7">
        <h2 className="text-sm font-medium capitalize text-dark dark:text-light">
          Shopping Cart
        </h2>
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="-m-2 p-2 text-dark-800 outline-none transition-all hover:text-dark hover:dark:text-light-200"
            onClick={closeDrawer}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <Scrollbar className="cart-scrollbar w-full flex-1 py-6 px-6 sm:px-7">
        {!isEmpty ? (
          <CartItemList cart={cart} removeFromCart={removeFromCart} />
        ) : (
          <CartEmpty />
        )}
      </Scrollbar>
      <div className="border-t border-light-300 px-5 py-6 dark:border-dark-500 sm:px-7 sm:pb-8 sm:pt-7">
        <div className="flex justify-between text-sm font-medium text-dark dark:text-light">
          <span>Subtotal:</span>
          <span>Ksh. {totalPrice}</span>
        </div>
        <div className="mt-5 md:mt-8">
          <Button
            disabled={isEmpty}
            isLoading={loading}
            onClick={(e) => handleCheckout(e)}
            className="w-full text-sm md:h-[52px]"
          >
            Proceed To Checkout
          </Button>
        </div>
      </div>
    </>
  );
}
