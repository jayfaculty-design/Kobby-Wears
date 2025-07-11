
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useFetch from "@/customHooks/useFetch";
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

const Jeans = () => {
  const [jeans, setJeans] = useState<Product[]>([]);
  const [products, loading, errorMessage, fetchData] = useFetch<Product[]>(
    "https://kobby-wears.onrender.com/products"
  );

  // Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {}
  );
  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Array.isArray(products)) {
      const allJeans = products.filter(
        (product) => product.category === "Jeans"
      );
      setJeans(allJeans);

      // Initialize selected sizes for all products
      const initialSizes: Record<number, string> = {};
      allJeans.forEach((jean) => {
        initialSizes[jean.id] = sizes[0];
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
        <p>Jeans</p>
      </div>

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
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : jeans.length > 0 ? (
          // Show products when loaded
          jeans.map((jean) => (
            <ProductCard
              key={jean.id}
              product={jean}
              selectedSize={selectedSizes[jean.id] || sizes[0]}
              onSizeChange={(size) => handleSizeChange(jean.id, size)}
              sizes={sizes}
            />
          ))
        ) : (
          // Show message when no products found
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-500">No jeans found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jeans;
