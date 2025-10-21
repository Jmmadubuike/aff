"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";
import Link from "next/link";

interface OrderItem {
    product: { name: string; imageUrl: string; price: number };
    quantity: number;
}

interface DeliveryAddress {
    street: string;
    city: string;
    state: string;
    phone: string;
}

interface Payment {
    reference: string;
    authorization_url: string;
}

interface Order {
    _id: string;
    items: OrderItem[];
    total: number;
    status: string;
    createdAt: string;
    deliveryAddress?: DeliveryAddress;
    payment?: Payment;
}

const OrderDetailPage = () => {
    const { user, loading: authLoading } = useAuth();
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrder = async () => {
        if (!user || !id) return;
        setLoading(true);
        setError("");
        try {
            const res = await api.get(`/api/v1/orders/${id}`);
            setOrder(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch order");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && user && id) fetchOrder();
    }, [authLoading, user, id]);

    if (authLoading || loading)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid relative flex items-center justify-center">
                    <span className="absolute inset-0 flex items-center justify-center text-yellow-500 font-bold text-xs">Spray n Sniff</span>
                </div>
                <span className="mt-4 text-xl text-white tracking-wide">Loading order...</span>
            </div>
        );

    if (!user)
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
                <p className="text-lg">
                    You need to{" "}
                    <Link href="/auth/login" className="text-yellow-400 underline">
                        login
                    </Link>{" "}
                    to view this order.
                </p>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
                >
                    Go Back
                </button>
            </div>
        );

    if (!order)
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p className="text-gray-400">Order not found.</p>
            </div>
        );

    const handleRetryPayment = () => {
        if (order.payment?.authorization_url)
            window.location.href = order.payment.authorization_url;
        else alert("Payment link not available. Contact support.");
    };

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-white">Order Details</h1>

                {/* Order Card */}
                <div className="bg-gray-900 rounded-3xl shadow-xl border border-yellow-500/30 p-6 space-y-4">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <span className="font-semibold text-lg text-white">Order ID: {order._id}</span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${order.status === "paid"
                                    ? "bg-green-600"
                                    : order.status === "pending"
                                        ? "bg-yellow-600"
                                        : "bg-red-600"
                                }`}
                        >
                            {order.status.toUpperCase()}
                        </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold border-b border-yellow-400 pb-1 text-white">Items</h2>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-2 rounded-md bg-black/20">
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

                    {/* Delivery Address */}
                    {order.deliveryAddress && (
                        <div className="space-y-2 mt-4">
                            <h2 className="text-xl font-semibold border-b border-yellow-400 pb-1 text-white">
                                Delivery Address
                            </h2>
                            <p className="text-white">
                                {order.deliveryAddress.street}, {order.deliveryAddress.city},{" "}
                                {order.deliveryAddress.state}
                            </p>
                            <p className="text-white">Phone: {order.deliveryAddress.phone}</p>
                        </div>
                    )}

                    {/* Total & Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
                        <span className="font-semibold text-white text-lg">Total: ₦{order.total}</span>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => router.back()}
                                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
                            >
                                Back to Orders
                            </button>
                            {order.status === "pending" && order.payment?.authorization_url && (
                                <button
                                    onClick={handleRetryPayment}
                                    className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400"
                                >
                                    Retry Payment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
