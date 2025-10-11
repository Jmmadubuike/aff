'use client'

import Link from 'next/link'
import Sponsors from '@/components/Sponsors'
import { motion } from 'framer-motion'

export default function Home() {
  const gold = '#CDA23B'
  const charcoal = '#1A1A1A'

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="bg-[#1A1A1A] text-white antialiased font-sans">

      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at top left, rgba(205,162,59,0.05), transparent), linear-gradient(180deg, #1A1A1A 0%, #111 100%)`,
        }}
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-2 tracking-wide"
          style={{ fontFamily: `'Playfair Display', serif`, color: 'white' }}
        >
          Afro Fashion Fest <span style={{ color: gold }}>2025</span>
        </motion.h1>

        <motion.span
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm uppercase tracking-widest text-gray-400 mb-6 block"
        >
          Two-Day Experience · Nov 27–28 · Umuahia, Nigeria
        </motion.span>

        {/* Official Media Partner Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-block px-4 py-1 mb-6 rounded-full border text-sm text-white font-medium tracking-wide"
          style={{ background: 'rgba(205,162,59,0.05)', borderColor: gold }}
        >
          Official Media Partner — <span style={{ color: gold }}>Five Stars Digital Media</span>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-300"
        >
          Where <span style={{ color: gold }}>high fashion</span> meets <span className="font-medium text-white">culture</span>, <span className="font-medium text-white">technology</span>, and <span className="font-medium text-white">storytelling</span>.<br />
          Proudly powered by <span style={{ color: gold, fontWeight: 600 }}>Five Stars Digital Media</span>, the Official Media Partner.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/register"
            className="px-8 py-3 rounded-md font-semibold transition-all duration-300"
            style={{ background: gold, color: '#000' }}
          >
            Attend the Event
          </Link>
          <Link
            href="/apply-talent"
            className="px-8 py-3 rounded-md font-semibold border border-gray-600 text-white hover:bg-gray-800 transition"
          >
            Designers & Models Apply
          </Link>
          <Link
            href="/partner-vendor"
            className="px-8 py-3 rounded-md font-semibold border border-gray-600 text-white hover:bg-gray-800 transition"
          >
            Vendors & Exhibitors
          </Link>
          <Link
            href="/subscribe"
            className="px-8 py-3 rounded-md font-semibold text-gray-400 hover:text-white transition"
          >
            Get Event Updates
          </Link>
        </motion.div>
      </section>

      {/* EVENT SCHEDULE */}
      <section className="py-24 text-center max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12"
          style={{ color: gold }}
        >
          Event Schedule
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#222] p-8 rounded-lg shadow-lg border border-gray-700 flex-1 hover:shadow-[0_0_40px_rgba(205,162,59,0.4)] transition"
          >
            <h3 className="text-2xl font-semibold mb-2" style={{ color: gold }}>Nov 27</h3>
            <p className="text-gray-300">Masterclass Day — Learn, Inspire, Network</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#222] p-8 rounded-lg shadow-lg border border-gray-700 flex-1 hover:shadow-[0_0_40px_rgba(205,162,59,0.4)] transition"
          >
            <h3 className="text-2xl font-semibold mb-2" style={{ color: gold }}>Nov 28</h3>
            <p className="text-gray-300">Runway Show — Fashion, Culture, & Celebration</p>
          </motion.div>
        </div>
      </section>

      {/* MEDIA / HIGHLIGHTS */}
      <section className="py-24 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12"
          style={{ color: gold }}
        >
          Event Highlights
        </motion.h2>
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
          {/* Optional overlay badge */}
          <span className="absolute top-2 left-2 bg-[#CDA23B] text-black text-xs font-semibold px-2 py-1 rounded">
            Official Media Partner
          </span>
        </motion.div>
      </section>

      {/* SPONSORS */}
      <section className="py-24 bg-[#111] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-12"
          style={{ color: gold }}
        >
          Our Sponsors
        </motion.h2>
        <Sponsors />
      </section>
    </main>
  )
}
