"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import api from "@/lib/api";
import { LuSearch as Search, LuMapPin as MapPin, LuBookOpen as BookOpen, LuUser as UserIcon } from "react-icons/lu";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    branchId: "",
    courseId: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch initial dropdown data
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [bRes, cRes] = await Promise.all([
          api.get("/branches/public/list"),
          api.get("/courses"),
        ]);
        setBranches(bRes.data.data || []);
        setCourses(cRes.data.data || []);
      } catch (err) {
        console.error("Failed to fetch filter metadata", err);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch instructors based on filters
  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.q) params.append("q", filters.q);
        if (filters.branchId) params.append("branchId", filters.branchId);
        if (filters.courseId) params.append("courseId", filters.courseId);

        const res = await api.get(`/users/instructors/public?${params.toString()}`);
        setInstructors(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch instructors", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchInstructors, 300); // Debounce
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="min-h-screen bg-slate-50/50 py-20 overflow-hidden">
      <div className="container-custom relative">
        <div className="max-w-3xl mb-12 text-left border-l-4 border-brand-green pl-6 sm:pl-8">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 animate-gradient-x">Mentors</span>
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Learn directly from active professionals currently building real-world solutions. 
            Filter by branch or course to find the perfect mentor for your journey.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or skill (e.g. React, UI/UX)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-green/20 text-slate-900 transition-all"
              value={filters.q}
              onChange={(e) => handleFilterChange("q", e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-green/20 text-slate-700 text-sm appearance-none cursor-pointer"
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
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-green/20 text-slate-700 text-sm appearance-none cursor-pointer"
                value={filters.courseId}
                onChange={(e) => handleFilterChange("courseId", e.target.value)}
              >
                <option value="">All Courses</option>
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
              <p className="text-slate-400 font-medium">Finding best mentors for you...</p>
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
                We couldn't find any mentors matching your current filters. 
                Try clearing your search or selecting a different branch.
              </p>
              <button 
                onClick={() => setFilters({ q: "", branchId: "", courseId: "" })}
                className="mt-6 text-brand-green font-bold hover:underline"
              >
                Reset all filters
              </button>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {instructors.map((instructor, i) => (
                <motion.div
                  key={instructor._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white flex items-center gap-6 p-4 rounded-[2.5rem] hover:ring-2 hover:ring-brand-green/10 transition-all group border border-slate-100 hover:shadow-xl hover:shadow-brand-green/5"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-[2rem] overflow-hidden shadow-sm bg-slate-50">
                    <Image
                      src={instructor.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"}
                      alt={instructor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-green transition-colors truncate">
                      {instructor.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {instructor.branchId?.name || "Global Faculty"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(instructor.expertise || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                      {instructor.expertise?.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold self-center">
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
