import { useContext, createContext, useState } from "react";
import { CartItem, Variant, Item } from "@/types";

interface CartContext {
  cart: CartItem[];
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (item: Item) => void;
  decreseItemQuantity: (item: Item) => void;
  removeFromCart: (item: Item) => void;
}

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

  function getItemQuantity(id: string) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(cartItem: Item) {
    setCart((items) => {
      const cartItemExists = items.find((item) => item.id === cartItem.id);

      if (!cartItemExists) {
        const newItem: CartItem = {
          id: cartItem.id,
          quantity: cartItem.quantity,
          variants: [cartItem.variant],
        };

        return [...items, newItem];
      }

      return items.map((item) => {
        if (item.id === cartItem.id) {
          const existingVariant = item.variants.find(
            (variant) => variant.name === cartItem.variant.name
          );

          if (!existingVariant) {
            return {
              ...item,
              quantity: item.quantity + cartItem.quantity,
              variants: [
                ...item.variants,
                { name: cartItem.variant.name, quantity: 1 },
              ],
            };
          }

          return {
            ...item,
            quantity: item.quantity + cartItem.quantity,
            variants: item.variants.map((variant) =>
              variant.name === cartItem.variant.name
                ? {
                    name: variant.name,
                    quantity: variant.quantity + cartItem.quantity,
                  }
                : variant
            ),
          };
        }

        return item;
      });
    });
  }

  function decreseItemQuantity(cartItem: Item) {
    setCart((cartItems) => {
      // find matching item by id where quantity == 1
      const itemIsOne = cartItems.find(
        (item) => item.id === cartItem.id && cartItem.quantity == 1
      );

      //  exists?
      if (itemIsOne) {
        // remove it
        return cartItems.filter((item) => item.id !== cartItem.id);
      }

      //else decrese item quantity and decrese the variation quantity
      return cartItems.map((item) => {
        if (item.id === cartItem.id) {
          // find matching item where variant is one
          const variantIsOne = item.variants.find(
            (variant) => variant.name && variant.quantity === 1
          );

          const newVariants: Variant[] = variantIsOne
            ? item.variants.filter(
                (variant) => variant.name !== cartItem.variant.name
              )
            : item.variants.map((variant) => {
                if (variant.name === cartItem.variant.name) {
                  return {
                    ...variant,
                    quantity: variant.quantity - 1,
                  };
                }
                return variant;
              });

          return {
            ...item,
            quantity: item.quantity - 1,
            variants: newVariants,
          };
        }

        return item;
      });
    });
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
