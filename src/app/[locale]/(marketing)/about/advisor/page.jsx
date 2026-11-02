"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoLogoLinkedin, IoMailOutline } from "react-icons/io5";
import { LuArrowRight, LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdvisoryBoardPage() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const res = await api.get("/cms/team?type=advisory");
        setAdvisors(res.data.data);
      } catch (err) {
        console.error("Failed to load advisory board", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisors();
  }, []);

  // Simple parser to handle **bold** markdown in bio text
  const parseBio = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section className="min-h-screen bg-slate-50 pt-12 sm:pt-18 pb-10 md:pb-14 overflow-hidden relative flex flex-col font-sans">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 mb-2.5"
          >
            <div className="w-8 h-[2px] bg-brand-pink" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
              Guidance &amp; Trust
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2.5 tracking-tight"
          >
            Advisory{" "}
            <span className="text-slate-400">Board</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] max-w-2xl border-l-2 border-brand-pink pl-4 font-normal"
          >
            Guided by industry giants, renowned academicians, and proven marketplace leaders to ensure our curriculum remains aligned with global standards.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white animate-pulse border border-slate-200/80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 max-w-7xl">
            {advisors.map((advisor, i) => (
              <motion.div
                key={advisor._id || i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group cursor-pointer flex flex-col bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xs hover:shadow-md hover:border-brand-pink/40 transition-all duration-200"
                onClick={() => setSelectedMember(advisor)}
              >
                {/* Magazine style portrait */}
                <div className="relative w-full aspect-[3/4] mb-3 overflow-hidden bg-slate-100 border border-slate-200/80 rounded-xl flex items-center justify-center">
                  {advisor.image ? (
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      decoding="async"
                      unoptimized={true}
                      onError={(e) => { e.target.style.opacity = '0'; }}
                      onLoad={(e) => {
                        if (e.target.src.includes('ibb.co') && e.target.naturalWidth === 180 && e.target.naturalHeight === 180) {
                          e.target.style.opacity = '0';
                        }
                      }}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 z-10 relative"
                    />
                  ) : null}
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 absolute inset-0 z-0 select-none">
                    <div className="w-12 h-12 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center mb-1.5 group-hover:border-brand-pink/40 group-hover:bg-brand-pink/10 transition-all">
                      <span className="text-xl font-black text-slate-500">{advisor.name ? advisor.name.charAt(0) : "A"}</span>
                    </div>
                    <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase font-mono">Advisory</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight mb-0.5 group-hover:text-brand-pink transition-colors line-clamp-1 leading-[1.3]">
                    {advisor.name}
                  </h2>
                  <p className="text-slate-500 font-bold text-[10px] tracking-[0.15em] uppercase mb-1 line-clamp-1 leading-[1.4]">
                    {advisor.role}
                  </p>

                  <div className="flex items-center gap-1.5 mb-2.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-pink/60" />
                    <p className="text-slate-400 text-[10px] font-bold tracking-wider uppercase leading-none truncate">
                      {advisor.institution || "Industry Expert"}
                    </p>
                  </div>

                  <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider group-hover:text-brand-pink transition-colors leading-none">
                      View Profile
                    </span>
                    <LuArrowRight className="text-slate-400 group-hover:text-brand-pink group-hover:translate-x-1 transition-all" size={13} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-[101] overflow-y-auto custom-scrollbar flex flex-col"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors z-20"
              >
                <LuX size={18} />
              </button>

              <div className="p-6 sm:p-8 flex-1 flex flex-col pt-12 sm:pt-14">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start mb-6 pb-6 border-b border-slate-100">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 bg-slate-100 border-2 border-slate-200/80 shadow-md overflow-hidden flex items-center justify-center rounded-2xl">
                    {selectedMember.image ? (
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        unoptimized={true}
                        onError={(e) => { e.target.style.opacity = '0'; }}
                        onLoad={(e) => {
                          if (e.target.src.includes('ibb.co') && e.target.naturalWidth === 180 && e.target.naturalHeight === 180) {
                            e.target.style.opacity = '0';
                          }
                        }}
                        className="object-cover object-top z-10 relative"
                      />
                    ) : null}
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 absolute inset-0 z-0 select-none">
                      <span className="text-3xl font-black text-slate-400">{selectedMember.name ? selectedMember.name.charAt(0) : "A"}</span>
                      <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase font-mono mt-1">Advisory</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-1 leading-[1.2]">
                      {selectedMember.name}
                    </h2>
                    <p className="text-brand-pink font-bold text-xs tracking-wider uppercase mb-2 leading-[1.4]">
                      {selectedMember.role}
                    </p>
                    <div className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {selectedMember.institution || "Industry Expert"}
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 border-b border-slate-100 pb-1.5">
                    Biography
                  </h3>
                  <div className="text-slate-600 text-xs sm:text-sm whitespace-pre-wrap leading-[1.6] font-normal">
                    {parseBio(selectedMember.bio)}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
                  {selectedMember.socials?.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-[#0077b5] text-slate-600 hover:text-white border border-slate-200 hover:border-[#0077b5] transition-all font-bold text-xs uppercase tracking-wider rounded-md"
                    >
                      <IoLogoLinkedin size={16} />
                      LinkedIn
                    </a>
                  )}
                  {selectedMember.socials?.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-rose-500 text-slate-600 hover:text-white border border-slate-200 hover:border-rose-500 transition-all font-bold text-xs uppercase tracking-wider rounded-md"
                    >
                      <IoMailOutline size={16} />
                      Contact
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
