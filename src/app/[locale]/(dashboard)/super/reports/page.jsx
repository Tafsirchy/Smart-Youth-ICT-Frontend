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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    fetchLogs(page, actionFilter);
  }, []);

  const fetchLogs = async (targetPage = page, targetAction = actionFilter) => {
    try {
      setLoading(true);
      const params = { page: targetPage, limit: 50 };
      if (targetAction) params.action = targetAction;
      const res = await api.get('/super/audit-logs', { params });
      if (res.data?.success) {
        setLogs(res.data.data || []);
        setTotal(res.data.total || (res.data.data ? res.data.data.length : 0));
        setTotalPages(res.data.totalPages || 1);
      }
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
    <div className="space-y-4 w-full pb-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-slate-900 flex items-center gap-2.5 !m-0 !mb-1 leading-tight"
          >
            <span className="p-2 bg-slate-900 text-white shadow-lg shadow-slate-900/20 rounded-xl flex items-center justify-center shrink-0">
              <HiOutlineClipboardDocumentList size={26} />
            </span>
            <span>System Pulse</span>
          </motion.h1>
          <p className="text-slate-500 font-medium max-w-md text-sm leading-relaxed mt-0.5">
            The definitive audit log for SYICT. Every critical action, configuration change, and administrative movement is recorded here for security oversight.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={actionFilter}
            onChange={(e) => {
              const val = e.target.value;
              setActionFilter(val);
              setPage(1);
              fetchLogs(1, val);
            }}
            className="py-2 px-3 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl outline-none focus:border-slate-900 shadow-xs cursor-pointer leading-normal"
          >
            <option value="">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
            <option value="DEPLOY">Deploy</option>
            <option value="SYNC">Sync</option>
            <option value="TOGGLE">Toggle</option>
          </select>

          <div className="relative group flex-1 md:w-72">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search logs, branches, actors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 w-full focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium text-slate-700 shadow-xs rounded-xl text-sm leading-normal"
            />
          </div>
        </div>
      </header>

      {/* 360° Branch Executive Audit Banner Link */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3 sm:p-3.5 rounded-xl shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-center text-amber-400 shrink-0">
            <HiOutlineBuildingOffice2 size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 leading-tight">
              <span>Looking for Comprehensive 360° Branch Audit & P&L?</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 leading-normal">
                New Executive System
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 leading-normal">
              Monitor daily, weekly & monthly campus collections, petty cash vouchers, routine conflicts, and red flags.
            </p>
          </div>
        </div>
        <Link
          href={`/${locale}/super/branches/audit`}
          className="px-3 py-1.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-all shrink-0 text-center shadow-xs cursor-pointer leading-normal"
        >
          Open 360° Branch Audit →
        </Link>
      </div>

      {/* Main Audit Feed */}
      <div className="bg-white border border-slate-200/80 shadow-xs relative overflow-hidden rounded-xl">
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 ml-[3.5rem] hidden md:block" />
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="divide-y divide-slate-100 relative z-10"
        >
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="p-4 h-14 bg-slate-50/50 animate-pulse" />
            ))
          ) : filteredLogs.map((log) => {
            const branchName = getLogBranchName(log);
            const branchCode = getLogBranchCode(log);

            return (
              <motion.div 
                key={log._id} 
                variants={item}
                className="group p-3 md:p-3.5 flex flex-col md:flex-row md:items-center gap-3 hover:bg-slate-50/60 transition-all"
              >
                <div className="flex items-center gap-2.5 shrink-0">
                  {/* Timestamp box */}
                  <div className="w-11 h-11 bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center relative z-20 rounded-lg shrink-0 p-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none">{format(new Date(log.createdAt), 'MMM')}</p>
                    <p className="text-base font-black text-slate-900 leading-none mt-0.5">{format(new Date(log.createdAt), 'dd')}</p>
                  </div>

                  {/* Action Tag */}
                  <div className={`px-2.5 py-1 border text-[10px] font-black uppercase tracking-wider whitespace-nowrap rounded-md flex items-center justify-center shrink-0 leading-normal ${getActionColor(log.action)}`}>
                    {log.action.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 leading-none flex-wrap">
                    <span className="text-slate-700 font-bold text-sm flex items-center gap-1.5 leading-snug">
                      <HiOutlineUser className="text-slate-400 shrink-0" size={14} />
                      <span className="text-slate-900">{log.actor?.name || 'System Agent'}</span>
                    </span>
                    {log.actor?.role && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/80 leading-normal">
                        {log.actor.role.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 mt-1 text-xs text-slate-500 font-medium leading-normal">
                    <span className="flex items-center gap-1 text-slate-400 leading-normal">
                      <HiOutlineCalendar size={13} className="shrink-0" />
                      <span>{format(new Date(log.createdAt), 'HH:mm:ss')}</span>
                    </span>
                    
                    {/* Entity & Branch Identification */}
                    <span className="flex items-center gap-1.5 leading-normal">
                      <HiOutlineBolt size={13} className="text-amber-500 shrink-0" />
                      {branchName ? (
                        <span className="inline-flex items-center gap-1 leading-normal">
                          <strong className="text-slate-900 font-bold bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200/70 text-xs leading-normal">
                            {branchName}
                          </strong>
                          <span className="text-[11px] font-mono text-slate-400 uppercase leading-normal">
                            (#{log.entityId?.slice(-6) || branchCode || 'ID'})
                          </span>
                        </span>
                      ) : (
                        <span className="uppercase font-mono text-slate-600 leading-normal">
                          {log.entity} #{log.entityId?.slice(-6) || 'N/A'}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0 gap-2 shrink-0">
                  <div className="bg-slate-50 px-2 py-1 flex items-center gap-1 border border-slate-200/60 rounded-md">
                    <HiOutlineCommandLine className="text-slate-400 shrink-0" size={12} />
                    <span className="text-[10px] font-mono font-bold text-slate-500 leading-normal">{log.ipAddress || 'Internal'}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSelectedLog(log)}
                    className="text-slate-800 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 bg-slate-100 hover:bg-slate-900 hover:text-white active:scale-95 transition-all rounded-md cursor-pointer border border-slate-200/80 shadow-2xs leading-normal"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
          
          {!loading && filteredLogs.length === 0 && (
            <div className="p-10 text-center">
              <HiOutlineClipboardDocumentList size={36} className="mx-auto text-slate-200 mb-2" />
              <p className="text-slate-400 font-medium italic text-xs leading-normal">No pulse detected in the current filter.</p>
            </div>
          )}
        </motion.div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="px-3.5 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 relative z-20">
            <p className="text-xs font-semibold text-slate-500 leading-normal">
              Showing page <span className="font-bold text-slate-900">{page}</span> of <span className="font-bold text-slate-900">{totalPages}</span> ({total} records)
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => { const prev = Math.max(1, page - 1); setPage(prev); fetchLogs(prev, actionFilter); }}
                className="px-3 py-1 text-xs font-bold rounded-md bg-white border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition-all cursor-pointer shadow-2xs leading-normal"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => { const next = Math.min(totalPages, page + 1); setPage(next); fetchLogs(next, actionFilter); }}
                className="px-3 py-1 text-xs font-bold rounded-md bg-white border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition-all cursor-pointer shadow-2xs leading-normal"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Audit Log Inspector Modal */}
      <AnimatePresence>
        {selectedLog && (() => {
          const modalBranchName = getLogBranchName(selectedLog);
          const modalBranchCode = getLogBranchCode(selectedLog);

          return (
            <div className="fixed inset-0 z-[99999999] flex items-center justify-center p-3">
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
                className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] z-10"
              >
                {/* Header */}
                <div className="p-3 sm:p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center text-slate-900 shadow-2xs shrink-0">
                      <HiOutlineFingerPrint size={20} />
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
                      <div className="text-xs text-slate-500 font-mono flex items-center gap-1 mt-0.5 leading-normal">
                        <span className="text-slate-400">ID:</span>
                        <span className="text-slate-700 font-semibold">{selectedLog._id}</span>
                        <button 
                          type="button" 
                          onClick={() => copyToClipboard(selectedLog._id, 'Log ID copied')}
                          className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center p-0.5 rounded hover:bg-slate-200/60"
                          title="Copy ID"
                        >
                          <HiOutlineClipboardDocumentCheck size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setSelectedLog(null)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center border border-slate-200 transition-all cursor-pointer shrink-0 ml-2"
                  >
                    <HiOutlineXMark size={16} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3.5">
                  {/* Meta Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Initiator */}
                    <div className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-100 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 leading-normal">
                        <HiOutlineUser size={12} className="shrink-0" /> Initiator / Actor
                      </p>
                      <p className="text-sm font-bold text-slate-900 leading-snug">
                        {selectedLog.actor?.name || 'System Agent'}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap leading-normal">
                        {selectedLog.actor?.email && <span>{selectedLog.actor.email}</span>}
                        {selectedLog.actor?.role && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600 leading-normal">
                            {selectedLog.actor.role.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Target Entity with Branch Name */}
                    <div className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-100 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 leading-normal">
                        <HiOutlineBolt size={12} className="shrink-0" /> Target Entity
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-bold text-slate-900 leading-snug">
                          {modalBranchName || selectedLog.entity}
                        </p>
                        {modalBranchName && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 leading-normal">
                            Branch
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-mono flex items-center gap-1 leading-normal">
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
                    <div className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-100 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 leading-normal">
                        <HiOutlineCalendar size={12} className="shrink-0" /> Timestamp
                      </p>
                      <p className="text-xs font-bold text-slate-900 leading-snug">
                        {format(new Date(selectedLog.createdAt), 'EEEE, MMMM dd, yyyy')}
                      </p>
                      <p className="text-xs text-slate-500 font-mono leading-normal">
                        {format(new Date(selectedLog.createdAt), 'HH:mm:ss (xxx)')}
                      </p>
                    </div>

                    {/* Network Origin */}
                    <div className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-100 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 leading-normal">
                        <HiOutlineCommandLine size={12} className="shrink-0" /> Network Origin
                      </p>
                      <p className="text-xs font-bold font-mono text-slate-900 leading-snug">
                        {selectedLog.ipAddress || 'Internal Cluster / localhost'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate leading-normal" title={selectedLog.userAgent || 'Direct API Call'}>
                        {selectedLog.userAgent ? selectedLog.userAgent.slice(0, 35) + '...' : 'Direct Server Execution'}
                      </p>
                    </div>
                  </div>

                  {/* Branch Callout Card */}
                  {modalBranchName && (
                    <div className="p-2.5 bg-indigo-50/40 rounded-lg border border-indigo-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                          <HiOutlineBuildingOffice2 size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-wider text-indigo-500 leading-none mb-0.5">Target Branch</p>
                          <p className="text-sm font-bold text-slate-900 leading-snug">
                            {modalBranchName}
                            {modalBranchCode && (
                              <span className="text-xs font-mono text-slate-500 font-medium ml-1">
                                ({modalBranchCode})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white border border-indigo-200 text-indigo-700 shadow-2xs shrink-0 ml-2 leading-normal">
                        Verified Branch
                      </span>
                    </div>
                  )}

                  {/* Data Mutation Payload */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1 leading-normal">
                        <HiOutlineShieldCheck size={14} className="text-indigo-600 shrink-0" />
                        Payload & State Details
                      </p>
                      {selectedLog.details && Object.keys(selectedLog.details).length > 0 && (
                        <button 
                          type="button"
                          onClick={() => copyToClipboard(JSON.stringify(selectedLog.details, null, 2), 'Payload JSON copied')}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer leading-normal"
                        >
                          <HiOutlineClipboardDocumentCheck size={12} /> Copy JSON
                        </button>
                      )}
                    </div>

                    {selectedLog.details && Object.keys(selectedLog.details).length > 0 ? (
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto max-h-48 leading-relaxed border border-slate-800">
                        <pre>{JSON.stringify(selectedLog.details, null, 2)}</pre>
                      </div>
                    ) : (
                      <div className="p-4 text-center bg-slate-50 border border-slate-100 rounded-lg">
                        <HiOutlineShieldCheck size={24} className="mx-auto text-slate-300 mb-1" />
                        <p className="text-xs font-medium text-slate-500 leading-normal">
                          Standard system event record without additional payload mutations. Action was committed directly to the core database entity.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-3.5 py-2.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(JSON.stringify(selectedLog, null, 2), 'Full Log record copied')}
                    className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1 cursor-pointer leading-normal"
                  >
                    <HiOutlineClipboardDocumentCheck size={13} /> Copy Full Record
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLog(null)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer leading-normal"
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
