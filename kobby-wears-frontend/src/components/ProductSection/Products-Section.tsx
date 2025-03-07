import useFetch from "@/customHooks/useFetch";
import { HeartIcon, ShoppingCartIcon, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

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
}

const ProductsSection = () => {
  const [products, errorMessage, loading, fetchData] = useFetch<Product[]>(
    "http://localhost:3001/products"
  );
  const [selectedTab, setSelectedTab] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isGridView, setIsGridView] = useState(true);

  // Extract unique categories
  const categories = React.useMemo(() => {
    if (!products || !products.length) return ["All"];
    return [
      "All",
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ];
  }, [products]);

  // Filter products based on category
  useEffect(() => {
    if (!products) return;

    let filtered = [...products];
    if (selectedTab !== "All") {
      filtered = filtered.filter((product) => product.category === selectedTab);
    }

    setFilteredProducts(filtered);
  }, [selectedTab, products]);

  // Toggle favorite status
  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Best Selling Products
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded ${
                isGridView ? "bg-primary-color text-white" : "bg-gray-200"
              }`}
              aria-label="Grid view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded ${
                !isGridView ? "bg-primary-color text-white" : "bg-gray-200"
              }`}
              aria-label="List view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 space-x-2 pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedTab(category || "")}
                className={`
                  px-4 py-2 cursor-pointer text-sm md:text-base whitespace-nowrap rounded-full transition-all
                  ${
                    selectedTab === category
                      ? "bg-primary-color text-white font-medium shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-primary-color" />
          </div>
        )}

        {/* Error State */}
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
        {!loading && !errorMessage && filteredProducts.length === 0 && (
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
              No products found
            </h3>
            <p className="mt-1 text-gray-500">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* Products Grid/List View */}
        {!loading && !errorMessage && filteredProducts.length > 0 && (
          <div
            className={
              isGridView
                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "flex flex-col space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`product-box bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  !isGridView ? "flex flex-col md:flex-row" : ""
                }`}
              >
                <div
                  className={`relative group ${
                    !isGridView ? "md:w-1/3" : "h-48 sm:h-56"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.img_url || "/placeholder-product.jpg"}
                    alt={product.name}
                  />
                  {!product.available && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Out of Stock
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>

                <div
                  className={`p-4 flex flex-col ${
                    !isGridView ? "md:w-2/3" : ""
                  }`}
                >
                  <div className="flex-grow">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    {!isGridView && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
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
                          ₵{product.price * 1.2}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={
                        favorites.includes(product.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <HeartIcon
                        className={`h-5 w-5 ${
                          favorites.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    disabled={!product.available}
                    className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded transition-colors ${
                      product.available
                        ? "bg-primary-color hover:bg-black text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    {product.available ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (Optional) */}
        {filteredProducts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-primary-color text-white">
                1
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
