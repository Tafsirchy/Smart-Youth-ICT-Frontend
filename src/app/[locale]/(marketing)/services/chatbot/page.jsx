"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoChatbubblesOutline, 
  IoLogoWhatsapp, 
  IoLogoFacebook, 
  IoGlobeOutline, 
  IoAnalyticsOutline, 
  IoHardwareChipOutline,
  IoShieldCheckmarkOutline,
  IoPulseOutline,
  IoGitNetworkOutline,
  IoRocketOutline,
  IoSparklesOutline
} from "react-icons/io5";
import api from "@/lib/api";
import { getIcon } from "@/lib/icons";

export default function ChatbotDevelopmentPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/cms/services/web-software/chatbot");
        if (res.data.data) setContent(res.data.data);
      } catch (err) {
        console.error("Failed to load chatbot content", err);
      }
    };
    fetchData();
  }, []);

  const data = content?.landing || {
    hero: {
      badge: "✨ Next-Gen AI Support [NEW]",
      title: "Neural Response",
      description: "Architecting conversation with precision. We build RAG-powered, multi-channel AI agents that reduce operational friction and drive autonomous engagement."
    },
    sections: {
      pillars: [
        { title: "Neural Architectures", desc: "Utilizing Large Language Models (LLMs) to understand context, intent, and sentiment for human-level reasoning.", icon: "Chip", color: "from-emerald-500 to-teal-600" },
        { title: "Deterministic Logic", desc: "Structured workflow systems designed for high-velocity FAQ handling and precise data collection.", icon: "GitNetwork", color: "from-blue-500 to-indigo-600" },
        { title: "Hybrid Governance", desc: "Combining AI autonomy with seamless human-agent handoffs for enterprise-grade support reliability.", icon: "Analytics", color: "from-purple-500 to-fuchsia-600" }
      ],
      integrations: [
        { t: "WhatsApp Business", d: "High-latency direct chat" },
        { t: "Facebook Messenger", d: "Social commerce sync" },
        { t: "Native Web Chat", d: "Browser-level engagement" },
        { t: "GDPR Compliant", d: "ISO-27001 Security standards" }
      ]
    },
    cta: { title: "Build My AI Agent" }
  };

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white overflow-hidden relative font-sans">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
         <div className="absolute top-[10%] left-[-100px] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-20 relative z-10">
        {/* CHATBOT HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoSparklesOutline className="text-sm" /> {data.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
            >
              {data.hero.title?.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-500 animate-gradient-x">{data.hero.title?.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mb-12"
            >
              {data.hero.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize AI Deployment
              </button>
              <Link
                href="/services/chatbot/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Specifications
              </Link>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
               {/* Neural Connectivity Grid */}
               <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100 italic"></div>
               <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-100 font-mono text-[8px] text-slate-200 p-2">LATENCY::12ms</div>
               
               <div className="relative aspect-square flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-emerald-100 rounded-full border-dashed"
                  ></motion.div>
                  
                  <div className="relative z-10 w-48 h-48 bg-slate-900 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
                     <IoHardwareChipOutline className="text-6xl text-emerald-500 mb-4" />
                     <div className="flex gap-1">
                        {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                          <motion.div 
                            key={i} 
                            animate={{ height: [`${h * 20}px`, `${h * 40}px`, `${h * 20}px`] }} 
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                            className="w-1 bg-emerald-500 rounded-full"
                          />
                        ))}
                     </div>
                  </div>

                  {/* Floating AI Nodes */}
                  {[
                    { icon: <IoChatbubblesOutline />, pos: "top-10 left-10", label: "NLP_SYNC" },
                    { icon: <IoPulseOutline />, pos: "bottom-10 right-10", label: "RAG_PROTO" },
                    { icon: <IoGitNetworkOutline />, pos: "top-14 right-14", label: "MAPPED_V4" }
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                      className={`absolute ${node.pos} p-6 bg-white rounded-3xl border border-slate-100 shadow-xl flex flex-col items-center gap-2`}
                    >
                      <div className="text-emerald-600 text-2xl">{node.icon}</div>
                      <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">{node.label}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-emerald-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 font-bold">Model Architectures</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                The lifecycle of <span className="text-slate-400 italic font-serif font-light">autonomous support.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {(data.sections.pillars || []).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color || 'from-emerald-500 to-teal-600'} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}>
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MULTI-CHANNEL ECOSYSTEM */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/20 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl text-emerald-600 border border-emerald-100">
                   <IoGitNetworkOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">Multi-Channel <br/><span className="text-emerald-600">Omni-Sync.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">Don't limit your support to just one gate. We deploy your AI across all major platforms, keeping your knowledge base synchronized and secure.</p>
                
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                   {(data.sections.integrations || []).map((item, idx) => (
                      <div key={idx} className="space-y-2">
                         <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.t}</h4>
                         <p className="text-xs text-slate-400 font-bold">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 6, repeat: Infinity }}
               className="relative bg-slate-900 rounded-[3rem] p-12 border border-slate-800 shadow-2xl space-y-10 overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-emerald-400 bg-white/5 opacity-50 tracking-[0.4em]">CHANNEL_SYNC::READY</div>
                
                <div className="space-y-6">
                   <div className="flex items-center gap-4 border border-white/5 p-4 rounded-2xl bg-white/5">
                      <IoLogoWhatsapp className="text-emerald-500 text-2xl" />
                      <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} className="h-full bg-emerald-500" />
                      </div>
                   </div>
                   <div className="flex items-center gap-4 border border-white/5 p-4 rounded-2xl bg-white/5">
                      <IoGlobeOutline className="text-blue-400 text-2xl" />
                      <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: "95%" }} className="h-full bg-blue-400" />
                      </div>
                   </div>
                </div>

                <div className="h-32 bg-white/5 rounded-2xl border border-white/5 p-6 flex items-center justify-between">
                   <div className="space-y-2">
                      <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Global Status</p>
                      <p className="text-xs font-bold text-white tracking-tight">System Autonomous</p>
                   </div>
                   <IoShieldCheckmarkOutline className="text-4xl text-emerald-500 animate-pulse" />
                </div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoRocketOutline className="text-7xl text-emerald-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Your team doesn't sleep. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-500 font-serif italic font-medium">{data.cta.title?.split(' ')[0]} {data.cta.title?.split(' ').slice(1).join(' ')}.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                {data.cta.title}
              </button>
              <Link
                href="/services/chatbot/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Hub
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
