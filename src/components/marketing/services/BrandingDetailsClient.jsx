"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoArrowBackOutline,
  IoTriangleOutline,
  IoJournalOutline,
  IoFingerPrintOutline,
  IoSyncOutline,
  IoCheckmarkCircleOutline,
  IoInfiniteOutline,
  IoDiamondOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function BrandingDetailsClient({ data }) {
  if (!data) return null;

  const { hero, sections, cta } = data;
  const phases = sections?.phases || [];
  const roi = sections?.roi || [];
  const manifest = sections?.manifest || [];
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801722550012";

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-pink selection:text-white pb-12 md:pb-20 flex flex-col relative font-sans">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-2.5 md:py-3.5 flex items-center justify-between">
          <Link
            href="/services/branding"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-pink transition-colors"
          >
            <IoArrowBackOutline className="text-sm" />
            <span>Back to Brand Overview</span>
          </Link>
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-2.5 py-0.5 rounded-full">
            BRAND_SPEC_v2.6
          </div>
        </div>
      </div>

      <div className="container-custom pt-8 md:pt-12 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-0">
        {/* TECH HEADER */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-brand-pink mb-4"
          >
            <div className="w-10 h-[2px] bg-brand-pink"></div>
            <span className="text-xs font-bold uppercase tracking-widest leading-none">
              {hero?.badge || "Technical Identity Specifications"}
            </span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
            {hero?.title?.split(" ")[0]}{" "}
            <span className="text-brand-pink">
              {hero?.title?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-2xl">
            {hero?.description}
          </p>
        </div>

        {/* 6-PHASE PROTOCOL GRID */}
        {phases?.length > 0 && (
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                Engineering Lifecycle
              </h2>
              <div className="h-[1px] flex-1 bg-slate-200"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phases.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 border border-slate-200 rounded-xl hover:border-brand-pink/40 hover:shadow-md transition-all group"
                >
                  <div className="text-brand-pink font-mono text-xs mb-4 flex items-center gap-2 font-bold">
                    <span className="w-2 h-2 rounded-full bg-brand-pink"></span>
                    <span>{item.step} // SPRINT_VERIFIED</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight group-hover:text-brand-pink transition-colors">
                    {item.stage}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOGO CONSTRUCTION SECTION */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12 lg:mb-16">
          <div className="relative lg:sticky lg:top-28">
            <div className="w-12 h-12 bg-brand-pink/10 flex items-center justify-center text-2xl text-brand-pink mb-6 border border-brand-pink/20 rounded-xl">
              <IoTriangleOutline />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Geometric <br />
              Construction <span className="text-brand-pink">Matrix.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed mb-8">
              We use mathematical grids and the golden ratio (1.618) to ensure every brand we build possesses internal structural harmony and timeless visual balance.
            </p>

            <div className="p-6 bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between group rounded-xl">
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 bg-brand-pink flex items-center justify-center text-white shadow rounded-lg">
                  <IoDiamondOutline className="text-xl" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Symmetry Ratio Audit
                  </p>
                  <p className="text-xs font-mono font-bold text-white tracking-tight">
                    GOLDEN_RATIO::φ_1.61803
                  </p>
                </div>
              </div>
              <IoSyncOutline className="text-emerald-400 text-xl animate-spin-slow shrink-0" />
            </div>
          </div>

          <div className="space-y-4">
            {roi?.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl"
              >
                <h4 className="text-xs font-bold text-brand-pink uppercase tracking-wider mb-4">
                  {spec.group} Protocol
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {spec.items?.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-xs font-semibold text-slate-700"
                    >
                      <IoCheckmarkCircleOutline className="text-emerald-500 text-base shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHROMODYNAMIC SECTION */}
        <div className="bg-white p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden mb-12 lg:mb-16 rounded-2xl">
          <div className="grid lg:grid-cols-2 gap-8 relative z-10 items-center">
            <div>
              <div className="text-emerald-600 mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <div className="w-8 h-[2px] bg-emerald-500"></div>
                <span>Color Psychology</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">
                Chromodynamic <span className="text-brand-pink">Synthesis.</span>
              </h2>
              <p className="text-slate-600 text-sm font-normal leading-relaxed mb-6">
                Colors aren&apos;t merely decorative; they trigger specific neuro-emotional brand sentiments. We map palettes to psychological resonance and strict accessibility standards.
              </p>

              <div className="space-y-3">
                {manifest?.map((feat, i) => (
                  <div
                    key={i}
                    className="flex gap-3.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg"
                  >
                    <div className="text-xl text-brand-pink shrink-0 mt-0.5">
                      {getIcon(feat.i)}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        {feat.t}
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {feat.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-6 sm:p-8 border border-slate-800 text-white rounded-xl shadow-lg">
              <div className="flex justify-between items-center text-slate-400 font-mono text-[10px] tracking-widest mb-6">
                <span>COLOR_SYSTEM_MATRIX</span>
                <span className="text-emerald-400">STATUS: VERIFIED</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Delta-E Variance</span>
                  <span className="font-mono text-emerald-400 font-bold">&lt; 1.8 (Sub-Perceptual)</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">WCAG 2.2 AA Contrast</span>
                  <span className="font-mono text-emerald-400 font-bold">11.4:1 (Pass AAA)</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Pantone Solid Coated</span>
                  <span className="font-mono text-emerald-400 font-bold">PMS Calibrated</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
                <IoJournalOutline className="text-2xl text-brand-pink shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Manual ready for worldwide production</p>
                  <p className="text-slate-400 text-[11px]">Consistent across Web, iOS, Android, and Print.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 lg:py-16 border-t border-slate-200">
          <IoFingerPrintOutline className="text-5xl text-brand-pink mb-4 mx-auto opacity-40" />
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">
            Ready to Build Your Strategic Brand Identity?
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mx-auto mb-8 font-normal leading-relaxed">
            Connect with our lead architects to discuss timeline, deliverables, and package selection.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/services/branding"
              className="px-6 py-3.5 bg-brand-pink text-white font-bold hover:bg-brand-pinkLight transition-all text-xs uppercase tracking-wider rounded-lg shadow-md shadow-brand-pink/25 text-center"
            >
              Return to Brand Overview
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hello Smart Youth ICT! I am reviewing the Branding Technical Specifications and would like to consult with an architect."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
            >
              <IoLogoWhatsapp className="text-base text-emerald-400" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
