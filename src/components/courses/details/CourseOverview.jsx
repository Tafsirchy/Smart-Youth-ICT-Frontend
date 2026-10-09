"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function CourseOverview({ course }) {
 const description = course?.description?.en || course?.description || 'A comprehensive program designed to take you from a beginner to an industry-ready professional.';
 
 return (
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: '-100px' }}
 variants={{
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
 }}
 className="space-y-6"
 >
 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight relative pb-4 mb-2">
 Course Overview
 <div className="absolute bottom-0 left-0 w-12 h-1 bg-brand-pink rounded-full" />
 </h2>

 <div className="prose prose-lg prose-slate max-w-none text-slate-700 font-medium">
 <p className="leading-relaxed whitespace-pre-line">{description}</p>
 </div>

 <div className="bg-slate-50 border border-slate-100 rounded-lg p-6 md:p-8 mt-6">
 <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">🎯 Target Audience</h3>
 <p className="text-slate-600 font-medium">
 Suitable for <span className="text-brand-pink font-semibold bg-pink-50 px-2 py-0.5 rounded-md">Beginners</span>, <span className="text-brand-pink font-semibold bg-pink-50 px-2 py-0.5 rounded-md">Intermediate</span>, and <span className="text-brand-pink font-semibold bg-pink-50 px-2 py-0.5 rounded-md">Advanced</span> learners looking to master real-world skills and build a portfolio.
 </p>
 </div>
 </motion.section>
 );
}
