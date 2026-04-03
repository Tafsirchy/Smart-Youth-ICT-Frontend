"use client";

import { motion } from "framer-motion";
import { 
  IoGlobeOutline, 
  IoWalletOutline, 
  IoTrendingUpOutline, 
  IoStar, 
  IoBriefcaseOutline, 
  IoRocketOutline, 
  IoShieldCheckmarkOutline,
  IoCheckmarkCircleOutline
} from "react-icons/io5";

const classifications = [
  {
    title: "Upwork (Global Projects)",
    type: "High-Ticket & Agency",
    desc: "Focus on long-term contracts and high-value project-based work. We teach you to build a specialist profile and bid for premium enterprise clients.",
    icon: <IoBriefcaseOutline />,
    color: "bg-emerald-600",
    features: ["Agency-level profile setup", "Advanced Bidding Psychology", "Contract Management"]
  },
  {
    title: "Fiverr (Specialized Gigs)",
    type: "Volume & Speed",
    desc: "Perfect for quick-start income. Master gig SEO, thumbnail psychology, and automated response systems to dominate your niche quickly.",
    icon: <IoRocketOutline />,
    color: "bg-[#1dbf73]",
    features: ["Gig Ranking SEO", "Buyer Request Strategies", "Order Queue Optimization"]
  },
  {
    title: "LinkedIn & Direct",
    type: "Networking & P2P",
    desc: "Avoid marketplace fees. Learn to source high-paying direct clients through professional networking and cold outreach strategies.",
    icon: <IoGlobeOutline />,
    color: "bg-blue-600",
    features: ["LinkedIn Lead Generation", "Cold Email Mastery", "Direct Invoicing & PayPal"]
  }
];

const phases = [
  { step: "01", title: "Identity & Asset Curation", desc: "Building a global-standard portfolio that bypasses cultural and geographical filters instantly." },
  { step: "02", title: "The Art of the Win", desc: "Scientific proposal writing. We provide templates that have a 70% reply rate across major marketplaces." },
  { step: "03", title: "Project Lifecycle", desc: "Managing client expectations, handled revisions, and ensuring 5-star feedback every single time." },
  { step: "04", title: "Financial Freedom", desc: "Securely withdrawing dollars via Payoneer/Wise and navigating legal taxations flawlessly." }
];

export default function FreelancingTrainingPage() {
  return (
    <section className="min-h-screen bg-slate-50 overflow-hidden relative">
      <div className="container-custom py-24">
        
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto mb-24 bg-white rounded-[3rem] p-12 lg:p-20 border border-slate-200 shadow-xl shadow-slate-200/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black tracking-widest uppercase mb-8"
          >
            <IoGlobeOutline size={16} /> Global Financial Freedom
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8"
          >
            Launch Your <br className="hidden md:block"/> <span className="text-emerald-600">Global Career.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl md:text-2xl leading-relaxed font-light max-w-3xl mx-auto"
          >
            Learning a skill is only 50% of the journey. The other 50% is knowing exactly how to sell it. Our modules turn technical students into high-earning global freelancers.
          </motion.p>
        </div>

        {/* Marketplace Classification */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-16">Marketplace Classifications</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {classifications.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/30 group hover:-translate-y-2 transition-transform"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center text-3xl mb-8 shadow-lg`}>
                   {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">{item.type}</p>
                <p className="text-slate-600 leading-relaxed mb-8">{item.desc}</p>
                
                <div className="space-y-3 pt-6 border-t border-slate-100">
                   {item.features.map(f => (
                     <div key={f} className="flex gap-2 items-center text-sm font-bold text-slate-700">
                        <IoCheckmarkCircleOutline className="text-emerald-500" /> {f}
                     </div>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Mechanics (Roadmap) */}
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto mb-32">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">The 4-Phase Mastery Roadmap.</h2>
            <div className="space-y-10">
              {phases.map((p, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1 text-slate-200 font-black text-4xl select-none leading-none">{p.step}</div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light text-lg">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-emerald-100 rounded-full blur-[100px] opacity-40 -z-10 translate-x-1/4"></div>
             {/* Large Mockup Element */}
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white rounded-[3rem] shadow-2xl p-10 border border-slate-200 relative overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-full h-3 bg-emerald-600"></div>
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-emerald-600 text-3xl font-black shadow-sm">U</div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xl tracking-tight">Verified Expert</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Status</p>
                    </div>
                  </div>
                  <div className="text-emerald-500 font-bold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                     +100% Success
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="h-6 bg-slate-100 rounded-full w-full"></div>
                   <div className="h-6 bg-slate-100 rounded-full w-3/4"></div>
                   
                   <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Earnings</p>
                         <p className="text-2xl font-black text-slate-900">$24,500</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-emerald-600">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Projects</p>
                         <p className="text-2xl font-black text-slate-900">142+</p>
                      </div>
                   </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                   <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Withdrawal Status: <span className="text-emerald-600">Ready</span></p>
                </div>
             </motion.div>
          </div>
        </div>

        {/* Global Toolkit Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/20 blur-[120px] pointer-events-none"></div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6"
          >
            Global Industry Standard
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 relative z-10">The Success Toolkit.</h2>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12 relative z-10 opacity-60 hover:opacity-100 transition-opacity">
             {["Upwork", "Fiverr", "Payoneer", "Wise", "Slack", "LinkedIn"].map(tool => (
               <div key={tool} className="text-2xl md:text-3xl font-black text-white/50 hover:text-white transition-colors cursor-default select-none uppercase tracking-tighter italic">
                 {tool}
               </div>
             ))}
          </div>
          <button className="mt-16 px-10 py-5 bg-emerald-500 text-white font-black rounded-full hover:scale-105 transition-transform shadow-2xl relative z-10">
             Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
