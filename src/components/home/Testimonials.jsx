'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoStar, IoChatbubblesOutline } from 'react-icons/io5';
import api from '@/lib/api';

const STATIC = [
  { _id: '1', name: 'Nusrat Jahan', role: 'Web Dev Student', rating: 5, text: 'Best decision of my life! The instructors are very supportive and the projects are real. I landed my first client within a month.' },
  { _id: '2', name: 'Ariful Islam', role: 'SMM Student',     rating: 5, text: 'I learned more in 3 months here than in 3 years of self-study. The hands-on approach is absolutely unmatched.' },
  { _id: '3', name: 'Sadia Khanam', role: 'Design Student',  rating: 5, text: 'Got my first Fiverr order within 2 weeks of finishing the Graphic Design course. The portfolio projects were a game-changer!' },
  { _id: '4', name: 'Milon Ahmed',  role: 'AI Student',      rating: 5, text: 'The installment option made it possible for me to join without financial stress. Worth every taka invested!' },
  { _id: '5', name: 'Fatema Begum', role: 'Web Dev Student', rating: 5, text: 'From zero coding knowledge to building full-stack apps in 6 months. The mentors are incredibly dedicated.' },
  { _id: '6', name: 'Rakib Hasan',  role: 'SMM Student',     rating: 5, text: 'My agency earns ৳50,000+ per month. This course literally changed my financial life. Highly recommend to everyone.' },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <IoStar key={i} size={14} className="text-amber-400" />
      ))}
    </div>
  );
}

function getInitials(name) {
  return name?.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

const AVATAR_GRADIENTS = [
  'from-pink-500 to-rose-500', 'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-500', 'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-500', 'from-cyan-500 to-blue-500',
];

const container  = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardAnim   = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Testimonials() {
  const [reviews, setReviews] = useState(STATIC);

  useEffect(() => {
    api.get('/testimonials', { params: { status: 'approved', limit: 6 } })
      .then(res => { if (res.data?.data?.length) setReviews(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="section relative overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      {/* Subtle decorative blob */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-brand-pink)' }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="badge-pink mb-3">Student Reviews</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">What Our Students Say</h2>
          <p className="text-textSecondary mt-3 max-w-xl mx-auto text-sm">
            Don't take our word for it — hear from 5,000+ students who transformed their careers with SYICT.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {reviews.map(({ _id, name, role, rating, text }, idx) => (
            <motion.div key={_id} variants={cardAnim}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="card p-6 flex flex-col gap-4 relative">
              {/* Quote icon */}
              <IoChatbubblesOutline size={28} className="absolute top-5 right-5 opacity-10 text-textPrimary" />

              <StarRating count={rating || 5} />

              <p className="text-textSecondary text-sm leading-relaxed italic flex-1">
                &ldquo;{text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-xs font-extrabold shrink-0`}>
                  {getInitials(name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-textPrimary">{name}</p>
                  <p className="text-xs text-textSecondary">{role || (typeof reviews[0]?.course === 'object' ? reviews[0].course?.title?.en : '')}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall rating summary */}
        <motion.div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
          {[['4.9 / 5', '★ Average Rating'], ['5,000+', 'Happy Students'], ['100%', 'Would Recommend']].map(([val, lab]) => (
            <div key={lab}>
              <p className="text-3xl font-extrabold text-textPrimary">{val}</p>
              <p className="text-sm text-textSecondary mt-1">{lab}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
