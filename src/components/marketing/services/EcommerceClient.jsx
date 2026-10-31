"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoCartOutline,
  IoCheckmarkCircleOutline,
  IoArrowBackOutline,
  IoShieldCheckmarkOutline,
  IoCardOutline,
  IoGitNetworkOutline,
  IoBagCheckOutline,
  IoRocketOutline,
} from "react-icons/io5";
import { getIcon } from "@/lib/icons";

const DEFAULT_ECOMMERCE_DATA = {
  hero: {
    badge: "High-Conversion Commerce Architecture",
    title: "E-commerce Development",
    subtitle: "Development",
    description:
      "We architect high-conversion transaction engines designed for massive product catalogs, sub-second checkouts, real-time inventory synchronization, and multi-gateway payment processing.",
  },
  sections: {
    verticals: [
      {
        title: "Direct-to-Consumer (D2C)",
        desc: "Bespoke digital storefronts engineered for single-brand dominance. Ultra-fast product grids, frictionless 1-click checkouts, and mobile cart optimization.",
        icon: "Cart",
      },
      {
        title: "Multi-Vendor Marketplace",
        desc: "Robust multi-merchant platforms with vendor commission splitting, automated payout schedules, dedicated seller dashboards, and unified logistics.",
        icon: "People",
      },
      {
        title: "B2B Wholesale Portals",
        desc: "Enterprise bulk trade portals featuring tiered dynamic pricing, customer-specific price books, automated invoice generation, and credit terms.",
        icon: "BagCheck",
      },
    ],
    integrations: [
      {
        t: "Payment Logistics",
        d: "Native integration for bKash, Nagad, SSLCommerz, Stripe, and Apple Pay.",
        icon: "Card",
      },
      {
        t: "Inventory Protocol",
        d: "Real-time bi-directional sync with warehouse management and ERP backends.",
        icon: "GitNetwork",
      },
      {
        t: "Automated Logistics",
        d: "Automated dispatch and tracking hooks with Pathao, Steadfast, and DHL.",
        icon: "Globe",
      },
      {
        t: "AI Fraud Prevention",
        d: "Rule-based and behavioral scoring to prevent chargebacks and fraudulent orders.",
        icon: "Shield",
      },
    ],
    pricingHeader: {
      badge: "Commercial Commerce Tiers",
      title: "Storefront Engineering for",
      focus: "High-Volume Sellers",
    },
    pricing: [
      {
        t: "D2C Foundations",
        p: "$1,999",
        list: [
          "Single Brand Headless Architecture",
          "Native Mobile Performance Optimization",
          "Domestic & Global Payment Gateways",
          "Core E-Commerce SEO Schema",
          "Standard Automated Inventory Sync",
        ],
        highlight: false,
      },
      {
        t: "Aggressive Growth",
        p: "$4,499",
        list: [
          "Next.js Headless Commerce Core",
          "Automated Abandoned Cart Recovery",
          "Omni-Channel Messenger & SMS Alert Sync",
          "High-Level Revenue & Margin Dashboard",
          "Priority Logistics API Integrations",
        ],
        highlight: true,
      },
      {
        t: "Marketplace Suite",
        p: "Custom",
        list: [
          "Multi-Vendor Seller Portals & Payouts",
          "Complex Commission & Tax Rule Engine",
          "High-Volume Warehouse API Webhooks",
          "Dedicated Infrastructure Security Layer",
          "Legacy WooCommerce/Shopify Migration",
        ],
        highlight: false,
      },
    ],
  },
  cta: {
    title: "Ready to Launch Your High-Conversion Store?",
    subtitle:
      "Connect with our senior e-commerce architects to plan your catalog structure, payment gateways, and launch roadmap.",
  },
};

export default function EcommerceClient({ data }) {
  const content = {
    hero: {
      ...DEFAULT_ECOMMERCE_DATA.hero,
      ...(data?.hero || {}),
    },
    sections: {
      verticals:
        data?.sections?.verticals?.length > 0
          ? data.sections.verticals
          : DEFAULT_ECOMMERCE_DATA.sections.verticals,
      integrations:
        data?.sections?.integrations?.length > 0
          ? data.sections.integrations
          : DEFAULT_ECOMMERCE_DATA.sections.integrations,
      pricingHeader: {
        ...DEFAULT_ECOMMERCE_DATA.sections.pricingHeader,
        ...(data?.sections?.pricingHeader || {}),
      },
      pricing:
        data?.sections?.pricing?.length > 0
          ? data.sections.pricing
          : DEFAULT_ECOMMERCE_DATA.sections.pricing,
    },
    cta: {
      ...DEFAULT_ECOMMERCE_DATA.cta,
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
                href="/services/ecommerce/details"
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
                  1-Click
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  Frictionless Checkout
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-pink leading-[1.1]">
                  0.3s
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  Cart Add Latency
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-green leading-[1.1]">
                  100%
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  PCI-DSS Compliant
                </p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.1]">
                  Real-Time
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5 leading-[1.4]">
                  Inventory Sync
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Commerce Verticals ── */}
        <div className="container-custom py-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
              Commerce Models
            </h2>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
              Architected for Every Retail Strategy
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
                  {getIcon(item.icon) || <IoCartOutline />}
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

        {/* ── Payment & Logistics Integrations ── */}
        <div className="border-t border-b border-slate-100 bg-slate-50/60 py-10">
          <div className="container-custom">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-[1.4]">
                Commerce Ecosystem
              </h2>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.2]">
                Payments, Courier APIs &amp; Logistics Pipelines
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
                      / starting
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
                Scale Your Revenue
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
                  Consult E-Commerce Expert
                </Link>
                <Link
                  href="/services/ecommerce/details"
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
            Storefront Engineering
          </p>
          <p className="text-slate-900 font-extrabold text-sm leading-[1.3]">
            Start E-Commerce Project
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
