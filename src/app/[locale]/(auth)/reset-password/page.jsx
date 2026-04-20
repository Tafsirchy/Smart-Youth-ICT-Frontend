'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { authService } from '@/services/authService';
import { motion, AnimatePresence } from 'framer-motion';
import { IoEyeOutline, IoEyeOffOutline, IoCheckmarkCircle, IoCloseCircle, IoArrowBackOutline, IoLockClosedOutline } from 'react-icons/io5';

const PW_RULES = [
  { label: 'At least 8 characters',     test: (pw) => pw.length >= 8 },
  { label: 'One uppercase letter (A–Z)', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'One number (0–9)',           test: (pw) => /[0-9]/.test(pw) },
];

function ResetForm() {
  const router        = useRouter();
  const locale        = useLocale();
  const searchParams  = useSearchParams();
  const token         = searchParams.get('token') || '';

  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [done, setDone]                 = useState(false);
  const [showPw, setShowPw]             = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!PW_RULES.every(r => r.test(password))) { setError('Password does not meet the requirements.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (!token) { setError('Reset token is missing. Please use the link from the email.'); return; }

    setError('');
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setDone(true);
      setTimeout(() => router.push(`/${locale}/login`), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Reset link is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <IoCheckmarkCircle size={36} className="text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Password Updated!</h2>
          <p className="text-indigo-200 text-sm mb-6">Your password has been changed. Redirecting you to login…</p>
          <Link href={`/${locale}/login`} className="inline-flex items-center gap-2 text-sm text-indigo-200 hover:text-white">
            <IoArrowBackOutline size={15} /> Go to Login now
          </Link>
        </motion.div>
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <IoLockClosedOutline size={32} className="text-indigo-200" />
            </div>
          </div>

          <Link href="/" className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="SYICT"
              width={128}
              height={32}
              className="h-8 w-auto object-contain brightness-200"
            />
          </Link>

          <h1 className="text-2xl font-bold text-white mb-2 text-center">Set New Password</h1>
          <p className="text-indigo-200 text-sm mb-8 text-center leading-relaxed">
            Choose a strong password to protect your account.
          </p>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm">
              ⚠️ {error}
            </motion.div>
          )}

          {!token && (
            <div className="mb-5 p-3 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-200 text-sm">
              ⚠️ No token found. Please click the link from the reset email again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1.5">New Password</label>
              <div className="relative">
                <input id="new-password" type={showPw ? 'text' : 'password'} required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Min 8 chars, uppercase & number"
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white" tabIndex={-1}>
                  {showPw ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
              {/* Strength checklist */}
              {password && (
                <ul className="mt-2 space-y-1">
                  {PW_RULES.map(r => {
                    const ok = r.test(password);
                    return (
                      <li key={r.label} className={`flex items-center gap-1.5 text-xs ${ok ? 'text-emerald-400' : 'text-indigo-300/60'}`}>
                        {ok ? <IoCheckmarkCircle size={13} /> : <IoCloseCircle size={13} />} {r.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input id="confirm-password" type={showConfirm ? 'text' : 'password'} required
                  className={`w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                    confirm && password !== confirm ? 'border-red-500/50' : 'border-white/20'
                  }`}
                  placeholder="Re-enter your password"
                  value={confirm} onChange={e => setConfirm(e.target.value)} />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white" tabIndex={-1}>
                  {showConfirm ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
              {confirm && password !== confirm && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match.</p>
              )}
            </div>

            <motion.button type="submit" disabled={loading || !token}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold text-base hover:opacity-90 transition disabled:opacity-50"
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Updating…
                </span>
              ) : 'Update Password'}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <Link href={`/${locale}/login`} className="inline-flex items-center gap-1.5 text-sm text-indigo-300 hover:text-white transition-colors">
              <IoArrowBackOutline size={15} /> Back to Login
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
      <motion.div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-brand-pink)' }}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity }} />
      <motion.div
        className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#818cf8' }}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1.5 }} />

      <motion.div
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <Suspense fallback={<div className="text-indigo-200 text-center">Loading…</div>}>
          <ResetForm />
        </Suspense>
      </motion.div>
    </div>
  );
}
