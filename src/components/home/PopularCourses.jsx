"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageLoader from "@/components/ui/ImageLoader";
import { useLocale } from "next-intl";
import api from "@/lib/api";
import {
  IoTimeOutline,
  IoPeopleOutline,
  IoStar,
  IoArrowForwardOutline,
  IoBookOutline,
  IoFlashOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoLanguageOutline,
  IoVideocamOutline,
  IoChevronDownOutline
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

const FALLBACK = [
  {
    _id: "1",
    slug: "web-development",
    title: { en: "Web Development Mastery" },
    category: "Development",
    price: 6000,
    originalPrice: 8000,
    duration: "6 Months",
    enrolledCount: 340,
    rating: 4.9,
    badge: "🔥 Hero Course",
    thumbnail: "/images/web.png",
  },
  {
    _id: "2",
    slug: "social-media-marketing",
    title: { en: "Digital Marketing Growth" },
    category: "Marketing",
    price: 3500,
    originalPrice: 5000,
    duration: "6 Months",
    enrolledCount: 210,
    rating: 4.8,
    badge: "📈 Trending",
    thumbnail: "/images/marketing.png",
  },
  {
    _id: "3",
    slug: "graphic-design",
    title: { en: "Visual Design & UI" },
    category: "Creative",
    price: 4000,
    originalPrice: 5500,
    duration: "6 Months",
    enrolledCount: 180,
    rating: 4.8,
    badge: "🎨 Artistic",
    thumbnail: "/images/graphic.png",
  },
  {
    _id: "4",
    slug: "ai-prompt-engineering",
    title: { en: "AI & Future Automation" },
    category: "Advanced AI",
    price: 2800,
    originalPrice: 4000,
    duration: "6 Months",
    enrolledCount: 120,
    rating: 4.9,
    badge: "🤖 Smart Choice",
    thumbnail: "/images/ai.png",
  },
];

export default function PopularCourses() {
  const locale = useLocale();
  const [allCourses, setAllCourses] = useState(FALLBACK);
  const [category, setCategory] = useState("all");
  const [branch, setBranch] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
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

  useEffect(() => {
    api
      .get("/courses", { params: { page: 1, limit: 1000, isPopular: "true" } })
      .then((res) => {
        if (res.data?.success && res.data.data.length) {
          const enriched = res.data.data.map((c) => ({
            ...c,
            originalPrice: c.originalPrice ?? Math.round(c.price * 1.3), // fallback: show 23% discount
          }));
          setAllCourses(enriched);
        }
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const set = new Set(allCourses.map((c) => c.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [allCourses]);

  const branches = useMemo(() => {
    const set = new Set();
    allCourses.forEach((course) => {
      if (course.branchId) set.add(String(course.branchId));
      else set.add("master");
    });
    return ["all", ...Array.from(set)];
  }, [allCourses]);

  const filteredCourses = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return allCourses.filter((course) => {
      const title =
        course.title?.en ||
        (typeof course.title === "string" ? course.title : "");
      const categoryMatch = category === "all" || course.category === category;
      const branchKey = course.branchId ? String(course.branchId) : "master";
      const branchMatch = branch === "all" || branchKey === branch;
      const searchMatch =
        !normalized ||
        title.toLowerCase().includes(normalized) ||
        (course.category || "").toLowerCase().includes(normalized);
      return categoryMatch && branchMatch && searchMatch;
    });
  }, [allCourses, category, branch, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [category, branch, search]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, page]);

  return (
    <section className="section py-24 bg-slate-50 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
              Our Core <span className="text-blue-600">Training Programs</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">
              Join 5,000+ students already mastering the most in-demand digital
              skills in today's competitive job market.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto mb-16 space-y-8">
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
                setSearch(value);
              }}
              placeholder="Search by course title or category"
              className="w-full rounded-[2rem] border-none bg-white py-5 pl-14 pr-14 text-sm font-black text-slate-700 outline-none focus:ring-4 focus:ring-blue-100 shadow-2xl shadow-slate-100 transition-all placeholder:text-slate-300"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearch("");
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
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {paginatedCourses.map((course, index) => (
            <motion.div
              key={course._id}
              variants={cardAnim}
              className="relative"
            >
              <CourseCard course={course} locale={locale} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100 mt-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-300 mb-6">
               <IoSearchOutline size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No matching courses</h3>
            <p className="text-slate-500 font-medium">
              We couldn't find anything matching "{search}". Try another keyword?
            </p>
          </div>
        )}

        {/* Pagination Info */}
        {filteredCourses.length > 0 && totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Page {page} of {totalPages} • {filteredCourses.length} results
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
