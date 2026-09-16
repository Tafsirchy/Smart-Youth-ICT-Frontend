"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  IoHomeOutline,
  IoSchoolOutline,
  IoCalendarOutline,
  IoLogoWhatsapp,
  IoArrowForwardOutline,
  IoSearchOutline,
  IoCompassOutline,
} from "react-icons/io5";

export default function NotFoundContent() {
  const pathname = usePathname() || "";
  const localeMatch = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(?=\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  const prefix = locale === "bn" ? "/bn" : "/en";

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hi Smart Youth ICT, I tried visiting ${pathname || "a page"} but got a 404 error. Could you help me find what I was looking for?`
  )}`;

  const quickLinks = [
    {
      title: "Free Career Seminar",
      titleBn: "ফ্রি ক্যারিয়ার সেমিনার",
      desc: "Live Zoom session every Saturday",
      descBn: "প্রতি শনিবার সরাসরি জুম সেশন",
      href: `${prefix}/seminar`,
      icon: IoCalendarOutline,
      tag: "100% Free",
      color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30",
    },
    {
      title: "Explore Courses",
      titleBn: "সবগুলো কোর্স দেখুন",
      desc: "Web Dev, Design, Marketing & AI",
      descBn: "ওয়েব, গ্রাফিক্স, মার্কেটিং ও এআই",
      href: `${prefix}/courses`,
      icon: IoSchoolOutline,
      tag: "Popular",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      title: "Success Stories",
      titleBn: "সফলতার গল্প",
      desc: "Student earnings & proof",
      descBn: "শিক্ষার্থীদের বাস্তব ইনকাম ও রিভিউ",
      href: `${prefix}/success-stories`,
      icon: IoCompassOutline,
      tag: "Proof",
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
    },
    {
      title: "Our Branches",
      titleBn: "ক্যাম্পাস ও শাখাসমূহ",
      desc: "Find nearest physical center",
      descBn: "নিকটস্থ ট্রেইনিং ক্যাম্পাস খুঁজুন",
      href: `${prefix}/branches`,
      icon: IoSearchOutline,
      tag: "Locations",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col justify-between relative overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Ambience & Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />

      {/* Top Bar / Logo */}
      <header className="relative z-20 w-full container-custom py-6 px-4 flex items-center justify-between">
        <Link href={prefix} className="flex items-center gap-3 group">
          <div className="bg-white/90 rounded-xl p-2 shadow-lg backdrop-blur-md group-hover:scale-105 transition-transform">
            <Image
              src="/images/logo.png"
              alt="Smart Youth ICT"
              width={160}
              height={45}
              priority
              className="h-9 w-auto object-contain"
              onError={(e) => {
                e.target.srcset = "";
                e.target.src = "/images/placeholder.png";
              }}
            />
          </div>
        </Link>

        <Link
          href={prefix}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all backdrop-blur-md"
        >
          <IoHomeOutline size={15} className="text-emerald-400" />
          <span>Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container-custom px-4 py-10 md:py-16 my-auto flex flex-col items-center text-center">
        {/* Animated 404 Glitch / Aura Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          {/* Subtle pulsating outer ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse" />

          <div className="relative px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl text-emerald-400 font-mono text-xs font-black tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Error 404 • Destination Offline</span>
          </div>
        </motion.div>

        {/* 404 Big Numbers */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 leading-none select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          Lost in the Digital Ecosystem?
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 text-sm sm:text-base md:text-lg text-slate-400 max-w-xl font-medium leading-relaxed"
        >
          The page you are looking for might have been moved, renamed, or deleted from{" "}
          <strong className="text-emerald-400 font-bold">Smart Youth ICT</strong>. Don't worry, our career pathways are always active!
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <Link
            href={prefix}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <IoHomeOutline size={18} />
            <span>Back to Homepage</span>
          </Link>

          <Link
            href={`${prefix}/seminar`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 text-rose-300 hover:text-white font-bold text-sm backdrop-blur-md transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Join Free Seminar</span>
            <IoArrowForwardOutline size={16} />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 font-bold text-sm backdrop-blur-md transition-all"
          >
            <IoLogoWhatsapp size={18} />
            <span>WhatsApp Support</span>
          </a>
        </motion.div>

        {/* Quick Recommended Destinations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 w-full max-w-4xl"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-white/10" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              Popular Destinations You Can Visit
            </p>
            <span className="h-px w-8 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group relative flex flex-col items-start p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all text-left overflow-hidden shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center bg-gradient-to-br ${item.color}`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <p className="font-extrabold text-sm text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                    {item.desc}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
                    <span>Visit Page</span>
                    <IoArrowForwardOutline size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </main>

      {/* Footer / Copyright */}
      <footer className="relative z-10 w-full py-6 text-center text-xs font-medium text-slate-400 border-t border-white/5">
        <div className="container-custom px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Smart Youth ICT. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <Link href={`${prefix}/courses`} className="hover:text-slate-200 transition-colors">Courses</Link>
            <Link href={`${prefix}/seminar`} className="hover:text-slate-200 transition-colors">Free Seminar</Link>
            <Link href={`${prefix}/contact`} className="hover:text-slate-200 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
