"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import publicApi from "../../services/publicApi"; // ✅ public (no auth)

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  concentration: string;
  sizeML: number;
  brand?: string;
  notes?: string[];
  imageUrl: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [size, setSize] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Categories (unauthenticated)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await publicApi.get("/api/v1/categories");
        const data = res.data?.data || [];
        setCategories(Array.isArray(data) ? data : []);
      } catch (error: any) {
        console.error("❌ Failed to fetch categories:", error.message);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Build dynamic filters — only include active ones
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {};

      if (query.trim()) params.query = query.trim();
      if (category) params.category = category;
      if (size) params.size = size;
      if (minPrice !== "") params.minPrice = minPrice;
      if (maxPrice !== "") params.maxPrice = maxPrice;

      const res = await publicApi.get("/api/v1/products/search", { params });
      const data = res.data?.data || [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("❌ Failed to fetch products:", error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Trigger fetch when any filter changes (debounced)
  useEffect(() => {
    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [query, category, size, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4">
      {/* Filters */}
      <section className="mb-6 flex flex-col sm:flex-row gap-2 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, brand, or notes..."
          className="flex-1 px-3 py-2 rounded border border-[#fff] bg-[#111111] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CDA23B]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded border border-[#fff] bg-[#111111] focus:outline-none focus:ring-1 focus:ring-[#CDA23B]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug || cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Size */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="px-3 py-2 rounded border border-[#fff] bg-[#111111] focus:outline-none focus:ring-1 focus:ring-[#CDA23B]"
        >
          <option value="">All Sizes</option>
          {[30, 50, 75, 100, 120, 150, 200].map((s) => (
            <option key={s} value={s}>
              {s}ml
            </option>
          ))}
        </select>

        {/* Price Range */}
        <div className="flex gap-1 items-center">
          <input
            type="number"
            placeholder="Min"
            className="w-20 px-2 py-2 rounded border border-[#fff] bg-[#111111] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CDA23B]"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-20 px-2 py-2 rounded border border-[#fff] bg-[#111111] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#CDA23B]"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-white/70">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="col-span-full text-center text-white/70">
            No products found
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-[#111111] p-3 rounded flex flex-col items-center border border-[#fff] hover:shadow-lg transition-shadow"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={150}
                height={150}
                className="rounded mb-2 object-cover"
              />
              <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
              <p className="text-xs text-white/70 mb-1">
                {product.brand} | {product.category} | {product.concentration}
              </p>
              <p className="text-xs text-white/70 mb-2">{product.sizeML}ml</p>
              <p className="text-sm font-bold mb-2">
                ₦{product.price.toLocaleString()}
              </p>
              <Link
                href={`/products/${product._id}`}
                className="px-4 py-2 rounded bg-gradient-to-r from-[#CDA23B] to-[#2BAF9E] text-black text-xs font-semibold hover:scale-105 transition-transform"
              >
                View
              </Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
