import useFetch from "@/customHooks/useFetch";
import { Skeleton } from "../ui/skeleton";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";

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

const FeaturedProducts = () => {
  const [products, errorMessage, loading, fetchData] = useFetch<Product[]>(
    "http://localhost:3001/products"
  );
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
          {products.map((product) => {
            return product.featured === true ? (
              <div
                className="product-box cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                key={product.id}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    src={product.img_url}
                    alt=""
                  />
                </div>
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-primary-color font-bold">
                      ₵{product.price}
                    </h3>
                    <HeartIcon className="heart hidden cursor-pointer text-primary-color" />
                  </div>
                  <button className="mt-4 w-full cursor-pointer flex items-center justify-center gap-2 bg-primary-color text-white py-2 rounded transition-colors">
                    <ShoppingCartIcon className="h-4 w-4" />
                    Add to Cart
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
