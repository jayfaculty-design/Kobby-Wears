import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Define the Product interface to match what's used in your components
interface Product {
  id: number;
  price: number;
  quantity?: number;
  img_url: string;
  name: string;
  size?: string;
  color: string;
  description?: string;
  category?: string;
  available?: boolean;
  featured?: boolean;
}

// Define CartItem interface to match your backend response
interface CartItem {
  id: number;
  quantity: number;
  size: string;
  color: string;
  product_id: number;
  name: string;
  price: number;
  img_url: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (product: { id: number }) => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  increment: (id: number) => Promise<void>;
  decrement: (product: { id: number }) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

import { ReactNode } from "react";
import toast from "react-hot-toast";

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: "https://kobby-wears.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart on initial load and when auth state changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    } else {
      // Clear cart if user is not logged in
      setCartItems([]);
    }

    // Listen for auth changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        if (e.newValue) {
          fetchCart();
        } else {
          setCartItems([]);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartItems([]);
        return;
      }

      const response = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Cart API response:", response.data);

      if (Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format from server");
        setCartItems([]);
      }
    } catch (err: any) {
      console.error("Error fetching cart:", err);
      const errorMessage =
        err.response?.data || err.message || "Failed to clear cart";
      setError(errorMessage);
      toast.error("Error loading cart: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Public method to refresh cart
  const refreshCart = async () => {
    await fetchCart();
  };

  const addToCart = async (product: Product) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to add items to cart");
        setError("Please log in to add items to cart");
        return;
      }

      // Ensure product has all required fields
      const productToAdd = {
        product_id: product.id,
        quantity: product.quantity || 1,
        size: product.size || "One Size", // Match backend default
        color: product.color || "Default",
      };

      await api.post("/cart/items", productToAdd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh cart after adding item
      toast.success("Product added to cart");
      await fetchCart();
    } catch (err: any) {
      console.error("Error adding to cart:", err);
      const errorMessage =
        err.response?.data || err.message || "Failed to add item to cart";
      setError(errorMessage);
      toast.error(`Error adding to cart: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (product: { id: number }) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to remove items from cart");
        setError("Please login to remove items from cart");
        return;
      }

      await api.delete(`/cart/items/${product.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product removed from cart");
      await fetchCart();
    } catch (err: any) {
      console.error("Error removing from cart:", err);
      let errorMessage =
        err.response?.data || err.message || "Failed to remove item from cart";
      setError(errorMessage);
      toast.error(`Error removing from cart: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to clear cart");
        setError("Please log in to clear cart");
        return;
      }

      await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear cart items in state
      toast.success("Cart Cleared");
      setCartItems([]);
    } catch (err: any) {
      console.error("Error clearing cart:", err);
      const errorMessage =
        err.response?.data || err.message || "Failed to clear cart";
      setError(errorMessage);
      toast.error(`Error clearing cart ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const increment = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to update cart");
        setError("Please log in to update cart");
        return;
      }

      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      await api.put(
        `/cart/items/${id}`,
        { quantity: item.quantity + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh cart after updating item
      toast.success("Cart updated");
      await fetchCart();
    } catch (err: any) {
      console.error("Error incrementing item:", err);
      const errorMessage =
        err.response?.data || err.message || "Failed to update cart";

      setError(errorMessage);
      toast.error("Error updating cart:" + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const decrement = async (product: { id: number }) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to update cart");
        setError("Please log in to update cart");
        return;
      }
      const item = cartItems.find((item) => item.id === product.id);
      if (!item) return;

      if (item.quantity > 1) {
        await api.put(
          `/cart/items/${product.id}`,
          { quantity: item.quantity - 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await api.delete(`/cart/items/${product.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Refresh cart after updating item
      toast.success("Cart updated");
      await fetchCart();
    } catch (err: any) {
      console.error("Error decrementing item:", err);
      const errorMessage =
        err.response?.data || err.message || "Failed to update item quantity";
      setError(errorMessage);
      toast.error("Error updating cart: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
        loading,
        error,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for easier access to the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
