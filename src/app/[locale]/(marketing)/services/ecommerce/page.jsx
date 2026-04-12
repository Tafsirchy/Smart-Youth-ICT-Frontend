"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoCartOutline, 
  IoBagCheckOutline, 
  IoPeopleOutline, 
  IoFlashOutline,
  IoStatsChartOutline,
  IoGlobeOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline,
  IoCubeOutline,
  IoGitNetworkOutline,
  IoCardOutline,
  IoLayersOutline
} from "react-icons/io5";

const verticalSectors = [
  {
    title: "Direct-to-Consumer (D2C)",
    desc: "Bespoke storefronts engineered for single-brand dominance. Focus on high-speed product grids and frictionless 1-click checkouts.",
    icon: <IoCartOutline />,
    color: "from-rose-500 to-rose-600",
    border: "border-rose-100",
  },
  {
    title: "Multi-Vendor Marketplace",
    desc: "Complex architectures allowing hundreds of sellers to manage inventory. Includes robust commission engines and vendor dashboards.",
    icon: <IoPeopleOutline />,
    color: "from-slate-700 to-slate-800",
    border: "border-slate-100",
  },
  {
    title: "B2B Bulk Portals",
    desc: "Wholesale ordering systems with tiered pricing, inventory reservation, and automated quotation systems for bulk trade.",
    icon: <IoBagCheckOutline />,
    color: "from-emerald-500 to-emerald-600",
    border: "border-emerald-100",
  }
];

const ecosystemIntegration = [
  {
    t: "Payment Logistics",
    d: "Native SSLCommerz, bKash, Nagad & Stripe sync.",
    icon: <IoCardOutline />,
  },
  {
    t: "Inventory Protocol",
    d: "Real-time sync with ERP & Warehouse systems.",
    icon: <IoGitNetworkOutline />,
  },
  {
    t: "Global Logistics",
    d: "Automated Pathao, ShipStation & DHL integration.",
    icon: <IoGlobeOutline />,
  },
  {
    t: "Fraud Shield",
    d: "AI-driven order verification & fraud prevention.",
    icon: <IoShieldCheckmarkOutline />,
  },
];

