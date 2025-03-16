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

// Define CartItem interface
interface CartItem {
  id: number;
  price: number;
  quantity: number;
  img_url: string;
  name: string;
  size: string;
  color: string;
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

      const response = await axios.get(
        "https://kobby-wears.onrender.com/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Cart API response:", response.data);

      // Handle different response formats
      let items: CartItem[] = [];

      if (Array.isArray(response.data)) {
        // If response is an array, process it directly
        items = response.data.map((item: any) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity || 1,
          img_url: item.img_url,
          name: item.name,
          size: item.size || "Standard",
          color: item.color || "Default",
        }));
      } else if (response.data && typeof response.data === "object") {
        // If response is an object, check for items/products property
        const itemsArray =
          response.data.items ||
          response.data.products ||
          response.data.cartItems ||
          [];

        if (Array.isArray(itemsArray)) {
          items = itemsArray.map((item: any) => ({
            id: item.id || item.product_id,
            price: item.price || 0,
            quantity: item.quantity || 1,
            img_url: item.img_url || "",
            name: item.name || "Product",
            size: item.size || "Standard",
            color: item.color || "Default",
          }));
        } else {
          // If we can't find an array, use an empty array
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format from server");
        }
      }

      setCartItems(items);
    } catch (err: any) {
      console.error("Error fetching cart:", err);
      setError(err.message || "Failed to fetch cart");
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
        setError("Please log in to add items to cart");
        return;
      }

      // Ensure product has all required fields
      const productToAdd = {
        product_id: product.id,
        quantity: product.quantity || 1,
        size: product.size || "Standard",
        color: product.color || "Default",
      };

      await axios.post(
        "https://kobby-wears.onrender.com/cart/items",
        productToAdd,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh cart after adding item
      await fetchCart();
    } catch (err: any) {
      console.error("Error adding to cart:", err);
      setError(err.message || "Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (product: { id: number }) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(
        `https://kobby-wears.onrender.com/cart/items/${product.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh cart after removing item
      await fetchCart();
    } catch (err: any) {
      console.error("Error removing from cart:", err);
      setError(err.message || "Failed to remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete("https://kobby-wears.onrender.com/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear cart items in state
      setCartItems([]);
    } catch (err: any) {
      console.error("Error clearing cart:", err);
      setError(err.message || "Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const increment = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      await axios.put(
        `https://kobby-wears.onrender.com/cart/items/${id}`,
        { quantity: item.quantity + 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh cart after updating item
      await fetchCart();
    } catch (err: any) {
      console.error("Error incrementing item:", err);
      setError(err.message || "Failed to update item quantity");
    } finally {
      setLoading(false);
    }
  };

  const decrement = async (product: { id: number }) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const item = cartItems.find((item) => item.id === product.id);
      if (!item) return;

      if (item.quantity > 1) {
        await axios.put(
          `https://kobby-wears.onrender.com/cart/items/${product.id}`,
          { quantity: item.quantity - 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.delete(
          `https://kobby-wears.onrender.com/cart/items/${product.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Refresh cart after updating item
      await fetchCart();
    } catch (err: any) {
      console.error("Error decrementing item:", err);
      setError(err.message || "Failed to update item quantity");
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
