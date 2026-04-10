'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineClipboardDocumentList, 
  HiOutlineUser, 
  HiOutlineBolt,
  HiOutlineCalendar,
  HiOutlineCommandLine,
  HiOutlineMagnifyingGlass
} from 'react-icons/hi2';
import { format } from 'date-fns';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export default function AuditReportsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/super/audit-logs');
      if (res.data?.success) setLogs(res.data.data);
    } catch (err) {
      toast.error('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(search.toLowerCase()) || 
    log.actor?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getActionColor = (action) => {
    if (action.includes('CREATE')) return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    if (action.includes('UPDATE')) return 'text-amber-500 bg-amber-50 border-amber-100';
    if (action.includes('DELETE') || action.includes('DEACTIVATE')) return 'text-red-500 bg-red-50 border-red-100';
    return 'text-blue-500 bg-blue-50 border-blue-100';
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4"
          >
            <span className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-900/20">
              <HiOutlineClipboardDocumentList size={32} />
            </span>
            System Pulse
          </motion.h1>
          <p className="mt-4 text-slate-500 font-medium max-w-md">
            The definitive audit log for SYICT. Every critical action, configuration change, and administrative movement is recorded here for security oversight.
          </p>
        </div>

        <div className="relative group">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <input 
            type="text"
            placeholder="Search activity logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl w-full md:w-80 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium text-slate-700 shadow-sm"
          />
        </div>
      </header>

      {/* Main Audit Feed */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 ml-[3.5rem] hidden md:block" />
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="divide-y divide-slate-50 relative z-10"
        >
          {loading ? (
            [...Array(8)].map((_, i) => (
               <div key={i} className="p-10 h-24 bg-slate-50/50 animate-pulse" />
            ))
          ) : filteredLogs.map((log) => (
            <motion.div 
              key={log._id}
              variants={item}
              className="group p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 hover:bg-slate-50/40 transition-all"
            >
              <div className="flex items-center gap-6">
                 {/* Timestamp circle */}
                 <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center relative z-20">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none">{format(new Date(log.createdAt), 'MMM')}</p>
                    <p className="text-xl font-black text-slate-900 leading-none mt-1">{format(new Date(log.createdAt), 'dd')}</p>
                 </div>

                 {/* Action Tag */}
                 <div className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${getActionColor(log.action)}`}>
                    {log.action.replace(/_/g, ' ')}
                 </div>
              </div>

              <div className="flex-1">
                <p className="text-slate-700 font-bold flex items-center gap-2">
                  <HiOutlineUser className="text-slate-400" />
                  {log.actor?.name || 'System Agent'}
                </p>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><HiOutlineCalendar size={14} />{format(new Date(log.createdAt), 'HH:mm:ss')}</span>
                  <span className="flex items-center gap-1 uppercase tracking-tighter"><HiOutlineBolt size={14}/>{log.entity} #{log.entityId?.slice(-6)}</span>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
                  <HiOutlineCommandLine className="text-slate-300" />
                  <span className="text-[10px] font-mono font-bold text-slate-400">{log.ipAddress || 'Internal'}</span>
                </div>
                <button className="text-slate-400 hover:text-slate-900 font-bold text-xs p-2">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
          
          {!loading && filteredLogs.length === 0 && (
            <div className="p-20 text-center">
              <HiOutlineClipboardDocumentList size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium italic">No pulse detected in the current filter.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
