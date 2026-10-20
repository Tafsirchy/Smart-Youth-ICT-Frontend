'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
  HiOutlineArrowPath,
  HiOutlinePrinter,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineBanknotes,
  HiOutlineReceiptPercent,
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineMegaphone,
  HiOutlineTruck,
  HiOutlineTicket,
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineCurrencyBangladeshi
} from 'react-icons/hi2';

export default function BranchExecutiveAuditPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'en';

  // State
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBranchId, setSelectedBranchId] = useState('all');
  const [period, setPeriod] = useState('monthly'); // daily | weekly | monthly | custom
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [activeTab, setActiveTab] = useState('financial'); // financial | academic | marketing | operations | staffing

  // Client-only date values to prevent React hydration mismatch (#425/#422)
  // These are only set after mount so server HTML and client HTML match
  const [auditRef, setAuditRef] = useState('');
  const [printDate, setPrintDate] = useState('');

  useEffect(() => {
    setAuditRef('AUD-' + Date.now().toString().slice(-8));
    setPrintDate(new Date().toLocaleDateString('en-GB'));
  }, []);

  // Directive Modal
  const [directiveModalOpen, setDirectiveModalOpen] = useState(false);
  const [directiveSubmitting, setDirectiveSubmitting] = useState(false);
  const [directiveForm, setDirectiveForm] = useState({
    title: '',
    message: '',
    severity: 'warning',
    actionRequired: ''
  });

  // Fetch Audit Data
  const fetchAuditReport = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = {
        branchId: selectedBranchId,
        period
      };
      if (period === 'custom') {
        if (!customStart || !customEnd) {
          toast.error('Please select both Start and End dates for custom range');
          setLoading(false);
          return;
        }
        queryParams.startDate = customStart;
        queryParams.endDate = customEnd;
      }

      const res = await api.get('/super/audit/branch-report', { params: queryParams });
      if (res.data?.success) {
        setReport(res.data);
      }
    } catch (err) {
      console.error('Audit Report fetch error:', err);
      toast.error(err.response?.data?.message || 'Failed to load executive branch audit report');
    } finally {
      setLoading(false);
    }
  }, [selectedBranchId, period, customStart, customEnd]);

  useEffect(() => {
    fetchAuditReport();
  }, [fetchAuditReport]);

  // Handle Dispatch Directive
  const handleSendDirective = async (e) => {
    e.preventDefault();
    if (!directiveForm.title || !directiveForm.message) {
      toast.error('Directive title and message are required');
      return;
    }

    const targetBranch = selectedBranchId !== 'all' ? selectedBranchId : null;

    if (!targetBranch) {
      toast.error('Please select a specific branch to dispatch this audit directive');
      return;
    }

    try {
      setDirectiveSubmitting(true);
      const res = await api.post('/super/audit/send-branch-alert', {
        branchId: targetBranch,
        title: directiveForm.title,
        message: directiveForm.message,
        severity: directiveForm.severity,
        actionRequired: directiveForm.actionRequired
      });

      if (res.data?.success) {
        toast.success(res.data.message || 'Audit directive successfully dispatched!');
        setDirectiveModalOpen(false);
        setDirectiveForm({ title: '', message: '', severity: 'warning', actionRequired: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to dispatch audit directive');
    } finally {
      setDirectiveSubmitting(false);
    }
  };

  // One-click Jump to Branch as Admin
  const handleJumpToBranch = () => {
    if (selectedBranchId === 'all') {
      toast.error('Please select a specific branch from the dropdown first');
      return;
    }
    router.push(`/${locale}/${selectedBranchId}/admin`);
  };

  const score = report?.auditScore?.score ?? 100;
  const redFlags = report?.redFlags || [];
  const meta = report?.meta;
  const fin = report?.financialAudit;
  const acad = report?.academicAudit;
  const mkt = report?.salesMarketingAudit;
  const ops = report?.operationsLogisticsAudit;
  const staff = report?.staffingHealth;

  return (
    <div className="min-h-screen space-y-4 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-4 pb-10 print:p-0 print:m-0 print:max-w-none text-slate-800">
      
      {/* ─── PRINT HEADER (Visible only when printed) ─── */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-2 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">SMART YOUTH ICT</h1>
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500 leading-[1.4]">
              Institutional Governance & Executive 360° Branch Audit Report
            </p>
          </div>
          <div className="text-right text-xs font-mono" suppressHydrationWarning>
            <p className="font-bold text-slate-900" suppressHydrationWarning>REF: {auditRef || 'AUD---------'}</p>
            <p className="text-slate-500" suppressHydrationWarning>Date: {printDate || '...'}</p>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs bg-slate-50 p-2 border border-slate-200">
          <div><strong>Target:</strong> {meta?.branchName} ({meta?.branchCode})</div>
          <div><strong>Period:</strong> {meta?.period?.toUpperCase()}</div>
          <div suppressHydrationWarning><strong>Generated:</strong> {meta?.generatedAt ? new Date(meta.generatedAt).toLocaleString('en-GB') : 'N/A'}</div>
        </div>
      </div>

      {/* ─── SCREEN HEADER & CONTROLS ─── */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3.5 md:p-4 rounded-2xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <div className="flex items-center gap-2.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
                  <HiOutlineClipboardDocumentList className="text-slate-900 shrink-0" size={38} />
                  <span>Executive 360° Branch Audit</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Real-time Governance
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5 leading-relaxed">
                Full institutional audit across finances, academic adherence, admissions pipeline & operational compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={fetchAuditReport}
            disabled={loading}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Refresh Audit Data"
          >
            <HiOutlineArrowPath size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Print or Export to PDF"
          >
            <HiOutlinePrinter size={16} />
            <span>Export / Print</span>
          </button>

          {selectedBranchId !== 'all' && (
            <button
              type="button"
              onClick={handleJumpToBranch}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Open Branch Portal"
            >
              <HiOutlineArrowTopRightOnSquare size={16} />
              <span>Jump to Branch</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (selectedBranchId === 'all') {
                toast.error('Please select a specific branch before issuing a directive');
                return;
              }
              setDirectiveModalOpen(true);
            }}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <HiOutlinePaperAirplane size={16} />
            <span>Issue Directive</span>
          </button>
        </div>
      </header>

      {/* ─── FILTER SELECTORS (Branch + Timeframe) ─── */}
      <section className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs print:hidden space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Branch Picker */}
          <div className="flex items-center gap-2 flex-1 min-w-[280px]">
            <HiOutlineBuildingOffice2 className="text-slate-400 shrink-0" size={20} />
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5 leading-[1.4]">
                Select Audit Target Campus
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 cursor-pointer"
              >
                <option value="all">🌐 All Campuses (Network-wide Consolidated Audit)</option>
                {report?.availableBranches?.map((b) => (
                  <option key={b._id} value={b._id}>
                    🏛️ {b.name} ({b.code}) — {b.city || b.division || 'Bangladesh'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeframe Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-end">
            {[
              { id: 'daily', label: 'Daily (Today)' },
              { id: 'weekly', label: 'Weekly (7 Days)' },
              { id: 'monthly', label: 'Monthly (Current)' },
              { id: 'custom', label: 'Custom Range' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setPeriod(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  period === t.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Pickers (if period === 'custom') */}
        {period === 'custom' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">From:</span>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">To:</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none"
              />
            </div>
            <button
              type="button"
              onClick={fetchAuditReport}
              className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
            >
              Apply Filter
            </button>
          </motion.div>
        )}
      </section>

      {/* ─── TOP EXECUTIVE SCORECARDS (4 Key Metric Blocks) ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Card 1: Health & Compliance Score */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">
              Audit Health Score
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${report?.auditScore?.badgeClass || 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
              {report?.auditScore?.status || 'Good'}
            </span>
          </div>

          <div className="my-2 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">{score}%</span>
            <span className="text-xs font-bold text-slate-400">/ 100</span>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-1.5 border-t border-slate-100 leading-[1.4]">
            <span>Critical: <strong className="text-rose-600">{report?.auditScore?.criticalFlagsCount || 0}</strong></span>
            <span>High: <strong className="text-amber-600">{report?.auditScore?.highFlagsCount || 0}</strong></span>
            <span>Total Flags: <strong className="text-slate-900">{report?.auditScore?.totalFlagsCount || 0}</strong></span>
          </div>
        </div>

        {/* Card 2: Gross Collections */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">
              Total Revenue Collected
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              ৳
            </div>
          </div>

          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ৳{(fin?.revenue?.total || 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold leading-[1.4]">
              <span className={(fin?.revenue?.growthPct || 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {(fin?.revenue?.growthPct || 0) >= 0 ? '↑ +' : '↓ '}{fin?.revenue?.growthPct || 0}%
              </span>
              <span className="text-slate-400 font-normal">vs prior period</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 border-t border-slate-100 font-medium leading-[1.4]">
            <span>Tx Count: <strong>{fin?.revenue?.transactionCount || 0}</strong></span>
            <span>Avg: <strong>৳{(fin?.revenue?.averageTransaction || 0).toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Card 3: Expenses & Voucher Compliance */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">
              Petty Cash & Vouchers
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <HiOutlineReceiptPercent size={18} />
            </div>
          </div>

          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ৳{(fin?.expense?.totalApproved || 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold leading-[1.4]">
              <span className={fin?.expense?.voucherComplianceRate >= 85 ? 'text-emerald-600' : 'text-rose-600'}>
                {fin?.expense?.voucherComplianceRate || 100}% Voucher Compliance
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 border-t border-slate-100 font-medium leading-[1.4]">
            <span>Net Margin: <strong className={fin?.netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}>৳{(fin?.netProfit || 0).toLocaleString()}</strong></span>
            <span>Margin %: <strong>{fin?.profitMargin || 0}%</strong></span>
          </div>
        </div>

        {/* Card 4: Academic & Admissions Pulse */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">
              Admissions & Academics
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <HiOutlineAcademicCap size={18} />
            </div>
          </div>

          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              +{acad?.newEnrollments || 0} <span className="text-sm font-semibold text-slate-500">New Enrollments</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold leading-[1.4]">
              <span className="text-indigo-600">{acad?.activeStudents || 0} Total Active Students</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 border-t border-slate-100 font-medium leading-[1.4]">
            <span>Routines: <strong>{acad?.activeRoutinesCount || 0}</strong></span>
            <span>Conflicts: <strong className={acad?.scheduleConflictsCount > 0 ? 'text-rose-600 font-black' : 'text-slate-900'}>{acad?.scheduleConflictsCount || 0}</strong></span>
          </div>
        </div>

      </section>

      {/* ─── ANOMALY & RED FLAG ALERT DRAWER (if any flags detected) ─── */}
      {redFlags.length > 0 && (
        <section className="bg-rose-50/60 border border-rose-200/90 rounded-2xl p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-rose-800 font-black text-base leading-[1.4]">
              <HiOutlineExclamationTriangle size={22} className="text-rose-600 shrink-0" />
              <span>Institutional Red Flags & Compliance Discrepancies ({redFlags.length})</span>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
              Action Suggested by HQ AI Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {redFlags.map((flag) => (
              <div
                key={flag.id}
                className="bg-white p-3 rounded-xl border border-rose-200/70 shadow-2xs space-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${
                      flag.severity === 'critical'
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : flag.severity === 'high'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-blue-100 text-blue-800 border-blue-300'
                    }`}>
                      {flag.severity} • {flag.category}
                    </span>
                    <span className="text-xs font-black font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {flag.metric}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                    {flag.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {flag.description}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-slate-500 italic leading-[1.4]">
                    💡 {flag.actionSuggestion}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedBranchId === 'all') {
                        toast.error('Please select a specific branch before issuing a directive');
                        return;
                      }
                      setDirectiveForm({
                        title: flag.title,
                        message: flag.description,
                        severity: flag.severity === 'critical' ? 'critical' : 'high',
                        actionRequired: flag.actionSuggestion
                      });
                      setDirectiveModalOpen(true);
                    }}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                  >
                    Direct Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── DOMAIN AUDIT TABS ─── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center overflow-x-auto border-b border-slate-200 bg-slate-50/60 p-1.5 gap-1.5 print:hidden">
          {[
            { id: 'financial', label: 'Financial & P&L', icon: HiOutlineBanknotes },
            { id: 'academic', label: 'Academic & Routines', icon: HiOutlineAcademicCap },
            { id: 'marketing', label: 'Admissions & Leads', icon: HiOutlineUsers },
            { id: 'operations', label: 'Supply & Requisitions', icon: HiOutlineTruck },
            { id: 'staffing', label: 'Staff Governance', icon: HiOutlineShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="p-3.5 sm:p-4">
          
          {/* ════ TAB 1: FINANCIAL & P&L ════ */}
          {activeTab === 'financial' && (
            <div className="space-y-4">
              
              {/* Top Subgrid: Gateway breakdown + Expense Category breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                
                {/* Gateway Revenue Breakdown */}
                <div className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/40 space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center justify-between gap-2 leading-[1.4]">
                    <span>Revenue by Payment Method</span>
                    <span className="text-[11px] font-mono font-bold text-slate-700">Total: ৳{(fin?.revenue?.total || 0).toLocaleString()}</span>
                  </h3>

                  <div className="space-y-2">
                    {fin?.revenue?.byMethod?.length > 0 ? (
                      fin.revenue.byMethod.map((m) => {
                        const pct = fin.revenue.total > 0 ? Math.round((m.total / fin.revenue.total) * 100) : 0;
                        return (
                          <div key={m._id} className="space-y-0.5">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 leading-[1.4]">
                              <span className="uppercase tracking-wider">{m._id || 'Direct Bank/Cash'}</span>
                              <span>৳{m.total.toLocaleString()} ({pct}%)</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2 text-center">No completed transactions in this timeframe.</p>
                    )}
                  </div>
                </div>

                {/* Expense by Category Breakdown */}
                <div className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/40 space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center justify-between gap-2 leading-[1.4]">
                    <span>Approved Expenses by Category</span>
                    <span className="text-[11px] font-mono font-bold text-slate-700">Total: ৳{(fin?.expense?.totalApproved || 0).toLocaleString()}</span>
                  </h3>

                  <div className="space-y-2">
                    {fin?.expense?.byCategory?.length > 0 ? (
                      fin.expense.byCategory.map((c) => {
                        const pct = fin.expense.totalApproved > 0 ? Math.round((c.total / fin.expense.totalApproved) * 100) : 0;
                        return (
                          <div key={c._id} className="space-y-0.5">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800 leading-[1.4]">
                              <span className="capitalize">{c._id} ({c.count} items)</span>
                              <span>৳{c.total.toLocaleString()} ({pct}%)</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2 text-center">No approved expenses logged for this timeframe.</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Overdue Installments Table */}
              <div className="border border-slate-200/80 rounded-xl overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-[1.4]">Overdue Installments & Receivables Awaiting Action</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Installments pending for over 14 days without student payment verification.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold shrink-0">
                    Risk Assessment
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Student Name</th>
                        <th className="px-3 py-2">Contact Phone</th>
                        <th className="px-3 py-2">Course Title</th>
                        <th className="px-3 py-2">Due Amount</th>
                        <th className="px-3 py-2">Generated Date</th>
                        <th className="px-3 py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {/* Check redFlags items for overdue */}
                      {redFlags.find(f => f.id === 'overdue_installments_alert')?.items?.length > 0 ? (
                        redFlags.find(f => f.id === 'overdue_installments_alert').items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-3 py-2 font-bold text-slate-900">{item.studentName || 'N/A'}</td>
                            <td className="px-3 py-2 font-mono">{item.phone || 'N/A'}</td>
                            <td className="px-3 py-2">{item.course || 'N/A'}</td>
                            <td className="px-3 py-2 font-bold text-rose-600">৳{item.amount?.toLocaleString()}</td>
                            <td className="px-3 py-2 text-slate-500">{new Date(item.dueDate).toLocaleDateString('en-GB')}</td>
                            <td className="px-3 py-2 text-right">
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                                SMS Reminder Due
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-3 py-4 text-center text-slate-400 italic">
                            ✓ No overdue installments older than 14 days detected. Healthy collections.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ════ TAB 2: ACADEMIC & ROUTINES ════ */}
          {activeTab === 'academic' && (
            <div className="space-y-4">
              
              {/* Conflict Alert Banner if any */}
              {acad?.scheduleConflictsCount > 0 && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <HiOutlineExclamationTriangle className="text-rose-600 shrink-0" size={24} />
                    <div>
                      <h4 className="text-sm font-bold text-rose-900 leading-snug">
                        {acad.scheduleConflictsCount} Schedule Collision(s) Detected in Active Routines
                      </h4>
                      <p className="text-xs text-rose-700 leading-relaxed">
                        Multiple batches are scheduled to use the same room/lab or trainer simultaneously.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleJumpToBranch}
                    className="px-3 py-1.5 bg-rose-900 text-white rounded-lg text-xs font-bold hover:bg-rose-800 transition-all cursor-pointer shrink-0"
                  >
                    Fix Routine Matrix
                  </button>
                </div>
              )}

              {/* Top Enrolled Courses in this branch */}
              <div className="border border-slate-200/80 rounded-xl p-3 space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 leading-[1.4]">
                  Most Popular Courses in Audited Period
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {acad?.popularCourses?.length > 0 ? (
                    acad.popularCourses.map((c, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate leading-[1.4]">{c.title || 'Course'}</p>
                          <p className="text-[10px] text-slate-400 font-mono">#{c.courseId?.slice(-6)}</p>
                        </div>
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 font-black text-xs rounded-lg shrink-0">
                          {c.enrollments} Enrolled
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic py-2 col-span-3 text-center">
                      No new enrollments registered during this timeframe.
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Status Breakdown */}
              <div className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/50 space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 leading-[1.4]">
                  Student Enrollment Payment Compliance Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {acad?.paymentStatusBreakdown?.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-xl">
                      <p className="text-[10px] uppercase font-black tracking-wider text-slate-400 leading-[1.4]">{s._id || 'Standard'}</p>
                      <p className="text-xl font-black text-slate-900 mt-0.5">{s.count}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ════ TAB 3: ADMISSIONS & LEADS ════ */}
          {activeTab === 'marketing' && (
            <div className="space-y-4">
              
              {/* Funnel Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">Total Counseling Leads</p>
                  <p className="text-3xl font-black text-slate-900 mt-0.5">{mkt?.counseling?.totalInquiries || 0}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-[1.4]">Walk-ins & Online bookings</p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700 leading-[1.4]">Successfully Enrolled</p>
                  <p className="text-3xl font-black text-emerald-800 mt-0.5">{mkt?.counseling?.enrolledCount || 0}</p>
                  <p className="text-xs text-emerald-600 mt-0.5 leading-[1.4]">Converted into paid students</p>
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-indigo-700 leading-[1.4]">Lead Conversion Rate</p>
                  <p className="text-3xl font-black text-indigo-800 mt-0.5">{mkt?.counseling?.conversionRatePct || 0}%</p>
                  <p className="text-xs text-indigo-600 mt-0.5 leading-[1.4]">Benchmark: &gt;25% is healthy</p>
                </div>
              </div>

              {/* Coupons & Promo Discounts */}
              <div className="border border-slate-200/80 rounded-xl p-3 space-y-2 bg-slate-50/50">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 leading-[1.4]">
                  Campus Promo Coupons & Discounts Disbursed
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold leading-[1.4]">Active Promo Codes</span>
                    <strong className="text-base text-slate-900">{mkt?.coupons?.activeCoupons || 0}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold leading-[1.4]">Total Redemptions</span>
                    <strong className="text-base text-slate-900">{mkt?.coupons?.totalUsedCount || 0} Times</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold leading-[1.4]">Discount Subsidized</span>
                    <strong className="text-base text-rose-600">৳{(mkt?.coupons?.totalDiscountGiven || 0).toLocaleString()}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold leading-[1.4]">Revenue Driven</span>
                    <strong className="text-base text-emerald-600">৳{(mkt?.coupons?.totalRevenueGenerated || 0).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ════ TAB 4: SUPPLY & REQUISITIONS ════ */}
          {activeTab === 'operations' && (
            <div className="space-y-4">
              
              {/* Courier Shipments in Transit */}
              <div className="border border-slate-200/80 rounded-xl overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <HiOutlineTruck size={20} className="text-indigo-600 shrink-0" />
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-[1.4]">Dispatched Requisitions Currently in Courier Transit</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Parcels on the way to this campus requiring confirmation upon arrival.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-lg border border-indigo-200 shrink-0">
                    {ops?.requisitions?.inTransitCourierCount || 0} In-Transit
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Req Number</th>
                        <th className="px-3 py-2">Title</th>
                        <th className="px-3 py-2">Courier Provider</th>
                        <th className="px-3 py-2">Tracking Number</th>
                        <th className="px-3 py-2">Dispatched Date</th>
                        <th className="px-3 py-2">Urgency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {ops?.requisitions?.inTransitItems?.length > 0 ? (
                        ops.requisitions.inTransitItems.map((item) => (
                          <tr key={item._id} className="hover:bg-slate-50">
                            <td className="px-3 py-2 font-mono font-bold text-slate-900">{item.requisitionNumber}</td>
                            <td className="px-3 py-2">{item.title}</td>
                            <td className="px-3 py-2 font-semibold text-slate-800">{item.courierInfo?.provider || 'Courier'}</td>
                            <td className="px-3 py-2 font-mono text-indigo-600">{item.courierInfo?.trackingNumber || 'Pending'}</td>
                            <td className="px-3 py-2 text-slate-500">
                              {item.courierInfo?.dispatchedDate ? new Date(item.courierInfo.dispatchedDate).toLocaleDateString('en-GB') : 'Recent'}
                            </td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                item.urgency === 'urgent' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {item.urgency}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-3 py-4 text-center text-slate-400 italic">
                            ✓ No active parcels currently in courier transit. All deliveries accounted for.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Campus Notices */}
              <div className="border border-slate-200/80 rounded-xl p-3 space-y-2 bg-slate-50/50">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center justify-between gap-2 leading-[1.4]">
                  <span>Campus Broadcast Notices in Period</span>
                  <span className="text-[11px] font-bold text-slate-700">{ops?.notices?.totalNotices || 0} Total Published</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold leading-[1.4]">Urgent Alerts</span>
                    <strong className="text-base text-rose-600">{ops?.notices?.urgentCount || 0}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold leading-[1.4]">Pinned Announcements</span>
                    <strong className="text-base text-slate-900">{ops?.notices?.pinnedCount || 0}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold leading-[1.4]">Total Student Views</span>
                    <strong className="text-base text-indigo-600">{ops?.notices?.totalViews || 0} Reads</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ════ TAB 5: STAFF GOVERNANCE ════ */}
          {activeTab === 'staffing' && (
            <div className="space-y-4">
              
              {/* Role counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">Branch Admins</span>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{staff?.byRole?.branchAdmin || 0}</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">Management</span>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{staff?.byRole?.branchManagement || 0}</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">Instructors</span>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{staff?.byRole?.instructor || 0}</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-[1.4]">Staff & Counselors</span>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{staff?.byRole?.employee || 0}</p>
                </div>
              </div>

              {/* Staff Directory Table */}
              <div className="border border-slate-200/80 rounded-xl overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200">
                  <h3 className="text-sm font-black text-slate-900 leading-[1.4]">Active Campus Personnel Directory</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Authorized personnel maintaining branch day-to-day operations.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Staff Name</th>
                        <th className="px-3 py-2">Official Role</th>
                        <th className="px-3 py-2">Email Address</th>
                        <th className="px-3 py-2">Contact Phone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {staff?.members?.length > 0 ? (
                        staff.members.map((m) => (
                          <tr key={m._id} className="hover:bg-slate-50">
                            <td className="px-3 py-2 font-bold text-slate-900">{m.name}</td>
                            <td className="px-3 py-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                                {m.role?.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-slate-600">{m.email}</td>
                            <td className="px-3 py-2 font-mono">{m.phone || 'N/A'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-3 py-4 text-center text-slate-400 italic">
                            No active staff personnel assigned to this scope.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ─── PRINT FOOTER (Visible only when printed) ─── */}
      <div className="hidden print:block pt-8 mt-8 border-t border-slate-300 text-xs">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="w-48 border-b border-slate-400 mx-auto mb-2" />
            <p className="font-bold text-slate-900">Branch Manager / Representative</p>
            <p className="text-[10px] text-slate-500">{meta?.branchName}</p>
          </div>
          <div className="text-center">
            <div className="w-48 border-b border-slate-400 mx-auto mb-2" />
            <p className="font-bold text-slate-900">Chief Executive Officer / Super Admin</p>
            <p className="text-[10px] text-slate-500">Smart Youth ICT Headquarters</p>
          </div>
        </div>
      </div>

      {/* ─── DIRECT EXECUTIVE DIRECTIVE MODAL ─── */}
      <AnimatePresence>
        {directiveModalOpen && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDirectiveModalOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            >
              <div className="p-3 sm:p-3.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <HiOutlinePaperAirplane size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-[1.4]">Dispatch Audit Directive</h3>
                    <p className="text-xs text-slate-500 leading-[1.4]">Target: {meta?.branchName}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDirectiveModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center border border-slate-200 transition-all cursor-pointer shrink-0"
                >
                  <HiOutlineXMark size={18} />
                </button>
              </div>

              <form onSubmit={handleSendDirective} className="p-4 sm:p-5 space-y-3 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 leading-[1.4]">Severity Level</label>
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'warning', label: 'Warning', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                      { id: 'high', label: 'High Priority', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                      { id: 'critical', label: 'Critical / Directive', color: 'bg-rose-50 text-rose-700 border-rose-200' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setDirectiveForm({ ...directiveForm, severity: s.id })}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                          directiveForm.severity === s.id ? `${s.color} ring-2 ring-slate-900/10 shadow-xs` : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1 leading-[1.4]">Directive Subject / Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mandatory Expense Voucher Submission for October"
                    value={directiveForm.title}
                    onChange={(e) => setDirectiveForm({ ...directiveForm, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1 leading-[1.4]">Audit Findings & Instructions</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Explain the audit discrepancy and instructions for the branch administration..."
                    value={directiveForm.message}
                    onChange={(e) => setDirectiveForm({ ...directiveForm, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1 leading-[1.4]">Concrete Action Required (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Upload scanned physical receipts within 48 hours"
                    value={directiveForm.actionRequired}
                    onChange={(e) => setDirectiveForm({ ...directiveForm, actionRequired: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDirectiveModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={directiveSubmitting}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                  >
                    {directiveSubmitting ? 'Dispatching...' : 'Dispatch Alert'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
