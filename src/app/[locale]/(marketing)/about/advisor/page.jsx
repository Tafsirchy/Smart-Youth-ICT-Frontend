"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdvisoryBoardPage() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="min-h-screen bg-slate-950 py-20 overflow-hidden text-white relative">
      {/* Deep dark abstract grids & flares */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:40px_40px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none animate-pulse duration-1000"></div>
      <div className="absolute bottom-0 -left-20 w-[30rem] h-[30rem] bg-pink-600 rounded-full blur-[150px] opacity-30 mix-blend-screen pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">
              Guidance & Trust
            </p>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Advisory <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 animate-gradient-x">Board</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            Guided by industry giants, renowned academicians, and proven marketplace leaders to ensure our curriculum remains aligned with global standards.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
            {advisors.map((advisor, i) => (
              <motion.div
                key={advisor._id || i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem] blur-xl"></div>
                
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:border-blue-500/50 transition-colors h-full flex flex-col justify-between">
                  <div className="mb-6 overflow-hidden rounded-2xl aspect-square relative">
                    <Image
                      src={advisor.image || "/images/placeholder.png"}
                      alt={advisor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {advisor.name}
                    </h3>
                    <p className="text-blue-300 font-medium text-sm mb-2">
                      {advisor.role}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                      <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
                        {advisor.institution || "Industry Expert"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
