"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { authService } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoMailOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 text-base md:text-sm py-2.5 md:py-2 px-3 rounded-xl outline-none focus:bg-white focus:border-brand-accent focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all";
  const labelClass =
    "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      {/* ── Immersive Animated Orbs (Rainbow 7 Colors) ──────────────────────────── */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-80"
        animate={{ 
          backgroundColor: ["#EF4444", "#F97316", "#EAB308", "#10B981", "#3B82F6", "#4F46E5", "#8B5CF6", "#EF4444"],
          x: ["-40px", "40px", "-40px"], 
          y: ["-30px", "30px", "-30px"], 
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full blur-[100px] pointer-events-none opacity-80"
        animate={{ 
          backgroundColor: ["#EAB308", "#10B981", "#3B82F6", "#4F46E5", "#8B5CF6", "#EF4444", "#F97316", "#EAB308"],
          x: ["40px", "-40px", "40px"], 
          y: ["40px", "-20px", "40px"], 
          scale: [1, 1.15, 1] 
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-80"
        animate={{ 
          backgroundColor: ["#3B82F6", "#4F46E5", "#8B5CF6", "#EF4444", "#F97316", "#EAB308", "#10B981", "#3B82F6"],
          x: ["0px", "-30px", "0px"], 
          y: ["-40px", "20px", "-40px"], 
          scale: [1, 1.05, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Top Left Back Button ────────────────────────────── */}
      <Link
        href={`/${locale}/login`}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
      >
        <FaArrowLeft /> Back to Login
      </Link>

      {/* ── Solid White Form Card ─────────────────────────────── */}
      <div className="relative w-full max-w-[420px] bg-white border border-white/40 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 text-center">
        
        {/* Header & Logo */}
        <div className="flex flex-col items-center mb-5">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="SYICT"
              width={240}
              height={60}
              priority
              className="h-14 w-auto object-contain mb-3"
            
onError={(e) => { e.target.onerror = null; e.target.srcset = ''; e.target.src = '/assets/fallback.png'; }}
decoding="async"/>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800 mb-0.5">
            Reset Password
          </h1>
          <p className="text-slate-500 text-[11px] sm:text-xs text-center leading-relaxed max-w-[280px]">
            Enter your registered email and we'll send you a secure reset link.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-center mb-4 mt-2">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <IoCheckmarkCircle size={28} className="text-emerald-500" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">
                Check your inbox!
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 px-4">
                We sent a password reset link to{" "}
                <strong className="text-slate-700">{email}</strong>. The link
                expires in 1 hour.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 mb-2">
                Didn't receive it? Check your spam folder or try again.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-left"
            >
              {error && (
                <div className="mb-4 flex items-start gap-2 p-3 rounded-xl text-xs text-brand-pink bg-brand-pink/5 border border-brand-pink/10">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  id="forgot-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 mt-2 text-sm font-bold text-white rounded-xl shadow-[0_4px_14px_0_rgba(255,44,109,0.39)] bg-gradient-to-r from-brand-pink to-brand-accent hover:shadow-[0_6px_20px_rgba(255,44,109,0.23)] active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
