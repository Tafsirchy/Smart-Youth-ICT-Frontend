'use client';

import { useState, useEffect } from 'react';
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
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/super/stats');
      if (res.data?.success) setStats(res.data.data);
    } catch (err) {
      toast.error('Failed to load global metrics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Premium Header */}
      <header className="relative py-12 px-10 rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 -mr-48 -mt-48 bg-pink-500/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 bg-blue-500/10 rounded-full blur-[80px]" />
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6"
               >
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em]">Global Intelligence Active</span>
               </motion.div>
               <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Network Oversight</h1>
               <p className="text-slate-400 font-medium max-w-lg text-lg">
                 Monitor performance across all facets of the SYICT educational infrastructure. Data-driven insights for global growth.
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-[2rem] text-center min-w-[160px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Branches</p>
                  <p className="text-3xl font-black text-white">{stats?.branches || '--'}</p>
               </div>
               <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-[2rem] text-center min-w-[160px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Impact</p>
                  <p className="text-3xl font-black text-white">{stats?.students || '--'}</p>
               </div>
            </div>
         </div>
      </header>

      {/* Hero Analytics Cards */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className={`p-4 rounded-2xl w-fit mb-6 ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
              <card.icon size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{card.val || '--'}</h3>
          </motion.div>
        ))}
      </motion.section>

      {/* Performance Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Branch Performance Table */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10"
         >
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Branch Performance</h2>
               <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  <HiOutlineArrowTrendingUp size={14} /> Global Growth
               </div>
            </div>
            
            <div className="space-y-4">
               {stats?.performance?.slice(0, 5).map((perf, i) => (
                  <div key={i} className="group flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-50 rounded-[2.2rem] transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:text-pink-500 group-hover:bg-pink-50 transition-all">
                           {(i + 1).toString().padStart(2, '0')}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-800 text-lg leading-none">{perf.name}</h4>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{perf.count} Invoices Processed</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xl font-black text-slate-800 tracking-tight">৳{perf.revenue.toLocaleString()}</p>
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                           <div className="h-full bg-pink-500" style={{ width: `${(perf.revenue / stats.revenue) * 100}%` }} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>

         {/* Quick Actions Side */}
         <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-600/30 group"
            >
               <h3 className="text-xl font-black mb-6">Strategic Quick-Actions</h3>
               <div className="space-y-3">
                  {[
                    { label: 'Issue Global Notice', icon: HiOutlineChevronRight },
                    { label: 'Audit Master Courses', icon: HiOutlineChevronRight },
                    { label: 'Review Support Tickets', icon: HiOutlineChevronRight },
                    { label: 'Generate Monthly Report', icon: HiOutlineChevronRight },
                  ].map((action, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-sm font-bold transition-all group/btn">
                       {action.label}
                       <action.icon className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ))}
               </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-center"
            >
               <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <HiOutlineGlobeAlt size={40} />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-2">Branch Map</h3>
               <p className="text-slate-400 font-medium text-sm mb-6">Visualize your educational ecosystem's geographical footprint.</p>
               <button className="text-emerald-600 font-black text-xs uppercase tracking-widest border-b-2 border-emerald-100 hover:border-emerald-500 transition-all">
                  Open Interactive Map
               </button>
            </motion.div>
         </div>
      </section>
    </div>
  );
}

