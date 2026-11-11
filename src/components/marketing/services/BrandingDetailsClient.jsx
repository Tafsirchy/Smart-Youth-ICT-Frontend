"use client";

import Link from "next/link";
import {
  IoArrowBackOutline,
  IoTriangleOutline,
  IoJournalOutline,
  IoSyncOutline,
  IoCheckmarkCircleOutline,
  IoDiamondOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

export default function BrandingDetailsClient({ data }) {
  if (!data) return null;

  const { hero, sections } = data;
  const phases = sections?.phases || [];
  const roi = sections?.roi || [];
  const manifest = sections?.manifest || [];
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801722550012";

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-pink selection:text-white pb-8 md:pb-12 flex flex-col relative font-sans">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
        <div className="container-custom py-2 flex items-center justify-between gap-3">
          <Link
            href="/services/branding"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-brand-pink transition-colors leading-[1.4]"
          >
            <IoArrowBackOutline className="text-sm" />
            <span>Back to Brand Overview</span>
          </Link>
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-2.5 py-0.5 rounded-full leading-[1.4]">
            BRAND_SPEC_v2.6
          </div>
        </div>
      </div>

      <div className="container-custom pt-4 sm:pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-0">
        {/* COMPACT TECH HEADER */}
        <div className="max-w-4xl mb-5 pb-4 border-b border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-brand-pink leading-[1.4] mb-1.5">
            {hero?.badge || "Technical Identity Specifications"}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2">
            {hero?.title?.split(" ")[0]}{" "}
            <span className="text-brand-pink">
              {hero?.title?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
            {hero?.description}
          </p>
        </div>

        {/* 6-PHASE PROTOCOL GRID */}
        {phases?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase leading-[1.3]">
                Engineering Lifecycle
              </h2>
              <div className="h-[1px] flex-1 bg-slate-200"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {phases.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-3.5 sm:p-4 border border-slate-200 rounded-lg hover:border-brand-pink/40 transition-colors group"
                >
                  <div className="text-brand-pink font-mono text-xs mb-1.5 flex items-center gap-1.5 font-bold leading-[1.4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0"></span>
                    <span>{item.step} // SPRINT_VERIFIED</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-brand-pink transition-colors leading-[1.4]">
                    {item.stage}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-[1.6]">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOGO CONSTRUCTION SECTION */}
        <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start mb-6">
          <div className="bg-white p-4 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 bg-brand-pink/10 flex items-center justify-center text-lg text-brand-pink border border-brand-pink/20 rounded-md shrink-0">
                <IoTriangleOutline />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.3]">
                Geometric Construction <span className="text-brand-pink">Matrix.</span>
              </h2>
            </div>
            <p className="text-slate-600 text-sm font-normal leading-[1.6] mb-3">
              We use mathematical grids and the golden ratio (1.618) to ensure every brand we build possesses internal structural harmony and timeless visual balance.
            </p>

            <div className="p-3 bg-slate-900 border border-slate-800 flex items-center justify-between rounded-lg">
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 bg-brand-pink flex items-center justify-center text-white rounded-md shrink-0">
                  <IoDiamondOutline className="text-base" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-[1.4]">
                    Symmetry Ratio Audit
                  </p>
                  <p className="text-xs font-mono font-bold text-white leading-[1.4]">
                    GOLDEN_RATIO::PHI_1.61803
                  </p>
                </div>
              </div>
              <IoSyncOutline className="text-emerald-400 text-base shrink-0" />
            </div>
          </div>

          <div className="space-y-2.5">
            {roi?.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 sm:p-4 border border-slate-200 rounded-lg"
              >
                <h4 className="text-[11px] font-bold text-brand-pink uppercase tracking-wider mb-2 leading-[1.4]">
                  {spec.group} Protocol
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {spec.items?.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-700 leading-[1.4]"
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
        <div className="bg-white p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 rounded-lg">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start">
            <div>
              <div className="text-emerald-600 mb-1 text-[11px] font-bold uppercase tracking-wider leading-[1.4]">
                Color Psychology
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 leading-[1.3]">
                Chromodynamic <span className="text-brand-pink">Synthesis.</span>
              </h2>
              <p className="text-slate-600 text-sm font-normal leading-[1.6] mb-3">
                Colors aren&apos;t merely decorative; they trigger specific neuro-emotional brand sentiments. We map palettes to psychological resonance and strict accessibility standards.
              </p>

              <div className="space-y-2">
                {manifest?.map((feat, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 p-2.5 bg-slate-50 border border-slate-200/80 rounded-md"
                  >
                    <div className="text-base text-brand-pink shrink-0 mt-0.5">
                      {getIcon(feat.i)}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider leading-[1.4]">
                        {feat.t}
                      </h5>
                      <p className="text-xs text-slate-500 leading-[1.5] font-normal">
                        {feat.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-4 border border-slate-800 text-white rounded-lg space-y-2.5">
              <div className="flex justify-between items-center text-slate-400 font-mono text-[10px] tracking-wider leading-[1.4]">
                <span>COLOR_SYSTEM_MATRIX</span>
                <span className="text-emerald-400">STATUS: VERIFIED</span>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-md flex items-center justify-between text-xs leading-[1.4]">
                  <span className="font-semibold text-slate-300">Delta-E Variance</span>
                  <span className="font-mono text-emerald-400 font-bold">&lt; 1.8 (Sub-Perceptual)</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-md flex items-center justify-between text-xs leading-[1.4]">
                  <span className="font-semibold text-slate-300">WCAG 2.2 AA Contrast</span>
                  <span className="font-mono text-emerald-400 font-bold">11.4:1 (Pass AAA)</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-md flex items-center justify-between text-xs leading-[1.4]">
                  <span className="font-semibold text-slate-300">Pantone Solid Coated</span>
                  <span className="font-mono text-emerald-400 font-bold">PMS Calibrated</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-md flex items-center gap-2.5">
                <IoJournalOutline className="text-xl text-brand-pink shrink-0" />
                <div className="text-xs leading-[1.4]">
                  <p className="font-bold text-white">Manual ready for worldwide production</p>
                  <p className="text-slate-400 text-[11px]">Consistent across Web, iOS, Android, and Print.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-5 border-t border-slate-200">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 leading-[1.3]">
            Ready to Build Your Strategic Brand Identity?
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mx-auto mb-3 font-normal leading-[1.6]">
            Connect with our lead architects to discuss timeline, deliverables, and package selection.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <Link
              href="/services/branding"
              className="px-5 py-2.5 bg-brand-pink text-white font-bold hover:bg-brand-pinkLight transition-colors text-xs uppercase tracking-wider rounded-md shadow-sm text-center leading-[1.4]"
            >
              Return to Brand Overview
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hello Smart Youth ICT! I am reviewing the Branding Technical Specifications and would like to consult with an architect."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 leading-[1.4]"
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
