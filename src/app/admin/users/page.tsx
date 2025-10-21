"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { User, ChevronLeft, ChevronRight, Plus, Trash, Pencil } from "lucide-react";

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminUsersPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");

  const limit = 10;

  // Redirect non-admin users
  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/auth/login");
      else if (user.role !== "admin") router.replace("/");
    }
  }, [user, loading, router]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setFetching(true);
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search ? { search } : {}),
        ...(roleFilter ? { role: roleFilter } : {}),
        ...(verifiedFilter ? { isVerified: verifiedFilter } : {}),
      }).toString();

      const res = await api.get(`/api/v1/users?${query}`, { withCredentials: true });
      setUsers(res.data.users || []);
      setTotalPages(res.data.meta?.pages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && user?.role === "admin") fetchUsers();
  }, [loading, user, page, search, roleFilter, verifiedFilter]);

  // Delete user
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/api/v1/users/${id}`, { withCredentials: true });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
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
        <h1 className="text-lg font-bold">Users</h1>
        <button
          onClick={() => router.push("/admin/users/create")}
          className="flex items-center gap-1 px-3 py-1 bg-white text-black text-[12px] rounded hover:bg-gray-300 transition"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-black text-white"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-black text-white"
        >
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select
          value={verifiedFilter}
          onChange={(e) => setVerifiedFilter(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-black text-white"
        >
          <option value="">All</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-md border border-gray-700">
        <table className="min-w-full bg-black text-white text-[12px]">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-3 py-2 text-left text-gray-300">Name</th>
              <th className="px-3 py-2 text-left text-gray-300">Email</th>
              <th className="px-3 py-2 text-left text-gray-300">Role</th>
              <th className="px-3 py-2 text-left text-gray-300">Verified</th>
              <th className="px-3 py-2 text-left text-gray-300">Created At</th>
              <th className="px-3 py-2 text-left text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u._id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="px-3 py-2 font-medium">{u.name}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.role}</td>
                <td className="px-3 py-2">{u.isVerified ? "Yes ✅" : "No ❌"}</td>
                <td className="px-3 py-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-3 py-2 flex gap-1">
                  <button
                    onClick={() => router.push(`/admin/users/edit/${u._id}`)}
                    className="p-1 bg-gray-700 hover:bg-gray-600 rounded transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
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

export default AdminUsersPage;
