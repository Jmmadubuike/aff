"use client";

import { useRouter } from "next/navigation";

const CheckoutCancelPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black text-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Payment Cancelled</h2>
            <p className="mb-4 text-center">
                Your payment was not completed. No charges were made. You can try again or continue browsing products.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => router.push("/cart")}
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-500 text-white font-semibold rounded transition"
                >
                    Return to Cart
                </button>
                <button
                    onClick={() => router.push("/products")}
                    className="px-6 py-2 bg-gradient-to-r from-brand-gold to-yellow-400 hover:from-yellow-400 hover:to-brand-gold text-black font-semibold rounded transition"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default CheckoutCancelPage;
