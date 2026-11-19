"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBanner({ globalMessage }) {
  if (!globalMessage || (Array.isArray(globalMessage) && globalMessage.length === 0)) {
    return null;
  }

  const messages = Array.isArray(globalMessage)
    ? globalMessage
    : globalMessage
        .split("\n")
        .filter(Boolean)
        .map((msg, i) => ({
          id: i,
          text: msg.trim(),
          type: "general",
        }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white w-full overflow-hidden relative"
      >
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-flex;
            white-space: nowrap;
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="py-2 flex items-center overflow-hidden whitespace-nowrap group">
          <div className="animate-marquee w-full min-w-full">
            {messages.map((msg) => (
              <span
                key={msg.id}
                className="text-xs sm:text-sm font-bold tracking-wide mx-8 inline-flex items-center gap-2"
              >
                <span className="animate-pulse text-green-200">
                  {msg.type === "hiring"
                    ? "💼"
                    : msg.type === "holiday"
                      ? "🎉"
                      : msg.type === "warning"
                        ? "⚠️"
                        : "✨"}
                </span>
                {msg.text}
                <span className="animate-pulse text-green-200">
                  {msg.type === "hiring"
                    ? "💼"
                    : msg.type === "holiday"
                      ? "🎉"
                      : msg.type === "warning"
                        ? "⚠️"
                        : "✨"}
                </span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
