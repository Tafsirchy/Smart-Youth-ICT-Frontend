'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (res?.ok) {
      router.push('/student');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="card w-full max-w-md p-8">
      {/* Logo / Brand */}
      <div className="text-center mb-8">
        <Link href="/" className="fixed top-8 left-8 hidden md:block z-50">
           <img src="/images/logo.png" alt="Logo" className="h-10 w-auto object-contain drop-shadow-lg filter brightness-0 invert" />
        </Link>
        <h1 className="text-xl font-bold text-textPrimary mt-1">Welcome back</h1>
        <p className="text-textSecondary text-sm mt-1">Sign in to your account</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Email</label>
          <input
            id="email"
            type="email"
            required
            className="input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Password</label>
          <input
            id="password"
            type="password"
            required
            className="input"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="text-right mt-1">
            <Link href="/forgot-password" className="text-xs text-brand-pink hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <button id="login-btn" type="submit" className="btn-primary w-full mt-2" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm text-textSecondary mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-brand-pink font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
