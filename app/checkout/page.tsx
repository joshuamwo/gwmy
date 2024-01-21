"use client";

import CartEmpty from "@/components/cart/cart-empty";
import CartItemList from "@/components/cart/cart-item-list";
import Input from "@/components/forms/input";
import { LongArrowIcon } from "@/components/icons/long-arrow-icon";
import Button from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const { getCartTotalCount, getCartTotalPrice, cart, removeFromCart } =
    useCart();

  const isEmpty = getCartTotalCount() === 0;
  const totalPrice = getCartTotalPrice();

  function handleCheckoutPayment() {
    console.log("handleCheckoutPayment");
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col p-4 pt-6 sm:p-5 sm:pt-8 md:pt-10 3xl:pt-12">
      {/* Mpesa Number */}

      <div className="mb-4 bg-light shadow-card dark:bg-dark-250 dark:shadow-none md:mb-5 3xl:mb-6">
        <h2 className="flex items-center justify-between border-b border-light-400 px-5 py-4 text-sm font-medium text-dark dark:border-dark-400 dark:text-light sm:py-5 sm:px-7 md:text-base">
          M-Pesa Number
        </h2>

        <div className="px-5 py-4 sm:py-6 sm:px-7">
          <Input
            id="mpesa-number"
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
        <h2 className="flex items-center justify-between border-b border-light-400 px-5 py-4 text-sm font-medium text-dark dark:border-dark-400 dark:text-light sm:py-5 sm:px-7 md:text-base">
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
              <div className="sticky bottom-11 z-[5] mt-10 border-t border-light-400 bg-light pt-6 pb-7 dark:border-dark-400 dark:bg-dark-250 sm:bottom-0 sm:mt-12 sm:pt-8 sm:pb-9">
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
            <div className="sticky bottom-11 z-[5] mt-10 border-t border-light-400 bg-light pt-6 pb-7 dark:border-dark-400 dark:bg-dark-250 sm:bottom-0 sm:mt-12 sm:pt-8 sm:pb-9">
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
                onClick={handleCheckoutPayment}
                isLoading={isLoading}
              >
                Pay
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
