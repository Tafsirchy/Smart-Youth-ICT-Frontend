'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const methods = [
  { name: 'bKash', emoji: '📱', desc: 'Mobile Banking'  },
  { name: 'Nagad', emoji: '🟠', desc: 'Digital Wallet'  },
  { name: 'Visa',  emoji: '💳', desc: 'Card Payment'    },
  { name: 'Bank',  emoji: '🏦', desc: 'Manual Transfer' },
];

export default function PaymentMethodsSection() {
  return (
    <section className="section overflow-hidden relative" style={{ background: 'var(--color-dark)' }}>
      {/* Subtle shimmer blob */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.06), transparent 60%)' }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-custom text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Start Your Career Today
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Pay easily with your preferred method. Installment options available.
          </p>
        </motion.div>

        {/* Payment cards */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {methods.map(({ name, emoji, desc }) => (
            <motion.div
              key={name}
              variants={{
                hidden:  { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.2)' }}
              className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-center backdrop-blur-sm cursor-default"
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              <div className="text-3xl mb-1">{emoji}</div>
              <p className="text-white font-bold text-sm">{name}</p>
              <p className="text-white/60 text-xs">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-white/70 text-sm mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          💡 Installment payment available — split into 2–3 easy payments!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        >
          <Link
            href="/courses"
            id="cta-enroll-btn"
            className="btn-primary font-bold text-lg px-10 py-4 rounded-xl2 inline-block"
          >
            🎓 Browse All Courses
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
