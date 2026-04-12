"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoStatsChartOutline, 
  IoPeopleOutline, 
  IoCalculatorOutline, 
  IoLayersOutline, 
  IoSettingsOutline,
  IoGitNetworkOutline,
  IoSyncOutline,
  IoStorefrontOutline,
  IoHardwareChipOutline,
  IoRepeatOutline,
  IoPulseOutline,
  IoScanOutline
} from "react-icons/io5";

const erpModules = [
  {
    title: "HRM & Strategic Payroll",
    desc: "Automated attendance, leave management, and localized tax/bonus logic for your entire workforce.",
    icon: <IoPeopleOutline />,
    color: "from-teal-600 to-emerald-700",
  },
  {
    title: "Inventory & SC Control",
    desc: "Multi-warehouse tracking with automated re-order thresholds and low-stock SMS alerting engines.",
    icon: <IoLayersOutline />,
    color: "from-amber-600 to-orange-700",
  },
  {
    title: "Sales & CRM Intelligence",
    desc: "Lead pipeline management, automated stakeholder follow-ups, and customer lifetime value (LTV) analytics.",
    icon: <IoStatsChartOutline />,
    color: "from-blue-600 to-indigo-700",
  },
  {
    title: "POS Integration Core",
    desc: "Offline-synchronization, thermal receipt printing, and barcode processing for high-velocity retail environments.",
    icon: <IoStorefrontOutline />,
    color: "from-slate-700 to-slate-900",
  }
];

const infrastructureSpecs = [
  { group: "Core Persistence", tags: ["PostgreSQL", "ACID Compliant", "Daily Snapshots"] },
  { group: "Logic Tier", tags: ["Next.js 14", "Node.js 20", "Row-Level Security"] },
  { group: "Integrations", tags: ["SMS Gateways", "Payment APIs", "Courier Webhooks"] },
  { group: "Hardware Support", tags: ["ESC/POS Printers", "Barcode Scanners", "Fingerprint Auth"] }
];

