
import { useState, useEffect } from "react";
import api from "@/services/api";

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
}

// Cache for products
let productsCache: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const now = Date.now();

      // use cache if available and not expired, unless force refresh is requested
      if (
        !forceRefresh &&
        productsCache &&
        now - lastFetchTime < CACHE_DURATION
      ) {
        setProducts(productsCache);
        setLoading(false);
        return;
      }

      const response = await api.get("/products");
      productsCache = response.data;
      lastFetchTime = now;

      setProducts(response.data);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.response?.data || err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: () => fetchProducts(true) };
};
