"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoTimeOutline, IoDocumentTextOutline, IoLanguageOutline, IoLocationOutline, IoFlaskOutline } from 'react-icons/io5';

export default function CourseInfoGrid({ course }) {
  const INFO = [
    { label: 'Duration', value: course?.duration || '3 Months', icon: IoTimeOutline, color: 'text-indigo-600' },
    { label: 'Total Lectures', value: `${course?.curriculum?.reduce((a, m) => a + (m.topics?.length || 0), 0) || 45} Lessons`, icon: IoDocumentTextOutline, color: 'text-blue-600' },
    { label: 'Projects', value: course?.projects?.length ? `${course.projects.length}+ Real-world Projects` : '4+ Real-world Projects', icon: IoFlaskOutline, color: 'text-pink-600' },
    { label: 'Language', value: course?.language || 'Bengali / English', icon: IoLanguageOutline, color: 'text-emerald-600' },
    { label: 'Mode', value: course?.mode || 'Online / Hybrid', icon: IoLocationOutline, color: 'text-amber-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {INFO.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl bg-white border border-slate-100/60 shadow-sm text-center hover:shadow-md transition-shadow"
        >
          <item.icon size={28} className={`${item.color} mb-3 opacity-90`} />
          <h4 className="text-[10px] sm:text-xs text-slate-400 font-extrabold uppercase tracking-widest mb-1.5">{item.label}</h4>
          <span className="text-sm md:text-base font-bold text-slate-800 leading-tight">{item.value}</span>
        </motion.div>
      ))}
    </div>
  );
}
