"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoColorPaletteOutline, 
  IoTextOutline, 
  IoDiamondOutline, 
  IoFingerPrintOutline,
  IoTriangleOutline,
  IoInfiniteOutline,
  IoGitNetworkOutline,
  IoSparklesOutline
} from "react-icons/io5";

const brandingPillars = [
  {
    title: "Visual Geometry",
    desc: "We don't just 'draw' logos. We construct them using mathematical grids and the golden ratio for timeless balance.",
    icon: <IoTriangleOutline />,
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Psychological Palettes",
    desc: "Selection of hex codes that trigger specific brand sentiments and emotional resonance in your target audience.",
    icon: <IoColorPaletteOutline />,
    color: "from-purple-600 to-indigo-700"
  },
  {
    title: "Typographic Voice",
    desc: "Engineering primary and secondary typefaces that establish a clear hierarchy and establish your brand's authority.",
    icon: <IoTextOutline />,
    color: "from-slate-700 to-slate-900"
  }
];

export default function BrandingPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white overflow-hidden relative">
      {/* INDUSTRIAL BACKGROUND DECOR */}
      <div className="absolute top-0 opacity-20 pointer-events-none -z-10 w-full h-full">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200"></div>
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200"></div>
      </div>

      <div className="container-custom py-24 relative">
        {/* BRANDING HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-48 pt-10 px-4 md:px-0">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black tracking-[0.4em] uppercase mb-10"
            >
              <IoFingerPrintOutline className="text-sm" /> Visual Grammar Protocol
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] mb-12 tracking-tighter"
            >
              Beyond <br /> <span className="text-indigo-600 italic font-serif font-light">Identity.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mb-12"
            >
              Your logo is the first contact. We construct comprehensive visual identities that communicate deeply and command premium market positioning.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Brand Audit
              </button>
              <button className="w-full sm:w-[280px] px-8 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center">
                Portfolio Showcase
              </button>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden group"
            >
               {/* Mathematical Grid Overlay */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent"></div>

               <div className="relative aspect-square flex items-center justify-center">
                  {/* The Golden Ratio Visual Component */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-indigo-100 rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-20 border border-indigo-200 rounded-full border-dashed"
                  ></motion.div>

                  <div className="relative z-10 w-48 h-48 bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                     <IoDiamondOutline className="text-6xl text-white animate-pulse" />
                     {/* HUD Brackets */}
                     <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500 -translate-x-4 -translate-y-4"></div>
                     <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500 translate-x-4 translate-y-4"></div>
                  </div>

                  <div className="absolute bottom-4 left-4 font-mono text-[8px] text-slate-400 opacity-50 uppercase tracking-[0.4em]">
                     Scale::1.618 (Golden Ratio)
                  </div>
               </div>
            </motion.div>
          </div>
        </div>

        {/* PILLARS SECTION */}
        <div className="mb-48 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-l-4 border-indigo-600 pl-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4 font-bold">Design DNA</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                The pillars of <span className="text-slate-400 italic font-serif font-light">visual authority.</span>
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {brandingPillars.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="bg-white rounded-[3rem] p-12 h-full border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl transition-all group-hover:-translate-y-2 relative overflow-hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-3xl mb-10 shadow-lg`}
                  >
                    {item.icon}
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

        {/* BRAND BOOK VISUAL */}
        <div className="mb-48 px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/30 -skew-x-[20deg] origin-top translate-x-1/2"></div>
             
             <div className="relative z-10 space-y-12">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-600 border border-indigo-100">
                   <IoSparklesOutline />
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9]">The Corporate <br/><span className="text-indigo-600">Voice API.</span></h2>
                <p className="text-slate-500 text-xl font-light leading-relaxed">Consistency is absolute. We deliver a comprehensive brand manual documenting every pixel of your identity for flawless global scaling.</p>
                
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                   {[
                     { t: "Style Manual", d: "Usage & Exclusion zones" },
                     { t: "Color Systems", d: "HEX, RGB & CMYK Scales" },
                     { t: "Logic Grid", d: "Mathematical Construction" },
                     { t: "Tone of Voice", d: "Copywriting Syntax" }
                   ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                         <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{item.t}</h4>
                         <p className="text-xs text-slate-400 font-bold">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <motion.div
               initial={{ opacity: 0, scale: 0.9, rotateX: 5 }}
               whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
               className="relative bg-slate-50 aspect-[4/5] rounded-3xl shadow-2xl p-16 flex flex-col justify-between overflow-hidden border border-slate-200"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-[100px] border-b border-l border-slate-100"></div>
                <div>
                   <div className="w-16 h-16 bg-slate-900 mb-12 rounded-2xl shadow-xl flex items-center justify-center"><IoInfiniteOutline className="text-white text-3xl" /></div>
                   <h4 className="text-5xl font-serif italic text-slate-900 mb-6 font-bold pb-8 border-b border-slate-200 leading-none">Guideline.</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Build 14.2 / Confidential</p>
                   
                   <div className="space-y-6">
                      <div className="h-4 bg-slate-200 rounded-full w-full"></div>
                      <div className="h-4 bg-slate-200 rounded-full w-4/5"></div>
                      <div className="flex gap-4 pt-10">
                         <div className="w-12 h-12 rounded-xl bg-indigo-600 shadow-lg"></div>
                         <div className="w-12 h-12 rounded-xl bg-purple-600 shadow-lg"></div>
                         <div className="w-12 h-12 rounded-xl bg-slate-900 shadow-lg"></div>
                      </div>
                   </div>
                </div>
                <div className="text-slate-300 text-[9px] font-black uppercase tracking-[0.4em] text-center border-t border-slate-100 pt-8">SYICT Design Studio Protocol © 2026</div>
             </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200 px-4 md:px-0">
           <IoGitNetworkOutline className="text-7xl text-indigo-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Stop blending in. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 font-serif italic font-medium">Initialize Iconography.</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Consultation
              </button>
              <Link
                href="/services/branding/details"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Technical Details
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
