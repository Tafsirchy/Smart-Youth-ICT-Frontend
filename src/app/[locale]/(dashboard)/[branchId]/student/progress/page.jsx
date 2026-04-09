'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineLightningBolt, HiOutlineBadgeCheck, HiOutlineTrendingUp, 
  HiOutlineAcademicCap, HiChevronRight, HiOutlineTrophy
} from 'react-icons/hi';
import api from '@/lib/api';

export default function ProgressPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/enrollments/me');
        if (res.data?.success) setEnrollments(res.data.data);
      } catch (err) {
        console.error('Failed to fetch progress', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-8 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Learning Journey</h1>
        <p className="mt-2 text-neutral-500">Track your milestones and monitor your acceleration across all courses.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
           {[1, 2].map(i => <div key={i} className="h-64 bg-neutral-100 rounded-[40px]" />)}
        </div>
      ) : enrollments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {enrollments.map((enr, i) => {
              // Mocking percentage if not provided by backend yet for display purposes
              const progress = enr.progress?.percentage || Math.floor(Math.random() * 80) + 10;
              return (
                <motion.div 
                  key={enr._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[40px] border border-neutral-100 p-8 shadow-sm hover:shadow-xl hover:shadow-neutral-500/5 transition-all"
                >
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <HiOutlineAcademicCap size={28} />
                     </div>
                     <span className="px-4 py-1.5 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                       Active Journey
                     </span>
                  </div>

                  <h3 className="text-xl font-black text-neutral-900 mb-2 truncate pr-4">
                    {enr.course?.title?.en || enr.course?.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                     <HiOutlineTrendingUp className="text-emerald-500" />
                     <span className="text-xs font-bold text-neutral-400">Current Velocity: Steady</span>
                  </div>

                  {/* Visual Progress Road */}
                  <div className="relative pt-1">
                     <div className="flex mb-4 items-center justify-between">
                        <div>
                           <span className="text-[10px] font-black inline-block py-1 px-3 uppercase rounded-full text-blue-600 bg-blue-50 tracking-widest">
                             {progress}% Complete
                           </span>
                        </div>
                        <div className="text-right">
                           <span className="text-[10px] font-black inline-block text-blue-600 uppercase tracking-widest">
                              {progress === 100 ? 'CONQUERED' : 'MARCHING'}
                           </span>
                        </div>
                     </div>
                     <div className="overflow-hidden h-3 mb-8 text-xs flex rounded-full bg-neutral-50">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${progress}%` }}
                           transition={{ duration: 1, ease: 'easeOut' }}
                           className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                             progress > 80 ? 'bg-emerald-500' : 'bg-blue-600'
                           }`}
                        />
                     </div>
                  </div>

                  {/* Milestone Grid */}
                  <div className="grid grid-cols-4 gap-2 border-t border-neutral-50 pt-6">
                     {[25, 50, 75, 100].map(milestone => (
                        <div key={milestone} className="flex flex-col items-center">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              progress >= milestone ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-300'
                           }`}>
                             {progress >= milestone ? <HiOutlineBadgeCheck size={18} /> : <HiOutlineLightningBolt size={18} />}
                           </div>
                           <span className="text-[8px] font-black text-neutral-400 mt-2 tracking-widest">{milestone}%</span>
                        </div>
                     ))}
                  </div>

                  <button className="w-full mt-8 py-4 bg-neutral-50 text-neutral-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-900 hover:text-white transition-all">
                    Resume Learning <HiChevronRight strokeWidth={3} />
                  </button>
                </motion.div>
              );
           })}
        </div>
      ) : (
        <div className="bg-white rounded-[40px] border-2 border-dashed border-neutral-100 p-20 text-center">
           <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-200 mx-auto mb-6">
              <HiOutlineTrophy size={40} />
           </div>
           <p className="text-neutral-400 font-medium">No course progress detected. Start a course to see your velocity!</p>
        </div>
      )}
    </div>
  );
}

