"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../../services/api";
import { useCart } from "../../../context/CartContext";

// ✅ Wrap the inner component in Suspense-safe wrapper
function CheckoutSuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const [reference, setReference] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying payment...");
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = searchParams.get("reference") || searchParams.get("trxref");
    if (ref) setReference(ref);
  }, [searchParams]);

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      setLoading(true);
      setError("");
      setMessage("Verifying payment...");

      try {
        const res = await api.post("/orders/finalize", { reference });
        if (res.data.success) {
          setMessage("Payment successful! Your order is confirmed.");
          clearCart();
        } else {
          setError(res.data.message || "Payment verification failed.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to verify payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="mb-2">{message}</p>
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      {error ? (
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push("/cart")}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-gold hover:from-gold hover:to-yellow-400 text-black font-semibold rounded mt-4"
          >
            Return to Cart
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Thank you!</h2>
          <p className="mb-4">{message}</p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-gold hover:from-gold hover:to-yellow-400 text-black font-semibold rounded"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

// ✅ Export a Suspense wrapper to fix the build error
export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
      <CheckoutSuccessInner />
    </Suspense>
  );
}
