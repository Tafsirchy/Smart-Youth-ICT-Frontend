"use client";

import { useMemo, useRef, useState, useEffect, memo } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

function AnnouncementBannerComponent({ globalMessage }) {
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef(null);
  const groupRef = useRef(null);
  const progressRef = useRef(0);
  const [copyCount, setCopyCount] = useState(3);
  const x = useMotionValue(0);

  const messages = useMemo(() => {
    if (!globalMessage) return [];
    if (Array.isArray(globalMessage)) {
      return globalMessage.map((m, i) =>
        typeof m === "string" ? { id: i, text: m.trim(), type: "general" } : m
      );
    }
    if (typeof globalMessage === "string") {
      return globalMessage
        .split("\n")
        .filter(Boolean)
        .map((msg, i) => ({
          id: i,
          text: msg.trim(),
          type: "general",
        }));
    }
    if (typeof globalMessage === "object" && globalMessage.text) {
      return [{ id: 0, text: globalMessage.text, type: globalMessage.type || "general" }];
    }
    return [];
  }, [globalMessage]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group || typeof ResizeObserver === "undefined") return;

    function updateCopyCount() {
      const viewportWidth = viewport?.clientWidth ?? 0;
      const groupWidth = group?.offsetWidth ?? 0;
      if (viewportWidth === 0 || groupWidth === 0) return;

      // Always ensure enough copies to span viewport + 1 extra full group for seamless wrap
      setCopyCount(Math.max(2, Math.ceil(viewportWidth / groupWidth) + 1));
    }

    updateCopyCount();
    const observer = new ResizeObserver(updateCopyCount);
    observer.observe(viewport);
    observer.observe(group);

    return () => observer.disconnect();
  }, [messages]);

  // Framer Motion useAnimationFrame runs synchronized with monitor vsync (60Hz / 120Hz / 144Hz)
  useAnimationFrame((_time, delta) => {
    if (paused) return;

    const groupWidth = groupRef.current?.offsetWidth ?? 0;
    if (groupWidth === 0) return;

    // Calm, readable broadcast speed: 38 pixels per second
    const speed = 38;
    const distance = speed * (delta / 1000);
    const progress = (progressRef.current + distance) % groupWidth;
    progressRef.current = progress;
    x.set(-progress);
  });

  if (!messages || messages.length === 0) return null;

  return (
    <div
      className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white w-full border-b border-emerald-500/30 select-none cursor-default"
      style={{ contain: "layout paint" }}
    >
      <div
        ref={viewportRef}
        className="w-full overflow-hidden py-1.5 flex items-center relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex flex-nowrap items-center whitespace-nowrap will-change-transform"
          style={{ x }}
        >
          {Array.from({ length: copyCount }).map((_, copyIdx) => (
            <div
              key={copyIdx}
              ref={copyIdx === 0 ? groupRef : undefined}
              className="flex items-center shrink-0"
              aria-hidden={copyIdx > 0}
            >
              {messages.map((msg, idx) => (
                <span
                  key={`${copyIdx}-${msg.id || idx}`}
                  className="text-xs sm:text-[13px] font-semibold tracking-wide mx-6 inline-flex items-center gap-2 antialiased"
                >
                  <span className="text-emerald-200">
                    {msg.type === "hiring"
                      ? "💼"
                      : msg.type === "holiday"
                        ? "🎉"
                        : msg.type === "warning"
                          ? "⚠️"
                          : "✨"}
                  </span>
                  <span>{msg.text}</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mx-3" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default memo(AnnouncementBannerComponent);
