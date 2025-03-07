import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import useFetch from "../customHooks/useFetch";
import { WishListContext } from "../contexts/WishListContext";
import { CartContext } from "../contexts/CartContext";
import { motion } from "motion/react";

const ProductDetails = () => {
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { addToWishList, removeFromList, wishLists } =
    useContext(WishListContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [products] = useFetch(`http://localhost:3001/products`);
  return (
    <div className="mt-20 p-5">
      <div className="flex justify-center gap-5">
        {products.map((product) => {
          let isInCart = cartItems.find((item) => item.id === product.id);
          if (product.id === parseFloat(id)) {
            return (
              <div className="" key={product.id}>
                <img className="mx-auto" src={product.img_url} alt="" />
                <p className="text-2xl">{product.name}</p>
                <p className="text-[16px] mt-2">₵{product.price}</p>
                {/* <p>{product.description}</p> */}
                <div className="mt-5 flex gap-2">
                  <p className="text-gray-500">Color:</p>
                  <span className="text-gray-500">{product.color}</span>
                </div>
                {isInCart ? (
                  <div className="border w-full p-0 mt-5 flex items-center rounded-sm justify-between">
                    <button
                      onClick={() => decreaseQuantity(product)}
                      className="w-10 cursor-pointer h-10 text-[18px]"
                    >
                      -
                    </button>
                    <span>{isInCart.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(product)}
                      className="w-10 cursor-pointer h-10 text-[18px]"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{
                      scale: 1.1,
                    }}
                    onClick={() => addToCart(product)}
                    className="cursor-pointer rounded-sm border w-full text-center p-2 mt-5"
                  >
                    Add to cart
                  </motion.button>
                )}

                {wishLists.find((list) => list.id === product.id) ? (
                  <motion.button
                    whileTap={{
                      scale: 1.1,
                    }}
                    onClick={() => removeFromList(product)}
                    className="cursor-pointer rounded-sm border w-full text-center p-2 mt-3 text-white bg-black"
                  >
                    Remove from wishlist
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{
                      scale: 1.1,
                    }}
                    onClick={() => addToWishList(product)}
                    className="cursor-pointer rounded-sm border w-full text-center p-2 mt-3 text-white bg-black"
                  >
                    Add to WishList
                  </motion.button>
                )}

                <p className="flex mt-5 text-gray-600">{product.description}</p>
              </div>
            );
          }
        })}
      </div>

      <h1 className="font-forum text-2xl mt-10">Related Products</h1>
      <div>
        {products.map((product) => {
          if (product.category === id.category) {
            <div>
              <img src={product.img_url} alt="" />
            </div>;
          }
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
