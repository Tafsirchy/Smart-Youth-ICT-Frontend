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
          "ceo": 2,
          "director": 3,
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
        return <strong key={i} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section className="min-h-screen bg-white py-24 overflow-hidden relative flex flex-col font-sans">
      {/* Very subtle architectural grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#slate-200_1px,transparent_1px),linear-gradient(to_bottom,#slate-200_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-brand-pink"></div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
              Board of Directors
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter"
          >
            Industrial <br />
            <span className="text-slate-400">Management</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-brand-pink pl-6"
          >
            Meet the driving force behind Smart Youth ICT. A team of seasoned
            tech veterans and educators committed to your success and technological advancement.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-slate-50 animate-pulse border border-slate-100 rounded-sm"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 max-w-7xl">
            {team.map((member, i) => (
              <motion.div
                key={member._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedMember(member)}
              >
                {/* Magazine style portrait */}
                <div className="relative w-full aspect-[3/4] mb-5 overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={member.image || "/images/placeholder.png"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    decoding="async"
                    unoptimized={true}
                    onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-brand-pink transition-colors line-clamp-2 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-slate-500 font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-4 line-clamp-2">
                    {member.role}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest group-hover:text-brand-pink transition-colors">
                      View Profile
                    </span>
                    <LuArrowRight className="text-slate-400 group-hover:text-brand-pink group-hover:translate-x-1 transition-all" />
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
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
                className="absolute top-6 right-6 w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors z-20"
              >
                <LuX size={20} />
              </button>

              <div className="p-8 md:p-12 flex-1 flex flex-col pt-16 md:pt-20">
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start mb-10">
                  <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 bg-slate-100 rounded-2xl border-4 border-slate-50 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <Image
                      src={selectedMember.image || "/images/placeholder.png"}
                      alt={selectedMember.name}
                      fill
                      unoptimized={true}
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="pt-2 md:pt-6">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2 leading-[1.1]">
                      {selectedMember.name}
                    </h2>
                    <p className="text-brand-pink font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                      {selectedMember.role}
                    </p>
                  </div>
                </div>

                <div className="mb-12">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                    Biography
                  </h4>
                  <div className="prose prose-slate prose-sm md:prose-base max-w-none text-slate-600 whitespace-pre-wrap leading-[1.8]">
                    {parseBio(selectedMember.bio)}
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-4">
                  {selectedMember.socials?.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-[#0077b5] text-slate-600 hover:text-white rounded-none border border-slate-200 hover:border-[#0077b5] transition-all font-bold text-xs uppercase tracking-wider"
                    >
                      <IoLogoLinkedin size={18} />
                      LinkedIn
                    </a>
                  )}
                  {selectedMember.socials?.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-rose-500 text-slate-600 hover:text-white rounded-none border border-slate-200 hover:border-rose-500 transition-all font-bold text-xs uppercase tracking-wider"
                    >
                      <IoMailOutline size={18} />
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
