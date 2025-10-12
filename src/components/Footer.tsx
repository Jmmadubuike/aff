"use client";
import { useEffect, useState } from "react";
import { FiYoutube, FiInstagram, FiArrowUp } from "react-icons/fi";
import OfficialPartnerTag from "./OfficialPartnerTag";

export default function Footer() {
  const gold = "#CDA23B";
  const [showTop, setShowTop] = useState(false);

  // Show "Back to Top" button after scrolling
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative border-t border-gray-800 bg-[#111] text-gray-400 mt-12">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        
        {/* Left Text */}
        <div className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span style={{ color: gold }}>Afro Fashion Fest 2025</span> — Produced by{" "}
          <OfficialPartnerTag />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.youtube.com/@fivestarsdigitalmedia"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition"
            title="Five Stars YouTube"
          >
            <FiYoutube size={22} />
          </a>
          <a
            href="https://instagram.com/afrofashionfest"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition"
            title="Afro Fashion Fest Instagram"
          >
            <FiInstagram size={22} />
          </a>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg border border-gray-700 bg-[#111] text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300"
          title="Back to top"
        >
          <FiArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
