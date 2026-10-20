'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineClipboardDocumentList, 
  HiOutlineUser, 
  HiOutlineBolt,
  HiOutlineCalendar,
  HiOutlineCommandLine,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineClipboardDocumentCheck,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineFingerPrint,
  HiOutlineBuildingOffice2
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
  const params = useParams();
  const locale = params?.locale || 'en';
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

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

  const getLogBranchName = (log) => {
    return log?.resolvedBranchName || log?.branchId?.name || log?.details?.branchName || log?.details?.name || null;
  };

  const getLogBranchCode = (log) => {
    return log?.resolvedBranchCode || log?.branchId?.code || log?.details?.code || null;
  };

  const filteredLogs = logs.filter(log => {
    const bName = getLogBranchName(log) || '';
    const q = search.toLowerCase();
    return (
      log.action.toLowerCase().includes(q) || 
      log.actor?.name?.toLowerCase().includes(q) ||
      log.entity?.toLowerCase().includes(q) ||
      bName.toLowerCase().includes(q) ||
      (log.ipAddress && log.ipAddress.toLowerCase().includes(q))
    );
  });

  const getActionColor = (action = '') => {
    if (action.includes('CREATE') || action.includes('ACTIVATE')) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (action.includes('UPDATE')) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (action.includes('DELETE') || action.includes('DEACTIVATE')) return 'text-rose-700 bg-rose-50 border-rose-200';
    return 'text-blue-700 bg-blue-50 border-blue-200';
  };

  const copyToClipboard = (text, message = 'Copied to clipboard') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 md:px-8 pb-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4 !m-0 !mb-2"
          >
            <span className="p-3 bg-slate-900 text-white shadow-lg shadow-slate-900/20 rounded-xl flex items-center justify-center shrink-0">
              <HiOutlineClipboardDocumentList size={30} />
            </span>
            <span>System Pulse</span>
          </motion.h1>
          <p className="text-slate-500 font-medium max-w-md text-sm leading-relaxed">
            The definitive audit log for SYICT. Every critical action, configuration change, and administrative movement is recorded here for security oversight.
          </p>
        </div>

        <div className="relative group">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <input 
            type="text"
            placeholder="Search logs, branches, actors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-6 py-3 bg-white border border-slate-200 w-full md:w-80 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium text-slate-700 shadow-xs rounded-xl text-sm"
          />
        </div>
      </header>

      {/* 360° Branch Executive Audit Banner Link */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-amber-400 shrink-0">
            <HiOutlineBuildingOffice2 size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>Looking for Comprehensive 360° Branch Audit & P&L?</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                New Executive System
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Monitor daily, weekly & monthly campus collections, petty cash vouchers, routine conflicts, and red flags.
            </p>
          </div>
        </div>
        <Link
          href={`/${locale}/super/branches/audit`}
          className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shrink-0 text-center shadow-xs cursor-pointer"
        >
          Open 360° Branch Audit →
        </Link>
      </div>

      {/* Main Audit Feed */}
      <div className="bg-white border border-slate-200/80 shadow-xs relative overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 ml-[3.5rem] hidden md:block" />
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="divide-y divide-slate-100 relative z-10"
        >
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="p-8 h-20 bg-slate-50/50 animate-pulse" />
            ))
          ) : filteredLogs.map((log) => {
            const branchName = getLogBranchName(log);
            const branchCode = getLogBranchCode(log);

            return (
              <motion.div 
                key={log._id} 
                variants={item}
                className="group p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 hover:bg-slate-50/60 transition-all"
              >
                <div className="flex items-center gap-3.5 shrink-0">
                  {/* Timestamp box */}
                  <div className="w-13 h-13 bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center relative z-20 rounded-xl shrink-0 p-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none">{format(new Date(log.createdAt), 'MMM')}</p>
                    <p className="text-lg font-black text-slate-900 leading-none mt-1">{format(new Date(log.createdAt), 'dd')}</p>
                  </div>

                  {/* Action Tag */}
                  <div className={`px-3 py-1.5 border text-[10px] font-black uppercase tracking-wider whitespace-nowrap rounded-lg flex items-center justify-center shrink-0 leading-none ${getActionColor(log.action)}`}>
                    {log.action.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 leading-none flex-wrap">
                    <span className="text-slate-700 font-bold text-sm flex items-center gap-1.5 leading-none">
                      <HiOutlineUser className="text-slate-400 shrink-0" size={15} />
                      <span className="text-slate-900">{log.actor?.name || 'System Agent'}</span>
                    </span>
                    {log.actor?.role && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/80 leading-none">
                        {log.actor.role.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 font-medium leading-none">
                    <span className="flex items-center gap-1 text-slate-400 leading-none">
                      <HiOutlineCalendar size={13} className="shrink-0" />
                      <span>{format(new Date(log.createdAt), 'HH:mm:ss')}</span>
                    </span>
                    
                    {/* Entity & Branch Identification */}
                    <span className="flex items-center gap-1.5 leading-none">
                      <HiOutlineBolt size={14} className="text-amber-500 shrink-0" />
                      {branchName ? (
                        <span className="inline-flex items-center gap-1.5 leading-none">
                          <strong className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/70 text-xs leading-none">
                            {branchName}
                          </strong>
                          <span className="text-[11px] font-mono text-slate-400 uppercase leading-none">
                            (#{log.entityId?.slice(-6) || branchCode || 'ID'})
                          </span>
                        </span>
                      ) : (
                        <span className="uppercase tracking-tighter font-mono text-slate-600 leading-none">
                          {log.entity} #{log.entityId?.slice(-6) || 'N/A'}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto mt-2 md:mt-0 gap-3 shrink-0">
                  <div className="bg-slate-50 px-2.5 py-1.5 flex items-center gap-1.5 border border-slate-200/60 rounded-lg">
                    <HiOutlineCommandLine className="text-slate-400 shrink-0" size={13} />
                    <span className="text-[10px] font-mono font-bold text-slate-500 leading-none">{log.ipAddress || 'Internal'}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSelectedLog(log)}
                    className="text-slate-800 font-bold text-[11px] uppercase tracking-wider px-3.5 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white active:scale-95 transition-all rounded-lg cursor-pointer border border-slate-200/80 shadow-2xs leading-none"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
          
          {!loading && filteredLogs.length === 0 && (
            <div className="p-20 text-center">
              <HiOutlineClipboardDocumentList size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium italic">No pulse detected in the current filter.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Audit Log Inspector Modal */}
      <AnimatePresence>
        {selectedLog && (() => {
          const modalBranchName = getLogBranchName(selectedLog);
          const modalBranchCode = getLogBranchCode(selectedLog);

          return (
            <div className="fixed inset-0 z-[99999999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLog(null)}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
              />

              {/* Modal Dialog */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] z-10"
              >
                {/* Header with Perfect Vertical Alignment */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-900 shadow-2xs shrink-0">
                      <HiOutlineFingerPrint size={22} />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-black text-slate-900 !m-0 !mb-0 !p-0 leading-tight">
                          Audit Log Inspector
                        </h3>
                        <span className={`px-2 py-0.5 border text-[9px] font-black uppercase tracking-wider rounded leading-none shrink-0 ${getActionColor(selectedLog.action)}`}>
                          {selectedLog.action.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mt-1 leading-none">
                        <span className="text-slate-400">ID:</span>
                        <span className="text-slate-700 font-semibold">{selectedLog._id}</span>
                        <button 
                          type="button" 
                          onClick={() => copyToClipboard(selectedLog._id, 'Log ID copied')}
                          className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center p-0.5 rounded hover:bg-slate-200/60"
                          title="Copy ID"
                        >
                          <HiOutlineClipboardDocumentCheck size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setSelectedLog(null)}
                    className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center border border-slate-200 transition-all cursor-pointer shrink-0 ml-3"
                  >
                    <HiOutlineXMark size={18} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                  {/* Meta Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Initiator */}
                    <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 leading-none">
                        <HiOutlineUser size={13} className="shrink-0" /> Initiator / Actor
                      </p>
                      <p className="text-sm font-bold text-slate-900 leading-tight">
                        {selectedLog.actor?.name || 'System Agent'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap leading-tight">
                        {selectedLog.actor?.email && <span>{selectedLog.actor.email}</span>}
                        {selectedLog.actor?.role && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600 leading-none">
                            {selectedLog.actor.role.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Target Entity with Branch Name */}
                    <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 leading-none">
                        <HiOutlineBolt size={13} className="shrink-0" /> Target Entity
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-slate-900 leading-tight">
                          {modalBranchName || selectedLog.entity}
                        </p>
                        {modalBranchName && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 leading-none">
                            Branch
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5 leading-tight">
                        <span className="text-slate-400">Ref ID:</span>
                        <span className="text-slate-700 font-semibold">#{selectedLog.entityId || 'N/A'}</span>
                        {selectedLog.entityId && (
                          <button 
                            type="button" 
                            onClick={() => copyToClipboard(selectedLog.entityId, 'Entity ID copied')}
                            className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center p-0.5 rounded hover:bg-slate-200/60"
                            title="Copy Entity ID"
                          >
                            <HiOutlineClipboardDocumentCheck size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 leading-none">
                        <HiOutlineCalendar size={13} className="shrink-0" /> Timestamp
                      </p>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {format(new Date(selectedLog.createdAt), 'EEEE, MMMM dd, yyyy')}
                      </p>
                      <p className="text-xs text-slate-500 font-mono leading-none">
                        {format(new Date(selectedLog.createdAt), 'HH:mm:ss (xxx)')}
                      </p>
                    </div>

                    {/* Network Origin */}
                    <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 leading-none">
                        <HiOutlineCommandLine size={13} className="shrink-0" /> Network Origin
                      </p>
                      <p className="text-xs font-bold font-mono text-slate-900 leading-tight">
                        {selectedLog.ipAddress || 'Internal Cluster / localhost'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate leading-none" title={selectedLog.userAgent || 'Direct API Call'}>
                        {selectedLog.userAgent ? selectedLog.userAgent.slice(0, 35) + '...' : 'Direct Server Execution'}
                      </p>
                    </div>
                  </div>

                  {/* Branch Callout Card */}
                  {modalBranchName && (
                    <div className="p-3.5 bg-indigo-50/40 rounded-xl border border-indigo-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                          <HiOutlineBuildingOffice2 size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-wider text-indigo-500 leading-none mb-1">Target Branch</p>
                          <p className="text-sm font-bold text-slate-900 leading-tight">
                            {modalBranchName}
                            {modalBranchCode && (
                              <span className="text-xs font-mono text-slate-500 font-medium ml-1.5">
                                ({modalBranchCode})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-white border border-indigo-200 text-indigo-700 shadow-2xs shrink-0 ml-2 leading-none">
                        Verified Branch
                      </span>
                    </div>
                  )}

                  {/* Data Mutation Payload */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5 leading-none">
                        <HiOutlineShieldCheck size={14} className="text-indigo-600 shrink-0" />
                        Payload & State Details
                      </p>
                      {selectedLog.details && Object.keys(selectedLog.details).length > 0 && (
                        <button 
                          type="button"
                          onClick={() => copyToClipboard(JSON.stringify(selectedLog.details, null, 2), 'Payload JSON copied')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer leading-none"
                        >
                          <HiOutlineClipboardDocumentCheck size={13} /> Copy JSON
                        </button>
                      )}
                    </div>

                    {selectedLog.details && Object.keys(selectedLog.details).length > 0 ? (
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-56 leading-relaxed border border-slate-800">
                        <pre>{JSON.stringify(selectedLog.details, null, 2)}</pre>
                      </div>
                    ) : (
                      <div className="p-6 text-center bg-slate-50 border border-slate-100 rounded-xl">
                        <HiOutlineShieldCheck size={28} className="mx-auto text-slate-300 mb-1.5" />
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">
                          Standard system event record without additional payload mutations. Action was committed directly to the core database entity.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(JSON.stringify(selectedLog, null, 2), 'Full Log record copied')}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 cursor-pointer leading-none"
                  >
                    <HiOutlineClipboardDocumentCheck size={14} /> Copy Full Record
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLog(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer leading-none"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
