import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const alreadInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (alreadInCart) {
      setCartItems(
        cartItems.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  const increaseQuantity = (item) => {
    const alreadInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (alreadInCart) {
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
    }
  };
  const decreaseQuantity = (item) => {
    const alreadInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (alreadInCart.quantity === 1) {
      setCartItems(cartItems.filter((product) => product.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  };
  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((product) => item.id !== product.id));
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
