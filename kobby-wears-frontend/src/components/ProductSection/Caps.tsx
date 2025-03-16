import { useCart } from "@/contexts/useCart"; // Updated import path
import useFetch from "@/customHooks/useFetch";
import {
  CheckCircle2Icon,
  Loader2,
  ShoppingCartIcon,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
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

const Caps = () => {
  const [caps, setCaps] = useState<Product[]>([]);
  const [products, loading, errorMessage, fetchData] = useFetch<Product[]>(
    "https://kobby-wears.onrender.com/products"
  );

  // Get cart context with updated hook
  const {
    cartItems,
    addToCart,
    removeFromCart,
    loading: cartLoading,
    error: cartError,
  } = useCart();

  // Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {}
  );
  const sizes = ["S", "M", "L", "XL"];

  // Track loading state for individual products
  const [loadingProducts, setLoadingProducts] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Array.isArray(products)) {
      const allCaps = products.filter((product) => product.category === "Caps");
      setCaps(allCaps);

      // Initialize selected sizes for all products
      const initialSizes: Record<number, string> = {};
      allCaps.forEach((product) => {
        initialSizes[product.id] = sizes[0];
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

  // Add product to cart with selected size
  const handleAddToCart = async (product: Product) => {
    // Set loading state for this product
    setLoadingProducts((prev) => ({ ...prev, [product.id]: true }));

    try {
      const productWithSize = {
        ...product,
        size: selectedSizes[product.id] || sizes[0],
        quantity: 1,
      };
      await addToCart(productWithSize);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    } finally {
      // Clear loading state
      setLoadingProducts((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = async (product: Product) => {
    // Set loading state for this product
    setLoadingProducts((prev) => ({ ...prev, [product.id]: true }));

    try {
      await removeFromCart(product);
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    } finally {
      // Clear loading state
      setLoadingProducts((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-1 pb-10">
        <Link className="font-medium" to="/">
          Products
        </Link>
        <span>/</span>
        <p>Caps</p>
      </div>

      {/* Cart Error Message */}
      {cartError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
          <div className="flex items-center">
            <AlertCircle className="mr-2" size={18} />
            <span>{cartError}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-primary-color" />
        </div>
      )}

      {/* Error Message */}
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

      {/* Empty State */}
      {!loading && !errorMessage && caps.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No caps found
          </h3>
          <p className="mt-1 text-gray-500">
            Check back later for new arrivals.
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {caps.map((product) => {
          const inCart = cartItems.find(
            (cartItem) => cartItem.id === product.id
          );
          const isProductLoading = loadingProducts[product.id] || cartLoading;

          return (
            <div
              key={product.id}
              className="product-box bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative group h-48 sm:h-56">
                <Link to={`/products/${product.id}`}>
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.img_url}
                    alt={product.name}
                    loading="lazy"
                  />
                </Link>

                {!product.available && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Out of Stock
                  </div>
                )}
                {product.featured === true && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col">
                <div className="flex-grow">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded mb-2">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">
                    {product.name}
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
                      {typeof product.price === "number"
                        ? product.price.toFixed(2)
                        : product.price}
                    </span>
                    {product.price < 100 && (
                      <span className="ml-2 text-xs line-through text-gray-400">
                        ₵{(product.price * 1.2).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Styled Size Selector */}
                  <div className="relative">
                    <div className="text-xs text-neutral-500 mb-1">Size</div>
                    <div
                      className={`relative inline-block ${
                        !product.available || !!inCart || isProductLoading
                          ? "opacity-60"
                          : ""
                      }`}
                    >
                      <select
                        value={selectedSizes[product.id] || sizes[0]}
                        onChange={(e) =>
                          handleSizeChange(product.id, e.target.value)
                        }
                        disabled={
                          !product.available || !!inCart || isProductLoading
                        }
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
                            !product.available || !!inCart || isProductLoading
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
                      : product.available
                      ? "cursor-pointer bg-primary-color text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  } mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-md transition-all duration-200 hover:shadow-md ${
                    product.available && !inCart && !isProductLoading
                      ? "hover:bg-opacity-90 transform hover:translate-y-[-1px]"
                      : ""
                  } ${isProductLoading ? "opacity-70 cursor-wait" : ""}`}
                  disabled={!product.available || isProductLoading}
                  onClick={() => {
                    if (isProductLoading) return;
                    inCart
                      ? handleRemoveFromCart(product)
                      : handleAddToCart(product);
                  }}
                >
                  {isProductLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-1" />
                      Processing...
                    </>
                  ) : !product.available ? (
                    "Out of stock"
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

export default Caps;
