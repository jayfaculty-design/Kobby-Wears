// src/components/ProductCard/AddToCartButton.tsx
import { useState } from "react";
import { CheckCircle2Icon, ShoppingCartIcon, Loader2 } from "lucide-react";
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

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
  className?: string;
}

const AddToCartButton = ({
  product,
  selectedSize,
  className = "",
}: AddToCartButtonProps) => {
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
    <button
      className={`${
        inCart
          ? "bg-black text-white"
          : product.available
          ? "cursor-pointer bg-primary-color text-white"
          : "bg-gray-200 text-gray-500 cursor-not-allowed"
      } flex items-center justify-center gap-2 py-2.5 rounded-md transition-all duration-200 hover:shadow-md ${
        product.available && !inCart && !isProductLoading
          ? "hover:bg-opacity-90 transform hover:translate-y-[-1px]"
          : ""
      } ${isProductLoading ? "opacity-70 cursor-wait" : ""} ${className}`}
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
  );
};

export default AddToCartButton;
