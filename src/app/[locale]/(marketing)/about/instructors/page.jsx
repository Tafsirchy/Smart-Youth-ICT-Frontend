"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import api from "@/lib/api";
import { LuSearch as Search, LuMapPin as MapPin, LuBookOpen as BookOpen, LuUser as UserIcon } from "react-icons/lu";
import MentorModal from "./MentorModal";

export default function InstructorsPage() {
 const [allMentors, setAllMentors] = useState([]);
 const [instructors, setInstructors] = useState([]);
 const [branches, setBranches] = useState([]);
 const [courses, setCourses] = useState([]);
 const [filters, setFilters] = useState({
 q: "",
 branchId: "",
 courseId: "",
 });
 const [loading, setLoading] = useState(true);
 const [selectedMentor, setSelectedMentor] = useState(null);

 // Fetch initial data
 useEffect(() => {
 const fetchInitialData = async () => {
 setLoading(true);
 try {
 const [bRes, cRes, mRes] = await Promise.all([
 api.get("/branches/public/list"),
 api.get("/courses"),
 api.get("/cms/mentors")
 ]);
 setBranches(bRes.data.data || []);
 setCourses(cRes.data.data || []);
 setAllMentors(mRes.data.data || []);
 setInstructors(mRes.data.data || []);
 } catch (err) {
 console.error("Failed to fetch page data", err);
 } finally {
 setLoading(false);
 }
 };
 fetchInitialData();
 }, []);

 // Filter mentors locally
 useEffect(() => {
 let filtered = [...allMentors];

 if (filters.q) {
 const q = filters.q.toLowerCase();
 filtered = filtered.filter(m =>
 m.name.toLowerCase().includes(q) ||
 (m.badge || "").toLowerCase().includes(q) ||
 m.expertise?.some(skill => skill.toLowerCase().includes(q))
 );
 }

 if (filters.branchId) {
 filtered = filtered.filter(m =>
 (m.branchId?._id === filters.branchId) ||
 (m.branchId === filters.branchId)
 );
 }

 if (filters.courseId) {
 const selectedCourse = courses.find(c => c._id === filters.courseId);
 if (selectedCourse) {
 const courseTitle = (selectedCourse.title?.en || selectedCourse.title).toLowerCase();
 filtered = filtered.filter(m =>
 m.expertise?.some(skill => skill.toLowerCase().includes(courseTitle)) ||
 (m.badge || "").toLowerCase().includes(courseTitle)
 );
 }
 }

 setInstructors(filtered);
 }, [filters, allMentors, courses]);

 const handleFilterChange = (key, value) => {
 setFilters((prev) => ({ ...prev, [key]: value }));
 };

 return (
 <section className="min-h-screen bg-white py-24 overflow-hidden relative flex flex-col font-sans">
 {/* Very subtle architectural grid background */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,#slate-200_1px,transparent_1px),linear-gradient(to_bottom,#slate-200_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03] pointer-events-none"></div>

 <div className="container-custom relative z-10">
 <div className="max-w-4xl mb-16">
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex items-center gap-4 mb-6"
 >
 <div className="w-12 h-[2px] bg-brand-green"></div>
 <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
 Industry Experts
 </p>
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter"
 >
 Our <br />
 <span className="text-slate-400">Mentors</span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-brand-green pl-6"
 >
 Learn directly from active professionals currently building real-world solutions. Filtered and curated to ensure the highest quality mentorship for your journey.
 </motion.p>
 </div>

 {/* Filter Bar */}
 <div className="bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-16 flex flex-col md:flex-row gap-4 items-center">
 <div className="relative flex-1 w-full border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
 <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
 <input
 type="text"
 placeholder="Search by name or skill (e.g. React, UI/UX)..."
 className="w-full pl-10 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-900 transition-all font-bold text-sm outline-none placeholder:text-slate-400"
 value={filters.q}
 onChange={(e) => handleFilterChange("q", e.target.value)}
 />
 </div>

 <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
 <div className="relative flex-1 md:w-56 sm:border-r border-slate-100 sm:pr-4">
 <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
 <select
 className="w-full pl-8 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-700 text-xs font-bold appearance-none cursor-pointer outline-none"
 value={filters.branchId}
 onChange={(e) => handleFilterChange("branchId", e.target.value)}
 >
 <option value="">All Branches</option>
 {branches.map((b) => (
 <option key={b._id} value={b._id}>{b.name}</option>
 ))}
 </select>
 </div>

 <div className="relative flex-1 md:w-56">
 <BookOpen className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
 <select
 className="w-full pl-8 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-700 text-xs font-bold appearance-none cursor-pointer outline-none"
 value={filters.courseId}
 onChange={(e) => handleFilterChange("courseId", e.target.value)}
 >
 <option value="">All Course Skills</option>
 {courses.map((c) => (
 <option key={c._id} value={c._id}>{c.title?.en || c.title}</option>
 ))}
 </select>
 </div>
 </div>
 </div>

 {/* Content */}
 <div className="relative min-h-[400px]">
 {loading && (
 <div className="flex flex-col items-center justify-center py-20 gap-4">
 <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-green animate-spin" />
 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Mentor Network...</p>
 </div>
 )}

 {!loading && instructors.length === 0 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="flex flex-col items-center justify-center py-20 text-center"
 >
 <div className="w-20 h-20 bg-slate-100 flex items-center justify-center mb-6">
 <UserIcon className="w-10 h-10 text-slate-300" />
 </div>
 <h3 className="text-xl font-bold text-slate-900 mb-2">No Mentors Found</h3>
 <p className="text-slate-500 max-w-sm">
 We couldn't find any mentors matching your filters in the CMS.
 Try clearing your search or selecting a different branch.
 </p>
 <button
 onClick={() => setFilters({ q: "", branchId: "", courseId: "" })}
 className="mt-6 min-h-[44px] px-4 text-brand-green font-bold hover:underline uppercase text-xs tracking-widest"
 >
 Reset all filters
 </button>
 </motion.div>
 )}

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
 <AnimatePresence mode="popLayout">
 {instructors.map((instructor, i) => (
 <motion.div
 key={instructor._id || i}
 layout
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 transition={{ duration: 0.2 }}
 onClick={() => setSelectedMentor(instructor)}
 className="group cursor-pointer flex flex-col"
 >
 <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
 {instructor.avatar ? (
 <Image
 src={instructor.avatar}
 alt={instructor.name}
 fill
 sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
 loading="lazy"
 decoding="async"
 unoptimized={true}
 onError={(e) => { e.target.style.opacity = '0'; }}
 onLoad={(e) => {
 if (e.target.src.includes('ibb.co') && e.target.naturalWidth === 180 && e.target.naturalHeight === 180) {
 e.target.style.opacity = '0';
 }
 }}
 className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 z-10 relative"
 />
 ) : null}
 <UserIcon className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 absolute z-0" />
 
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
 </div>

 <div className="flex-1 flex flex-col">
 <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-brand-green transition-colors line-clamp-2 leading-snug">
 {instructor.name}
 </h3>
 <p className="text-slate-500 font-bold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-1 line-clamp-2">
 {instructor.badge || instructor.role}
 </p>
 
 <div className="flex items-center gap-1.5 mb-3 mt-1.5">
 <MapPin className="w-3 h-3 text-brand-green shrink-0" />
 <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase">
 {instructor.branchId?.name || "Global Faculty"}
 </p>
 </div>
 
 <div className="flex flex-wrap gap-2 mb-4">
 {(instructor.expertise || []).slice(0, 3).map((t) => (
 <span
 key={t}
 className="px-2 py-1 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider"
 >
 {t}
 </span>
 ))}
 {instructor.expertise?.length > 3 && (
 <span className="text-[9px] text-slate-400 font-bold self-center uppercase tracking-widest">
 +{instructor.expertise.length - 3}
 </span>
 )}
 </div>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 </div>
 </div>
 </div>

 {/* Mobile Sticky CTA */}
 <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div>
 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Step</p>
 <p className="text-slate-900 font-bold text-sm">Join the Program</p>
 </div>
 <button className="px-5 py-3 min-h-[44px] bg-brand-green text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-green/30">
 Apply Now
 </button>
 </div>

 {/* Mentor Modal */}
 <AnimatePresence>
 {selectedMentor && (
 <MentorModal 
 mentor={selectedMentor} 
 onClose={() => setSelectedMentor(null)} 
 />
 )}
 </AnimatePresence>
 </section>
 );
}
