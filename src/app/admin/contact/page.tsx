"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";
import { Loader2, Trash2, Eye, Send, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

// Define message structure
interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  adminReply?: string;
  createdAt?: string;
}

const AdminContactPage = () => {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetching, setFetching] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (!loading && user && user.role !== "admin") {
      window.location.href = "/";
    }
  }, [user, loading]);

  const fetchMessages = async (pageNum = 1) => {
    try {
      setFetching(true);
      const res = await api.get(`/api/v1/contacts?page=${pageNum}&limit=${limit}`);
      setMessages(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages);
      setPage(res.data.pagination.page);
    } catch (err) {
      toast.error("Failed to fetch messages");
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/api/v1/contacts/${id}`);
      fetchMessages(page);
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.put(`/api/v1/contacts/${id}/status`, { status });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status } : msg))
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleView = async (msg: Message) => {
    setSelectedMessage(msg);
    if (msg.status === "new") await handleStatusChange(msg._id, "read");
  };

  const handleReply = async () => {
    if (!reply.trim()) return toast.error("Reply cannot be empty");
    if (!selectedMessage) return;

    setReplying(true);
    try {
      await api.post(`/api/v1/contacts/${selectedMessage._id}/reply`, {
        replyMessage: reply,
      });

      toast.success("Reply sent successfully");
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === selectedMessage._id
            ? { ...msg, status: "responded", adminReply: reply }
            : msg
        )
      );
      setReply("");
      setSelectedMessage(null);
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setReplying(false);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  if (fetching || loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Loading messages...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-8 py-20">
      <h1 className="text-4xl font-bold mb-8 border-b border-yellow-500 pb-3">
        Contact Messages
      </h1>

      {messages.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No messages found yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-[#111] border border-gray-800 rounded-2xl shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-yellow-500 text-black">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="border-b border-gray-800 hover:bg-[#1a1a1a] transition-all"
                  >
                    <td className="p-4">{msg.name}</td>
                    <td className="p-4 text-yellow-400">{msg.email}</td>
                    <td className="p-4">{msg.subject}</td>
                    <td className="p-4">
                      <select
                        value={msg.status}
                        onChange={(e) =>
                          handleStatusChange(msg._id, e.target.value)
                        }
                        className="bg-black border border-gray-600 text-white rounded-lg px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="responded">Responded</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="p-4 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => handleView(msg)}
                        className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-400"
                      >
                        <Eye className="w-4 h-4 text-black" />
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-2 bg-red-600 rounded-lg hover:bg-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 border border-gray-700 rounded-lg hover:bg-[#222] disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 border border-gray-700 rounded-lg hover:bg-[#222] disabled:opacity-40"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-[#111] p-8 rounded-2xl max-w-lg w-full border border-yellow-500">
            <h2 className="text-2xl font-bold mb-3">{selectedMessage.subject}</h2>
            <p className="text-gray-400 mb-2">
              From: <span className="text-yellow-400">{selectedMessage.email}</span>
            </p>
            <p className="mb-6">{selectedMessage.message}</p>

            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
              rows={4}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 border border-gray-600 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleReply}
                disabled={replying}
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg flex items-center gap-2 hover:bg-yellow-400"
              >
                {replying ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminContactPage;
