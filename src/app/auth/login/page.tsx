// src/app/auth/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";
import { Loader } from "../../../components/common/Loader";

const LoginPage = () => {
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(user.role === "admin" ? "/admin" : "/");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.replace("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading || authLoading} />
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <form className="relative bg-black border border-white p-10 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.15)] w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-6 text-center text-white">Welcome Back</h1>
          <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-widest">Spray n Sniff Portal</p>

          {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-lg border border-white bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,0.2)] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

          <div className="mt-6 flex justify-between text-sm text-gray-400">
            <Link href="/auth/register" className="hover:text-yellow-400 transition-colors">
              Create Account
            </Link>
            <Link href="/auth/forgot-password" className="hover:text-yellow-400 transition-colors">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
