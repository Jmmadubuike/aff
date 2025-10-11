'use client'

import { motion } from 'framer-motion'
import Sponsors from '@/components/Sponsors'

export default function AboutPage() {
  const gold = '#CDA23B'
  const charcoal = '#1A1A1A'

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="bg-[#1A1A1A] text-white antialiased">

      {/* HERO SECTION */}
      <section
        className="relative w-full py-32 text-center flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at top left, rgba(205,162,59,0.03), transparent), linear-gradient(180deg, #1A1A1A 0%, #111 100%)`,
        }}
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 tracking-wide"
          style={{ fontFamily: `'Playfair Display', serif` }}
        >
          About Afro Fashion Fest <span style={{ color: gold }}>2025</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.2 }}
          className="uppercase text-sm tracking-[0.2em] text-gray-400 mb-6"
        >
          3rd Edition · Two-Day Experience · Nov 27–28 · Umuahia, Nigeria
        </motion.p>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Afro Fashion Fest is a <span style={{ color: gold }}>luxury celebration of African fashion</span>,
          <span className="font-medium"> culture</span>, <span className="font-medium">technology</span>, and <span className="font-medium">storytelling</span>.<br/>
          Proudly produced by <span style={{ color: gold, fontWeight: 600 }}>Five Stars Digital Media</span>, the Official Media Partner, capturing every moment in world-class quality.
        </motion.p>
      </section>

      {/* MISSION & OBJECTIVES */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12"
          style={{ color: gold }}
        >
          Our Mission & Objectives
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#222] p-8 rounded-lg shadow-lg border border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-2" style={{ color: gold }}>Showcase Talent</h3>
            <p className="text-gray-300">Highlight established designers and discover emerging talent on a global stage.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#222] p-8 rounded-lg shadow-lg border border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-2" style={{ color: gold }}>Digital Excellence</h3>
            <p className="text-gray-300">Leverage Five Stars Digital Media’s expertise to create premium content, live coverage, and a lasting digital footprint.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#222] p-8 rounded-lg shadow-lg border border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-2" style={{ color: gold }}>Cultural Impact</h3>
            <p className="text-gray-300">Celebrate African culture, fashion, and storytelling while connecting with a global audience.</p>
          </motion.div>
        </div>
      </section>

      {/* HISTORY & LEGACY */}
      <section className="py-24 bg-[#111] text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12"
          style={{ color: gold }}
        >
          About This 3rd Edition
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed"
        >
          The 3rd edition of Afro Fashion Fest builds on our legacy of excellence, bringing together top designers, models, and cultural innovators. 
          Attendees can expect a luxurious runway experience, exclusive masterclasses, and world-class digital coverage.
        </motion.p>
      </section>

      {/* SPONSORS */}
      <section className="py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-12"
          style={{ color: gold }}
        >
          Our Sponsors & Partners
        </motion.h2>
        <Sponsors />
      </section>
    </main>
  )
}
