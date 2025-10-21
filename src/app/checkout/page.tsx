"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold tracking-wide">Your cart is empty</h2>
      </div>
    );
  }

  const handleCheckout = async () => {
    // 🔒 Check if user is logged in before continuing
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/api/v1/cart/sync", {
        items: cartItems.map((i) => ({
          product: i.productId,
          quantity: i.quantity,
        })),
      });

      const res = await api.post("/api/v1/orders/checkout", {
        deliveryAddress: { street, city, state },
        phone,
        saveAddress: true,
      });

      const { order, payment } = res.data.data;
      clearCart();
      sessionStorage.setItem("currentOrderId", order._id);

      if (payment?.authorization_url) {
        window.location.href = payment.authorization_url;
      } else {
        router.push("/checkout/success");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white font-sans">
      <h1 className="text-5xl font-bold mb-12 text-center tracking-tight drop-shadow-[0_0_10px_rgba(255,215,0,0.2)]">
        Checkout
      </h1>

      {error && <p className="text-red-500 mb-8 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Delivery Form */}
        <div className="bg-black border border-white p-8 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.15)]">
          <h2 className="text-2xl font-semibold mb-6">Delivery Address</h2>
          {["Street", "City", "State", "Phone"].map((field, i) => (
            <input
              key={i}
              type="text"
              placeholder={field}
              value={
                field === "Street"
                  ? street
                  : field === "City"
                  ? city
                  : field === "State"
                  ? state
                  : phone
              }
              onChange={(e) => {
                if (field === "Street") setStreet(e.target.value);
                else if (field === "City") setCity(e.target.value);
                else if (field === "State") setState(e.target.value);
                else setPhone(e.target.value);
              }}
              className="w-full mb-5 px-4 py-3 rounded-lg border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all text-lg"
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-black border border-white p-8 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.15)] flex flex-col justify-between">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="flex flex-col gap-3 mb-6 max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center text-white text-lg"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="text-2xl font-bold mb-8 border-t border-white pt-4">
            Total: <span>₦{totalAmount.toLocaleString()}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 border border-white text-white font-semibold text-lg rounded-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.25)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Complete Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
