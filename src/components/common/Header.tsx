"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  ShoppingBag,
  User,
  ShoppingCart,
  Info,
  Box,
  LogIn,
  LayoutDashboard,
  Search,
  X,
  Menu,
} from "lucide-react";
import logo from "../../../public/assets/logo.png";
import Api from "../../services/api";

const Header = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Api.get("/api/v1/categories");
        const data = res.data;
        setCategories(Array.isArray(data) ? data : []);

      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!searchTerm) return setSearchResults([]);
    const timeout = setTimeout(async () => {
      try {
        const res = await Api.get(`/api/v1/products/search?query=${searchTerm}`);
        setSearchResults(Array.isArray(res.data.data) ? res.data.data : []);
      } catch {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Search", href: "/search", icon: <Box size={16} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={16} /> },
    ...(user
      ? [
        { name: "Orders", href: "/orders", icon: <ShoppingBag size={16} /> },
        { name: "Profile", href: "/profile", icon: <User size={16} /> },
        ...(user.role === "admin"
          ? [{ name: "Admin", href: "/admin", icon: <LayoutDashboard size={16} /> }]
          : []),
      ]
      : [{ name: "Login / Register", href: "/auth/login", icon: <LogIn size={16} /> }]),
    { name: "About", href: "/about", icon: <Info size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#fff] text-white shadow-lg h-16 lg:h-20">
      <nav className="w-[95%] mx-auto flex items-center justify-between h-full gap-4 relative">
        {/* Mobile Hamburger - Left */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-[#1D1D1D] transition"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Logo - Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0">
          <Link href="/">
            <Image src={logo} alt="Logo" width={50} height={50} className="rounded-md" />
          </Link>
        </div>

        {/* Brand Name - Right */}
        <div className="lg:hidden font-bold uppercase tracking-wider text-lg">
          Spray N Sniff
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 items-center h-full ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-colors 
                hover:bg-gradient-to-r hover:from-[#CDA23B] hover:to-[#2BAF9E] hover:text-black
                ${pathname === link.href ? "bg-gradient-to-r from-[#CDA23B] to-[#2BAF9E] text-black" : ""}`}
            >
              {link.icon}
              <span>{link.name}</span>
              {link.name === "Cart" && cartQuantity > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-6 h-6 text-[0.75rem] bg-black text-[#CDA23B] rounded-full font-semibold">
                  {cartQuantity}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Full-Screen Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex flex-col p-8 animate-fadeIn">
            <button
              className="self-end p-2 mb-6"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>
            <div className="flex flex-col gap-6 text-xl font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 hover:text-yellow-500 transition-colors"
                >
                  {link.icon}
                  {link.name}
                  {link.name === "Cart" && cartQuantity > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-sm bg-yellow-500 text-black rounded-full font-semibold">
                      {cartQuantity}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
