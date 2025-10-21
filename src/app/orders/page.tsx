"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Link from "next/link";

interface OrderItem {
    product: { name: string; imageUrl: string; price: number };
    quantity: number;
}

interface Order {
    _id: string;
    items: OrderItem[];
    total: number;
    status: string;
    createdAt: string;
}

const OrdersPage = () => {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        if (!user) return;
        setLoading(true);
        setError("");
        try {
            const res = await api.get("/api/v1/orders/user");
            setOrders(res.data.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && user) fetchOrders();
    }, [authLoading, user]);

    if (authLoading || loading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid relative flex items-center justify-center">
                    <span className="absolute inset-0 flex items-center justify-center text-yellow-500 font-bold text-xs">Spray n Sniff</span>
                </div>
                <span className="mt-4 text-xl text-white tracking-wide">Loading orders...</span>
            </div>
        );

    if (!user)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
                <p className="text-lg">
                    You need to{" "}
                    <Link href="/auth/login" className="text-yellow-400 underline">
                        login
                    </Link>{" "}
                    to view your orders.
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-center text-white">Your Orders</h1>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                {orders.length === 0 ? (
                    <p className="text-center text-gray-400">No orders found.</p>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-gray-900 rounded-3xl shadow-xl border border-white p-6 space-y-4"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                                    <span className="font-semibold text-lg text-white">Order ID: {order._id}</span>
                                    <span
                                        className={`px-3 py-1 rounded-[1px] text-sm ${order.status === "paid"
                                                ? "bg-green-600"
                                                : order.status === "pending"
                                                    ? "bg-yellow-600"
                                                    : "bg-red-600"
                                            }`}
                                    >
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-4 p-2 rounded-md bg-black/20"
                                        >
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-white">{item.product.name}</p>
                                                <p className="text-gray-400 text-sm">
                                                    Qty: {item.quantity} × ₦{item.product.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Total & Link */}
                                <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
                                    <span className="font-semibold text-white text-lg">Total: ₦{order.total}</span>
                                    <Link
                                        href={`/orders/${order._id}`}
                                        prefetch={true}
                                        className="px-4 py-2 bg-white text-black rounded hover:bg-yellow-400"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
