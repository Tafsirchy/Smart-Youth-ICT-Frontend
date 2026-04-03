"use client";

import { motion } from "framer-motion";
import { 
  IoColorPaletteOutline, 
  IoTextOutline, 
  IoBusinessOutline, 
  IoDiamondOutline, 
  IoCheckmarkCircleOutline,
  IoFingerPrintOutline
} from "react-icons/io5";

const brandingPillars = [
  {
    title: "Visual Geometry",
    desc: "We don't just 'draw' logos. We construct them using mathematical grids and the golden ratio for timeless balance.",
    icon: <IoDiamondOutline />,
    color: "bg-slate-900"
  },
  {
    title: "Color Psychology",
    desc: "Mapping specific hex codes to human emotions. We select palettes that trigger the exact brand sentiment you desire.",
    icon: <IoColorPaletteOutline />,
    color: "bg-rose-500"
  },
  {
    title: "Typography Systems",
    desc: "Selection of primary and secondary typefaces that establish hierarchy and reinforce your brand's unique voice.",
    icon: <IoTextOutline />,
    color: "bg-blue-600"
  }
];

export default function BrandingPage() {
  return (
    <section className="min-h-screen bg-white overflow-hidden relative">
      <div className="container-custom py-24">
        
        {/* Elegant Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-black tracking-widest uppercase mb-8"
          >
            <IoFingerPrintOutline /> Distinctive Identity
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif italic text-slate-900 leading-[0.9] mb-8 tracking-tighter"
          >
            Brand <br className="hidden md:block"/> <span className="font-sans not-italic font-black">Identity.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Your logo is just the beginning. We construct comprehensive visual identities that communicate deeply with your audience and command premium positioning in your market.
          </motion.p>
        </div>

        {/* The 3 Pillars Section */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-20 tracking-tight">The 3 Pillars of Identity</h2>
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {brandingPillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl ${pillar.color} text-white flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-xl`}>
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light text-lg">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brand Guideline Preview Visual */}
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto mb-32 bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-800/50 -skew-x-12 translate-x-1/2"></div>
           
           <div className="relative z-10 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">The Corporate <br/><span className="text-brand-pink underline underline-offset-8">Guideline PDF.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">Consistency is power. We deliver an 80+ page brand book detailing exactly how to use your logo, patterns, and colors across web, print, and social media.</p>
              
              <div className="grid grid-cols-2 gap-4">
                 {["Spacing Rules", "Iconography", "Tone of Voice", "Digital Mockups"].map(item => (
                    <div key={item} className="flex gap-2 items-center text-sm font-bold text-white">
                       <IoCheckmarkCircleOutline className="text-brand-pink" /> {item}
                    </div>
                 ))}
              </div>
           </div>

           {/* Guideline Document Mockup */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
             whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
             viewport={{ once: true }}
             className="relative bg-white aspect-[4/5] rounded-xl shadow-2xl p-12 flex flex-col justify-between overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-bl-[100px]"></div>
              <div>
                 <div className="w-12 h-12 bg-slate-900 mb-10 rounded-lg"></div>
                 <h4 className="text-4xl font-serif italic text-slate-900 mb-4 font-bold border-b border-slate-200 pb-4">Style Guide</h4>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">Version 2.4 / Confidential</p>
                 
                 <div className="space-y-4">
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                    <div className="flex gap-2">
                       <div className="w-8 h-8 rounded bg-rose-500"></div>
                       <div className="w-8 h-8 rounded bg-blue-600"></div>
                       <div className="w-8 h-8 rounded bg-slate-900"></div>
                    </div>
                 </div>
              </div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">SYICT Design Studio © 2026</div>
           </motion.div>
        </div>

        {/* Branding Footer Action */}
        <div className="max-w-4xl mx-auto text-center py-20 border-t border-slate-100">
           <h3 className="text-3xl font-black text-slate-900 mb-10">Stop blending in. Start being iconic.</h3>
           <button className="px-12 py-5 bg-slate-900 text-white font-black rounded-full hover:bg-brand-pink transition-colors shadow-2xl uppercase tracking-widest text-sm">
             Request Brand Consultation
           </button>
        </div>
      </div>
    </section>
  );
}
