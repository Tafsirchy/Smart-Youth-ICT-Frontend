"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import {
  IoReceiptOutline,
  IoPeopleOutline,
  IoIdCardOutline,
  IoCubeOutline,
  IoPulseOutline,
  IoShieldCheckmarkOutline,
  IoMedkitOutline,
  IoRocketOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle,
  IoSchoolOutline,
  IoWifiOutline,
  IoCalendarOutline,
} from "react-icons/io5";

// 9 Official Ready-to-Deploy Enterprise Software Suites
const DEFAULT_ERPS = [
  {
    _id: "erp-1",
    brandName: "SMART HR",
    title: "Smart HR",
    category: "Attendance, HR, Payroll & Accounts",
    features: [
      "Biometric Attendance Sync",
      "Auto Salary & Tax Deduction",
      "Sprint Project Task Boards",
    ],
    badgeColor: "indigo",
    tag: "Workforce ERP",
    demoUrl: "/contact?service=smart-hr",
    order: 1,
  },
  {
    _id: "erp-2",
    brandName: "SMART POS",
    title: "Smart POS",
    category: "POS, Stock, HRM & Accounts",
    features: [
      "Multi-Register Barcode Billing",
      "Multi-Branch Stock Sync",
      "Integrated Accounts & HRM",
    ],
    badgeColor: "emerald",
    tag: "Retail & Multi-Store",
    demoUrl: "/contact?service=smart-pos",
    order: 2,
  },
  {
    _id: "erp-3",
    brandName: "SMART EIMS",
    title: "Smart EIMS (ERP)",
    category: "School, College & Institute Management",
    features: [
      "Student Admission & Fee Collection",
      "Automated Exams & Marksheets",
      "Parent SMS & Routine Portal",
    ],
    badgeColor: "blue",
    tag: "Education ERP",
    demoUrl: "/contact?service=smart-eims",
    order: 3,
  },
  {
    _id: "erp-4",
    brandName: "SMART PHARMACY",
    title: "Smart Pharmacy",
    category: "Medical & Medicine Store System",
    features: [
      "Drug Batch & Expiry Tracking",
      "Wholesale & Counter Billing",
      "Generic Group Medicine Search",
    ],
    badgeColor: "teal",
    tag: "Pharma Suite",
    demoUrl: "/contact?service=smart-pharmacy",
    order: 4,
  },
  {
    _id: "erp-5",
    brandName: "SMART HSM",
    title: "Smart HSM",
    category: "Hospital & Diagnostic Care (ERP)",
    features: [
      "IPD / OPD Patient Admissions",
      "Pathology Lab Test Reporting",
      "Bed, Ward & Doctor Duty Desk",
    ],
    badgeColor: "red",
    tag: "Hospital ERP",
    demoUrl: "/contact?service=smart-hsm",
    order: 5,
  },
  {
    _id: "erp-6",
    brandName: "SMART RX",
    title: "Multi-Doctor Appointment & eRx",
    category: "Telehealth & Chamber Suite + Website",
    features: [
      "Real-time Slot Booking Portal",
      "Digital e-Prescription Engine",
      "Doctor Profile Frontend Website",
    ],
    badgeColor: "cyan",
    tag: "Chamber & Telehealth",
    demoUrl: "/contact?service=smart-doctor",
    order: 6,
  },
  {
    _id: "erp-7",
    brandName: "SMART FIN",
    title: "Smart FIN",
    category: "Co-operative, NGO & Loan Management",
    features: [
      "Member Savings & Deposit Book",
      "Installment Amortization Tables",
      "Automated Penalty & Dividends",
    ],
    badgeColor: "violet",
    tag: "Microfinance",
    demoUrl: "/contact?service=smart-fin",
    order: 7,
  },
  {
    _id: "erp-8",
    brandName: "SMART ISP",
    title: "Smart ISP Management",
    category: "Real-time Mikrotik & PPPoE Auto Sync",
    features: [
      "Real-Time Mikrotik Router Sync",
      "PPPoE Auto-Disconnect on Expiry",
      "SMS Billing Alerts & Resellers",
    ],
    badgeColor: "amber",
    tag: "Mikrotik ISP",
    demoUrl: "/contact?service=smart-isp",
    order: 8,
  },
  {
    _id: "erp-9",
    brandName: "SMART SCM",
    title: "Supply Chain ERP",
    category: "Supply Chain & Multi-Warehouse ERP",
    features: [
      "Vendor Purchase Orders & RFQ",
      "Multi-Warehouse Stock Routing",
      "Demand Forecast & Fleet Logistics",
    ],
    badgeColor: "emerald",
    tag: "Enterprise SCM",
    demoUrl: "/contact?service=smart-scm",
    order: 9,
  },
];

