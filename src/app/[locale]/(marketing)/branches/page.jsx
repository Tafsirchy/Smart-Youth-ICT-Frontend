import React, { Suspense } from 'react';
import BranchDirectory from '@/components/marketing/BranchDirectory';
import {
  IoBusinessOutline,
  IoDesktopOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

export const metadata = {
  title: 'Our Campuses & Learning Labs | Smart Youth ICT',
  description:
    'Find a Smart Youth ICT campus near you across Bangladesh. Explore state-of-the-art computer labs, offline cohorts, 1-on-1 mentorship, and high-speed fiber infrastructure.',
};

export default async function BranchesPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const initialDivision = resolvedSearchParams?.division || 'All';

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 pt-20 sm:pt-24 pb-8 font-sans selection:bg-blue-500/20">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-4 pb-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="container-custom text-center space-y-2.5">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Nationwide Presence • 13 Advanced Learning Centers</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            State-of-the-Art Campuses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#FF2C6D]">
              Across Bangladesh
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Step into our physical computer labs, practice in uninterrupted high-spec environments,
            and gain direct 1-on-1 mentorship from senior tech specialists in your city.
          </p>

          {/* Core Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-3xl mx-auto pt-1">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                <IoBusinessOutline size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">13 Campuses</p>
                <p className="text-[10px] text-slate-500 truncate">7 Major Divisions</p>
              </div>
            </div>

            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center shrink-0">
                <IoDesktopOutline size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">High-Spec Labs</p>
                <p className="text-[10px] text-slate-500 truncate">Gigabit Fiber & UPS</p>
              </div>
            </div>

            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                <IoPeopleOutline size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">In-Person Mentors</p>
                <p className="text-[10px] text-slate-500 truncate">Daily Problem Solving</p>
              </div>
            </div>

            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-[#FF2C6D] flex items-center justify-center shrink-0">
                <IoShieldCheckmarkOutline size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Free Visit Tour</p>
                <p className="text-[10px] text-slate-500 truncate">Walk-In Counseling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Campuses Directory & Map ── */}
      <Suspense
        fallback={
          <div className="container-custom py-16 text-center">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent animate-spin rounded-full mx-auto mb-3"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Connecting with Campuses...
            </p>
          </div>
        }
      >
        <BranchDirectory locale={locale} initialDivision={initialDivision} />
      </Suspense>
    </div>
  );
}
