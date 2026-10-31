"use client";

import { useState } from "react";
import {
  IoLayersOutline,
  IoSearchOutline,
  IoBrowsersOutline,
  IoCodeSlashOutline,
  IoShieldCheckmarkOutline,
  IoColorPaletteOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoLogoWhatsapp,
  IoCloseOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

/* ─── Deliverables Icon Map ──────────────────────────────────────────────── */
const DELIVERABLE_ICONS = [
  IoLayersOutline,
  IoBrowsersOutline,
  IoSearchOutline,
  IoCodeSlashOutline,
  IoShieldCheckmarkOutline,
  IoColorPaletteOutline,
];

export default function UiUxClient({ content }) {
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
              {hero.badge || "Product Experience & System Architecture"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
            >
              UI/UX Design & <span className="text-[#FF2C6D]">Product Systems</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-500 text-sm md:text-base leading-relaxed max-w-4xl font-normal"
            >
              <span className="md:block md:whitespace-nowrap">We architect human experiences that convert. Combining cognitive psychology,</span>
              <span className="md:block md:whitespace-nowrap">atomic design token systems, and relentless user testing, we design web applications,</span>
              <span className="md:block md:whitespace-nowrap">mobile interfaces, and digital products that feel intuitive from the very first click.</span>
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
                Initialize Design Audit
              </button>
              <Link
                href="/en/services/ui-ux/details"
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

        {/* ── Capability Pillars (Experience DNA) ── */}
        {pillarsData.length > 0 && (
          <div className="container-custom py-10 sm:py-14">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Experience DNA
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Pillars of Digital Ergonomics
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
                    {getIcon(pillar.icon) || <IoLayersOutline />}
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
                  Production Deliverables
                </h2>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                  Code-Ready Product Artifacts
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {deliverablesData.map((d, di) => {
                  const Icon = DELIVERABLE_ICONS[di % DELIVERABLE_ICONS.length];
                  return (
                    <div
                      key={di}
                      className="bg-white border border-slate-200/80 rounded-xl p-5 flex flex-col shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#FF2C6D]/10 text-[#FF2C6D] flex items-center justify-center text-lg mb-3 shrink-0">
                        <Icon />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                        {d.title}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-1">
                        {d.desc}
                      </p>
                      {d.formats?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                          {d.formats.map((f, fi) => (
                            <span key={fi} className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded font-mono font-medium">
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

        {/* ── Pricing ── */}
        {pricingData.length > 0 && (
          <div className="container-custom py-10 sm:py-14">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Investment Tiers
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Transparent Pricing, <span className="text-[#FF2C6D]">Absolute Clarity</span>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingData.map((tier, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-xl p-6 sm:p-7 border flex flex-col relative transition-all ${
                    tier.popular
                      ? "border-[#FF2C6D] ring-2 ring-[#FF2C6D]/15 shadow-xl shadow-pink-500/5"
                      : "border-slate-200/80 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 right-6 bg-[#FF2C6D] text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
                      Recommended
                    </div>
                  )}

                  <h3 className="text-lg font-black text-slate-900 leading-[1.2]">
                    {tier.tier}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-3">
                    {tier.target}
                  </p>

                  <div className="my-2">
                    <span className="text-3xl font-black text-slate-900 leading-[1]">
                      {tier.price}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 ml-1">
                      / {tier.priceLocal}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5 flex-1 mb-6">
                    {tier.features?.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-[1.5]"
                      >
                        <IoCheckmarkCircleOutline className="text-[#10B981] text-base shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className={`w-full min-h-[44px] py-3 rounded-lg font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center leading-[1.4] text-center ${
                      tier.popular
                        ? "bg-[#FF2C6D] text-white hover:bg-brand-pinkLight shadow-md shadow-pink-500/20"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FAQs ── */}
        {faqsData.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/60 py-10">
            <div className="container-custom max-w-3xl">
              <div className="text-center mb-8">
                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                  FAQ
                </h2>
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                  Frequently Asked Questions
                </p>
              </div>

              <div className="space-y-3">
                {faqsData.map((faq, fi) => (
                  <div key={fi} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === fi ? null : fi)}
                      className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-sm sm:text-base text-slate-900">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: openFaq === fi ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 text-slate-400"
                      >
                        <IoChevronDownOutline />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openFaq === fi && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Compact CTA ── */}
        <div className="container-custom py-10 sm:py-14">
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 text-center text-white relative overflow-hidden max-w-4xl mx-auto shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white">
              {cta.title || "Eliminate Friction. Architect an Unforgettable Product Experience."}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-6">
              {cta.subtitle || "Schedule a free product design discovery session with our senior UI/UX architects."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-[#FF2C6D] text-white font-bold hover:bg-[#e0285f] transition-colors rounded-lg text-xs uppercase tracking-wider"
              >
                Schedule Discovery Session
              </button>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801722550012"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#10B981] text-white font-bold hover:bg-[#0ea371] transition-colors rounded-lg text-xs uppercase tracking-wider"
              >
                <IoLogoWhatsapp className="text-base" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Consultation Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Product Design Session
                  </h3>
                  <p className="text-xs text-slate-500">
                    Free consultation · 30 min · No commitment
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-500"
                >
                  <IoCloseOutline className="text-lg" />
                </button>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF2C6D]/30 focus:border-[#FF2C6D] bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF2C6D]/30 focus:border-[#FF2C6D] bg-slate-50"
                  />
                </div>
                <div className="flex gap-2.5 pt-2">
                  <button className="flex-1 py-3 bg-[#FF2C6D] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#e0285f] transition-colors">
                    Book Free Session
                  </button>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801722550012"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 bg-[#10B981] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#0ea371] transition-colors"
                  >
                    <IoLogoWhatsapp className="text-base" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
