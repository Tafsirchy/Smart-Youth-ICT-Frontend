"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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

  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [branches, setBranches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const drawerRef = useRef(null);

  const isSuperAdmin = user?.role === "super_admin" || user?.role === "super_management";

  // Handle client-side mount for createPortal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  if (!isOpen || !mounted) return null;

  const unreadListCount = notifications.filter((n) => !n.isRead).length;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 z-[999998] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel (Full Vertical Height) */}
      <aside
        ref={drawerRef}
        className="fixed inset-y-0 right-0 w-full sm:w-[460px] max-w-[100vw] h-screen h-[100dvh] bg-white border-l border-slate-200 text-slate-900 z-[999999] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Notification Center"
      >
        {/* Drawer Header */}
        <div className="shrink-0 p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <HiBell size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Notification Hub
                </h2>
                {unreadListCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-blue-600 text-white">
                    {unreadListCount} new
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Live alerts, campus updates & activity feed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSoundMute}
              className={`p-2 rounded-xl border transition ${
                isMuted
                  ? "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
                  : "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
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
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              aria-label="Close notifications"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>

        {/* Super Admin Cross-Branch Filter */}
        {isSuperAdmin && (
          <div className="shrink-0 px-4 py-2.5 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-600 flex items-center gap-1.5 font-medium shrink-0">
              <HiFilter size={14} className="text-blue-600" />
              Campus:
            </span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full max-w-[280px] bg-white border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
            >
              <option value="all">🌐 All Campuses (Global Feed)</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  📍 {b.name} ({b.code || "Branch"})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category Navigation Tabs */}
        <div className="shrink-0 px-3 py-2 border-b border-slate-200 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Bar (Mark all read & clear) */}
        <div className="shrink-0 px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Showing {notifications.length} notifications
          </span>
          <div className="flex items-center gap-3">
            {unreadListCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition"
              >
                <HiCheckCircle size={15} />
                <span>Mark all read</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleClearRead}
              className="text-slate-500 hover:text-rose-600 font-medium flex items-center gap-1 transition"
              title="Remove all read notifications from view"
            >
              <HiTrash size={14} />
              <span>Clear read</span>
            </button>
          </div>
        </div>

        {/* Notification List Scroll Area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2 bg-slate-50/40">
          {loading ? (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center gap-3">
              <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-medium">Loading updates...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-2xl">
                🔔
              </div>
              <h3 className="text-sm font-bold text-slate-800">All Caught Up!</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                No notifications in this category. New campus and system alerts will appear here in real-time.
              </p>
            </div>
          ) : (
            notifications.map((notif) => {
              const isUrgent = notif.priority === "urgent";
              const isHigh = notif.priority === "high";

              let catBadgeColor = "bg-slate-100 text-slate-700 border-slate-200";
              if (notif.category === "academic")
                catBadgeColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
              if (notif.category === "financial")
                catBadgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
              if (notif.category === "administrative")
                catBadgeColor = "bg-amber-50 text-amber-800 border-amber-200";
              if (notif.category === "security")
                catBadgeColor = "bg-rose-50 text-rose-700 border-rose-200";

              return (
                <div
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                    notif.isRead
                      ? "bg-white border-slate-200 hover:border-slate-300 text-slate-600"
                      : "bg-blue-50/40 border-blue-200 hover:border-blue-300 text-slate-900 shadow-2xs"
                  }`}
                >
                  {/* Unread Accent Indicator */}
                  {!notif.isRead && (
                    <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}

                  {/* Header Row: Category & Priority */}
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border ${catBadgeColor}`}
                    >
                      {notif.category}
                    </span>

                    {(isUrgent || isHigh) && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                          isUrgent
                            ? "bg-rose-100 text-rose-800 border-rose-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        {notif.priority}
                      </span>
                    )}

                    {notif.metadata?.branchName && (
                      <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        📍 {notif.metadata.branchName}
                      </span>
                    )}
                  </div>

                  {/* Notification Title */}
                  <h4
                    className={`text-xs font-bold leading-snug line-clamp-2 ${
                      notif.isRead ? "text-slate-800" : "text-slate-900"
                    }`}
                  >
                    {notif.title}
                  </h4>

                  {/* Notification Message */}
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>

                  {/* Footer Row: Timestamp & Actions */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
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

                    <div className="flex items-center gap-2">
                      {notif.link && (
                        <span className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold text-[11px]">
                          Open <HiExternalLink size={12} />
                        </span>
                      )}
                      {!notif.isRead && (
                        <button
                          type="button"
                          onClick={(e) => handleMarkAsRead(notif._id, e)}
                          className="hover:text-blue-600 p-1 text-slate-400 rounded transition"
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
        <div className="shrink-0 p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <Link
            href={`/${locale}/notifications`}
            onClick={onClose}
            className="w-full text-center py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Open Full Notifications Hub</span>
            <HiExternalLink size={14} />
          </Link>
        </div>
      </aside>
    </>,
    document.body
  );
}
