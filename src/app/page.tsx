'use client'

import Link from 'next/link'
import Sponsors from '@/components/Sponsors'
import { motion } from 'framer-motion'
import OfficialPartnerTag from '@/components/OfficialPartnerTag'

export default function Home() {
  const gold = '#CDA23B'
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="bg-[#0E0E0E] text-white antialiased font-sans overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(205,162,59,0.08), transparent), linear-gradient(180deg, #0E0E0E 0%, #111 100%)`,
        }}
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
          style={{ fontFamily: `'Playfair Display', serif` }}
        >
          Afro Fashion Fest <span style={{ color: gold }}>2025</span>
        </motion.h1>

        <motion.span
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-8"
        >
          November 27–28 · Umuahia, Nigeria
        </motion.span>

        {/* Partner Tag */}
        <OfficialPartnerTag />

        {/* Subheadline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-300 leading-relaxed"
        >
          Where <span style={{ color: gold }}>fashion</span> converges with{' '}
          <span className="text-white font-semibold">culture</span>,{' '}
          <span className="text-white font-semibold">technology</span>, and{' '}
          <span className="text-white font-semibold">storytelling</span>.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/register"
            className="px-8 py-3 rounded-md font-semibold text-black transition-all duration-300 hover:scale-[1.02]"
            style={{ background: gold }}
          >
            Attend the Event
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-md font-semibold border border-gray-600 text-white hover:bg-gray-900 transition"
          >
            Designers & Models Apply
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-md font-semibold border border-gray-600 text-white hover:bg-gray-900 transition"
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

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
      </section>

      {/* EXPERIENCE / SCHEDULE */}
      <section className="py-24 text-center max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-16"
          style={{ color: gold, fontFamily: `'Playfair Display', serif` }}
        >
          The Experience
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              day: 'Nov 27',
              title: 'Masterclass Day',
              desc: 'Learn · Inspire · Network',
              href: '/masterclass',
            },
            {
              day: 'Nov 28',
              title: 'Runway Show',
              desc: 'Fashion · Culture · Celebration',
              href: '/runway',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link
                href={item.href}
                className="block bg-[#181818] p-10 rounded-2xl border border-gray-800 hover:border-[#CDA23B]/60 hover:shadow-[0_0_30px_rgba(205,162,59,0.25)] transition-all group"
              >
                <h3 className="text-2xl font-semibold mb-3" style={{ color: gold }}>
                  {item.day}
                </h3>
                <p className="text-xl font-medium mb-2 group-hover:text-white transition">{item.title}</p>
                <p className="text-gray-400 group-hover:text-gray-300">{item.desc}</p>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>

      {/* MEDIA HIGHLIGHTS */}
      <section className="py-24 text-center relative px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ color: gold, fontFamily: `'Playfair Display', serif` }}
        >
          Event Highlights
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video mx-auto w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl border border-gray-800"
        >
          <iframe
            title="Five Stars Digital Media — Playlist"
            src="https://www.youtube.com/embed?list=PLZf5-LylzN7BH2nPMN_rg-wR58lj1nh68"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <span className="absolute top-3 left-3 bg-[#CDA23B] text-black text-xs font-semibold px-3 py-1 rounded">
            Official Media Partner
          </span>
        </motion.div>

      </section>

      {/* SPONSORS */}
      <section className="py-24 bg-[#101010] text-center border-t border-gray-800">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: gold, fontFamily: `'Playfair Display', serif` }}
        >
          Our Sponsors
        </motion.h2>
        <Sponsors />
      </section>
    </main>
  )
}
