"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "../services/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const categoriesList = [
  { name: "Male", image: "/categories/3.jpg" },
  { name: "Female", image: "/categories/5.jpg" },
  { name: "Unisex", image: "/categories/4.jpg" },
];

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart, cartItems } = useCart();
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/api/v1/products?limit=8&minPrice=100000");
        setFeatured(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleView = (id: string) => {
    if (!user) return router.push("/login");
    router.push(`/products/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    if (!user) return router.push("/login");
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
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
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    transition: "all 0.2s ease",
  };

  const hoverEffect = (e: any, opacity: string) => {
    e.currentTarget.style.opacity = opacity;
  };

  return (
    
    <div className="min-h-screen relative bg-[#0A0A0A] text-white">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-4">
        <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-4 flex flex-wrap items-center justify-center gap-2">
          Welcome to{" "}
          <span className="bg-white text-black px-5 py-3 rounded-[1px] font-extrabold inline-block 
                   text-[3.5rem] sm:text-[5rem] font-serif tracking-wide 
                   shadow-lg shadow-yellow-200/40">
            Spray n Sniff
          </span>
        </h1>

        <p className="text-white/70 text-lg sm:text-xl mb-6">
          Discover premium fragrances delivered to your doorstep.
        </p>
        <Link
          href="/products"
          className="px-8 py-4 border border-[#fff] text-white rounded-md shadow-lg hover:scale-105 transition-all hover:shadow-[#CDA23B]/50"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-[#fff]">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categoriesList.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="relative rounded-lg  border border-[#fff] overflow-hidden shadow-lg transform transition-transform hover:scale-105"
            >
              <div className="relative w-full h-48">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-[#fff]">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center opacity-60">Loading featured products...</p>
        ) : (
          <div className="relative">
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-3 py-2 bg-[#2A2A2A] rounded hover:bg-[#3C3C3C]"
            >
              ◀
            </button>

            <div ref={carouselRef} className="flex gap-4 overflow-x-auto scrollbar-hide py-2 scroll-smooth">
              {featured.map((product) => (
                <div
                  key={product._id}
                  className="min-w-[200px] p-3 rounded-lg flex flex-col items-center relative transition-all hover:scale-[1.03]"
                  style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {getCartCount(product._id) > 0 && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                      {getCartCount(product._id)}
                    </span>
                  )}
                  <div className="relative w-full h-40 mb-2 border border-[#1D1D1D] rounded">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mb-1 text-sm text-center">{product.name}</h3>
                  <p className="mb-2 text-xs text-center opacity-80">₦{product.price.toLocaleString()}</p>
                  <div className="flex gap-2 w-full mt-auto">
                    <button
                      onClick={() => handleView(product._id)}
                      style={buttonStyle}
                      className="flex-1 text-center hover:border-[#CDA23B]"
                      onMouseEnter={(e) => hoverEffect(e, "0.7")}
                      onMouseLeave={(e) => hoverEffect(e, "1")}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={buttonStyle}
                      className="flex-1 hover:border-[#CDA23B]"
                      onMouseEnter={(e) => hoverEffect(e, "0.7")}
                      onMouseLeave={(e) => hoverEffect(e, "1")}
                    >
                      Add
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
      </section>
    </div>
  );
}
