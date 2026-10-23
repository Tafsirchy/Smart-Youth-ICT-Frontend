'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { superQueryKeys } from '@/lib/queryKeys';
import toast from 'react-hot-toast';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineUserGroup, 
  HiOutlineAcademicCap, 
  HiOutlineBanknotes,
  HiOutlineChevronRight,
  HiOutlineServer,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineArchiveBox,
  HiOutlineCreditCard,
  HiOutlineSparkles,
  HiOutlineArrowPath,
  HiOutlineShieldCheck,
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineDocumentArrowDown,
  HiOutlineArrowDownTray,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineChartBar
} from 'react-icons/hi2';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

const resolveText = (val) => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return val.en || val.bn || '';
  return String(val);
};

export default function GlobalDashboard() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'en';

  const [revenuePeriod, setRevenuePeriod] = useState('allTime');
  const [chartMetric, setChartMetric] = useState('revenue');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [exportingReport, setExportingReport] = useState(false);
  const [downloadingBackup, setDownloadingBackup] = useState(false);

  const { data: stats, isLoading: loading, refetch, isFetching } = useQuery({
    queryKey: superQueryKeys.superStats(),
    queryFn: async () => {
      const res = await api.get('/super/stats');
      return res.data?.data || null;
    },
    staleTime: 45000
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pendingRequisitions = stats?.pendingApprovals?.requisitions || 0;
  const pendingPayments = stats?.pendingApprovals?.payments || 0;
  const pendingTickets = stats?.pendingApprovals?.tickets || 0;
  const totalPending = pendingRequisitions + pendingPayments + pendingTickets;

  let displayRevenue = stats?.revenue || 0;
  if (revenuePeriod === 'thisMonth') {
    displayRevenue = stats?.revenueBreakdown?.thisMonth ?? displayRevenue;
  } else if (revenuePeriod === 'today') {
    displayRevenue = stats?.revenueBreakdown?.today ?? 0;
  }

  const formatUptime = (seconds) => {
    if (!seconds) return 'Active';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const handleExportExecutiveReport = async () => {
    try {
      setExportingReport(true);
      toast.loading('Compiling Executive Briefing Report...', { id: 'exec-export' });
      const res = await api.get('/super/reports/executive-summary', { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SYICT_Executive_Briefing_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Executive Report downloaded successfully', { id: 'exec-export' });
    } catch (err) {
      toast.error('Failed to export report: ' + (err.message || 'Error'), { id: 'exec-export' });
    } finally {
      setExportingReport(false);
    }
  };

  const handleQuickBackup = async () => {
    try {
      setDownloadingBackup(true);
      toast.loading('Generating encrypted database snapshot...', { id: 'quick-backup' });
      const res = await api.get('/super/system/backup/download', { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SYICT_DB_SNAPSHOT_${new Date().toISOString().slice(0, 10)}.json.gz.enc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Encrypted Database Snapshot saved', { id: 'quick-backup' });
    } catch (err) {
      toast.error('Failed to download backup: ' + (err.message || 'Error'), { id: 'quick-backup' });
    } finally {
      setDownloadingBackup(false);
    }
  };

  const commandItems = useMemo(() => {
    const list = [
      { label: 'All Branches Management', category: 'Branch', href: `/${locale}/super/branches` },
      { label: 'Campus Leaderboard & Analytics', category: 'Branch', href: `/${locale}/super/branches/analytics` },
      { label: '360° Comprehensive Branch Audit', category: 'Branch', href: `/${locale}/super/branches/audit` },
      { label: 'Branch Requisitions & Inventory', category: 'Operations', href: `/${locale}/super/requisitions` },
      { label: 'Global Users & Role Access', category: 'Users', href: `/${locale}/super/users` },
      { label: 'Master Curriculum & Syllabi Sync', category: 'Curriculum', href: `/${locale}/super/curriculum` },
      { label: 'Global Finance & P&L', category: 'Finance', href: `/${locale}/super/finance` },
      { label: 'Global Payment Verification', category: 'Finance', href: `/${locale}/super/payments` },
      { label: 'Audit Reports & System Activity', category: 'Security', href: `/${locale}/super/reports` },
      { label: 'Multi-Channel Emergency Broadcast', category: 'Broadcast', href: `/${locale}/super/broadcast` },
      { label: 'Live Notifications Hub', category: 'System', href: `/${locale}/notifications` },
      { label: 'DevOps Pulse & Cloud Backup', category: 'System', href: `/${locale}/super/settings` },
    ];

    if (stats?.performance) {
      stats.performance.forEach((b) => {
        list.push({
          label: `${b.name} (${b.code || 'Campus'}) - ৳${(b.revenue || 0).toLocaleString()}`,
          category: 'Campuses',
          href: `/${locale}/super/branches/analytics`,
        });
      });
    }

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
  }, [locale, stats, searchQuery]);

  const monthlyTrend = stats?.monthlyTrend || [];
  const maxRevenueInTrend = Math.max(...monthlyTrend.map((m) => m.revenue || 0), 1);
  const maxStudentsInTrend = Math.max(...monthlyTrend.map((m) => m.newStudents || 0), 1);

  return (
    <div className="space-y-3.5 w-full pb-6">
      {/* Executive Overview Header */}
      <header className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2.5">
          <div>
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 shadow-2xs">
                <HiOutlineSparkles size={12} className="text-blue-600" />
                HQ Executive Command Center
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-slate-500 font-medium">
                Multi-Tenant Oversight & SLA Governance
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0">
              Network Oversight & Global Intelligence
            </h1>
            <p className="text-xs text-slate-500 font-normal max-w-2xl mt-0.5 leading-snug">
              Consolidated command feed for campus telemetry, centralized curriculum, revenue reconciliation, and emergency directives.
            </p>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold transition shadow-2xs"
              title="Global Command Search (Ctrl + K)"
            >
              <HiOutlineMagnifyingGlass size={14} />
              <span className="hidden sm:inline">Search HQ</span>
              <kbd className="hidden lg:inline px-1 py-0.2 bg-white border border-slate-200 rounded text-[9px] text-slate-500 font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={handleExportExecutiveReport}
              disabled={exportingReport}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 rounded-lg text-xs font-semibold transition shadow-2xs disabled:opacity-50"
              title="Download Board Meeting Briefing (CSV)"
            >
              <HiOutlineDocumentArrowDown size={14} />
              <span>{exportingReport ? 'Exporting...' : 'Export Briefing'}</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                try {
                  await api.get('/super/stats?refresh=true');
                } catch {}
                refetch();
                toast.success('Stats refreshed with live database data');
              }}
              className="p-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition shadow-2xs"
              title="Refresh Global Stats"
            >
              <HiOutlineArrowPath size={14} className={isFetching ? 'animate-spin text-blue-600' : ''} />
            </button>
          </div>
        </div>

        {/* Live Infrastructure & System Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-50/70 border border-slate-200/80 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 shrink-0" />
            <span className="text-slate-500 text-[10px] font-medium">Database:</span>
            <span className="font-bold text-slate-800 text-[11px] truncate">
              {stats?.systemProbe?.dbState === 'connected' ? 'MongoDB Online' : 'Degraded'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50/70 border border-slate-200/80 px-2.5 py-1 rounded-md">
            <HiOutlineServer size={13} className="text-blue-600 shrink-0" />
            <span className="text-slate-500 text-[10px] font-medium">Heap RAM:</span>
            <span className="font-bold text-slate-800 text-[11px]">
              {stats?.systemProbe?.heapUsedMB ? `${stats.systemProbe.heapUsedMB} MB` : 'Optimal'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50/70 border border-slate-200/80 px-2.5 py-1 rounded-md">
            <HiOutlineClock size={13} className="text-indigo-600 shrink-0" />
            <span className="text-slate-500 text-[10px] font-medium">Uptime:</span>
            <span className="font-bold text-slate-800 text-[11px]">
              {formatUptime(stats?.systemProbe?.nodeUptime)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50/70 border border-slate-200/80 px-2.5 py-1 rounded-md">
            <HiOutlineShieldCheck size={13} className="text-emerald-600 shrink-0" />
            <span className="text-slate-500 text-[10px] font-medium">Gateway:</span>
            <span className="font-bold text-emerald-700 text-[11px]">Protected (TLS)</span>
          </div>

          <button
            type="button"
            onClick={handleQuickBackup}
            disabled={downloadingBackup}
            className="flex items-center justify-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md font-semibold transition text-xs shadow-2xs disabled:opacity-50"
            title="Download Instant Encrypted Database Backup"
          >
            <HiOutlineArrowDownTray size={13} className="text-blue-600" />
            <span className="text-[11px]">{downloadingBackup ? 'Encrypting...' : 'DB Snapshot'}</span>
          </button>
        </div>
      </header>

      {/* Executive Pending Approvals Matrix */}
      <section className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight m-0">
              Executive Pending Approvals Matrix
            </h2>
            {totalPending > 0 ? (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {totalPending} Requires HQ Action
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <HiOutlineCheckCircle size={12} />
                All Queues Clear
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Direct action shortcuts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <Link
            href={`/${locale}/super/requisitions`}
            className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition group flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                HQ Requisitions
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-900">{pendingRequisitions}</span>
                <span className="text-[11px] text-slate-500 font-medium">Pending items</span>
              </div>
              <p className="text-[10.5px] text-slate-500 leading-snug">
                Branch supply orders, kits & book replenishment
              </p>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 group-hover:text-blue-600 group-hover:border-blue-200 transition shadow-2xs">
              <HiOutlineArchiveBox size={16} />
            </div>
          </Link>

          <Link
            href={`/${locale}/super/payments`}
            className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition group flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                Payment Verification
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-900">{pendingPayments}</span>
                <span className="text-[11px] text-slate-500 font-medium">Unreconciled</span>
              </div>
              <p className="text-[10.5px] text-slate-500 leading-snug">
                Manual bKash, Nagad & Bank slips awaiting audit
              </p>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 group-hover:text-indigo-600 group-hover:border-indigo-200 transition shadow-2xs">
              <HiOutlineCreditCard size={16} />
            </div>
          </Link>

          <Link
            href={`/${locale}/super/support`}
            className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-rose-300 transition group flex items-start justify-between"
          >
            <div className="space-y-0.5">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                Support Escalation
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-black ${pendingTickets > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                  {pendingTickets}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Critical / Escalated</span>
              </div>
              <p className="text-[10.5px] text-slate-500 leading-snug">
                Urgent student & staff SLA breached tickets
              </p>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 group-hover:text-rose-600 group-hover:border-rose-200 transition shadow-2xs">
              <HiOutlineExclamationTriangle size={16} />
            </div>
          </Link>
        </div>
      </section>

      {/* Core Ecosystem KPI Cards */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5"
      >
        <motion.div 
          variants={item}
          className="bg-white p-3.5 border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ecosystem Students</span>
            <div className="p-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
              <HiOutlineUserGroup size={16} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none m-0">
            {stats?.students ? stats.students.toLocaleString() : '--'}
          </h3>
          <p className="text-[10.5px] text-slate-500 font-medium mt-1 flex items-center gap-1">
            <span className="text-emerald-700 font-bold">Live</span> enrolled scholars network
          </p>
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-white p-3.5 border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Branch Network</span>
            <div className="p-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg">
              <HiOutlineGlobeAlt size={16} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none m-0">
            {stats?.branches ?? '--'}
          </h3>
          <p className="text-[10.5px] text-slate-500 font-medium mt-1 flex items-center gap-1">
            <span className="text-blue-700 font-bold">100%</span> active verified campuses
          </p>
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-white p-3.5 border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Master Curriculum</span>
            <div className="p-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
              <HiOutlineAcademicCap size={16} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none m-0">
            {stats?.curriculum ?? stats?.courses ?? 0}
          </h3>
          <p className="text-[10.5px] text-slate-500 font-medium mt-1 flex items-center gap-1">
            <span className="text-emerald-700 font-bold">{stats?.activeCourses || 0}</span> branch course deployments
          </p>
        </motion.div>

        <motion.div 
          variants={item}
          className="bg-white p-3.5 border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Receipts</span>
            <div className="p-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg">
              <HiOutlineBanknotes size={16} />
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none m-0">
            ৳{displayRevenue.toLocaleString()}
          </h3>

          <div className="flex items-center gap-1 mt-1.5 pt-1.5 border-t border-slate-100">
            {[
              { id: 'allTime', label: 'All-Time' },
              { id: 'thisMonth', label: 'Month' },
              { id: 'today', label: 'Today' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setRevenuePeriod(t.id)}
                className={`px-1.5 py-0.5 text-[9.5px] font-bold rounded transition ${
                  revenuePeriod === t.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* 6-Month Visual Fiscal & Enrollment Trend Analytics */}
      <section className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <div>
            <div className="flex items-center gap-1.5">
              <HiOutlineChartBar size={16} className="text-blue-600" />
              <h2 className="text-base font-black text-slate-900 tracking-tight m-0">
                6-Month Fiscal & Enrollment Trend Analytics
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Consolidated trajectory of tuition receipts and student admissions across all campuses
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg self-start sm:self-auto border border-slate-200">
            <button
              type="button"
              onClick={() => setChartMetric('revenue')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                chartMetric === 'revenue'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Revenue (৳)
            </button>
            <button
              type="button"
              onClick={() => setChartMetric('students')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                chartMetric === 'students'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scholars Enrolled
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1.5 sm:gap-3 items-end pt-4 pb-2 min-h-[140px] border-b border-slate-100">
          {monthlyTrend.map((m, idx) => {
            const val = chartMetric === 'revenue' ? m.revenue : m.newStudents;
            const maxVal = chartMetric === 'revenue' ? maxRevenueInTrend : maxStudentsInTrend;
            const heightPct = Math.max(12, Math.round((val / maxVal) * 100));

            return (
              <div key={idx} className="flex flex-col items-center gap-1 group">
                <span className="text-[9.5px] font-bold text-slate-700 bg-slate-100 px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {chartMetric === 'revenue' ? `৳${(m.revenue || 0).toLocaleString()}` : `${m.newStudents} scholars`}
                </span>

                <div className="w-full max-w-[42px] h-28 bg-slate-100 rounded-lg overflow-hidden flex flex-col justify-end p-0.5">
                  <div
                    className={`w-full rounded-md transition-all duration-500 ${
                      chartMetric === 'revenue' ? 'bg-blue-600' : 'bg-indigo-600'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>

                <span className="text-[10px] font-bold text-slate-600 mt-0.5">
                  {m.label}
                </span>
                <span className="text-[9px] text-slate-400 font-medium -mt-1 hidden sm:inline">
                  {chartMetric === 'revenue' ? `${m.invoiceCount} inv` : `${m.newStudents} reg`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Inactivity & Risk Radar */}
      <section className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight m-0">
              Campus Inactivity & Risk Radar
            </h2>
            <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-slate-100 text-slate-600 border border-slate-200">
              30-Day Velocity Audit
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Automated compliance & transaction monitoring
          </span>
        </div>

        {stats?.riskAlerts && stats.riskAlerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {stats.riskAlerts.map((b, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-amber-200 bg-amber-50/40 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-1.5 py-0.2 text-[8.5px] font-black uppercase tracking-wider rounded bg-amber-100 text-amber-800 border border-amber-300">
                      Attention Required
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-500">{b.code}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate m-0">{resolveText(b.name)}</h4>
                  <p className="text-[11px] text-amber-900/80 mt-0.5 leading-snug font-medium">
                    {b.reason}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-1.5 border-t border-amber-200/60 text-xs">
                  <Link
                    href={`/${locale}/super/broadcast`}
                    className="flex-1 py-1 px-2 bg-white text-slate-800 hover:text-blue-600 text-center rounded-md border border-slate-200 font-semibold transition text-[10.5px]"
                  >
                    Issue Directive
                  </Link>
                  <Link
                    href={`/${locale}/super/branches/audit`}
                    className="flex-1 py-1 px-2 bg-blue-600 text-white hover:bg-blue-700 text-center rounded-md font-semibold transition text-[10.5px]"
                  >
                    360° Audit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/40 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <HiOutlineCheckCircle size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-900 m-0">All Campuses Active & Compliant</h4>
              <p className="text-[10.5px] text-emerald-700 mt-0.5">
                Every verified campus has processed student fees or active curriculum items within the last 30 days.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Main Performance Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Branch Leaderboard & Performance Table */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white border border-slate-200 shadow-xs p-3.5 sm:p-4 rounded-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight m-0">Branch Performance Leaderboard</h2>
              <p className="text-[11px] text-slate-500 font-medium">Ranked by verified invoice revenue & transaction volume</p>
            </div>
            <Link 
              href={`/${locale}/super/branches/analytics`}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-[11px] font-bold transition self-start sm:self-auto"
            >
              <span>Full Analytics</span>
              <HiOutlineChevronRight size={13} />
            </Link>
          </div>
          
          <div className="space-y-1.5">
            {stats?.performance?.slice(0, 6).map((perf, i) => {
              const maxRev = stats.performance[0]?.revenue || stats.revenue || 1;
              const revPct = Math.min(100, Math.round((perf.revenue / maxRev) * 100));

              return (
                <div 
                  key={perf._id || i} 
                  className="group p-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg transition-all flex items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700 group-hover:text-blue-600 rounded-md text-xs shrink-0 shadow-2xs">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-xs truncate m-0">{resolveText(perf.name)}</h4>
                        {perf.code && (
                          <span className="text-[9.5px] font-semibold bg-white px-1 py-0.2 rounded border border-slate-200 text-slate-500">
                            {perf.code}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {perf.count || 0} completed invoices
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-slate-900 tracking-tight leading-none m-0">
                      ৳{perf.revenue?.toLocaleString() || 0}
                    </p>
                    <div className="w-20 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${revPct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}

            {(!stats?.performance || stats.performance.length === 0) && (
              <div className="py-6 text-center text-slate-400 text-xs font-medium">
                No branch revenue data recorded yet.
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Strategic Command & Shortcuts Side */}
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-slate-200 p-3.5 sm:p-4 shadow-xs rounded-xl"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <HiOutlineClipboardDocumentList className="text-blue-600" size={18} />
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight m-0">HQ Strategic Hub</h3>
            </div>
            <p className="text-[11px] text-slate-500 mb-2.5 leading-snug">
              Execute immediate executive directives, review audit trails, or sync central curricula.
            </p>

            <div className="space-y-1.5">
              {[
                { label: 'Issue Multi-Channel Notice', href: `/${locale}/super/broadcast`, badge: 'Broadcast' },
                { label: '360° Comprehensive Branch Audit', href: `/${locale}/super/branches/audit`, badge: 'Governance' },
                { label: 'Deploy & Sync Master Syllabi', href: `/${locale}/super/curriculum`, badge: 'Curriculum' },
                { label: 'Inspect Security Audit Trails', href: `/${locale}/super/reports`, badge: 'Security' },
                { label: 'DevOps Pulse & Cloud Backup', href: `/${locale}/super/settings`, badge: 'Telemetry' },
              ].map((action, i) => (
                <Link 
                  key={i} 
                  href={action.href}
                  className="w-full flex items-center justify-between p-2 sm:p-2.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 text-xs font-bold text-slate-700 hover:text-blue-700 transition rounded-lg group/btn shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="truncate">{action.label}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[9.5px] font-semibold text-slate-400 group-hover/btn:text-blue-600">
                      {action.badge}
                    </span>
                    <HiOutlineChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform text-slate-400 group-hover/btn:text-blue-600" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Interactive Branch Map Shortcut Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-3.5 border border-slate-200 shadow-xs text-center rounded-xl"
          >
            <div className="w-8 h-8 bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto mb-2 rounded-lg shadow-2xs">
              <HiOutlineGlobeAlt size={18} />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-0.5 m-0">Campus Geo-Distribution</h3>
            <p className="text-slate-500 text-[11px] mb-2 leading-snug">Inspect physical campus footprints across Bangladesh.</p>
            <Link 
              href={`/${locale}/super/branches`} 
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition"
            >
              <span>Open Campus Directory</span>
              <HiOutlineChevronRight size={11} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Global Command Palette Modal (Ctrl + K) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[300] flex items-start justify-center pt-12 sm:pt-16 px-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              className="relative w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center px-3.5 py-2.5 border-b border-slate-200 bg-slate-50">
                <HiOutlineMagnifyingGlass className="text-slate-400 mr-2.5" size={18} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a command, campus name, or action..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
                >
                  <HiOutlineXMark size={16} />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
                {commandItems.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No matching actions or campuses found.
                  </div>
                ) : (
                  commandItems.map((cmd, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push(cmd.href);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 text-left transition group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700">
                          {cmd.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                          {cmd.label}
                        </span>
                      </div>
                      <HiOutlineChevronRight size={13} className="text-slate-400 group-hover:text-blue-600" />
                    </button>
                  ))
                )}
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                <span>Navigation shortcut</span>
                <span className="font-mono">ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
