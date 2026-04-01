import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoStar, IoStarOutline, IoPeopleOutline, IoPlayCircleOutline, IoCallOutline } from 'react-icons/io5';

export default function CourseHero({ course, onEnroll }) {
  const title = course?.title?.en || course?.title || 'Course Details';
  const description = course?.description?.en || course?.description || 'Learn the most in-demand skills from industry experts and start your career today.';
  const rating = course?.rating || 4.8;
  const enrolledCount = course?.enrolledCount || 1024;
  const instructorName = course?.instructor?.name || 'Expert Instructor';

  return (
    <section className="relative overflow-hidden bg-slate-900 pt-20 pb-28 lg:pt-28 lg:pb-36 px-4"
             style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}>
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-pink-500/20 blur-[100px] rounded-full pointer-events-none" />

      {course.thumbnail && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src={course.thumbnail} alt="" fill className="object-cover blur-3xl saturate-200" />
        </div>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          {course.category && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/20 text-indigo-200"
            >
              {course.category}
            </motion.span>
          )}
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6 text-white text-balance"
          >
            {title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-200 text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
          >
            {description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-indigo-100 mb-10"
          >
            {/* Rating */}
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <span className="text-amber-400 font-bold">{rating}</span>
              <span className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  i < Math.round(rating)
                    ? <IoStar key={i} size={15} className="text-amber-400" />
                    : <IoStarOutline key={i} size={15} className="text-indigo-400" />
                ))}
              </span>
              <span className="text-indigo-300 text-xs">({course.reviewsCount || 120} reviews)</span>
            </div>
            
            {/* Students */}
            <div className="flex items-center gap-2">
              <IoPeopleOutline size={18} className="text-indigo-300" />
              <span>{enrolledCount} Students</span>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-500 overflow-hidden relative border border-indigo-400">
                <Image src={course?.instructor?.avatar || '/images/default-avatar.png'} alt="Instructor" fill className="object-cover" />
              </div>
              <span>By <span className="text-white font-semibold underline underline-offset-4 decoration-indigo-400/50">{instructorName}</span></span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={onEnroll}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>🎓 Enroll Now</span>
            </button>
            <a 
              href="#contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-lg backdrop-blur-md transition-all"
            >
              <IoCallOutline className="text-indigo-300" />
              <span>Free Consultation</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
