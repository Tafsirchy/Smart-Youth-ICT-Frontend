'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineUserGroup, HiOutlineAcademicCap, HiOutlineClipboardList, 
  HiOutlineArrowNarrowRight, HiOutlineTrendingUp, HiOutlineCalendar
} from 'react-icons/hi';
import api from '@/lib/api';
import Link from 'next/link';

export default function InstructorDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/instructor/stats');
      if (res.data?.success) setStats(res.data.data);
    } catch (err) {
      console.error('Failed to fetch instructor stats', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 max-w-6xl animate-pulse space-y-8">
        <div className="h-10 w-1/4 bg-neutral-100 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => <div key={n} className="h-32 bg-neutral-100 rounded-[32px]"></div>)}
        </div>
        <div className="h-64 bg-neutral-100 rounded-[40px]"></div>
      </div>
    );
  }

  const statCards = [
    { 
       label: 'Active Students', 
       value: stats?.totalStudents || 0, 
       icon: HiOutlineUserGroup, 
       color: 'text-blue-600', 
       bg: 'bg-blue-50',
       desc: 'Students enrolled in your courses' 
    },
    { 
       label: 'My Courses', 
       value: stats?.totalCourses || 0, 
       icon: HiOutlineAcademicCap, 
       color: 'text-purple-600', 
       bg: 'bg-purple-50',
       desc: 'Active curriculum modules' 
    },
    { 
       label: 'Pending Grading', 
       value: stats?.pendingSubmissions || 0, 
       icon: HiOutlineClipboardList, 
       color: 'text-emerald-600', 
       bg: 'bg-emerald-50',
       desc: 'Assignments awaiting review' 
    },
  ];

  return (
    <div className="py-8 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Instructor Dashboard</h1>
        <p className="mt-2 text-neutral-500">Welcome back. Here is your current teaching and grading overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {statCards.map((card, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
             className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm flex flex-col justify-between"
           >
              <div>
                 <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon size={26} />
                 </div>
                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
                 <p className="text-3xl font-black text-neutral-900">{card.value}</p>
              </div>
              <p className="mt-4 text-[10px] font-bold text-neutral-400 italic">{card.desc}</p>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-neutral-900 rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32" />
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                     <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
                        <HiOutlineTrendingUp className="text-blue-400" /> Assessment Progress
                     </h2>
                     <p className="text-neutral-400 text-sm max-w-sm">
                       You have <span className="text-white font-bold">{stats?.pendingSubmissions || 0} submissions</span> waiting for your expert feedback. Keep up the momentum!
                     </p>
                  </div>
                  <Link 
                    href="/instructor/submissions" 
                    className="bg-white text-neutral-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all active:scale-95 whitespace-nowrap"
                  >
                    Open Grading Hub <HiOutlineArrowNarrowRight size={20} />
                  </Link>
               </div>
            </div>

            <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm p-8">
               <h3 className="text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                 <HiOutlineCalendar className="text-blue-600" /> Teaching Schedule
               </h3>
               <div className="py-12 text-center">
                  <p className="text-neutral-400 font-medium italic">No upcoming sessions scheduled for today.</p>
               </div>
            </div>
         </div>

         <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm p-8 h-full">
               <h3 className="text-xl font-black text-neutral-900 mb-6">Quick Actions</h3>
               <div className="space-y-4">
                  <Link href="/instructor/lessons" className="block p-5 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-all group">
                     <p className="font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">Lesson Builder</p>
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Manage Course Content</p>
                  </Link>
                  <Link href="/instructor/courses" className="block p-5 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-all group">
                     <p className="font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">My Classes</p>
                     <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">View Enrolled Students</p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
