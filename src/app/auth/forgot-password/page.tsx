// src/app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../services/api";
import Link from "next/link";
import { Loader } from "../../../components/common/Loader";

const ForgotPasswordPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            await api.post("/api/v1/auth/forgot-password", { email });
            setMessage("OTP sent to your email for password reset");
            router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Loader loading={loading} />
            <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
                <form className="relative bg-black border border-yellow-500/40 p-10 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.15)] w-full max-w-md" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold mb-6 text-center text-white">Forgot Password</h1>
                    <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-widest">Enter your email to receive OTP</p>

                    {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}
                    {message && <p className="text-green-500 mb-4 text-center font-medium">{message}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-6 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,0.2)] disabled:opacity-50"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        <Link href="/auth/login" className="hover:text-yellow-400 transition-colors">Back to Login</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgotPasswordPage;
