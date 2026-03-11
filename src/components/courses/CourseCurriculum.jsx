'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDown, HiOutlinePlay, HiOutlineDocumentText } from 'react-icons/hi';
import { FiLock } from 'react-icons/fi';

export default function CourseCurriculum({ curriculum = [], isEnrolled = false }) {
  const [openSections, setOpenSections] = useState([0]);

  const toggleSection = (index) => {
    setOpenSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  if (!curriculum || curriculum.length === 0) {
    return (
      <div className="bg-neutral-50 rounded-2xl p-8 text-center border border-neutral-200">
        <p className="text-neutral-500">Curriculum is being updated. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {curriculum.map((section, idx) => {
        const isOpen = openSections.includes(idx);
        
        return (
          <div key={idx} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
            <button
              onClick={() => toggleSection(idx)}
              className="w-full flex items-center justify-between p-5 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left"
            >
              <div>
                <h4 className="font-bold text-neutral-900">{section.title}</h4>
                <p className="text-sm text-neutral-500 mt-1">{section.lessons?.length || 0} lessons</p>
              </div>
              <HiOutlineChevronDown 
                className={`text-neutral-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                size={20} 
              />
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-2 border-t border-neutral-200">
                    {section.lessons?.map((lesson, lIdx) => (
                      <div 
                        key={lIdx} 
                        className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${lesson.type === 'video' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                            {lesson.type === 'video' ? <HiOutlinePlay size={16} /> : <HiOutlineDocumentText size={16} />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">{lesson.title}</p>
                            {lesson.duration && <p className="text-xs text-neutral-500 mt-0.5">{lesson.duration}</p>}
                          </div>
                        </div>
                        
                        <div>
                           {lesson.isPreview ? (
                             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">PREVIEW</span>
                           ) : !isEnrolled ? (
                             <FiLock className="text-neutral-400" size={16} />
                           ) : (
                             <span className="text-xs text-blue-600 font-medium hover:underline">Start</span>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
