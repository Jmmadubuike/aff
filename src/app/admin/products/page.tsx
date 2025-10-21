"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { Pencil, Trash, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
}

const AdminProductsPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    // Redirect non-admin users
    useEffect(() => {
        if (!loading) {
            if (!user) router.replace("/login");
            else if (user.role !== "admin") router.replace("/");
        }
    }, [user, loading, router]);

    // Fetch products with pagination
    const fetchProducts = async (pageNum: number) => {
        try {
            setFetching(true);
            const res = await api.get(`/api/v1/products?page=${pageNum}&limit=${limit}`, { withCredentials: true });
            const data = Array.isArray(res.data.data) ? res.data.data : [];
            setProducts(data);
            setTotalPages(res.data.meta?.pages || 1);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch products.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (!loading && user?.role === "admin") fetchProducts(page);
    }, [loading, user, page]);

    // Delete product
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await api.delete(`/api/v1/products/${id}`, { withCredentials: true });
            setProducts(products.filter((p) => p._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete product.");
        }
    };

    if (loading || fetching || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white text-[12px]">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-black text-white text-[12px] font-sans">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold">Products</h1>
                <button
                    onClick={() => router.push("/admin/products/create")}
                    className="flex items-center gap-1 px-3 py-1 bg-white text-black text-[12px] rounded hover:bg-gray-300 transition"
                >
                    <Plus className="w-4 h-4" /> Add
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto rounded-md border border-gray-700">
                <table className="min-w-full bg-black text-white text-[12px]">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="px-3 py-2 text-left text-gray-300">Image</th>
                            <th className="px-3 py-2 text-left text-gray-300">Name</th>
                            <th className="px-3 py-2 text-left text-gray-300">Category</th>
                            <th className="px-3 py-2 text-left text-gray-300">Price</th>
                            <th className="px-3 py-2 text-left text-gray-300">Stock</th>
                            <th className="px-3 py-2 text-left text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-400">
                                    No products available.
                                </td>
                            </tr>
                        )}
                        {products.map((product) => (
                            <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                                <td className="px-3 py-2">
                                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="px-3 py-2 font-medium">{product.name}</td>
                                <td className="px-3 py-2">{product.category}</td>
                                <td className="px-3 py-2">₦{product.price.toLocaleString()}</td>
                                <td className="px-3 py-2">{product.stock}</td>
                                <td className="px-3 py-2 flex gap-1">
                                    <button
                                        onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                                        className="p-1 bg-gray-700 hover:bg-gray-600 rounded transition"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="p-1 bg-red-600 hover:bg-red-500 rounded transition"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="p-1 bg-gray-700 hover:bg-gray-600 rounded transition disabled:opacity-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[12px]">{page} / {totalPages}</span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="p-1 bg-gray-700 hover:bg-gray-600 rounded transition disabled:opacity-50"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;
