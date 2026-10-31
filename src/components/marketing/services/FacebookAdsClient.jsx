"use client";

import { useState } from "react";
import {
  IoSparklesOutline,
  IoPulseOutline,
  IoFilterOutline,
  IoFlashOutline,
  IoDocumentTextOutline,
  IoBarChartOutline,
  IoTrendingUpOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoLogoWhatsapp,
  IoCloseOutline,
  IoArrowForwardOutline,
  IoRocketOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

/* ─── Deliverables Icon Map ──────────────────────────────────────────────── */
const DELIVERABLE_ICONS = [
  IoPulseOutline,
  IoFilterOutline,
  IoFlashOutline,
  IoDocumentTextOutline,
  IoBarChartOutline,
  IoTrendingUpOutline,
];

export default function FacebookAdsClient({ content }) {
  const cmsLanding = content?.landing || {};
  const hero = cmsLanding?.hero || {};
  const sections = cmsLanding?.sections || {};
  const cta = cmsLanding?.cta || {};

  const metricsData = sections.metrics || [];
  const pillarsData = sections.pillars || [];
  const deliverablesData = sections.deliverables || [];
  const pricingData = sections.pricing || [];
  const faqsData = sections.faqs || [];

  const [openFaq, setOpenFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!content) return null;

  return (
    <section className="min-h-screen bg-white flex flex-col relative selection:bg-brand-pink selection:text-white">
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
              {hero.badge || "Performance Advertising & Paid Social"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
            >
              Facebook & <span className="text-[#FF2C6D]">Meta Ads Management</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-500 text-sm md:text-base leading-relaxed max-w-4xl font-normal"
            >
              <span className="md:block md:whitespace-nowrap">We treat paid advertising as engineering, not guesswork. Our Meta ads framework</span>
              <span className="md:block md:whitespace-nowrap">leverages server-side Conversions API (CAPI), multi-stage behavioral funnels, aggressive</span>
              <span className="md:block md:whitespace-nowrap">creative sprint testing, and algorithmic budget scaling to drive profitable, predictable ROAS.</span>
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
                Initialize Ads Audit
              </button>
              <Link
                href="/en/services/facebook-ads/details"
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
                      {item.value || item.t}
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                      {item.label || item.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Capability Pillars (Growth DNA) ── */}
        {pillarsData.length > 0 && (
          <div className="container-custom py-10 sm:py-14">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Growth DNA
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Pillars of Paid Acquisition
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pillarsData.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 hover:border-[#FF2C6D]/40 hover:shadow-lg transition-all rounded-xl p-6 relative flex flex-col group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF2C6D] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 flex items-center justify-center text-xl mb-4 group-hover:bg-[#FF2C6D]/10 group-hover:text-[#FF2C6D] transition-colors shrink-0">
                    {getIcon(pillar.icon) || <IoRocketOutline />}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-[1.6] flex-1 mb-4">
                    {pillar.desc}
                  </p>

                  {pillar.highlights?.length > 0 && (
                    <ul className="space-y-1.5 pt-3 border-t border-slate-100">
                      {pillar.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                          <IoCheckmarkCircleOutline className="text-[#10B981] shrink-0 mt-0.5 text-sm" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Deliverables ── */}
        {deliverablesData.length > 0 && (
          <div className="border-t border-b border-slate-100 bg-slate-50/60 py-10">
            <div className="container-custom">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                  Campaign Suite
                </h2>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                  Production Deliverables
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {deliverablesData.map((d, di) => {
                  const Icon = DELIVERABLE_ICONS[di % DELIVERABLE_ICONS.length];
                  return (
                    <div
                      key={di}
                      className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center text-lg mb-3 shrink-0">
                          <Icon />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                          {d.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">
                          {d.desc}
                        </p>
                      </div>

                      {d.formats?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                          {d.formats.map((f, fi) => (
                            <span
                              key={fi}
                              className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Pricing Tiers ── */}
        {pricingData.length > 0 && (
          <div className="container-custom py-12 sm:py-16">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Investment Tiers
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Transparent Pricing, Built for Predictable ROAS
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingData.map((tier, ti) => (
                <div
                  key={ti}
                  className={`rounded-2xl p-6 sm:p-7 border flex flex-col justify-between relative transition-all ${
                    tier.popular
                      ? "bg-slate-900 border-[#FF2C6D] text-white shadow-xl shadow-pink-500/10 ring-1 ring-[#FF2C6D]"
                      : "bg-white border-slate-200 text-slate-900 shadow-sm"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#FF2C6D] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className={`text-base font-black ${tier.popular ? "text-white" : "text-slate-900"}`}>
                        {tier.tier}
                      </h3>
                      <p className={`text-xs mt-1 ${tier.popular ? "text-slate-400" : "text-slate-500"}`}>
                        {tier.target}
                      </p>
                    </div>

                    <div className="mb-5 pb-5 border-b border-slate-200/20">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black leading-none">{tier.price}</span>
                        <span className={`text-xs ${tier.popular ? "text-slate-400" : "text-slate-500"}`}>
                          / {tier.priceLocal}
                        </span>
                      </div>
                      <p className={`text-[11px] font-bold uppercase tracking-wider mt-1.5 ${tier.popular ? "text-[#FF2C6D]" : "text-slate-400"}`}>
                        {tier.duration}
                      </p>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {(tier.features || []).map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-xs leading-relaxed">
                          <IoCheckmarkCircleOutline className="text-[#10B981] shrink-0 mt-0.5 text-sm" />
                          <span className={tier.popular ? "text-slate-300" : "text-slate-600"}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors min-h-[42px] ${
                      tier.popular
                        ? "bg-[#FF2C6D] text-white hover:bg-[#e0285f] shadow-md shadow-pink-500/20"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    Select Tier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FAQs Accordion ── */}
        {faqsData.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/50 py-12">
            <div className="container-custom max-w-3xl">
              <div className="text-center mb-8">
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                  Clarity
                </h2>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                  Frequently Asked Questions
                </p>
              </div>

              <div className="space-y-3">
                {faqsData.map((faq, fi) => {
                  const isOpen = openFaq === fi;
                  return (
                    <div
                      key={fi}
                      className="bg-white border border-slate-200/80 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : fi)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-slate-900 hover:text-[#FF2C6D] transition-colors text-sm"
                      >
                        <span>{faq.q}</span>
                        <IoChevronDownOutline
                          className={`text-base text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#FF2C6D]" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-50">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Compact CTA Banner ── */}
        <div className="container-custom py-10">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden max-w-4xl mx-auto shadow-xl">
            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-3">
              <p className="text-[10px] font-black tracking-widest text-[#FF2C6D] uppercase">
                {cta.badge || "Scalable Paid Acquisition"}
              </p>
              <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                {cta.title || "Stop Burning Ad Spend. Scale With Predictable ROAS."}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                {cta.desc || "Book a strategic campaign audit. We will evaluate your current ad account, attribution fidelity, and creative performance."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors min-h-[42px] shadow-sm"
                >
                  Schedule Free Audit
                </button>
                <a
                  href="https://wa.me/8801700000000"
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
                  <IoSparklesOutline /> Campaign Audit
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Initialize Meta Ads Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our growth engineering team. We typically respond within 2 hours.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Our growth team will contact you shortly.");
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
                  <label className="block font-bold text-slate-700 mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Ad Spend</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900">
                    <option>&lt; $1,000 / month</option>
                    <option>$1,000 - $5,000 / month</option>
                    <option>$5,000 - $20,000 / month</option>
                    <option>$20,000+ / month</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current ROAS goals or challenges..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#FF2C6D] text-slate-900 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF2C6D] hover:bg-[#e0285f] text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors mt-2"
                >
                  Submit Audit Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
