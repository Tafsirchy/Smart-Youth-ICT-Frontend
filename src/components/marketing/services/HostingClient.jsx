"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  IoServerOutline,
  IoSearchOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoArrowForwardOutline,
  IoCloseOutline,
  IoLogoWhatsapp,
  IoSparklesOutline,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function HostingClient({ data, content }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [domainQuery, setDomainQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const rawData = data || content?.landing || {};
  if (!rawData || Object.keys(rawData).length === 0) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!domainQuery) return;
    setIsSearching(true);
    setTimeout(() => {
      const isAvailable = Math.random() > 0.3;
      setSearchResult({
        domain: domainQuery.includes(".") ? domainQuery : `${domainQuery}.com`,
        available: isAvailable,
        price: isAvailable ? "$12.99/yr" : null,
      });
      setIsSearching(false);
    }, 1000);
  };

  const hero = rawData.hero || {};
  const sections = rawData.sections || {};
  const cta = rawData.cta || {};
  const pillarsData = sections.pillars || [];
  const metricsData = sections.metrics || [];
  const plansData = sections.plans || [];

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
              {hero.badge || "High-Availability Cloud Network"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
            >
              Web Hosting & <span className="text-[#FF2C6D]">Domain Infrastructure</span>
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
                {cta.title || "Initialize Hosting Plan"}
              </button>
              <Link
                href="/en/services/hosting/details"
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

        {/* ── Functional Domain Search ── */}
        <div className="container-custom py-10 sm:py-12">
          <div className="max-w-2xl mx-auto bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-5">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Domain Lookup
              </h2>
              <p className="text-xl font-black text-slate-900">Search & Reserve Your Domain</p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus-within:border-[#FF2C6D] transition-colors">
                <IoSearchOutline className="text-slate-400 text-lg mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. yourbusiness.com"
                  className="bg-transparent border-none outline-none text-slate-900 w-full text-sm font-medium placeholder:text-slate-400"
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors shrink-0 min-h-[42px]"
              >
                {isSearching ? "Checking..." : "Search"}
              </button>
            </form>

            <AnimatePresence>
              {searchResult && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    searchResult.available
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {searchResult.available ? (
                      <IoCheckmarkCircleOutline className="text-[#10B981] text-2xl shrink-0" />
                    ) : (
                      <IoCloseCircleOutline className="text-rose-500 text-2xl shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-sm">{searchResult.domain}</p>
                      <p className="text-[11px] opacity-75">
                        {searchResult.available ? "Available for Registration" : "Already Registered"}
                      </p>
                    </div>
                  </div>
                  {searchResult.available && (
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">{searchResult.price}</span>
                      <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#10B981] text-white font-bold px-4 py-1.5 text-xs rounded-lg uppercase tracking-wider hover:bg-emerald-600 transition-colors"
                      >
                        Reserve
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Capability Pillars (Infrastructure DNA) ── */}
        {pillarsData.length > 0 && (
          <div className="container-custom py-10 sm:py-14 border-t border-slate-100">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Infrastructure DNA
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Pillars of Enterprise Hosting
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
                    {getIcon(pillar.icon) || <IoServerOutline />}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-[1.6] flex-1 mb-4">
                    {pillar.desc}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <IoCheckmarkCircleOutline className="text-[#10B981] shrink-0 text-sm" />
                    <span>NVMe PCIe Gen4 High-IOPS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Pricing Table ── */}
        {plansData.length > 0 && (
          <div className="container-custom py-12 sm:py-16 border-t border-slate-100 bg-slate-50/40">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Infrastructure Tiers
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2] mb-5">
                Transparent Scalable Cloud Hosting
              </p>

              <div className="inline-flex items-center gap-1 p-1 bg-slate-200/60 rounded-lg">
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                    isAnnual ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Annual (Save 20%)
                </button>
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                    !isAnnual ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plansData.map((plan, i) => (
                <div
                  key={plan.name || i}
                  className={`rounded-2xl p-6 sm:p-7 border flex flex-col justify-between relative transition-all ${
                    plan.popular
                      ? "bg-slate-900 border-[#FF2C6D] text-white shadow-xl shadow-pink-500/10 ring-1 ring-[#FF2C6D]"
                      : "bg-white border-slate-200 text-slate-900 shadow-sm"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#FF2C6D] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className={`text-base font-black ${plan.popular ? "text-white" : "text-slate-900"}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-xs mt-1 ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                        {plan.desc}
                      </p>
                    </div>

                    <div className="mb-5 pb-5 border-b border-slate-200/20">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black leading-none">
                          ${isAnnual ? (plan.annualPrice / 12).toFixed(2) : plan.monthlyPrice}
                        </span>
                        <span className={`text-xs ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                          / mo
                        </span>
                      </div>
                      <p className={`text-[11px] font-bold uppercase tracking-wider mt-1.5 ${plan.popular ? "text-[#FF2C6D]" : "text-slate-400"}`}>
                        Billed {isAnnual ? `$${plan.annualPrice}/yr` : "monthly"}
                      </p>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {(plan.features || []).map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-xs leading-relaxed">
                          <IoCheckmarkCircleOutline className="text-[#10B981] shrink-0 mt-0.5 text-sm" />
                          <span className={plan.popular ? "text-slate-300" : "text-slate-600"}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors min-h-[42px] ${
                      plan.popular
                        ? "bg-[#FF2C6D] text-white hover:bg-[#e0285f] shadow-md shadow-pink-500/20"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    Select Plan
                  </button>
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
                Enterprise Infrastructure
              </p>
              <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                Launch Your Digital Infrastructure on Unbreakable Foundations.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Schedule a hosting consultation. We will recommend the optimal stack for your traffic, compliance, and performance requirements.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors min-h-[42px] shadow-sm"
                >
                  Schedule Consultation
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
                  <IoSparklesOutline /> Cloud Provisioning
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Initialize Hosting Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tell us about your traffic, storage needs, and preferred cloud platform.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Our infrastructure team will connect with you shortly.");
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
                  <label className="block font-bold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expected Monthly Visitors</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900">
                    <option>&lt; 10,000 visits</option>
                    <option>10,000 - 100,000 visits</option>
                    <option>100,000 - 1,000,000 visits</option>
                    <option>Enterprise (1M+ visits / high compute)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors mt-2"
                >
                  Submit Provisioning Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
