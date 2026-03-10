'use client';

import { motion } from 'framer-motion';

const steps = [
  { step: '01', emoji: '📝', title: 'Enroll',       desc: 'Choose a course and complete payment via bKash, Nagad, or card.' },
  { step: '02', emoji: '📚', title: 'Learn',         desc: 'Watch video lessons, complete assignments, and pass quizzes.'     },
  { step: '03', emoji: '💼', title: 'Work',          desc: 'Get placed on real client projects and internship opportunities.'  },
  { step: '04', emoji: '💰', title: 'Earn',          desc: 'Receive income from freelance projects while still studying.'      },
  { step: '05', emoji: '🏆', title: 'Get Certified', desc: 'Download your verified certificate and boost your portfolio.'     },
];

export default function HowItWorks() {
  return (
    <section className="section" style={{ background: 'var(--color-background)' }}>
      <div className="container-lg px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-green mb-3">The SYICT Method</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">How It Works</h2>
          <p className="text-textSecondary mt-3">From zero to earning in 5 simple steps</p>
        </motion.div>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-brand-pink to-transparent opacity-30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map(({ step, emoji, title, desc }, i) => (
              <motion.div
                key={step}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto mb-4 text-2xl font-extrabold text-white"
                  style={{ background: 'var(--gradient-cta)' }}
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                >
                  {emoji}
                </motion.div>
                <span className="text-xs font-bold tracking-widest text-textSecondary">{step}</span>
                <h3 className="font-bold text-textPrimary text-base mt-1 mb-2">{title}</h3>
                <p className="text-xs text-textSecondary leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
