"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  Package,
  ShoppingCart,
  BarChart2,
  FolderOpenDot,
  Mail,
} from "lucide-react";

interface Order {
  total?: number;
}

interface DashboardStats {
  users: number;
  products: number;
  orders: number;
  revenue: number;
  categories: number;
  contacts: number;
}

const AdminDashboard = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    categories: 0,
    contacts: 0,
  });
  const [fetching, setFetching] = useState(true);

  // 🔒 Redirect unauthorized users
  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/auth/login");
      else if (user.role !== "admin") router.replace("/");
    }
  }, [user, loading, router]);

  // 📊 Fetch dashboard stats
  const fetchStats = async () => {
    try {
      setFetching(true);
      const [usersRes, productsRes, ordersRes, categoriesRes, contactsRes] =
        await Promise.all([
          api.get("/api/v1/users", { withCredentials: true }),
          api.get("/api/v1/products", { withCredentials: true }),
          api.get("/api/v1/orders", { withCredentials: true }),
          api.get("/api/v1/categories", { withCredentials: true }),
          api.get("/api/v1/contacts", { withCredentials: true }),
        ]);

      const users = Array.isArray(usersRes.data.users)
        ? usersRes.data.users.length
        : 0;

      const products =
        productsRes.data.meta?.total ??
        productsRes.data.data?.length ??
        0;

      const orders = Array.isArray(ordersRes.data.orders)
        ? ordersRes.data.orders.length
        : 0;

      const categories = Array.isArray(categoriesRes.data.data)
        ? categoriesRes.data.data.length
        : 0;

      const contacts = Array.isArray(contactsRes.data.data)
        ? contactsRes.data.data.length
        : 0;

      // 💰 Safe and typed revenue calculation
      const revenue =
        ordersRes.data.orders?.reduce(
          (acc: number, order: Order) => acc + (order.total ?? 0),
          0
        ) ?? 0;

      setStats({
        users,
        products,
        orders,
        revenue,
        categories,
        contacts,
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setFetching(false);
    }
  };

  // ⏱ Auto-refresh every 30 seconds
  useEffect(() => {
    if (!loading && user?.role === "admin") {
      fetchStats();
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [loading, user]);

  if (loading || fetching || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-[12px]">
        Loading...
      </div>
    );
  }

  const cardData = [
    {
      label: "Users",
      value: stats.users.toLocaleString(),
      icon: <Users className="w-6 h-6 text-teal-400" />,
      href: "/admin/users",
    },
    {
      label: "Products",
      value: stats.products.toLocaleString(),
      icon: <Package className="w-6 h-6 text-amber-400" />,
      href: "/admin/products",
    },
    {
      label: "Orders",
      value: stats.orders.toLocaleString(),
      icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
      href: "/admin/orders",
    },
    {
      label: "Revenue",
      value: `₦${stats.revenue.toLocaleString()}`,
      icon: <BarChart2 className="w-6 h-6 text-green-400" />,
      href: "/admin/revenue",
    },
    {
      label: "Categories",
      value: stats.categories.toLocaleString(),
      icon: <FolderOpenDot className="w-6 h-6 text-yellow-400" />,
      href: "/admin/categories",
    },
    {
      label: "Contacts",
      value: stats.contacts.toLocaleString(),
      icon: <Mail className="w-6 h-6 text-red-400" />,
      href: "/admin/contact",
    },
  ];

  const cardStyle =
    "bg-gray-900 p-4 rounded-md flex flex-col items-start gap-2 cursor-pointer text-[12px] hover:bg-gray-800 transition";

  return (
    <div className="min-h-screen p-6 bg-black text-white text-[12px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded font-semibold text-[12px]"
        >
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {cardData.map((card) => (
          <div
            key={card.label}
            onClick={() => router.push(card.href)}
            className={cardStyle}
          >
            <div className="flex items-center gap-2">
              {card.icon}
              <span className="text-sm font-semibold">{card.label}</span>
            </div>
            <p className="text-lg font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
