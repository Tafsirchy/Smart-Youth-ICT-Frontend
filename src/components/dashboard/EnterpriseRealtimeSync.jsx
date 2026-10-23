"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { playNotificationChime } from "@/utils/notificationSound";

/**
 * Web Audio API synthesized notification chime
 * Zero external audio files or dependencies required.
 */
const playNotificationSound = (type = "info") => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    if (type === "critical") {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    } else {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12); // E5
    }

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Audio autoplay restrictions gracefully handled
  }
};

export default function EnterpriseRealtimeSync() {
  const { data: session } = useSession();
  const socketRef = useRef(null);
  const seenNotificationIdsRef = useRef(new Set());

  useEffect(() => {
    // The gateway needs an access token in the handshake. Until the session
    // carries one there is nothing to connect with.
    if (!session?.user || !session.accessToken) return;

    const dedicatedSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    const backendUrl =
      dedicatedSocketUrl ||
      process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:5000";

    // Vercel Serverless Functions do not support persistent WebSockets/Socket.io servers.
    // If running in production on *.vercel.app without a dedicated socket server URL,
    // skip socket connection to avoid 404 WebSocket handshake console spam.
    const isVercelServerless = !dedicatedSocketUrl && backendUrl.includes("vercel.app");
    if (isVercelServerless) {
      return;
    }

    const socket = io(backendUrl, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 3,
      reconnectionDelay: 5000,
      withCredentials: true,
      auth: { token: session.accessToken },
    });

    socketRef.current = socket;

    socket.on("connect_error", () => {
      // Gracefully silent connection errors to avoid uncaught console spam
    });

    socket.on("connect", () => {
      // The server resolves the identity from the token; nothing about the
      // user is asserted by the client.
      socket.emit("join_enterprise");
    });

    // 1. New Support Ticket
    socket.on("NEW_SUPPORT_TICKET", (data) => {
      playNotificationSound(data?.priority === "urgent" ? "critical" : "info");
      toast(
        (t) => (
          <div className="flex items-start gap-3 bg-white p-1 rounded-lg">
            <span className="text-xl">🎫</span>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">
                New Support Ticket
              </div>
              <p className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                {data.subject}
              </p>
              <span className="text-[11px] text-slate-500">
                From: {data.userName || "Student / Staff"}
              </span>
            </div>
          </div>
        ),
        { duration: 6000 }
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("newSupportTicketReceived", { detail: data })
        );
      }
    });

    // 2. Ticket Escalation
    socket.on("TICKET_ESCALATED", (data) => {
      playNotificationSound("critical");
      toast.error(
        `🚨 CRITICAL SLA BREACH: Ticket "${data.subject}" has been escalated to HQ!`,
        { duration: 7000 }
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("ticketEscalatedReceived", { detail: data })
        );
      }
    });

    // 3. Emergency Broadcast
    socket.on("EMERGENCY_BROADCAST", (data) => {
      playNotificationSound("critical");
      toast(
        (t) => (
          <div className="flex items-start gap-3 bg-white p-1 rounded-lg">
            <span className="text-xl">📢</span>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase text-rose-600 tracking-wider">
                Emergency HQ Notice
              </div>
              <p className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">
                {data.title}: {data.message}
              </p>
            </div>
          </div>
        ),
        { duration: 8000 }
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("emergencyBroadcastReceived", { detail: data })
        );
      }
    });

    // 4. Audit Directive Enforced
    socket.on("AUDIT_DIRECTIVE_ENFORCED", (data) => {
      toast(
        `🏛️ HQ Audit Directive enforced for campus: ${data.branchName}`,
        { icon: "🚨", duration: 6000 }
      );
    });

    
    // 5. Enterprise Inbound Notification (Universal)
    const handleInboundNotification = (data) => {
      // The same broadcast is delivered to the branch room AND the executive HQ
      // room, so a super admin would otherwise receive it (and badge it) twice.
      // De-duplicate on the notification id before surfacing it.
      const notificationId = data?._id || data?.id;
      if (notificationId) {
        if (seenNotificationIdsRef.current.has(notificationId)) return;
        seenNotificationIdsRef.current.add(notificationId);
        if (seenNotificationIdsRef.current.size > 200) {
          const oldest = seenNotificationIdsRef.current.values().next().value;
          seenNotificationIdsRef.current.delete(oldest);
        }
      }

      const isUrgent = data?.priority === "urgent";
      const isHigh = data?.priority === "high";

      playNotificationChime(data?.priority || "normal");

      let icon = "🔔";
      if (data?.category === "academic") icon = "🎓";
      if (data?.category === "financial") icon = "💳";
      if (data?.category === "administrative") icon = "🏛️";
      if (data?.category === "security") icon = "🛡️";

      toast(
        (t) => (
          <div className="flex items-start gap-3 max-w-sm bg-white p-1 rounded-lg">
            <span className="text-xl shrink-0 mt-0.5">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">
                  {data?.category || "Notification"}
                </span>
                {isUrgent && (
                  <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold">
                    URGENT
                  </span>
                )}
                {data?.metadata?.branchName && (
                  <span className="text-[10px] text-slate-500 font-medium">
                    • {data.metadata.branchName}
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                {data?.title}
              </p>
              <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                {data?.message}
              </p>
            </div>
          </div>
        ),
        { duration: isUrgent ? 8000 : 5000 }
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("notificationReceived", { detail: data })
        );
      }
    };

    socket.on("NOTIFICATION_RECEIVED", handleInboundNotification);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [session]);

  return null;
}
