"use client";

import { motion } from "framer-motion";
import { 
  IoChatbubblesOutline, 
  IoLogoWhatsapp, 
  IoLogoFacebook, 
  IoGlobeOutline, 
  IoAnalyticsOutline, 
  IoHardwareChipOutline,
  IoShieldCheckmarkOutline
} from "react-icons/io5";

const botClassifications = [
  {
    title: "NLP-Based (Brain)",
    desc: "Utilizing Large Language Models (LLMs) to understand context, intent, and sentiment for human-like conversations.",
    icon: <IoHardwareChipOutline />,
    color: "bg-emerald-500"
  },
  {
    title: "Rule-Based (Logic)",
    desc: "Fixed flow systems designed for rapid FAQ handling and structured data collection (e.g., appointment booking).",
    icon: <IoChatbubblesOutline />,
    color: "bg-blue-500"
  },
  {
    title: "Hybrid (Support)",
    desc: "Combining AI intelligence with seamless human-agent handoffs for complex enterprise-grade support.",
    icon: <IoAnalyticsOutline />,
    color: "bg-purple-500"
  }
];

export default function ChatbotDevelopmentPage() {
  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px] opacity-[0.03] pointer-events-none -z-10"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        
        {/* AI Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-widest uppercase mb-8 border border-emerald-500/20"
          >
            ✨ Next-Gen AI Support
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] mb-8 tracking-tighter"
          >
            AI Chatbot <br className="hidden md:block"/> <span className="text-emerald-500">Engines.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Automate your customer service entirely. We train custom AI models based on your exact business data to answer queries flawlessly 24/7.
          </motion.p>
        </div>

        {/* Model Classifications */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-white text-center mb-24 tracking-tighter">AI Logic Classifications</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {botClassifications.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-5 rounded-full blur-[40px] group-hover:opacity-10 transition-opacity`}></div>
                <div className={`text-4xl text-white mb-8 group-hover:scale-110 transition-transform w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Multi-Channel Ecosystem Visual */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-slate-900/50 rounded-[3rem] p-12 lg:p-20 border border-white/5 relative overflow-hidden">
           <div className="space-y-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">Multi-Channel <br/><span className="text-emerald-500 underline decoration-4 underline-offset-8">Deployment.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">Don't limit your support to just your website. We deploy your AI bot across all major communication channels simultaneously, keeping your data synchronized.</p>
              
              <div className="flex gap-6 text-3xl text-white/50">
                 <div className="hover:text-emerald-500 transition-colors"><IoLogoWhatsapp /></div>
                 <div className="hover:text-blue-500 transition-colors"><IoLogoFacebook /></div>
                 <div className="hover:text-white transition-colors"><IoGlobeOutline /></div>
              </div>
              
              <div className="pt-10 flex gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] text-emerald-500 uppercase font-black tracking-widest"><IoShieldCheckmarkOutline /> GDPR Compliant</div>
              </div>
           </div>

           {/* Interactive Chat Mockup */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-black border border-white/10 rounded-[2.5rem] p-8 h-full min-h-[450px] shadow-2xl relative overflow-hidden flex flex-col"
           >
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                 <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"><IoChatbubblesOutline /></div>
                 <div>
                    <p className="text-white font-bold text-sm">SYICT AI Engine</p>
                    <p className="text-emerald-500 text-[10px] font-black tracking-widest animate-pulse">AUTONOMOUS</p>
                 </div>
              </div>
              
              <div className="flex-1 space-y-6">
                 <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl rounded-tl-sm max-w-[85%] text-sm">
                    Analysing your catalog... Done. I can now assist with order tracking, product recommendations, and payment processing. Ready to begin?
                 </div>
                 <div className="bg-emerald-600 text-white p-4 rounded-2xl rounded-tr-sm self-end max-w-[85%] text-sm ml-auto">
                    Check status for Order #8210?
                 </div>
                 <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl rounded-tl-sm max-w-[85%] text-sm flex gap-2 items-center italic">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                 </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/5">
                 <div className="h-12 bg-white/5 rounded-full flex items-center px-4 justify-between">
                    <p className="text-slate-600 text-xs text-brand-blue">Talk to AI...</p>
                    <div className="w-8 h-8 rounded-full bg-emerald-500"></div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-20">
           <h3 className="text-4xl font-black text-white mb-10 tracking-tight italic">Your support team doesn't need sleep. Your AI does it for them.</h3>
           <button className="px-12 py-5 bg-emerald-500 text-black font-extrabold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-emerald-500/30 uppercase tracking-widest text-sm">
             Build My AI Agent
           </button>
        </div>
      </div>
    </section>
  );
}
