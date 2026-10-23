"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { HiBell } from "react-icons/hi";
import api from "@/lib/api";
import NotificationDrawer from "./NotificationDrawer";

export default function NotificationBell({ user, className = "", iconSize = 22 }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasNewAlert, setHasNewAlert] = useState(false);
  const seenNotificationIdsRef = useRef(new Set());

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
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  // Listen for real-time inbound notification & cross-component sync events
  useEffect(() => {
    const handleNew = (e) => {
      // Guard against double counting when the same broadcast is delivered
      // to more than one socket room (e.g. branch room + executive room).
      const notificationId = e?.detail?._id || e?.detail?.id;
      if (notificationId) {
        if (seenNotificationIdsRef.current.has(notificationId)) return;
        seenNotificationIdsRef.current.add(notificationId);
        if (seenNotificationIdsRef.current.size > 200) {
          const oldest = seenNotificationIdsRef.current.values().next().value;
          seenNotificationIdsRef.current.delete(oldest);
        }
      }

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
        className={`relative p-2.5 rounded-xl text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
          hasNewAlert ? "ring-2 ring-blue-500 text-blue-600" : ""
        } ${className}`}
        aria-label={`Notifications (${unreadCount} unread)`}
        title="View Notifications"
      >
        <HiBell size={iconSize} />

        {/* Unread Counter Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
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
