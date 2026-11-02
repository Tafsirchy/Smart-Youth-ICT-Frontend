"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { IoHandLeftOutline, IoBriefcaseOutline } from "react-icons/io5";

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
    <section className="min-h-screen pb-12 md:pb-16 bg-slate-50 pt-12 sm:pt-18 overflow-hidden relative flex flex-col font-sans">
      <div className="container-custom relative z-10 w-full">
        {/* Compact Header */}
        <div className="max-w-4xl mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 mb-2.5"
          >
            <div className="w-8 h-[2px] bg-brand-pink" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
              Global Network
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2 tracking-tight"
          >
            Our <span className="text-brand-pink">Partners</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] max-w-2xl border-l-2 border-brand-pink pl-4"
          >
            We align with industry leaders to bring world-class curriculum,
            <br className="hidden sm:inline" />
            networking opportunities, and priority hiring channels to our students.
          </motion.p>
        </div>

        {/* Partners Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-pink animate-spin rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner._id || i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.35 }}
                className="bg-white border border-slate-200/90 p-4 sm:p-6 flex flex-col items-center justify-center text-center group hover:border-brand-pink/40 hover:shadow-md transition-all duration-300 rounded-2xl"
              >
                <div className="w-full aspect-[16/10] relative mb-3 flex items-center justify-center bg-slate-50/50 rounded-xl p-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name || "Partner logo"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-slate-900 font-bold text-sm tracking-tight truncate w-full px-1 leading-[1.3]">
                  {partner.name}
                </h3>
                <p className="text-brand-pink text-[9px] font-black uppercase tracking-[0.18em] mt-1 leading-[1.2]">
                  {partner.partnerType || "Affiliate Partner"}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Partnership Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 sm:mt-12 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-pink/10 text-brand-pink flex items-center justify-center mx-auto mb-3">
            <IoBriefcaseOutline size={20} />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5 tracking-tight leading-[1.2]">
            Want to Partner with Us?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-[1.6] mb-5 max-w-lg mx-auto">
            We are always open to mutually beneficial alliances with tech companies, recruiters, and educational platforms.
          </p>
          <a
            href="mailto:smartyouthictbd@gmail.com"
            className="inline-flex items-center justify-center min-h-[40px] px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-widest transition-colors rounded-xl active:scale-95 shadow-sm"
          >
            Become a Partner
          </a>
        </motion.div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.06)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Collaborate</p>
          <p className="text-slate-900 font-black text-xs leading-none">Partner with SYICT</p>
        </div>
        <a
          href="mailto:smartyouthictbd@gmail.com"
          className="px-5 py-2.5 min-h-[40px] bg-brand-pink text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center active:scale-95"
        >
          Connect
        </a>
      </div>
    </section>
  );
}
