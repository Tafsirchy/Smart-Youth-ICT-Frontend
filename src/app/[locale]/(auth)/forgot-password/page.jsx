'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { authService } from '@/services/authService';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMailOutline, IoArrowBackOutline, IoCheckmarkCircle } from 'react-icons/io5';

export default function ForgotPasswordPage() {
  const locale  = useLocale();
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
      {/* Blobs */}
      <motion.div className="fixed -top-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-brand-pink)' }}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity }} />
      <motion.div className="fixed -bottom-32 -right-32 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#818cf8' }}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1.5 }} />

      <motion.div
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <IoCheckmarkCircle size={36} className="text-emerald-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">Check your inbox!</h1>
              <p className="text-indigo-200 text-sm leading-relaxed mb-8">
                We sent a password reset link to <strong className="text-white">{email}</strong>.
                The link expires in 1 hour.
              </p>
              <p className="text-indigo-300 text-xs mb-6">
                Didn't receive it? Check your spam folder or try again with the correct email.
              </p>
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors"
              >
                <IoArrowBackOutline size={16} /> Back to Login
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <IoMailOutline size={32} className="text-indigo-200" />
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

              <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
              <p className="text-indigo-200 text-sm mb-8 leading-relaxed">
                Enter your registered email and we'll send you a secure reset link.
              </p>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm">
                  ⚠️ {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1.5">Email address</label>
                  <input
                    id="forgot-email" type="email" required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <motion.button
                  id="forgot-submit" type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold text-base hover:opacity-90 transition disabled:opacity-50"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </span>
                  ) : 'Send Reset Link'}
                </motion.button>
              </form>

              <Link href={`/${locale}/login`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-indigo-300 hover:text-white transition-colors">
                <IoArrowBackOutline size={15} /> Back to Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
