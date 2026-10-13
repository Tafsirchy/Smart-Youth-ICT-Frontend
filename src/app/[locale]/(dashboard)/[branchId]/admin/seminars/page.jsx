'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoSearch,
  IoRefreshOutline,
  IoAddOutline,
  IoTrashOutline,
  IoCreateOutline,
  IoVideocamOutline,
  IoPeopleOutline,
  IoSparklesOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import { HiOutlineAcademicCap as Cap } from 'react-icons/hi';
import { usePermissionGuard } from '@/hooks/usePermissionGuard';
import AccessDenied from '@/components/ui/AccessDenied';
import Portal from '@/components/ui/Portal';

const ATTENDANCE_COLORS = {
  registered: 'bg-blue-100 text-blue-700 border-blue-200',
  attended: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  absent: 'bg-red-100 text-red-700 border-red-200',
};

const STATUS_BADGES = {
  upcoming: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  ongoing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-slate-100 text-slate-700 border-slate-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

const MODE_BADGES = {
  offline: 'bg-amber-50 text-amber-700 border-amber-200',
  online: 'bg-purple-50 text-purple-700 border-purple-200',
  hybrid: 'bg-cyan-50 text-cyan-700 border-cyan-200',
};

export default function AdminSeminarsPage() {
  const { isLoading: guardLoading, isDenied } = usePermissionGuard(['seminars:view', 'seminars:manage']);
  const { branchId } = useParams();

  const [activeTab, setActiveTab] = useState('seminars'); // 'seminars' | 'registrations'

  // Seminars state
  const [seminars, setSeminars] = useState([]);
  const [seminarsLoading, setSeminarsLoading] = useState(true);
  const [seminarModalOpen, setSeminarModalOpen] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState(null);
  const [seminarFilterStatus, setSeminarFilterStatus] = useState('all');

  // Registrations state
  const [registrations, setRegistrations] = useState([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);
  const [regSearch, setRegSearch] = useState('');
  const [selectedSeminarFilter, setSelectedSeminarFilter] = useState('all');
  const [actingRegId, setActingRegId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    mode: 'offline',
    meetingLink: '',
    speakerName: '',
    speakerDesignation: '',
    speakerOrg: 'Smart Youth ICT',
    maxSeats: 50,
    topics: '',
    status: 'upcoming',
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch Seminars for this branch
  const fetchSeminars = useCallback(async () => {
    setSeminarsLoading(true);
    try {
      const res = await api.get('/seminars', { params: { branchId, limit: 100 } });
      setSeminars(res.data?.data || []);
    } catch {
      toast.error('Failed to load branch seminars.');
    } finally {
      setSeminarsLoading(false);
    }
  }, [branchId]);

  // Fetch Registrations for this branch
  const fetchRegistrations = useCallback(async () => {
    setRegistrationsLoading(true);
    try {
      const res = await api.get('/seminars/registrations', { params: { branchId, limit: 200 } });
      setRegistrations(res.data?.data || []);
    } catch {
      toast.error('Failed to load registrations.');
    } finally {
      setRegistrationsLoading(false);
    }
  }, [branchId]);

  useEffect(() => {
    if (!guardLoading && !isDenied) {
      fetchSeminars();
      fetchRegistrations();
    }
  }, [guardLoading, isDenied, fetchSeminars, fetchRegistrations]);

  // Open modal to create seminar
  const handleOpenCreateModal = () => {
    setEditingSeminar(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '03:30 PM - 05:30 PM',
      venue: 'Main Campus Hall',
      mode: 'offline',
      meetingLink: '',
      speakerName: '',
      speakerDesignation: '',
      speakerOrg: 'Smart Youth ICT',
      maxSeats: 50,
      topics: '',
      status: 'upcoming',
    });
    setSeminarModalOpen(true);
  };

  // Open modal to edit seminar
  const handleOpenEditModal = (seminar) => {
    setEditingSeminar(seminar);
    setFormData({
      title: seminar.title || '',
      description: seminar.description || '',
      date: seminar.date || '',
      time: seminar.time || '',
      venue: seminar.venue || '',
      mode: seminar.mode || 'offline',
      meetingLink: seminar.meetingLink || '',
      speakerName: seminar.speaker?.name || '',
      speakerDesignation: seminar.speaker?.designation || '',
      speakerOrg: seminar.speaker?.organization || 'Smart Youth ICT',
      maxSeats: seminar.maxSeats || 50,
      topics: Array.isArray(seminar.topics) ? seminar.topics.join(', ') : '',
      status: seminar.status || 'upcoming',
    });
    setSeminarModalOpen(true);
  };

  // Submit seminar (Create or Update)
  const handleSubmitSeminar = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      toast.error('Title and Date are required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      mode: formData.mode,
      meetingLink: formData.meetingLink,
      speaker: {
        name: formData.speakerName,
        designation: formData.speakerDesignation,
        organization: formData.speakerOrg,
      },
      maxSeats: Number(formData.maxSeats) || 50,
      topics: formData.topics ? formData.topics.split(',').map((t) => t.trim()) : [],
      status: formData.status,
      branchId,
    };

    try {
      if (editingSeminar) {
        await api.patch(`/seminars/${editingSeminar._id}`, payload);
        toast.success('Seminar updated successfully!');
      } else {
        await api.post('/seminars', payload);
        toast.success('New seminar arranged successfully for this branch!');
      }
      setSeminarModalOpen(false);
      fetchSeminars();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save seminar.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Seminar
  const handleDeleteSeminar = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.delete(`/seminars/${id}`);
      toast.success('Seminar deleted successfully.');
      setSeminars((prev) => prev.filter((s) => s._id !== id));
    } catch {
      toast.error('Failed to delete seminar.');
    }
  };

  // Mark attendance status
  const markAttendance = async (id, status) => {
    setActingRegId(id);
    try {
      await api.patch(`/seminars/registrations/${id}`, { attendanceStatus: status });
      setRegistrations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, attendanceStatus: status, attended: status === 'attended' } : r))
      );
      toast.success(`Marked as ${status}.`);
    } catch {
      toast.error('Failed to update attendance.');
    } finally {
      setActingRegId(null);
    }
  };

  // Filtered Seminars
  const filteredSeminars = useMemo(() => {
    if (seminarFilterStatus === 'all') return seminars;
    return seminars.filter((s) => s.status === seminarFilterStatus);
  }, [seminars, seminarFilterStatus]);

  // Filtered Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const matchSearch =
        r.name?.toLowerCase().includes(regSearch.toLowerCase()) ||
        r.phone?.includes(regSearch) ||
        r.email?.toLowerCase().includes(regSearch.toLowerCase());

      const matchSeminar =
        selectedSeminarFilter === 'all' ||
        r.seminarId?._id === selectedSeminarFilter ||
        r.seminar === selectedSeminarFilter;

      return matchSearch && matchSeminar;
    });
  }, [registrations, regSearch, selectedSeminarFilter]);

  if (guardLoading) return null;
  if (isDenied) return <AccessDenied permission="seminars:view" moduleName="Seminars & Workshops" />;

  return (
    <div className="pb-14">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200">
              Branch Campus Portal
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs font-semibold text-slate-500">Local Events Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Cap className="text-cyan-600" size={34} />
            Branch Seminars & Workshops
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Arrange, schedule, and manage exclusive free career seminars for this branch campus, and track student attendance.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              fetchSeminars();
              fetchRegistrations();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition shadow-sm"
          >
            <IoRefreshOutline size={16} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-cyan-600/20 active:scale-95 transition"
          >
            <IoAddOutline size={18} />
            <span>Arrange New Seminar</span>
          </button>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex items-center border-b border-slate-200 mb-8 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('seminars')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition -mb-[1px] ${activeTab === 'seminars'
              ? 'border-cyan-600 text-cyan-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          <IoSparklesOutline size={18} />
          <span>Arranged Seminars</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'seminars' ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-100 text-slate-600'
              }`}
          >
            {seminars.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition -mb-[1px] ${activeTab === 'registrations'
              ? 'border-cyan-600 text-cyan-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          <IoPeopleOutline size={18} />
          <span>Registrations & Attendees</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'registrations' ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-100 text-slate-600'
              }`}
          >
            {registrations.length}
          </span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── TAB 1: ARRANGED SEMINARS ────────────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'seminars' && (
        <div className="space-y-6">
          {/* Status filter bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Filter:</span>
              {['all', 'upcoming', 'ongoing', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSeminarFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${seminarFilterStatus === st
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{filteredSeminars.length}</span> seminars arranged by this branch
            </p>
          </div>

          {/* Seminars Grid */}
          {seminarsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  <div className="h-16 bg-slate-100 rounded"></div>
                  <div className="h-8 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredSeminars.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 shadow-sm space-y-4">
              <div className="w-16 h-16 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                🎓
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">No seminars arranged yet</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
                  Start arranging career seminars for students at this branch campus to boost admissions and engagement.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                <IoAddOutline size={18} />
                <span>Arrange First Seminar</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSeminars.map((s) => {
                const percent = Math.min(100, Math.round(((s.registeredCount || 0) / (s.maxSeats || 50)) * 100));

                return (
                  <motion.div
                    key={s._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-6 space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${STATUS_BADGES[s.status] || STATUS_BADGES.upcoming
                            }`}
                        >
                          {s.status}
                        </span>

                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border capitalize flex items-center gap-1 ${MODE_BADGES[s.mode] || MODE_BADGES.offline
                            }`}
                        >
                          {s.mode === 'online' ? <IoVideocamOutline size={13} /> : <IoLocationOutline size={13} />}
                          <span>{s.mode}</span>
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-cyan-700 transition line-clamp-2">
                          {s.title}
                        </h3>
                        {s.description && (
                          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">{s.description}</p>
                        )}
                      </div>

                      {/* Timing & Venue */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <IoCalendarOutline className="text-cyan-600 shrink-0" size={14} />
                          <span className="font-semibold text-slate-800">{s.date}</span>
                          {s.time && (
                            <>
                              <span className="text-slate-300">•</span>
                              <IoTimeOutline className="text-slate-400 shrink-0" size={14} />
                              <span>{s.time}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <IoLocationOutline className="text-rose-500 shrink-0" size={14} />
                          <span className="truncate">{s.venue || 'Branch Campus'}</span>
                        </div>

                        {s.speaker?.name && (
                          <div className="flex items-center gap-2 pt-1 text-slate-700">
                            <IoPersonOutline className="text-indigo-600 shrink-0" size={14} />
                            <span className="font-medium truncate">
                              Speaker: <strong>{s.speaker.name}</strong>{' '}
                              {s.speaker.designation ? `(${s.speaker.designation})` : ''}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Seats Progress */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-500">Seats Registered:</span>
                          <span className="text-slate-800 font-bold">
                            {s.registeredCount || 0} / {s.maxSeats || 50}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${percent >= 90 ? 'bg-rose-500' : percent >= 60 ? 'bg-amber-500' : 'bg-cyan-500'
                              }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action bar */}
                    <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSeminarFilter(s._id);
                          setActiveTab('registrations');
                        }}
                        className="text-xs font-bold text-cyan-700 hover:text-cyan-800 hover:underline flex items-center gap-1"
                      >
                        <IoPeopleOutline size={14} />
                        <span>View Attendees ({s.registeredCount || 0})</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(s)}
                          className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit Seminar"
                        >
                          <IoCreateOutline size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSeminar(s._id, s.title)}
                          className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Seminar"
                        >
                          <IoTrashOutline size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── TAB 2: REGISTRATIONS & ATTENDEES ────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
          {/* Summary counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Total Registered',
                count: registrations.length,
                color: 'text-blue-700',
                bg: 'bg-blue-50 border-blue-200',
              },
              {
                label: 'Attended (উপস্থিত)',
                count: registrations.filter((r) => r.attendanceStatus === 'attended').length,
                color: 'text-emerald-700',
                bg: 'bg-emerald-50 border-emerald-200',
              },
              {
                label: 'Absent (অনুপস্থিত)',
                count: registrations.filter((r) => r.attendanceStatus === 'absent').length,
                color: 'text-red-700',
                bg: 'bg-red-50 border-red-200',
              },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} p-5 rounded-2xl border shadow-sm text-center`}>
                <p className={`text-3xl font-black ${s.color}`}>{s.count}</p>
                <p className="text-xs font-semibold text-slate-600 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <IoSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, email…"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white transition"
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                />
              </div>

              {/* Seminar Dropdown Filter */}
              <div className="w-full sm:w-auto">
                <select
                  value={selectedSeminarFilter}
                  onChange={(e) => setSelectedSeminarFilter(e.target.value)}
                  className="w-full sm:w-60 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-cyan-600"
                >
                  <option value="all">All Seminars</option>
                  {seminars.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium shrink-0">
              Found <span className="font-bold text-slate-900">{filteredRegistrations.length}</span> attendees
            </p>
          </div>

          {/* Attendees Table */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Student / Attendee</th>
                    <th className="px-5 py-3.5">Contact Details</th>
                    <th className="px-5 py-3.5">Seminar Event</th>
                    <th className="px-5 py-3.5">Source</th>
                    <th className="px-5 py-3.5">Date Registered</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {registrationsLoading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={7} className="px-5 py-4">
                          <div className="h-4 bg-slate-100 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                        No registrations found for this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((r, i) => (
                      <motion.tr
                        key={r._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        {/* Name */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
                              {r.name?.[0] || 'A'}
                            </div>
                            <span className="font-bold text-slate-900">{r.name}</span>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-5 py-3.5 space-y-0.5">
                          <p className="flex items-center gap-1 text-slate-700 font-medium">
                            <IoCallOutline size={12} className="text-cyan-600 shrink-0" />
                            <span>{r.phone}</span>
                          </p>
                          {r.email && (
                            <p className="flex items-center gap-1 text-slate-500 text-[11px]">
                              <IoMailOutline size={12} className="text-slate-400 shrink-0" />
                              <span>{r.email}</span>
                            </p>
                          )}
                        </td>

                        {/* Seminar */}
                        <td className="px-5 py-3.5 max-w-[200px]">
                          <p className="font-semibold text-slate-800 truncate">
                            {r.seminarId?.title || r.seminar || 'Career Seminar'}
                          </p>
                          {r.seminarId?.date && (
                            <p className="text-[10px] text-slate-400">{r.seminarId.date}</p>
                          )}
                        </td>

                        {/* Source */}
                        <td className="px-5 py-3.5 text-slate-600">{r.source || 'Website'}</td>

                        {/* Date */}
                        <td className="px-5 py-3.5 text-slate-600">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${ATTENDANCE_COLORS[r.attendanceStatus] || ATTENDANCE_COLORS.registered
                              }`}
                          >
                            {r.attendanceStatus || 'registered'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => markAttendance(r._id, 'attended')}
                              disabled={actingRegId === r._id || r.attendanceStatus === 'attended'}
                              title="Mark Attended"
                              className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition disabled:opacity-40"
                            >
                              <IoCheckmarkCircle size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => markAttendance(r._id, 'absent')}
                              disabled={actingRegId === r._id || r.attendanceStatus === 'absent'}
                              title="Mark Absent"
                              className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg border border-rose-200 transition disabled:opacity-40"
                            >
                              <IoCloseCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── MODAL: ARRANGE / EDIT SEMINAR ───────────────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {seminarModalOpen && (
        <Portal>
          <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold flex items-center gap-2 !text-white text-white">
                    <Cap className="text-cyan-400" size={22} />
                    <span className="!text-white text-white font-bold">{editingSeminar ? 'Edit Branch Seminar' : 'Arrange New Seminar for this Branch'}</span>
                  </h2>
                  <p className="!text-slate-300 text-slate-300 text-xs mt-0.5">
                    This seminar will be hosted and managed by your active branch campus.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSeminarModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmitSeminar} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Seminar Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masterclass: Web Development & Freelancing Roadmap"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Description / Key Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Outline the main takeaways, who should attend, and prerequisites..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 03:30 PM - 05:30 PM"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                {/* Mode & Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Seminar Mode
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    >
                      <option value="offline">Offline (Campus In-Person)</option>
                      <option value="online">Online (Google Meet / Zoom)</option>
                      <option value="hybrid">Hybrid (Both Offline & Online)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Venue / Room
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lab 01 / Campus Seminar Room"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    />
                  </div>
                </div>

                {/* Meeting Link (if online/hybrid) */}
                {formData.mode !== 'offline' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Meeting Link (Google Meet / Zoom)
                    </label>
                    <input
                      type="url"
                      placeholder="https://meet.google.com/xyz-abc-def"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                      value={formData.meetingLink}
                      onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                    />
                  </div>
                )}

                {/* Speaker Information */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <IoPersonOutline className="text-cyan-600" />
                    <span>Speaker / Host Details</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Speaker Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600"
                        value={formData.speakerName}
                        onChange={(e) => setFormData({ ...formData, speakerName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Lead Full-Stack Engineer"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600"
                        value={formData.speakerDesignation}
                        onChange={(e) => setFormData({ ...formData, speakerDesignation: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Max Seats & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Max Seats Capacity
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                      value={formData.maxSeats}
                      onChange={(e) => setFormData({ ...formData, maxSeats: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Seminar Status
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="upcoming">Upcoming (আসন্ন)</option>
                      <option value="ongoing">Ongoing (চলমান)</option>
                      <option value="completed">Completed (সম্পন্ন)</option>
                      <option value="cancelled">Cancelled (বাতিল)</option>
                    </select>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Topics (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Next.js, Fiverr, Upwork Portfolio"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-cyan-600 transition"
                    value={formData.topics}
                    onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSeminarModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : editingSeminar ? 'Update Seminar' : 'Arrange Seminar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </Portal>
      )}
    </div>
  );
}