function getERPIcon(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("hr") || t.includes("payroll"))
    return <IoPeopleOutline size={20} />;
  if (t.includes("pos") || t.includes("inventory"))
    return <IoReceiptOutline size={20} />;
  if (
    t.includes("eims") ||
    t.includes("school") ||
    t.includes("institute") ||
    t.includes("college")
  )
    return <IoSchoolOutline size={20} />;
  if (t.includes("pharmacy") || t.includes("medicine"))
    return <IoMedkitOutline size={20} />;
  if (t.includes("hsm") || t.includes("hospital") || t.includes("clinic"))
    return <IoPulseOutline size={20} />;
  if (
    t.includes("doctor") ||
    t.includes("appointment") ||
    t.includes("prescription") ||
    t.includes("rx")
  )
    return <IoCalendarOutline size={20} />;
  if (
    t.includes("fin") ||
    t.includes("loan") ||
    t.includes("co-op") ||
    t.includes("ngo")
  )
    return <IoShieldCheckmarkOutline size={20} />;
  if (t.includes("isp") || t.includes("mikrotik") || t.includes("pppoe"))
    return <IoWifiOutline size={20} />;
  if (t.includes("supply") || t.includes("scm") || t.includes("chain"))
    return <IoCubeOutline size={20} />;
  return <IoCubeOutline size={20} />;
}

function getIconTheme(color) {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-600 border-blue-200 group-hover/card:bg-blue-600 group-hover/card:text-white";
    case "indigo":
      return "bg-indigo-50 text-indigo-600 border-indigo-200 group-hover/card:bg-indigo-600 group-hover/card:text-white";
    case "teal":
      return "bg-teal-50 text-teal-600 border-teal-200 group-hover/card:bg-teal-600 group-hover/card:text-white";
    case "amber":
    case "orange":
      return "bg-amber-50 text-amber-700 border-amber-200 group-hover/card:bg-amber-600 group-hover/card:text-white";
    case "rose":
    case "red":
      return "bg-rose-50 text-rose-600 border-rose-200 group-hover/card:bg-rose-600 group-hover/card:text-white";
    case "violet":
      return "bg-purple-50 text-purple-600 border-purple-200 group-hover/card:bg-purple-600 group-hover/card:text-white";
    default:
      return "bg-emerald-50 text-emerald-600 border-emerald-200 group-hover/card:bg-emerald-600 group-hover/card:text-white";
  }
}

function getBrandName(item) {
  if (item.brandName) return item.brandName;
  const t = (item.title || "").toUpperCase();
  if (t.includes("HR")) return "SMART HR";
  if (t.includes("POS")) return "SMART POS";
  if (t.includes("EIMS") || t.includes("SCHOOL")) return "SMART EIMS";
  if (t.includes("PHARMACY")) return "SMART PHARMACY";
  if (t.includes("HSM") || t.includes("HOSPITAL")) return "SMART HSM";
  if (t.includes("DOCTOR") || t.includes("PRESCRIPTION")) return "SMART RX";
  if (t.includes("FIN") || t.includes("LOAN")) return "SMART FIN";
  if (t.includes("ISP") || t.includes("MIKROTIK")) return "SMART ISP";
  if (t.includes("SUPPLY") || t.includes("SCM")) return "SMART SCM";
  return t;
}

/**
 * ─── STAGGERED COLUMN ITEM ──────────────────────────────────────────────
 * Mimics testimonials-13.tsx:
 * Column 1: Card Top (225px) / Logo Bottom (225px)
 * Column 2: Logo Top (225px) / Card Bottom (225px)
 * Total height per column: exact 450px.
 * Result: Calming checkerboard mosaic with visual negative space and zero stress!
 */
