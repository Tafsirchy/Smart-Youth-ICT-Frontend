"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HiBell } from "react-icons/hi";
import api from "@/lib/api";
import NotificationDrawer from "./NotificationDrawer";

export default function NotificationBell({ user, className = "", iconSize = 22 }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasNewAlert, setHasNewAlert] = useState(false);

  // Fetch initial unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      if (res.data?.success) {
        const count = typeof res.data.unreadCount === "number" ? res.data.unreadCount : (res.data.count || 0);
        setUnreadCount(count);
      }
    } catch (err) {
      // Graceful fallback
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Listen for real-time inbound notification & cross-component sync events
  useEffect(() => {
    const handleNew = () => {
      setUnreadCount((prev) => prev + 1);
      setHasNewAlert(true);
      const timer = setTimeout(() => setHasNewAlert(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleSync = (e) => {
      if (typeof e.detail?.unreadCount === "number") {
        setUnreadCount(e.detail.unreadCount);
      } else {
        fetchUnreadCount();
      }
    };

    window.addEventListener("notificationReceived", handleNew);
    window.addEventListener("notificationsMarkedRead", handleSync);
    return () => {
      window.removeEventListener("notificationReceived", handleNew);
      window.removeEventListener("notificationsMarkedRead", handleSync);
    };
  }, [fetchUnreadCount]);

  return (
    <>
      <button
        type="button"
        id="topbar-notification-bell"
        onClick={() => setIsDrawerOpen(true)}
        className={`relative p-2.5 rounded-xl text-slate-400 hover:text-pink-400 hover:bg-slate-800/80 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/40 ${
          hasNewAlert ? "animate-bounce text-pink-400" : ""
        } ${className}`}
        aria-label={`Notifications (${unreadCount} unread)`}
        title="View Notifications"
      >
        <HiBell size={iconSize} />

        {/* Unread Counter Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-pink-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50 ring-2 ring-slate-900 animate-in fade-in zoom-in duration-200">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Slide-over Drawer */}
      <NotificationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={user}
        onUnreadCountChange={setUnreadCount}
      />
    </>
  );
}
