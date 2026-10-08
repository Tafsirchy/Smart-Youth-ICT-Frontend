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
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-slate-50 font-sans border-y border-slate-200">
      <div className="container-custom px-4 sm:px-6 md:px-12 relative z-10">
        <div className="relative border border-slate-200 bg-white p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10 hover:border-slate-900 transition-colors">
          
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-2xl flex-1">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-slate-200 bg-slate-50 text-slate-900 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-slate-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-slate-900" />
              </span>
              Upcoming Free Event • 100% Free
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 leading-[1.1] tracking-tight mb-4">
              Unlock Your <span className="font-medium">IT Career & Freelancing Journey.</span>
            </h2>

            <p className="text-base text-slate-500 font-light leading-relaxed mb-8">
              Connect live with senior industry mentors. Learn step-by-step how to master Web Dev, Digital Marketing, Graphic Design & AI tools — completely free on Zoom.
            </p>

            {/* Meta details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2">
                <IoCalendarOutline size={16} className="text-slate-900" /> Every Saturday
              </span>
              <span className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2">
                <IoTimeOutline size={16} className="text-slate-900" /> 10:00 AM – 12:00 PM
              </span>
              <span className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2">
                <IoVideocamOutline size={16} className="text-slate-900" /> Live on Zoom
              </span>
              <span className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2">
                <IoCheckmarkCircle size={16} className="text-slate-900" /> Certificate Included
              </span>
            </div>
          </div>

          {/* Right CTA */}
          <div className="shrink-0 flex flex-col items-center lg:items-end gap-4 w-full lg:w-auto">
            <Link
              href="/seminar"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white font-medium text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors border border-slate-900"
            >
              <span>Book Free Seat Now</span>
              <IoArrowForward size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Limited 100 Seats • No Login Required
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
