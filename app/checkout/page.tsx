"use client";

import CartEmpty from "@/components/cart/cart-empty";
import CartItemList from "@/components/cart/cart-item-list";
import Input from "@/components/forms/input";
import { LongArrowIcon } from "@/components/icons/long-arrow-icon";
import Button from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { stkPush } from "../actions/stk-push";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    getCartTotalCount,
    getCartTotalPrice,
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const isEmpty = getCartTotalCount() === 0;
  const totalPrice = getCartTotalPrice();

  interface prevState {
    ok: boolean | null;
    code: number | null;
    error: {
      message: string;
    } | null;
  }
  //initial state
  const initialState: prevState = {
    ok: null,
    error: null,
    code: null,
  };

  //handle checkout

  const [state, checkout] = useFormState(stkPush, initialState);

  function handleCheckoutPayment(formData: FormData) {
    formData.append("cart", JSON.stringify(cart));
    formData.append("total", JSON.stringify(totalPrice));
    checkout(formData);
  }

  //handle success || failure of adding music
  useEffect(() => {
    if (state.ok === null) return;
    if (state.ok === true) {
      // reset phone number
      setPhoneNumber("");

      // clear cart
      clearCart();

      //
      state.ok = null;
      state.error = null;

      //toast

      toast.success("Success");
    } else {
      state?.error?.message && toast.error(state.error.message);

      //gently show unauthorised user out
      state.code === 403 && gentlyShowUnauthorisedUserOut();
    }
  }, [state, state?.ok]);

  return (
    <form
      action={handleCheckoutPayment}
      className="mx-auto flex h-full w-full max-w-screen-sm flex-col p-4 pt-6 sm:p-5 sm:pt-8 md:pt-10 3xl:pt-12"
    >
      {/* Mpesa Number */}

      <div className="mb-4 bg-light shadow-card dark:bg-dark-250 dark:shadow-none md:mb-5 3xl:mb-6">
        <h2 className="flex items-center justify-between border-b border-light-400 px-5 py-4 text-sm font-medium text-dark dark:border-dark-400 dark:text-light sm:px-7 sm:py-5 md:text-base">
          M-Pesa Number
        </h2>

        <div className="px-5 py-4 sm:px-7 sm:py-6">
          <Input
            id="mpesa-number"
            name="number"
            required={true}
            placeholder="07******** / 01********"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber((number) => {
                if (e.target.value.length > 10) return number;
                return e.target.value;
              })
            }
          />
        </div>
      </div>

      {/* Cart View */}
      <div className="bg-light shadow-card dark:bg-dark-250 dark:shadow-none">
        <h2 className="flex items-center justify-between border-b border-light-400 px-5 py-4 text-sm font-medium text-dark dark:border-dark-400 dark:text-light sm:px-7 sm:py-5 md:text-base">
          Your Order
          <span className="font-normal text-dark-700">
            ({getCartTotalCount()})
          </span>
        </h2>

        <div className="px-5 pt-9 sm:px-7 sm:pt-11">
          {!isEmpty ? (
            <CartItemList
              className="pl-3"
              cart={cart}
              removeFromCart={removeFromCart}
            />
          ) : (
            <>
              <CartEmpty />
              <div className="sticky bottom-11 z-[5] mt-10 border-t border-light-400 bg-light pb-7 pt-6 dark:border-dark-400 dark:bg-dark-250 sm:bottom-0 sm:mt-12 sm:pb-9 sm:pt-8">
                <Button
                  onClick={() => router.push("/")}
                  className="w-full md:h-[50px] md:text-sm"
                >
                  <LongArrowIcon className="h-4 w-4" />
                  404 Back Home
                </Button>
              </div>
            </>
          )}

          {!isEmpty && (
            <div className="sticky bottom-11 z-[5] mt-10 border-t border-light-400 bg-light pb-7 pt-6 dark:border-dark-400 dark:bg-dark-250 sm:bottom-0 sm:mt-12 sm:pb-9 sm:pt-8">
              <div className="mb-6 flex flex-col gap-3 text-dark dark:text-light sm:mb-7">
                <div className="flex justify-between">
                  <p>Sub Total</p>
                  <strong className="font-semibold">{totalPrice}</strong>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <strong className="font-semibold">
                    Calculated at checkout
                  </strong>
                </div>
              </div>
              <Button
                className="w-full md:h-[50px] md:text-sm"
                // onClick={handleCheckoutPayment}
                type="submit"
                isLoading={isLoading}
                usePending
              >
                Pay
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
function gentlyShowUnauthorisedUserOut() {
  throw new Error("Function not implemented.");
}
