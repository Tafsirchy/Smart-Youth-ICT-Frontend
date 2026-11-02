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
    <section className="min-h-screen bg-slate-50 pt-12 sm:pt-18 pb-10 md:pb-14 overflow-hidden relative flex flex-col font-sans">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 mb-2.5"
          >
            <div className="w-8 h-[2px] bg-brand-green" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 leading-[1.4]">
              Industry Experts
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] mb-2.5 tracking-tight"
          >
            Our{" "}
            <span className="text-slate-400">Mentors</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-slate-600 text-sm md:text-base leading-[1.6] max-w-2xl border-l-2 border-brand-green pl-4 font-normal"
          >
            Learn directly from active professionals currently building real-world solutions. Filtered and curated to ensure the highest quality mentorship for your journey.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3.5 sm:p-4 shadow-xs border border-slate-200/90 mb-8 md:mb-10 flex flex-col md:flex-row gap-3 items-center rounded-2xl">
          <div className="relative flex-1 w-full border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or skill (e.g. React, UI/UX)..."
              className="w-full pl-9 pr-3 py-2 bg-transparent border-none focus:ring-0 text-slate-900 transition-all font-bold text-xs sm:text-sm outline-none placeholder:text-slate-400"
              value={filters.q}
              onChange={(e) => handleFilterChange("q", e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-48 sm:border-r border-slate-100 sm:pr-2.5">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <select
                className="w-full pl-8 pr-3 py-2 bg-transparent border-none focus:ring-0 text-slate-700 text-xs font-bold appearance-none cursor-pointer outline-none"
                value={filters.branchId}
                onChange={(e) => handleFilterChange("branchId", e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 md:w-48">
              <BookOpen className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <select
                className="w-full pl-8 pr-3 py-2 bg-transparent border-none focus:ring-0 text-slate-700 text-xs font-bold appearance-none cursor-pointer outline-none"
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
        <div className="relative min-h-[300px]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-green animate-spin rounded-full" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Syncing Mentor Network...</p>
            </div>
          )}

          {!loading && instructors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-14 h-14 bg-slate-100 flex items-center justify-center mb-4 rounded-xl">
                <UserIcon className="w-7 h-7 text-slate-300" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No Mentors Found</h3>
              <p className="text-slate-500 text-xs max-w-sm">
                We couldn't find any mentors matching your filters. Try clearing your search or selecting a different branch.
              </p>
              <button
                onClick={() => setFilters({ q: "", branchId: "", courseId: "" })}
                className="mt-4 px-3 py-2 text-brand-green font-bold hover:underline uppercase text-[10px] tracking-wider"
              >
                Reset all filters
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {instructors.map((instructor, i) => (
                <motion.div
                  key={instructor._id || i}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedMentor(instructor)}
                  className="group cursor-pointer flex flex-col bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-brand-green/40 transition-all duration-200"
                >
                  <div className="relative w-full aspect-[3/4] mb-2.5 overflow-hidden bg-slate-100 border border-slate-200/80 rounded-xl flex items-center justify-center">
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
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 z-10 relative"
                      />
                    ) : null}
                    <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 absolute z-0" />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-0.5 group-hover:text-brand-green transition-colors line-clamp-1 leading-[1.3]">
                      {instructor.name}
                    </h2>
                    <p className="text-slate-500 font-bold text-[9px] tracking-[0.15em] uppercase mb-1 line-clamp-1 leading-[1.4]">
                      {instructor.badge || instructor.role}
                    </p>

                    <div className="flex items-center gap-1.5 mb-2 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-brand-green shrink-0" />
                      <p className="text-slate-400 text-[9px] font-bold tracking-wider uppercase truncate leading-none">
                        {instructor.branchId?.name || "Global Faculty"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-auto pt-1.5 border-t border-slate-100">
                      {(instructor.expertise || []).slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 bg-slate-50 border border-slate-200/70 text-slate-600 text-[8px] font-bold uppercase tracking-wider rounded"
                        >
                          {t}
                        </span>
                      ))}
                      {instructor.expertise?.length > 2 && (
                        <span className="text-[8px] text-slate-400 font-bold self-center uppercase tracking-wider">
                          +{instructor.expertise.length - 2}
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
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-[1.4]">Next Step</p>
          <p className="text-slate-900 font-bold text-sm leading-[1.4]">Join the Program</p>
        </div>
        <button className="px-5 py-2.5 min-h-[42px] bg-brand-green text-white font-black text-[10px] uppercase tracking-widest shadow-md shadow-brand-green/30 rounded-md leading-[1.4]">
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
