'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineUserGroup, 
  HiOutlineAcademicCap, 
  HiOutlineBanknotes,
  HiOutlineArrowTrendingUp,
  HiOutlineChevronRight
} from 'react-icons/hi2';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function GlobalDashboard() {
  const { data: stats, isLoading: loading } = useQuery({
    queryKey: ['super-stats'],
    queryFn: async () => {
      const res = await api.get('/super/stats');
      return res.data?.data || null;
    },
    staleTime: 60000 // 1 minute freshness
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Premium Header */}
      <header className="relative py-6 px-6 rounded-[2rem] bg-slate-900 overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 -mr-48 -mt-48 bg-pink-500/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 bg-blue-500/10 rounded-full blur-[80px]" />
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-3"
               >
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-[10px] font-black text-pink-400 uppercase">Global Intelligence Active</span>
               </motion.div>
               <h1 className="text-4xl font-black text-white tracking-tighter mb-2 leading-tight">Network Oversight</h1>
               <p className="text-slate-400 font-medium max-w-lg text-base leading-snug">
                 Monitor performance across all facets of the SYICT educational infrastructure. Data-driven insights for global growth.
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl text-center min-w-[140px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Branches</p>
                  <p className="text-2xl font-black text-white leading-none">{stats?.branches || '--'}</p>
               </div>
               <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl text-center min-w-[140px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Impact</p>
                  <p className="text-2xl font-black text-white leading-none">{stats?.students || '--'}</p>
               </div>
            </div>
         </div>
      </header>

      {/* Hero Analytics Cards */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {[
          { label: 'Ecosystem Students', val: stats?.students, icon: HiOutlineUserGroup, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Branch Network', val: stats?.branches, icon: HiOutlineGlobeAlt, color: 'text-pink-500', bg: 'bg-pink-50' },
          { label: 'Global Curriculum', val: '48', icon: HiOutlineAcademicCap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total Receipts', val: `৳${stats?.revenue?.toLocaleString()}`, icon: HiOutlineBanknotes, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((card, i) => (
          <motion.div 
            key={i}
            variants={item}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className={`p-3 rounded-xl w-fit mb-3 ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
              <card.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{card.val || '--'}</h3>
          </motion.div>
        ))}
      </motion.section>

      {/* Performance Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
         {/* Branch Performance Table */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
         >
            <div className="flex justify-between items-center mb-5">
               <h2 className="text-xl font-black text-slate-900 tracking-tight">Branch Performance</h2>
               <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md text-[10px] font-black uppercase">
                  <HiOutlineArrowTrendingUp size={14} /> Global Growth
               </div>
            </div>
            
            <div className="space-y-2">
               {stats?.performance?.slice(0, 5).map((perf, i) => (
                  <div key={i} className="group flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 rounded-xl transition-all">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:text-pink-500 group-hover:bg-pink-50 transition-all">
                           {(i + 1).toString().padStart(2, '0')}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-800 text-base leading-none">{perf.name}</h4>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 leading-snug">{perf.count} Invoices</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-black text-slate-800 tracking-tight leading-none">৳{perf.revenue.toLocaleString()}</p>
                        <div className="w-20 h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                           <div className="h-full bg-pink-500" style={{ width: `${(perf.revenue / stats.revenue) * 100}%` }} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>

         {/* Quick Actions Side */}
         <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-600/20 group"
            >
               <h3 className="text-lg font-black mb-4">Strategic Quick-Actions</h3>
               <div className="space-y-2">
                  {[
                    { label: 'Issue Global Notice', icon: HiOutlineChevronRight },
                    { label: 'Audit Master Courses', icon: HiOutlineChevronRight },
                    { label: 'Review Support Tickets', icon: HiOutlineChevronRight },
                    { label: 'Generate Monthly Report', icon: HiOutlineChevronRight },
                  ].map((action, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all group/btn">
                       {action.label}
                       <action.icon className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ))}
               </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center"
            >
               <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <HiOutlineGlobeAlt size={24} />
               </div>
               <h3 className="text-lg font-black text-slate-900 mb-1">Branch Map</h3>
               <p className="text-slate-400 font-medium text-sm mb-4 leading-snug">Visualize your educational ecosystem's footprint.</p>
               <button className="text-emerald-600 font-black text-[10px] uppercase tracking-wider border-b-2 border-emerald-100 hover:border-emerald-500 transition-all">
                  Open Interactive Map
               </button>
            </motion.div>
         </div>
      </section>
    </div>
  );
}

