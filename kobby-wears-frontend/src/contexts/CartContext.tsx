import { createContext, useState } from "react";

interface CartContextType {
  cartItems: {
    id: number;
    price: number;
    quantity: number;
    img_url: string;
    name: string;
    size: string;
    color: string;
  }[];
  addToCart: (product: {
    id: number;
    price: number;
    img_url: string;
    name: string;
    size: string;
    color: string;
  }) => void;
  removeFromCart: (product: { id: number }) => void;
  setCartItems: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        price: number;
        quantity: number;
        img_url: string;
        name: string;
        size: string;
        color: string;
      }[]
    >
  >;
  increment: (product: {
    id: number;
    price: number;
    img_url: string;
    name: string;
    size: string;
    color: string;
  }) => void;
  decrement: (product: { id: number }) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

import { ReactNode } from "react";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      price: number;
      quantity: number;
      img_url: string;
      name: string;
      size: string;
      color: string;
    }[]
  >([]);

  function addToCart(item: {
    id: number;
    price: number;
    img_url: string;
    name: string;
    size: string;
    color: string;
  }) {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
  function removeFromCart(item: { id: number }) {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  }
  function clearCart() {
    setCartItems([]);
  }
  function increment(item: {
    id: number;
    price: number;
    img_url: string;
    name: string;
    size: string;
    color: string;
  }) {
    let inCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (inCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  }
  function decrement(item: { id: number }) {
    const inCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (inCart && inCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        )
      );
    }
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
