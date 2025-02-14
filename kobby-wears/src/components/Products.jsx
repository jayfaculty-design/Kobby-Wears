import React, { useContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
import {
  IconArrowsRight,
  IconCheck,
  IconHeart,
  IconShoppingBag,
} from "@tabler/icons-react";
import { NavLink, Link } from "react-router";
import { motion } from "motion/react";
import { CartContext } from "../contexts/CartContext";
import { WishListContext } from "../contexts/WishListContext";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Products = () => {
  const [products, errorMessage, loading, fetchData] = useFetch(
    "http://localhost:3001/products"
  );
  const { addToCart, cartItems, decreaseQuantity, increaseQuantity } =
    useContext(CartContext);
  const { addToWishList, removeFromList, wishLists } =
    useContext(WishListContext);

  return (
    <div className="font-body-font mt-32 pl-5 pr-5">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <h1 className="text-2xl lg:text-4xl font-medium font-forum">
        Featured Products
      </h1>
      <div className="grid gap-5 mt-5  pb-5">
        <div
          className={`${
            products.length > 0 ? "hidden h-[0vh]" : "h-[30vh]"
          } flex items-center justify-center`}
        >
          {loading && (
            <div>
              <img
                className="w-12 place-self-center"
                src="/loading.svg"
                alt="loading"
              />
            </div>
          )}
          {errorMessage && (
            <div className="flex flex-col gap-3">
              <p className="text-center">{errorMessage}</p>
              <button
                onClick={() => fetchData()}
                className="border cursor-pointer p-1 w-64 rounded-md bg-black text-white font-bold"
              >
                Refresh
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-3 sm:gap-10">
          {products.map((product) => {
            if (product.featured === true) {
              const cartItem = cartItems.find((item) => item.id === product.id);
              const wishItem = wishLists.find((item) => item.id === product.id);
              return (
                <Link
                  className="bg-grey flex rounded-md h-72 pb-5 pt-5 flex-col justify-center items-center p-2 font-open-sans"
                  key={product.id}
                >
                  <div className="relative">
                    <Link to={`/product-details/${product.id}`}>
                      <img
                        className="w-fit sm:w-24"
                        src={product.img_url}
                        alt=""
                      />
                    </Link>
                    {product.available === true ? (
                      <p className="absolute top-0 -left-10 bg-black text-white w-14 flex rounded-xl justify-center">
                        sale
                      </p>
                    ) : (
                      "out of stock"
                    )}
                    {wishLists.find((list) => list.id === product.id) ? (
                      <IconHeart
                        onClick={() => removeFromList(product)}
                        className={`absolute top-0 fill-black -right-10 bg-white p-1 rounded-full`}
                      />
                    ) : (
                      <IconHeart
                        onClick={() => addToWishList(product)}
                        className={`absolute top-0 -right-10 bg-white p-1 rounded-full`}
                      />
                    )}
                  </div>
                  <div className="mt-3 flex gap-5 sm:flex-col sm:items-center">
                    <p className="sm:text-center">{product.name}</p>
                    <p className="font-semibold text-rose-500">
                      ₵{product.price}
                    </p>
                  </div>
                  {cartItem ? (
                    <div className="border mt-1 w-[180px] sm:w-32 p-0 flex items-center rounded-sm justify-between">
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
                    <motion.button
                      onClick={() => {
                        addToCart(product);
                        toast.success("Added to cart", {
                          position: "top-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          transition: Bounce,
                        });
                      }}
                      whileTap={{
                        scale: 1.1,
                      }}
                      className="bg-black sm:w-32 w-52 mt-3 flex justify-center items-center  gap-2 text-white font-bold p-2"
                    >
                      Add To Cart
                      <IconShoppingBag className="sm:hidden" />
                    </motion.button>
                  )}
                </Link>
              );
            }
          })}
        </div>

        <div className="pb-5 flex mt-5 items-center justify-center">
          {products.length > 0 ? (
            <NavLink
              to="full-products/all-products"
              className="bg-black text-white text-center w-30 p-1"
            >
              View All
            </NavLink>
          ) : (
            <p className="italic">check your connection</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
