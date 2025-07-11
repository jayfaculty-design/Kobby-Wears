
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useProducts } from "@/customHooks/useProducts";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

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
  const { products, loading, error, refetch } = useProducts();

  // Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {}
  );
  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Array.isArray(products)) {
      const allHoodies = products.filter(
        (product) => product.category === "Hoodies"
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

  return (
    <div className="p-4">
      <div className="flex gap-1 pb-10">
        <Link className="font-medium" to="/">
          Products
        </Link>
        <span>/</span>
        <p>Hoodies</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
          <p>Unable to load products: {error}</p>
          <button
            onClick={() => refetch()}
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-bold py-1 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : hoodies.length > 0 ? (
          // Show products when loaded
          hoodies.map((hoodie) => (
            <ProductCard
              key={hoodie.id}
              product={hoodie}
              selectedSize={selectedSizes[hoodie.id] || sizes[0]}
              onSizeChange={(size) => handleSizeChange(hoodie.id, size)}
              sizes={sizes}
            />
          ))
        ) : (
          // Show message when no products found
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-500">No hoodies found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hoodies;
