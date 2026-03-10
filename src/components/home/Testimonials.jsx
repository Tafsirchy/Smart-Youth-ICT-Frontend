'use client';

import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const reviews = [
  { id: 1, name: 'Nusrat Jahan', rating: 5, text: 'Best decision of my life! The instructors are very supportive and the projects are real.', role: 'Web Dev Student' },
  { id: 2, name: 'Ariful Islam', rating: 5, text: 'I learned more in 3 months here than in 3 years of self-study. Highly recommended!',        role: 'SMM Student'    },
  { id: 3, name: 'Sadia Khanam', rating: 5, text: 'Got my first Fiverr order within 2 weeks of finishing the Graphic Design course. Amazing!',   role: 'Design Student' },
  { id: 4, name: 'Milon Ahmed',  rating: 5, text: 'The payment system is easy and installment option helped me join without financial stress.',   role: 'AI Student'    },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 400, damping: 12 }}
        >
          <HiStar size={16} style={{ color: '#FBBF24' }} />
        </motion.span>
      ))}
    </div>
  );
}

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Testimonials() {
  return (
    <section className="section" style={{ background: 'var(--color-background)' }}>
      <div className="container-lg px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-pink mb-3">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">What Students Say</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {reviews.map(({ id, name, rating, text, role }) => (
            <motion.div
              key={id}
              variants={cardVariant}
              className="card p-6"
              whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Stars count={rating} />
              <p className="text-textSecondary text-sm mt-3 leading-relaxed italic">&ldquo;{text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  {name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-textPrimary">{name}</p>
                  <p className="text-xs text-textSecondary">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
