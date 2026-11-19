"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoVideocamOutline,
  IoPeopleOutline,
  IoSparklesOutline,
  IoAddOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoSearchOutline,
  IoRefreshOutline,
  IoCloseOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoStarOutline,
  IoStar,
  IoArrowForwardOutline,
  IoFilterOutline,
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoOpenOutline,
} from "react-icons/io5";

const MODE_BADGES = {
  offline: { label: "Campus Lab (Offline)", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  online: { label: "Live Online Stream", bg: "bg-purple-50 text-purple-700 border-purple-200" },
  hybrid: { label: "Hybrid (Campus + Online)", bg: "bg-cyan-50 text-cyan-700 border-cyan-200" },
};

const STATUS_BADGES = {
  upcoming: { label: "Upcoming", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  ongoing: { label: "Live Ongoing", bg: "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse" },
  completed: { label: "Completed", bg: "bg-slate-100 text-slate-700 border-slate-200" },
  cancelled: { label: "Cancelled", bg: "bg-rose-50 text-rose-700 border-rose-200" },
};

export default function SeminarCMSPage() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("seminars"); // 'seminars' | 'registrations'

  // Homepage Strip Setting
  const [stripVisible, setStripVisible] = useState(true);
  const [savingStrip, setSavingStrip] = useState(false);

  // Seminars List State
  const [seminars, setSeminars] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterMode, setFilterMode] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: "",
    description: "",
    branchId: "",
    date: "",
    time: "03:30 PM - 05:30 PM",
    venue: "Main Campus Seminar Hall & Lab",
    mode: "offline",
    meetingLink: "",
    speakerName: "",
    speakerDesignation: "Lead Technical Specialist",
    speakerOrg: "Smart Youth ICT",
    speakerAvatar: "",
    maxSeats: 50,
    banner: "",
    topics: "",
    status: "upcoming",
    isPublished: true,
    featured: false,
  });

  // Registrations Drawer State
  const [regDrawerOpen, setRegDrawerOpen] = useState(false);
  const [selectedSeminarForRegs, setSelectedSeminarForRegs] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [regFilterStatus, setRegFilterStatus] = useState("all");

  // 1. Fetch Homepage Strip Visibility Setting
  useEffect(() => {
    api
      .get("/cms/settings/seminarStripVisible")
      .then((res) => {
        setStripVisible(res.data?.data !== false);
      })
      .catch(() => setStripVisible(true));
  }, []);

  // 2. Fetch Branches
  useEffect(() => {
    api
      .get("/branches/public/list")
      .then((res) => {
        if (res.data?.success) setBranches(res.data.data || []);
      })
      .catch(() => {});
  }, []);

  // 3. Fetch Seminars
  const fetchSeminars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/seminars", { params: { limit: 100 } });
      setSeminars(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch seminars.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeminars();
  }, [fetchSeminars]);

  // Handle Strip Visibility Save
  const handleToggleStrip = async (val) => {
    setSavingStrip(true);
    try {
      await api.patch("/cms/settings/seminarStripVisible", {
        value: val,
        description: "Controls whether the Free Seminar strip is visible on the home page",
        category: "marketing",
      });
      setStripVisible(val);
      toast.success(
        val
          ? "✅ Homepage seminar strip is now VISIBLE"
          : "🙈 Homepage seminar strip is now HIDDEN"
      );
    } catch {
      toast.error("Failed to update strip setting.");
    } finally {
      setSavingStrip(false);
    }
  };

  // Open Create / Edit Modal
  const handleOpenModal = (seminar = null) => {
    if (seminar) {
      setEditingSeminar(seminar);
      setForm({
        title: seminar.title || "",
        description: seminar.description || "",
        branchId: seminar.branchId?._id || seminar.branchId || "",
        date: seminar.date || "",
        time: seminar.time || "03:30 PM - 05:30 PM",
        venue: seminar.venue || "Main Campus Seminar Hall & Lab",
        mode: seminar.mode || "offline",
        meetingLink: seminar.meetingLink || "",
        speakerName: seminar.speaker?.name || "",
        speakerDesignation: seminar.speaker?.designation || "Lead Technical Specialist",
        speakerOrg: seminar.speaker?.organization || "Smart Youth ICT",
        speakerAvatar: seminar.speaker?.avatar || "",
        maxSeats: seminar.maxSeats || 50,
        banner: seminar.banner || "",
        topics: Array.isArray(seminar.topics) ? seminar.topics.join(", ") : seminar.topics || "",
        status: seminar.status || "upcoming",
        isPublished: seminar.isPublished !== false,
        featured: Boolean(seminar.featured),
      });
    } else {
      setEditingSeminar(null);
      setForm({
        title: "",
        description: "",
        branchId: branches[0]?._id || "",
        date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        time: "03:30 PM - 05:30 PM",
        venue: "Main Campus Seminar Hall & Lab",
        mode: "offline",
        meetingLink: "",
        speakerName: "",
        speakerDesignation: "Lead Technical Specialist",
        speakerOrg: "Smart Youth ICT",
        speakerAvatar: "",
        maxSeats: 50,
        banner: "",
        topics: "Career Roadmap, Hands-on Lab Demo, Marketplace Income",
        status: "upcoming",
        isPublished: true,
        featured: false,
      });
    }
    setModalOpen(true);
  };

  // Submit Seminar (Create or Update)
  const handleSubmitSeminar = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Please enter a seminar title.");
      return;
    }
    if (!form.branchId) {
      toast.error("Please select a hosting campus branch.");
      return;
    }
    if (!form.date) {
      toast.error("Please pick a scheduled date.");
      return;
    }

    setSubmitting(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      branchId: form.branchId,
      date: form.date,
      time: form.time,
      venue: form.venue,
      mode: form.mode,
      meetingLink: form.meetingLink,
      speaker: {
        name: form.speakerName,
        designation: form.speakerDesignation,
        organization: form.speakerOrg,
        avatar: form.speakerAvatar,
      },
      maxSeats: Number(form.maxSeats) || 50,
      banner: form.banner,
      topics: form.topics
        ? form.topics.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      status: form.status,
      isPublished: form.isPublished,
      featured: form.featured,
    };

    try {
      if (editingSeminar) {
        await api.patch(`/seminars/${editingSeminar._id}`, payload);
        toast.success("Seminar updated successfully!");
      } else {
        await api.post("/seminars", payload);
        toast.success("New seminar arranged & published!");
      }
      setModalOpen(false);
      fetchSeminars();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed. Please check inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Seminar
  const handleDeleteSeminar = async (id, title) => {
    if (!confirm(`Are you sure you want to permanently delete the seminar: "${title}"?`)) return;
    try {
      await api.delete(`/seminars/${id}`);
      toast.success("Seminar deleted.");
      setSeminars((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete seminar.");
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = async (seminar) => {
    const updatedVal = !seminar.featured;
    try {
      await api.patch(`/seminars/${seminar._id}`, { featured: updatedVal });
      setSeminars((prev) =>
        prev.map((s) => (s._id === seminar._id ? { ...s, featured: updatedVal } : s))
      );
      toast.success(updatedVal ? "Seminar pinned as Featured! ⭐" : "Featured status removed.");
    } catch {
      toast.error("Failed to update featured flag.");
    }
  };

  // Quick Status Change
  const handleQuickStatusChange = async (seminarId, newStatus) => {
    try {
      await api.patch(`/seminars/${seminarId}`, { status: newStatus });
      setSeminars((prev) =>
        prev.map((s) => (s._id === seminarId ? { ...s, status: newStatus } : s))
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  // Fetch Registrations for a Seminar
  const handleOpenRegistrations = async (seminar) => {
    setSelectedSeminarForRegs(seminar);
    setRegDrawerOpen(true);
    setLoadingRegs(true);
    try {
      const res = await api.get("/seminars/registrations", {
        params: { seminarId: seminar._id, limit: 200 },
      });
      setRegistrations(res.data?.data || []);
    } catch {
      toast.error("Failed to load attendees.");
    } finally {
      setLoadingRegs(false);
    }
  };

  // Mark Attendance
  const handleMarkAttendance = async (regId, status) => {
    try {
      await api.patch(`/seminars/registrations/${regId}`, {
        attendanceStatus: status,
      });
      setRegistrations((prev) =>
        prev.map((r) => (r._id === regId ? { ...r, attendanceStatus: status } : r))
      );
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update attendance.");
    }
  };

  // Filtered Seminars
  const filteredSeminars = useMemo(() => {
    return seminars.filter((s) => {
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.speaker?.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.venue?.toLowerCase().includes(search.toLowerCase());

      const sBranchId = s.branchId?._id || s.branchId;
      const matchBranch = filterBranch === "all" || sBranchId === filterBranch;
      const matchMode = filterMode === "all" || s.mode === filterMode;
      const matchStatus = filterStatus === "all" || s.status === filterStatus;

      return matchSearch && matchBranch && matchMode && matchStatus;
    });
  }, [seminars, search, filterBranch, filterMode, filterStatus]);

  // Statistics
  const totalUpcoming = seminars.filter((s) => s.status === "upcoming").length;
  const totalCompleted = seminars.filter((s) => s.status === "completed").length;
  const totalRegistrationsSum = seminars.reduce((acc, s) => acc + (s.registeredCount || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto font-sans space-y-6">
      {/* ── Top Header & Navigation ────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
            <span>Dashboard</span>
            <span>›</span>
            <span>Content Management</span>
            <span>›</span>
            <span className="text-emerald-600">Seminars &amp; Events</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <IoCalendarOutline className="text-emerald-600" />
            <span>Campus Seminars &amp; Workshops</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Create, manage and schedule nationwide in-person campus lab sessions and live streaming career workshops.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href={`/${locale}/seminar`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <IoOpenOutline size={15} />
            <span>Public Page Preview</span>
          </Link>

          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all shadow-emerald-600/20"
          >
            <IoAddOutline size={18} />
            <span>Schedule New Seminar</span>
          </button>
        </div>
      </div>

      {/* ── Live Stats & Homepage Strip Toggle Banner ─────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Strip Toggle */}
        <div className="md:col-span-2 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <IoSparklesOutline size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Homepage Seminar Strip Banner
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {stripVisible
                  ? "Currently visible on the public homepage."
                  : "Currently hidden from the public homepage."}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleToggleStrip(!stripVisible)}
            disabled={savingStrip}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
              stripVisible
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-300 text-slate-700 hover:bg-slate-400"
            }`}
          >
            {savingStrip ? (
              <IoRefreshOutline className="animate-spin" size={14} />
            ) : stripVisible ? (
              <>
                <IoEyeOutline size={15} />
                <span>Visible</span>
              </>
            ) : (
              <>
                <IoEyeOffOutline size={15} />
                <span>Hidden</span>
              </>
            )}
          </button>
        </div>

        {/* Total Seminars */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Seminars</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{totalUpcoming}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
            <IoCalendarOutline size={20} />
          </div>
        </div>

        {/* Total Registrations */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Booked Seats</p>
            <p className="text-2xl font-black text-emerald-600 mt-0.5">{totalRegistrationsSum}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            <IoPeopleOutline size={20} />
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ───────────────────────────── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search seminar by title, speaker, or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Campus Branch */}
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 outline-none"
            >
              <option value="all">All Campuses</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name} ({b.city})
                </option>
              ))}
            </select>

            {/* Mode */}
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 outline-none"
            >
              <option value="all">All Modes</option>
              <option value="offline">In-Person Campus Lab</option>
              <option value="online">Live Online Stream</option>
              <option value="hybrid">Hybrid</option>
            </select>

            {/* Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setFilterBranch("all");
                setFilterMode("all");
                setFilterStatus("all");
              }}
              title="Reset Filters"
              className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <IoRefreshOutline size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Seminars Grid Display ───────────────────────────────── */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent animate-spin rounded-full mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Seminars Database...</p>
        </div>
      ) : filteredSeminars.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-md mx-auto">
          <IoCalendarOutline size={36} className="text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700">No seminars match your filter criteria.</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">You can arrange a new free career seminar in any campus.</p>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-700"
          >
            Create Seminar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSeminars.map((seminar) => {
            const modeBadge = MODE_BADGES[seminar.mode] || MODE_BADGES.offline;
            const statusBadge = STATUS_BADGES[seminar.status] || STATUS_BADGES.upcoming;
            const branchName = seminar.branchId?.name || "Campus Branch";
            const percentFilled = Math.min(100, Math.round(((seminar.registeredCount || 0) / (seminar.maxSeats || 50)) * 100));

            return (
              <div
                key={seminar._id}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Banner Header */}
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    {seminar.banner ? (
                      <img
                        src={seminar.banner}
                        alt={seminar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-400 p-4 text-center">
                        <IoCalendarOutline size={32} className="text-emerald-400 mb-2" />
                        <span className="text-xs font-bold text-white tracking-wide">{seminar.title}</span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md border backdrop-blur-md ${modeBadge.bg}`}>
                        {modeBadge.label}
                      </span>

                      <button
                        onClick={() => handleToggleFeatured(seminar)}
                        title={seminar.featured ? "Featured on Hero" : "Pin as Featured"}
                        className={`p-1.5 rounded-lg backdrop-blur-md transition-all ${
                          seminar.featured
                            ? "bg-amber-400 text-slate-950 shadow-md"
                            : "bg-slate-900/60 text-white/70 hover:text-white"
                        }`}
                      >
                        {seminar.featured ? <IoStar size={14} /> : <IoStarOutline size={14} />}
                      </button>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-2.5 inset-x-3 text-white flex items-center justify-between text-xs z-10">
                      <span className="flex items-center gap-1 font-bold truncate">
                        <IoLocationOutline size={14} className="text-emerald-400 shrink-0" />
                        {branchName}
                      </span>
                      <span className="font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                        {seminar.date}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {seminar.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <IoTimeOutline className="text-emerald-600 shrink-0" size={15} />
                        <span>{seminar.time || "Schedule TBD"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoLocationOutline className="text-emerald-600 shrink-0" size={15} />
                        <span className="truncate">{seminar.venue}</span>
                      </div>
                    </div>

                    {/* Speaker Info */}
                    {seminar.speaker?.name && (
                      <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                        {seminar.speaker.avatar ? (
                          <img
                            src={seminar.speaker.avatar}
                            alt={seminar.speaker.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs">
                            {seminar.speaker.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{seminar.speaker.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{seminar.speaker.designation}</p>
                        </div>
                      </div>
                    )}

                    {/* Seat Progress */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                        <span>Booked: {seminar.registeredCount || 0} / {seminar.maxSeats}</span>
                        <span className={percentFilled >= 90 ? "text-rose-600 font-black" : "text-emerald-600"}>
                          {percentFilled}% full
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            percentFilled >= 90 ? "bg-rose-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Status Dropdown */}
                    <select
                      value={seminar.status}
                      onChange={(e) => handleQuickStatusChange(seminar._id, e.target.value)}
                      className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border outline-none cursor-pointer ${statusBadge.bg}`}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleOpenRegistrations(seminar)}
                      className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1"
                    >
                      <IoPeopleOutline size={12} />
                      <span>Attendees ({seminar.registeredCount || 0})</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenModal(seminar)}
                      title="Edit Seminar"
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <IoCreateOutline size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteSeminar(seminar._id, seminar.title)}
                      title="Delete Seminar"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <IoTrashOutline size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CREATE / EDIT SEMINAR MODAL ───────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <IoCalendarOutline size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      {editingSeminar ? "Edit Career Seminar" : "Schedule New Seminar"}
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Configure public seminar details, venue schedule and speaker info.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <IoCloseOutline size={20} />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSubmitSeminar} className="p-6 overflow-y-auto space-y-4 text-xs font-semibold">
                {/* Title */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Seminar Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Full-Stack Engineering & Freelance Blueprint 2026"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>

                {/* Branch & Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Hosting Campus Branch *</label>
                    <select
                      value={form.branchId}
                      onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    >
                      <option value="">Select Campus Branch</option>
                      {branches.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.name} ({b.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Event Mode</label>
                    <select
                      value={form.mode}
                      onChange={(e) => setForm({ ...form, mode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    >
                      <option value="offline">🏢 In-Person Campus Lab</option>
                      <option value="online">🌐 Live Online Stream</option>
                      <option value="hybrid">⚡ Hybrid (Campus + Online)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Time Range</label>
                    <input
                      type="text"
                      placeholder="e.g. 03:30 PM - 05:30 PM"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Venue & Meeting Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Venue / Lab Room</label>
                    <input
                      type="text"
                      placeholder="e.g. Main Auditorium, 4th Floor"
                      value={form.venue}
                      onChange={(e) => setForm({ ...form, venue: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Online Stream Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://meet.google.com/xyz"
                      value={form.meetingLink}
                      onChange={(e) => setForm({ ...form, meetingLink: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    />
                  </div>
                </div>

                {/* ── Banner Image Upload ── */}
                <div className="pt-2 border-t border-slate-100">
                  <ImageUpload
                    label="Seminar Cover Banner"
                    value={form.banner}
                    onChange={(url) => setForm((prev) => ({ ...prev, banner: url }))}
                    aspect="banner"
                  />
                </div>

                {/* ── Speaker Information ── */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-black">
                    <IoPersonOutline className="text-emerald-600" size={16} />
                    <span>Keynote Speaker Profile</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Speaker Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        value={form.speakerName}
                        onChange={(e) => setForm({ ...form, speakerName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Solution Architect"
                        value={form.speakerDesignation}
                        onChange={(e) => setForm({ ...form, speakerDesignation: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Smart Youth ICT"
                        value={form.speakerOrg}
                        onChange={(e) => setForm({ ...form, speakerOrg: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Speaker Avatar Upload */}
                  <div>
                    <ImageUpload
                      label="Speaker Avatar / Photo"
                      value={form.speakerAvatar}
                      onChange={(url) => setForm((prev) => ({ ...prev, speakerAvatar: url }))}
                      aspect="square"
                    />
                  </div>
                </div>

                {/* Max Seats & Topics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Max Seat Capacity</label>
                    <input
                      type="number"
                      min="1"
                      value={form.maxSeats}
                      onChange={(e) => setForm({ ...form, maxSeats: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Key Topics (Comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Full-Stack Roadmap, AI Integration, Portfolio Building"
                      value={form.topics}
                      onChange={(e) => setForm({ ...form, topics: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Seminar Description &amp; Highlights</label>
                  <textarea
                    rows={3}
                    placeholder="Enter what participants will learn, roadmap details, certificate info..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  />
                </div>

                {/* Status & Featured Flags */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-xs font-bold text-slate-700">Pin as Featured Hero Event</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isPublished}
                        onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span className="text-xs font-bold text-slate-700">Publish to Website</span>
                    </label>
                  </div>

                  <div>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="upcoming">Status: Upcoming</option>
                      <option value="ongoing">Status: Ongoing</option>
                      <option value="completed">Status: Completed</option>
                      <option value="cancelled">Status: Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    {submitting ? "Saving..." : editingSeminar ? "Update Seminar" : "Publish Seminar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── REGISTRATIONS / ATTENDEES DRAWER ──────────────────── */}
      <AnimatePresence>
        {regDrawerOpen && (
          <div className="fixed inset-0 z-[310] flex justify-end bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Registered Attendees ({registrations.length})
                  </h2>
                  <p className="text-xs text-slate-500 truncate max-w-sm">
                    {selectedSeminarForRegs?.title || "Seminar Attendees"}
                  </p>
                </div>
                <button
                  onClick={() => setRegDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              {/* Drawer Filter */}
              <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Status</span>
                <select
                  value={regFilterStatus}
                  onChange={(e) => setRegFilterStatus(e.target.value)}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg text-slate-700 outline-none"
                >
                  <option value="all">All Registrations</option>
                  <option value="registered">Registered</option>
                  <option value="attended">Attended</option>
                  <option value="absent">Absent</option>
                </select>
              </div>

              {/* Drawer List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {loadingRegs ? (
                  <div className="py-20 text-center">
                    <IoRefreshOutline className="animate-spin text-emerald-600 mx-auto mb-2" size={28} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading attendee roster...</p>
                  </div>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <IoPeopleOutline size={36} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-bold">No students registered yet for this seminar.</p>
                  </div>
                ) : (
                  registrations
                    .filter((r) => regFilterStatus === "all" || r.attendanceStatus === regFilterStatus)
                    .map((reg) => (
                      <div
                        key={reg._id}
                        className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-2 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-black text-slate-900">{reg.name}</p>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                              reg.attendanceStatus === "attended"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : reg.attendanceStatus === "absent"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {reg.attendanceStatus || "registered"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1 font-mono">
                            <IoCallOutline size={12} className="text-slate-400" />
                            {reg.phone}
                          </span>
                          {reg.email && (
                            <span className="flex items-center gap-1">
                              <IoMailOutline size={12} className="text-slate-400" />
                              {reg.email}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
                            Source: {reg.source || "Website"}
                          </span>
                        </div>

                        {/* Quick Attendance Changer */}
                        <div className="flex items-center justify-end gap-1.5 pt-1.5 border-t border-slate-100">
                          <button
                            onClick={() => handleMarkAttendance(reg._id, "attended")}
                            className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold border border-emerald-200"
                          >
                            Mark Attended
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(reg._id, "absent")}
                            className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-bold border border-rose-200"
                          >
                            Mark Absent
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
