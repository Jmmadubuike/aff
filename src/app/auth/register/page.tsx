// src/app/auth/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { Loader } from "../../../components/common/Loader";

const RegisterPage = () => {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await register(name, email, password);
            // Redirect to verify OTP page with email in query
            router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Loader loading={loading} />
            <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
                <form
                    onSubmit={handleSubmit}
                    className="relative bg-black border border-yellow-500/40 p-10 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.15)] w-full max-w-md transition-transform transform hover:scale-[1.02]"
                >
                    <h1 className="text-4xl font-bold mb-6 text-center text-white">
                        Create Account
                    </h1>
                    <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-widest">
                        Spray n Sniff Portal
                    </p>

                    {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-4 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 px-4 py-3 rounded-lg border border-yellow-500/40 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,0.2)] disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <div className="mt-6 flex justify-between text-sm text-gray-400">
                        <span
                            onClick={() => router.push("/auth/login")}
                            className="hover:text-yellow-400 cursor-pointer transition-colors"
                        >
                            Already have an account? Login
                        </span>
                        <span
                            onClick={() => router.push("/auth/forgot-password")}
                            className="hover:text-yellow-400 cursor-pointer transition-colors"
                        >
                            Forgot Password?
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
