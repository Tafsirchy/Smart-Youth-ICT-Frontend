"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  LuSparkles,
  LuLayers,
  LuCode,
  LuAward,
  LuArrowRight,
  LuExternalLink,
  LuPlus,
  LuRefreshCw,
  LuCheck,
  LuCalendarDays,
} from "react-icons/lu";
import api from "@/lib/api";

export default function HomepageShowcasesHubPage() {
  const locale = useLocale();
  const [stats, setStats] = useState({
    erpTotal: 0,
    erpActive: 0,
    techTotal: 0,
    techActive: 0,
    brandsTotal: 0,
    brandsActive: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchHubStats = async () => {
    setLoading(true);
    try {
      const [erpRes, techRes, brandsRes] = await Promise.allSettled([
        api.get("/cms/home-erp/admin"),
        api.get("/cms/home-tech/admin"),
        api.get("/cms/home-brands/admin"),
      ]);

      const erpData = erpRes.status === "fulfilled" ? erpRes.value.data?.data || [] : [];
      const techData = techRes.status === "fulfilled" ? techRes.value.data?.data || [] : [];
      const brandsData = brandsRes.status === "fulfilled" ? brandsRes.value.data?.data || [] : [];

      setStats({
        erpTotal: erpData.length,
        erpActive: erpData.filter((i) => i.isActive).length,
        techTotal: techData.length,
        techActive: techData.filter((i) => i.isActive).length,
        brandsTotal: brandsData.length,
        brandsActive: brandsData.filter((i) => i.isActive).length,
      });
    } catch {
      // keep fallback zeros
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubStats();
  }, []);

  const showcaseSections = [
    {
      id: "erp",
      title: "Enterprise ERP & Software Suite",
      badge: "Commercial Software Strip",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: LuLayers,
      iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      description:
        "Manage the ready-to-deploy enterprise software systems (POS, Smart HR, Hospital HSM, School EIMS, ISP Billing) showcased in the homepage alternating 3D marquee.",
      href: `/${locale}/super/cms/homepage-showcases/erp`,
      total: stats.erpTotal,
      active: stats.erpActive,
      addHref: `/${locale}/super/cms/homepage-showcases/erp`,
      anchorLink: `/${locale}#erp`,
    },
    {
      id: "tech-stack",
      title: "Languages & Engineering Tech Stack",
      badge: "Multi-Row Toolchain Marquee",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
      icon: LuCode,
      iconBg: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
      description:
        "Curate the complete programming language arsenal: true languages (Python, Go, TS, C++), modern styling frameworks, databases, and DevOps cloud tools.",
      href: `/${locale}/super/cms/homepage-showcases/tech-stack`,
      total: stats.techTotal,
      active: stats.techActive,
      addHref: `/${locale}/super/cms/homepage-showcases/tech-stack`,
      anchorLink: `/${locale}#tech-stack`,
    },
    {
      id: "brands",
      title: "Trusted Brands & Global Networks",
      badge: "Partner & Client Logo Cloud",
      badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
      icon: LuAward,
      iconBg: "bg-teal-500/10 text-teal-600 border-teal-200",
      description:
        "Configure the global tech firms, freelance marketplaces, and corporate networks (Google, Microsoft, Amazon, Upwork, Fiverr) featured in the 'Brands Our Learners Work With' marquee.",
      href: `/${locale}/super/cms/homepage-showcases/brands`,
      total: stats.brandsTotal,
      active: stats.brandsActive,
      addHref: `/${locale}/super/cms/homepage-showcases/brands`,
      anchorLink: `/${locale}#brands`,
    },
    {
      id: "seminar",
      title: "Free Seminar Strip",
      badge: "Visibility Toggle",
      badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
      icon: LuCalendarDays,
      iconBg: "bg-rose-500/10 text-rose-600 border-rose-200",
      description:
        "Toggle the Free Seminar banner on or off on the home page. Hide it when no upcoming seminar is scheduled to avoid showing outdated content to visitors.",
      href: `/${locale}/super/cms/homepage-showcases/seminar`,
      total: null,
      active: null,
      addHref: null,
      anchorLink: null,
    },
  ];

  return (
    <div className="py-4 space-y-6 max-w-7xl mx-auto font-sans">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider rounded-md mb-1.5 shadow-xs">
            <LuSparkles className="w-3.5 h-3.5" />
            <span>Homepage Showcases Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Commercial Showcases &amp; Tickers
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Dedicated management portals for each homepage commercial strip. Click any section below to manage its content.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={fetchHubStats}
            title="Refresh All Stats"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg shadow-xs transition-colors"
          >
            <LuRefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Stats</span>
          </button>
          <Link
            href={`/${locale}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
          >
            <span>Preview Homepage</span>
            <LuExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Global Metrics Bar ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready ERP Systems</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {stats.erpActive} <span className="text-sm font-normal text-slate-400">/ {stats.erpTotal} active</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <LuLayers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Languages &amp; Tech</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {stats.techActive} <span className="text-sm font-normal text-slate-400">/ {stats.techTotal} active</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <LuCode className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trusted Brands</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {stats.brandsActive} <span className="text-sm font-normal text-slate-400">/ {stats.brandsTotal} active</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
            <LuAward className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ── Section Portals Grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {showcaseSections.map((sec) => {
          const IconComponent = sec.icon;
          return (
            <div
              key={sec.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${sec.iconBg}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md border ${sec.badgeColor}`}>
                    {sec.badge}
                  </span>
                </div>

                <h2 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors mb-2 leading-snug">
                  {sec.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6">
                  {sec.description}
                </p>
              </div>

              <div>
                {/* Status Indicator */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mb-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <LuCheck className="w-4 h-4 text-emerald-500" />
                    <span>Live in Marquee: {sec.active}</span>
                  </span>
                  <span>Total: {sec.total}</span>
                </div>

                {/* Primary Action Button */}
                <Link
                  href={sec.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm group-hover:shadow-md transition-all"
                >
                  <span>Open Dedicated Manager</span>
                  <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
