"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-base">
        <h2 className="mb-3 text-2xl font-semibold tracking-wide">Your cart is empty</h2>
        <Link
          href="/products"
          className="underline text-white hover:text-gray-300 transition-all"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 font-sans">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-[0_0_10px_rgba(255,215,0,0.15)]">
        Your Cart
      </h1>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between p-4 rounded-lg bg-black border border-white shadow-[0_0_10px_rgba(255,215,0,0.1)]"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md border border-white"
              />
              <div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-gray-400">₦{item.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                className="w-16 px-3 py-2 text-center text-white bg-black border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all text-base"
              />
              <button
                onClick={() => removeFromCart(item.productId)}
                className="px-3 py-2 text-sm rounded-md border border-white text-white hover:bg-white hover:text-black transition-all duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={clearCart}
          className="px-5 py-3 text-sm sm:text-base rounded-md border border-white text-white hover:bg-white hover:text-black transition-all duration-200"
        >
          Clear Cart
        </button>

        <div className="text-xl sm:text-2xl font-semibold">
          Total: <span className="text-white">₦{totalAmount.toLocaleString()}</span>
        </div>

        <Link
          href="/checkout"
          className="px-6 py-3 text-sm sm:text-base font-semibold rounded-md bg-white text-black hover:bg-neutral-100 transition-all shadow-[0_0_12px_rgba(255,215,0,0.2)]"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
