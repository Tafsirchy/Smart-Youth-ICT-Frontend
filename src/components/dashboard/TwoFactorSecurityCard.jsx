"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineKey,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlineArrowDownTray,
  HiOutlineXMark,
  HiOutlineLockClosed,
  HiOutlineArrowPath,
} from "react-icons/hi2";

export default function TwoFactorSecurityCard({ userEmail }) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({
    enabled: false,
    method: "email",
    remainingBackupCodes: 0,
  });

  // Modal / Wizard state
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [setupStep, setSetupStep] = useState("method"); // 'method' | 'verify' | 'backup'
  const [selectedMethod, setSelectedMethod] = useState("email"); // Default is EMAIL
  const [setupData, setSetupData] = useState(null); // { secret, otpauthUrl, emailMasked }
  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [disabling, setDisabling] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [copiedCodes, setCopiedCodes] = useState(false);

  useEffect(() => {
    fetch2FAStatus();
  }, []);

  const fetch2FAStatus = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/2fa/status");
      if (res.data?.success) {
        setStatus(res.data.data);
      }
    } catch (err) {
      console.error("[2FA Status Error]", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSetup = async (method = "email") => {
    setSelectedMethod(method);
    setVerifying(true);
    try {
      const res = await api.post("/auth/2fa/setup", { method });
      if (res.data?.success) {
        setSetupData(res.data);
        setSetupStep("verify");
        setVerificationCode("");
        toast.success(
          method === "email"
            ? `Verification code dispatched to ${res.data.emailMasked || userEmail}`
            : "Authenticator secret generated"
        );
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Setup initiation failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleConfirmActivation = async (e) => {
    e?.preventDefault();
    if (!verificationCode || verificationCode.trim().length !== 6) {
      return toast.error("Please enter the complete 6-digit verification code");
    }

    setVerifying(true);
    try {
      const res = await api.post("/auth/2fa/enable", {
        code: verificationCode.trim(),
        method: selectedMethod,
        secret: setupData?.secret,
      });

      if (res.data?.success) {
        toast.success("Two-Factor Authentication activated successfully!");
        setBackupCodes(res.data.backupCodes || []);
        setStatus({
          enabled: true,
          method: selectedMethod,
          remainingBackupCodes: (res.data.backupCodes || []).length,
        });
        setSetupStep("backup");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid verification code");
    } finally {
      setVerifying(false);
    }
  };

  const handleDisable2FA = async (e) => {
    e?.preventDefault();
    if (!disablePassword) {
      return toast.error("Please enter your current account password");
    }

    setDisabling(true);
    try {
      const res = await api.post("/auth/2fa/disable", {
        password: disablePassword,
      });

      if (res.data?.success) {
        toast.success("Two-Factor Authentication has been disabled");
        setStatus({
          enabled: false,
          method: "email",
          remainingBackupCodes: 0,
        });
        setShowDisableModal(false);
        setDisablePassword("");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to disable 2FA");
    } finally {
      setDisabling(false);
    }
  };

  const copyBackupCodes = () => {
    if (!backupCodes.length) return;
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopiedCodes(true);
    toast.success("All backup codes copied to clipboard!");
    setTimeout(() => setCopiedCodes(false), 3000);
  };

  const downloadBackupCodes = () => {
    if (!backupCodes.length) return;
    const content = `SYICT ENTERPRISE - TWO-FACTOR AUTHENTICATION BACKUP CODES\nGenerated: ${new Date().toISOString()}\nAccount: ${userEmail}\n\nIMPORTANT: Treat these codes like your master passwords. Each code can only be used once.\n\n` +
      backupCodes.map((c, i) => `[${i + 1}] ${c}`).join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `syict-2fa-backup-codes-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Backup codes downloaded");
  };

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 p-6 text-white shadow-xl relative overflow-hidden rounded-xl">
        {/* Ambient background glow */}
        <div
          className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-colors ${
            status.enabled ? "bg-emerald-500/20" : "bg-amber-500/20"
          }`}
        />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-lg border ${
                  status.enabled
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                }`}
              >
                {status.enabled ? (
                  <HiOutlineShieldCheck size={24} />
                ) : (
                  <HiOutlineShieldExclamation size={24} />
                )}
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white leading-snug">
                  Two-Factor Authentication (2FA)
                </h3>
                <p className="text-xs font-medium text-slate-400">
                  Dual-layer identity protection on every sign in
                </p>
              </div>
            </div>

            {/* Status Pill */}
            {loading ? (
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-400 rounded-md animate-pulse">
                Checking...
              </span>
            ) : status.enabled ? (
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-md flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active & Enforced
              </span>
            ) : (
              <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-md">
                Disabled
              </span>
            )}
          </div>

          {/* Description Body */}
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {status.enabled ? (
              <>
                Your account is safeguarded with Two-Factor Authentication using{" "}
                <span className="font-bold text-white uppercase tracking-wider underline decoration-emerald-500">
                  {status.method === "email" ? "Email One-Time Password (Default)" : "Authenticator TOTP"}
                </span>
                . Even if your password is compromised, unauthorized access is completely blocked.
              </>
            ) : (
              <>
                Protect your account from unauthorized intrusions. Once enabled, logging in will require both your password and a 6-digit dynamic code sent via <span className="font-bold text-indigo-300">Email OTP (Default)</span> or an Authenticator App.
              </>
            )}
          </p>

          {/* Metadata badges if enabled */}
          {status.enabled && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                {status.method === "email" ? (
                  <HiOutlineEnvelope className="text-indigo-400" size={14} />
                ) : (
                  <HiOutlineDevicePhoneMobile className="text-emerald-400" size={14} />
                )}
                <span>Method: {status.method === "email" ? "Registered Email OTP" : "Authenticator App"}</span>
              </div>
              {status.remainingBackupCodes > 0 && (
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <HiOutlineKey className="text-amber-400" size={14} />
                  <span>{status.remainingBackupCodes} Backup Codes Remaining</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            {!status.enabled ? (
              <button
                type="button"
                onClick={() => {
                  setShowSetupModal(true);
                  setSetupStep("method");
                  setSelectedMethod("email");
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <HiOutlineShieldCheck size={16} />
                Enable 2FA Protection
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSetupModal(true);
                    setSetupStep("method");
                    setSelectedMethod(status.method || "email");
                  }}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-lg border border-white/15 transition-all flex items-center gap-1.5"
                >
                  <HiOutlineArrowPath size={14} />
                  Reconfigure
                </button>
                <button
                  type="button"
                  onClick={() => setShowDisableModal(true)}
                  className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold rounded-lg border border-rose-500/40 transition-all"
                >
                  Disable 2FA
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Setup / Configuration Modal */}
      <AnimatePresence>
        {showSetupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setShowSetupModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <HiOutlineXMark size={20} />
              </button>

              {/* Step 1: Method Selector */}
              {setupStep === "method" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                      <HiOutlineShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight">Choose 2FA Method</h4>
                      <p className="text-xs text-slate-400">Select how you want to receive dynamic login codes</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Method 1: Email OTP (DEFAULT) */}
                    <div
                      onClick={() => setSelectedMethod("email")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedMethod === "email"
                          ? "bg-indigo-500/10 border-indigo-500 shadow-lg shadow-indigo-500/20"
                          : "bg-slate-800/50 border-slate-700/60 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                            <HiOutlineEnvelope size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">Email Verification</span>
                              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                                Default & Recommended
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                              Receive 6-digit codes on your registered email address automatically on sign in.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Method 2: Authenticator App */}
                    <div
                      onClick={() => setSelectedMethod("authenticator")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedMethod === "authenticator"
                          ? "bg-indigo-500/10 border-indigo-500 shadow-lg shadow-indigo-500/20"
                          : "bg-slate-800/50 border-slate-700/60 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                            <HiOutlineDevicePhoneMobile size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">Authenticator App (TOTP)</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                              Use Google Authenticator, Authy, or Microsoft Authenticator for offline time-based codes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSetupModal(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={verifying}
                      onClick={() => handleStartSetup(selectedMethod)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                      {verifying ? "Initializing..." : "Continue"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Verification Code Confirmation */}
              {setupStep === "verify" && (
                <form onSubmit={handleConfirmActivation} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                      {selectedMethod === "email" ? (
                        <HiOutlineEnvelope size={24} />
                      ) : (
                        <HiOutlineDevicePhoneMobile size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight">
                        {selectedMethod === "email" ? "Verify Email OTP" : "Scan Authenticator QR"}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {selectedMethod === "email"
                          ? `Code sent to ${setupData?.emailMasked || userEmail}`
                          : "Scan the QR code with your authenticator app"}
                      </p>
                    </div>
                  </div>

                  {/* QR Code view if authenticator */}
                  {selectedMethod === "authenticator" && setupData?.otpauthUrl && (
                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                      <div className="inline-block p-3 bg-white rounded-lg shadow-lg mx-auto">
                        <QRCodeSVG value={setupData.otpauthUrl} size={150} level="M" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          Secret Key (Manual Entry)
                        </span>
                        <div className="p-2 bg-slate-900 rounded font-mono text-xs text-indigo-300 font-bold select-all tracking-wider border border-slate-800">
                          {setupData?.secret}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Code Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Enter 6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      autoFocus
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="000000"
                      className="w-full text-center tracking-[0.5em] text-2xl font-mono font-black py-3 px-4 bg-slate-950 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-700"
                    />
                  </div>

                  {selectedMethod === "email" && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        disabled={verifying}
                        onClick={() => handleStartSetup("email")}
                        className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
                      >
                        Resend Code
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSetupStep("method")}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={verifying || verificationCode.length !== 6}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-emerald-600/30 disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                      {verifying ? "Verifying..." : "Confirm & Activate"}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Backup Emergency Codes Display */}
              {setupStep === "backup" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                      <HiOutlineCheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight text-white">2FA Activated!</h4>
                      <p className="text-xs text-slate-400">Save your emergency backup recovery codes</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs leading-relaxed">
                    <strong>Critical:</strong> Store these 8 single-use backup codes in a secure password manager. If you lose access to your {selectedMethod === "email" ? "email" : "phone"}, these are the only way to recover your account.
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {backupCodes.map((code, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded font-mono text-xs font-bold text-center text-slate-300 select-all tracking-wider"
                      >
                        {code}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={copyBackupCodes}
                        className="px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-lg border border-white/10 flex items-center gap-1.5 transition-all"
                      >
                        <HiOutlineClipboardDocumentCheck size={16} />
                        {copiedCodes ? "Copied!" : "Copy All"}
                      </button>
                      <button
                        type="button"
                        onClick={downloadBackupCodes}
                        className="px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-lg border border-white/10 flex items-center gap-1.5 transition-all"
                      >
                        <HiOutlineArrowDownTray size={16} />
                        Download
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSetupModal(false)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Disable 2FA Modal */}
      <AnimatePresence>
        {showDisableModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl p-6 text-white relative space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
                  <HiOutlineLockClosed size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight">Disable 2FA</h4>
                  <p className="text-xs text-slate-400">Confirm with your account password</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Disabling Two-Factor Authentication reduces your account security level. Please enter your account password to proceed.
              </p>

              <form onSubmit={handleDisable2FA} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Current Password
                  </label>
                  <input
                    type="password"
                    autoFocus
                    required
                    value={disablePassword}
                    onChange={(e) => setDisablePassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDisableModal(false);
                      setDisablePassword("");
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={disabling || !disablePassword}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-rose-600/30 disabled:opacity-50 transition-all"
                  >
                    {disabling ? "Verifying..." : "Disable 2FA"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
