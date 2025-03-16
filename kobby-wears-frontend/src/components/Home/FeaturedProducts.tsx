import useFetch from "@/customHooks/useFetch";
import { Skeleton } from "../ui/skeleton";
import { CheckCircle2Icon, ShoppingCartIcon, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/contexts/CartContext";

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

const FeaturedProducts = () => {
  const [products, errorMessage, loading, fetchData] = useFetch<Product[]>(
    "http://localhost:3001/products"
  );

  // Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {}
  );
  const sizes = ["S", "M", "L", "XL"];

  // Initialize selected sizes when products load
  useEffect(() => {
    if (products && products.length > 0) {
      const initialSizes: Record<number, string> = {};
      products.forEach((product) => {
        if (product.featured) {
          initialSizes[product.id] = sizes[0];
        }
      });
      setSelectedSizes(initialSizes);
    }
  }, [products]);

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return <div>Error: Cart context is not available.</div>;
  }
  const { addToCart, removeFromCart, cartItems } = cartContext;

  // Handle size change for a specific product
  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  // Add product to cart with selected size
  const handleAddToCart = (product: Product) => {
    const productWithSize = {
      ...product,
      size: selectedSizes[product.id] || sizes[0],
      quantity: 1,
    };
    addToCart(productWithSize);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4 h-80">
              <Skeleton className="h-48 w-full rounded-md mb-4" />
              <Skeleton className="h-6 w-3/4 rounded mb-2" />
              <Skeleton className="h-6 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p>Error: {errorMessage}</p>
          <button
            className="mt-2 cursor-pointer px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-red-800"
            onClick={() => fetchData()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: Product) => {
            const inCart = cartItems.find(
              (cartItem) => cartItem.id === product.id
            );
            return product.featured === true ? (
              <div
                className="product-box border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                key={product.id}
              >
                <Link to={`/products/${product.id}`}>
                  <div className="h-48 cursor-pointer overflow-hidden">
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      src={product.img_url}
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="p-4">
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

                  <div className="flex justify-between items-center mt-2">
                    <h3 className="text-primary-color font-bold">
                      ₵
                      {typeof product.price === "number"
                        ? product.price.toFixed(2)
                        : product.price}
                    </h3>

                    {/* Styled Size Selector */}
                    <div className="relative">
                      <div className="text-xs text-neutral-500 mb-1">Size</div>
                      <div
                        className={`relative inline-block ${
                          !product.available || !!inCart ? "opacity-60" : ""
                        }`}
                      >
                        <select
                          value={selectedSizes[product.id] || sizes[0]}
                          onChange={(e) =>
                            handleSizeChange(product.id, e.target.value)
                          }
                          disabled={!product.available || !!inCart}
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
                              !product.available || !!inCart
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
                    disabled={!product.available}
                    onClick={() =>
                      inCart
                        ? removeFromCart(product)
                        : handleAddToCart(product)
                    }
                    className={`mt-4 ${
                      inCart
                        ? "bg-black text-white hover:bg-neutral-800"
                        : product.available === false
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-primary-color text-white hover:bg-opacity-90 transform hover:translate-y-[-1px]"
                    } w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-md transition-all duration-200 hover:shadow-md`}
                  >
                    {!product.available ? (
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
            ) : null;
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
