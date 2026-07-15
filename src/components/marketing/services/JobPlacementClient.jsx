"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  IoBriefcaseOutline,
  IoFlaskOutline,
  IoChatbubblesOutline,
  IoSearchOutline,
  IoPulseOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

export default function JobPlacementClient({ data, content }) {
  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans text-slate-100 flex flex-col">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-blue-900/30 via-transparent to-transparent pointer-events-none"></div>

      <div className="container-custom py-8 lg:py-16 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-left lg:text-center mb-10 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black tracking-widest uppercase mb-4 lg:mb-6 border border-blue-500/20 leading-[1.4]"
          >
            {content?.hero?.badge || "Your Career Launchpad"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4 lg:mb-6"
          >
            {content?.hero?.title || "Job Placement"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">
              {content?.hero?.subtitle || "Support Cell"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl lg:text-2xl leading-[1.6] font-light max-w-3xl lg:mx-auto"
          >
            {content?.hero?.description ||
              "Graduation is just the beginning. Our dedicated placement cell actively maps our top talent with hiring partners."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6 lg:pt-10"
          >
            <Link
              href="/services/job-placement/details"
              className="inline-flex items-center min-h-[48px] gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors group leading-[1.4]"
            >
              View Placement Manifest{" "}
              <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {data?.placements?.length > 0 ? (
          /* Target Classifications */
          <div className="mb-10 lg:mb-20">
            <h2 className="text-2xl lg:text-3xl font-black text-white text-left lg:text-center mb-6 lg:mb-10 uppercase italic leading-[1.4]">
              Placement Track Classifications
            </h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 lg:grid lg:grid-cols-3 lg:gap-6 max-w-7xl mx-auto scrollbar-hide -mx-[var(--gutter)] px-[var(--gutter)]">
              {data.placements.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[85vw] sm:min-w-[300px] lg:w-auto snap-center shrink-0 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 group hover:border-blue-500/50 transition-all overflow-hidden relative flex flex-col gap-4"
                >
                  <div
                    className={`absolute -right-10 -bottom-10 w-40 h-40 ${p.color} opacity-10 rounded-full blur-[60px] group-hover:opacity-30 transition-opacity`}
                  ></div>

                  <div
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${p.color} text-white flex items-center justify-center text-2xl mb-2 shadow-2xl group-hover:scale-110 transition-transform`}
                  >
                    <IoBriefcaseOutline />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-black text-white leading-[1.4] mb-1">
                      {p.title}
                    </h3>
                    <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-blue-400 leading-[1.4]">
                      {p.type}
                    </p>
                  </div>
                  <p className="text-slate-400 leading-[1.6] font-light text-sm line-clamp-3">
                    {p.desc}
                  </p>

                  <div className="pt-4 border-t border-white/5 mt-auto">
                    <p className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-widest mb-1 leading-[1.4]">
                      Avg. Entry Package
                    </p>
                    <p className="text-xl lg:text-2xl font-black text-white leading-[1.4]">
                      {p.avgSalary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-left lg:text-center py-8 lg:py-12 bg-white/5 rounded-[2rem] border border-white/10 mb-10 lg:mb-20 flex flex-col items-start lg:items-center gap-4 px-6">
            <IoPulseOutline className="text-4xl lg:text-5xl text-white/20 animate-pulse" />
            <p className="text-white/40 text-xs lg:text-sm font-black uppercase tracking-widest leading-[1.4]">
              Job Channels Ready
            </p>
          </div>
        )}

        {/* The Lifecycle */}
        {data?.lifecycle?.length > 0 && (
          <div className="mb-10 lg:mb-20 max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-black text-white text-left lg:text-center mb-8 lg:mb-12 leading-[1.4]">
              The Recruitment <span className="text-blue-500">Lifecycle.</span>
            </h2>
            <div className="space-y-6 lg:space-y-10 relative">
              <div className="absolute left-5 top-8 bottom-8 w-px bg-white/10 hidden md:block"></div>
              {data.lifecycle.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-4 lg:gap-6 items-start relative z-10"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-blue-600/30">
                    {i + 1}
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                      <h3 className="text-lg lg:text-xl font-black text-white leading-[1.4]">
                        {l.title}
                      </h3>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-md self-start md:self-auto leading-[1.4]">
                        {l.step}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm lg:text-base font-light leading-[1.6] max-w-3xl">
                      {l.d}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Interview Labs & Facility Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-6 lg:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-xl relative overflow-hidden text-slate-900"
        >
          <div className="hidden md:block absolute top-0 right-0 w-[300px] h-[300px] bg-blue-100 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-60"></div>

          <div className="flex-1 flex flex-col gap-6 relative z-10">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-3xl shadow-sm">
              <IoFlaskOutline />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1] uppercase italic">
              Career Launch <br />
              Labs.
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-light leading-[1.6]">
              We don't just refer—we prepare. Our physically simulated interview
              labs provide you with the exact pressure-test you need before
              facing real hiring boards.
            </p>

            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 leading-[1.4] text-sm lg:text-base">
                  <IoChatbubblesOutline className="text-blue-500 shrink-0" /> Mock HR Rounds
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-500 font-black leading-[1.4] uppercase tracking-widest">
                  Live practice with senior tech recruiters.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 leading-[1.4] text-sm lg:text-base">
                  <IoSearchOutline className="text-blue-500 shrink-0" /> Resume Audit
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-500 font-black leading-[1.4] uppercase tracking-widest">
                  Personalized refinement to bypass global ATS filters.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative hidden lg:block overflow-hidden rounded-[2rem] aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop"
              alt="Interview lab collaboration"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              decoding="async"
              onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
              className="object-cover grayscale opacity-80 bg-[#f0f0f0]"
            />
          </div>
        </motion.div>

        {/* Global Stats Footer */}
        <div className="mt-10 lg:mt-20 border-t border-white/5 pt-8 lg:pt-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-left">
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-16 w-full lg:w-auto">
            <div className="flex flex-col gap-1">
              <p className="text-blue-500 text-4xl lg:text-5xl font-black leading-[1.1]">
                {data?.stats?.partners || "0+"}
              </p>
              <p className="font-black uppercase tracking-widest text-[10px] sm:text-xs text-slate-500 leading-[1.4]">
                Global Hiring Partners
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-emerald-500 text-4xl lg:text-5xl font-black leading-[1.1]">
                {data?.stats?.rate || "0%"}
              </p>
              <p className="font-black uppercase tracking-widest text-[10px] sm:text-xs text-slate-500 leading-[1.4]">
                Placement Success Rate
              </p>
            </div>
          </div>
          <button className="hidden lg:inline-flex items-center justify-center min-h-[48px] px-8 py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg uppercase tracking-widest text-xs sm:text-sm leading-[1.4]">
            Partner With Our Placement Cell
          </button>
        </div>
      </div>
      {/* Mobile Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-[var(--gutter,16px)] bg-slate-950/90 backdrop-blur-md border-t border-white/10 z-50 lg:hidden flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))] mt-auto">
        <button className="w-full min-h-[48px] py-3 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform text-sm uppercase tracking-widest leading-[1.4]">
          Partner With Us
        </button>
      </div>
    </section>
  );
}
