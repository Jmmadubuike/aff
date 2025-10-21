"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Link from "next/link";

interface OrderItem {
  product: {
    name: string;
    imageUrl: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

const MyOrdersPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/v1/orders");
      setOrders(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) fetchOrders();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid"></div>
        <span className="mt-4 text-xl text-white tracking-wide">Loading Orders...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <p className="text-xl mb-4">
          You need to <Link href="/auth/login" className="text-yellow-400 underline">login</Link> to view your orders.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <p className="text-red-500 mb-4 text-center">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        <p className="text-gray-400">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/orders/${order._id}`}
            className="block p-6 bg-gray-900 rounded-xl border border-yellow-500/30 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order ID: {order._id}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === "paid"
                    ? "bg-green-600"
                    : order.status === "pending"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-400 mb-2">
              Items: {order.items.reduce((acc, i) => acc + i.quantity, 0)}
            </p>
            <p className="text-gray-400 mb-2">Total: ₦{order.total}</p>
            <p className="text-gray-400 text-sm">
              Ordered on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
