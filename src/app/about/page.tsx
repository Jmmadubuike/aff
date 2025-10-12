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
          <span className="font-medium"> culture</span>, <span className="font-medium">technology</span>, and <span className="font-medium">storytelling</span>.<br />
          Proudly produced by <span style={{ color: gold, fontWeight: 600 }}>Five Stars Digital Media</span>, the Official Media Partner, capturing every moment in world-class quality.
        </motion.p>
      </section>

      {/* MISSION & OBJECTIVES */}
      <section
        className="relative py-28 px-6 md:px-12 text-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at top right, rgba(205,162,59,0.04), transparent), linear-gradient(180deg, #111 0%, #0a0a0a 100%)`,
        }}
      >
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#CDA23B]/5 to-transparent opacity-40" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-16 tracking-wide relative z-10"
          style={{
            color: '#fff',
            fontFamily: `'Playfair Display', serif`,
            letterSpacing: '0.02em',
          }}
        >
          Our <span style={{ color: '#CDA23B' }}>Mission</span> & Objectives
        </motion.h2>

        <div className="relative z-10 grid md:grid-cols-3 gap-10">
          {[
            {
              title: 'Showcase Talent',
              text: 'Highlight established designers and discover emerging talent on a global stage.',
              delay: 0,
            },
            {
              title: 'Digital Excellence',
              text: "Leverage Five Stars Digital Media’s expertise to create premium content, live coverage, and a lasting digital footprint.",
              delay: 0.2,
            },
            {
              title: 'Cultural Impact',
              text: 'Celebrate African culture, fashion, and storytelling while connecting with a global audience.',
              delay: 0.4,
            },
          ].map(({ title, text, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay }}
              className="group bg-[#1a1a1a] p-10 rounded-2xl border border-gray-800 shadow-lg hover:border-[#CDA23B]/40 hover:shadow-[0_0_30px_rgba(205,162,59,0.2)] transition-all duration-500"
            >
              <h3
                className="text-2xl font-semibold mb-3 transition-colors"
                style={{
                  color: '#CDA23B',
                  fontFamily: `'Playfair Display', serif`,
                }}
              >
                {title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Vision 2030 Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto relative z-10"
        >
          <h4
            className="text-2xl md:text-3xl font-semibold mb-6"
            style={{
              color: '#CDA23B',
              fontFamily: `'Playfair Display', serif`,
            }}
          >
            Vision 2030 — The Future of African Creative Renaissance
          </h4>
          <p className="text-gray-300 text-lg leading-relaxed">
            By 2030, Afro Fashion Fest envisions a digitally empowered ecosystem where creativity, culture, and commerce intersect seamlessly.
            Our mission extends beyond fashion — we are building a bridge between innovation and identity, giving Africa’s next generation of
            creators the tools to define their own narrative and export excellence to the world.
          </p>
        </motion.div>
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
