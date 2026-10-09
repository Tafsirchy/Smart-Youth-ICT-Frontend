"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IoLogoLinkedin, IoMailOutline, IoLogoTwitter } from "react-icons/io5";
import { LuX, LuUser } from "react-icons/lu";

export default function MentorModal({ mentor, onClose }) {
 if (!mentor) return null;

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
 <div className="fixed inset-0 z-[100] flex">
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
 />

 {/* Slide-in Drawer */}
 <motion.div
 initial={{ opacity: 0, x: "100%" }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: "100%" }}
 transition={{ type: "spring", damping: 25, stiffness: 200 }}
 className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[101] overflow-y-auto custom-scrollbar flex flex-col"
 >
 <button
 onClick={onClose}
 className="absolute top-6 right-6 w-12 h-12 bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors z-20 rounded-md"
 >
 <LuX size={20} />
 </button>

 <div className="p-8 md:p-12 flex-1 flex flex-col pt-16 md:pt-20">
 <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start mb-10">
 <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 bg-slate-100 border-4 border-slate-50 shadow-xl shadow-slate-200/50 overflow-hidden flex items-center justify-center rounded-lg">
 {mentor.avatar ? (
 <Image
 src={mentor.avatar}
 alt={mentor.name}
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
 <LuUser className="w-20 h-20 text-slate-300 absolute z-0" />
 </div>
 
 <div className="pt-2 md:pt-6">
 {mentor.badge && (
 <div className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-[10px] font-black uppercase tracking-widest mb-3 rounded-md">
 {mentor.badge}
 </div>
 )}
 <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2 leading-[1.1]">
 {mentor.name}
 </h2>
 <p className="text-brand-green font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
 {mentor.role || "Industry Expert"}
 </p>
 
 <div className="flex flex-wrap gap-2">
 {(mentor.expertise || []).map((t) => (
 <span
 key={t}
 className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-md"
 >
 {t}
 </span>
 ))}
 </div>
 </div>
 </div>

 <div className="mb-12">
 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
 Biography
 </h4>
 <div className="prose prose-slate prose-sm md:prose-base max-w-none text-slate-600 whitespace-pre-wrap leading-[1.8]">
 {mentor.bio ? parseBio(mentor.bio) : <p className="text-slate-400 italic">No biography provided.</p>}
 </div>
 </div>

 <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-4">
 {mentor.socials?.linkedin && (
 <a
 href={mentor.socials.linkedin}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-[#0077b5] text-slate-600 hover:text-white border border-slate-200 hover:border-[#0077b5] transition-all font-bold text-xs uppercase tracking-wider rounded-md"
 >
 <IoLogoLinkedin size={18} />
 LinkedIn
 </a>
 )}
 {mentor.socials?.twitter && (
 <a
 href={mentor.socials.twitter}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-[#1DA1F2] text-slate-600 hover:text-white border border-slate-200 hover:border-[#1DA1F2] transition-all font-bold text-xs uppercase tracking-wider rounded-md"
 >
 <IoLogoTwitter size={18} />
 Twitter
 </a>
 )}
 {mentor.email && (
 <a
 href={`mailto:${mentor.email}`}
 className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-rose-500 text-slate-600 hover:text-white border border-slate-200 hover:border-rose-500 transition-all font-bold text-xs uppercase tracking-wider rounded-md"
 >
 <IoMailOutline size={18} />
 Contact
 </a>
 )}
 </div>
 </div>
 </motion.div>
 </div>
 );
}
