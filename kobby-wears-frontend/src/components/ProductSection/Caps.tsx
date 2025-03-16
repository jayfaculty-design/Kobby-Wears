// src/pages/Caps.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AlertCircle } from "lucide-react";
import useFetch from "@/customHooks/useFetch";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { useCart } from "@/contexts/useCart";

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
  const { error: cartError } = useCart();

  // Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {}
  );
  const sizes = ["S", "M", "L", "XL"];

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

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : caps.length > 0 ? (
          // Show products when loaded
          caps.map((cap) => (
            <ProductCard
              key={cap.id}
              product={cap}
              selectedSize={selectedSizes[cap.id] || sizes[0]}
              onSizeChange={(size) => handleSizeChange(cap.id, size)}
              sizes={sizes}
            />
          ))
        ) : (
          // Show message when no products found
          <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm">
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
      </div>
    </div>
  );
};

export default Caps;
