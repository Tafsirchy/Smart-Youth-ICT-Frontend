'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiClock, HiAcademicCap, HiArrowRight } from 'react-icons/hi';

const courses = [
  { id: 'web-dev',       emoji: '💻', title: 'Web Development',         subtitle: 'HTML, CSS, JS, React, Next.js, Node.js, MongoDB', duration: '6 Months', price: '৳8,000', badge: 'Most Popular', badgeColor: 'badge-pink',  slug: 'web-development'      },
  { id: 'smm',           emoji: '📱', title: 'Social Media Marketing',   subtitle: 'Facebook Ads, Google Ads, Content Strategy, Analytics', duration: '3 Months', price: '৳5,000', badge: 'High Demand',  badgeColor: 'badge-green', slug: 'social-media-marketing' },
  { id: 'graphic-design',emoji: '🎨', title: 'Graphic Design',           subtitle: 'Photoshop, Illustrator, Canva, Logo & Brand Design',    duration: '3 Months', price: '৳5,500', badge: 'Creative',     badgeColor: 'badge-pink',  slug: 'graphic-design'       },
  { id: 'ai-prompting',  emoji: '🤖', title: 'AI & Prompt Engineering',  subtitle: 'ChatGPT, Midjourney, Automation, AI Tools for Freelancing', duration: '2 Months', price: '৳4,000', badge: 'Future Skills',badgeColor: 'badge-green', slug: 'ai-prompt-engineering' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function PopularCourses() {
  return (
    <section className="section" style={{ background: 'var(--color-surface)' }}>
      <div className="container-lg px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-pink mb-3">Our Courses</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">Popular Courses</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/courses" className="btn-outline text-sm px-5 py-2.5 flex items-center gap-1">
              View All <HiArrowRight />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={cardVariant}
              whileHover={{ y: -6, boxShadow: 'var(--shadow-hover)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            >
              <Link href={`/courses/${course.slug}`} id={`course-card-${course.id}`}>
                <div className="card p-5 h-full flex flex-col cursor-pointer">
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ rotate: [0, 6, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: courses.indexOf(course) * 0.5 }}
                  >
                    {course.emoji}
                  </motion.div>
                  <span className={`${course.badgeColor} mb-2 self-start`}>{course.badge}</span>
                  <h3 className="font-bold text-textPrimary text-lg mb-1">{course.title}</h3>
                  <p className="text-xs text-textSecondary flex-1 leading-relaxed">{course.subtitle}</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-textSecondary">
                      <HiClock size={14} /> {course.duration}
                    </span>
                    <span className="font-extrabold text-lg" style={{ color: 'var(--color-brand-pink)' }}>
                      {course.price}
                    </span>
                  </div>
                  <motion.button
                    className="btn-primary w-full mt-4 text-sm py-2.5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <HiAcademicCap size={16} /> Enroll Now
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
