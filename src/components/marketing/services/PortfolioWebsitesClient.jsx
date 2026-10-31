"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoDiamondOutline,
  IoCheckmarkCircleOutline,
  IoArrowBackOutline,
  IoSparklesOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

const DEFAULT_PORTFOLIO_DATA = {
  hero: {
    badge: "Digital Legacy Builder",
    title: "Portfolio Websites",
    subtitle: "Websites",
    description:
      "We don't build generic templates; we engineer digital pedestals. Your craft is extraordinary—it deserves a bespoke online showcase that amplifies authority, wins high-ticket retainers, and loads in milliseconds.",
    mainImage:
      "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=1000&h=1200&fit=crop",
  },
  sections: {
    philosophies: [
      {
        title: "Minimalist / Nordic",
        desc: "A surgical focus on negative space, editorial typography, and high-contrast imagery. Tailored for architects, designers, and creative leaders.",
        icon: "Layers",
      },
      {
        title: "Editorial Magazine",
        desc: "Bold layout hierarchy with rich media compositions that make your case studies feel like a luxury publication or museum lookbook.",
        icon: "Palette",
      },
      {
        title: "Creative Immersive",
        desc: "Physics-based micro-interactions, silky smooth page transitions, and subtle motion graphics designed to deeply engage art directors and investors.",
        icon: "Flash",
      },
    ],
    phases: [
      {
        id: "01",
        t: "Architecture & Narrative",
        d: "Mapping your professional journey, case study taxonomy, and high-ticket conversion goals.",
      },
      {
        id: "02",
        t: "Bespoke Art Direction",
        d: "Crafting a distinctive aesthetic fingerprint aligned with high-end international design standards.",
      },
      {
        id: "03",
        t: "Engineering & Speed",
        d: "Next.js 14 App Router, static site generation (SSG), and edge optimization for sub-second load times.",
      },
      {
        id: "04",
        t: "Technical SEO & Schema",
        d: "Embedding structured JSON-LD data and OpenGraph cards for prominent Google and social visibility.",
      },
      {
        id: "05",
        t: "Global Edge Deployment",
        d: "Zero-latency worldwide hosting on Vercel Edge networks with automated SSL and asset compression.",
      },
    ],
    pricingHeader: {
      badge: "Investment Architecture",
      title: "Structured Packages for",
      focus: "Every Career Stage",
    },
    pricing: [
      {
        t: "Essential Artifact",
        p: "$499",
        list: [
          "Single-Page Interactive Architecture",
          "Sub-Second Next.js Load Speed",
          "Social Proof & Inroads Integration",
          "Mobile-First Responsive Layout",
          "Global Edge CDN Deployment",
        ],
        highlight: false,
      },
      {
        t: "Professional Authority",
        p: "$1,299",
        list: [
          "Multi-Project Deep Case Studies",
          "Headless Markdown / CMS Integration",
          "Framer Motion Physics Animations",
          "Full Technical SEO & Schema.org Pack",
          "High-Value Client Inquiry Funnel",
        ],
        highlight: true,
      },
      {
        t: "Bespoke Agency Suite",
        p: "$3,499",
        list: [
          "Complete Brand Identity Polish",
          "Custom Interactive 3D / WebGL Elements",
          "Interactive Prototype Lab Access",
          "Dedicated 1-on-1 Design Director",
          "Continuous Performance & Security SLA",
        ],
        highlight: false,
      },
    ],
  },
  cta: {
    title: "Ready to Build Your Digital Legacy?",
    subtitle:
      "Partner with our senior engineering team to launch a portfolio that turns visitors into high-ticket clients.",
  },
};

export default function PortfolioWebsitesClient({ data }) {
  const content = {
    hero: {
      ...DEFAULT_PORTFOLIO_DATA.hero,
      ...(data?.hero || {}),
    },
    sections: {
      philosophies:
        data?.sections?.philosophies?.length > 0
          ? data.sections.philosophies
          : DEFAULT_PORTFOLIO_DATA.sections.philosophies,
      phases:
        data?.sections?.phases?.length > 0
          ? data.sections.phases
          : DEFAULT_PORTFOLIO_DATA.sections.phases,
      pricingHeader: {
        ...DEFAULT_PORTFOLIO_DATA.sections.pricingHeader,
        ...(data?.sections?.pricingHeader || {}),
      },
      pricing:
        data?.sections?.pricing?.length > 0
          ? data.sections.pricing
          : DEFAULT_PORTFOLIO_DATA.sections.pricing,
    },
    cta: {
      ...DEFAULT_PORTFOLIO_DATA.cta,
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
                href="/services/portfolio-websites/details"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-brand-green hover:text-brand-pink transition-colors group leading-[1.4] py-2 px-3"
              >
                View Technical Manifest{" "}
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
                  &lt; 0.6s
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  First Contentful Paint
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-pink leading-[1.1]">
                  100%
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  PageSpeed Score
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-green leading-[1.1]">
                  Edge
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  Global CDN Cached
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.1]">
                  Schema+
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  Rich Search Snippets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Design Philosophies ── */}
        <div className="container-custom py-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
              Aesthetic Direction
            </h2>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
              Curated Styles Tailored to Your Industry
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.philosophies.map((item, idx) => (
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
                  {getIcon(item.icon) || <IoSparklesOutline />}
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

        {/* ── 5-Phase Production Process ── */}
        <div className="border-t border-b border-slate-100 bg-slate-50/60 py-10">
          <div className="container-custom">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Proven Workflow
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Our 5-Stage Engineering Lifecycle
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {sections.phases.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col relative shadow-sm"
                >
                  <span className="text-2xl font-black text-brand-pink/40 mb-2 leading-[1]">
                    {phase.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-[1.3]">
                    {phase.t}
                  </h4>
                  <p className="text-xs text-slate-500 leading-[1.5]">
                    {phase.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Investment Packages ── */}
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
                    Most Popular
                  </div>
                )}

                <h3 className="text-lg font-black text-slate-900 leading-[1.2]">
                  {tier.t}
                </h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900 leading-[1]">
                    {tier.p}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 ml-1">
                    / one-time
                  </span>
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
                  Choose {tier.t}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Immersive Conversion CTA ── */}
        <div className="container-custom pb-12 pt-4">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full leading-[1.4]">
                <IoRocketOutline className="text-brand-pink text-sm" />
                Launch With SYICT
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
                  Consult Expert
                </Link>
                <Link
                  href="/services/portfolio-websites/details"
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
            Portfolio Engineering
          </p>
          <p className="text-slate-900 font-extrabold text-sm leading-[1.3]">
            Get Custom Quote
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
