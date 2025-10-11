'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const gold = '#CDA23B';
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Register', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
            <Image src="/logo.jpg" alt="Logo" width={28} height={28} className="object-contain" />
          </div>
          <span className="font-bold text-lg" style={{ color: gold }}>
            Afro Fashion Fest
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://www.youtube.com/@fivestarsdigitalmedia"
            target="_blank"
            rel="noreferrer"
            className="ml-4 px-4 py-2 rounded font-semibold text-black"
            style={{ background: gold }}
          >
            Official Media Partner
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 text-2xl transition-all duration-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white font-medium"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://www.youtube.com/@fivestarsdigitalmedia"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded font-semibold text-black text-lg"
            style={{ background: gold }}
          >
            Official media partner
          </a>

          <button
            className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      )}
    </nav>
  );
}
