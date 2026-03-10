'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error('Could not send reset email. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md p-8">
      <div className="text-center mb-8">
        <span className="text-2xl font-extrabold text-gradient">SYICT</span>
        <h1 className="text-xl font-bold text-textPrimary mt-1">Reset Password</h1>
      </div>

      {sent ? (
        <div className="text-center space-y-4">
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
            Check your email for a password reset link.
          </div>
          <Link href="/login" className="btn-outline inline-block">Back to Login</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Email</label>
            <input id="forgot-email" type="email" required className="input" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button id="forgot-submit" type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Sending…' : 'Send Reset Link'}
          </button>
          <p className="text-center text-sm text-textSecondary">
            <Link href="/login" className="text-brand-pink hover:underline">Back to Login</Link>
          </p>
        </form>
      )}
    </div>
  );
}
