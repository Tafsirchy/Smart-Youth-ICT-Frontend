"use client";

import React from "react";
import Link from "next/link";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoVideocamOutline,
  IoArrowForward,
  IoSparkles,
  IoSchoolOutline,
} from "react-icons/io5";

export default function UpcomingSeminarStrip() {
  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white font-sans border-y border-slate-200/80">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom px-4 sm:px-6 md:px-12 relative z-10">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-200/40 flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-brand-pink/30 hover:shadow-xl transition-all duration-300">
          
          {/* Top subtle highlight gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink via-brand-accent to-brand-green" />

          {/* Left Content / Information */}
          <div className="text-center lg:text-left max-w-2xl flex-1">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-rose-200 bg-rose-50/80 text-rose-600 text-xs font-bold uppercase tracking-wider mb-4 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-rose-400 opacity-75 rounded-full" />
                <span className="relative inline-flex h-2 w-2 bg-rose-500 rounded-full" />
              </span>
              <span>Live Interactive Session • ১০০% ফ্রি সেমিনার</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-3">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-green">IT Career & Freelancing</span> Journey
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
              Connect live with industry mentors. Learn step-by-step how to master Web Dev, Graphic Design, Digital Marketing & AI tools — completely free on Zoom.
            </p>

            {/* Quick Details Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                <IoCalendarOutline size={15} className="text-brand-pink" /> Every Saturday
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                <IoTimeOutline size={15} className="text-amber-500" /> 10:00 AM – 12:00 PM
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                <IoVideocamOutline size={15} className="text-sky-500" /> Live on Zoom
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 text-emerald-700 px-3 py-1.5 rounded-lg">
                <IoSchoolOutline size={15} className="text-emerald-600" /> Free Certificate
              </span>
            </div>
          </div>

          {/* Right CTA / Eye-Catching Free Seminar Button */}
          <div className="shrink-0 flex flex-col items-center lg:items-end w-full lg:w-auto">
            <Link
              href="/seminar"
              id="home-free-seminar-cta"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#FF2C6D] via-[#FF4D85] to-[#E11D48] text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-brand-pink/25 hover:shadow-2xl hover:shadow-brand-pink/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
            >
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              <IoSparkles className="text-yellow-300 text-xl shrink-0 animate-pulse" />

              <div className="flex flex-col items-start leading-tight">
                <div className="flex items-center gap-2">
                  <span className="tracking-tight">Free Seminar</span>
                  <span className="bg-white/25 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                    ১০০% ফ্রি
                  </span>
                </div>
                <span className="text-[11px] font-normal text-rose-100/90 tracking-normal mt-0.5">
                  ফ্রি সেমিনারে যুক্ত হোন • Book Free Seat
                </span>
              </div>

              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white group-hover:text-brand-pink text-white transition-all ml-1 shrink-0">
                <IoArrowForward size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* Urgency & Trust Microcopy */}
            <p className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Limited 100 Seats • No Login or Payment Required</span>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

