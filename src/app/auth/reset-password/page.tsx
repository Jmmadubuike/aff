"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../../services/api";
import { Loader } from "../../../components/common/Loader";
import Link from "next/link";

// ✅ Inner component that uses useSearchParams()
function ResetPasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is missing from URL.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await api.post("/api/v1/auth/reset-password", { email, otp, newPassword });
      setMessage("Password reset successful!");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <form
          className="relative bg-black border border-yellow-500/40 p-10 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.15)] w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold mb-6 text-center text-white">Reset Password</h1>
          <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-widest">
            Enter OTP and new password
          </p>

          {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}
          {message && <p className="text-green-500 mb-4 text-center font-medium">{message}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
            required
          />
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,0.2)] disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-400">
            <Link href="/auth/login" className="hover:text-yellow-400 transition-colors">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

// ✅ Wrap with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
      <ResetPasswordInner />
    </Suspense>
  );
}
