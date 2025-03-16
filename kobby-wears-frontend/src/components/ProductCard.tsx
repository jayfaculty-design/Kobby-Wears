// src/components/ProductCard/index.tsx
import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2Icon, ShoppingCartIcon, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/useCart";
import SizeSelector from "./ProductSection/SizeSelector";
import AddToCartButton from "./ProductSection/AddToCartButton";

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

interface ProductCardProps {
  product: Product;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  sizes: string[];
}

const ProductCard = ({
  product,
  selectedSize,
  onSizeChange,
  sizes,
}: ProductCardProps) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    loading: cartLoading,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Check if product is in cart
  const inCart = cartItems.find((item) => item.product_id === product.id);

  // Add product to cart with selected size
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const productWithSize = {
        ...product,
        size: selectedSize,
        quantity: 1,
      };
      await addToCart(productWithSize);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove product from cart
  const handleRemoveFromCart = async () => {
    if (!inCart) return;

    setIsLoading(true);
    try {
      await removeFromCart({ id: inCart.id });
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isProductLoading = isLoading || cartLoading;

  return (
    <div className="product-box bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
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

          <SizeSelector
            product={product}
            selectedSize={selectedSize}
            onSizeChange={onSizeChange}
            sizes={sizes}
            disabled={!product.available || !!inCart || isProductLoading}
          />
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
            inCart ? handleRemoveFromCart() : handleAddToCart();
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
};

// Attach subcomponents
ProductCard.SizeSelector = SizeSelector;
ProductCard.AddToCartButton = AddToCartButton;

export default ProductCard;
