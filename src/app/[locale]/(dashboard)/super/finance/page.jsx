'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineCreditCard, 
  HiOutlineChartBar, 
  HiOutlineChartPie,
  HiOutlineBanknotes,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowDownTray
} from 'react-icons/hi2';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function GlobalFinancePage() {
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinance();
  }, []);

  const fetchFinance = async () => {
    try {
      const res = await api.get('/super/finance');
      if (res.data?.success) setFinance(res.data.data);
    } catch (err) {
      toast.error('Failed to load finance report');
    } finally {
      setLoading(false);
    }
  };

  const getStatusTotal = (status) => {
    return finance?.summary?.find(s => s._id === status)?.total || 0;
  };

  const grandTotal = finance?.summary?.reduce((acc, curr) => acc + curr.total, 0) || 0;
  const paidTotal = getStatusTotal('paid');

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4"
          >
            <span className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
              <HiOutlineCreditCard size={32} />
            </span>
            Global Finance
          </motion.h1>
          <p className="mt-4 text-slate-500 font-medium max-w-md">
            Consolidated fiscal oversight of the entire SYICT network. Real-time revenue tracking and branch-level financial performance.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all text-sm"
        >
          <HiOutlineArrowDownTray size={20} />
          Export Global Ledger
        </motion.button>
      </header>

      {/* Hero Stats */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={item} className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-white group-hover:scale-125 transition-transform duration-700">
            <HiOutlineChartBar size={120} />
          </div>
          <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-4">Total Revenue Collected</p>
          <h2 className="text-5xl font-black text-white tracking-tighter">৳{paidTotal.toLocaleString()}</h2>
          <div className="mt-8 flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="bg-emerald-500/20 px-2 py-1 rounded-lg">+12.4%</span>
            <span className="text-slate-500 font-medium uppercase text-[10px]">From last month</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-4">Accounts Receivable</p>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">৳{getStatusTotal('pending').toLocaleString()}</h2>
          <p className="mt-8 text-slate-400 font-medium text-sm flex items-center gap-2">
            <HiOutlineClock size={18} className="text-amber-400" />
            Unpaid invoices across all branches
          </p>
        </motion.div>

        <motion.div variants={item} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-50" />
           <p className="text-indigo-500 font-black text-xs uppercase tracking-[0.2em] mb-4 relative z-10">Net Cash Flow</p>
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter relative z-10">৳{grandTotal.toLocaleString()}</h2>
           <p className="mt-8 text-slate-400 font-medium text-sm flex items-center gap-2 relative z-10">
            <HiOutlineChartPie size={18} className="text-indigo-400" />
            Total processed volume
          </p>
        </motion.div>
      </motion.section>

      {/* Branch Performance Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branch Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Branch Revenue</h2>
            <HiOutlineBanknotes size={24} className="text-slate-300" />
          </div>
          <div className="space-y-6">
            {finance?.branches?.map((branch, idx) => (
              <div key={branch._id} className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-[1.5rem] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{branch.name}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Branch</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-800">৳{branch.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-amber-500 font-bold uppercase">৳{branch.pending.toLocaleString()} Due</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Global Finance Breakdown (Quick Table) */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="p-10 border-b border-slate-50">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Transaction Status</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {finance?.summary?.map((state) => (
              <div key={state._id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${state._id === 'paid' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                    {state._id === 'paid' ? <HiOutlineCheckCircle size={24} /> : <HiOutlineClock size={24} />}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">{state._id}</h4>
                    <p className="text-slate-400 font-medium text-sm">{state.count} Transactions</p>
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900 font-mono">৳{state.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
