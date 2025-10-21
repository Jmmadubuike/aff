"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PlusCircle, Trash2, Edit3 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Redirect non-admin users
  useEffect(() => {
    if (!authLoading) {
      if (!user) router.replace("/auth/login");
      else if (user.role !== "admin") router.replace("/");
    }
  }, [user, authLoading, router]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/v1/categories", { withCredentials: true });
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") fetchCategories();
  }, [user]);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or update category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (editingCategory) {
        await api.put(`/api/v1/categories/${editingCategory._id}`, formData, {
          withCredentials: true,
        });
        toast.success("Category updated successfully");
      } else {
        await api.post("/api/v1/categories", formData, { withCredentials: true });
        toast.success("Category created successfully");
      }
      setFormVisible(false);
      setFormData({ name: "", description: "" });
      setEditingCategory(null);
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save category");
    }
  };

  // Delete category
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await api.delete(`/api/v1/categories/${id}`, { withCredentials: true });
      toast.success("Category deleted");
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-[12px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-black text-white text-[12px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <button
          onClick={() => {
            setFormVisible(true);
            setEditingCategory(null);
            setFormData({ name: "", description: "" });
          }}
          className="flex items-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded font-semibold"
        >
          <PlusCircle className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Category list */}
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-gray-900 p-4 rounded-md flex flex-col justify-between hover:bg-gray-800 transition"
            >
              <div>
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                <p className="text-gray-400 text-sm">{cat.description || "No description"}</p>
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => {
                    setEditingCategory(cat);
                    setFormData({ name: cat.name, description: cat.description || "" });
                    setFormVisible(true);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded text-[11px]"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-[11px]"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-md relative">
            <h2 className="text-lg font-bold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded bg-gray-800 border border-gray-700 text-white text-[12px]"
              />
              <textarea
                name="description"
                placeholder="Description (optional)"
                value={formData.description}
                onChange={handleChange}
                className="p-2 rounded bg-gray-800 border border-gray-700 text-white text-[12px]"
                rows={3}
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormVisible(false);
                    setEditingCategory(null);
                    setFormData({ name: "", description: "" });
                  }}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded"
                >
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
