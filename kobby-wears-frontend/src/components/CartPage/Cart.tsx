import { useCart } from "@/contexts/useCart";
import {
  X,
  Trash2,
  ShoppingBag,
  PlusCircleIcon,
  MinusCircleIcon,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increment, decrement } =
    useCart();

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0 as number
    );
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="pb-7 flex items-center justify-between border-b border-neutral-200">
        <h1 className="font-medium text-xl md:text-2xl lg:text-3xl flex items-center gap-2">
          <ShoppingBag className="hidden sm:inline-block" />
          Shopping Bag
          <span className="text-neutral-500">
            ({cartItems.length === 0 ? "Empty" : cartItems.length})
          </span>
        </h1>
        {cartItems.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors px-3 py-1 rounded-md hover:bg-red-50"
          >
            <X size={18} />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="bg-neutral-100 p-6 rounded-full mb-4">
            <ShoppingBag size={40} className="text-neutral-400" />
          </div>
          <p className="text-lg text-neutral-600 mb-2">
            Your Shopping bag is empty
          </p>
          <p className="text-neutral-500 mb-6 max-w-md">
            Browse our collection and discover amazing products just for you
          </p>
          <Link
            to="/"
            className="mt-4 bg-black text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition-all transform hover:scale-105 shadow-md"
          >
            Shop our products
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <div className="space-y-6 md:space-y-8">
            {cartItems.map((product, index: number) => (
              <div
                key={`${product.id}-${index}`}
                className="flex flex-col sm:flex-row gap-5 items-start sm:items-center border-b border-neutral-200 pb-6"
              >
                <div className="w-full sm:w-1/4 md:w-1/5 aspect-square bg-neutral-50 rounded-md overflow-hidden">
                  <img
                    src={product.img_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col gap-3 w-full sm:w-3/4 md:w-4/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-xl font-semibold mt-1">
                        ₵{product.price}
                      </p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => removeFromCart(product)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-neutral-600 mt-2">
                    <div className="bg-neutral-50 px-3 py-2 rounded">
                      <span className="block text-xs text-neutral-500">
                        Size
                      </span>
                      <span className="font-medium">
                        {product.size || "Standard"}
                      </span>
                    </div>
                    <div className="bg-neutral-50 px-3 py-2 rounded">
                      <span className="block text-xs text-neutral-500">
                        Color
                      </span>
                      <span className="font-medium">
                        {product.color || "Default"}
                      </span>
                    </div>
                    <div className="bg-neutral-50 px-3 py-2 rounded flex gap-3">
                      <button
                        onClick={() => decrement(product)}
                        className="cursor-pointer"
                      >
                        <MinusCircleIcon />
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => increment(product)}
                      >
                        <PlusCircleIcon />
                      </button>
                    </div>
                    <div className="bg-neutral-50 px-3 py-2 rounded">
                      <span className="block text-xs text-neutral-500">
                        Quantity
                      </span>
                      <span className="font-medium">{product.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-neutral-50 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between text-lg mb-2">
              <p className="text-neutral-600">Subtotal</p>
              <p className="font-semibold">₵{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm mb-6 text-neutral-500">
              <p>Shipping</p>
              <p>Calculated at checkout</p>
            </div>
            <button className="w-full cursor-pointer bg-black text-white py-4 rounded-md font-medium hover:bg-neutral-800 transition-all transform hover:scale-[1.01] shadow-md">
              Proceed to checkout
            </button>
            <Link
              to="/"
              className="block text-center mt-4 text-neutral-600 hover:text-black transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
