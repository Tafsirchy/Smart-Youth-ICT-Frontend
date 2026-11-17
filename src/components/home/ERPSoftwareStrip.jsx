"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
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

// Production fallback in case of fresh DB or offline state
const DEFAULT_ERPS = [
  { _id: "def-1", title: "POS System", category: "Retail & Billing", description: "Barcode scanning, thermal receipts & multi-counter checkout.", tag: "High Velocity", badgeColor: "emerald", order: 1 },
  { _id: "def-2", title: "CRM System", category: "Sales & Pipeline", description: "Lead tracking, sales pipelines & customer 360 view.", tag: "Conversion", badgeColor: "blue", order: 2 },
  { _id: "def-3", title: "HR-Payroll & Accounts", category: "Workforce & Ledger", description: "Biometric sync, tax deduction, payroll slips & ledger.", tag: "Enterprise", badgeColor: "indigo", order: 3 },
  { _id: "def-4", title: "Stock Inventory & POS", category: "Warehouse & Supply", description: "Multi-branch stock sync, low-stock triggers & batch control.", tag: "Multi-Store", badgeColor: "teal", order: 4 },
  { _id: "def-5", title: "Billing & Invoicing", category: "Fiscal Operations", description: "Multi-currency invoicing, auto receipts & tax reports.", tag: "Automated", badgeColor: "emerald", order: 5 },
  { _id: "def-6", title: "Order Management", category: "E-Commerce Logistics", description: "Omnichannel order fulfillment & courier tracking API.", tag: "Fulfillment", badgeColor: "amber", order: 6 },
  { _id: "def-7", title: "Doctor Appointment", category: "Healthcare & Chamber", description: "Chamber booking, e-prescriptions & patient history.", tag: "Medical Suite", badgeColor: "cyan", order: 7 },
  { _id: "def-8", title: "CRM & Projects", category: "Agency Operations", description: "Kanban sprint boards, milestones & client portal.", tag: "Agile Ready", badgeColor: "violet", order: 8 },
  { _id: "def-9", title: "Token & Queue", category: "Customer Routing", description: "Counter TV displays, multi-service ticketing & SMS queue.", tag: "Smart Queue", badgeColor: "rose", order: 9 },
  { _id: "def-10", title: "Restaurant & Food", category: "Hospitality & Dine", description: "Kitchen Display (KDS), table QR & recipe costing.", tag: "Food & Bar", badgeColor: "orange", order: 10 },
  { _id: "def-11", title: "NGO Management", category: "Non-Profit & Grants", description: "Donor tracking, microcredit grants & field compliance.", tag: "Social Impact", badgeColor: "emerald", order: 11 },
  { _id: "def-12", title: "Co-operative Loan", category: "Microfinance", description: "Savings ledger, installment calculator & penalty rules.", tag: "Banking Grade", badgeColor: "blue", order: 12 },
  { _id: "def-13", title: "Clinic & Hospital", category: "Hospital ERP", description: "IPD/OPD admissions, lab diagnostic tests & bed billing.", tag: "Complete ERP", badgeColor: "red", order: 13 },
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

function getBadgeTheme(color) {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-700 border-blue-200/80 group-hover:border-blue-400";
    case "indigo":
      return "bg-indigo-50 text-indigo-700 border-indigo-200/80 group-hover:border-indigo-400";
    case "teal":
      return "bg-teal-50 text-teal-700 border-teal-200/80 group-hover:border-teal-400";
    case "amber":
    case "orange":
      return "bg-amber-50 text-amber-800 border-amber-200/80 group-hover:border-amber-400";
    case "rose":
    case "red":
      return "bg-rose-50 text-rose-700 border-rose-200/80 group-hover:border-rose-400";
    case "violet":
      return "bg-purple-50 text-purple-700 border-purple-200/80 group-hover:border-purple-400";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200/80 group-hover:border-emerald-400";
  }
}

function ERPCard({ item }) {
  const theme = getBadgeTheme(item.badgeColor);
  return (
    <div className="group relative flex min-w-[270px] max-w-[290px] shrink-0 flex-col justify-between border border-slate-200/80 bg-white p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5 rounded-xl">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center border rounded-lg transition-colors ${theme}`}>
            {getERPIcon(item.title)}
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 rounded-md">
            <IoCheckmarkCircle className="text-emerald-500" size={11} />
            {item.tag || "Ready Software"}
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 leading-tight">
          {item.category || "Enterprise Suite"}
        </p>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
          Live Production Ready
        </span>
        <Link
          href={item.demoUrl || "/contact?service=erp"}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
        >
          <span>Demo</span>
          <IoArrowForwardOutline size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function ERPSoftwareStrip() {
  const { data: erpItems } = useQuery({
    queryKey: queryKeys.homeERPs(),
    queryFn: async () => {
      try {
        const res = await api.get("/cms/home-erp");
        return res.data?.data && res.data.data.length > 0 ? res.data.data : DEFAULT_ERPS;
      } catch (err) {
        return DEFAULT_ERPS;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const list = erpItems && erpItems.length > 0 ? erpItems : DEFAULT_ERPS;
  // Duplicate for smooth infinite CSS loop
  const duplicated = [...list, ...list];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] py-10 sm:py-12 border-b border-slate-200/80 font-sans">
      <div className="container-custom px-4 sm:px-6 md:px-12 mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full mb-3 shadow-xs">
          <IoRocketOutline className="animate-bounce" size={14} />
          <span>13+ Ready-to-Deploy Enterprise Solutions</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight mb-2">
          Enterprise ERP &amp; Business Software{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
            Suite
          </span>
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          From multi-branch POS and Hospital Management to Microcredit NGO systems — production-ready software suites deployed with instant setup and custom licensing.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative overflow-hidden py-2 group">
        <div className="marquee-erp flex w-max gap-4 px-4 motion-gpu group-hover:[animation-play-state:paused]">
          {duplicated.map((item, idx) => (
            <ERPCard key={`erp-${item._id || item.title}-${idx}`} item={item} />
          ))}
        </div>

        {/* Gradient edge masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      <style jsx>{`
        .marquee-erp {
          animation: marquee-erp 36s linear infinite;
          will-change: transform;
        }
        @keyframes marquee-erp {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
