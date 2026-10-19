'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useRole } from '@/hooks/useRole';
import {
  HiUsers,
  HiCalendar,
  HiCheckCircle,
  HiClock,
  HiPhone,
  HiMail,
  HiPlus,
  HiSearch,
  HiChatAlt2,
  HiTrash,
  HiAcademicCap,
  HiFilter,
  HiOfficeBuilding,
  HiVideoCamera
} from 'react-icons/hi';
import { IoCloseOutline, IoCheckmarkCircle } from 'react-icons/io5';

const STATUS_CONFIG = {
  booked: { label: 'Booked / Scheduled', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  attended: { label: 'Attended Session', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
  'follow-up': { label: 'In Follow-up', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  enrolled: { label: 'Enrolled 🎉', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function BranchCounselingPage() {
  const { branchId } = useParams();
  const { isSuperAdmin, isBranchManager } = useRole();

  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeNotesSession, setActiveNotesSession] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);

  // Manual Add Lead Form
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    interestedCourse: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredSlot: '11:00 AM - 12:00 PM',
    mode: 'in-person',
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [sessRes, courseRes] = await Promise.all([
        api.get('/counseling', {
          params: {
            branchId,
            status: statusFilter !== 'all' ? statusFilter : undefined,
            mode: modeFilter !== 'all' ? modeFilter : undefined,
            search: searchQuery || undefined,
          },
        }),
        api.get('/courses', { params: { limit: 100 } }).catch(() => ({ data: { data: [] } })),
      ]);

      if (sessRes.data?.success) {
        setSessions(sessRes.data.data || []);
        setAnalytics(sessRes.data.analytics || null);
      }
      setCourses(courseRes.data?.data || courseRes.data?.courses || []);
    } catch (err) {
      console.error('Failed to fetch counseling sessions:', err);
    } finally {
      setLoading(false);
    }
  }, [branchId, statusFilter, modeFilter, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/counseling/${id}`, { status: newStatus });
      if (res.data?.success) {
        fetchData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update session status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeNotesSession) return;

    try {
      setSavingNote(true);
      const res = await api.post(`/counseling/${activeNotesSession._id}/notes`, {
        note: newNoteText.trim(),
      });
      if (res.data?.success) {
        setActiveNotesSession(res.data.data);
        setNewNoteText('');
        fetchData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save counseling note');
    } finally {
      setSavingNote(false);
    }
  };

  const handleManualLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.fullName || !leadForm.phone) return;

    try {
      setSubmittingLead(true);
      const res = await api.post('/counseling/book', {
        ...leadForm,
        branchId,
      });
      if (res.data?.success) {
        setShowAddModal(false);
        setLeadForm({
          fullName: '',
          phone: '',
          email: '',
          interestedCourse: '',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredSlot: '11:00 AM - 12:00 PM',
          mode: 'in-person',
        });
        fetchData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register counseling inquiry');
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this counseling inquiry?')) return;
    try {
      await api.delete(`/counseling/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete record');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <HiCalendar size={24} />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              1-on-1 Counseling & Walk-in Hub
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage student appointments, track counseling follow-ups, and convert leads into enrollments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 shadow-sm transition"
        >
          <HiPlus size={18} />
          Register Walk-in Inquirer
        </button>
      </div>

      {/* ── Conversion Metric Cards ── */}
      {analytics && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Total Inquiries
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{analytics.total}</div>
            <p className="text-[11px] text-gray-400 mt-0.5">Online & Walk-ins</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
              Scheduled / Booked
            </div>
            <div className="text-2xl font-extrabold text-blue-600">{analytics.counts.booked}</div>
            <p className="text-[11px] text-gray-400 mt-0.5">Upcoming appointments</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
              Attended / In Follow-up
            </div>
            <div className="text-2xl font-extrabold text-purple-600">
              {analytics.counts.attended + analytics.counts['follow-up']}
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">Counseled students</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
              Enrolled (Converted)
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">{analytics.counts.enrolled}</div>
            <p className="text-[11px] text-gray-400 mt-0.5">Successfully registered</p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-sm">
            <div className="text-xs font-semibold text-indigo-100 uppercase tracking-wider mb-1">
              Conversion Rate
            </div>
            <div className="text-2xl font-black">{analytics.conversionRate}%</div>
            <p className="text-[11px] text-indigo-200 mt-0.5">Appointment to Enrollment</p>
          </div>
        </div>
      )}

      {/* ── Filter Bar ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-lg">
            {['all', 'booked', 'attended', 'follow-up', 'enrolled', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition ${
                  statusFilter === st
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {st === 'all' ? 'All Leads' : st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Select */}
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="all">All Modes</option>
              <option value="in-person">In-Person (Branch Visit)</option>
              <option value="online">Online (Google Meet)</option>
            </select>

            {/* Search Input */}
            <div className="relative">
              <HiSearch className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg w-48 sm:w-56 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sessions Pipeline Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-sm text-gray-500">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading counseling sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="py-20 text-center text-sm text-gray-500">
            <HiUsers className="mx-auto text-gray-300 mb-2" size={44} />
            No counseling appointments found matching the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/80 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Inquirer Details</th>
                  <th className="px-5 py-3 font-semibold">Interested Course</th>
                  <th className="px-5 py-3 font-semibold">Date & Slot</th>
                  <th className="px-5 py-3 font-semibold">Mode</th>
                  <th className="px-5 py-3 font-semibold">Status Stage</th>
                  <th className="px-5 py-3 font-semibold">Counseling Notes</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sessions.map((item) => {
                  const statusConf = STATUS_CONFIG[item.status] || STATUS_CONFIG.booked;
                  return (
                    <tr key={item._id} className="hover:bg-gray-50/60 transition">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-gray-900">{item.fullName}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <span className="flex items-center gap-1 font-mono">
                            <HiPhone size={13} className="text-gray-400" />
                            {item.phone}
                          </span>
                          {item.email && (
                            <span className="flex items-center gap-1">
                              <HiMail size={13} className="text-gray-400" />
                              {item.email}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {item.interestedCourse ? (
                          <div className="text-xs font-semibold text-gray-800">
                            {item.interestedCourse.title}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">General Guidance</span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="text-xs font-semibold text-gray-900">
                          {new Date(item.preferredDate).toLocaleDateString()}
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">{item.preferredSlot}</div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                          {item.mode === 'in-person' ? (
                            <>
                              <HiOfficeBuilding size={14} className="text-indigo-600" /> Branch Visit
                            </>
                          ) : (
                            <>
                              <HiVideoCamera size={14} className="text-purple-600" /> Online Meet
                            </>
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`text-xs font-semibold border rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer ${statusConf.bg}`}
                        >
                          <option value="booked">Booked</option>
                          <option value="attended">Attended</option>
                          <option value="follow-up">Follow-up</option>
                          <option value="enrolled">Enrolled 🎉</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <button
                          onClick={() => setActiveNotesSession(item)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg transition"
                        >
                          <HiChatAlt2 size={15} />
                          {item.counselorNotes?.length || 0} Notes
                        </button>
                      </td>

                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(item._id)}
                          title="Delete Session"
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        >
                          <HiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Counselor Notes Drawer / Modal ── */}
      <AnimatePresence>
        {activeNotesSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Counseling Notes: {activeNotesSession.fullName}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    Phone: {activeNotesSession.phone}
                  </p>
                </div>
                <button
                  onClick={() => setActiveNotesSession(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              {/* Notes History List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mb-4">
                {activeNotesSession.counselorNotes?.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-8">
                    No notes recorded yet. Add initial counseling summary below.
                  </p>
                ) : (
                  activeNotesSession.counselorNotes.map((n, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs">
                      <p className="text-gray-800 leading-relaxed">{n.note}</p>
                      <div className="text-[10px] text-gray-400 mt-1.5 flex items-center justify-between">
                        <span>By {n.author?.name || 'Counselor'}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Note Input */}
              <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-gray-100">
                <textarea
                  rows={2}
                  required
                  placeholder="Add counseling follow-up observation or next steps..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={savingNote}
                    className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {savingNote ? 'Saving...' : 'Add Note'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Manual Walk-in Inquirer Registration Modal ── */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <h3 className="text-lg font-bold text-gray-900">Register Walk-in Inquirer</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              <form onSubmit={handleManualLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={leadForm.fullName}
                      onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="tanvir@example.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Interested Course
                  </label>
                  <select
                    value={leadForm.interestedCourse}
                    onChange={(e) => setLeadForm({ ...leadForm, interestedCourse: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="">General Career Guidance</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={leadForm.preferredDate}
                      onChange={(e) => setLeadForm({ ...leadForm, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Time Slot *
                    </label>
                    <select
                      value={leadForm.preferredSlot}
                      onChange={(e) => setLeadForm({ ...leadForm, preferredSlot: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                      <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Counseling Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                        leadForm.mode === 'in-person'
                          ? 'border-purple-600 bg-purple-50 text-purple-900'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        value="in-person"
                        checked={leadForm.mode === 'in-person'}
                        onChange={() => setLeadForm({ ...leadForm, mode: 'in-person' })}
                        className="hidden"
                      />
                      <HiOfficeBuilding size={16} />
                      Branch Visit
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition ${
                        leadForm.mode === 'online'
                          ? 'border-purple-600 bg-purple-50 text-purple-900'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        value="online"
                        checked={leadForm.mode === 'online'}
                        onChange={() => setLeadForm({ ...leadForm, mode: 'online' })}
                        className="hidden"
                      />
                      <HiVideoCamera size={16} />
                      Online Meet
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingLead}
                    className="px-5 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {submittingLead ? 'Registering...' : 'Register Inquirer'}
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
