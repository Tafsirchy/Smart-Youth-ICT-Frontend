"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoDiamondOutline,
  IoColorPaletteOutline,
  IoLayersOutline,
  IoFlashOutline,
  IoCheckmarkCircleOutline,
  IoFingerPrintOutline,
  IoInfiniteOutline,
  IoSparklesOutline,
} from "react-icons/io5";

const designPhilosophies = [
  {
    title: "Minimalist / Nordic",
    desc: "A surgical focus on negative space and clean typography. Ideal for photographers, architects, and high-end fashion designers.",
    icon: <IoLayersOutline />,
    color: "from-slate-900 to-slate-800",
    shadow: "shadow-slate-500/10",
  },
  {
    title: "Editorial Magazine",
    desc: "Dynamic imagery with bold, editorial layouts that make your content feel like a premium publication or luxury lookbook.",
    icon: <IoColorPaletteOutline />,
    color: "from-rose-600 to-pink-500",
    shadow: "shadow-rose-500/20",
  },
  {
    title: "Creative Immersive",
    desc: "Utilizing deep interactions and subtle motion architectures to pull visitors into your unique creative world.",
    icon: <IoFlashOutline />,
    color: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
];

const transformationPhases = [
  {
    id: "01",
    t: "Architecture & Strategy",
    d: "Mapping your professional narrative and defining your conversion goals.",
  },
  {
    id: "02",
    t: "Immersive Design",
    d: "Crafting a bespoke aesthetic fingerprint that resonates with your industry.",
  },
  {
    id: "03",
    t: "High-Octane Build",
    d: "Engineering using Next.js for sub-second load times and global scalability.",
  },
  {
    id: "04",
    t: "SEO Optimization",
    d: "Injecting technical SEO to ensure your portfolio ranks for your key expertises.",
  },
  {
    id: "05",
    t: "Global Launch",
    d: "Deploying to edge networks with custom performance monitoring active.",
  },
];

export default function PortfolioWebsitesPage() {
  return (
    <section className="min-h-screen bg-[#fafafa] overflow-hidden relative selection:bg-rose-500 selection:text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none -z-10">
        <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-rose-200/40 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[100px] right-[-300px] w-[700px] h-[700px] bg-emerald-100/30 rounded-full blur-[140px]"></div>
      </div>

      <div className="container-custom py-24 relative">
        {/* STRUCTURALLY CREATIVE HERO */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-40 pt-10">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 text-slate-900 text-[10px] font-black tracking-[0.3em] uppercase mb-10"
            >
              <IoDiamondOutline className="text-rose-500" /> Digital Legacy
              Builder
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.85] mb-10 tracking-tight"
            >
              Creative <br className="hidden md:block" />{" "}
              <span className="font-serif italic font-light text-rose-500 underline decoration-rose-100/50 underline-offset-[-10px]">
                Alchemists.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-2xl"
            >
              We don't build websites; we engineer{" "}
              <span className="text-slate-900 font-bold">
                digital pedestals
              </span>
              . Your work is extraordinary—it deserves a frame that amplifies
              its resonance and power.
            </motion.p>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="relative z-20 group"
            >
              <div className="bg-white rounded-[3.5rem] p-4 shadow-2xl border border-slate-50 relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=1000&h=1200&fit=crop"
                  className="w-full aspect-[4/5] object-cover rounded-[2.8rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
                  alt="Portfolio Concept"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-12 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-3xl font-black">
                    Visual Poetics.
                  </p>
                  <p className="text-white/70 font-light">
                    Engineered for Creative Minds.
                  </p>
                </div>
              </div>

              {/* Floating Assets */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-30 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 font-black text-xl italic">
                    100
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      PageSpeed
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      Optimized
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* DESIGN PHILOSOPHIES (Creative Grid) */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-4">
                Core Methodologies
              </h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Design thinking meets{" "}
                <span className="text-slate-400">technical mastery.</span>
              </p>
            </div>
            <p className="text-slate-500 max-w-xs font-light">
              We leverage Static Site Generation (SSG) to ensure your first
              impression is instantaneous.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {designPhilosophies.map((style, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-full"
              >
                <div className="bg-white rounded-[3rem] p-10 h-full border border-slate-100 hover:border-rose-100 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.color} text-white flex items-center justify-center text-2xl mb-8 ${style.shadow} group-hover:scale-110 transition-transform`}
                  >
                    {style.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    {style.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light mb-8 group-hover:text-slate-700 transition-colors">
                    {style.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-rose-500 transition-colors">
                    Learn More <IoInfiniteOutline className="text-sm" />
                  </div>

                  <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-slate-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DIGITAL ALCHEMY (Visual Stepper) */}
        <div className="relative bg-slate-900 rounded-[5rem] p-12 lg:p-32 overflow-hidden mb-48">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-500 rounded-full blur-[200px]"></div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-10">
                5-Phase Digital Alchemy.
              </h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed mb-12">
                Our process is linear but the results are exponential. We
                transform raw ideas into production-grade artifacts.
              </p>

              <div className="space-y-1 w-full">
                {transformationPhases.map((phase, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 20 }}
                    className="group flex gap-8 items-center py-6 border-b border-white/5 cursor-default"
                  >
                    <span className="text-slate-600 font-black text-2xl group-hover:text-rose-500 transition-colors">
                      {phase.id}
                    </span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:underline decoration-rose-500 underline-offset-8 transition-all">
                        {phase.t}
                      </h4>
                      <p className="text-slate-500 text-sm font-light max-w-sm">
                        {phase.d}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center relative">
              <div className="w-full aspect-square border border-white/10 rounded-full flex items-center justify-center p-20 animate-[spin_60s_linear_infinite]">
                <div className="w-full aspect-square border-2 border-dashed border-rose-500/30 rounded-full flex items-center justify-center relative">
                  <IoSparklesOutline className="absolute -top-4 text-rose-500 text-3xl" />
                  <IoInfiniteOutline className="absolute -bottom-4 text-emerald-500 text-3xl" />
                </div>
              </div>
              <div className="absolute text-center bg-slate-900 p-10 rounded-full z-20">
                <p className="text-rose-500 font-serif italic text-7xl">
                  Gold.
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white mt-4">
                  Standard Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PREMIUM PACKAGES (Creative Cards) */}
        <div className="mb-48 text-center">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <h2 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-4">
              Select Your Artifact
            </h2>
            <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              Structured tiers for{" "}
              <span className="text-slate-400">every career stage.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {[
              {
                t: "Starter",
                p: "$499",
                list: [
                  "SPA Architecture",
                  "Lightning Fast",
                  "Social Integration",
                  "Vercel Edge Launch",
                ],
                color: "rose",
              },
              {
                t: "Professional",
                p: "$1299",
                list: [
                  "Multi-Page Narratives",
                  "Dynamic CMS Hub",
                  "Custom Motion System",
                  "Technical SEO Pack",
                  "Lead Gen Integration",
                ],
                color: "slate",
                highlight: true,
              },
              {
                t: "Legacy (Agency)",
                p: "$3499",
                list: [
                  "Custom 3D Interactions",
                  "Immersive Audio Experience",
                  "Whiteset Design Philosophy",
                  "Dedicated Launch Suite",
                  "Brand Identity Pack",
                ],
                color: "emerald",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-[3rem] p-12 border ${tier.highlight ? "border-rose-500 shadow-2xl shadow-rose-500/10 -translate-y-4" : "border-slate-100 shadow-xl"} flex flex-col h-full relative overflow-hidden group transition-all`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2 rounded-bl-3xl">
                    Popular
                  </div>
                )}
                <h4 className="text-3xl font-black text-slate-900 mb-2">
                  {tier.t}
                </h4>
                <p className="text-5xl font-black text-slate-900 mb-10">
                  {tier.p}
                  <span className="text-sm font-light text-slate-400">
                    {" "}
                    / starting
                  </span>
                </p>

                <div className="space-y-5 mb-12 flex-1">
                  {tier.list.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 items-center text-slate-600 font-light"
                    >
                      <IoCheckmarkCircleOutline
                        className={`text-${tier.color}-500 text-lg shrink-0`}
                      />{" "}
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${tier.highlight ? "bg-rose-500 text-white shadow-xl shadow-rose-500/30" : "bg-slate-900 text-white hover:bg-rose-500"}`}
                >
                  Select {tier.t}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION (Immersive) */}
        <div className="text-center py-40 border-t border-slate-100 mt-20 relative overflow-hidden rounded-[5rem] bg-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-50/50 -z-10 blur-3xl opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-6"
          >
            <IoFingerPrintOutline className="text-7xl text-rose-500 mb-10 mx-auto opacity-20" />
            <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-12 leading-tight">
              Ready to build your{" "}
              <span className="font-serif italic font-light italic">
                Digital Legacy?
              </span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-rose-500 text-white font-black rounded-[2rem] hover:bg-rose-600 transition-all shadow-2xl shadow-rose-500/40 uppercase tracking-widest text-xs">
                Consult Portfolio Expert
              </button>
              <Link
                href="/services/portfolio-websites/details"
                className="px-12 py-6 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-black transition-all shadow-2xl shadow-slate-900/40 uppercase tracking-widest text-xs flex items-center justify-center"
              >
                Technical Details
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
