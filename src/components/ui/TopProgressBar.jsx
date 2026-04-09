"use client";

/**
 * TopProgressBar.jsx — SYICT Custom Page Progress Loader
 * ───────────────────────────────────────────────────────
 * A zero-dependency NProgress-style top bar that:
 *   1. Shows a thin animated bar on every route navigation
 *   2. Tracks route-change duration
 *   3. Shows a debug overlay with load time & warnings (in dev / debug mode)
 *   4. Integrates with perfMonitor for console diagnostics
 *
 * How it works:
 *   • usePathname() detects route changes in Next.js App Router
 *   • A CSS animation drives the bar from 0→80% (indeterminate crawl)
 *   • On route complete, we snap to 100% then fade out
 *   • The "glow" effect is a trailing element for visual polish
 *
 * Usage (in layout.jsx, replacing NextTopLoader):
 *   import TopProgressBar from '@/components/ui/TopProgressBar';
 *   <TopProgressBar debugMode={process.env.NODE_ENV === 'development'} />
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

// Inline route timer — no external dependency needed
const createRouteTimer = () => {
  let startTime = null;
  return {
    start: () => {
      startTime = Date.now();
    },
    end: () => (startTime != null ? Date.now() - startTime : null),
  };
};

// ─── Constants ────────────────────────────────────────────────────────────────
const WARN_MS = 2000;
const CRITICAL_MS = 3500;
const COLOR_GOOD = "#10B981"; // emerald-500 — matches SYICT brand
const COLOR_WARN = "#F59E0B"; // amber-500
const COLOR_CRIT = "#EF4444"; // red-500

export default function TopProgressBar({ debugMode = false }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const timerRef = useRef(createRouteTimer());
  const hideTimerRef = useRef(null);

  // Bar state
  const [barState, setBarState] = useState("idle"); // idle | loading | completing | done
  const [progress, setProgress] = useState(0);
  const [barColor, setBarColor] = useState(COLOR_GOOD);

  // Debug overlay state
  const [debugInfo, setDebugInfo] = useState(null); // { elapsed, level }
  const [showDebug, setShowDebug] = useState(false);

  // ─── Complete the bar (snap to 100%, then fade) ──────────────────────────
  const completeBar = useCallback(
    (elapsed) => {
      clearTimeout(hideTimerRef.current);

      // Pick color by load time
      const color =
        elapsed >= CRITICAL_MS
          ? COLOR_CRIT
          : elapsed >= WARN_MS
            ? COLOR_WARN
            : COLOR_GOOD;

      setBarColor(color);
      setProgress(100);
      setBarState("completing");

      if (debugMode && elapsed != null) {
        const level =
          elapsed >= CRITICAL_MS
            ? "critical"
            : elapsed >= WARN_MS
              ? "warn"
              : "good";
        setDebugInfo({ elapsed, level });
        setShowDebug(true);
      }

      hideTimerRef.current = setTimeout(() => {
        setBarState("done");
        setTimeout(() => {
          setBarState("idle");
          setProgress(0);
          setBarColor(COLOR_GOOD);
          // Auto-hide debug after 4s
          if (debugMode) {
            setTimeout(() => setShowDebug(false), 4000);
          }
        }, 300);
      }, 400);
    },
    [debugMode],
  );

  // ─── Start the bar ────────────────────────────────────────────────────────
  const startBar = useCallback(() => {
    clearTimeout(hideTimerRef.current);
    setBarState("loading");
    setProgress(0);
    setBarColor(COLOR_GOOD);
    setShowDebug(false);
    timerRef.current.start();
  }, []);

  // ─── Detect route changes ─────────────────────────────────────────────────
  useEffect(() => {
    if (pathname === prevPathRef.current) return;
    const elapsed = timerRef.current.end(pathname);
    prevPathRef.current = pathname;
    completeBar(elapsed ?? 0);
  }, [pathname, completeBar]);

  // ─── Intercept Next.js router link clicks to start bar early ─────────────
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only trigger for internal, non-hash, non-external links
      const isInternal = !href.startsWith("http") && !href.startsWith("//");
      const isHashOnly = href.startsWith("#");
      const isSamePage = href === pathname;
      const isDownload = anchor.hasAttribute("download");
      const isNewTab = anchor.target === "_blank";

      if (
        isInternal &&
        !isHashOnly &&
        !isSamePage &&
        !isDownload &&
        !isNewTab
      ) {
        startBar();
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, startBar]);

  // ─── Simulate crawl progress (0 → 80%) ───────────────────────────────────
  useEffect(() => {
    if (barState !== "loading") return;

    // Non-linear crawl: fast at first, slows near 80%
    const steps = [
      { target: 20, delay: 80 },
      { target: 40, delay: 300 },
      { target: 55, delay: 500 },
      { target: 65, delay: 700 },
      { target: 72, delay: 1000 },
      { target: 77, delay: 1500 },
      { target: 80, delay: 2500 },
    ];

    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => {
        setProgress((p) => Math.max(p, target));
      }, delay),
    );

    return () => timers.forEach(clearTimeout);
  }, [barState]);

  // ─── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => () => clearTimeout(hideTimerRef.current), []);

  // ─── Derived visibility ───────────────────────────────────────────────────
  const isVisible = barState === "loading" || barState === "completing";
  const opacity = barState === "done" ? 0 : isVisible ? 1 : 0;
  const transition =
    barState === "completing"
      ? "width 0.3s ease-out, opacity 0.3s ease"
      : "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease";

  return (
    <>
      {/* ── Top Progress Bar ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          height: "3px",
          pointerEvents: "none",
        }}
      >
        {/* Bar track (invisible background) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "transparent",
          }}
        >
          {/* Main fill bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${progress}%`,
              background: barColor,
              opacity,
              transition,
              borderRadius: "0 2px 2px 0",
              // Subtle shimmer effect
              backgroundImage: `linear-gradient(
                90deg,
                ${barColor} 0%,
                ${barColor}cc 40%,
                ${barColor}ff 60%,
                ${barColor} 100%
              )`,
              backgroundSize: "200% 100%",
              animation:
                barState === "loading"
                  ? "syict-shimmer 1.5s linear infinite"
                  : "none",
            }}
          />

          {/* Glow / drip at the leading edge */}
          {barState === "loading" && (
            <div
              style={{
                position: "absolute",
                top: "-2px",
                left: `${progress}%`,
                width: "80px",
                height: "7px",
                background: `radial-gradient(ellipse at left, ${barColor}99, transparent 70%)`,
                transform: "translateX(-70%)",
                borderRadius: "50%",
                transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>

      {/* ── Debug Overlay ────────────────────────────────────────────── */}
      {debugMode && showDebug && debugInfo && (
        <DebugBadge debugInfo={debugInfo} onClose={() => setShowDebug(false)} />
      )}

      {/* ── Keyframe styles ──────────────────────────────────────────── */}
      <style>{`
        @keyframes syict-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </>
  );
}

// ─── Debug Badge Component ────────────────────────────────────────────────────
function DebugBadge({ debugInfo, onClose }) {
  const { elapsed, level } = debugInfo;

  const colors = {
    good: { bg: "#064E3B", border: "#10B981", text: "#6EE7B7", icon: "✅" },
    warn: { bg: "#78350F", border: "#F59E0B", text: "#FCD34D", icon: "⚠️" },
    critical: { bg: "#7F1D1D", border: "#EF4444", text: "#FCA5A5", icon: "🔴" },
  };

  const c = colors[level];
  const label =
    level === "critical"
      ? `Slow! Consider code splitting & caching.`
      : level === "warn"
        ? `Slightly slow. Check API & image sizes.`
        : `Fast navigation ✓`;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99998,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: "10px",
        padding: "10px 14px",
        minWidth: "220px",
        boxShadow: `0 4px 24px ${c.border}33`,
        fontFamily: "monospace",
        animation: "syict-fadein 0.25s ease",
      }}
    >
      {/* Close btn */}
      <button
        onClick={onClose}
        aria-label="Close performance badge"
        style={{
          position: "absolute",
          top: "6px",
          right: "8px",
          background: "none",
          border: "none",
          color: c.text,
          cursor: "pointer",
          fontSize: "14px",
          opacity: 0.6,
          lineHeight: 1,
        }}
      >
        ×
      </button>

      {/* Icon + time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "4px",
        }}
      >
        <span style={{ fontSize: "18px" }}>{c.icon}</span>
        <span style={{ color: c.text, fontWeight: 700, fontSize: "15px" }}>
          {elapsed < 1000
            ? `${Math.round(elapsed)}ms`
            : `${(elapsed / 1000).toFixed(2)}s`}
        </span>
        <span
          style={{
            color: c.border,
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          route load
        </span>
      </div>

      {/* Label */}
      <div style={{ color: c.text, fontSize: "11px", opacity: 0.85 }}>
        {label}
      </div>

      {/* Thresholds legend */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "8px",
          paddingTop: "8px",
          borderTop: `1px solid ${c.border}33`,
          fontSize: "10px",
          color: "#9CA3AF",
        }}
      >
        <span>✅ &lt;2s</span>
        <span>⚠️ 2–3.5s</span>
        <span>🔴 &gt;3.5s</span>
      </div>

      <style>{`
        @keyframes syict-fadein {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
