import React, { useContext } from "react";
import { WishListContext } from "../contexts/WishListContext";
import useFetch from "../customHooks/useFetch";
import { Link } from "react-router";
import { CartContext } from "../contexts/CartContext";

const WishList = () => {
  const { wishLists, removeFromList, clearList } = useContext(WishListContext);
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className="font-body-font mt-20 p-5 pt-0">
      {wishLists.length > 0 ? (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium font-forum">WishLists</h1>
          {wishLists.length > 0 ? (
            <span
              onClick={() => clearList()}
              className="font-forum underline underline-offset-1"
            >
              clear wishlists
            </span>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="h-[50vh] flex items-center justify-center flex-col gap-3">
          <p>Empty WishList</p>
          <Link
            to="/full-products/all-products"
            className="bg-black text-center w-64 p-1 text-white"
          >
            Check Collection
          </Link>
        </div>
      )}
      <div>
        {wishLists.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="flex flex-col mt-5 border-b border-gray-300 pb-5"
            >
              <Link to={`/product-details/${product.id}`}>
                <img
                  className="place-self-center"
                  src={product.img_url}
                  alt=""
                />
              </Link>
              <p className="text-2xl">{product.name}</p>
              <p className="text-[16px] mt-2">₵{product.price}</p>
              {cartItem ? (
                <div className="border mt-5 w-full p-0 flex items-center rounded-sm justify-between">
                  <button
                    onClick={() => decreaseQuantity(product)}
                    className="w-10 cursor-pointer h-10 text-[18px]"
                  >
                    -
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product)}
                    className="w-10 cursor-pointer h-10 text-[18px]"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="cursor-pointer rounded-sm border w-full text-center p-2 mt-5"
                >
                  Add to cart
                </button>
              )}
              <button
                onClick={() => removeFromList(product)}
                className="cursor-pointer bg-black text-white rounded-sm border w-full text-center p-2 mt-2"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
