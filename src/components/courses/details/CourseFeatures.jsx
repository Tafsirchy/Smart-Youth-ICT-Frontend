import React from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoLaptopOutline, IoBriefcaseOutline, IoRibbonOutline, IoRocketOutline } from 'react-icons/io5';

const FEATURES = [
  { icon: IoLaptopOutline, text: 'Build production-ready, real-world projects', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: IoBriefcaseOutline, text: 'Master industry-standard tools and workflows', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { icon: IoRocketOutline, text: 'Get job-ready skills to land high-paying roles', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: IoRibbonOutline, text: 'Earn an industry-recognized certificate', color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export default function CourseFeatures() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">What You Will Learn</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map((feat, i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all group"
          >
            <div className={`p-3 rounded-xl ${feat.bg} ${feat.color} shrink-0 group-hover:scale-110 transition-transform`}>
              <feat.icon size={24} />
            </div>
            <p className="text-slate-600 font-medium leading-relaxed mt-0.5">{feat.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
