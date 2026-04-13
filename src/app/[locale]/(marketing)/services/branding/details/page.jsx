"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  IoArrowBackOutline, 
  IoTriangleOutline, 
  IoColorPaletteOutline, 
  IoJournalOutline,
  IoFingerPrintOutline,
  IoSyncOutline,
  IoTerminalOutline,
  IoHardwareChipOutline,
  IoCheckmarkCircleOutline,
  IoInfiniteOutline,
  IoDiamondOutline
} from "react-icons/io5";

const brandingProtocol = [
  { step: "01", stage: "Syntactic Research", action: "Analyzing market linguistics and defining the brand's unique semantic hooks." },
  { step: "02", stage: "Geometric Baseline", action: "Setting up mathematical grids and Fibonacci ratios for structural balance." },
  { step: "03", stage: "Core Construction", action: "Iterative sketching and vector refining of the primary mark." },
  { step: "04", stage: "Chromodynamic Mapping", action: "Synthesizing color palettes based on emotional delta and accessibility." },
  { step: "05", stage: "Voice & Tone Logic", action: "Engineering the copywriting syntax and communication manifest." },
  { step: "06", stage: "Governance Manual", action: "Documenting usage limits, spacing, and scaling protocols for global growth." }
];

const brandSpecs = [
  { group: "Visual Grammar", items: ["Grid-Based Logic", "Exclusion Zones", "Golden Ratio Scaling", "Adaptive Systems"] },
  { group: "Color Science", items: ["Emotion Mapping", "Delta-E Compliance", "WCAG AA Contrast", "Sub-Brand Palettes"] },
  { group: "Authority Tier", items: ["Corporate Tone Guide", "Typeface Licensing", "Iconography Logic", "Motion DNA"] }
];

export default function BrandingDetailsPage() {
  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white pb-40">
      {/* PERSISTENT BREADCRUMB */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link href="/services/branding" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
            <IoArrowBackOutline className="text-sm" /> Infrastructure Overview
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">BRAND_SPEC_v2.4</div>
        </div>
      </div>

      <div className="container-custom pt-20">
        {/* TECH HEADER */}
        <div className="max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-indigo-600 mb-8"
          >
            <div className="w-12 h-[1px] bg-indigo-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Visual Grammar Manifest</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Identity <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 animate-gradient-x">Architecture</span>
          </h1>
          <p className="text-slate-600 text-xl font-light leading-relaxed max-w-2xl italic">
            "A brand is not a logo; it's a structural promise. We treat identity as a mathematical and psychological engineering discipline."
          </p>
        </div>

        {/* 6-PHASE PROTOCOL GRID */}
        <div className="mb-48">
          <div className="flex items-center gap-8 mb-20">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Engineering Lifecycle</h2>
             <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            {brandingProtocol.map((item, i) => (
              <div key={i} className="bg-white p-12 hover:bg-slate-50 transition-colors group">
                 <div className="text-indigo-600 font-mono text-xs mb-8 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span> 
                    {item.step} // DISCIPLINE_SYNC
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{item.stage}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LOGO CONSTRUCTION SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-48">
           <div className="sticky top-32">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl text-indigo-600 mb-10 border border-indigo-100">
                <IoTriangleOutline />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Geometric <br/> Construction <span className="text-indigo-600">Matrix.</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">We use mathematical grids and the golden ratio (1.618) to ensure every brand we build possesses internal structural harmony and timeless visual balance.</p>
              
              <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-between group cursor-default">
                 <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg"><IoDiamondOutline className="text-2xl" /></div>
                    <div>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Logic Audit</p>
                       <p className="text-xs font-bold text-white tracking-tight">SYMMETRY_RATIO::1:1.6</p>
                    </div>
                 </div>
                 <IoSyncOutline className="text-emerald-500 text-xl animate-spin-slow" />
              </div>
           </div>

           <div className="space-y-6">
              {brandSpecs.map((spec, idx) => (
                 <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">{spec.group} Protocol</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {spec.items.map(item => (
                          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                             <IoCheckmarkCircleOutline className="text-indigo-600 text-lg" /> {item}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* CHROMODYNAMIC SECTION */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden mb-48">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/50 border-l border-slate-100 skew-x-12 translate-x-12"></div>
           <div className="grid lg:grid-cols-2 gap-20 relative z-10">
              <div>
                 <div className="text-indigo-600 mb-8 flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-indigo-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Color Psychology</span>
                 </div>
                 <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[0.9]">Chromodynamic <br/><span className="text-indigo-600">Synthesis.</span></h2>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 italic">"Colors aren't just aesthetic; they are neural triggers. We map palettes to brand sentiment and accessibility standards."</p>
                 
                 <div className="space-y-4">
                    {[
                       { i: <IoColorPaletteOutline />, t: "Delta-E Compliance", d: "Ensuring color consistency across all digital/print outputs." },
                       { i: <IoTerminalOutline />, t: "HEX/RGB Logic", d: "Standardized code handoffs for digital implementation." },
                       { i: <IoHardwareChipOutline />, t: "Print Precision", d: "Pantone & CMYK mapping for material assets." }
                    ].map((feat, i) => (
                       <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="text-2xl text-indigo-600">{feat.i}</div>
                          <div>
                             <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{feat.t}</h5>
                             <p className="text-xs text-slate-400 font-bold">{feat.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl aspect-[3/4] flex flex-col justify-between group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center text-white/30 font-mono text-[8px] tracking-[0.4em]">
                          <span>SYS_ID_PROTO</span>
                          <span>IDENTITY_ENGINE</span>
                       </div>
                       
                       <div className="space-y-4">
                          <div className="h-[1px] w-full bg-white/10"></div>
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xs"><IoInfiniteOutline /></div>
                             <div className="flex-1 space-y-2">
                                <div className="h-1.5 bg-white/10 rounded-full w-full"></div>
                                <div className="h-1.5 bg-white/5 rounded-full w-2/3"></div>
                             </div>
                          </div>
                       </div>

                       <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-mono text-emerald-400 mb-2 tracking-tighter">THEME_SYNC::VERIFIED</p>
                          <div className="flex gap-3 mt-4">
                             <div className="w-8 h-8 rounded-lg bg-indigo-500"></div>
                             <div className="w-8 h-8 rounded-lg bg-purple-500"></div>
                             <div className="w-8 h-8 rounded-lg bg-white/10"></div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 relative overflow-hidden group/m hover:bg-white/10 transition-all">
                       <IoJournalOutline className="text-4xl text-indigo-600/30 mb-4 group-hover/m:rotate-12 transition-transform" />
                       <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-2">Protocol: GOVERNANCE_QA</p>
                       <p className="text-xs font-bold text-white tracking-tight">Manual ready for worldwide scaling.</p>
                       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500/50"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-40 border-t border-slate-200">
           <IoFingerPrintOutline className="text-7xl text-indigo-600 mb-12 mx-auto opacity-20" />
           <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">Ready to activate your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 font-serif italic font-medium">Distinctive Identity?</span></h3>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="w-full sm:w-[280px] px-8 py-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-widest text-[10px] flex items-center justify-center">
                Initialize Brand Audit
              </button>
              <Link
                href="/freelancing"
                className="w-full sm:w-[280px] px-8 py-6 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center text-center"
              >
                Hire Student Talent
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
