"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sizeML: number;
  category: string;
  brand: string;
  concentration: string;
  notes?: string[];
  longevity?: string;
  sillage?: string;
  stock?: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/v1/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
    toast.success(`${product.name} added to cart`);
  };

  const glassButton = {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "8px 14px",
    borderRadius: "4px",
    fontSize: "14px",
    transition: "all 0.2s ease",
  };

  const glassInput = {
    backgroundColor: "rgba(255,255,255,0.12)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "6px 10px",
    borderRadius: "4px",
    fontSize: "14px",
    width: "60px",
  };

  const hoverEffect = (e: any, opacity: string) => {
    e.currentTarget.style.opacity = opacity;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}>
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}>
        Product not found
      </div>
    );

  const getCartCount = () => {
    const item = cartItems.find((i) => i.productId === product._id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        
        {/* IMAGE */}
        <div className="md:w-1/2 flex items-center justify-center relative">
          {getCartCount() > 0 && (
            <span className="absolute top-2 right-2 bg-[#CDA23B] text-black text-[10px] w-6 h-6 flex items-center justify-center rounded-full z-10">
              {getCartCount()}
            </span>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded-md"
            style={{ border: "1px solid #2A2A2A" }}
          />
        </div>

        {/* DETAILS */}
        <div className="md:w-1/2 flex flex-col gap-4 justify-center">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="opacity-70">by {product.brand}</p>
          <p className="text-[#CDA23B] font-semibold text-lg">₦{product.price.toLocaleString()}</p>

          <p className="opacity-80">{product.description}</p>

          <div className="grid grid-cols-2 gap-2 mt-2 opacity-75">
            <p>Category: {product.category}</p>
            <p>Concentration: {product.concentration}</p>
            <p>Size: {product.sizeML}ml</p>
            {product.longevity && <p>Longevity: {product.longevity}</p>}
            {product.sillage && <p>Sillage: {product.sillage}</p>}
            {product.stock !== undefined && <p>In stock: {product.stock}</p>}
          </div>

          {product.notes && <p>Notes: {product.notes.join(", ")}</p>}

          {/* CART SECTION */}
          <div className="flex items-center gap-3 mt-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={glassInput}
            />
            <button
              onClick={handleAddToCart}
              style={{ ...glassButton, backgroundColor: "#CDA23B", color: "#000000", border: "none" }}
              onMouseEnter={(e) => hoverEffect(e, "0.7")}
              onMouseLeave={(e) => hoverEffect(e, "1")}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
