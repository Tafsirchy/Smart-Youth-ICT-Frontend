"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoArrowForwardOutline,
  IoCloseOutline,
  IoLogoWhatsapp,
  IoSparklesOutline,
  IoConstructOutline,
  IoSpeedometerOutline,
  IoPulseOutline,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function MaintenanceClient({ content, data: propData }) {
  const [showModal, setShowModal] = useState(false);

  const rawData = propData || content?.landing || {};
  const hero = rawData.hero || {
    badge: "Zero-Downtime Infrastructure Guarantee",
    title: "Website Maintenance & System Guard",
    description:
      "We don't just fix bugs; we maintain momentum. Our proactive maintenance cycles ensure your software stays secure, fast, and ahead of the competition.",
  };
  const sections = rawData.sections || {};
  const cta = rawData.cta || {
    badge: "Continuous Uptime & Protection",
    title: "Your Platform Never Gets Sick. We Keep It That Way.",
    subtitle:
      "Schedule a free systems audit. We will inspect your uptime, security posture, plugin stack, and performance metrics.",
  };
  const pillarsData = sections.pillars || [
    {
      title: "Security & Core Guard",
      desc: "The structural essentials. Weekly off-site backups, core engine updates, and 24/7 malware monitoring to keep your node live.",
      icon: "ShieldCheckmark",
      color: "from-teal-600 to-emerald-700",
    },
    {
      title: "Standard Ops Tuning",
      desc: "Active performance tuning. Includes plugin/theme synchronization, broken link logic, and monthly speed optimization audits.",
      icon: "Construct",
      color: "from-slate-700 to-slate-900",
    },
    {
      title: "Dedicated Retainer SLA",
      desc: "Your own development engineers on retainer. Includes unlimited small content changes and dedicated custom feature support.",
      icon: "Pulse",
      color: "from-blue-600 to-indigo-700",
    },
  ];
  const metricsData = sections.metrics || sections.integrations || [
    { t: "99.9% UPTIME", d: "Zero-latency health monitoring", value: "99.9%", label: "Uptime Guaranteed" },
    { t: "ZERO VULNERABILITIES", d: "Continuous CVE heuristic scanning", value: "0", label: "Active Vulnerabilities" },
    { t: "ATOMIC UPDATES", d: "Staged sandbox testing before push", value: "100%", label: "Sandbox Tested" },
    { t: "< 1h HOTFIX SLA", d: "Rapid response emergency engineer", value: "< 1h", label: "Incident Response" },
  ];

  return (
    <section className="min-h-screen bg-white flex flex-col relative selection:bg-brand-pink selection:text-white font-sans">
      {/* Background Dot Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#0F172A08_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* ── Minimized Hero ── */}
        <div className="border-b border-slate-100 bg-white/70 backdrop-blur-sm">
          <div className="container-custom pt-10 sm:pt-14 pb-8 flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF2C6D]/8 border border-[#FF2C6D]/25 text-[#FF2C6D] text-[10px] font-black uppercase tracking-widest rounded-full leading-[1.4]"
            >
              <span className="h-1.5 w-1.5 bg-[#FF2C6D] rounded-full shrink-0 animate-pulse" />
              {hero.badge || "Zero-Downtime Infrastructure Guarantee"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
            >
              Website Maintenance & <span className="text-[#FF2C6D]">System Guard</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl font-normal"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2.5 bg-[#FF2C6D] text-white font-bold hover:bg-[#e0285f] transition-colors shadow-sm uppercase tracking-wider text-xs rounded-lg min-h-[42px]"
              >
                {cta.title || "Initialize Ops Audit"}
              </button>
              <Link
                href="/en/services/maintenance/details"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#10B981] hover:text-[#FF2C6D] transition-colors py-2 px-3"
              >
                Technical Details <IoArrowForwardOutline />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Key Highlights Strip ── */}
        {metricsData.length > 0 && (
          <div className="border-b border-slate-100 bg-slate-50/80">
            <div className="container-custom py-3.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-slate-200/60">
                {metricsData.map((item, idx) => (
                  <div key={idx} className="px-2">
                    <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.1]">
                      {item.t || item.value}
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                      {item.d || item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Capability Pillars (Ops DNA) ── */}
        {pillarsData.length > 0 && (
          <div className="container-custom py-10 sm:py-14">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Ops DNA
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Pillars of Zero-Downtime Operations
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pillarsData.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 hover:border-[#FF2C6D]/40 hover:shadow-lg transition-all rounded-xl p-6 relative flex flex-col group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF2C6D] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 flex items-center justify-center text-xl mb-4 group-hover:bg-[#FF2C6D]/10 group-hover:text-[#FF2C6D] transition-colors shrink-0">
                    {getIcon(pillar.icon) || <IoShieldCheckmarkOutline />}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-[1.6] flex-1 mb-4">
                    {pillar.desc}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <IoCheckmarkCircleOutline className="text-[#10B981] shrink-0 text-sm" />
                    <span>Active Automated SLA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Compact CTA Banner ── */}
        <div className="container-custom py-10">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden max-w-4xl mx-auto shadow-xl">
            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-3">
              <p className="text-[10px] font-black tracking-widest text-[#FF2C6D] uppercase">
                Continuous Uptime & Protection
              </p>
              <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                Your Platform Never Gets Sick. We Keep It That Way.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Schedule a free systems audit. We will inspect your uptime, security posture, plugin stack, and performance metrics.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors min-h-[42px] shadow-sm"
                >
                  Schedule System Audit
                </button>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801722550012"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors min-h-[42px]"
                >
                  <IoLogoWhatsapp className="text-emerald-400 text-sm" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Consultation Modal ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-slate-100"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                <IoCloseOutline className="text-2xl" />
              </button>

              <div className="mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 text-[#FF2C6D] rounded text-[10px] font-black uppercase tracking-wider mb-2">
                  <IoSparklesOutline /> System Audit
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Initialize Maintenance Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our DevOps and web engineering team to audit your current platform.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Our maintenance team will contact you shortly.");
                  setShowModal(false);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Website URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current Stack / Issues</label>
                  <textarea
                    rows={3}
                    placeholder="WordPress, Next.js, Laravel, downtime alerts, slow speeds..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors mt-2"
                >
                  Submit Ops Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
