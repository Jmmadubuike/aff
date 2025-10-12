"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function SubscribePage() {
  const gold = "#CDA23B";

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: gold }}>
            Stay in the Loop — Afro Fashion Fest 2025
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Subscribe to get updates, exclusive merch drops, ticket alerts, and
            behind-the-scenes moments from our digital media partners.
          </p>
        </div>

        {/* Featured Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="relative border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform">
            <Image
              src="/images/attendee-ticket.jpg"
              alt="Attendee Ticket"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <h2 className="text-xl font-semibold" style={{ color: gold }}>
                Attendee Ticket
              </h2>
              <p className="text-sm text-gray-400">Access to shows, music, and exhibitions.</p>
            </div>
          </div>

          <div className="relative border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform">
            <Image
              src="/images/vendor-stand.jpg"
              alt="Vendor Stand"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <h2 className="text-xl font-semibold" style={{ color: gold }}>
                Vendor Access
              </h2>
              <p className="text-sm text-gray-400">Exclusive booth and business showcase space.</p>
            </div>
          </div>
        </motion.div>

        {/* Merch Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: gold }}>
            Official Festival Merch
          </h2>
          <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-700 shadow-xl">
            <Image
              src="/images/merch.jpg" // your merch image path
              alt="Festival Merchandise"
              width={900}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-gray-400 mt-4">
            Get ready to rep the movement — Afro Fashion Fest merch drops soon!
          </p>
        </motion.div>

        {/* Latest Flyers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: gold }}
          >
            Latest Event Flyers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["flyer1.png", "flyer2.jpg", "flyer3.jpg", "flyer4.jpg", "flyer5.png", "flyer6.png", "flyer7.png", "flyer8.jpg", "flyer9.jpg",].map((flyer, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform"
              >
                <Image
                  src={`/images/${flyer}`}
                  alt={`Event Flyer ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* YouTube Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video mx-auto w-full max-w-4xl overflow-hidden rounded-lg shadow-xl border border-gray-700"
        >
          <iframe
            title="Five Stars Digital Media — Playlist"
            src="https://www.youtube.com/embed?list=PLZf5-LylzN7BH2nPMN_rg-wR58lj1nh68"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <span className="absolute top-2 left-2 bg-[#CDA23B] text-black text-xs font-semibold px-2 py-1 rounded">
            Official Media Partner
          </span>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10 gap-6 text-gray-400 hover:text-white transition-colors"
        >
          <Link href="https://facebook.com" target="_blank" className="hover:text-blue-600">
            <FaFacebookF size={22} />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400">
            <FaTwitter size={22} />
          </Link>
          <Link href="https://instagram.com/afrofashionfest" target="_blank" className="hover:text-pink-500">
            <FaInstagram size={22} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700">
            <FaLinkedinIn size={22} />
          </Link>
          <Link href="https://youtube.com/@fivestarsdigitalmedia.com" target="_blank" className="hover:text-red-600">
            <FaYoutube size={22} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
