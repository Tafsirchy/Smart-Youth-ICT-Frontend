"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { IoEyeOutline, IoEyeOffOutline, IoCheckmarkCircle } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const fadeIn = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

const PERKS = [
  "Project-based real-world training",
  "Earn while you learn — freelancing model",
  "Certificate recognized by top clients",
  "Dedicated mentor & WhatsApp support",
];

export default function LoginPage() {
  const router  = useRouter();
  const locale  = useLocale();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [showPw, setShowPw]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, email: form.email, password: form.password });
    setLoading(false);
    if (res?.ok) {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      const role = session?.user?.role || "student";
      const redirectMap = { admin: "admin", instructor: "instructor", student: "student" };
      router.push(`/${locale}/${redirectMap[role] || "student"}`);
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── Left Panel — Branding ──────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden p-12"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)" }}>

        {/* Floating blobs */}
        <motion.div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--color-brand-pink)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-12 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "#818cf8" }}
          animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Logo */}
        <Link href="/">
          <img src="/images/logo.png" alt="SYICT" className="h-10 w-auto object-contain brightness-200" />
        </Link>

        {/* Middle content */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          <motion.h2 variants={fadeIn} className="text-3xl font-extrabold text-white leading-tight mb-4">
            Bangladesh's #1<br />IT Training Platform
          </motion.h2>
          <motion.p variants={fadeIn} className="text-indigo-200 text-base mb-8 leading-relaxed">
            Join 5,000+ students who turned IT skills into real freelancing income.
          </motion.p>
          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <motion.li key={perk} variants={fadeIn} className="flex items-center gap-3 text-indigo-100 text-sm">
                <IoCheckmarkCircle size={20} className="text-emerald-400 shrink-0" />
                {perk}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom CTA */}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801000000000"}?text=Hi%20SYICT!`}
          target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          <FaWhatsapp size={18} /> Have questions? Chat with us on WhatsApp
        </a>
      </div>

      {/* ── Right Panel — Form ────────────────────────── */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-[var(--color-surface)]">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/"><img src="/images/logo.png" alt="SYICT" className="h-10 w-auto object-contain" /></Link>
          </div>

          <h1 className="text-2xl font-bold text-textPrimary mb-1">Welcome back 👋</h1>
          <p className="text-textSecondary text-sm mb-8">Sign in to your SYICT account</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-start gap-2 p-3.5 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200"
            >
              ⚠️ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1.5">Email address</label>
              <input
                id="email" type="email" required autoComplete="email"
                className="input w-full"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-textPrimary">Password</label>
                <Link href={`/${locale}/forgot-password`} className="text-xs text-brand-pink hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password" type={showPw ? "text" : "password"} required autoComplete="current-password"
                  className="input w-full pr-11"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  tabIndex={-1}
                >
                  {showPw ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              id="login-btn"
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base font-semibold rounded-xl disabled:opacity-60"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : "Sign In →"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-textSecondary mt-8">
            Don't have an account?{" "}
            <Link href={`/${locale}/register`} className="text-brand-pink font-semibold hover:underline">
              Create one for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
