'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function RunwayPage() {
  const gold = '#CDA23B'
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  const highlights = [
    { title: 'Designer Showcases', desc: 'Top African designers present their latest collections on the grand runway.' },
    { title: 'Celebrity Guests', desc: 'Expect appearances from icons across culture, film, and entertainment.' },
    { title: 'Live Performances', desc: 'A fusion of music, art, and expression celebrating Africa’s creative spirit.' },
    { title: 'Red Carpet Moments', desc: 'Captured live by Five Stars Digital Media — where glamour meets storytelling.' },
  ]

  return (
    <main className="bg-[#0E0E0E] text-white min-h-screen py-24 px-6">
      {/* Breadcrumb & Back */}
      <div className="max-w-6xl mx-auto mb-12 flex justify-between items-center text-sm text-gray-400">
        <div>
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>{' '}
          <span className="text-gray-600 mx-2">›</span>
          <span style={{ color: gold }}>Runway</span>
        </div>
        <Link
          href="/"
          className="px-4 py-2 border border-gray-700 rounded-md hover:border-[#CDA23B]/60 hover:text-[#CDA23B] transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-6 text-center"
        style={{ color: gold, fontFamily: `'Playfair Display', serif` }}
      >
        Runway Experience
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-gray-400 text-center max-w-3xl mx-auto mb-16"
      >
        A celebration of fashion, culture, and art — where the boldest voices in African fashion take center stage.
      </motion.p>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-[#181818] p-8 rounded-xl border border-gray-800 hover:border-[#CDA23B]/60 transition-all text-left"
          >
            <h3 className="text-xl font-semibold mb-2" style={{ color: gold }}>
              {item.title}
            </h3>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
