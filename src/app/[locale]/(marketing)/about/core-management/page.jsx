"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoLogoLinkedin, IoMailOutline } from "react-icons/io5";
import { LuArrowRight, LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CoreManagementPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get("/cms/team?type=core");
        let fetchedTeam = res.data.data;

        // Sort: Managing Director -> CEO -> Director -> Others
        const roleOrder = {
          "managing director": 1,
          ceo: 2,
          director: 3,
        };

        fetchedTeam.sort((a, b) => {
          const roleA = (a.role || "").toLowerCase().trim();
          const roleB = (b.role || "").toLowerCase().trim();

          const orderA = roleOrder[roleA] || 99;
          const orderB = roleOrder[roleB] || 99;

          return orderA - orderB;
        });

        setTeam(fetchedTeam);
      } catch (err) {
        console.error("Failed to load core management", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Simple parser to handle **bold** markdown in bio text
  const parseBio = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-slate-900 font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section className="min-h-screen bg-slate-50 pt-12 sm:pt-18 pb-12 md:pb-16 overflow-hidden relative flex flex-col font-sans">
      <div className="container-custom relative z-10 w-full">
        {/* Header - Aligned horizontally with container/navbar */}
        <div className="w-full mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 mb-2.5"
          >
            <div className="w-8 h-[2px] bg-brand-pink" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
              Board of Directors
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2.5 tracking-tight"
          >
            Industrial{" "}
            <span className="text-slate-400">Management</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] max-w-3xl border-l-2 border-brand-pink pl-4 font-normal"
          >
            Meet the driving force behind Smart Youth ICT. A team of seasoned tech veterans and educators committed to your success and technological advancement.
          </motion.p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col gap-6 sm:gap-8 w-full">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-6 md:gap-8 bg-white border border-slate-200/80 p-5 sm:p-7 rounded-2xl animate-pulse w-full min-h-[380px]"
              >
                <div className="w-full md:w-[320px] lg:w-[360px] min-h-[320px] md:min-h-[380px] bg-slate-100 rounded-2xl shrink-0" />
                <div className="flex-1 flex flex-col justify-center gap-4 py-4">
                  <div className="w-1/2 h-7 bg-slate-100 rounded-md" />
                  <div className="w-1/4 h-4 bg-slate-100 rounded-md" />
                  <div className="w-full h-24 bg-slate-100 rounded-md" />
                  <div className="w-32 h-6 bg-slate-100 rounded-md mt-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cards - Full horizontal width matching container & navbar */
          <div className="flex flex-col gap-6 sm:gap-8 w-full">
            {team.map((member, i) => (
              <motion.div
                key={member._id || i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.08, duration: 0.4 }}
                className={`group cursor-pointer flex flex-col md:flex-row items-stretch gap-6 md:gap-8 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                } bg-white border border-slate-200/90 p-5 sm:p-7 md:p-8 rounded-2xl shadow-xs hover:shadow-lg hover:border-brand-pink/40 transition-all duration-300 w-full min-h-[380px] md:min-h-[420px]`}
                onClick={() => setSelectedMember(member)}
              >
                {/* Portrait Frame */}
                <div className="relative w-full md:w-[320px] lg:w-[360px] xl:w-[380px] shrink-0 min-h-[300px] sm:min-h-[360px] md:min-h-[380px] lg:min-h-[420px] overflow-hidden rounded-2xl bg-slate-100">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 380px"
                      loading="lazy"
                      decoding="async"
                      unoptimized={true}
                      onError={(e) => {
                        e.target.style.opacity = "0";
                      }}
                      onLoad={(e) => {
                        if (
                          e.target.src.includes("ibb.co") &&
                          e.target.naturalWidth === 180 &&
                          e.target.naturalHeight === 180
                        ) {
                          e.target.style.opacity = "0";
                        }
                      }}
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500 z-10 relative"
                    />
                  ) : null}

                  {/* Fallback avatar */}
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 absolute inset-0 z-0 select-none">
                    <div className="w-16 h-16 rounded-2xl bg-slate-200 border border-slate-300 flex items-center justify-center mb-2 group-hover:border-brand-pink/40 group-hover:bg-brand-pink/10 transition-all">
                      <span className="text-2xl font-black text-slate-500">
                        {member.name ? member.name.charAt(0) : "M"}
                      </span>
                    </div>
                    <span className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase font-mono">
                      Leadership
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-between py-2 sm:py-3">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight mb-1.5 group-hover:text-brand-pink transition-colors leading-[1.2]">
                      {member.name}
                    </h2>
                    <p className="text-brand-pink font-bold text-xs sm:text-sm tracking-[0.18em] uppercase mb-4 leading-[1.4]">
                      {member.role}
                    </p>

                    <div className="text-slate-600 line-clamp-5 sm:line-clamp-6 text-sm sm:text-base leading-[1.65] font-normal mb-6">
                      {parseBio(member.bio)}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider group-hover:text-brand-pink transition-colors leading-none">
                      View Full Profile
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 group-hover:bg-brand-pink/10 group-hover:border-brand-pink/30 flex items-center justify-center transition-all">
                      <LuArrowRight className="text-slate-400 group-hover:text-brand-pink group-hover:translate-x-0.5 transition-all" size={14} />
                    </div>
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
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[101] overflow-y-auto custom-scrollbar flex flex-col"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors z-20"
              >
                <LuX size={18} />
              </button>

              <div className="p-6 sm:p-8 md:p-10 flex-1 flex flex-col pt-12 sm:pt-14">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start mb-6 pb-6 border-b border-slate-100">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 bg-slate-100 shadow-md overflow-hidden rounded-2xl">
                    {selectedMember.image ? (
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        unoptimized={true}
                        onError={(e) => {
                          e.target.style.opacity = "0";
                        }}
                        onLoad={(e) => {
                          if (
                            e.target.src.includes("ibb.co") &&
                            e.target.naturalWidth === 180 &&
                            e.target.naturalHeight === 180
                          ) {
                            e.target.style.opacity = "0";
                          }
                        }}
                        className="object-cover object-top z-10 relative"
                      />
                    ) : null}
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 absolute inset-0 z-0 select-none">
                      <span className="text-4xl font-black text-slate-400">
                        {selectedMember.name
                          ? selectedMember.name.charAt(0)
                          : "M"}
                      </span>
                      <span className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase font-mono mt-1">
                        Leadership
                      </span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-1.5 leading-[1.2]">
                      {selectedMember.name}
                    </h2>
                    <p className="text-brand-pink font-bold text-xs sm:text-sm tracking-[0.15em] uppercase leading-[1.4]">
                      {selectedMember.role}
                    </p>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 border-b border-slate-100 pb-1.5">
                    Biography
                  </h3>
                  <div className="text-slate-600 text-sm md:text-base whitespace-pre-wrap leading-[1.65] font-normal">
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
