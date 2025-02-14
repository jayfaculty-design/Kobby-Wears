import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishLists, setWishLists] = useState(() => {
    const savedItems = localStorage.getItem("wishLists");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishLists", JSON.stringify(wishLists));
  }, [wishLists]);
  const addToWishList = (item) => {
    const alreadyInList = wishLists.find((wishList) => wishList.id === item.id);
    if (alreadyInList) {
      setWishLists(
        wishLists.map((product) =>
          product.id === item.id ? { ...product } : product
        )
      );
    } else {
      setWishLists([...wishLists, { ...item }]);
    }
  };
  const removeFromList = (item) => {
    setWishLists(wishLists.filter((list) => list.id !== item.id));
  };
  const clearList = () => {
    setWishLists([]);
  };
  return (
    <WishListContext.Provider
      value={{ addToWishList, wishLists, removeFromList, clearList }}
    >
      {children}
    </WishListContext.Provider>
  );
};
