'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

// ─── Shared animation variants ───────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } }),
};

const stat = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, delay, ease: 'backOut' } }),
};

const stats = [
  { value: '5,000+', label: 'Students Trained' },
  { value: '৳50L+',  label: 'Student Earnings'  },
  { value: '4',      label: 'Expert Courses'    },
  { value: '100%',   label: 'Project-Based'     },
];

export default function HeroSection() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801000000000';

  return (
    <section
      className="relative overflow-hidden py-20 md:py-32 px-4"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Animated blob — pink */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-brand-pink)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Animated blob — green */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-brand-green-light)' }}
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container-lg relative z-10 text-center">
        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <span className="badge-pink text-sm mb-6 inline-block">
            🚀 Bangladesh&apos;s #1 Project-Based IT Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-textPrimary leading-tight mb-6"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
        >
          Learn IT Skills &amp; <br />
          <span className="text-gradient">Earn Real Money</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
        >
          Master Web Development, Graphic Design, Social Media Marketing &amp; AI.
          Work on real client projects while you study and earn before you graduate.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
        >
          <Link href="/courses" id="hero-enroll-btn" className="btn-primary text-base px-8 py-4 rounded-xl2">
            🎓 Enroll Now — Start Free
          </Link>
          <motion.a
            href={`https://wa.me/${waNumber}?text=Hi%20SYICT%2C%20I%20want%20to%20know%20more%20about%20your%20courses`}
            id="hero-whatsapp-btn"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex items-center gap-2 text-base px-8 py-4 rounded-xl2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </motion.a>
        </motion.div>

        {/* Social proof stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-center">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              variants={stat}
              initial="hidden"
              animate="visible"
              custom={0.4 + i * 0.1}
            >
              <p className="text-3xl font-extrabold text-textPrimary">{value}</p>
              <p className="text-sm text-textSecondary mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
