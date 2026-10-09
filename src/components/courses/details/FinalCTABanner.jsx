"use client";

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
 className="bg-slate-900 rounded-lg p-10 md:p-16 text-center relative overflow-hidden mt-8 shadow-xl shadow-slate-900/10"
 >
 <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

 <div className="relative z-10 max-w-2xl mx-auto space-y-6">
 <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight text-balance leading-tight">
 Ready to Start Your Career Today?
 </h2>
 <p className="text-lg text-slate-300 font-medium text-balance">
 Join thousands of successful students who transformed their skills and landed their dream jobs. Let’s make it happen for you.
 </p>

 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
 <motion.button 
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={onEnroll}
 disabled={enrolling}
 className="w-full sm:w-auto px-10 py-4 bg-brand-pink text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-pink/20 transition-all disabled:opacity-60"
 >
 {enrolling ? 'Processing...' : 'Enroll Now'}
 </motion.button>
 
 <motion.a 
 href="#contact"
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="w-full sm:w-auto px-10 py-4 bg-slate-800 text-white font-medium text-lg rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-3"
 >
 <IoCallOutline className="text-slate-400" size={22} />
 Contact Support
 </motion.a>
 </div>
 </div>
 </motion.section>
 );
}
