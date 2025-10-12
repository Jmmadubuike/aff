'use client'

import { motion } from 'framer-motion'

export default function OfficialPartnerTag() {
    const gold = '#CDA23B'

    return (
        <motion.a
            href="https://fivestarsdigitalmedia.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block mb-6 rounded-full border border-gray-700 backdrop-blur-sm px-4 py-1.5 text-sm font-medium hover:border-[#CDA23B]/60 hover:text-[#CDA23B] transition-all"
            style={{ background: 'rgba(255,255,255,0.03)' }}
        >
            Official Media Partner — <span style={{ color: gold }}>Five Stars Digital Media</span>
        </motion.a>
    )
}
