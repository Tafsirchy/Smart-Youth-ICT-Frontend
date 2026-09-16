"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoHomeOutline, IoSchoolOutline, IoLogoWhatsapp } from "react-icons/io5";

export default function NotFoundContent() {
  const pathname = usePathname() || "";
  const localeMatch = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(?=\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  const prefix = locale === "bn" ? "/bn" : "/en";

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hi Smart Youth ICT, I visited ${pathname || "a page"} but got a 404. Could you assist me?`
  )}`;

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center bg-white text-slate-800 px-4 py-6 md:py-8 overflow-hidden">
      {/* Top Bar — Logo */}
      <header className="w-full max-w-5xl flex items-center justify-between">
        <Link href={prefix} className="inline-block hover:opacity-85 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="Smart Youth ICT"
            width={170}
            height={48}
            priority
            className="h-10 sm:h-11 w-auto object-contain"
            onError={(e) => {
              e.target.srcset = "";
              e.target.src = "/images/placeholder.png";
            }}
          />
        </Link>
        <Link
          href={prefix}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5"
        >
          <IoHomeOutline size={15} />
          <span>Home</span>
        </Link>
      </header>

      {/* Center Hero — Minimal & Clean */}
      <main className="w-full max-w-lg text-center flex flex-col items-center my-auto">
        {/* Subtle Badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-4">
          404 Error
        </span>

        {/* Big Minimal Number */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-slate-900 tracking-tight leading-none select-none">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Page not found
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-sm">
          Sorry, we couldn’t find the page you’re looking for. It may have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            href={prefix}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm active:scale-98"
          >
            <IoHomeOutline size={16} />
            <span>Go to Homepage</span>
          </Link>

          <Link
            href={`${prefix}/courses`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all active:scale-98"
          >
            <IoSchoolOutline size={16} />
            <span>Browse Courses</span>
          </Link>
        </div>

        {/* WhatsApp Help */}
        <div className="mt-5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <IoLogoWhatsapp size={15} />
            <span>Need help? Chat on WhatsApp</span>
          </a>
        </div>
      </main>

      {/* Bottom Footer — Minimal Single-line */}
      <footer className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4 gap-2">
        <p>© {new Date().getFullYear()} Smart Youth ICT. All rights reserved.</p>
        <div className="flex items-center gap-4 text-slate-500">
          <Link href={`${prefix}/courses`} className="hover:text-slate-800 transition-colors">Courses</Link>
          <Link href={`${prefix}/seminar`} className="hover:text-slate-800 transition-colors">Free Seminar</Link>
          <Link href={`${prefix}/contact`} className="hover:text-slate-800 transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
