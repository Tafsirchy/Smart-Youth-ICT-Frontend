"use client";

import Link from "next/link";
import {
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
  IoFlashOutline
} from "react-icons/io5";

export default function FacebookAdsDetailsClient({ data }) {
  if (!data) return null;

  const { hero, sections, cta } = data.details;

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white pb-8 md:pb-12 relative font-sans flex flex-col">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/90 sticky top-0 z-50">
        <div className="container-custom py-2 flex items-center justify-between gap-3">
          <Link href="/services/facebook-ads" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition-colors leading-[1.4]">
            <IoArrowBackOutline className="text-sm" /> Performance Overview
          </Link>
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4]">ADS_SPEC_v6.4</div>
        </div>
      </div>

      <div className="container-custom pt-4 sm:pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-0">
        {/* COMPACT HEADER */}
        <div className="grid lg:grid-cols-3 gap-3 lg:gap-4 items-start mb-5 pb-4 border-b border-slate-200">
          <div className="lg:col-span-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 leading-[1.4] mb-1.5">
              {hero.badge}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.3] mb-2 uppercase">
              {hero.title?.split(' ')[0]}{" "}
              <span className="text-emerald-600">{hero.title?.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-[1.6] max-w-3xl">
              &ldquo;{hero.description}&rdquo;
            </p>
          </div>
          <div className="bg-white p-3.5 border border-slate-200 rounded-lg">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 leading-[1.4]">Authority Index</h4>
            <div className="space-y-2">
              {["Targeting Integrity", "ROAS Velocity", "Creative Load"].map(label => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 uppercase leading-[1.4]">
                    <span>{label}</span>
                    <span>98%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[98%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6-PHASE PROTOCOL GRID */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase leading-[1.3]">The Ads Protocol</h2>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-[1.4]">V6.4 Lifecycle</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {(sections.phases || []).map((phase, idx) => (
              <div key={idx} className="bg-white p-3.5 sm:p-4 border border-slate-200 hover:border-emerald-200 transition-colors rounded-lg">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider leading-[1.4]">{phase.stage}</h4>
                  <span className="text-xs font-mono font-bold text-slate-400 leading-[1.4]">{phase.step}</span>
                </div>
                <p className="text-sm text-slate-600 font-normal leading-[1.6]">{phase.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OPTIMIZATION FRAMEWORKS */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-wider border-l-4 border-emerald-600 pl-2.5 leading-[1.4]">Optimization Frameworks</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-3">
            {(sections.roi || []).map((group, idx) => (
              <div key={idx} className="bg-white p-3.5 sm:p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-8 h-8 bg-emerald-50 flex items-center justify-center text-base text-emerald-600 rounded-md shrink-0"><IoFlashOutline /></div>
                  <h3 className="text-base font-bold text-slate-900 uppercase leading-[1.3]">{group.group}</h3>
                </div>
                <ul className="space-y-1.5">
                  {group.items?.map(item => (
                    <li key={item} className="flex items-center gap-2 text-slate-600 text-xs font-semibold uppercase tracking-wider leading-[1.4]">
                      <IoCheckmarkCircleOutline className="text-emerald-500 text-base shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA RIBBON */}
        <div className="text-center py-5 border-t border-slate-200">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 leading-[1.3]">
            {cta.title?.includes('your ') ? (
              <>
                {cta.title.split('your ')[0]}your{" "}
                <span className="text-emerald-600">
                  {cta.title.split('your ')[1]}
                </span>
              </>
            ) : (
              <>
                Ready to activate your{" "}
                <span className="text-emerald-600">
                  {cta.title}
                </span>
              </>
            )}
          </h3>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <button className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-sm uppercase tracking-wider text-xs flex items-center justify-center leading-[1.4] rounded-md">
              Initialize Performance Audit
            </button>
            <Link
              href="/freelancing"
              className="w-full sm:w-[220px] min-h-[42px] px-4 py-2.5 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors uppercase tracking-wider text-xs flex items-center justify-center text-center leading-[1.4] rounded-md"
            >
              Hire Student Talent
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 w-full p-3 bg-white/95 border-t border-slate-200 z-50 md:hidden flex items-center justify-between pb-[max(0.75rem,env(safe-area-inset-bottom))] mt-auto">
         <div className="flex flex-col">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-[1.4]">Ready?</p>
            <p className="text-slate-900 font-bold text-sm leading-[1.4]">Start Scaling</p>
         </div>
         <button className="px-4 py-2.5 min-h-[42px] bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider leading-[1.4] flex items-center justify-center rounded-md">
            Initialize Audit
         </button>
      </div>
    </section>
  );
}
