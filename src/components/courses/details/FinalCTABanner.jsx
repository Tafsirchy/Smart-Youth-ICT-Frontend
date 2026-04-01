import React from 'react';
import { motion } from 'framer-motion';
import { IoCallOutline } from 'react-icons/io5';

export default function FinalCTABanner({ onEnroll, enrolling }) {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="bg-indigo-600 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden group shadow-2xl shadow-indigo-500/20"
      style={{ backgroundImage: 'radial-gradient(circle at top right, #6366f1, #4f46e5)' }}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-colors pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance leading-tight">
          Ready to Start Your Career Today?
        </h2>
        <p className="text-lg text-indigo-100 font-medium">
          Join thousands of successful students who transformed their skills and landed their dream jobs. Let’s make it happen for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnroll}
            disabled={enrolling}
            className="w-full sm:w-auto px-10 py-4 lg:py-5 rounded-2xl bg-white text-indigo-600 font-black text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all disabled:opacity-60"
          >
            {enrolling ? 'Processing...' : '🎓 Enroll Now'}
          </motion.button>
          
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 lg:py-5 rounded-2xl bg-indigo-500/30 hover:bg-indigo-500/50 border border-white/20 text-white font-bold text-lg backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <IoCallOutline className="text-white/80" size={24} />
            Contact Support
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
