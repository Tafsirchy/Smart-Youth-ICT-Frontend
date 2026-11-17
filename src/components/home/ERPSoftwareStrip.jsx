"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Marquee } from "@/components/ui/marquee";
import {
  IoReceiptOutline,
  IoPeopleOutline,
  IoIdCardOutline,
  IoCubeOutline,
  IoCardOutline,
  IoCartOutline,
  IoPulseOutline,
  IoBriefcaseOutline,
  IoTimeOutline,
  IoRestaurantOutline,
  IoHeartOutline,
  IoShieldCheckmarkOutline,
  IoMedkitOutline,
  IoRocketOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle
} from "react-icons/io5";

// 13 Production Ready Fallbacks
const DEFAULT_ERPS = [
  {
    _id: "erp-1",
    sysCode: "SYS://POS-01",
    brandName: "VENTURE POS",
    title: "POS System",
    category: "Retail & Counter Billing",
    features: ["Barcode Scanning & Billing", "Thermal Receipt Printing", "Cash Drawer & Multi-Register"],
    badgeColor: "emerald",
    tag: "High Velocity",
    demoUrl: "/contact?service=erp-pos",
    order: 1
  },
  {
    _id: "erp-2",
    sysCode: "SYS://CRM-02",
    brandName: "NEXUS CRM",
    title: "CRM System",
    category: "Sales & Client Pipeline",
    features: ["Lead Pipeline Tracking", "Omnichannel 360 Client View", "Automated Follow-up Tasks"],
    badgeColor: "blue",
    tag: "Conversion",
    demoUrl: "/contact?service=erp-crm",
    order: 2
  },
  {
    _id: "erp-3",
    sysCode: "SYS://HR-03",
    brandName: "TALENT HR",
    title: "HR-Payroll & Accounts",
    category: "Workforce & Financial Ledger",
    features: ["Biometric Attendance Sync", "Auto Tax & PF Deduction", "Double-Entry Corporate Ledger"],
    badgeColor: "indigo",
    tag: "Enterprise",
    demoUrl: "/contact?service=erp-hr",
    order: 3
  },
  {
    _id: "erp-4",
    sysCode: "SYS://INV-04",
    brandName: "OMNI STOCK",
    title: "Stock Inventory & POS",
    category: "Warehouse & Supply Chain",
    features: ["Multi-Branch Warehouse Sync", "Low-Stock Reorder Triggers", "Batch & Expiry Date Audit"],
    badgeColor: "teal",
    tag: "Multi-Store",
    demoUrl: "/contact?service=erp-inventory",
    order: 4
  },
  {
    _id: "erp-5",
    sysCode: "SYS://BIL-05",
    brandName: "LEDGER FLOW",
    title: "Billing & Invoicing",
    category: "Fiscal Operations & SaaS",
    features: ["Multi-Currency Client Invoicing", "Auto Recurring Subscriptions", "Government VAT & Tax Reports"],
    badgeColor: "emerald",
    tag: "Automated",
    demoUrl: "/contact?service=erp-billing",
    order: 5
  },
  {
    _id: "erp-6",
    sysCode: "SYS://ORD-06",
    brandName: "DISPATCH PRO",
    title: "Order Management",
    category: "E-Commerce Fulfillment",
    features: ["Omnichannel Order Dispatch", "Courier API Webhook Tracking", "Live Delivery Status Updates"],
    badgeColor: "amber",
    tag: "Fulfillment",
    demoUrl: "/contact?service=erp-order",
    order: 6
  },
  {
    _id: "erp-7",
    sysCode: "SYS://DOC-07",
    brandName: "MEDICORE",
    title: "Doctor Appointment",
    category: "Healthcare & Chamber",
    features: ["Doctor Chamber Schedules", "Real-Time Patient Slot Booking", "Digital Prescription Pad"],
    badgeColor: "cyan",
    tag: "Medical Suite",
    demoUrl: "/contact?service=erp-doctor",
    order: 7
  },
  {
    _id: "erp-8",
    sysCode: "SYS://PRJ-08",
    brandName: "AGILE SPRINT",
    title: "CRM & Project Management",
    category: "Agency Operations",
    features: ["Kanban Sprint Task Boards", "Client Milestone Access Portal", "Staff Billable Timesheets"],
    badgeColor: "violet",
    tag: "Agile Ready",
    demoUrl: "/contact?service=erp-pm",
    order: 8
  },
  {
    _id: "erp-9",
    sysCode: "SYS://QUE-09",
    brandName: "QUEUE FLOW",
    title: "Token & Queue Management",
    category: "Smart Footfall Routing",
    features: ["Counter TV Display Calling", "Multi-Department Ticketing", "SMS Instant Token Alerts"],
    badgeColor: "rose",
    tag: "Smart Queue",
    demoUrl: "/contact?service=erp-queue",
    order: 9
  },
  {
    _id: "erp-10",
    sysCode: "SYS://RES-10",
    brandName: "CHEF MATRIX",
    title: "Restaurant & Food",
    category: "Hospitality & Dine-in",
    features: ["Kitchen Display System (KDS)", "Table QR Digital Ordering", "Raw Recipe Costing & POS"],
    badgeColor: "orange",
    tag: "Food & Bar",
    demoUrl: "/contact?service=erp-restaurant",
    order: 10
  },
  {
    _id: "erp-11",
    sysCode: "SYS://NGO-11",
    brandName: "HOPE IMPACT",
    title: "NGO Management System",
    category: "Non-Profit & Grants",
    features: ["Donor Relationship Tracking", "Microcredit Grant Disbursal", "Field Beneficiary Audits"],
    badgeColor: "emerald",
    tag: "Social Impact",
    demoUrl: "/contact?service=erp-ngo",
    order: 11
  },
  {
    _id: "erp-12",
    sysCode: "SYS://LOA-12",
    brandName: "CREDIT SYNC",
    title: "Co-operative Loan ERP",
    category: "Microfinance & Credit",
    features: ["Member Savings Ledger", "Installment Amortization Table", "Automated Penalty Calculation"],
    badgeColor: "blue",
    tag: "Banking Grade",
    demoUrl: "/contact?service=erp-loan",
    order: 12
  },
  {
    _id: "erp-13",
    sysCode: "SYS://HOS-13",
    brandName: "CARE HOSPITAL",
    title: "Clinic & Hospital ERP",
    category: "Hospital Operations",
    features: ["OPD / IPD Patient Admissions", "Pathology Lab Diagnostics", "Bed & Ward Occupancy Tracker"],
    badgeColor: "red",
    tag: "Complete ERP",
    demoUrl: "/contact?service=erp-hospital",
    order: 13
  }
];

