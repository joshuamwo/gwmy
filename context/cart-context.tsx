import { useContext, createContext, useState } from "react";
import { CartItem, Variant, Item } from "@/types";
import { useEffect } from "react";
import { CartContext } from "@/types";

const CartContext = createContext<CartContext | undefined>(undefined);

// use cart
export function useCart() {
  const cartcontext = useContext(CartContext);
  if (cartcontext === undefined) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return cartcontext;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState([] as CartItem[]);

  useEffect(() => {
    try {
      const localCart = localStorage.getItem("cart");
      const initialCart = localCart ? JSON.parse(localCart) : [];
      setCart(initialCart);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function getCartTotal() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getItemQuantity(itemId: string) {
    return (
      cart.find((cartItem) => cartItem.cartItemId === itemId)?.quantity ?? 0
    );
  }

  function increaseItemQuantity(item: CartItem) {
    setCart((cartItems) => {
      const cartItemExists = cartItems.find(
        (cartItem) => cartItem.cartItemId === item.cartItemId
      );

      if (cartItemExists) {
        return cartItems.map((cartItem) => {
          if (cartItem.cartItemId == item.cartItemId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            };
          }
          return cartItem;
        });
      }
      return [...cartItems, item];
    });
  }

  function decreseItemQuantity(cartItem: Item) {
    // setCart((cartItems) => {
    //   // find matching item by id where quantity == 1
    //   const itemIsOne = cartItems.find(
    //     (item) => item.id === cartItem.id && cartItem.quantity == 1
    //   );
    //   //  exists?
    //   if (itemIsOne) {
    //     // remove it
    //     return cartItems.filter((item) => item.id !== cartItem.id);
    //   }
    //   //else decrese item quantity and decrese the variation quantity
    //   return cartItems.map((item) => {
    //     if (item.id === cartItem.id) {
    //       // find matching item where variant is one
    //       const variantIsOne = item.variants.find(
    //         (variant) => variant.name && variant.quantity === 1
    //       );
    //       const newVariants: Variant[] = variantIsOne
    //         ? item.variants.filter(
    //             (variant) => variant.name !== cartItem.variant.name
    //           )
    //         : item.variants.map((variant) => {
    //             if (variant.name === cartItem.variant.name) {
    //               return {
    //                 ...variant,
    //                 quantity: variant.quantity - 1,
    //               };
    //             }
    //             return variant;
    //           });
    //       return {
    //         ...item,
    //         quantity: item.quantity - 1,
    //         variants: newVariants,
    //       };
    //     }
    //     return item;
    //   });
    // });
  }

  function removeFromCart(cartItem: Item) {
    setCart((cartItems) => {
      return cartItems.filter((item) => item.id !== cartItem.id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        getItemQuantity,
        increaseItemQuantity,
        decreseItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
