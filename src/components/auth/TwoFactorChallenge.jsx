"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { HiShieldCheck, HiArrowLeft, HiRefresh } from "react-icons/hi";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function TwoFactorChallenge({ twoFactorData, onSuccess, onCancel }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");

  const isEmail = twoFactorData?.method === "email";

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode || cleanCode.length < 6) {
      toast.error("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        tempToken: twoFactorData?.tempToken,
        twoFactorCode: cleanCode,
      });

      if (res?.ok) {
        toast.success("Security authorization confirmed! Welcome back.");
        if (onSuccess) onSuccess();
      } else {
        const msg = res?.error || "Invalid or expired security code.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err?.message || "Verification failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending || !twoFactorData?.tempToken) return;
    setResending(true);
    setError("");

    try {
      const res = await api.post("/auth/2fa/resend", {
        tempToken: twoFactorData.tempToken,
      });
      toast.success(res.data?.message || "A new 6-digit code has been sent to your email.");
      setCountdown(60);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to resend code. Please try again.";
      toast.error(msg);
      setError(msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Brand & Shield Header */}
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="mb-2">
          <Image
            src="/images/logo.png"
            alt="SYICT"
            width={200}
            height={50}
            priority
            className="h-11 w-auto object-contain mix-blend-multiply rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/fallback.png";
            }}
          />
        </Link>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-50 to-pink-100 border border-pink-200 text-brand-pink mb-2 shadow-sm">
          <HiShieldCheck size={32} />
        </div>

        <h2 className="text-lg font-bold text-slate-800">Two-Factor Authentication</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-[320px]">
          {isEmail ? (
            <>
              A 6-digit security code was dispatched to{" "}
              <span className="font-semibold text-slate-700">
                {twoFactorData?.emailMasked || "your registered email"}
              </span>{" "}
              (Default 2FA)
            </>
          ) : (
            "Enter the 6-digit code from your Google Authenticator or Authy app."
          )}
        </p>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-3 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Code Input Form */}
      <form onSubmit={handleVerify} className="space-y-4 pt-1">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 text-center">
            Verification Code
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9A-Za-z-]/g, ""))}
              placeholder="••••••"
              className="w-full text-center text-2xl tracking-[8px] font-mono font-bold py-3 px-4 border-2 border-slate-200 rounded-xl focus:border-brand-pink focus:outline-none transition-all bg-slate-50 focus:bg-white text-slate-800 shadow-inner"
            />
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-1.5">
            Tip: You can also enter an 8-character emergency backup code.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || code.trim().length < 6}
          className="w-full py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(255,44,109,0.39)] bg-gradient-to-r from-brand-pink to-brand-accent hover:shadow-[0_6px_20px_rgba(255,44,109,0.23)] active:scale-[0.98] transition-all disabled:opacity-60 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <HiRefresh className="animate-spin text-base" /> Verifying...
            </>
          ) : (
            "Authorize & Sign In"
          )}
        </button>

        {isEmail && (
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0 || resending}
              className="text-xs text-slate-500 hover:text-brand-pink font-medium transition-colors disabled:opacity-50"
            >
              {countdown > 0 ? (
                `Resend code in ${countdown}s`
              ) : resending ? (
                "Sending code..."
              ) : (
                "Didn't receive code? Resend Email"
              )}
            </button>
          </div>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-slate-600 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <HiArrowLeft size={12} /> Return to sign in
          </button>
        </div>
      </form>
    </div>
  );
}
