"use client";

import { motion } from "framer-motion";
import { 
  IoBusinessOutline, 
  IoFlashOutline, 
  IoShieldCheckmarkOutline, 
  IoAnalyticsOutline, 
  IoDesktopOutline, 
  IoGlobeOutline 
} from "react-icons/io5";

const verticalClassifications = [
  {
    title: "Startup & SaaS",
    desc: "Speed and conversion. Highly aggressive layouts built to explain your product and move visitors into your trial funnel immediately.",
    icon: <IoRocketOutline />,
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Enterprise Corporate",
    desc: "Scale and reliability. Structured, massive websites designed to communicate authority, investor relations, and deep brand value.",
    icon: <IoBusinessOutline />,
    color: "from-blue-700 to-slate-900"
  },
  {
    title: "Agency & Service",
    desc: "Visual storytelling and trust. Showcase your services and portfolio with elegant typography and lead-qualified contact flows.",
    icon: <IoBriefcaseOutline />,
    color: "from-rose-500 to-pink-500"
  }
];

const engineFeatures = [
  { t: "SEO First Architecture", d: "Schema markup, micro-data, and semantic HTML built directly into the core code." },
  { t: "High-Speed CDN Edge", d: "Global edge delivery via Vercel for 100ms first-contentful paint worldwide." },
  { t: "Conversion Optimized", d: "A/B testing ready funnels designed to maximize your return on ad spend." }
];

import { IoRocketOutline, IoBriefcaseOutline } from "react-icons/io5";

export default function BusinessWebsitesPage() {
  return (
    <section className="min-h-screen bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Hero Section */}
      <div className="container-custom pt-32 pb-20 relative z-10">
         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-2xl">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black tracking-widest uppercase mb-8 border border-blue-500/30"
               >
                 Corporate Scaling
               </motion.div>
               <motion.h1
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter"
               >
                 Business <br/> <span className="text-blue-500">Engines.</span>
               </motion.h1>
               <motion.p
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="text-slate-400 text-xl md:text-2xl font-light leading-relaxed mb-12"
               >
                 A general website isn't enough. We build conversion-first business engines that generate leads, establish immense trust, and look spectacular globally.
               </motion.p>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-10 py-5 bg-blue-600 text-white font-black rounded-full hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest text-sm">
                    Build My Business Site
                  </button>
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 transition-colors uppercase tracking-widest text-sm">
                    View Portfolio Case
                  </button>
               </div>
            </div>

            {/* Graphic Right - Enhanced Browser Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block perspective-1000"
            >
               <div className="w-full h-[600px] bg-slate-800 rounded-3xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform rotate-y-[-10deg] rotate-x-[5deg]">
                  <div className="h-12 bg-slate-900 border-b border-white/10 flex items-center px-6 gap-2">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                     </div>
                     <div className="mx-auto w-1/2 h-5 bg-slate-800 rounded-lg flex items-center justify-center text-[8px] text-slate-500 uppercase tracking-widest">https://yourbusiness.com</div>
                  </div>
                  <div className="flex-1 bg-white p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-[50px] opacity-20"></div>
                    <div className="w-40 h-8 bg-slate-200 rounded mb-12"></div>
                    <div className="w-full h-16 bg-slate-900 rounded-xl mb-6"></div>
                    <div className="w-3/4 h-16 bg-slate-900 rounded-xl mb-12"></div>
                    <div className="w-40 h-14 bg-blue-600 rounded-full mb-20 animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-6">
                       <div className="h-32 bg-slate-100 rounded-2xl"></div>
                       <div className="h-32 bg-slate-100 rounded-2xl"></div>
                       <div className="h-32 bg-slate-100 rounded-2xl"></div>
                    </div>
                  </div>
               </div>
               
               {/* Floating elements for depth */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -right-10 top-20 w-48 p-6 bg-slate-900 border border-white/20 rounded-2xl shadow-2xl z-20"
               >
                  <p className="text-[10px] text-blue-400 font-black uppercase mb-2">Growth Rate</p>
                  <p className="text-3xl font-black text-white">+114%</p>
               </motion.div>
            </motion.div>
         </div>
      </div>

      {/* Classifications Section */}
      <div className="bg-slate-950 py-32 border-t border-white/5 relative">
         <div className="container-custom">
            <h2 className="text-4xl lg:text-5xl font-black text-white text-center mb-24 tracking-tighter">Business Sector Classifications.</h2>
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
               {verticalClassifications.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/10 transition-all"
                  >
                     <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
                     <div className="text-4xl text-white mb-8 group-hover:scale-110 transition-transform w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        {item.icon}
                     </div>
                     <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                     <p className="text-slate-400 font-light leading-relaxed text-lg">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>

      {/* Leads Engine Detailed Features */}
      <div className="container-custom py-32">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1">
               <h2 className="text-5xl font-black text-white leading-tight mb-8">Built for <br/><span className="text-blue-500">Unfair Advantage.</span></h2>
               <div className="space-y-10">
                  {engineFeatures.map((feat, i) => (
                     <div key={i} className="space-y-2">
                        <h4 className="text-xl font-bold text-white flex items-center gap-3">
                           <IoFlashOutline className="text-blue-500" /> {feat.t}
                        </h4>
                        <p className="text-slate-400 font-light leading-relaxed pl-8">{feat.d}</p>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
               {[
                 { v: "100ms", l: "Edge Speed" },
                 { v: "GDPR", l: "Compliant" },
                 { v: "24/7", l: "Uptime" },
                 { v: "Next.js", l: "Native Stack" }
               ].map((stat, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] text-center">
                     <p className="text-3xl font-black text-white mb-1 uppercase tracking-tight">{stat.v}</p>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.l}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
}
