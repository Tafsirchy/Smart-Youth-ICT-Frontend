"use client";

import { motion } from "framer-motion";

export default function RootRouteLoader() {
  // If we are navigating to Home, we hide this loader 
  // and let the PageLoader (Splash) handle it.
  const isNavigatingToHome = typeof window !== "undefined" && window.__isNavigatingToHome;

  if (isNavigatingToHome) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8fafc] overflow-hidden">
      {/* ── Background Aesthetic Blobs ─────────────────── */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{ background: "var(--color-brand-pink)" }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "#22c55e" }}
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ── Central Glassmorphic Card ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
      >
        {/* Animated Brand Pulse */}
        <div className="relative mb-8">
          {/* Glowing Rings */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 to-emerald-500/20 blur-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Main Logo Box */}
          <motion.div
            className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center shadow-xl shadow-slate-200/50 overflow-hidden"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Spinning gradient border accent */}
            <motion.div 
              className="absolute inset-0 border-[3px] border-transparent border-t-pink-500/30 border-r-emerald-500/30 rounded-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            <img
              src="/images/logo.png"
              alt="SYICT"
              className="w-16 h-16 object-contain drop-shadow-sm"
            />
          </motion.div>
        </div>

        {/* Loading Message & Shimmer Line */}
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-1 justify-center mb-6">
            <span className="text-pink-600">Smart</span>
            <span className="text-emerald-700">Youth ICT</span>
          </h2>
          
          <div className="relative w-40 h-[4px] rounded-full bg-slate-200/50 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          <p className="mt-4 text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">
            Getting things ready...
          </p>
        </div>
      </motion.div>

      {/* ── Footer Branding ───────────────────────────── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center opacity-30 select-none pointer-events-none">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Bangladesh's #1 IT Training Platform
        </p>
      </div>

      <style jsx global>{`
        :root {
          --color-brand-pink: #ec4899;
        }
      `}</style>
    </div>
  );
}
