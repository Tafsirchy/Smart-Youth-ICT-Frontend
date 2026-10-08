"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";

function Grid({ items, kind }) {
 if (!items.length) {
 return (
 <p className="text-slate-500 text-sm col-span-full text-center py-12">
 {kind === "membership" ? "No memberships yet." : "No partners yet."}
 </p>
 );
 }
 return (
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
 {items.map((item, i) => (
 <motion.div
 key={item._id || i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ delay: i * 0.08 }}
 className="bg-white border border-slate-100 p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-brand-pink/20 transition-all duration-500 cursor-crosshair"
 >
 <div className="w-full aspect-video relative mb-5 flex items-center justify-center">
 <Image
 src={item.logo}
 alt={item.name || "Logo"}
 fill
 sizes="(max-width: 768px) 50vw, 25vw"
 loading="lazy"
 decoding="async"
 unoptimized={true}
 onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
 className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
 />
 </div>
 <h3 className="text-slate-900 font-bold text-sm md:text-base group-hover:text-brand-pink transition-colors truncate w-full px-2">
 {item.name}
 </h3>
 <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
 {kind === "membership"
 ? item.category || "Member"
 : item.partnerType || "Partner"}
 </p>
 </motion.div>
 ))}
 </div>
 );
}

export default function PartnershipMembershipPage() {
 const [memberships, setMemberships] = useState([]);
 const [partners, setPartners] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchAll = async () => {
 try {
 const [mRes, pRes] = await Promise.allSettled([
 api.get("/cms/memberships"),
 api.get("/cms/partners"),
 ]);
 if (mRes.status === "fulfilled") setMemberships(mRes.value.data.data || []);
 if (pRes.status === "fulfilled") setPartners(pRes.value.data.data || []);
 } finally {
 setLoading(false);
 }
 };
 fetchAll();
 }, []);

 return (
 <section className="min-h-screen pb-24 md:pb-0 bg-slate-50 py-20 overflow-hidden relative flex flex-col">
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#slate-200_1px,transparent_1px),linear-gradient(to_bottom,#slate-200_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03]"></div>

 <div className="container-custom relative z-10">
 <div className="max-w-4xl mx-auto text-center mb-24">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-[11px] font-black tracking-[0.2em] uppercase mb-8"
 >
 Network &amp; Affiliations
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
 >
 Partnership &amp; <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-rose-500">
 Membership
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
 >
 The organisations Smart Youth ICT partners with and the professional
 bodies and networks we proudly hold membership in.
 </motion.p>
 </div>

 {/* Memberships */}
 <div id="memberships" className="mb-32 scroll-mt-32">
 <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-12 text-center tracking-tight">
 Our Memberships
 </h2>
 {loading ? (
 <div className="flex justify-center items-center py-20">
 <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-pink animate-spin"></div>
 </div>
 ) : (
 <Grid items={memberships} kind="membership" />
 )}
 </div>

 {/* Partnerships */}
 <div id="partners" className="scroll-mt-32 mb-20">
 <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-12 text-center tracking-tight">
 Our Partnerships
 </h2>
 {loading ? (
 <div className="flex justify-center items-center py-20">
 <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-pink animate-spin"></div>
 </div>
 ) : (
 <Grid items={partners} kind="partner" />
 )}
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div>
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Step</p>
 <p className="text-slate-900 font-bold text-sm">Join the Program</p>
 </div>
 <button className="px-6 py-3 min-h-[44px] bg-brand-pink text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-brand-pink/30">
 Apply Now
 </button>
 </div>
 </section>
 );
}
