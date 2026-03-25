'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoPersonOutline, IoCallOutline, IoMailOutline,
  IoCheckmarkCircle, IoCloseCircle, IoCalendarOutline,
  IoSearch, IoRefreshOutline
} from 'react-icons/io5';
import { HiOutlineAcademicCap as Cap } from 'react-icons/hi';

const ATTENDANCE_COLORS = {
  registered: 'bg-blue-100 text-blue-700',
  attended:   'bg-emerald-100 text-emerald-700',
  absent:     'bg-red-100 text-red-700',
};

export default function AdminSeminarsPage() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [acting, setActing]   = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/seminars/registrations', { params: { limit: 100 } });
      setItems(res.data?.data || []);
    } catch { toast.error('Failed to load registrations.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const markAttendance = async (id, status) => {
    setActing(id);
    try {
      await api.patch(`/seminars/registrations/${id}`, { attendanceStatus: status });
      setItems(prev => prev.map(r => r._id === id ? { ...r, attendanceStatus: status } : r));
      toast.success(`Marked as ${status}.`);
    } catch { toast.error('Failed to update attendance.'); }
    finally { setActing(null); }
  };

  const filtered = items.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.phone?.includes(search) ||
    r.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-textPrimary flex items-center gap-3">
            <Cap className="text-cyan-500" /> Seminar Registrations
          </h1>
          <p className="text-textSecondary text-sm mt-1">Manage free seminar attendees and track attendance.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-textSecondary">{items.length} total registrations</span>
          <button onClick={fetchItems} className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-textPrimary transition">
            <IoRefreshOutline size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <IoSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSecondary" />
        <input type="text" placeholder="Search by name, phone or email…"
          className="input w-full pl-10 text-sm"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Registered', count: items.length,                                    color: 'text-blue-600',    bg: 'bg-blue-50'    },
          { label: 'Attended',   count: items.filter(r => r.attendanceStatus === 'attended').length,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Absent',     count: items.filter(r => r.attendanceStatus === 'absent').length,    color: 'text-red-600',     bg: 'bg-red-50'     },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-textSecondary mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {['Name', 'Contact', 'Seminar', 'Source', 'Date', 'Attendance', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-textSecondary uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {loading ? [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {[1,2,3,4,5,6,7].map(c => <td key={c} className="px-5 py-4"><div className="h-3 bg-neutral-200 rounded w-24" /></td>)}
                </tr>
              )) : filtered.length > 0 ? filtered.map((r, i) => (
                <motion.tr key={r._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-extrabold shrink-0">
                        {r.name?.[0] || 'U'}
                      </div>
                      <span className="font-semibold text-textPrimary">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="space-y-0.5">
                      <p className="flex items-center gap-1 text-xs text-textSecondary"><IoCallOutline size={11} /> {r.phone}</p>
                      {r.email && <p className="flex items-center gap-1 text-xs text-textSecondary"><IoMailOutline size={11} /> {r.email}</p>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-textSecondary text-xs max-w-[160px] truncate">{r.seminar}</td>
                  <td className="px-5 py-3.5 text-xs text-textSecondary">{r.source || '—'}</td>
                  <td className="px-5 py-3.5 text-xs text-textSecondary flex items-center gap-1">
                    <IoCalendarOutline size={11} /> {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${ATTENDANCE_COLORS[r.attendanceStatus] || ATTENDANCE_COLORS.registered}`}>
                      {r.attendanceStatus || 'registered'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => markAttendance(r._id, 'attended')} disabled={acting === r._id || r.attendanceStatus === 'attended'}
                        title="Mark Attended"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition disabled:opacity-40">
                        <IoCheckmarkCircle size={15} />
                      </button>
                      <button onClick={() => markAttendance(r._id, 'absent')} disabled={acting === r._id || r.attendanceStatus === 'absent'}
                        title="Mark Absent"
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-40">
                        <IoCloseCircle size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )) : (
                <tr><td colSpan={7} className="py-12 text-center text-textSecondary text-sm">No registrations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
