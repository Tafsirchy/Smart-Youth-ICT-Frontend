"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  HiX,
  HiCheck,
  HiCheckCircle,
  HiTrash,
  HiVolumeUp,
  HiVolumeOff,
  HiExternalLink,
  HiAcademicCap,
  HiOfficeBuilding,
  HiCreditCard,
  HiCog,
  HiShieldCheck,
  HiBell,
  HiFilter,
} from "react-icons/hi";
import api from "@/lib/api";
import { playNotificationChime } from "@/utils/notificationSound";

const CATEGORY_TABS = [
  { id: "all", label: "All", icon: HiBell },
  { id: "academic", label: "Academic", icon: HiAcademicCap },
  { id: "administrative", label: "Admin", icon: HiOfficeBuilding },
  { id: "financial", label: "Finance", icon: HiCreditCard },
  { id: "system", label: "System", icon: HiCog },
];

export default function NotificationDrawer({ isOpen, onClose, user, onUnreadCountChange }) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [branches, setBranches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const drawerRef = useRef(null);

  const isSuperAdmin = user?.role === "super_admin" || user?.role === "super_management";

  // Initialize sound mute preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMuted(localStorage.getItem("syict_notif_sound_muted") === "true");
    }
  }, []);

  const toggleSoundMute = () => {
    const nextVal = !isMuted;
    setIsMuted(nextVal);
    if (typeof window !== "undefined") {
      localStorage.setItem("syict_notif_sound_muted", String(nextVal));
    }
    if (!nextVal) {
      playNotificationChime("normal");
    }
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
        limit: 40,
        page: 1,
      };
      if (activeCategory !== "all") {
        qParams.category = activeCategory;
      }
      if (isSuperAdmin && selectedBranch !== "all") {
        qParams.branchId = selectedBranch;
      }

      const res = await api.get("/notifications", { params: qParams });
      if (res.data?.success) {
        setNotifications(res.data.data || []);
        if (onUnreadCountChange && typeof res.data.unreadCount === "number") {
          onUnreadCountChange(res.data.unreadCount);
        }
      }
    } catch (err) {
      console.error("[NotificationDrawer] Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, selectedBranch, isSuperAdmin, onUnreadCountChange]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, fetchNotifications]);

  // Real-time notification inbound listener
  useEffect(() => {
    const handleNewNotification = (e) => {
      const notif = e.detail;
      if (!notif) return;

      // Prepend if matches current category
      setNotifications((prev) => {
        const exists = prev.some((n) => n._id === notif._id || n._id === notif.id);
        if (exists) return prev;
        return [{ ...notif, isRead: false }, ...prev];
      });
      // Do not double-increment unread count here; NotificationBell handles its own counter
    };

    window.addEventListener("notificationReceived", handleNewNotification);
    return () => {
      window.removeEventListener("notificationReceived", handleNewNotification);
    };
  }, []);

  // Handle Mark Single as Read
  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      if (onUnreadCountChange) {
        onUnreadCountChange((prev) => Math.max(0, (prev || 1) - 1));
      }
      window.dispatchEvent(new CustomEvent("notificationsMarkedRead"));
      await api.patch(`/notifications/${id}/read`);
    } catch (err) {
      console.error("[Mark Read Error]", err.message);
    }
  };

  // Handle Mark All as Read
  const handleMarkAllRead = async () => {
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      if (onUnreadCountChange) onUnreadCountChange(0);
      window.dispatchEvent(
        new CustomEvent("notificationsMarkedRead", { detail: { unreadCount: 0 } })
      );
      await api.patch("/notifications/mark-all-read");
    } catch (err) {
      console.error("[Mark All Read Error]", err.message);
    }
  };

  // Handle Clear Read Notifications
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

  // Click card to navigate with intelligent branch routing
  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      await handleMarkAsRead(notif._id);
    }
    onClose();

    if (notif.link) {
      let link = notif.link.trim();

      // Intelligent route aliasing
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

      const bId = params?.branchId || user?.branchId || notif.metadata?.branchId;
      if (!isGlobal && bId && !link.startsWith(`/${bId}`)) {
        link = `/${bId}${link.startsWith("/") ? link : "/" + link}`;
      }
      if (!link.startsWith(`/${locale}`)) {
        link = `/${locale}${link.startsWith("/") ? link : "/" + link}`;
      }
      router.push(link);
    }
  };

  if (!isOpen) return null;

  const unreadListCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[200] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] max-w-[100vw] bg-slate-900 border-l border-slate-800 text-slate-100 z-[210] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-label="Notification Center"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">
              <HiBell size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Notification Hub
                </h2>
                {unreadListCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-black rounded-full bg-pink-500 text-white">
                    {unreadListCount} new
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Live alerts, cross-branch sync & updates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSoundMute}
              className={`p-2 rounded-lg border transition ${
                isMuted
                  ? "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
                  : "bg-pink-500/15 border-pink-500/40 text-pink-400 hover:bg-pink-500/25"
              }`}
              title={isMuted ? "Unmute alerts" : "Mute alerts"}
              aria-label={isMuted ? "Unmute alerts" : "Mute alerts"}
            >
              {isMuted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close notifications"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>

        {/* Super Admin Cross-Branch Filter */}
        {isSuperAdmin && (
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium shrink-0">
              <HiFilter size={14} className="text-pink-400" />
              Campus:
            </span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full max-w-[280px] bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-pink-500 outline-none"
            >
              <option value="all">🌐 All Campuses (Global HQ Feed)</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  📍 {b.name} ({b.code || "Branch"})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category Navigation Tabs */}
        <div className="px-3 pt-2 pb-1 border-b border-slate-800/80 bg-slate-950/30 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Bar (Mark all read & clear) */}
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/60 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">
            Showing {notifications.length} notifications
          </span>
          <div className="flex items-center gap-3">
            {unreadListCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 transition"
              >
                <HiCheckCircle size={14} />
                <span>Mark all read</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleClearRead}
              className="text-slate-400 hover:text-rose-400 font-semibold flex items-center gap-1 transition"
              title="Remove all read notifications from view"
            >
              <HiTrash size={13} />
              <span>Clear read</span>
            </button>
          </div>
        </div>

        {/* Notification List Scroll Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {loading ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3">
              <div className="w-7 h-7 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Loading live updates...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 text-2xl">
                🔔
              </div>
              <h3 className="text-sm font-bold text-slate-300">All Caught Up!</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                No new notifications in this category. Live system and branch activity will appear here automatically.
              </p>
            </div>
          ) : (
            notifications.map((notif) => {
              const isUrgent = notif.priority === "urgent";
              const isHigh = notif.priority === "high";

              let catBadgeColor = "bg-slate-800 text-slate-300 border-slate-700";
              if (notif.category === "academic")
                catBadgeColor = "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
              if (notif.category === "financial")
                catBadgeColor = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
              if (notif.category === "administrative")
                catBadgeColor = "bg-amber-500/15 text-amber-300 border-amber-500/30";
              if (notif.category === "security")
                catBadgeColor = "bg-rose-500/15 text-rose-300 border-rose-500/30";

              return (
                <div
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                    notif.isRead
                      ? "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-400"
                      : "bg-slate-800/90 border-slate-700/90 hover:border-pink-500/50 text-slate-200 shadow-md shadow-slate-950/50"
                  }`}
                >
                  {/* Unread Accent Indicator */}
                  {!notif.isRead && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-pink-500 shadow-sm shadow-pink-500 animate-pulse" />
                  )}

                  {/* Header Row: Category & Priority */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-black tracking-wider rounded border ${catBadgeColor}`}
                    >
                      {notif.category}
                    </span>

                    {(isUrgent || isHigh) && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded ${
                          isUrgent
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {notif.priority}
                      </span>
                    )}

                    {notif.metadata?.branchName && (
                      <span className="text-[10px] text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                        📍 {notif.metadata.branchName}
                      </span>
                    )}
                  </div>

                  {/* Notification Title */}
                  <h4
                    className={`text-xs font-bold leading-snug line-clamp-2 ${
                      notif.isRead ? "text-slate-300" : "text-white"
                    }`}
                  >
                    {notif.title}
                  </h4>

                  {/* Notification Message */}
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>

                  {/* Footer Row: Timestamp & Actions */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span>
                      {notif.createdAt
                        ? new Date(notif.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "numeric",
                            month: "short",
                          })
                        : "Just now"}
                    </span>

                    <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
                      {notif.link && (
                        <span className="text-pink-400 flex items-center gap-1 font-semibold">
                          Open <HiExternalLink size={12} />
                        </span>
                      )}
                      {!notif.isRead && (
                        <button
                          type="button"
                          onClick={(e) => handleMarkAsRead(notif._id, e)}
                          className="hover:text-pink-400 p-1"
                          title="Mark as read"
                        >
                          <HiCheck size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Hub Shortcut */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
          <Link
            href={`/${locale}/notifications`}
            onClick={onClose}
            className="w-full text-center py-2 px-3 rounded-lg bg-slate-800 hover:bg-pink-600 text-white font-bold transition flex items-center justify-center gap-1.5"
          >
            <span>Open Full Notifications Hub</span>
            <HiExternalLink size={14} />
          </Link>
        </div>
      </aside>
    </>
  );
}
