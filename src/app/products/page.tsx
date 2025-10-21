"use client";

import { useEffect, useState, useRef } from "react";
import { useCart } from "../../context/CartContext";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  featured?: boolean; // new
}

const categories = ["All", "Male", "Female", "Unisex"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const { addToCart, cartItems } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async (category: string) => {
    try {
      setLoading(true);
      let url = "/api/v1/products?limit=100";
      if (category !== "All") url += `&category=${category}`;
      const res = await api.get(url);
      setProducts(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeatured = async () => {
    try {
      const res = await api.get("/api/v1/products/featured");
      setFeatured(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch featured products", err);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ productId: product._id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  const getCartCount = (productId: string) => {
    const item = cartItems.find((i) => i.productId === productId);
    return item ? item.quantity : 0;
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "6px 12px",
    borderRadius: "1px",
    fontSize: "12px",
    transition: "all 0.2s ease",
  };

  const hoverEffect = (e: any, opacity: string) => {
    e.currentTarget.style.opacity = opacity;
  };

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF", fontSize: "12px" }}>
      <h1 className="text-2xl font-bold mb-6 text-center text-[#fff]">Our Luxury Perfumes</h1>

      {/* Featured Carousel */}
      {featured.length > 0 && (
        <div className="relative mb-8">
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-3 py-2 bg-[#2A2A2A] rounded hover:bg-[#3C3C3C]"
          >
            ◀
          </button>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {featured.map((product) => (
              <div
                key={product._id}
                className="min-w-[200px] p-3 rounded flex flex-col items-center relative"
                style={{ backgroundColor: "#111111", border: "1px solid #fff" }}
              >
                {/* Featured badge */}
                {product.featured && (
                  <span className="absolute top-2 left-2 bg-[#CDA23B] text-black text-[10px] px-1 py-0.5 rounded font-bold">
                    Featured
                  </span>
                )}

                {getCartCount(product._id) > 0 && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {getCartCount(product._id)}
                  </span>
                )}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                  style={{ border: "1px solid #1D1D1D" }}
                />
                <h3 className="mb-1 text-xs">{product.name}</h3>
                <p className="mb-2 text-[10px]" style={{ opacity: 0.8 }}>
                  ₦{product.price.toLocaleString()}
                </p>
                <div className="flex gap-2 w-full">
                  <Link
                    href={`/products/${product._id}`}
                    style={{ ...buttonStyle, padding: "4px 8px", fontSize: "10px" }}
                    className="flex-1 text-center"
                    onMouseEnter={(e) => hoverEffect(e, "0.7")}
                    onMouseLeave={(e) => hoverEffect(e, "1")}
                  >
                    view
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{ ...buttonStyle, padding: "4px 8px", fontSize: "10px" }}
                    className="flex-1"
                    onMouseEnter={(e) => hoverEffect(e, "0.7")}
                    onMouseLeave={(e) => hoverEffect(e, "1")}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-3 py-2 bg-[#2A2A2A] rounded hover:bg-[#3C3C3C]"
          >
            ▶
          </button>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-[0.5px] border border-white font-semibold transition ${category === cat
              ? "bg-[#fff] text-black"
              : "bg-[black] text-[#fff] hover:bg-[gray]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center mt-12 opacity-60">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center mt-12 opacity-60">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-3 rounded flex flex-col items-center relative"
              style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}
            >
              {getCartCount(product._id) > 0 && (
                <span className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartCount(product._id)}
                </span>
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
                style={{ border: "1px solid #1D1D1D" }}
              />
              <h3 className="mb-1 text-xs">{product.name}</h3>
              <p className="mb-2 text-[10px]" style={{ opacity: 0.8 }}>
                ₦{product.price.toLocaleString()}
              </p>
              <div className="flex gap-2 w-full">
                <Link
                  href={`/products/${product._id}`}
                  style={buttonStyle}
                  className="flex-1 text-center"
                  onMouseEnter={(e) => hoverEffect(e, "0.7")}
                  onMouseLeave={(e) => hoverEffect(e, "1")}
                >
                  view
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={buttonStyle}
                  className="flex-1"
                  onMouseEnter={(e) => hoverEffect(e, "0.7")}
                  onMouseLeave={(e) => hoverEffect(e, "1")}
                >
                  add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
