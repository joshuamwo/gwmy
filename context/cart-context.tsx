import { useContext, createContext, useState } from "react";

interface CartContext {
  cart: CartItem[];
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (item: Item) => void;
  // decreseItemQuantity: (item: CartItem) => void;
  // removeFromCart: (item: CartItem) => void;
}

interface CartItem {
  id: string;
  quantity: number;
  variants: Variant[];
}

interface Item {
  id: string;
  quantity: number;
  variant: Variant;
}

type Variant = {
  name: string;
  quantity: number;
};

const CartContext = createContext<CartContext | undefined>(undefined);

// use cart
export function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <CartContext.Provider
      value={{
        cart,
        getItemQuantity,
        increaseItemQuantity,
        // decreseItemQuantity,
        // removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
