import React, { useContext, useEffect } from "react";
import useFetch from "../customHooks/useFetch";
import { IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { Link } from "react-router";
import { CartContext } from "../contexts/CartContext";
import { WishListContext } from "../contexts/WishListContext";
import { motion } from "motion/react";
const AllProducts = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const { addToWishList, removeFromList, wishLists } =
    useContext(WishListContext);
  const [products, errorMessage, loading] = useFetch(
    "http://localhost:3001/products"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3 sm:gap-10 mt-36">
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
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          return (
            <div
              className="bg-grey flex rounded-md h-72 pb-5 pt-5 flex-col justify-center items-center p-2 font-open-sans"
              key={product.id}
            >
              <div className="relative">
                <Link to={`/product-details/${product.id}`}>
                  <img className="w-fit" src={product.img_url} alt="" />
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
              <div className="mt-3 flex gap-5">
                <p>{product.name}</p>
                <p className="font-semibold text-rose-500">₵{product.price}</p>
              </div>
              {cartItem ? (
                <div className="border mt-1 w-[180px] p-0 flex items-center rounded-sm justify-between">
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
                  onClick={() => addToCart(product)}
                  whileTap={{
                    scale: 1.1,
                  }}
                  className="bg-black w-52 mt-3 flex justify-center items-center  gap-2 text-white font-bold p-2"
                >
                  Add To Cart
                  <IconShoppingBag />
                </motion.button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
