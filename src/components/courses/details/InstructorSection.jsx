"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoLogoLinkedin, IoLogoTwitter, IoLogoGithub, IoRibbonOutline, IoPeopleOutline } from 'react-icons/io5';

export default function InstructorSection({ course }) {
 const instructor = course?.instructor || {
 name: 'Expert Instructor',
 avatar: '/images/default-avatar.png',
 bio: 'A passionate developer with years of delivering high-quality client projects in the global marketplace. This instructor brings both teaching clarity and industry depth to every lesson, preparing you for real-world scenarios.',
 experience: '8+ Years',
 title: 'Senior Software Engineer'
 };

 return (
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: '-50px' }}
 variants={{
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
 }}
 className="bg-white border border-slate-100 rounded-lg shadow-sm p-8 md:p-10 mt-12"
 >
 <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8 pb-4 border-b border-slate-100">Meet Your Instructor</h2>
 
 <div className="flex flex-col md:flex-row gap-8 items-start">
 {/* Avatar Setup */}
 <div className="relative shrink-0 group">
 <div className="w-32 h-32 md:w-40 md:h-40 relative overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-all duration-300">
 <Image 
 src={instructor.avatar} 
 alt={instructor.name} 
 fill 
 sizes="160px"
 loading="lazy"
 decoding="async"
 onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
 className="object-cover bg-slate-50"
 />
 </div>
 <div className="absolute -bottom-2 right-2 bg-white rounded-full p-1 shadow-md z-10">
 <div className="bg-brand-pink text-white rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
 <IoRibbonOutline size={14} /> Expert
 </div>
 </div>
 </div>

 {/* Info */}
 <div className="flex-1 space-y-4 pt-2">
 <div>
 <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{instructor.name}</h3>
 <p className="text-brand-pink font-semibold mt-1 text-sm">{instructor.title || 'Senior Software Engineer'}</p>
 </div>

 <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 mb-4 pb-4 border-b border-slate-100">
 <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
 <IoPeopleOutline className="text-brand-pink" size={16} /> {course?.enrolledCount || 1024}+ Students
 </span>
 <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
 <IoRibbonOutline className="text-brand-pink" size={16} /> {instructor.experience || '8+ Years'} Experience
 </span>
 </div>

 <p className="text-slate-600 font-medium leading-relaxed">
 {instructor.bio}
 </p>

 <div className="flex items-center gap-3 pt-2">
 {[IoLogoLinkedin, IoLogoTwitter, IoLogoGithub].map((Icon, i) => (
 <a 
 key={i} 
 href="#" 
 className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
 >
 <Icon size={18} />
 </a>
 ))}
 </div>
 </div>
 </div>
 </motion.section>
 );
}
