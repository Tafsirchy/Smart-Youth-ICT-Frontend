'use client';

import { motion } from 'framer-motion';
import { HiLightningBolt, HiBriefcase, HiCurrencyBangladeshi, HiStar, HiAcademicCap, HiGlobeAlt } from 'react-icons/hi';

const reasons = [
  { Icon: HiLightningBolt,         title: 'Project-Based Learning',  desc: 'Learn by building real projects for real clients — not just watching videos.', color: 'var(--color-brand-pink)' },
  { Icon: HiBriefcase,             title: 'Internship Program',       desc: 'Get placed in real internships and build your professional portfolio.',         color: 'var(--color-brand-green)' },
  { Icon: HiCurrencyBangladeshi,   title: 'Earn While You Study',     desc: 'Pay your course fee from your own earnings on real freelance projects.',         color: 'var(--color-brand-green-light)' },
  { Icon: HiStar,                  title: 'Expert Instructors',       desc: 'Learn from industry professionals with 5–10 years of real-world experience.',     color: 'var(--color-brand-pink)' },
  { Icon: HiAcademicCap,           title: 'Verified Certificate',     desc: 'Receive a verified digital certificate recognised by top employers.',             color: 'var(--color-brand-green)' },
  { Icon: HiGlobeAlt,              title: 'Global Freelancing',       desc: 'We guide you to land projects on Fiverr, Upwork & local marketplaces.',          color: 'var(--color-brand-pink-light)' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function WhyChooseUs() {
  return (
    <section className="section" style={{ background: 'var(--color-surface)' }}>
      <div className="container-lg px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-green mb-3">Why SYICT?</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">
            Not Just a Course — A Career Launch Pad
          </h2>
          <p className="text-textSecondary mt-3 max-w-xl mx-auto">
            We combine training, internship, and real income into one powerful program.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {reasons.map(({ Icon, title, desc, color }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="card p-6 flex gap-4"
              whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${color}18` }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <div>
                <h3 className="font-semibold text-textPrimary mb-1">{title}</h3>
                <p className="text-sm text-textSecondary leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
