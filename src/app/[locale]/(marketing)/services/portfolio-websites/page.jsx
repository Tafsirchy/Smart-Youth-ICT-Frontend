"use client";

import { motion } from "framer-motion";
import { IoDiamondOutline, IoColorPaletteOutline, IoLayersOutline, IoFlashOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const portfolioStyles = [
  {
    title: "Minimalist / Nordic",
    desc: "A focus on negative space and clean typography. Ideal for photographers, architects, and high-end fashion designers.",
    icon: <IoLayersOutline />,
    color: "bg-slate-900"
  },
  {
    title: "Magazine Style",
    desc: "Dynamic, large-scale imagery with bold, editorial-style layouts that make your content feel like a premium publication.",
    icon: <IoColorPaletteOutline />,
    color: "bg-rose-500"
  },
  {
    title: "Immersive Showcase",
    desc: "Utilizing deep interactions and subtle motion to pull the visitor into your creative world, creating an unforgettable experience.",
    icon: <IoFlashOutline />,
    color: "bg-emerald-600"
  }
];

export default function PortfolioWebsitesPage() {
  return (
    <section className="min-h-screen bg-white overflow-hidden relative">
      <div className="container-custom py-24">
        
        {/* Massive Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-black tracking-widest uppercase mb-8"
          >
            <IoDiamondOutline /> Stand Out Professionally
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-light text-slate-900 leading-[0.9] mb-8 tracking-tighter"
          >
            Digital <br className="hidden md:block"/> <span className="font-serif italic font-black">Portfolios.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Your work deserves a frame that amplifies its value. We design ultra-fast, minimalist, and stunning portfolio websites for creatives, freelancers, and global agencies to leave a lasting impression.
          </motion.p>
        </div>

        {/* Style Classifications */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-20 tracking-tight">Portfolio Classifications</h2>
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {portfolioStyles.map((style, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className={`w-16 h-16 rounded-2xl ${style.color} text-white flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-xl`}>
                  {style.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{style.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light text-lg">{style.desc}</p>
                
                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 relative aspect-[4/3] grayscale group-hover:grayscale-0 transition-all duration-700">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&h=600&fit=crop')] bg-cover bg-center"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Performance */}
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto mb-32 bg-slate-50 rounded-[3rem] p-12 lg:p-20 border border-slate-100">
           <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 underline decoration-brand-pink decoration-4 underline-offset-8">Engineered for Speed.</h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light mb-10">Static Site Generation (SSG) ensures your portfolio loads in under 1 second worldwide. Our sites consistently achieve 100/100 performance scores on Google Lighthouse.</p>
              
              <div className="grid grid-cols-2 gap-6">
                 {["Next.js Core", "Framer Motion", "Vercel Edge", "SEO Optimized"].map(stack => (
                    <div key={stack} className="flex gap-2 items-center text-sm font-bold text-slate-900">
                       <IoCheckmarkCircleOutline className="text-brand-pink" /> {stack}
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="relative">
              {/* Fake Lighthouse Score Visual */}
              <motion.div 
                 animate={{ rotate: [0, 5, 0] }}
                 transition={{ duration: 6, repeat: Infinity }}
                 className="w-full aspect-square bg-white rounded-full border-8 border-slate-100 shadow-2xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden"
              >
                 <div className="absolute inset-0 opacity-10 bg-emerald-500 blur-3xl rounded-full"></div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Performance Score</p>
                 <h4 className="text-9xl font-black text-emerald-500">100</h4>
                 <p className="text-emerald-500 font-bold mt-4 uppercase tracking-[0.3em] text-[10px]">Optimized for Search</p>
              </motion.div>
           </div>
        </div>

        {/* Call to Action Footer */}
        <div className="max-w-4xl mx-auto text-center py-20 pb-10 border-t border-slate-100 mt-20">
           <h3 className="text-3xl font-black text-slate-900 mb-10">Ready to build your digital legacy?</h3>
           <button className="px-12 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-brand-pink transition-colors shadow-2xl uppercase tracking-widest text-sm">
             Request A Portfolio Quote
           </button>
        </div>
      </div>
    </section>
  );
}
