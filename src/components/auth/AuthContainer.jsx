"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
} from "react-icons/io5";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";

const GOOGLE_AUTH_ENABLED =
  process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED?.trim() === "true";

const PW_RULES = [
  { label: "8+ chars", test: (pw) => pw.length >= 8 },
  { label: "Lowercase", test: (pw) => /[a-z]/.test(pw) },
  { label: "Uppercase", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Number", test: (pw) => /[0-9]/.test(pw) },
];

export default function AuthContainer({ defaultTab = "login" }) {
  const router = useRouter();
  const locale = useLocale();
  const [tab, setTab] = useState(defaultTab);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setTab(defaultTab);
    setError("");
    setErrors({});
  }, [defaultTab]);

  const validateRegister = () => {
    const e = {};
    if (!PW_RULES.every((r) => r.test(form.password)))
      e.password = "Weak password.";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords mismatch.";
    return e;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (res?.ok) {
      toast.success("Welcome back! Redirecting...");
      router.push(`/${locale}/`);
    } else {
      const msg = res?.error || "Invalid email or password.";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const ve = validateRegister();
    if (Object.keys(ve).length) {
      setErrors(ve);
      return;
    }
    setErrors({});
    setLoading(true);
    setError("");
    try {
      const { confirmPassword, ...data } = form;
      await authService.register(data);
      toast.success("Account created! Logging you in...");
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (res?.ok) {
        router.push(`/${locale}/`);
      } else {
        setTab("login");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: `/${locale}/auth-redirect` });
    setGoogleLoading(false);
  };

  const isLogin = tab === "login";

  // Common Input style for the Solid White theme
  const inputClass =
    "w-full bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm py-2 px-3 rounded-xl outline-none focus:bg-white focus:border-brand-accent focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all";
  const labelClass =
    "block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1";

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      {/* ── Futuristic Infinite Marquee Background ──────────────────────────── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <div className="absolute w-[200%] h-[200%] -rotate-12 flex flex-col justify-center gap-10">
          <motion.div 
            className="flex whitespace-nowrap text-[140px] font-black uppercase tracking-tighter text-slate-900"
            animate={{ x: [0, -1030] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          >
            {[...Array(5)].map((_, i) => (
              <span key={i} className="mr-8">INNOVATION • TECHNOLOGY • FUTURE • AI • CYBERNETICS •</span>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex whitespace-nowrap text-[140px] font-black uppercase tracking-tighter text-slate-900"
            animate={{ x: [-1030, 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(5)].map((_, i) => (
              <span key={i} className="mr-8">ROBOTICS • AUTOMATION • CLOUD • DATA • MACHINE LEARNING •</span>
            ))}
          </motion.div>

          <motion.div 
            className="flex whitespace-nowrap text-[140px] font-black uppercase tracking-tighter text-slate-900"
            animate={{ x: [0, -1030] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
          >
            {[...Array(5)].map((_, i) => (
              <span key={i} className="mr-8">WEB3 • DESIGN • ENGINEERING • NEURAL NETWORKS • SYSTEM •</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Top Left Back Button ────────────────────────────── */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
      >
        <FaArrowLeft /> Back to Home
      </Link>

      {/* ── Solid White Form Card ─────────────────────────────── */}
      <div className="relative w-full max-w-[420px] bg-white border border-white/40 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10">
        
        {/* Header & Logo */}
        <div className="flex flex-col items-center mb-4">
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
            {isLogin ? "Welcome back 👋" : "Join the future ✨"}
          </h1>
          <p className="text-slate-500 text-[11px] sm:text-xs text-center">
            {isLogin
              ? "Access your dashboard and continue learning."
              : "Start your real-world tech journey today."}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="relative flex w-full bg-slate-200/50 rounded-xl p-1 mb-3 border border-slate-100">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              window.history.pushState(null, "", `/${locale}/login`);
            }}
            className={`relative flex-1 py-2 text-xs font-bold rounded-lg z-10 transition-colors ${
              isLogin ? "text-brand-pink" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              window.history.pushState(null, "", `/${locale}/register`);
            }}
            className={`relative flex-1 py-2 text-xs font-bold rounded-lg z-10 transition-colors ${
              !isLogin ? "text-brand-pink" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Create Account
          </button>
          
          {/* Animated Indicator */}
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm border border-slate-200"
            animate={{ left: isLogin ? "4px" : "calc(50%)" }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          />
        </div>

        {/* Form */}
        <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} className="space-y-3">
          
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl text-xs text-brand-pink bg-brand-pink/5 border border-brand-pink/10">
              ⚠️ {error}
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      required
                      type="text"
                      className={inputClass}
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      required
                      type="tel"
                      className={inputClass}
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className={labelClass}>Email</label>
            <input
              required
              type="email"
              className={inputClass}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className={isLogin ? "block" : "grid grid-cols-2 gap-3"}>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                {isLogin && (
                  <Link href={`/${locale}/forgot-password`} className="text-[10px] text-brand-pink font-semibold hover:text-brand-pinkLight transition-colors">
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  required
                  type={showPw ? "text" : "password"}
                  className={`${inputClass} pr-10 ${errors.password ? "border-brand-pink" : ""}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors((p) => ({ ...p, password: undefined }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPw ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                </button>
              </div>

              {/* Compact Password Rules */}
              {!isLogin && form.password && (
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
                  {PW_RULES.map((r) => {
                    const ok = r.test(form.password);
                    return (
                      <div key={r.label} className={`flex items-center gap-1 text-[9px] font-medium ${ok ? "text-emerald-500" : "text-slate-400"}`}>
                        {ok ? <IoCheckmarkCircle size={10} /> : <IoCloseCircle size={10} />} {r.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 mt-0">Confirm</label>
                  <div className="relative">
                    <input
                      required
                      type={showConfirm ? "text" : "password"}
                      className={`${inputClass} pr-10 ${errors.confirmPassword ? "border-brand-pink" : ""}`}
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={(e) => {
                        setForm({ ...form, confirmPassword: e.target.value });
                        setErrors((p) => ({ ...p, confirmPassword: undefined }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-brand-pink mt-0.5">{errors.confirmPassword}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 text-sm font-bold text-white rounded-xl shadow-[0_4px_14px_0_rgba(255,44,109,0.39)] bg-gradient-to-r from-brand-pink to-brand-accent hover:shadow-[0_6px_20px_rgba(255,44,109,0.23)] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? "Processing…" : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        {GOOGLE_AUTH_ENABLED && (
          <div className="mt-3">
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-3">
              <span className="h-px flex-1 bg-slate-200" />
              Or continue with
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 shadow-sm px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60"
            >
              <FaGoogle size={16} className="text-[#EA4335]" />
              {googleLoading ? "Redirecting…" : "Google"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
