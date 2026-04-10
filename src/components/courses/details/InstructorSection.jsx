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
      className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
    >
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8">Meet Your Instructor</h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Setup */}
        <div className="relative shrink-0 perspective-1000 group">
          <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden shadow-xl border-4 border-indigo-50/50 group-hover:scale-[1.02] transition-transform duration-300">
            <Image 
              src={instructor.avatar} 
              alt={instructor.name} 
              fill 
              className="object-cover bg-slate-100"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <IoRibbonOutline size={14} /> Expert
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 pt-2">
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{instructor.name}</h3>
            <p className="text-indigo-600 font-bold tracking-wide mt-1">{instructor.title || 'Senior Software Engineer'}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500 mb-4 pb-4 border-b border-slate-100">

            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <IoPeopleOutline size={16} className="text-blue-500" /> {course?.enrolledCount || 1024}+ Students
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <span className="text-emerald-500 font-black">💼</span> {instructor.experience || '8+ Years'} Experience
            </span>
          </div>

          <p className="text-slate-600 leading-relaxed font-medium">
            {instructor.bio}
          </p>

          <div className="flex items-center gap-3 pt-2">
            {[IoLogoLinkedin, IoLogoTwitter, IoLogoGithub].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-indigo-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors border border-slate-100 hover:border-indigo-100 shadow-sm"
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
