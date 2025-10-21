// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Metadata for the app
export const metadata = {
  title: "Spray n Sniff - Perfume E-commerce",
  description: "Luxury perfumes delivered to your doorstep",
  icons: {
    icon: "/assets/logo.png", // <-- use URL path, not imported module
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-black text-white`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
