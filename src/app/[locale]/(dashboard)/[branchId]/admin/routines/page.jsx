'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useRole } from '@/hooks/useRole';
import {
  HiCalendar,
  HiClock,
  HiOfficeBuilding,
  HiPlus,
  HiSearch,
  HiTrash,
  HiExclamation,
  HiUser,
  HiPrinter,
  HiVideoCamera,
  HiCheckCircle,
  HiFilter
} from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

const DAYS_OF_WEEK = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

const COMMON_ROOMS = [
  'Lab 1 (Desktop PCs)',
  'Lab 2 (Graphics/Mac)',
  'Theory Room 101',
  'Theory Room 102',
  'Conference Room',
  'Online Zoom'
];

export default function BranchRoutinesPage() {
  const { branchId } = useParams();
  const { isSuperAdmin, isBranchManager } = useRole();
  const canManage = isSuperAdmin || isBranchManager;

  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [activeDay, setActiveDay] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Conflict Alert
  const [showAddModal, setShowAddModal] = useState(false);
  const [conflictError, setConflictError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    batchName: '',
    course: '',
    trainer: '',
    dayOfWeek: 'Saturday',
    startTime: '10:00',
    endTime: '12:00',
    roomOrLab: 'Lab 1 (Desktop PCs)',
    meetingLink: '',
    notes: '',
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [schedRes, courseRes, staffRes] = await Promise.all([
        api.get('/routines', {
          params: {
            branchId,
            dayOfWeek: activeDay !== 'all' ? activeDay : undefined,
            roomOrLab: selectedRoom !== 'all' ? selectedRoom : undefined,
            trainer: selectedTrainer !== 'all' ? selectedTrainer : undefined,
            search: searchQuery || undefined,
          },
        }),
        api.get('/courses', { params: { limit: 100 } }).catch(() => ({ data: { data: [] } })),
        api.get('/users/branch-staff', { params: { branchId } }).catch(() => ({ data: { data: [] } })),
      ]);

      if (schedRes.data?.success) {
        setSchedules(schedRes.data.data || []);
        if (schedRes.data.rooms?.length) {
          setRooms([...new Set([...COMMON_ROOMS, ...schedRes.data.rooms])]);
        } else {
          setRooms(COMMON_ROOMS);
        }
      }
      setCourses(courseRes.data?.data || courseRes.data?.courses || []);
      setTrainers(staffRes.data?.data || []);
    } catch (err) {
      console.error('Failed to load routines:', err);
    } finally {
      setLoading(false);
    }
  }, [branchId, activeDay, selectedRoom, selectedTrainer, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    setConflictError(null);

    if (!formData.batchName || !formData.course || !formData.trainer || !formData.startTime || !formData.endTime) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/routines', {
        ...formData,
        branchId,
      });

      if (res.data?.success) {
        setShowAddModal(false);
        setFormData({
          batchName: '',
          course: '',
          trainer: '',
          dayOfWeek: 'Saturday',
          startTime: '10:00',
          endTime: '12:00',
          roomOrLab: 'Lab 1 (Desktop PCs)',
          meetingLink: '',
          notes: '',
        });
        fetchData();
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setConflictError(err.response.data?.message || 'Schedule conflict detected!');
      } else {
        alert(err.response?.data?.message || 'Failed to create schedule slot.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this class schedule slot?')) return;
    try {
      await api.delete(`/routines/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete schedule slot.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Group schedules by day for timetable view
  const schedulesByDay = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = schedules.filter((s) => s.dayOfWeek === day);
    return acc;
  }, {});

  const displayedDays = activeDay === 'all' ? DAYS_OF_WEEK : [activeDay];

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <HiCalendar size={24} />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Class Routines & Lab Schedule Matrix
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Weekly timetable with intelligent conflict detection for physical labs and trainers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition"
          >
            <HiPrinter size={18} />
            Print Timetable
          </button>

          {canManage && (
            <button
              onClick={() => {
                setConflictError(null);
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
            >
              <HiPlus size={18} />
              Add Class Slot
            </button>
          )}
        </div>
      </div>

      {/* ── Printable Header (Shows Only in Print Mode) ── */}
      <div className="hidden print:block text-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-black text-gray-900">Smart Youth ICT — Branch Weekly Class Routine</h2>
        <p className="text-sm text-gray-600">Official Class Timetable & Lab Slot Matrix</p>
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Day Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveDay('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeDay === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Days
            </button>
            {DAYS_OF_WEEK.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                  activeDay === d
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Room Filter */}
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="all">All Rooms / Labs</option>
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Trainer Filter */}
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="all">All Trainers</option>
              {trainers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative">
              <HiSearch className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search batch, room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg w-40 sm:w-48 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Weekly Timetable Matrix ── */}
      {loading ? (
        <div className="py-24 text-center text-sm text-gray-500 bg-white border rounded-xl">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading class routines...
        </div>
      ) : schedules.length === 0 ? (
        <div className="py-24 text-center text-sm text-gray-500 bg-white border rounded-xl">
          <HiCalendar className="mx-auto text-gray-300 mb-2" size={48} />
          No class schedule slots found matching the selected filters.
        </div>
      ) : (
        <div className="space-y-6">
          {displayedDays.map((day) => {
            const daySlots = schedulesByDay[day] || [];
            if (activeDay === 'all' && daySlots.length === 0) return null;

            return (
              <div key={day} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/40 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    {day}
                  </h3>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-100/60 px-2.5 py-0.5 rounded-full">
                    {daySlots.length} {daySlots.length === 1 ? 'Class' : 'Classes'}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {daySlots.length === 0 ? (
                    <div className="p-6 text-center text-xs text-gray-400">
                      No classes scheduled for {day}.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {daySlots.map((slot) => (
                        <div
                          key={slot._id}
                          className="border border-gray-200/90 hover:border-indigo-300 rounded-xl p-4 bg-white hover:shadow-md transition flex flex-col justify-between gap-3 group relative"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                <HiClock size={13} /> {slot.startTime} — {slot.endTime}
                              </span>
                              <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                <HiOfficeBuilding size={13} className="text-gray-400" />
                                {slot.roomOrLab}
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-gray-900 leading-snug">
                              {slot.batchName}
                            </h4>
                            <p className="text-xs text-gray-600 mt-0.5 font-medium">
                              {slot.course?.title}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1.5 font-medium text-gray-700">
                              <HiUser size={14} className="text-gray-400" />
                              {slot.trainer?.name || 'Assigned Trainer'}
                            </div>

                            <div className="flex items-center gap-1.5">
                              {slot.meetingLink && (
                                <a
                                  href={slot.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-md"
                                >
                                  <HiVideoCamera size={13} /> Zoom
                                </a>
                              )}
                              {canManage && (
                                <button
                                  onClick={() => handleDelete(slot._id)}
                                  title="Delete Slot"
                                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-rose-600 rounded transition"
                                >
                                  <HiTrash size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Add Class Schedule Modal ── */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="text-lg font-bold text-gray-900">Add Class Schedule Slot</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              {/* Conflict Warning Alert */}
              {conflictError && (
                <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-start gap-2">
                  <HiExclamation size={20} className="shrink-0 text-rose-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Collision Warning!</div>
                    <p className="font-normal mt-0.5">{conflictError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleCreateSchedule} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Batch Name / Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Batch 42 - Web Development"
                    value={formData.batchName}
                    onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Course Track *
                    </label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="">Select Course</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Instructor / Trainer *
                    </label>
                    <select
                      required
                      value={formData.trainer}
                      onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="">Select Trainer</option>
                      {trainers.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name} ({t.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Day of Week *
                    </label>
                    <select
                      value={formData.dayOfWeek}
                      onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      {DAYS_OF_WEEK.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Start Time (24h) *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      End Time (24h) *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Classroom / Lab *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lab 1"
                      list="roomSuggestions"
                      value={formData.roomOrLab}
                      onChange={(e) => setFormData({ ...formData, roomOrLab: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <datalist id="roomSuggestions">
                      {COMMON_ROOMS.map((r) => (
                        <option key={r} value={r} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Zoom / Online Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://zoom.us/j/..."
                      value={formData.meetingLink}
                      onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Notes / Equipment Needed (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Projector needed, bring external mouse..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
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
                    disabled={submitting}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {submitting ? 'Checking Conflicts...' : 'Save Class Slot'}
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
