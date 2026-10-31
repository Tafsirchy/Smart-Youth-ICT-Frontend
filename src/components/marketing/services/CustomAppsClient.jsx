"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoCubeOutline,
  IoCheckmarkCircleOutline,
  IoArrowBackOutline,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoCodeSlashOutline,
  IoRocketOutline,
  IoLayersOutline,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

const DEFAULT_CUSTOM_APPS_DATA = {
  hero: {
    badge: "Mission-Critical Full-Stack Engineering",
    title: "Custom Web Applications",
    subtitle: "Applications",
    description:
      "Purpose-built web software tailored to your exact business logic. Scalable microservices, real-time sync, resilient data layers, and clean, responsive UI.",
  },
  sections: {
    verticals: [
      {
        title: "SaaS Platforms & MVPs",
        desc: "High-velocity product development from concept to market validation. Multi-tenant database architecture, Stripe billing subscriptions, and user onboarding funnels.",
        icon: "Rocket",
      },
      {
        title: "Internal Operations Portals",
        desc: "Custom workflow automation systems that replace messy spreadsheets. Role-based dashboards, approval flows, real-time alerts, and audit trails.",
        icon: "Cube",
      },
      {
        title: "Customer Self-Service Portals",
        desc: "High-security user portals where your clients can view real-time data, submit requests, download invoices, and manage their service subscriptions.",
        icon: "Layers",
      },
    ],
    integrations: [
      {
        t: "Real-Time WebSockets",
        d: "Bi-directional instant data streaming for chats, notifications, and live dashboards.",
        icon: "Sync",
      },
      {
        t: "Role-Based Access Control",
        d: "Granular authorization matrix with JWT authentication, MFA, and permission scopes.",
        icon: "Shield",
      },
      {
        t: "Third-Party API & Webhooks",
        d: "Seamless integration with Stripe, SendGrid, Twilio, AWS, and external REST/GraphQL APIs.",
        icon: "CodeSlash",
      },
      {
        t: "Automated CI/CD Pipelines",
        d: "Automated testing, containerized Docker builds, and zero-downtime deployment pipelines.",
        icon: "GitNetwork",
      },
    ],
    pricingHeader: {
      badge: "Development Sprints",
      title: "Sprint-Based Engineering for",
      focus: "Your Product Vision",
    },
    pricing: [
      {
        t: "MVP Sprint",
        p: "$2,999",
        list: [
          "Core Feature Architecture & Wireframing",
          "Next.js + Node.js / Python Backend",
          "User Auth, RBAC & Dashboard Core",
          "Stripe / Payment Gateway Integration",
          "Automated Testing & Vercel/AWS Launch",
        ],
        highlight: false,
      },
      {
        t: "Scale Stage",
        p: "$5,999",
        list: [
          "Full-Featured Multi-Tenant SaaS Portal",
          "Real-Time WebSocket Notification Core",
          "Advanced Analytics & Admin Reporting Hub",
          "Automated Background Queue Workers",
          "Performance Optimization & Security Audit",
        ],
        highlight: true,
      },
      {
        t: "Enterprise Core",
        p: "Custom",
        list: [
          "Microservices & Distributed Systems",
          "Dedicated Database Clusters with Read Replicas",
          "Custom Hardware / On-Premise Sync",
          "24/7 Priority SLA & Dedicated Tech Lead",
          "Comprehensive Architecture Documentation",
        ],
        highlight: false,
      },
    ],
  },
  cta: {
    title: "Ready to Build Your Custom Software Solution?",
    subtitle:
      "Collaborate directly with our senior full-stack architects to scope your roadmap, technical stack, and milestone deliverables.",
  },
};

