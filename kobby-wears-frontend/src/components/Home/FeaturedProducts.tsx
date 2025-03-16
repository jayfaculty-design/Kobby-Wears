// src/components/FeaturedProducts.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useFetch from "@/customHooks/useFetch";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "../ui/skeleton";

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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [products, loading, errorMessage, fetchData] = useFetch<Product[]>(
    "https://kobby-wears.onrender.com/products"
  );

  // Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {}
  );
  const sizes = ["S", "M", "L", "XL"];

  // Initialize selected sizes when products load
  useEffect(() => {
    if (products && products.length > 0) {
      const featured = products.filter((product) => product.featured);
      setFeaturedProducts(featured);

      const initialSizes: Record<number, string> = {};
      featured.forEach((product) => {
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-primary-color hover:text-primary-color/80 font-medium transition-colors"
          >
            View all
          </Link>
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
      ) : featuredProducts.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No featured products available</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedSize={selectedSizes[product.id] || sizes[0]}
              onSizeChange={(size) => handleSizeChange(product.id, size)}
              sizes={sizes}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
