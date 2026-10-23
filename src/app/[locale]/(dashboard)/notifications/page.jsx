"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  HiBell,
  HiAcademicCap,
  HiOfficeBuilding,
  HiCreditCard,
  HiCog,
  HiShieldCheck,
  HiCheckCircle,
  HiTrash,
  HiSearch,
  HiExternalLink,
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
  HiVolumeUp,
  HiVolumeOff,
  HiRefresh,
  HiSparkles,
} from "react-icons/hi";
import api from "@/lib/api";
import { playNotificationChime } from "@/utils/notificationSound";

const CATEGORIES = [
  { id: "all", label: "All Categories", icon: HiBell },
  { id: "academic", label: "Academic", icon: HiAcademicCap },
  { id: "administrative", label: "Administrative", icon: HiOfficeBuilding },
  { id: "financial", label: "Financial", icon: HiCreditCard },
  { id: "system", label: "System", icon: HiCog },
  { id: "security", label: "Security", icon: HiShieldCheck },
];

export default function NotificationsHubPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const { data: session } = useSession();
  const user = session?.user;

  const isSuperAdmin = user?.role === "super_admin" || user?.role === "super_management";

  const [notifications, setNotifications] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Sound preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMuted(localStorage.getItem("syict_notif_sound_muted") === "true");
    }
  }, []);

  const toggleSound = () => {
    const nextVal = !isMuted;
    setIsMuted(nextVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("syict_notif_sound_muted", String(nextVal));
    }
    if (!nextVal) playNotificationChime("normal");
  };

  // Fetch branches for Super Admin filter
  useEffect(() => {
    if (isSuperAdmin) {
      api
        .get("/branches/public/list")
        .then((res) => {
          if (res.data?.success) setBranches(res.data.data || []);
        })
        .catch(() => {});
    }
  }, [isSuperAdmin]);

  // Load notifications from API
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const qParams = {
        page,
        limit,
      };
      if (selectedCategory !== "all") qParams.category = selectedCategory;
      if (unreadOnly) qParams.unreadOnly = "true";
      if (isSuperAdmin && selectedBranch !== "all") {
        qParams.branchId = selectedBranch;
      }

      const res = await api.get("/notifications", { params: qParams });
      if (res.data?.success) {
        setNotifications(res.data.data || []);
        setTotalCount(res.data.total || 0);
        setTotalPages(res.data.totalPages || res.data.pages || 1);
      }
    } catch (err) {
      console.error("[NotificationsHub] fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, selectedCategory, unreadOnly, isSuperAdmin, selectedBranch]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Real-time inbound listener with deduplication
  useEffect(() => {
    const handleNew = (e) => {
      const notif = e.detail;
      if (!notif) return;
      setNotifications((prev) => {
        const exists = prev.some((n) => n._id === notif._id || n._id === notif.id);
        if (exists) return prev;
        return [{ ...notif, isRead: false }, ...prev];
      });
      setTotalCount((c) => c + 1);
    };

    window.addEventListener("notificationReceived", handleNew);
    return () => {
      window.removeEventListener("notificationReceived", handleNew);
    };
  }, []);

  // Filter by local search term
  const filteredNotifications = useMemo(() => {
    if (!search.trim()) return notifications;
    const q = search.toLowerCase();
    return notifications.filter(
      (n) =>
        n.title?.toLowerCase().includes(q) ||
        n.message?.toLowerCase().includes(q) ||
        n.metadata?.branchName?.toLowerCase().includes(q)
    );
  }, [notifications, search]);

  // Mark single as read
  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      window.dispatchEvent(new CustomEvent("notificationsMarkedRead"));
      await api.patch(`/notifications/${id}/read`);
    } catch (err) {
      console.error("[Mark Read Error]", err.message);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      window.dispatchEvent(
        new CustomEvent("notificationsMarkedRead", { detail: { unreadCount: 0 } })
      );
      await api.patch("/notifications/mark-all-read");
    } catch (err) {
      console.error("[Mark All Read Error]", err.message);
    }
  };

  // Clear read notifications
  const handleClearRead = async () => {
    try {
      setNotifications((prev) => prev.filter((n) => !n.isRead));
      window.dispatchEvent(new CustomEvent("notificationsMarkedRead"));
      await api.delete("/notifications/clear-read");
      fetchNotifications();
    } catch (err) {
      console.error("[Clear Read Error]", err.message);
    }
  };

  // Navigate to deep-link with intelligent routing
  const handleItemClick = async (notif) => {
    if (!notif.isRead) {
      await handleMarkAsRead(notif._id);
    }
    if (notif.link) {
      let link = notif.link.trim();

      if (link === "/notices") {
        if (user?.role === "student") link = "/student/notices";
        else if (["branch_admin", "branch_management"].includes(user?.role)) link = "/admin/notices";
        else link = "/notifications";
      } else if (link === "/student/dashboard") {
        link = "/student";
      } else if (link === "/student/schedules") {
        link = "/student/routine";
      } else if (link === "/admin/class-schedule") {
        link = "/admin/routines";
      } else if (link === "/admin/finance") {
        link = "/admin/payments";
      } else if (link === "/instructor/assignments") {
        link = "/instructor/submissions";
      } else if (link === "/instructor/schedule") {
        link = "/instructor/courses";
      }

      const isGlobal =
        link.startsWith("/super") ||
        link.startsWith("/notifications") ||
        link.startsWith("/profile") ||
        link.startsWith("/help");

      const bId = params?.branchId || user?.branchId || user?.branch || notif.metadata?.branchId;
      if (!isGlobal && bId && !link.startsWith(`/${bId}`)) {
        link = `/${bId}${link.startsWith("/") ? link : "/" + link}`;
      }
      if (!link.startsWith(`/${locale}`)) {
        link = `/${locale}${link.startsWith("/") ? link : "/" + link}`;
      }
      router.push(link);
    }
  };

  // Count summaries
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const academicCount = notifications.filter((n) => n.category === "academic").length;
  const financialCount = notifications.filter((n) => n.category === "financial").length;

  return (
    <div className="w-full space-y-4 pb-6">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs relative">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5 leading-normal">
                <HiSparkles size={13} />
                Live Notification Center
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium leading-normal">
                Multi-Tenant Real-time Gateway
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Enterprise Notification Hub
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5 max-w-2xl leading-normal">
              Consolidated command feed for campus announcements, student submissions, class routines, tuition receipts, and system alerts.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={toggleSound}
              className={`px-2.5 py-1.5 rounded-lg border transition flex items-center gap-1.5 text-xs font-semibold leading-normal ${
                isMuted
                  ? "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
              title={isMuted ? "Unmute chimes" : "Mute chimes"}
            >
              {isMuted ? <HiVolumeOff size={15} /> : <HiVolumeUp size={15} />}
              <span>{isMuted ? "Sound Off" : "Sound On"}</span>
            </button>

            <button
              type="button"
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-xs leading-normal"
            >
              <HiCheckCircle size={15} />
              <span>Mark All Read</span>
            </button>

            <button
              type="button"
              onClick={handleClearRead}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 text-xs font-medium transition flex items-center gap-1.5 leading-normal"
              title="Remove read notifications"
            >
              <HiTrash size={14} />
              <span>Clear Read</span>
            </button>

            <button
              type="button"
              onClick={fetchNotifications}
              className="p-1.5 rounded-lg bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 text-xs transition"
              title="Refresh"
            >
              <HiRefresh size={15} />
            </button>
          </div>
        </div>

        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3.5 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-xs font-medium text-slate-500 block leading-normal">Total Alerts</span>
            <span className="text-2xl font-bold text-slate-900 mt-0.5 block leading-tight">{totalCount}</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-xs font-semibold text-blue-700 block leading-normal">Unread Priority</span>
            <span className="text-2xl font-bold text-blue-700 mt-0.5 block leading-tight">{unreadCount}</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <span className="text-xs font-semibold text-indigo-700 block leading-normal">Academic Notices</span>
            <span className="text-2xl font-bold text-indigo-700 mt-0.5 block leading-tight">{academicCount}</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-xs font-semibold text-emerald-700 block leading-normal">Financial Records</span>
            <span className="text-2xl font-bold text-emerald-700 mt-0.5 block leading-tight">{financialCount}</span>
          </div>
        </div>
      </div>

      {/* Filter & Controls Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-2.5 text-slate-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications by title, details, or campus..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition leading-normal"
            />
          </div>

          {/* Super Admin Campus Dropdown */}
          {isSuperAdmin && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap leading-normal">
                Campus:
              </span>
              <select
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none leading-normal"
              >
                <option value="all">🌐 All Campuses (Global HQ)</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    📍 {b.name} ({b.code || "Branch"})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Unread Only Toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 select-none transition leading-normal">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => {
                setUnreadOnly(e.target.checked);
                setPage(1);
              }}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="font-medium">Unread Only</span>
          </label>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pt-0.5 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setPage(1);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap leading-normal ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <Icon size={13} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-1.5">
        {loading ? (
          <div className="p-8 text-center text-slate-500 bg-white border border-slate-200 rounded-xl flex flex-col items-center gap-2">
            <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium leading-normal">Synchronizing notifications...</span>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-white border border-slate-200 rounded-xl flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-2xl">
              📭
            </div>
            <h3 className="text-base font-bold text-slate-800 leading-tight">No Notifications Found</h3>
            <p className="text-xs text-slate-500 max-w-md leading-normal">
              No notifications match your current category and campus filter. Real-time notifications will arrive here when activity occurs.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isUrgent = notif.priority === "urgent";
            const isHigh = notif.priority === "high";

            let catColor = "bg-slate-100 text-slate-700 border-slate-200";
            if (notif.category === "academic")
              catColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
            if (notif.category === "financial")
              catColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
            if (notif.category === "administrative")
              catColor = "bg-amber-50 text-amber-800 border-amber-200";
            if (notif.category === "security")
              catColor = "bg-rose-50 text-rose-700 border-rose-200";

            return (
              <div
                key={notif._id}
                onClick={() => handleItemClick(notif)}
                className={`group p-3 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  notif.isRead
                    ? "bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                    : "bg-blue-50/40 border-blue-200 hover:border-blue-300 text-slate-900 shadow-2xs"
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <div className="mt-1">
                    {!notif.isRead ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 block shadow-xs" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-200 block" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border leading-normal ${catColor}`}
                      >
                        {notif.category}
                      </span>

                      {(isUrgent || isHigh) && (
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded border leading-normal ${
                            isUrgent
                              ? "bg-rose-100 text-rose-800 border-rose-300"
                              : "bg-amber-100 text-amber-800 border-amber-300"
                          }`}
                        >
                          {notif.priority}
                        </span>
                      )}

                      {notif.metadata?.branchName && (
                        <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 leading-normal">
                          📍 {notif.metadata.branchName}
                        </span>
                      )}

                      {notif.metadata?.actorName && (
                        <span className="text-[10px] text-slate-500 leading-normal">
                          By: {notif.metadata.actorName}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-sm font-bold leading-snug ${
                        notif.isRead ? "text-slate-800" : "text-slate-900"
                      }`}
                    >
                      {notif.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>

                {/* Right Metadata & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-1.5 text-xs shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-[11px] text-slate-400 whitespace-nowrap leading-normal">
                    {notif.createdAt
                      ? new Date(notif.createdAt).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {notif.link && (
                      <span className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold text-xs leading-normal">
                        Open Action <HiExternalLink size={13} />
                      </span>
                    )}

                    {!notif.isRead && (
                      <button
                        type="button"
                        onClick={(e) => handleMarkAsRead(notif._id, e)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-[11px] font-medium transition flex items-center gap-1 leading-normal"
                        title="Mark as read"
                      >
                        <HiCheck size={12} />
                        <span>Read</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 shadow-xs leading-normal">
          <span>
            Page {page} of {totalPages} ({totalCount} total)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <HiChevronLeft size={15} />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <HiChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
