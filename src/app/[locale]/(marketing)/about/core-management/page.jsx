"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IoLogoLinkedin, IoMailOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CoreManagementPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get("/cms/team?type=core");
        setTeam(res.data.data);
      } catch (err) {
        console.error("Failed to load core management", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-20 overflow-hidden relative flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[11px] font-black uppercase tracking-[0.28em] text-brand-green mb-4"
          >
            Leadership
          </motion.p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Core <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 animate-gradient-x">Management</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl leading-relaxed"
          >
            Meet the driving force behind Smart Youth ICT. A team of seasoned
            tech veterans and educators committed to your success.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-green/20 to-brand-green/0 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full p-2 bg-gradient-to-br from-brand-green to-emerald-400 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                    <Image
                      src={member.image || "/images/placeholder.png"}
                      alt={member.name}
                      width={128}
                      height={128}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 bg-[#f0f0f0]"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 truncate px-2">
                    {member.name}
                  </h3>
                  <p className="text-brand-green font-bold text-sm tracking-wide uppercase mb-4">
                    {member.role}
                  </p>
                  <div className="w-10 h-1 bg-slate-100 mx-auto mb-4 group-hover:w-20 group-hover:bg-brand-green transition-all duration-300 rounded-full"></div>
                  <p className="text-slate-600 leading-relaxed text-sm line-clamp-4">
                    {member.bio}
                  </p>
                </div>

                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-slate-100">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="min-w-[44px] min-h-[44px] rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                      <IoLogoLinkedin size={20} />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a href={`mailto:${member.socials.email}`} className="min-w-[44px] min-h-[44px] rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white transition-colors">
                      <IoMailOutline size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Step</p>
          <p className="text-slate-900 font-bold text-sm">Join the Program</p>
        </div>
        <button className="px-5 py-3 min-h-[44px] bg-brand-green text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-brand-green/30">
          Apply Now
        </button>
      </div>
    </section>
  );
}
