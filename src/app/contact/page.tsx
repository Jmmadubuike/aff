"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function ContactForm() {
  const gold = "#CDA23B";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Attendee");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby41qg4i4VqMcSDF_4iuBcMfF7rn0EDeq2HqwrqPFO-XJs1e0RyxDoJ9zGyb-w3-dg-/exec";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, role, message }),
      });

      setStatus("success");

      // Clear fields
      setName("");
      setEmail("");
      setPhone("");
      setRole("Attendee");
      setMessage("");

      // Redirect based on role
      setTimeout(() => {
        if (role === "Attendee") router.push("/tickets/attendee");
        else if (role === "Vendor") router.push("/tickets/vendor");
        else if (role === "Designer" || role === "Model") router.push("/thank-you");
        else router.push("/tickets/attendee");
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="w-full py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left"
          style={{ color: gold }}
        >
          Join the <span className="italic">Afro Fashion Revolution</span>
        </h2>
        <p className="text-gray-400 mb-10 leading-relaxed text-center md:text-left">
          Experience the pinnacle of style and creativity at{" "}
          <span className="font-semibold">Afro Fashion Fest 2025</span>. Fill out
          the form below, and our elite team will connect with you to unlock
          exclusive opportunities.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-800"
        >
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-md px-4 py-3 bg-black border border-gray-700 focus:border-gold focus:ring focus:ring-gold/30 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md px-4 py-3 bg-black border border-gray-700 focus:border-gold focus:ring focus:ring-gold/30 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+234 000 0000 000"
              className="w-full rounded-md px-4 py-3 bg-black border border-gray-700 focus:border-gold focus:ring focus:ring-gold/30 outline-none transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md px-4 py-3 bg-black border border-gray-700 focus:border-gold focus:ring focus:ring-gold/30 outline-none transition"
            >
              <option>Attendee</option>
              <option>Model</option>
              <option>Designer</option>
              <option>Vendor</option>
              <option>Media</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              className="w-full rounded-md px-4 py-3 bg-black border border-gray-700 focus:border-gold focus:ring focus:ring-gold/30 outline-none transition resize-none"
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 rounded-md font-semibold text-black hover:scale-105 transition-transform"
            style={{ background: gold }}
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>

          {/* Feedback */}
          {status === "success" && (
            <p className="text-green-400 mt-2 text-center font-medium">
              Thank you! Redirecting to your ticket...
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 mt-2 text-center font-medium">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>

        {/* Social Media Icons */}
        <div className="flex justify-center mt-10 gap-6 text-gray-400 hover:text-white transition-colors">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com/afrofashionfest"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://youtube.com/@fivestarsdigitalmedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
