"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import CourseCard from "@/components/courses/CourseCard";
import { CourseCardSkeleton } from "@/components/ui/Skeleton";
import api from "@/lib/api";
import {
  IoSearchOutline,
  IoCloseOutline,
  IoBookOutline,
} from "react-icons/io5";

const CATEGORIES = [
  { id: "all", label: "🌐 All Courses" },
  { id: "web-dev", label: "💻 Web Dev" },
  { id: "graphic-design", label: "🎨 Design" },
  { id: "smm", label: "📣 Marketing" },
  { id: "ai", label: "🤖 AI & Tools" },
  { id: "other", label: "🧩 Other" },
];

const stagger = { animate: { transition: { staggerChildren: 0.07 } } };
const cardVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CoursesPage() {
  const locale = useLocale();
  const [category, setCategory] = useState("all");
  const [branch, setBranch] = useState("all");
  const [search, setSearch] = useState("");
  const [inputVal, setInputVal] = useState("");
  const debounceRef = useRef(null);

  const { data: coursesData, isLoading: loading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const params = { page: 1, limit: 1000 };
      const res = await api.get("/courses", { params });
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes freshness for marketing
    gcTime: 10 * 60 * 1000   // 10 minutes cache retention
  });

  const courses = coursesData || [];

  const branchOptions = useMemo(() => {
    const set = new Set();
    courses.forEach((course) => {
      if (course.branchId) set.add(String(course.branchId));
      else set.add("master");
    });
    return ["all", ...Array.from(set)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return courses.filter((course) => {
      const title =
        course.title?.en ||
        (typeof course.title === "string" ? course.title : "");
      const categoryMatch = category === "all" || course.category === category;
      const branchKey = course.branchId ? String(course.branchId) : "master";
      const branchMatch = branch === "all" || branchKey === branch;
      const searchMatch =
        !keyword ||
        title.toLowerCase().includes(keyword) ||
        (course.category || "").toLowerCase().includes(keyword);

      return categoryMatch && branchMatch && searchMatch;
    });
  }, [courses, category, branch, search]);

  // Debounce search input
  const handleSearchChange = (e) => {
    setInputVal(e.target.value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(e.target.value), 350);
  };

  const clearSearch = () => {
    setInputVal("");
    setSearch("");
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-background)" }}
    >
      {/* ── Hero Banner ───────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 text-center"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
        }}
      >
        {/* Blobs */}
        <motion.div
          className="absolute -top-24 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--color-brand-pink)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "#818cf8" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
        />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 bg-white/10 border border-white/10">
            🎓{" "}
            {filteredCourses.length > 0
              ? `${filteredCourses.length} Courses Available`
              : "Courses"}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Explore Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 animate-gradient-x">Courses</span>
          </h1>
          <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8">
            Learn demand-driven skills from industry experts and start earning
            via real client projects.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <IoSearchOutline
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300"
            />
            <input
              type="text"
              placeholder="Search courses…"
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-300/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-base"
              value={inputVal}
              onChange={handleSearchChange}
            />
            {inputVal && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white"
              >
                <IoCloseOutline size={20} />
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Category Filter Tabs ─────────────────────── */}
      <section className="sticky top-0 z-20 bg-[var(--color-surface)] border-b border-neutral-200 shadow-sm">
        <div className="container-custom py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                category === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold bg-white border border-neutral-200 text-neutral-700"
          >
            {branchOptions.map((id) => (
              <option key={id} value={id}>
                {id === "all"
                  ? "All Branches"
                  : id === "master"
                    ? "Master Catalog"
                    : `Branch ${id.slice(-6).toUpperCase()}`}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Course Grid ──────────────────────────────── */}
      <div className="container-custom py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={category + search}
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredCourses.map((course) => (
                <motion.div key={course._id} variants={cardVariant}>
                  <CourseCard course={course} locale={locale} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
              <IoBookOutline size={36} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              No courses found
            </h3>
            <p className="text-neutral-500 text-sm">
              Try a different category or clear your search.
            </p>
            {search && (
              <button
                onClick={clearSearch}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
