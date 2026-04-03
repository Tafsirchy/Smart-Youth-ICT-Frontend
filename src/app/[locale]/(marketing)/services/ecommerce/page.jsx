"use client";

import { motion } from "framer-motion";
import { 
  IoCartOutline, 
  IoCardOutline, 
  IoBagCheckOutline, 
  IoPeopleOutline, 
  IoShieldCheckmarkOutline, 
  IoFlashOutline,
  IoStatsChartOutline
} from "react-icons/io5";

const commerceClassifications = [
  {
    title: "Direct-to-Consumer (D2C)",
    desc: "Bespoke storefronts designed for single-brand dominance. Focus on storytelling, high-speed product grids, and frictionless 1-click checkouts.",
    icon: <IoCartOutline />,
    bg: "bg-rose-500"
  },
  {
    title: "Multi-Vendor Marketplace",
    desc: "Complex architectures allowing hundreds of sellers to manage their own inventories. Includes robust commission engines and vendor dashboards.",
    icon: <IoPeopleOutline />,
    bg: "bg-purple-600"
  },
  {
    title: "B2B Bulk Portals",
    desc: "Streamlined wholesale ordering systems with tiered pricing, inventory reservation, and automated quotation systems for bulk trade.",
    icon: <IoBagCheckOutline />,
    bg: "bg-emerald-600"
  }
];

const checkputFeatures = [
  { t: "Atomic Checkout", d: "A 3-step checkout process designed to eliminate cart abandonment up to 40%." },
  { t: "Localized Gateways", d: "Native integrations with bKash, Nagad, SSLCommerz, and Stripe." },
  { t: "Dynamic Tax & Shipping", d: "Real-time calculation based on geographical regions and courier API integrations." }
];

export default function EcommercePage() {
  return (
    <section className="min-h-screen bg-rose-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-200/50 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      
      {/* Hero Section */}
      <div className="container-custom pt-32 pb-20 relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-black tracking-widest uppercase mb-8 shadow-xl shadow-rose-500/30"
        >
          High Conversion Architectures
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter"
        >
          Commerce <br/> <span className="text-rose-500">Engines.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed mb-12 max-w-4xl mx-auto"
        >
          Turning visitors into loyal buyers. We build robust, scalable online stores equipped with seamless payment gateways, inventory synchronization, and zero-friction checkouts.
        </motion.p>
      </div>

      {/* Classifications Grid */}
      <div className="container-custom mb-32">
        <h2 className="text-4xl font-black text-slate-900 text-center mb-24 tracking-tight">Commerce Classifications</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {commerceClassifications.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[3rem] p-10 shadow-xl border border-rose-100/50 hover:-translate-y-2 transition-transform group"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.bg} text-white flex items-center justify-center text-3xl mb-8 shadow-2xl`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Engineering Section */}
      <div className="container-custom py-24 bg-white rounded-[4rem] border border-rose-100 shadow-2xl shadow-rose-200/50 mb-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 -skew-x-[20deg] origin-top translate-x-1/2"></div>
         
         <div className="flex flex-col lg:flex-row gap-20 relative z-10 px-8 lg:px-20">
            <div className="flex-1 space-y-12">
               <h2 className="text-5xl font-black text-slate-900 leading-tight">Engineering the <br/><span className="text-rose-500 underline decoration-4 underline-offset-8">Perfect Checkout.</span></h2>
               <div className="space-y-8">
                  {checkputFeatures.map((f, idx) => (
                    <div key={idx} className="flex gap-6 items-start">
                       <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center font-black text-xl shrink-0"><IoCheckmarkCircleOutline /></div>
                       <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{f.t}</h4>
                          <p className="text-slate-500 font-light leading-relaxed">{f.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Dashboard Mockup Visual */}
            <div className="flex-1">
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-slate-900 rounded-[3rem] p-10 h-full min-h-[450px] shadow-2xl relative overflow-hidden border-8 border-slate-800"
               >
                  <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8 font-black">
                     <p className="text-white text-xl">Revenue Dashboard</p>
                     <p className="text-emerald-400 font-mono">+186% Growth</p>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="flex justify-between items-end gap-2 h-40">
                        <div className="bg-rose-500 w-full h-1/2 rounded-t-lg"></div>
                        <div className="bg-rose-500 w-full h-3/4 rounded-t-lg"></div>
                        <div className="bg-emerald-500 w-full h-full rounded-t-lg shadow-[0_0_20px_rgba(16,185,129,0.3)]"></div>
                        <div className="bg-rose-500 w-full h-2/3 rounded-t-lg"></div>
                        <div className="bg-rose-500 w-full h-4/5 rounded-t-lg"></div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                           <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Abandoned Carts</p>
                           <p className="text-2xl font-black text-white">04.2%</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                           <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Success Orders</p>
                           <p className="text-2xl font-black text-emerald-400">1.2k</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
      
      {/* Commerce CTA */}
      <div className="container-custom pb-24 text-center">
         <h3 className="text-3xl font-black text-slate-700 mb-10">Start scaling your sales infrastructure today.</h3>
         <button className="px-12 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-rose-500 transition-colors shadow-2xl uppercase tracking-widest text-sm">
            Talk to an E-commerce Architect
         </button>
      </div>
    </section>
  );
}

import { IoCheckmarkCircleOutline } from "react-icons/io5";