export default function ErpCrmPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-600 selection:text-white overflow-hidden relative">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200 hidden lg:block"></div>
        <div className="absolute top-[10%] right-[-100px] w-[600px] h-[600px] bg-teal-50 rounded-full blur-[160px]"></div>
      </div>

      <div className="container-custom relative py-20 lg:py-32">
        {/* ENTERPRISE HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-48">
          <div className="flex-1 text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 text-teal-600 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoGitNetworkOutline className="text-sm" /> Operation Ecosystem Prototype
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-fluid-hero font-black leading-none mb-12 tracking-tighter"
            >
              Operational <br /> <span className="text-blue-600 italic font-serif font-light">Logic.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              We don't build software; we architect business efficiency. Our systems integrate ERP, CRM, and POS into a unified, high-vibration command center that eliminates operational friction.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-teal-600 text-white font-black rounded-xl hover:bg-teal-700 transition-all shadow-2xl shadow-teal-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Architecture Call
              </button>
              <Link
                href="/services/erp-crm/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          {/* CREATIVE VISUAL: LIVE TECHNICAL BLUEPRINT */}
          <div className="flex-1 relative hidden lg:block h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* THE CORE NODE */}
              <div className="relative z-20">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-40 h-40 rounded-full bg-white border border-slate-100 shadow-2xl flex items-center justify-center relative p-2"
                >
                   <div className="absolute inset-0 bg-teal-500/5 rounded-full animate-ping"></div>
                   <div className="w-full h-full rounded-full bg-slate-50 border border-slate-100 flex flex-col items-center justify-center relative z-10 overflow-hidden">
                      <IoPulseOutline className="text-4xl text-teal-600 mb-2 animate-pulse" />
                      <p className="text-[8px] font-black text-slate-400 tracking-[0.2em]">CORE ACTIVE</p>
                      <div className="mt-2 font-mono text-[7px] text-teal-500">POS_SYNC::2.4ms</div>
                   </div>
                </motion.div>
                
                {/* Orbital Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-10 border border-slate-200 border-dashed rounded-full"
                ></motion.div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-20 border border-slate-100 rounded-full"
                ></motion.div>
              </div>

              {/* SATELLITE MODULES */}
              {[
                { icon: <IoStorefrontOutline />, title: "POS", pos: "top-10 right-20", delay: 0.2 },
                { icon: <IoPeopleOutline />, title: "HRM", pos: "bottom-10 left-20", delay: 0.4 },
                { icon: <IoLayersOutline />, title: "INVENTORY", pos: "top-40 left-10", delay: 0.6 },
                { icon: <IoStatsChartOutline />, title: "CRM", pos: "bottom-40 right-10", delay: 0.8 }
              ].map((sat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: sat.delay }}
                  className={`absolute ${sat.pos} z-30`}
                >
                   {/* HUD Connection Line (SVG) */}
                   <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-20 hidden">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="#0d9488" strokeWidth="1" />
                   </svg>
                   
                   <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-pointer group">
                      <div className="text-xl text-teal-600">{sat.icon}</div>
                      <p className="text-[8px] font-black tracking-widest text-slate-400 group-hover:text-teal-600 transition-colors uppercase">{sat.title}</p>
                   </div>
                   
                   {/* Data Packet Particle */}
                   <motion.div
                     animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                     transition={{ duration: 10, repeat: Infinity }}
                     className="absolute -top-4 -right-4 text-[7px] font-mono text-teal-400 opacity-40 select-none whitespace-nowrap"
                   >
                     DATASET_EX_0{i}
                   </motion.div>
                </motion.div>
              ))}

              {/* FLOATING HUD METRICS */}
              <div className="absolute top-0 left-0 p-8 border-l border-t border-slate-200 pointer-events-none opacity-50">
                 <p className="text-[10px] font-mono text-slate-400">LAT: 23.8103</p>
                 <p className="text-[10px] font-mono text-slate-400">LNG: 90.4125</p>
              </div>
              <div className="absolute bottom-0 right-0 p-8 border-r border-b border-slate-200 pointer-events-none opacity-50 text-right">
                 <p className="text-[10px] font-mono text-slate-400">TRX_POLL: OK</p>
                 <p className="text-[10px] font-mono text-slate-400">ENC_SSL: PASS</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CONTRAST: FRAGMENTED VS UNIFIED */}
        <div className="mb-48 relative px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-1 bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="p-16 border-r border-slate-100 group cursor-default">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">
                Fragmented SaaS Subscriptions
              </h4>
              <div className="space-y-8 opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-3xl font-bold text-slate-500 leading-tight italic">
                  Isolated silos for HR, CRM, and Inventory with zero cross-system intelligence.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                   Recurrent Costs • Manual Sync • Security Blindspots
                </p>
              </div>
            </div>
            <div className="p-16 bg-teal-50/20 relative overflow-hidden group cursor-default">
              <div className="absolute top-0 right-0 p-12 text-teal-500 opacity-5 text-9xl font-black uppercase tracking-widest select-none">
                UNIFIED
              </div>
              <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-10">
                SYICT Operation Core
              </h4>
              <div className="space-y-8 relative z-10">
                <p className="text-3xl font-black text-slate-900 leading-tight">
                  A single technical brain controlling every operational module simultaneously.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="absolute h-full bg-teal-500 shadow-[0_0_20px_rgba(13,148,136,0.3)]"
                  />
                </div>
                <p className="text-xs font-black text-teal-600 uppercase tracking-widest">
                   Zero Subscription • Real-time Sync • Full Data Sovereignty
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MODULAR BENTO GRID */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-amber-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-4 font-bold">System Architecture</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Modular ecosystem for <span className="text-slate-400 italic font-serif font-light">total control.</span>
              </p>
            </div>
            <p className="text-slate-500 max-w-xs font-light text-lg italic">
              Every system we build is component-based, allowing you to scale modules as your company grows.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {erpModules.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="bg-white rounded-[3rem] p-10 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-8 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tighter uppercase whitespace-pre-line">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light text-sm">
                    {item.desc}
                  </p>
                  
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INFRASTRUCTURE STACK MANIFEST */}
        <div className="bg-white rounded-[4rem] p-8 lg:p-20 border border-slate-100 mb-48 overflow-hidden shadow-2xl shadow-slate-200/50 relative px-4 md:px-0">
          <div className="grid lg:grid-cols-3 gap-12 relative z-10 px-8 lg:px-20">
            <div className="lg:col-span-1">
               <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl text-amber-600 mb-8 border border-amber-100">
                  <IoHardwareChipOutline />
               </div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">
                Infrastructure <br />
                <span className="text-amber-600">Integrity.</span>
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-8 italic">
                 "Our systems are built on ACID-compliant architectures for absolute data consistency."
              </p>
              <div className="flex items-center gap-4 text-sm font-black text-slate-200 uppercase tracking-widest">
                <span className="w-12 h-[1px] bg-slate-100"></span> Hardware Agnostic
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {infrastructureSpecs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-teal-500/20 transition-all"
                >
                  <h4 className="font-black text-[10px] text-teal-600 uppercase tracking-[0.3em] mb-6">{item.group}</h4>
                  <div className="flex flex-wrap gap-2">
                     {item.tags.map(tag => (
                       <span key={tag} className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-700">
                          {tag}
                       </span>
                     ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0d9488 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* INVESTMENT ARCHITECTURE */}
        <div className="mb-48 text-center pt-20 border-t border-slate-100 px-4 md:px-0">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <h2 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] mb-4 font-bold">Enterprise Modeling</h2>
            <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Scale based on <span className="text-slate-400">organization tier.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {[
              {
                t: "Startup Ops",
                p: "$1999",
                list: [
                  "Core HRM & Accounting",
                  "Single-Outlet POS Setup",
                  "Standard Inventory Sync",
                  "Role-Based Credentials",
                  "1-Week Discovery Call",
                ],
                color: "slate",
              },
              {
                t: "Industrial Scaling",
                p: "$4499",
                list: [
                  "Multi-Warehouse Logic",
                  "Advanced CRM Pipeline",
                  "Hardware API Protocols",
                  "Automated PDF Audits",
                  "6-Month Priority Support",
                ],
                color: "teal",
                highlight: true,
              },
              {
                t: "Global Enterprise",
                p: "Custom",
                list: [
                  "Multi-Region Server Latency",
                  "Custom Hardware Bridging",
                  "Full System White-labeling",
                  "Dedicated DevOps Pipeline",
                  "On-site Implementation",
                ],
                color: "amber",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-[3.5rem] p-12 border ${tier.highlight ? "border-teal-500 ring-4 ring-teal-500/5 -translate-y-4 shadow-2xl shadow-teal-500/10" : "border-slate-100 shadow-sm shadow-slate-200/50"} flex flex-col h-full relative transition-all group`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-teal-600 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2 rounded-bl-3xl">
                    Most Versatile
                  </div>
                )}
                <h4 className="text-2xl font-black text-slate-900 mb-2 whitespace-pre-line leading-[0.5]">
                  {tier.t}
                </h4>
                <p className="text-5xl font-black text-slate-900 mb-10">{tier.p}</p>

                <div className="space-y-5 mb-12 flex-1">
                  {tier.list.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 items-center text-slate-500 font-light text-sm"
                    >
                      <IoCheckmarkCircleSharp className={`text-${tier.color}-500 text-lg shrink-0`} />{" "}
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${tier.highlight ? "bg-teal-600 text-white shadow-teal-600/30" : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"}`}
                >
                  Authorize Discovery
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="text-center py-40 bg-white rounded-[5rem] border border-slate-100 relative overflow-hidden group shadow-2xl shadow-slate-200/50 mx-4 md:mx-0 px-4 md:px-0">
          <div className="absolute inset-0 bg-teal-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-6 relative z-10"
          >
            <IoRepeatOutline className="text-7xl text-teal-600 mb-10 mx-auto opacity-20" />
            <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">
              Ditch the spreadsheets <br />
              <span className="text-teal-600 font-serif italic font-medium">
                Initialize SYICT Core.
              </span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-teal-600 text-white font-black rounded-xl hover:bg-teal-700 transition-all shadow-2xl shadow-teal-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Architecture Call
              </button>
              <Link
                href="/services/erp-crm/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IoCheckmarkCircleSharp({ className }) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path></svg>
  );
}
