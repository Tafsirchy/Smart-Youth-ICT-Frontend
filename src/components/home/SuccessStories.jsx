'use client';

import { motion } from 'framer-motion';

const stories = [
  { id: 1, name: 'Md. Rahul Islam',  course: 'Web Development',        income: '৳35,000/month', story: 'I was unemployed for 2 years. After 6 months at SYICT, I landed 3 Upwork clients and now earn more than my friends with university degrees.', avatar: '👨‍💻' },
  { id: 2, name: 'Fatema Akter',     course: 'Social Media Marketing',  income: '৳25,000/month', story: 'SYICT gave me the confidence and skills to run Facebook ad campaigns. Now I manage 5 local businesses from home.',                          avatar: '👩‍💼' },
  { id: 3, name: 'Karim Hossain',    course: 'Graphic Design',          income: '৳40,000/month', story: 'Started on Fiverr with a $5 logo. Now I have a Level 2 Fiverr account earning over $400/month and growing.',                               avatar: '🎨' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden:  { opacity: 0, scale: 0.92, y: 24 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function SuccessStories() {
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
          <span className="badge-pink mb-3">Real Results</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">Student Success Stories</h2>
          <p className="text-textSecondary mt-3">Our students are earning real income — here&apos;s proof.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stories.map(({ id, name, course, income, story, avatar }) => (
            <motion.div
              key={id}
              variants={cardVariant}
              className="rounded-xl p-6 border border-border flex flex-col gap-4"
              style={{ background: 'var(--color-surface)' }}
              whileHover={{ borderColor: 'var(--color-brand-pink)', boxShadow: 'var(--shadow-hover)' }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="text-4xl"
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                >
                  {avatar}
                </motion.div>
                <div>
                  <p className="text-textPrimary font-semibold">{name}</p>
                  <p className="text-xs text-textSecondary">{course}</p>
                </div>
                <span className="ml-auto badge-green text-xs">{income}</span>
              </div>
              <p className="text-sm text-textSecondary leading-relaxed italic">&ldquo;{story}&rdquo;</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
