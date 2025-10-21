"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand & description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Spray n Sniff</h2>
          <p className="text-gray-400 text-sm">
            Discover premium fragrances delivered to your doorstep.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-white hover:text-gray-400 transition" />
            </a>
            <a href="https://www.instagram.com/spray_n_sniff01" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-white hover:text-gray-400 transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-white hover:text-gray-400 transition" />
            </a>
            <a href="mailto:info@spraynsniff.com" aria-label="Email">
              <Mail className="w-5 h-5 text-white hover:text-gray-400 transition" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/products" className="hover:text-white transition">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-white transition">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-medium mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">Market Square at Aburime street Ekpoma, Edo State, Nigeria</p>
          <p className="text-gray-400 text-sm mt-1">Phone: +234 903 072 8193</p>
          <p className="text-gray-400 text-sm mt-1">Phone: +234 903 486 2514</p>
          <p className="text-gray-400 text-sm mt-1">Email: info@spraynsniff.com</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-6">
        <p className="text-center text-gray-500 text-sm py-4">
          &copy; {new Date().getFullYear()} Spray n Sniff. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