function getERPIcon(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("pos")) return <IoReceiptOutline size={20} />;
  if (t.includes("hr") || t.includes("payroll")) return <IoIdCardOutline size={20} />;
  if (t.includes("inventory") || t.includes("stock")) return <IoCubeOutline size={20} />;
  if (t.includes("crm")) return <IoPeopleOutline size={20} />;
  if (t.includes("billing") || t.includes("invoice")) return <IoCardOutline size={20} />;
  if (t.includes("order")) return <IoCartOutline size={20} />;
  if (t.includes("doctor") || t.includes("appointment")) return <IoPulseOutline size={20} />;
  if (t.includes("project")) return <IoBriefcaseOutline size={20} />;
  if (t.includes("token") || t.includes("queue")) return <IoTimeOutline size={20} />;
  if (t.includes("restaurant") || t.includes("food")) return <IoRestaurantOutline size={20} />;
  if (t.includes("ngo")) return <IoHeartOutline size={20} />;
  if (t.includes("loan") || t.includes("co-op")) return <IoShieldCheckmarkOutline size={20} />;
  if (t.includes("hospital") || t.includes("clinic")) return <IoMedkitOutline size={20} />;
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
  if (t.includes("POS")) return "VENTURE POS";
  if (t.includes("CRM")) return "NEXUS CRM";
  if (t.includes("HR")) return "TALENT HR";
  if (t.includes("STOCK") || t.includes("INVENTORY")) return "OMNI STOCK";
  if (t.includes("BILLING")) return "LEDGER FLOW";
  if (t.includes("ORDER")) return "DISPATCH PRO";
  if (t.includes("DOCTOR")) return "MEDICORE";
  if (t.includes("PROJECT")) return "AGILE SPRINT";
  if (t.includes("TOKEN") || t.includes("QUEUE")) return "QUEUE FLOW";
  if (t.includes("RESTAURANT")) return "CHEF MATRIX";
  if (t.includes("NGO")) return "HOPE IMPACT";
  if (t.includes("LOAN")) return "CREDIT SYNC";
  if (t.includes("HOSPITAL")) return "CARE HOSPITAL";
  return t;
}

