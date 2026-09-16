"use client";

import React from "react";
import Link from "next/link";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoVideocamOutline,
  IoArrowForward,
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function UpcomingSeminarStrip() {
  return (
    <section className="relative w-full py-8 md:py-12 overflow-hidden bg-slate-950">
      {/* Background Neon Glows */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom px-4 sm:px-6 md:px-12 relative z-10">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/70 via-slate-900/90 to-purple-950/70 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            {/* Left Content */}
            <div className="text-center lg:text-left max-w-2xl">
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-widest mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                Upcoming Free Event • 100% Free
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                Unlock Your IT Career & Freelancing Journey
              </h2>

              <p className="mt-2.5 text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                Connect live with senior industry mentors. Learn step-by-step how to master Web Dev, Digital Marketing, Graphic Design & AI tools — completely free on Zoom.
              </p>

              {/* Meta details */}
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-indigo-200">
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <IoCalendarOutline size={15} className="text-rose-400" /> Every Saturday
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <IoTimeOutline size={15} className="text-amber-400" /> 10:00 AM – 12:00 PM
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <IoVideocamOutline size={16} className="text-cyan-400" /> Live on Zoom
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                  <IoCheckmarkCircle size={15} className="text-emerald-400" /> Certificate Included
                </span>
              </div>
            </div>

            {/* Right CTA */}
            <div className="shrink-0 flex flex-col items-center sm:items-end gap-2.5 w-full sm:w-auto">
              <Link
                href="/seminar"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-black text-base shadow-xl shadow-rose-500/20 hover:scale-[1.03] active:scale-95 transition-all"
              >
                <span>Book Free Seat Now</span>
                <IoArrowForward size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                ⚡ Limited 100 Seats per batch • No Login Required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
