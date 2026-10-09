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
 <section className="min-h-screen pb-24 md:pb-32 bg-white pt-24 md:pt-32 overflow-hidden relative flex flex-col font-sans">
 <div className="container-custom relative z-10">
 <div className="max-w-4xl mx-auto text-center mb-20 md:mb-24">
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex items-center justify-center gap-4 mb-8"
 >
 <div className="w-8 h-[1px] bg-slate-300"></div>
 <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
 Global Network
 </p>
 <div className="w-8 h-[1px] bg-slate-300"></div>
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-8"
 >
 Our <br />
 <span className="font-semibold">Partners.</span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light"
 >
 We align with the best in the industry to bring world-class tools,
 immense networking opportunities, and priority hiring channels to
 our students.
 </motion.p>
 </div>

 {loading ? (
 <div className="flex justify-center items-center py-20">
 <div className="w-10 h-10 border-2 border-slate-200 border-t-slate-900 animate-spin"></div>
 </div>
 ) : (
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
 {partners.map((partner, i) => (
 <motion.div
 key={partner._id || i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ delay: i * 0.1, duration: 0.5 }}
 className="bg-white border border-slate-100 -[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 rounded-lg"
 >
 <div className="w-full aspect-video relative mb-6 flex items-center justify-center">
 <Image
 src={partner.logo}
 alt={partner.name || "Partner logo"}
 fill
 sizes="(max-width: 768px) 50vw, 25vw"
 loading="lazy"
 decoding="async"
 onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
 className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
 />
 </div>
 <h3 className="text-slate-900 font-medium text-lg tracking-tight truncate w-full px-2">
 {partner.name}
 </h3>
 <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest mt-1">
 {partner.partnerType || "Affiliate Partner"}
 </p>
 </motion.div>
 ))}
 </div>
 )}

 <motion.div
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 transition={{ delay: 0.3, duration: 0.8 }}
 className="mt-24 md:mt-32 max-w-3xl mx-auto text-center border-t border-slate-100 pt-16 md:pt-20"
 >
 <h2 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4 tracking-tight">
 Want to partner with us?
 </h2>
 <p className="text-slate-500 font-light leading-relaxed mb-10 max-w-xl mx-auto">
 We are always open to mutually beneficial relationships with tech
 companies, recruiters, and educational platforms.
 </p>
 <button className="min-h-[44px] px-8 py-4 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors tracking-wide text-sm active:scale-95 rounded-md">
 Become a Partner
 </button>
 </motion.div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div>
 <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-0.5">Next Step</p>
 <p className="text-slate-900 font-medium text-sm">Join the Program</p>
 </div>
 <button className="px-6 py-3 min-h-[44px] bg-slate-900 text-white font-medium text-[11px] uppercase tracking-wider transition-transform active:scale-95 rounded-md">
 Apply Now
 </button>
 </div>
 </section>
 );
}
