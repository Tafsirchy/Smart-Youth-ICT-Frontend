"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDownOutline, IoPlayCircleOutline, IoLockClosedOutline, IoTimeOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

export default function DetailedCurriculum({ course, isEnrolled }) {
  const [openIndex, setOpenIndex] = useState(0);

  const curriculum = course?.curriculum?.length > 0 
    ? course.curriculum 
    : [
        { title: 'Module 1: Introduction', topics: ['Course Overview', 'Setting up the Environment'] },
        { title: 'Module 2: Advanced Concepts', topics: ['Deep Dive into Core Topics', 'Building the First Project'] }
      ];

  const totalLessons = curriculum.reduce((a, m) => a + (m.topics?.length || 0), 0);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="space-y-6 pt-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course Curriculum</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Master your craft through comprehensive modules</p>
        </div>
        <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
          <span className="flex items-center gap-1.5"><IoTimeOutline size={16} className="text-indigo-500" /> {course?.duration || '3 Months'}</span>
          <span className="w-px h-4 bg-slate-300 mx-1" />
          <span className="flex items-center gap-1.5"><IoPlayCircleOutline size={16} className="text-indigo-500" /> {totalLessons} Lessons</span>
        </div>
      </div>

      <div className="space-y-4">
        {curriculum.map((module, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div 
              key={i}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-indigo-200 bg-white shadow-xl shadow-indigo-500/5' : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'}`}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base md:text-lg ${isOpen ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {module.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">{module.topics?.length || 0} Lessons</p>
                  </div>
                </div>
                <div className={`p-1 rounded-full shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-indigo-100 text-indigo-600' : 'text-slate-400'}`}>
                  <IoChevronDownOutline size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-slate-100 bg-white"
                  >
                    <div className="p-5 pl-16 space-y-4">
                      {module.topics?.map((topic, j) => {
                        // First lesson of first module is free (preview)
                        const isPreview = i === 0 && j === 0;
                        const isAccessible = isEnrolled || isPreview;
                        
                        return (
                          <div key={j} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              {isAccessible ? (
                                <IoPlayCircleOutline size={20} className="text-indigo-500 shrink-0" />
                              ) : (
                                <IoLockClosedOutline size={18} className="text-slate-400 shrink-0" />
                              )}
                              <span className={`text-sm font-medium ${isAccessible ? 'text-slate-700 cursor-pointer hover:text-indigo-600 hover:underline' : 'text-slate-500'}`}>
                                {topic}
                              </span>
                            </div>
                            
                            <div className="flex gap-4 items-center">
                              {isPreview && !isEnrolled && (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">Preview</span>
                              )}
                              <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                <IoTimeOutline size={14} /> 10:00
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
