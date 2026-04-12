"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoShieldCheckmarkOutline, 
  IoHardwareChipOutline,
  IoSettingsOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleSharp,
  IoFlashOutline,
  IoGitNetworkOutline
} from "react-icons/io5";

export default function EcommerceDetailsPage() {
  const readinessChecklist = [
    { t: "SKU & Catalog Manifest", d: "Structured CSV/JSON of products, variants, pricing, and inventory levels." },
    { t: "Payment Gateway Credentials", d: "Production/Sandbox keys for SSLCommerz, bKash, Nagad, or Stripe." },
    { t: "Logistics API Protocols", d: "Courier service account IDs and webhook endpoints for automated shipping." },
    { t: "Brand Asset Architecture", d: "High-fidelity vectors, product photography, and typography systems." },
    { t: "Legal & Compliance Data", d: "Localized terms of service, refund protocols, and privacy documentation." }
  ];

  const engineSpecs = [
    { label: "Core Infrastructure", value: "Next.js 14 (App Router) + TypeScript" },
    { label: "Commerce Logic", value: "Headless (Medusa / Shopify / Node.js)" },
    { label: "Data Delivery", value: "Server Components (RSC) + Suspense" },
    { label: "Global Edge", value: "Vercel / AWS CloudFront" },
    { label: "Sync Engine", value: "Redis-backed Real-time Inventory" },
    { label: "Payment Security", value: "PCI-DSS Level 1 Compliant Integration" }
  ];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-600 pb-40">
      
      {/* STEALTH HEADER */}
      <div className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
         <div className="container-custom py-6 flex justify-between items-center">
            <Link href="/services/ecommerce" className="flex items-center gap-2 text-slate-500 hover:text-rose-600 font-bold transition-all group">
               <IoArrowBackOutline className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm uppercase tracking-widest">Store Engine</span>
            </Link>
            <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
               <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-[pulse_2s_infinite]"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Security Layer: Encrypted</p>
            </div>
         </div>
      </div>

      <div className="container-custom pt-24 text-slate-900">
        
        {/* ARCHITECTURE HERO */}
        <div className="max-w-5xl mb-40">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
           >
              <IoSettingsOutline className="text-sm animate-spin-slow" /> Technical Specification Protocol
           </motion.div>
           
           <motion.h1 
             className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] mb-12 tracking-tighter"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             Commerce <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600 font-serif italic font-light">Integrity.</span>
           </motion.h1>

           <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
              We deliver zero-friction online storefronts designed for massive scale. Here is the technical manifest of our commerce engines.
           </p>
        </div>

        {/* PERFORMANCE GRID */}
        <div className="grid lg:grid-cols-2 gap-12 mb-48">
           <div className="bg-white rounded-[4rem] p-12 lg:p-20 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <IoFlashOutline className="text-5xl text-rose-500 mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-6">Sub-Second Velocity</h3>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-10">
                 By leveraging **Next.js Server Components (RSC)**, we eliminate client-side JS overhead, delivering instantaneous product filtering and checkout flows that outperform standard builders by **4x**.
              </p>
              <div className="h-[1px] w-full bg-slate-100 mb-10"></div>
              <ul className="space-y-4">
                 {["Instant Search Indexing", "Edge-Cached Images", "Optimized Core Web Vitals"].map(item => (
                    <li key={item} className="flex gap-3 items-center text-sm font-bold text-slate-400">
                       <IoCheckmarkCircleSharp className="text-rose-500 text-lg" /> {item}
                    </li>
                 ))}
              </ul>
           </div>

           <div className="bg-white rounded-[4rem] p-12 lg:p-20 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <IoShieldCheckmarkOutline className="text-5xl text-rose-400 mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-6">Transaction Shield</h3>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-10">
                 Native integration with **3D Secure 2.0** and automated fraud detection ensures your revenue is protected from the first transaction, reducing chargeback risks by up to **80%**.
              </p>
              <div className="h-[1px] w-full bg-slate-100 mb-10"></div>
              <ul className="space-y-4">
                 {["PCI-DSS Level 1 Logic", "Automated AML Checks", "Encrypted Data Vaults"].map(item => (
                    <li key={item} className="flex gap-3 items-center text-sm font-bold text-slate-400">
                       <IoCheckmarkCircleSharp className="text-rose-400 text-lg" /> {item}
                    </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* THE ENGINE MANIFEST (Table) */}
        <div className="mb-48">
           <div className="max-w-xl mb-16">
              <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-4">The Manifest</h2>
              <p className="text-4xl font-black text-slate-900 leading-tight">Commerce Specification <span className="text-slate-300">Database.</span></p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-1 px-8 lg:px-0 bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
              {engineSpecs.map((spec, idx) => (
                 <div key={idx} className="p-10 border-b border-r border-slate-100 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{spec.label}</p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{spec.value}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* COMMERCE READINESS VAULT */}
        <div className="bg-white rounded-[5rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-2/3 h-full bg-rose-50 -skew-x-[20deg] origin-top translate-x-1/2 opacity-50"></div>
           
           <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                 <div className="max-w-2xl">
                    <h1 className="text-fluid-h1 font-black tracking-tighter mb-12 leading-none">
                      Transaction <br/> <span className="text-slate-400 italic">Logic.</span>
                    </h1>
                    <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl italic">
                      "Commerce is not about products; it's about the reduction of transactional friction through secure technical architecture."
                    </p>
                 </div>
                 <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100">
                    <IoLockClosedOutline className="text-4xl text-rose-500" />
                 </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {readinessChecklist.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-rose-500/30 transition-all group">
                       <h4 className="font-bold text-slate-900 mb-4 group-hover:text-rose-500 transition-colors">{item.t}</h4>
                       <p className="text-sm text-slate-500 font-light leading-relaxed">{item.d}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* CALL TO ORDER */}
        <div className="mt-48 text-center bg-rose-600 rounded-[4rem] py-32 relative overflow-hidden group shadow-2xl shadow-rose-500/30">
           <div className="relative z-10 flex flex-col items-center">
              <IoGitNetworkOutline className="text-8xl text-white opacity-20 mb-12 animate-pulse" />
              <h3 className="text-5xl lg:text-7xl font-black text-white mb-12 leading-tight">Initialize Your <br/><span className="font-serif italic font-light text-rose-200">Commerce Engine.</span></h3>
              <div className="flex flex-col sm:flex-row gap-6">
                 <button className="px-16 py-6 bg-white text-rose-600 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-xs">
                    Start Architecture Brief
                 </button>
                 <Link href="/services/ecommerce" className="px-16 py-6 bg-rose-700 text-white font-black rounded-2xl hover:bg-rose-800 transition-all shadow-2xl uppercase tracking-widest text-xs flex items-center justify-center">
                    Return to Storefront
                 </Link>
              </div>
           </div>
           
           {/* Background Overlay */}
           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
