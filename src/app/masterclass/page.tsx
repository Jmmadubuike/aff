'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MasterclassPage() {
  const gold = '#CDA23B'
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  const speakers = [
    {
      name: 'Amaka Eze',
      topic: 'Sustainable Design in African Fashion',
      image: '/speakers/amaka.jpg',
    },
    {
      name: 'Tunde Alade',
      topic: 'Digital Storytelling & Fashion Media',
      image: '/speakers/tunde.jpg',
    },
    {
      name: 'Chika Okafor',
      topic: 'The Business of Fashion Innovation',
      image: '/speakers/chika.jpg',
    },
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
          <span style={{ color: gold }}>Masterclass</span>
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
        Masterclass Speakers
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-gray-400 text-center max-w-3xl mx-auto mb-16"
      >
        A dynamic lineup of creative leaders and innovators sharing their insights on design,
        storytelling, and the future of African fashion.
      </motion.p>

      {/* Speakers Grid */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {speakers.map((speaker, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-[#181818] p-6 rounded-xl border border-gray-800 hover:border-[#CDA23B]/60 transition-all"
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2" style={{ color: gold }}>
              {speaker.name}
            </h3>
            <p className="text-gray-300">{speaker.topic}</p>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
