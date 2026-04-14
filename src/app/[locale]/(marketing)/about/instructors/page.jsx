"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import api from "@/lib/api";
import { LuSearch as Search, LuMapPin as MapPin, LuBookOpen as BookOpen, LuUser as UserIcon } from "react-icons/lu";

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

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [bRes, cRes, mRes] = await Promise.all([
          api.get("/branches/public/list"),
          api.get("/courses"),
          api.get("/cms/team?type=instructor")
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
        m.role.toLowerCase().includes(q) || 
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
          m.role.toLowerCase().includes(courseTitle)
        );
      }
    }

    setInstructors(filtered);
  }, [filters, allMentors, courses]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="min-h-screen bg-slate-50/50 py-20 overflow-hidden">
      <div className="container-custom relative">
        <div className="max-w-3xl mb-12 text-left border-l-4 border-brand-green pl-6 sm:pl-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter"
          >
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 animate-gradient-x">Mentors</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg leading-relaxed"
          >
            Learn directly from active professionals currently building real-world solutions. 
            Filtered and curated via CMS to ensure the highest quality mentorship for your journey.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or skill (e.g. React, UI/UX)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-green/20 text-slate-900 transition-all font-bold text-sm outline-none"
              value={filters.q}
              onChange={(e) => handleFilterChange("q", e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-green/20 text-slate-700 text-xs font-bold appearance-none cursor-pointer outline-none"
                value={filters.branchId}
                onChange={(e) => handleFilterChange("branchId", e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="relative flex-1 md:w-64">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-green/20 text-slate-700 text-xs font-bold appearance-none cursor-pointer outline-none"
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
              <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-green rounded-full animate-spin" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Mentor Network...</p>
            </div>
          )}

          {!loading && instructors.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <UserIcon className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Mentors Found</h3>
              <p className="text-slate-500 max-w-sm">
                We couldn't find any mentors matching your filters in the CMS. 
                Try clearing your search or selecting a different branch.
              </p>
              <button 
                onClick={() => setFilters({ q: "", branchId: "", courseId: "" })}
                className="mt-6 text-brand-green font-bold hover:underline uppercase text-xs tracking-widest"
              >
                Reset all filters
              </button>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {instructors.map((instructor, i) => (
                <motion.div
                  key={instructor._id || i}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white flex items-center gap-6 p-4 rounded-[2.5rem] hover:ring-2 hover:ring-brand-green/10 transition-all group border border-slate-100 hover:shadow-xl hover:shadow-brand-green/5"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-[2rem] overflow-hidden shadow-sm bg-slate-50">
                    <Image
                      src={instructor.image || "/images/placeholder.png"}
                      alt={instructor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-green transition-colors truncate px-1">
                      {instructor.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase text-brand-green mb-1 px-1">{instructor.role}</p>
                    <p className="text-[10px] font-bold text-slate-400 mb-3 flex items-center gap-1 px-1">
                      <MapPin className="w-3 h-3 text-slate-300" />
                      {instructor.branchId?.name || "Global Faculty"}
                    </p>
                    <div className="flex flex-wrap gap-2 px-1">
                      {(instructor.expertise || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-slate-50 text-slate-500 border border-slate-100 text-[9px] font-bold uppercase tracking-wider rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                      {instructor.expertise?.length > 3 && (
                        <span className="text-[9px] text-slate-400 font-bold self-center">
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
    </section>
  );
}
