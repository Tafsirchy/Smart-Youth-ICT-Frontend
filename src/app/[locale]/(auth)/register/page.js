"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { IoEyeOutline, IoEyeOffOutline, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const PW_RULES = [
  { label: "At least 8 characters",           test: (pw) => pw.length >= 8 },
  { label: "One uppercase letter (A–Z)",       test: (pw) => /[A-Z]/.test(pw) },
  { label: "One number (0–9)",                 test: (pw) => /[0-9]/.test(pw) },
];

export default function RegisterPage() {
  const router = useRouter();
  const locale = useLocale();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading]       = useState(false);
  const [errors, setErrors]         = useState({});
  const [showPw, setShowPw]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const e = {};
    if (!PW_RULES.every(r => r.test(form.password))) e.password = "Password does not meet requirements.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setErrors({});
    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      await authService.register(data);
      toast.success("Account created! Please sign in.");
      router.push(`/${locale}/login`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── Left — Branding ── */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden p-12"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)" }}>
        <motion.div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--color-brand-pink)" }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "#818cf8" }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }} />

        <Link href="/"><img src="/images/logo.png" alt="SYICT" className="h-10 w-auto object-contain brightness-200" /></Link>

        <div>
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-4">
            Start your<br />IT career today
          </h2>
          <p className="text-indigo-200 text-base mb-8 leading-relaxed">
            Learn practical skills, work on real projects, and earn from day one.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[["5,000+", "Students"], ["৳50L+", "Earned"], ["4", "Courses"], ["100%", "Project-based"]].map(([val, lab]) => (
              <div key={lab} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-extrabold text-white">{val}</p>
                <p className="text-xs text-indigo-200 mt-0.5">{lab}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-indigo-300 text-sm">Already a member?{" "}
          <Link href={`/${locale}/login`} className="text-white font-semibold hover:underline">Sign in →</Link>
        </p>
      </div>

      {/* ── Right — Form ── */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-[var(--color-surface)] overflow-y-auto">
        <motion.div
          className="w-full max-w-md py-6"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/"><img src="/images/logo.png" alt="SYICT" className="h-10 w-auto object-contain" /></Link>
          </div>

          <h1 className="text-2xl font-bold text-textPrimary mb-1">Create your account ✨</h1>
          <p className="text-textSecondary text-sm mb-8">Join 5,000+ students on SYICT</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1.5">Full Name</label>
              <input id="name" type="text" required className="input w-full" placeholder="Md. Abdur Rahman"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1.5">Email</label>
              <input id="email" type="email" required autoComplete="email" className="input w-full" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1.5">Phone (bKash / Nagad)</label>
              <input id="phone" type="tel" required className="input w-full" placeholder="01XXXXXXXXX"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1.5">Password</label>
              <div className="relative">
                <input id="password" type={showPw ? "text" : "password"} required className={`input w-full pr-11 ${errors.password ? "border-red-400" : ""}`}
                  placeholder="Min 8 chars, uppercase & number"
                  value={form.password} onChange={e => { setForm({ ...form, password: e.target.value }); setErrors(p => ({ ...p, password: undefined })); }} />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" tabIndex={-1}>
                  {showPw ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
              {/* Password strength checklist */}
              {form.password && (
                <ul className="mt-2 space-y-1">
                  {PW_RULES.map(r => {
                    const ok = r.test(form.password);
                    return (
                      <li key={r.label} className={`flex items-center gap-1.5 text-xs ${ok ? "text-emerald-600" : "text-neutral-400"}`}>
                        {ok ? <IoCheckmarkCircle size={14} /> : <IoCloseCircle size={14} />} {r.label}
                      </li>
                    );
                  })}
                </ul>
              )}
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1.5">Confirm Password</label>
              <div className="relative">
                <input id="confirmPassword" type={showConfirm ? "text" : "password"} required
                  className={`input w-full pr-11 ${errors.confirmPassword ? "border-red-400" : ""}`}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword} onChange={e => { setForm({ ...form, confirmPassword: e.target.value }); setErrors(p => ({ ...p, confirmPassword: undefined })); }} />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" tabIndex={-1}>
                  {showConfirm ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            <motion.button
              id="register-btn" type="submit" disabled={loading}
              className="btn-primary w-full py-3 text-base font-semibold rounded-xl mt-2 disabled:opacity-60"
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account…
                </span>
              ) : "Create Account →"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-textSecondary mt-6">
            Already have an account?{" "}
            <Link href={`/${locale}/login`} className="text-brand-pink font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
