'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import {
  HiChartBar,
  HiTrendingUp,
  HiTrendingDown,
  HiUsers,
  HiCash,
  HiAcademicCap,
  HiSearch,
  HiFilter,
  HiReceiptTax,
  HiLocationMarker,
  HiArrowSmUp,
  HiArrowSmDown,
  HiSparkles
} from 'react-icons/hi';
import { IoShieldCheckmark, IoRibbon } from 'react-icons/io5';

export default function CentralBranchAnalyticsPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [networkTotals, setNetworkTotals] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    netOperatingProfit: 0,
    totalLeads: 0,
    totalConverted: 0,
    overallConversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('revenue'); // revenue, students, margin, conversion

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/super/branches/analytics');
      if (res.data?.success) {
        setLeaderboard(res.data.data.leaderboard || []);
        if (res.data.data.networkTotals) {
          setNetworkTotals(res.data.data.networkTotals);
        }
      }
    } catch (err) {
      console.error('Failed to load branch analytics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const filteredAndSorted = leaderboard
    .filter(b => {
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        (b.code && b.code.toLowerCase().includes(q)) ||
        (b.city && b.city.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'students') return b.studentCount - a.studentCount;
      if (sortBy === 'margin') return b.netMargin - a.netMargin;
      if (sortBy === 'conversion') return b.conversionRate - a.conversionRate;
      return b.revenue - a.revenue;
    });

  const getRankBadge = (index) => {
    if (index === 0) return { label: '🥇 1st Place', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (index === 1) return { label: '🥈 2nd Place', bg: 'bg-slate-100 text-slate-700 border-slate-300' };
    if (index === 2) return { label: '🥉 3rd Place', bg: 'bg-orange-100 text-orange-800 border-orange-300' };
    return { label: `#${index + 1}`, bg: 'bg-slate-50 text-slate-500 border-slate-200' };
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <HiChartBar className="h-4 w-4 text-cyan-400" />
            <span>Central Multi-Tenant Governance</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
            Campus Leaderboard & Comparative Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Real-time benchmarking across all active Smart Youth ICT campuses. Compare gross revenues, net operational profit margins, student retention, and counseling conversion ROI.
          </p>
        </div>

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-16 right-48 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl" />
      </div>

      {/* Network Overview Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Network Students</span>
            <span className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/50">
              <HiUsers className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-white">
              {networkTotals.totalStudents.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">Across Campuses</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gross Revenue</span>
            <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/50">
              <HiCash className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">
              ৳{networkTotals.totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Operating Expenses</span>
            <span className="rounded-xl bg-rose-50 p-2 text-rose-600 dark:bg-rose-950/50">
              <HiReceiptTax className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-600">
              ৳{networkTotals.totalExpenses.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">Petty Cash & Bills</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Net Operating Margin</span>
            <span className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-950/50">
              <HiSparkles className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span
              className={`text-2xl font-black ${
                networkTotals.netOperatingProfit >= 0 ? 'text-purple-600' : 'text-rose-600'
              }`}
            >
              ৳{networkTotals.netOperatingProfit.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {networkTotals.overallConversionRate}% Conv.
            </span>
          </div>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search campus name, code or city..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Rank By:</span>
          {[
            { id: 'revenue', label: 'Revenue (৳)' },
            { id: 'margin', label: 'Net Margin (৳)' },
            { id: 'students', label: 'Students' },
            { id: 'conversion', label: 'Conversion %' }
          ].map(sortOption => (
            <button
              key={sortOption.id}
              onClick={() => setSortBy(sortOption.id)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold capitalize transition-all whitespace-nowrap ${
                sortBy === sortOption.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {sortOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Ranking Table */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <HiChartBar className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">No Campus Found</h3>
          <p className="mt-1 text-sm text-slate-500">No branch matches the search filter.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/50">
                <tr>
                  <th className="px-3 py-3.5">Rank</th>
                  <th className="px-3 py-3.5">Campus / Branch</th>
                  <th className="px-3 py-3.5 text-center">Students</th>
                  <th className="px-3 py-3.5 text-right">Gross Revenue</th>
                  <th className="px-3 py-3.5 text-right">Expenses</th>
                  <th className="px-3 py-3.5 text-right">Net Margin</th>
                  <th className="px-3 py-3.5 text-center">Leads Conv.</th>
                  <th className="px-3 py-3.5 text-center">Active Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAndSorted.map((b, idx) => {
                  const rank = getRankBadge(idx);
                  const isMarginPositive = b.netMargin >= 0;

                  return (
                    <tr
                      key={b._id}
                      className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                    >
                      {/* Rank Badge */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-black border ${rank.bg}`}
                        >
                          {rank.label}
                        </span>
                      </td>

                      {/* Campus Details */}
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2.5">
                          {b.logo ? (
                            <img
                              src={b.logo}
                              alt={b.name}
                              className="h-9 w-9 shrink-0 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.nextSibling) {
                                  e.currentTarget.nextSibling.style.display = 'flex';
                                }
                              }}
                            />
                          ) : null}
                          <div
                            className="h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-black text-white shadow-sm shadow-blue-500/20"
                            style={{ display: b.logo ? 'none' : 'flex' }}
                          >
                            {b.code?.toUpperCase() || 'HQ'}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800 dark:text-white truncate">
                              {b.name}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate">
                              <HiLocationMarker className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{b.city || 'Headquarters'}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Students */}
                      <td className="px-3 py-3 text-center whitespace-nowrap">
                        <span className="font-black text-slate-800 dark:text-white">
                          {b.studentCount}
                        </span>
                      </td>

                      {/* Gross Revenue */}
                      <td className="px-3 py-3 text-right whitespace-nowrap">
                        <span className="font-black text-emerald-600">
                          ৳{(b.revenue || 0).toLocaleString()}
                        </span>
                      </td>

                      {/* Expenses */}
                      <td className="px-3 py-3 text-right whitespace-nowrap">
                        <span className="font-medium text-slate-500 dark:text-slate-400">
                          ৳{(b.expenses || 0).toLocaleString()}
                        </span>
                      </td>

                      {/* Net Margin */}
                      <td className="px-3 py-3 text-right whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 font-black ${
                            isMarginPositive ? 'text-purple-600' : 'text-rose-600'
                          }`}
                        >
                          {isMarginPositive ? (
                            <HiArrowSmUp className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <HiArrowSmDown className="h-4 w-4 text-rose-500" />
                          )}
                          ৳{(b.netMargin || 0).toLocaleString()}
                        </span>
                      </td>

                      {/* Counseling Conversion */}
                      <td className="px-3 py-3 text-center whitespace-nowrap">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-white">
                            {b.conversionRate}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {b.convertedLeads}/{b.totalLeads} Leads
                          </span>
                        </div>
                      </td>

                      {/* Active Courses */}
                      <td className="px-3 py-3 text-center whitespace-nowrap">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {b.activeCourses} Courses
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
