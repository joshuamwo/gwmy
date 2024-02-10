import { classnames } from "@/utils/classnames";
import Button from "../ui/button";
import { Product } from "@/types";
import { useContext, useState } from "react";
import { useCart } from "@/context/cart-context";
import { CartItem } from "@/types";
import { userContext } from "@/context/supabase-context";
import toast from "react-hot-toast";
import { SuccessIcon } from "../icons/success-icon";

interface AddToCartProps {
  className?: string;
  item: Product;
  quantity: number;
  toastClassName?: string;
  selectedColor: string;
  selectedSize: string;
  disabled?: boolean;
}

export default function AddToCart({
  className,
  item,
  quantity,
  selectedColor,
  selectedSize,
  toastClassName,
  disabled,
}: AddToCartProps) {
  const [cartingSuccess, setCartingSuccess] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);

  const cart = useCart();
  const user = userContext();

  function handleAddToCart() {
    const cartItem: CartItem = {
      cartItemId: item.id + selectedColor + selectedSize,
      id: item.id,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      price: item.price,
      image: item.image_urls[0],
      name: item.product_name,
    };

    try {
      setAddToCartLoader(true);
      cart.increaseItemQuantity(cartItem);
      setTimeout(() => {
        setAddToCartLoader(false);
        successfullCarting();
      }, 650);
    } catch (error) {
      cart.increaseItemQuantity(cartItem);
      setTimeout(() => {
        setAddToCartLoader(false);
        unsuccessfullCarting();
      }, 650);
    }
  }

  function successfullCarting() {
    setCartingSuccess(true);
    toast.success("Item added to cart", {
      className: toastClassName,
    });

    setTimeout(() => {
      setCartingSuccess(false);
    }, 800);
  }

  function unsuccessfullCarting() {
    toast.error("Carting Failed. Please try again!", {
      className: toastClassName,
    });
  }

  return (
    <Button
      disabled={disabled}
      onClick={() => handleAddToCart()}
      isLoading={addToCartLoader}
      success={cartingSuccess}
      className={classnames("relative", className)}
    >
      Add to Bag Ksh.{item.price}
      {/* <SuccessIcon className="right-3 h-auto w-5 xs:right-4 xs:w-6" /> */}
    </Button>
  );
}