export default function EcommercePage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-600 overflow-hidden relative">
      {/* INDUSTRIAL DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-slate-200"></div>
        <div className="absolute top-0 right-[-100px] w-[600px] h-[600px] bg-rose-100 rounded-full blur-[160px]"></div>
      </div>

      <div className="container-custom py-24 relative">
        {/* INDUSTRIAL HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 pt-10">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoCubeOutline className="text-sm" /> Conversion-First Architecture
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-12 tracking-tighter"
            >
              Commerce <br /> <span className="text-rose-500">Engines.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-2xl mb-12"
            >
              Turning traffic into revenue. We engineer{" "}
              <span className="text-slate-900 font-bold underline decoration-rose-500 decoration-2 underline-offset-8">
                high-speed commerce hubs
              </span>{" "}
              that eliminate friction, optimize SEO, and maximize Average Order Value.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Store
              </button>
              <Link
                href="/services/ecommerce/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Manifest
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
              className="relative perspective-2000"
            >
              {/* Dashboard Mockup Visual */}
              <div className="bg-white rounded-[3rem] p-4 border border-slate-200 shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden scale-110">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 h-[400px] flex flex-col justify-between">
                   <div className="flex justify-between items-center text-rose-500 font-black tracking-tighter uppercase">
                      <span>Global Revenue Dashboard</span>
                      <span className="text-emerald-500 font-mono text-sm">+214% Growth</span>
                   </div>
                   
                   <div className="flex items-end gap-2 h-40">
                      {[40, 60, 100, 80, 90, 70, 110].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className={`flex-1 rounded-t-lg ${i === 6 ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-rose-500/20'}`}
                        ></motion.div>
                      ))}
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-2xl border border-slate-100">
                         <p className="text-[8px] text-slate-400 font-black uppercase mb-1">Conversion Rate</p>
                         <p className="text-2xl font-black text-slate-900">4.82%</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl border border-slate-100">
                         <p className="text-[8px] text-slate-400 font-black uppercase mb-1">Abandoned Cart</p>
                         <p className="text-2xl font-black text-rose-500">0.8%</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Floating Sales Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-10 top-20 bg-white p-8 rounded-3xl border border-rose-500/20 shadow-2xl"
              >
                <IoStatsChartOutline className="text-rose-500 text-3xl mb-4" />
                <p className="text-4xl font-black text-slate-900">$42.8k</p>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Daily GMV Lift
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CONTRAST: LEGACY VS ENGINE */}
        <div className="mb-48 relative">
          <div className="grid lg:grid-cols-2 gap-1 px-8 lg:px-0 bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="p-16 border-r border-slate-100 group cursor-default">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">
                The Legacy Checkout
              </h4>
              <div className="space-y-8 opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-3xl font-bold text-slate-600 leading-tight">
                  High-friction multi-step processes and API lag.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                <p className="text-sm font-light text-slate-500">
                  Cart Abandonment: 72%
                </p>
                <p className="text-sm font-light text-slate-400 tracking-widest">
                  MOBILE CONVERSION: 1.2%
                </p>
              </div>
            </div>
            <div className="p-16 bg-rose-50/30 relative overflow-hidden group cursor-default">
              <div className="absolute top-0 right-0 p-12 text-rose-500 opacity-5 text-9xl font-black uppercase tracking-widest select-none">
                NIKE
              </div>
              <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-10">
                The SYICT Logic
              </h4>
              <div className="space-y-8 relative z-10">
                <p className="text-3xl font-black text-slate-900 leading-tight">
                  Zero-friction "Atomic" checkouts designed for instant action.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="absolute h-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                  />
                </div>
                <p className="text-sm font-bold text-rose-600 uppercase tracking-widest">
                  Cart Abandonment: 24% (Industry Peak)
                </p>
                <p className="text-sm font-black text-slate-900 tracking-[0.4em] uppercase">
                  MOBILE CONVERSION: 5.8%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMMERCE SECTOR ARCHITECTURE */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-rose-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-4">
                Channel Specializations
              </h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Architecting for your{" "}
                <span className="text-slate-400 italic font-serif font-light">
                  Sales Model.
                </span>
              </p>
            </div>
            <p className="text-slate-500 max-w-xs font-light text-lg">
              Custom blueprints for high-velocity D2C, complex Marketplaces, and B2B portals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {verticalSectors.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div
                  className={`bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg shadow-rose-500/20`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light mb-8 text-lg">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-black text-rose-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Engine Blueprints <IoGlobeOutline className="text-lg" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ECOSYSTEM INTEGRATIONS (Bento Box) */}
        <div className="bg-white rounded-[4rem] p-8 lg:p-20 border border-slate-100 mb-48 overflow-hidden relative shadow-2xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black text-slate-900 mb-6">
                Connected <br />
                <span className="text-rose-500">Logistics.</span>
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-8">
                Native API-first integrations with leading payment gateways, inventory systems, and last-mile courier services.
              </p>
              <div className="flex items-center gap-4 text-sm font-black text-slate-300 uppercase tracking-widest">
                <span className="w-12 h-[1px] bg-slate-100"></span> Headless Logic
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {ecosystemIntegration.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-rose-500/20 transition-all flex items-start gap-6"
                >
                  <div className="text-3xl text-rose-500 shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.t}</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #f43f5e 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* COMMERCE INVESTMENT TIERS */}
        <div className="mb-48 text-center pt-20 border-t border-slate-100">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-4">
              Revenue Scaling Architecture
            </h2>
            <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Select your{" "}
              <span className="text-slate-400">Growth Tier.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {[
              {
                t: "D2C Foundations",
                p: "$1999",
                list: [
                  "Single Brand Architecture",
                  "Native Mobile Speed",
                  "Global Payment Gateways",
                  "SEO Commerce Pack",
                  "Standard Inventory Sync",
                ],
                color: "slate",
              },
              {
                t: "Aggressive Growth",
                p: "$4499",
                list: [
                  "Headless Commerce Logic",
                  "Advanced Cart Recovery",
                  "Omni-channel Support",
                  "High-Level ROI Dashboard",
                  "Priority Logistics Sync",
                ],
                color: "rose",
                highlight: true,
              },
              {
                t: "Marketplace Suite",
                p: "Custom",
                list: [
                  "Multi-Vendor Capability",
                  "Complex Commission Engine",
                  "Full Warehouse API",
                  "Dedicated Security Layer",
                  "Legacy Site Migration",
                ],
                color: "crimson",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-[3.5rem] p-12 border ${tier.highlight ? "border-rose-500 ring-4 ring-rose-500/5 -translate-y-4 shadow-2xl shadow-rose-500/10" : "border-slate-100 shadow-sm shadow-slate-200/50"} flex flex-col h-full relative transition-all group`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2 rounded-bl-3xl">
                    Elite Performance
                  </div>
                )}
                <h4 className="text-2xl font-black text-slate-900 mb-2">
                  {tier.t}
                </h4>
                <p className="text-5xl font-black text-slate-900 mb-10">{tier.p}</p>

                <div className="space-y-5 mb-12 flex-1">
                  {tier.list.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 items-center text-slate-500 font-light text-sm"
                    >
                      <IoCheckmarkCircleOutline className="text-rose-500 text-lg shrink-0" />{" "}
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${tier.highlight ? "bg-rose-600 text-white shadow-rose-600/30" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"}`}
                >
                  Initiate {tier.t}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL INDUSTRIAL CTA */}
        <div className="text-center py-40 bg-white rounded-[5rem] border border-slate-100 relative overflow-hidden group shadow-2xl shadow-slate-200/50">
          <div className="absolute inset-0 bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <IoLayersOutline className="text-7xl text-rose-500 mb-10 mx-auto opacity-20" />
            <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">
              Ready to activate your <br />
              <span className="text-rose-600 font-serif italic font-medium">
                Commerce Engine?
              </span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/40 uppercase tracking-widest text-xs">
                Book Architecture Sprint
              </button>
              <Link
                href="/services/ecommerce/details"
                className="px-12 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs flex items-center justify-center"
              >
                Technical Manifest
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

