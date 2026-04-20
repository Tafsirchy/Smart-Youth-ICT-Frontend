"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get("/cms/partners");
        setPartners(res.data.data || []);
      } catch (err) {
        console.error("Failed to load partners", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section className="min-h-screen bg-slate-950 py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
          >
            Global Network
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter"
          >
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 animate-gradient-x">
              Partners
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed"
          >
            We align with the best in the industry to bring world-class tools,
            immense networking opportunities, and priority hiring channels to
            our students.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {partners.map((partner, i) => (
              <motion.div
                key={partner._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center group cursor-crosshair hover:bg-white transition-colors duration-500"
              >
                <div className="w-full aspect-video relative mb-4 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name || "Partner logo"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-white font-bold text-lg group-hover:text-slate-900 transition-colors truncate w-full px-2">
                  {partner.name}
                </h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1 group-hover:text-emerald-600 transition-colors">
                  {partner.partnerType || "Affiliate Partner"}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-32 max-w-4xl mx-auto text-center border-t border-slate-800 pt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to partner with us?
          </h2>
          <p className="text-slate-400 mb-8">
            We are always open to mutually beneficial relationships with tech
            companies, recruiters, and educational platforms.
          </p>
          <button className="px-8 py-4 bg-emerald-600 text-white font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            Become a Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
}
