"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import api from "@/lib/api";
import {
  IoArrowForwardOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import CourseCard from "@/components/courses/CourseCard";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardAnim = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PopularCourses() {
  const locale = useLocale();
  const [category, setCategory] = useState("all");
  const [branch, setBranch] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const CATEGORY_LABELS = {
    all: "All",
    "web-dev": "Web Dev",
    "graphic-design": "Graphic Design",
    smm: "Marketing",
    ai: "AI",
    other: "Other",
  };

  const PAGE_SIZE = 8;

  // Search Debounce Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [category, branch, debouncedSearch]);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["popular-courses", page, category, branch, debouncedSearch],
    queryFn: async () => {
      const params = {
        page,
        limit: PAGE_SIZE,
        isPopular: "true",
      };
      if (category !== "all") params.category = category;
      if (branch !== "all" && branch !== "master") params.branchId = branch;
      if (branch === "master") params.isMaster = "true";
      if (debouncedSearch.trim()) params.search = debouncedSearch;

      const res = await api.get("/courses", { params });

      if (res.data?.success) {
        return {
          courses: res.data.data.map((c) => ({
            ...c,
            originalPrice: c.originalPrice ?? Math.round(c.price * 1.3),
          })),
          totalCount: res.data.totalCount || res.data.data.length,
          totalPages: res.data.totalPages || 1,
        };
      }
      return { courses: [], totalCount: 0, totalPages: 1 };
    },
    placeholderData: (previousData) => previousData,
    staleTime: 60 * 1000, // 1 minute cache
  });

  const courses = data?.courses || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 1;
  const isEmptyState = !isLoading && courses.length === 0;

  const categories = useMemo(() => {
    return ["all", "web-dev", "graphic-design", "smm", "ai", "other"];
  }, []);

  const branches = useMemo(() => {
    return ["all", "master"];
  }, []);

  return (
    <section className="section py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-pink-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-slate-200">
              Skill Up Daily
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
              Our Core <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 animate-gradient-x">
                Training Programs
              </span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">
              Join 5,000+ students already mastering the most in-demand digital
              skills in today's competitive job market.
            </p>
          </motion.div>
        </div>

        <div
          className={`max-w-6xl mx-auto ${isEmptyState ? "mb-6" : "mb-16"} space-y-8`}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <IoSearchOutline
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                const value = e.target.value;
                setSearchInput(value);
              }}
              placeholder="Search by course title or category"
              className="w-full rounded-[2rem] border-none bg-white py-5 pl-14 pr-14 text-sm font-black text-slate-700 outline-none focus:ring-4 focus:ring-blue-100 shadow-2xl shadow-slate-100 transition-all placeholder:text-slate-300"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <IoCloseOutline size={22} />
              </button>
            )}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-6 py-3 text-[10px] font-black uppercase tracking-[0.1em] transition-all shadow-sm ${
                    category === cat
                      ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                  }`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>

            <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block" />

            {/* Branch Selector */}
            <div className="relative group">
              <IoChevronDownOutline
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-600 transition-colors"
              />
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="appearance-none rounded-full pl-6 pr-10 py-3 text-[10px] font-black uppercase tracking-[0.1em] bg-white text-slate-600 border border-slate-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer min-w-[180px] hover:border-blue-200 transition-all"
              >
                {branches.map((id) => (
                  <option key={id} value={id}>
                    {id === "all"
                      ? "All Branches"
                      : id === "master"
                        ? "Master Catalog"
                        : `📍 Branch ${id.slice(-6).toUpperCase()}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {!isEmptyState && (
          <div
            className={`relative ${isLoading ? "min-h-[400px]" : "min-h-0"}`}
          >
            {isLoading && !data && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-50/50 backdrop-blur-[2px]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <motion.div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${
                isLoading || isPlaceholderData
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  variants={cardAnim}
                  className="relative"
                >
                  <CourseCard
                    course={course}
                    locale={locale}
                    priority={index < 2}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {isEmptyState && (
          <div className="text-center py-12 bg-white rounded-[3rem] shadow-sm border border-slate-100 mt-0">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-300 mb-6">
              <IoSearchOutline size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              No matching courses
            </h3>
            <p className="text-slate-500 font-medium">
              We couldn't find anything matching "{debouncedSearch}". Try
              another keyword?
            </p>
          </div>
        )}

        {/* Pagination Info */}
        {!isLoading && courses.length > 0 && totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Page {page} of {totalPages} • {totalCount} results
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-2xl border border-slate-200 bg-white px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-all shadow-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-2xl border border-slate-200 bg-white px-8 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-all shadow-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Footer Link */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] rounded-[2rem] shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-blue-200 transition-all border border-slate-100 group"
          >
            Explore Master Catalog
            <IoArrowForwardOutline
              className="group-hover:translate-x-2 transition-transform duration-300 text-blue-600"
              size={18}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
