"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { authService } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
} from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const PW_RULES = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One uppercase letter (A–Z)", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One number (0–9)", test: (pw) => /[0-9]/.test(pw) },
];

function ResetForm() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!PW_RULES.every((r) => r.test(password))) {
      setError("Password does not meet the requirements.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Reset token is missing. Please use the link from the email.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setDone(true);
      setTimeout(() => router.push(`/${locale}/login`), 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Reset link is invalid or has expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 text-base md:text-sm py-2.5 md:py-2 px-3 pr-10 rounded-xl outline-none focus:bg-white focus:border-brand-accent focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all";
  const labelClass =
    "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 text-left";

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4 mt-2">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <IoCheckmarkCircle size={28} className="text-emerald-500" />
            </div>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2">
            Password Updated!
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 px-4">
            Your password has been changed successfully. Redirecting you to login…
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center mb-5">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="SYICT"
                width={140}
                height={36}
                priority
                className="h-8 w-auto object-contain mb-3"
              />
            </Link>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 mb-0.5">
              Set New Password
            </h1>
            <p className="text-slate-500 text-[11px] sm:text-xs text-center leading-relaxed max-w-[280px]">
              Choose a strong password to protect your account.
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-xl text-xs text-brand-pink bg-brand-pink/5 border border-brand-pink/10 text-left">
              ⚠️ {error}
            </div>
          )}

          {!token && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 text-xs text-left">
              ⚠️ No token found. Please click the link from the reset email again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className={labelClass}>New Password</label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPw ? "text" : "password"}
                  required
                  className={inputClass}
                  placeholder="Min 8 chars, uppercase & number"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPw ? (
                    <IoEyeOffOutline size={16} />
                  ) : (
                    <IoEyeOutline size={16} />
                  )}
                </button>
              </div>
              {/* Strength checklist */}
              {password && (
                <ul className="mt-2 space-y-1 pl-1">
                  {PW_RULES.map((r) => {
                    const ok = r.test(password);
                    return (
                      <li
                        key={r.label}
                        className={`flex items-center gap-1.5 text-[10px] ${ok ? "text-emerald-500 font-medium" : "text-slate-400"}`}
                      >
                        {ok ? (
                          <IoCheckmarkCircle size={12} />
                        ) : (
                          <IoCloseCircle size={12} />
                        )}{" "}
                        {r.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div>
              <label className={labelClass}>Confirm Password</label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  required
                  className={`${inputClass} ${
                    confirm && password !== confirm
                      ? "!border-brand-pink/50 !focus:border-brand-pink focus:shadow-none"
                      : ""
                  }`}
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <IoEyeOffOutline size={16} />
                  ) : (
                    <IoEyeOutline size={16} />
                  )}
                </button>
              </div>
              {confirm && password !== confirm && (
                <p className="text-[10px] text-brand-pink mt-1 pl-1 font-medium">
                  Passwords do not match.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !token}
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
                  Updating…
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ResetPasswordPage() {
  const locale = useLocale();

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
        <Suspense
          fallback={<div className="text-slate-500 text-center">Loading…</div>}
        >
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
