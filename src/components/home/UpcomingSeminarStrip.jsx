"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoVideocamOutline,
  IoArrowForward,
  IoSparkles,
  IoSchoolOutline,
  IoTicketOutline,
  IoLocationOutline,
  IoFlameOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoHourglassOutline,
} from "react-icons/io5";
import api from "@/lib/api";

// Computes target timestamp for dynamic countdown timer
function getTargetTime(seminarDate) {
  if (seminarDate && !isNaN(Date.parse(seminarDate))) {
    const d = new Date(seminarDate);
    if (d.getHours() === 0 && d.getMinutes() === 0) {
      d.setHours(11, 0, 0, 0);
    }
    if (d.getTime() > Date.now()) return d.getTime();
  }
  // Default: Upcoming Saturday at 11:00 AM
  const now = new Date();
  const day = now.getDay();
  let diff = (6 - day + 7) % 7;
  if (diff === 0 && (now.getHours() > 11 || (now.getHours() === 11 && now.getMinutes() > 0))) {
    diff = 7;
  }
  const nextSat = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, 11, 0, 0);
  return nextSat.getTime();
}

export default function UpcomingSeminarStrip() {
  const [visible, setVisible] = useState(true);
  const [latestSeminar, setLatestSeminar] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // 1. Check strip visibility setting
    api
      .get("/cms/settings/seminarStripVisible")
      .then((res) => {
        const val = res.data?.data;
        setVisible(val === false ? false : true);
      })
      .catch(() => setVisible(true));

    // 2. Fetch latest upcoming or featured seminar
    api
      .get("/seminars", { params: { status: "upcoming", limit: 1 } })
      .then((res) => {
        if (res.data?.success && res.data.data?.length > 0) {
          setLatestSeminar(res.data.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  // Live countdown timer ticker
  useEffect(() => {
    const target = getTargetTime(latestSeminar?.date);
    const updateCountdown = () => {
      const diff = Math.max(0, target - Date.now());
      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [latestSeminar]);

  // Don't render if explicitly disabled
  if (!visible) return null;

  return (
    <section className="relative w-full py-6 sm:py-8 md:py-10 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] font-sans border-b border-slate-200/80 overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* ── VIP TICKET PASS CONTAINER ── */}
        <motion.div
          initial={{ opacity: 0, y: 38, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row items-stretch"
        >
          
          {/* Top Decorative Color Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 z-20" />

          {/* ── LEFT TICKET BODY: DETAILS & SOCIAL PROOF ── */}
          <div className="p-4 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
            <div>
              {/* Header Badge Row */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                {/* Live Pulse Indicator */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-[11px] font-black uppercase tracking-wider rounded-full shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75 rounded-full" />
                    <span className="relative inline-flex h-2 w-2 bg-emerald-600 rounded-full" />
                  </span>
                  <span>Free Career Seminar</span>
                </div>

                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full border border-slate-200/80">
                  {latestSeminar?.mode === "online"
                    ? "💻 Online Live (Zoom)"
                    : latestSeminar?.mode === "hybrid"
                    ? "🏢 Campus + Online Live"
                    : "🏢 Regional Campus Session"}
                </span>

                <span className="text-[11px] font-extrabold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                  100% Free
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight mb-2">
                {latestSeminar?.title || (
                  <>
                    Industrial Full-Stack &amp;{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                      Applied AI Career Roadmap
                    </span>
                  </>
                )}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal mb-4">
                {latestSeminar?.description ||
                  "Connect live with industry leads. Discover production engineering workflows, remote freelance marketplaces, and step-by-step career guidelines."}
              </p>

              {/* Event Metadata Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/90 rounded-xl">
                  <IoCalendarOutline size={14} className="text-emerald-600 shrink-0" />
                  <span>{latestSeminar?.date || "This Coming Saturday"}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/90 rounded-xl">
                  <IoTimeOutline size={14} className="text-amber-500 shrink-0" />
                  <span>{latestSeminar?.time || "11:00 AM – 01:00 PM"}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/90 rounded-xl">
                  <IoLocationOutline size={14} className="text-teal-600 shrink-0" />
                  <span className="truncate max-w-[200px]">
                    {latestSeminar?.venue || "Smart Youth ICT Campus Auditorium"}
                  </span>
                </span>

                {latestSeminar?.speaker?.name && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-200/80 text-indigo-800 rounded-xl font-bold">
                    <IoPersonOutline size={13} className="text-indigo-600 shrink-0" />
                    <span>Host: {latestSeminar.speaker.name}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Social Proof Pill Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3.5 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] ring-2 ring-white">
                    S
                  </div>
                  <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px] ring-2 ring-white">
                    R
                  </div>
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] ring-2 ring-white">
                    A
                  </div>
                  <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px] font-black ring-2 ring-white">
                    +85
                  </div>
                </div>
                <span className="text-slate-700">
                  <strong className="text-slate-900">85+ Students</strong> already registered
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-rose-600 font-bold">
                <IoFlameOutline size={14} />
                <span>Limited Free Seats Remaining</span>
              </div>
            </div>
          </div>

          {/* ── TICKET NOTCH & PERFORATED DIVIDER ── */}
          {/* Vertical Cutout on Desktop / Large screens */}
          <div className="hidden lg:flex relative w-8 flex-col items-center justify-between py-1 bg-white">
            {/* Top Semicircle Cutout */}
            <div className="w-7 h-7 rounded-full bg-[#F8FAFC] border-b border-slate-300 -mt-4 shadow-inner" />
            
            {/* Perforated Dashed Line */}
            <div className="w-0 h-full border-r-2 border-dashed border-slate-200" />
            
            {/* Bottom Semicircle Cutout */}
            <div className="w-7 h-7 rounded-full bg-[#F8FAFC] border-t border-slate-300 -mb-4 shadow-inner" />
          </div>

          {/* Horizontal Cutout on Mobile / Tablet */}
          <div className="flex lg:hidden relative h-8 items-center justify-between px-1 bg-white">
            {/* Left Semicircle Cutout */}
            <div className="w-7 h-7 rounded-full bg-[#F8FAFC] border-r border-slate-300 -ml-4 shadow-inner" />
            
            {/* Perforated Dashed Line */}
            <div className="w-full h-0 border-b-2 border-dashed border-slate-200" />
            
            {/* Right Semicircle Cutout */}
            <div className="w-7 h-7 rounded-full bg-[#F8FAFC] border-l border-slate-300 -mr-4 shadow-inner" />
          </div>

          {/* ── RIGHT TICKET STUB: LIVE COUNTDOWN & FAST CTA ── */}
          <div className="p-4 sm:p-6 bg-slate-50/70 flex flex-col items-center justify-center text-center w-full lg:w-72 shrink-0">
            {/* Countdown Title */}
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              <IoHourglassOutline size={14} className="text-emerald-600 animate-pulse" />
              <span>Next Session Starts In</span>
            </div>

            {/* 4-Box Countdown Timer */}
            <div className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full max-w-[260px] mb-4">
              <div className="bg-white border border-slate-200 rounded-xl py-1.5 px-1 text-center shadow-xs">
                <span className="block text-lg sm:text-xl font-black text-slate-900 font-mono leading-tight">
                  {timeLeft.days}
                </span>
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Days
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl py-1.5 px-1 text-center shadow-xs">
                <span className="block text-lg sm:text-xl font-black text-slate-900 font-mono leading-tight">
                  {timeLeft.hours}
                </span>
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Hours
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl py-1.5 px-1 text-center shadow-xs">
                <span className="block text-lg sm:text-xl font-black text-slate-900 font-mono leading-tight">
                  {timeLeft.minutes}
                </span>
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Mins
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl py-1.5 px-1 text-center shadow-xs">
                <span className="block text-lg sm:text-xl font-black text-emerald-600 font-mono leading-tight">
                  {timeLeft.seconds}
                </span>
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Secs
                </span>
              </div>
            </div>

            {/* Main Action Button */}
            <Link
              href="/seminar"
              id="home-free-seminar-cta"
              className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <IoTicketOutline size={16} className="shrink-0" />
              <span>Book Free Seat</span>
              <IoArrowForward
                size={14}
                className="group-hover:translate-x-1 transition-transform shrink-0"
              />
            </Link>

            {/* Footnote Assurance */}
            <p className="text-[10px] font-semibold text-slate-400 mt-2">
              Instant Digital Pass • No Payment Needed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