/**
 * ─── STAGGERED COLUMN ITEM ──────────────────────────────────────────────
 * Mimics testimonials-13.tsx:
 * Column 1: Card Top (210px) / Blueprint Logo Bottom (210px)
 * Column 2: Blueprint Logo Top (210px) / Card Bottom (210px)
 * Total height per column: exact 420px.
 * Result: Calming checkerboard mosaic with visual negative space and zero stress!
 */
function StaggeredERPItem({ item, index }) {
  const iconTheme = getIconTheme(item.badgeColor);
  const brandName = getBrandName(item);
  const features = Array.isArray(item.features) && item.features.length > 0
    ? item.features
    : item.description ? [item.description] : ["Dedicated Cloud Hosting", "Role-Based Security"];

  return (
    <div className="flex w-[340px] sm:w-[380px] shrink-0 flex-col odd:flex-col-reverse select-none">
      {/* ── CARD MODULE (H: 210px - Centered Content) ── */}
      <div className="m-2 sm:m-2.5 h-[210px] rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 group/card relative z-10 flex flex-col justify-between items-center text-center">
        {/* Top Header & Info */}
        <div className="w-full flex flex-col items-center">
          {/* Centered Icon with subtle pulse status badge */}
          <div className="relative mb-2">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${iconTheme}`}>
              {getERPIcon(item.title)}
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white" />
            </span>
          </div>

          {/* Centered Title */}
          <h3 className="text-sm font-extrabold text-slate-900 group-hover/card:text-emerald-600 transition-colors leading-tight truncate max-w-full px-2">
            {item.title}
          </h3>

          {/* Centered Category Pill */}
          <div className="mt-1.5 mb-2">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-[11px] font-bold text-slate-600">
              {item.category || "Enterprise Suite"}
            </span>
          </div>

          {/* Centered Bullet Points */}
          <div className="w-full space-y-1">
            {features.slice(0, 2).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium">
                <IoCheckmarkCircle className="text-emerald-500 shrink-0" size={13} />
                <span className="truncate max-w-[260px]">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Bottom CTA */}
        <div className="w-full flex items-center justify-center pt-2.5 border-t border-slate-100">
          <Link
            href={item.demoUrl || "/contact?service=erp"}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
          >
            <span>Live Demo</span>
            <IoArrowForwardOutline size={12} className="group-hover/card:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── CLEAN LOGO BLOCK (H: 210px - Minimalist Restful Space) ── */}
      <div className="relative flex h-[210px] w-full items-center justify-center p-6 overflow-hidden">
        {/* Seamless Clean Logo Wordmark like kanba / amara / hexa */}
        <div className="relative z-10 flex items-center justify-center gap-3 text-center px-4 group select-none">
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

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAFDFB] via-white to-[#F8FAFC] py-14 sm:py-16 border-b border-slate-200/80 font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="container-custom px-4 sm:px-6 md:px-12 mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-widest rounded-full mb-3 shadow-xs">
          <IoRocketOutline className="text-emerald-600" size={14} />
          <span>13+ Ready-to-Deploy Enterprise Solutions</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight mb-3">
          Enterprise ERP &amp; Management{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
            Software Suite
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          From multi-counter retail POS to 500-bed hospital clinical ERPs — production-ready software suites engineered for high-volume transactions and seamless digital operations.
        </p>
      </div>

      {/* Staggered Alternating Marquee Wrapper */}
      <div className="relative border-y border-slate-200/90 bg-slate-50/50 py-0 overflow-hidden">
        <Marquee className="py-0 [--duration:100s] [--gap:0px]" pauseOnHover repeat={4}>
          {list.map((item, idx) => (
            <StaggeredERPItem
              key={`staggered-erp-${item._id || item.title}-${idx}`}
              item={item}
              index={idx}
            />
          ))}
        </Marquee>

        {/* Smooth Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFDFB] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFDFB] to-transparent z-20" />
      </div>
    </section>
  );
}
