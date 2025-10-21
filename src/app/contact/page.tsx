"use client";

import React, { useState } from "react";
import api from "../../services/api"; // ✅ use your configured axios instance

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      const res = await api.post("/api/v1/contacts", form);

      if (res.data?.status) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(res.data?.message || "Failed to send message.");
      }
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      alert(
        err?.response?.data?.message ||
        "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center mb-6 tracking-tight">
        Contact Us
      </h1>
      <p className="text-center text-gray-400 max-w-3xl mb-12 text-lg">
        Have questions, feedback, or need assistance? Our team is here to help.
        Fill out the form below and we’ll get back to you promptly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl flex flex-col gap-6 bg-[#111] border border-white rounded-2xl p-10 shadow-[0_0_25px_rgba(255,215,0,0.1)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-4 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-4 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="p-4 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          className="p-4 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`${loading ? "bg-gray-500 cursor-not-allowed" : "bg-white hover:bg-yellow-400"
            } text-black font-semibold px-8 py-3 rounded-lg shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all duration-300`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {submitted && (
          <p className="text-green-400 text-center mt-2">
            ✅ Thank you! Your message has been sent.
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactUs;
