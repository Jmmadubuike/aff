'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import OfficialPartnerTag from './OfficialPartnerTag'

export default function Sponsors() {
  const gold = '#CDA23B'

  const logos = [
    { src: '/sponsor-1.jpg', alt: 'Sponsor 1', width: 200, height: 80 },
    { src: '/sponsor-2.jpg', alt: 'Sponsor 2', width: 200, height: 80 },
    { src: '/five-stars-logo.png', alt: 'Five Stars Digital Media', width: 200, height: 80 },
  ]

  return (
    <section className="mt-16 py-12 bg-[#1A1A1A]">
      {/* Section Title */}
      <motion.h4
        className="text-lg md:text-xl font-bold mb-8 text-center tracking-wide"
        style={{ color: gold, letterSpacing: '0.1em' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Sponsors & Partners Of Afro Fashion Fest (AFF)
      </motion.h4>

      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {logos.map((logo, i) => (
          <motion.div
            key={i}
            className="p-2 bg-gray-900 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain"
              priority
            />
          </motion.div>
        ))}
      </div>

      {/* Optional Caption */}
      <motion.p
        className="mt-6 text-center text-gray-400 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Proudly powered and captured by <span style={{ color: gold }}><OfficialPartnerTag />
        </span>
      </motion.p>
    </section>
  )
}