export default function CustomAppsClient({ data }) {
  const content = {
    hero: {
      ...DEFAULT_CUSTOM_APPS_DATA.hero,
      ...(data?.hero || {}),
    },
    sections: {
      verticals:
        data?.sections?.verticals?.length > 0
          ? data.sections.verticals
          : DEFAULT_CUSTOM_APPS_DATA.sections.verticals,
      integrations:
        data?.sections?.integrations?.length > 0
          ? data.sections.integrations
          : DEFAULT_CUSTOM_APPS_DATA.sections.integrations,
      pricingHeader: {
        ...DEFAULT_CUSTOM_APPS_DATA.sections.pricingHeader,
        ...(data?.sections?.pricingHeader || {}),
      },
      pricing:
        data?.sections?.pricing?.length > 0
          ? data.sections.pricing
          : DEFAULT_CUSTOM_APPS_DATA.sections.pricing,
    },
    cta: {
      ...DEFAULT_CUSTOM_APPS_DATA.cta,
      ...(data?.cta || {}),
    },
  };

  const { hero, sections, cta } = content;

  return (
    <section className="min-h-screen bg-white flex flex-col relative selection:bg-brand-pink selection:text-white">
      {/* Background Dot Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#0F172A08_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* ── Hero ── */}
        <div className="border-b border-slate-100 bg-white/70 backdrop-blur-sm">
          <div className="container-custom pt-10 sm:pt-14 pb-8 flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/8 border border-brand-pink/25 text-brand-pink text-[10px] font-black uppercase tracking-widest rounded-full leading-[1.4]"
            >
              <span className="h-1.5 w-1.5 bg-brand-pink rounded-full shrink-0 animate-pulse" />
              {hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2]"
            >
              {(() => {
                const fullTitle = (hero.title || "").trim();
                const sub = (hero.subtitle || "").trim();
                let prefix = fullTitle;
                let highlight = sub;

                if (sub && fullTitle.toLowerCase().endsWith(sub.toLowerCase())) {
                  prefix = fullTitle.slice(0, fullTitle.length - sub.length).trim();
                  highlight = sub;
                } else if (!sub || fullTitle.toLowerCase() === sub.toLowerCase()) {
                  const words = fullTitle.split(" ");
                  if (words.length > 1) {
                    highlight = words.pop();
                    prefix = words.join(" ");
                  } else {
                    prefix = fullTitle;
                    highlight = "";
                  }
                }

                return (
                  <span className="whitespace-nowrap">
                    {prefix}
                    {prefix && highlight ? " " : ""}
                    {highlight && <span className="text-brand-green">{highlight}</span>}
                  </span>
                );
              })()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-500 text-sm md:text-base leading-[1.6] max-w-xl font-normal"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <Link
                href="/services/custom-apps/details"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-green hover:text-brand-pink transition-colors group leading-[1.4] py-2 px-3"
              >
                View Technical Specifications{" "}
                <IoArrowBackOutline className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Key Highlights Strip ── */}
        <div className="border-b border-slate-100 bg-slate-50/80">
          <div className="container-custom py-3.5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-slate-200/60">
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.1]">
                  TypeScript
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  End-to-End Type Safety
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-pink leading-[1.1]">
                  Modular
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  Microservices Architecture
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-green leading-[1.1]">
                  100%
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  IP &amp; Code Ownership
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.1]">
                  Dockerized
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  Cloud-Agnostic Hosting
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── App Archetypes / Solutions ── */}
        <div className="container-custom py-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
              Software Categories
            </h2>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
              Engineered for Enterprise Workflows &amp; SaaS Products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.verticals.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-slate-200/80 hover:border-brand-pink/40 hover:shadow-lg transition-all rounded-xl p-6 relative flex flex-col group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink to-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 flex items-center justify-center text-xl mb-4 group-hover:bg-brand-pink/10 group-hover:text-brand-pink transition-colors shrink-0">
                  {getIcon(item.icon) || <IoCubeOutline />}
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2 leading-[1.3]">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-[1.6] flex-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Engineering Stack & Architecture ── */}
        <div className="border-t border-b border-slate-100 bg-slate-50/60 py-10">
          <div className="container-custom">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Technical Foundations
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Architectural Standards Built for Long-Term Scale
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sections.integrations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-xl p-5 flex flex-col shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center text-lg mb-3 shrink-0">
                    {getIcon(item.icon) || <IoShieldCheckmarkOutline />}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-[1.3]">
                    {item.t}
                  </h4>
                  <p className="text-xs text-slate-500 leading-[1.5]">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Pricing Packages ── */}
        <div className="container-custom py-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
              {sections.pricingHeader.badge}
            </h2>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
              {sections.pricingHeader.title}{" "}
              <span className="text-brand-green">
                {sections.pricingHeader.focus}
              </span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sections.pricing.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl p-6 sm:p-7 border flex flex-col relative transition-all ${
                  tier.highlight
                    ? "border-brand-pink ring-2 ring-brand-pink/15 shadow-xl shadow-brand-pink/5"
                    : "border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 right-6 bg-brand-pink text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
                    Recommended
                  </div>
                )}

                <h3 className="text-lg font-black text-slate-900 leading-[1.2]">
                  {tier.t}
                </h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900 leading-[1]">
                    {tier.p}
                  </span>
                  {tier.p !== "Custom" && (
                    <span className="text-xs font-semibold text-slate-400 ml-1">
                      / sprint
                    </span>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5 flex-1 mb-6">
                  {tier.list?.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-[1.5]"
                    >
                      <IoCheckmarkCircleOutline className="text-brand-green text-base shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className={`w-full min-h-[44px] py-3 rounded-lg font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center leading-[1.4] text-center ${
                    tier.highlight
                      ? "bg-brand-pink text-white hover:bg-brand-pinkLight shadow-md shadow-brand-pink/20"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Select {tier.t}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Conversion CTA ── */}
        <div className="container-custom pb-12 pt-4">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full leading-[1.4]">
                <IoRocketOutline className="text-brand-pink text-sm" />
                Launch Production-Ready Code
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-[1.2]">
                {cta.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-[1.6] max-w-lg">
                {cta.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-3 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-[220px] min-h-[44px] px-6 py-3 bg-brand-pink text-white font-black hover:bg-brand-pinkLight transition-all uppercase tracking-widest text-xs flex items-center justify-center rounded-lg shadow-md shadow-brand-pink/30 leading-[1.4]"
                >
                  Consult Solutions Architect
                </Link>
                <Link
                  href="/services/custom-apps/details"
                  className="w-full sm:w-[220px] min-h-[44px] px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black transition-all uppercase tracking-widest text-xs flex items-center justify-center rounded-lg text-center leading-[1.4]"
                >
                  Technical Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Sticky CTA ── */}
      <div className="sticky bottom-0 left-0 w-full p-3.5 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.06)] pb-[max(0.875rem,env(safe-area-inset-bottom))] mt-auto">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-[1.3]">
            Custom Web Apps
          </p>
          <p className="text-slate-900 font-extrabold text-sm leading-[1.3]">
            Start Project Brief
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 min-h-[44px] bg-brand-pink text-white font-black text-xs uppercase tracking-widest shadow-md shadow-brand-pink/20 leading-[1.4] flex items-center justify-center rounded-lg"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
