"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../services/api";

interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    isVerified?: boolean;
    phone?: string;
}

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    verifyOTP: (email: string, otp: string) => Promise<void>;
    resendOTP: (email: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch current user on mount
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/v1/auth/me");
                setUser(res.data.user || null);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Redirect helper
    const handleRedirect = (u: User) => {
        if (u.role === "admin") router.replace("/admin");
        else router.replace("/");
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await api.post("/api/v1/auth/login", { email, password });
            const normalizedUser: User = {
                id: res.data.user.id,
                name: res.data.user.name,
                email: res.data.user.email,
                role: res.data.user.role,
                isVerified: res.data.user.isVerified,
            };
            setUser(normalizedUser);
            handleRedirect(normalizedUser);
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            await api.post("/api/v1/auth/register", { name, email, password });
            // After registration, redirect to verify-otp page with email
            router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
        } catch (err) {
            console.error("Registration failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const verifyOTP = async (email: string, otp: string) => {
        setLoading(true);
        try {
            await api.post("/api/v1/auth/verify-email", { email, otp });
            // After verification, optionally login or redirect to login page
            router.push("/auth/login");
        } catch (err) {
            console.error("OTP verification failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async (email: string) => {
        setLoading(true);
        try {
            await api.post("/api/v1/auth/resend-otp", { email });
        } catch (err) {
            console.error("Resend OTP failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        setLoading(true);
        try {
            await api.post("/api/v1/auth/forgot-password", { email });
            router.push("/auth/reset-password");
        } catch (err) {
            console.error("Forgot password failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string, otp: string, newPassword: string) => {
        setLoading(true);
        try {
            await api.post("/api/v1/auth/reset-password", { email, otp, newPassword });
            router.push("/auth/login");
        } catch (err) {
            console.error("Reset password failed:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await api.get("/api/v1/auth/logout");
            setUser(null);
            router.replace("/auth/login");
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                verifyOTP,
                resendOTP,
                forgotPassword,
                resetPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
