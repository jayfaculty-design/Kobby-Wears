import { CartContext } from "@/contexts/CartContext";
import useFetch from "@/customHooks/useFetch";
import {
  CheckCircle2Icon,
  ShoppingBag,
  Truck,
  RefreshCw,
  Shield,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

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
  size: string;
}

const ProductsDetails = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { addToCart, cartItems, removeFromCart } = cartContext;
  const { id } = useParams();
  const [products, loading] = useFetch<Product[]>(
    "https://kobby-wears.onrender.com/products"
  );
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const mainProduct = products?.find((product) => product.id === parseInt(id!));
  const relatedProducts = products?.filter(
    (product) =>
      product.category === mainProduct?.category &&
      product.id !== mainProduct?.id
  );

  const sizes = ["S", "M", "L", "XL"];
  const inCart = cartItems.find((item) => item.id === mainProduct?.id);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  // Mock multiple product images
  const productImages = mainProduct
    ? [
        mainProduct.img_url,
        mainProduct.img_url, // Duplicate for demo purposes
        mainProduct.img_url, // Duplicate for demo purposes
      ]
    : [];

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-neutral-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-24 mb-2.5"></div>
          <div className="h-3 bg-neutral-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!mainProduct) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-medium mb-4">Product not found</h2>
        <p className="mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-neutral-800 transition-all"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-8 text-neutral-500">
        <Link to="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link
          to={`/products/${mainProduct.category}`}
          className="hover:text-black transition-colors"
        >
          {mainProduct.category}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-black font-medium truncate">
          {mainProduct.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-neutral-50 rounded-lg overflow-hidden aspect-square">
            <img
              src={productImages[activeImage]}
              alt={mainProduct.name}
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  activeImage === index ? "border-black" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${mainProduct.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
            {mainProduct.category}
          </div>

          {/* Product Title and Price */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {mainProduct.name}
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">
                GH₵{" "}
                {typeof mainProduct.price === "number"
                  ? mainProduct.price.toFixed(2)
                  : mainProduct.price}
              </p>
              <button
                onClick={toggleWishlist}
                className={`p-2 rounded-full ${
                  isWishlist
                    ? "text-red-500"
                    : "text-neutral-400 hover:text-neutral-700"
                } transition-colors`}
                aria-label="Add to wishlist"
              >
                <Heart size={24} fill={isWishlist ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Product Description */}
          <p className="text-neutral-600 leading-relaxed">
            {mainProduct.description ||
              "This premium product combines style and comfort, perfect for any occasion. Made with high-quality materials to ensure durability and a great fit."}
          </p>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Select Size</h3>
              <Link
                to="/size-guide"
                className="text-sm text-neutral-500 hover:text-black underline"
              >
                Size Guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setActiveSize(size)}
                  className={`h-12 w-12 flex items-center justify-center rounded-md border ${
                    activeSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-neutral-300 hover:border-black"
                  } transition-all duration-200`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-3">
            <h3 className="font-medium">Color</h3>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border border-neutral-300"
                style={{ backgroundColor: mainProduct.color.toLowerCase() }}
              ></div>
              <span className="capitalize">{mainProduct.color}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() =>
              !inCart
                ? addToCart({ ...mainProduct, size: activeSize })
                : removeFromCart(mainProduct)
            }
            className={`w-full py-4 px-6 cursor-pointer rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
              inCart
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-primary-color text-white hover:bg-opacity-90"
            }`}
          >
            {inCart ? (
              <>
                <CheckCircle2Icon size={20} />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={20} />
                Add to Cart
              </>
            )}
          </button>

          {/* Product Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
            <div className="flex items-start gap-3">
              <Truck
                size={20}
                className="text-neutral-500 flex-shrink-0 mt-1"
              />
              <div>
                <h4 className="font-medium text-sm">Free Shipping</h4>
                <p className="text-xs text-neutral-500">
                  On orders over GH₵100
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw
                size={20}
                className="text-neutral-500 flex-shrink-0 mt-1"
              />
              <div>
                <h4 className="font-medium text-sm">Easy Returns</h4>
                <p className="text-xs text-neutral-500">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield
                size={20}
                className="text-neutral-500 flex-shrink-0 mt-1"
              />
              <div>
                <h4 className="font-medium text-sm">Quality Guarantee</h4>
                <p className="text-xs text-neutral-500">
                  100% authentic products
                </p>
              </div>
            </div>
          </div>

          {/* Product Specs */}
          <div className="pt-4 border-t border-neutral-200">
            <h3 className="font-medium mb-3">Product Specifications</h3>
            <ul className="list-disc pl-5 text-neutral-600 space-y-1">
              <li>100% premium cotton</li>
              <li>Double layer hood with drawstring</li>
              <li>Ribbed cuffs and hem</li>
              <li>Machine washable</li>
              <li>Imported</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.slice(0, 4).map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-neutral-50 rounded-lg overflow-hidden aspect-square mb-3">
                  <img
                    src={product.img_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium line-clamp-1 group-hover:text-primary-color transition-colors">
                  {product.name}
                </h3>
                <p className="text-neutral-900 font-semibold mt-1">
                  GH₵{" "}
                  {typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetails;
