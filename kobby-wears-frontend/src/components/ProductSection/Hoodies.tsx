import { CartContext } from "@/contexts/CartContext";
import useFetch from "@/customHooks/useFetch";
import {
  CheckCircle2Icon,
  Loader2,
  ShoppingCartIcon,
  ChevronDown,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category?: string;
  img_url: string;
  available: boolean;
  featured: boolean;
  color: string;
  size?: string;
  quantity?: number;
}

const Hoodies = () => {
  const [hoodies, setHoodies] = useState<Product[]>([]);
  const [products, loading, errorMessage, fetchData] = useFetch<Product[]>(
    "https://kobby-wears.onrender.com/products"
  );
  const [addingToCart, setAddingToCart] = useState<Record<number, boolean>>({});

  // Get cart context
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { cartItems, addToCart, removeFromCart } = cartContext;

  // Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {}
  );
  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Array.isArray(products)) {
      const allHoodies = products.filter(
        (hoodie) => hoodie.category === "Hoodies"
      );
      setHoodies(allHoodies);

      // Initialize selected sizes for all products
      const initialSizes: Record<number, string> = {};
      allHoodies.forEach((hoodie) => {
        initialSizes[hoodie.id] = sizes[0];
      });
      setSelectedSizes(initialSizes);
    }
  }, [products]);

  // Handle size change for a specific product
  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  // Check if product is in cart
  const isInCart = (productId: number) => {
    return cartItems.some((item) => item.product_id === productId);
  };

  // Get cart item by product id
  const getCartItem = (productId: number) => {
    return cartItems.find((item) => item.product_id === productId);
  };

  // Add product to cart with selected size
  const handleAddToCart = async (product: Product) => {
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));

    try {
      const productWithSize = {
        ...product,
        size: selectedSizes[product.id] || sizes[0],
        quantity: 1,
      };

      if (isInCart(product.id)) {
        const cartItem = getCartItem(product.id);
        if (cartItem) {
          await removeFromCart({ id: cartItem.id });
        }
      } else {
        await addToCart(productWithSize);
      }
    } catch (error) {
      console.error("Error managing cart:", error);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-1 pb-10">
        <Link className="font-medium" to="/">
          Products
        </Link>
        <span>/</span>
        <p>Hoodies</p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-primary-color" />
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
          <p>Unable to load products: {errorMessage}</p>
          <button
            onClick={() => fetchData()}
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-bold py-1 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hoodies.map((hoodie) => {
          const inCart = isInCart(hoodie.id);
          const isAdding = addingToCart[hoodie.id] || false;

          return (
            <div
              key={hoodie.id}
              className="product-box bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative group h-48 sm:h-56">
                <Link to={`/products/${hoodie.id}`}>
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={hoodie.img_url}
                    alt={hoodie.name}
                    loading="lazy"
                  />
                </Link>

                {!hoodie.available && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
                {hoodie.featured === true && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col">
                <div className="flex-grow">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded mb-2">
                    {hoodie.category}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">
                    {hoodie.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-primary-color">
                      ₵
                      {typeof hoodie.price === "number"
                        ? hoodie.price.toFixed(2)
                        : hoodie.price}
                    </span>
                    {hoodie.price < 100 && (
                      <span className="ml-2 text-xs line-through text-gray-400">
                        ₵{(hoodie.price * 1.2).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Styled Size Selector */}
                  <div className="relative">
                    <div className="text-xs text-neutral-500 mb-1">Size</div>
                    <div
                      className={`relative inline-block ${
                        !hoodie.available || !!inCart ? "opacity-60" : ""
                      }`}
                    >
                      <select
                        value={selectedSizes[hoodie.id] || sizes[0]}
                        onChange={(e) =>
                          handleSizeChange(hoodie.id, e.target.value)
                        }
                        disabled={!hoodie.available || !!inCart}
                        className={`
                          appearance-none
                          bg-neutral-50
                          border
                          ${
                            inCart
                              ? "border-black"
                              : "border-neutral-200 hover:border-neutral-400"
                          }
                          rounded-md
                          py-1.5
                          pl-3
                          pr-8
                          text-sm
                          font-medium
                          focus:outline-none
                          focus:ring-2
                          focus:ring-primary-color
                          focus:border-transparent
                          cursor-pointer
                          transition-all
                          duration-200
                          ${
                            !hoodie.available || !!inCart
                              ? "cursor-not-allowed"
                              : ""
                          }
                        `}
                      >
                        {sizes.map((size, index) => (
                          <option key={index} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className={`${
                    inCart
                      ? "bg-black text-white"
                      : hoodie.available
                      ? "cursor-pointer bg-primary-color text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  } mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-md transition-all duration-200 hover:shadow-md ${
                    hoodie.available && !inCart && !isAdding
                      ? "hover:bg-opacity-90 transform hover:translate-y-[-1px]"
                      : ""
                  }`}
                  disabled={!hoodie.available || isAdding}
                  onClick={() => handleAddToCart(hoodie)}
                >
                  {!hoodie.available ? (
                    "Out of stock"
                  ) : isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {inCart ? "Removing..." : "Adding..."}
                    </>
                  ) : inCart ? (
                    <>
                      <CheckCircle2Icon className="h-4 w-4" />
                      Added to cart
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="h-4 w-4" />
                      Add to cart
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hoodies;
