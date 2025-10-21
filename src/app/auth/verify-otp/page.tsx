"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../../services/api";
import { Loader } from "../../../components/common/Loader";

const VerifyOTPInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Countdown for resend OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/api/v1/auth/verify-email", { email, otp });
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendLoading(true);
    setError("");
    setMessage("");
    try {
      await api.post("/api/v1/auth/resend-otp", { email });
      setMessage("OTP resent successfully");
      setResendCooldown(30);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading || resendLoading} />
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <form
          onSubmit={handleSubmit}
          className="relative bg-black border border-yellow-500/40 p-10 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.15)] w-full max-w-md"
        >
          <h1 className="text-4xl font-bold mb-6 text-center text-white">Verify Email</h1>
          <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-widest">
            Enter OTP sent to your email
          </p>

          {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}
          {message && <p className="text-green-500 mb-4 text-center font-medium">{message}</p>}

          <input
            type="email"
            value={email}
            disabled
            className="w-full mb-4 px-4 py-3 rounded-lg border border-yellow-500/40 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
          />
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,0.2)] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-sm text-yellow-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            <span
              className="text-white font-medium cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-10">Loading...</div>}>
      <VerifyOTPInner />
    </Suspense>
  );
}
