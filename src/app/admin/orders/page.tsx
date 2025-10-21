"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

interface OrderItem {
  product: { _id: string; name: string; price: number; imageUrl: string };
  quantity: number;
  price: number;
}

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  country: string;
}

interface Order {
  _id: string;
  user: { _id: string; name: string; email: string };
  items: OrderItem[];
  total: number;
  status: string;
  deliveryAddress?: DeliveryAddress;
  phone?: string;
  reservedUntil?: string;
  createdAt: string;
}

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

const AdminOrdersPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
      else if (user.role !== "admin") router.replace("/");
    }
  }, [user, loading, router]);

  const fetchOrders = async (page = 1) => {
    try {
      setFetching(true);
      const res = await api.get(`/api/v1/orders?page=${page}&limit=10`, { withCredentials: true });
      const data = res.data;

      setOrders(data.orders || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && user?.role === "admin") fetchOrders(currentPage);
  }, [loading, user, currentPage]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.patch(`/api/v1/orders/${orderId}/status`, { status: newStatus }, { withCredentials: true });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (loading || fetching || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-black text-white font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Orders</h1>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-sm">
          <thead className="bg-gray-800 text-gray-300 text-xs sm:text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Delivery Address</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Reserved Until</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="px-4 py-2 text-sm">{order._id}</td>
                <td className="px-4 py-2 text-sm">
                  {order.user?.name} <br />
                  <span className="text-gray-400">{order.user?.email}</span>
                </td>
                <td className="px-4 py-2 text-sm">
                  {order.items.map((item) => (
                    <div key={item.product._id} className="flex items-center gap-2 mb-1">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-8 h-8 object-cover rounded" />
                      <div className="text-xs sm:text-sm">
                        <p>{item.product.name}</p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 text-sm">₦{order.total.toLocaleString()}</td>
                <td className="px-4 py-2 text-sm">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s} className="text-white text-sm">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 text-sm">
                  {order.deliveryAddress
                    ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.country}`
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm">{order.phone || "N/A"}</td>
                <td className="px-4 py-2 text-sm">
                  {order.reservedUntil ? new Date(order.reservedUntil).toLocaleString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 text-sm"
        >
          Previous
        </button>
        <span className="px-3 py-1 bg-gray-800 rounded text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