function StaggeredERPItem({ item, isFlipped }) {
  const iconTheme = getIconTheme(item.badgeColor);
  const brandName = getBrandName(item);
  const features =
    Array.isArray(item.features) && item.features.length > 0
      ? item.features
      : item.description
        ? [item.description]
        : ["Dedicated Cloud Hosting", "Role-Based Security"];

  return (
    <div
      className={`flex w-[340px] sm:w-[380px] shrink-0 ${isFlipped ? "flex-col-reverse" : "flex-col"} select-none`}
    >
      {/* ── CARD MODULE (H: 225px sm:230px - Centered Content + 3D Pop on Hover) ── */}
      <div className="m-2 sm:m-2.5 h-[225px] sm:h-[230px] rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 ease-out hover:scale-[1.06] hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/25 hover:border-emerald-500 hover:z-30 group/card relative z-10 flex flex-col justify-between items-center text-center cursor-pointer">
        {/* Top Header & Info */}
        <div className="w-full flex flex-col items-center">
          {/* Centered Icon with subtle pulse status badge */}
          <div className="relative mb-2">
            <div
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${iconTheme}`}
            >
              {getERPIcon(item.title)}
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white" />
            </span>
          </div>

          {/* Centered Title - Larger Text Size */}
          <h3 className="text-base sm:text-[17px] font-black text-slate-900 group-hover/card:text-emerald-600 transition-colors leading-snug truncate max-w-full px-1">
            {item.title}
          </h3>

          {/* Centered Category Pill - Larger Text Size */}
          <div className="mt-1.5 mb-2.5">
            <span className="inline-block px-3 py-1 rounded-md bg-slate-100/90 border border-slate-200/80 text-xs sm:text-[12.5px] font-bold text-slate-700 tracking-wide">
              {item.category || "Enterprise Suite"}
            </span>
          </div>

          {/* Centered Bullet Points - Larger Text Size */}
          <div className="w-full space-y-1.5">
            {features.slice(0, 2).map((feat, fIdx) => (
              <div
                key={fIdx}
                className="flex items-center justify-center gap-1.5 text-xs sm:text-[13px] text-slate-700 font-semibold leading-tight"
              >
                <IoCheckmarkCircle
                  className="text-emerald-500 shrink-0"
                  size={14}
                />
                <span className="truncate max-w-[270px]">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Bottom CTA - Larger Text Size */}
        <div className="w-full flex items-center justify-center pt-2.5 border-t border-slate-100">
          <Link
            href={item.demoUrl || "/contact?service=erp"}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
          >
            <span>Live Demo</span>
            <IoArrowForwardOutline
              size={14}
              className="group-hover/card:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* ── CLEAN LOGO BLOCK (H: 225px sm:230px - Gentle Zoom In-Out Animation) ── */}
      <div className="relative flex h-[225px] sm:h-[230px] w-full items-center justify-center p-6 overflow-hidden">
        {/* Seamless Clean Logo Wordmark with zoom in/out pulse animation */}
        <div className="logo-zoom-pulse relative z-10 flex items-center justify-center gap-3 text-center px-4 group select-none">
          <div className="text-2xl sm:text-3xl text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
            {getERPIcon(item.title)}
          </div>
          <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-700 font-mono">
            {brandName}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ERPSoftwareStrip() {
  const [erpItems, setErpItems] = useState(DEFAULT_ERPS);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/cms/home-erp")
      .then((res) => {
        if (isMounted && res.data?.data && res.data.data.length > 0) {
          setErpItems(res.data.data);
        }
      })
      .catch(() => {
        // Fallback silently kept
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const list = erpItems && erpItems.length > 0 ? erpItems : DEFAULT_ERPS;

  // Build an even-length balanced cycle so A-B-A-B alternating rhythm never has adjacent duplicates
  const cycleLength = list.length % 2 === 0 ? list.length : list.length * 2;
  const singleCycle = Array.from(
    { length: cycleLength },
    (_, i) => list[i % list.length],
  );
  // Duplicate for mathematically seamless 0% -> -50% infinite continuous ticker (no restart jump)
  const combinedList = [...singleCycle, ...singleCycle];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAFDFB] via-white to-[#F8FAFC] py-14 sm:py-16 border-b border-slate-200/80 font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="container-custom px-4 sm:px-6 md:px-12 mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-widest rounded-full mb-3 shadow-xs">
          <IoRocketOutline className="text-emerald-600" size={14} />
          <span>9+ Production-Ready Software Systems</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight mb-3">
          Enterprise ERP &amp; Management <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
            Software Suite
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          From multi-counter retail POS and School EIMS to Mikrotik ISP billing
          and Hospital HSM — production-ready software suites engineered for
          high-volume transactions and seamless operations.
        </p>
      </div>

      {/* 100% Continuous Infinite Marquee Wrapper (No Restart / Zero Glitch + 3D Card Pop Room) */}
      <div className="relative border-y border-slate-200/90 bg-slate-50/50 py-5 sm:py-7 overflow-hidden group">
        <div className="marquee-continuous flex w-max motion-gpu group-hover:[animation-play-state:paused]">
          {combinedList.map((item, idx) => (
            <StaggeredERPItem
              key={`staggered-erp-${item._id || item.title}-${idx}`}
              item={item}
              isFlipped={idx % 2 !== 0}
            />
          ))}
        </div>

        {/* Smooth Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFDFB] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFDFB] to-transparent z-20" />
      </div>

      <style>{`
        @keyframes marqueeScrollERP {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-continuous {
          animation: marqueeScrollERP 120s linear infinite;
          will-change: transform;
        }

        @keyframes logoZoomPulse {
          0%, 100% {
            transform: scale(0.92);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }
        .logo-zoom-pulse {
          animation: logoZoomPulse 3.5s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
