import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const total = cartItems.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  return (
    <div className="mt-20 p-5 pt-0 font-open-sans">
      {cartItems.length > 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium font-forum">
              Cart ({cartItems.length})
            </h1>
            {cartItems.length > 0 ? (
              <span
                onClick={() => clearCart()}
                className="font-forum underline underline-offset-1"
              >
                clear cart
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border-b border-gray-300 pb-5 pt-5 items-center justify-center gap-3"
              >
                <img src={item.img_url} alt="" />
                <p>{item.name}</p>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-black w-56 text-white p-1"
                >
                  Remove
                </button>

                <div className="w-56 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <p>Price:</p>
                    <p className="font-bold">₵{item.price}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Quantity:</p>
                    <div className="border mt-1 w-[130px] p-0 flex items-center rounded-sm justify-between">
                      <button
                        onClick={() => decreaseQuantity(item)}
                        className="w-10 cursor-pointer h-10 text-[18px]"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item)}
                        className="w-10 cursor-pointer h-10 text-[18px]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <div className="font-forum flex items-center justify-between">
              <h1 className="font-forum font-medium text-[20px]">
                Estimated Total:
              </h1>
              <span className="font-semibold">₵{total}</span>
            </div>
            <div className="flex flex-col mt-10 gap-4">
              <p className="text-gray-800 text-center text-[14px]">
                Taxes, discounts and shipping calculated at checkout
              </p>
              <button className="bg-yellow-200 h-12 rounded-md">
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex items-center justify-center flex-col gap-3">
          <p>Empty Cart</p>
          <Link
            to="/full-products/all-products"
            className="bg-black text-center w-64 p-1 text-white"
          >
            Check Collection
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
