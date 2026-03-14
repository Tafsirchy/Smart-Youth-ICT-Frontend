'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import api from '@/lib/api';
import {
  IoTimeOutline, IoPeopleOutline, IoStar, IoArrowForwardOutline,
  IoBookOutline
} from 'react-icons/io5';

const container  = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardAnim   = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

// Fallback static courses while API loads
const FALLBACK = [
  { _id: '1', slug: 'web-development',       title: { en: 'Web Development' },        category: 'Web Dev',   price: 8000,  duration: '6 Months', enrolledCount: 340, rating: 4.9, badge: '🔥 Most Popular'  },
  { _id: '2', slug: 'social-media-marketing', title: { en: 'Social Media Marketing' }, category: 'Marketing', price: 5000,  duration: '3 Months', enrolledCount: 210, rating: 4.8, badge: '📈 High Demand'    },
  { _id: '3', slug: 'graphic-design',         title: { en: 'Graphic Design' },         category: 'Design',    price: 5500,  duration: '3 Months', enrolledCount: 180, rating: 4.8, badge: '🎨 Creative'       },
  { _id: '4', slug: 'ai-prompt-engineering',  title: { en: 'AI & Automation' },        category: 'AI',        price: 4000,  duration: '2 Months', enrolledCount: 120, rating: 4.9, badge: '🤖 Future Skills'  },
];

export default function PopularCourses() {
  const locale = useLocale();
  const [courses, setCourses] = useState(FALLBACK);

  useEffect(() => {
    api.get('/courses', { params: { limit: 4 } })
      .then(res => { if (res.data?.success && res.data.data.length) setCourses(res.data.data); })
      .catch(() => {}); // silently fall back to static data
  }, []);

  return (
    <section className="section" style={{ background: 'var(--color-background)' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="badge-pink mb-3">Our Courses</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-textPrimary">Popular Courses</h2>
            <p className="text-textSecondary text-sm mt-2 max-w-sm">Join thousands of students already learning in-demand skills.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Link href={`/${locale}/courses`} className="btn-outline text-sm px-5 py-2.5 flex items-center gap-1.5">
              View All Courses <IoArrowForwardOutline size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Course Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        >
          {courses.map((course) => {
            const title = course.title?.en || course.title || 'Course';
            return (
              <motion.div key={course._id} variants={cardAnim}
                whileHover={{ y: -6, boxShadow: '0 20px 45px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
                <Link href={`/${locale}/courses/${course.slug}`} id={`course-card-${course._id}`}>
                  <div className="card h-full flex flex-col cursor-pointer overflow-hidden rounded-2xl">
                    {/* Thumbnail / Gradient placeholder */}
                    <div className="relative h-36 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                      {course.thumbnail ? (
                        <Image src={course.thumbnail} alt={title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IoBookOutline size={44} className="text-blue-300" />
                        </div>
                      )}
                      {/* Badge overlay */}
                      {course.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-neutral-800 shadow-sm">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {course.category && (
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full self-start mb-2">
                          {course.category}
                        </span>
                      )}
                      <h3 className="font-bold text-textPrimary text-base mb-2 line-clamp-2 flex-1">{title}</h3>

                      {/* Rating & students */}
                      <div className="flex items-center gap-3 text-xs text-textSecondary mb-3">
                        <span className="flex items-center gap-1">
                          <IoStar size={13} className="text-amber-400" /> {course.rating || 4.8}
                        </span>
                        <span className="flex items-center gap-1">
                          <IoPeopleOutline size={13} /> {course.enrolledCount || 0}+ students
                        </span>
                        <span className="flex items-center gap-1">
                          <IoTimeOutline size={13} /> {course.duration || '3 Months'}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-border flex items-center justify-between mt-auto">
                        <span className="text-2xl font-extrabold" style={{ color: 'var(--color-brand-pink)' }}>
                          ৳{course.price?.toLocaleString()}
                        </span>
                        <motion.span
                          className="btn-primary text-xs px-4 py-2 rounded-lg"
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        >
                          Enroll →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
