"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import api from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
  IoArrowForwardOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoStar,
  IoSparklesOutline,
  IoCheckmarkCircle,
  IoDesktopOutline,
  IoEyeOutline,
  IoGridOutline,
  IoCodeSlashOutline,
  IoColorPaletteOutline,
  IoTrendingUpOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

// Curated default courses to ensure instant high-fidelity SSR and offline resilience
const DEFAULT_COURSES = [
  {
    _id: "seed-1",
    title: {
      bn: "MERN Stack Web Development Mastery",
      en: "MERN Stack Web Development Mastery",
    },
    slug: "mern-stack-seed",
    category: "web-dev",
    tagline: "Build enterprise full-stack web apps with React, Node & MongoDB",
    mode: "Online Live & Campus",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop",
    price: 12000,
    originalPrice: 18000,
    duration: "6 Months",
    totalStudents: 1450,
    rating: 4.9,
    isPopular: true,
  },
  {
    _id: "seed-2",
    title: {
      bn: "Graphic Design & Branding",
      en: "Graphic Design & Branding",
    },
    slug: "graphic-design-and-branding",
    category: "graphic-design",
    tagline: "Master Photoshop, Illustrator & Professional Brand Identity",
    mode: "Online Live & Recorded",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=800&fit=crop",
    price: 6000,
    originalPrice: 9800,
    duration: "4 Months",
    totalStudents: 1120,
    rating: 4.9,
    isPopular: true,
  },
  {
    _id: "seed-3",
    title: {
      bn: "Python & Applied AI",
      en: "Python & Applied AI",
    },
    slug: "python-and-applied-ai",
    category: "ai",
    tagline: "Machine Learning, LLM Automation & Real-world AI Applications",
    mode: "Online Live & Recorded",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop",
    price: 8500,
    originalPrice: 13000,
    duration: "4 Months",
    totalStudents: 890,
    rating: 4.95,
    isPopular: true,
  },
  {
    _id: "seed-4",
    title: {
      bn: "App Development (Flutter)",
      en: "App Development (Flutter)",
    },
    slug: "app-development-flutter",
    category: "web-dev",
    tagline: "Cross-platform iOS and Android Production App Development",
    mode: "Online Live & Recorded",
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    price: 7200,
    originalPrice: 11000,
    duration: "5 Months",
    totalStudents: 680,
    rating: 4.85,
    isPopular: true,
  },
  {
    _id: "seed-5",
    title: {
      bn: "Digital Marketing Masterclass",
      en: "Digital Marketing Masterclass",
    },
    slug: "digital-marketing-masterclass",
    category: "smm",
    tagline: "Performance Ads, SEO & Social Media Growth Strategies",
    mode: "Online Live & Recorded",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    price: 5500,
    originalPrice: 8500,
    duration: "3 Months",
    totalStudents: 1300,
    rating: 4.88,
    isPopular: true,
  },
  {
    _id: "seed-6",
    title: {
      bn: "Cyber Security & Ethical Hacking",
      en: "Cyber Security & Ethical Hacking",
    },
    slug: "cyber-security-and-ethical-hacking",
    category: "other",
    tagline: "Network Defense, Penetration Testing & Vulnerability Assessment",
    mode: "Online Live & Campus",
    thumbnail:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop",
    price: 10500,
    originalPrice: 16000,
    duration: "5 Months",
    totalStudents: 590,
    rating: 4.92,
    isPopular: true,
  },
  {
    _id: "seed-7",
    title: {
      bn: "UI/UX & Product Design",
      en: "UI/UX & Product Design",
    },
    slug: "uiux-and-product-design",
    category: "graphic-design",
    tagline: "Figma, Wireframing, User Research & Design Systems",
    mode: "Online Live & Recorded",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop",
    price: 6500,
    originalPrice: 9500,
    duration: "4 Months",
    totalStudents: 840,
    rating: 4.9,
    isPopular: true,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Programs", icon: IoGridOutline },
  { id: "web-dev", label: "Web & Engineering", icon: IoCodeSlashOutline },
  { id: "graphic-design", label: "Creative & Design", icon: IoColorPaletteOutline },
  { id: "ai", label: "AI & Machine Learning", icon: IoSparklesOutline },
  { id: "smm", label: "Digital Marketing", icon: IoTrendingUpOutline },
  { id: "other", label: "Tech & Security", icon: IoShieldCheckmarkOutline },
];

// Dynamic mathematical geometry for 5-card perspective stage spanning the full navbar width
function computeStageConfig(viewport, stageWidth = 1200) {
  const stageHalf = Math.max(160, stageWidth / 2);

  if (viewport === "desktop") {
    const stageHeight = 520;
    const baseW = 285;
    const baseH = 455;
    const scale2 = 0.65;
    const effW2 = baseW * scale2;
    // Outer edge of slot 2 spans to the exact container boundary (stageHalf) so cards cover arrow space
    const x2 = Math.round(stageHalf - effW2 / 2);
    const x1 = Math.round(x2 * 0.52);
    const x3 = Math.round(x2 * 1.35);

    return {
      stageHeight,
      baseW,
      baseH,
      stageWidth,
      slots: {
        0: { x: 0, scale: 1.0, opacity: 1, zIndex: 30, rotateY: 0 },
        1: { x: x1, scale: 0.83, opacity: 0.92, zIndex: 20, rotateY: -7 },
        "-1": { x: -x1, scale: 0.83, opacity: 0.92, zIndex: 20, rotateY: 7 },
        2: { x: x2, scale: scale2, opacity: 0.70, zIndex: 10, rotateY: -13 },
        "-2": { x: -x2, scale: scale2, opacity: 0.70, zIndex: 10, rotateY: 13 },
        3: { x: x3, scale: scale2 * 0.78, opacity: 0, zIndex: 0, rotateY: -18 },
        "-3": { x: -x3, scale: scale2 * 0.78, opacity: 0, zIndex: 0, rotateY: 18 },
      },
    };
  }

  if (viewport === "laptop") {
    const stageHeight = 490;
    const baseW = 265;
    const baseH = 430;
    const scale2 = 0.63;
    const effW2 = baseW * scale2;
    // Outer edge reaches the container boundary
    const x2 = Math.round(stageHalf - effW2 / 2);
    const x1 = Math.round(x2 * 0.52);
    const x3 = Math.round(x2 * 1.35);

    return {
      stageHeight,
      baseW,
      baseH,
      stageWidth,
      slots: {
        0: { x: 0, scale: 1.0, opacity: 1, zIndex: 30, rotateY: 0 },
        1: { x: x1, scale: 0.81, opacity: 0.90, zIndex: 20, rotateY: -6 },
        "-1": { x: -x1, scale: 0.81, opacity: 0.90, zIndex: 20, rotateY: 6 },
        2: { x: x2, scale: scale2, opacity: 0.65, zIndex: 10, rotateY: -12 },
        "-2": { x: -x2, scale: scale2, opacity: 0.65, zIndex: 10, rotateY: 12 },
        3: { x: x3, scale: scale2 * 0.78, opacity: 0, zIndex: 0, rotateY: -16 },
        "-3": { x: -x3, scale: scale2 * 0.78, opacity: 0, zIndex: 0, rotateY: 16 },
      },
    };
  }

  if (viewport === "tablet") {
    const stageHeight = 470;
    const baseW = 255;
    const baseH = 415;
    const scale1 = 0.80;
    const effW1 = baseW * scale1;
    const x1 = Math.round(stageHalf - effW1 / 2);
    const x2 = Math.round(stageHalf + 40);
    const x3 = Math.round(stageHalf + 160);

    return {
      stageHeight,
      baseW,
      baseH,
      stageWidth,
      slots: {
        0: { x: 0, scale: 1.0, opacity: 1, zIndex: 30, rotateY: 0 },
        1: { x: x1, scale: scale1, opacity: 0.85, zIndex: 20, rotateY: -5 },
        "-1": { x: -x1, scale: scale1, opacity: 0.85, zIndex: 20, rotateY: 5 },
        2: { x: x2, scale: 0.55, opacity: 0.15, zIndex: 10, rotateY: -10 },
        "-2": { x: -x2, scale: 0.55, opacity: 0.15, zIndex: 10, rotateY: 10 },
        3: { x: x3, scale: 0.45, opacity: 0, zIndex: 0, rotateY: -14 },
        "-3": { x: -x3, scale: 0.45, opacity: 0, zIndex: 0, rotateY: 14 },
      },
    };
  }

  // Mobile
  const stageHeight = 460;
  const baseW = 265;
  const baseH = 410;
  return {
    stageHeight,
    baseW,
    baseH,
    stageWidth,
    slots: {
      0: { x: 0, scale: 1.0, opacity: 1, zIndex: 30, rotateY: 0 },
      1: { x: 215, scale: 0.76, opacity: 0.35, zIndex: 10, rotateY: -4 },
      "-1": { x: -215, scale: 0.76, opacity: 0.35, zIndex: 10, rotateY: 4 },
      2: { x: 360, scale: 0.52, opacity: 0, zIndex: 0, rotateY: 0 },
      "-2": { x: -360, scale: 0.52, opacity: 0, zIndex: 0, rotateY: 0 },
      3: { x: 480, scale: 0.4, opacity: 0, zIndex: 0, rotateY: 0 },
      "-3": { x: -480, scale: 0.4, opacity: 0, zIndex: 0, rotateY: 0 },
    },
  };
}

export default function PopularCourses() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [viewport, setViewport] = useState("desktop");
  const stageRef = useRef(null);

  // Responsive breakpoint tracking with exact viewport classification
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewport("mobile");
      } else if (width < 1024) {
        setViewport("tablet");
      } else if (width < 1280) {
        setViewport("laptop");
      } else {
        setViewport("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch live courses from API
  const { data } = useQuery({
    queryKey: queryKeys.popularCourses(1, selectedCategory, "all", ""),
    queryFn: async () => {
      const params = { limit: 14 };
      if (selectedCategory !== "all") params.category = selectedCategory;
      const res = await api.get("/courses", { params });
      if (res.data?.success && res.data.data?.length > 0) {
        return res.data.data.map((c) => ({
          ...c,
          originalPrice: c.originalPrice ?? Math.round(c.price * 1.35),
          rating: c.rating ?? 4.9,
          totalStudents: c.totalStudents || c.enrolledCount || 450,
        }));
      }
      return [];
    },
    staleTime: 60 * 1000,
  });

  // Filtered & enriched courses list (guarantees at least 5 courses for 5-card perspective stage)
  const coursesList = useMemo(() => {
    const source =
      data && data.length > 0
        ? data
        : selectedCategory === "all"
          ? DEFAULT_COURSES
          : DEFAULT_COURSES.filter((c) => c.category === selectedCategory);

    const filtered =
      selectedCategory === "all"
        ? source
        : source.filter((c) => c.category === selectedCategory);

    const baseList = filtered.length > 0 ? filtered : DEFAULT_COURSES;

    if (baseList.length < 5) {
      const repeated = [];
      while (repeated.length < 5) {
        repeated.push(...baseList);
      }
      return repeated.slice(0, 5);
    }
    return baseList;
  }, [data, selectedCategory]);

  const totalCourses = coursesList.length;

  // Auto-slide effect (pauses on mouse hover)
  useEffect(() => {
    if (isHovered || totalCourses <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCourses);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, totalCourses]);

  // Navigate functions
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCourses) % totalCourses);
  }, [totalCourses]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCourses);
  }, [totalCourses]);

  // Reset active index when category changes
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setActiveIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Drag gesture calculation
  const handleDragEnd = (_event, info) => {
    if (info.offset.x < -45) {
      handleNext();
    } else if (info.offset.x > 45) {
      handlePrev();
    }
  };

  const [stageWidth, setStageWidth] = useState(1200);

  useEffect(() => {
    if (!stageRef.current) return;
    const updateWidth = () => {
      if (stageRef.current && stageRef.current.clientWidth > 0) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(stageRef.current);
    window.addEventListener("resize", updateWidth);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const activeConfig = useMemo(
    () => computeStageConfig(viewport, stageWidth),
    [viewport, stageWidth]
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] py-8 sm:py-10 md:py-12 border-b border-slate-200/80 font-sans"
      id="popular-courses"
    >
      {/* ── AMBIENT 3D PERSPECTIVE BACKGROUND GLOW ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[850px] h-[360px] bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-cyan-500/10 rounded-full blur-3xl -translate-y-4" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* ── SECTION HEADER (Standardized Section Heading Size) ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto"
        >
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-emerald-600 mb-2">
            Industrial Career Programs
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.15] tracking-tight mb-2">
            Our Core <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Training Programs
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-[1.6]">
            From enterprise Full-Stack Engineering and Applied AI to UI/UX and
            Cyber Security — production-grade curriculums to launch high-growth
            careers.
          </p>
        </motion.div>

        {/* ── 3D PERSPECTIVE 5-CARD SHOWCASE STAGE ── */}
        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full mx-auto flex items-center justify-center [perspective:1400px] select-none"
          style={{ height: `${activeConfig.stageHeight}px` }}
        >
          {/* Left Navigation Arrow (Floating & overlapping the outer card at navbar boundary) */}
          <button
            onClick={handlePrev}
            aria-label="Previous Course"
            className="absolute left-0 sm:left-1 top-[38%] -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-slate-200/90 shadow-xl hover:shadow-2xl flex items-center justify-center text-slate-800 hover:text-emerald-600 hover:scale-110 active:scale-95 transition-all cursor-pointer ring-2 ring-black/5"
          >
            <IoChevronBackOutline size={20} />
          </button>

          {/* Right Navigation Arrow (Floating & overlapping the outer card at navbar boundary) */}
          <button
            onClick={handleNext}
            aria-label="Next Course"
            className="absolute right-0 sm:right-1 top-[38%] -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-slate-200/90 shadow-xl hover:shadow-2xl flex items-center justify-center text-slate-800 hover:text-emerald-600 hover:scale-110 active:scale-95 transition-all cursor-pointer ring-2 ring-black/5"
          >
            <IoChevronForwardOutline size={20} />
          </button>

          {/* Motion Stage with Drag Gesture Support */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] cursor-grab active:cursor-grabbing"
          >
            {coursesList.map((course, index) => {
              // Calculate circular relative offset
              let diff = (index - activeIndex) % totalCourses;
              if (diff > totalCourses / 2) diff -= totalCourses;
              if (diff < -totalCourses / 2) diff += totalCourses;

              const isCenter = diff === 0;
              const absDiff = Math.abs(diff);

              // Get layout slot properties from activeConfig
              const slot = activeConfig.slots[diff] || {
                x: diff < 0 ? -700 : 700,
                scale: 0.5,
                opacity: 0,
                zIndex: 0,
                rotateY: diff < 0 ? 18 : -18,
              };

              const displayTitle =
                typeof course.title === "object"
                  ? course.title?.[locale] || course.title?.en || "Course Title"
                  : course.title || "Course Title";

              // Render cards up to distance 3 so exit and entrance transitions are silky smooth without pop-in
              if (absDiff > 3) return null;

              return (
                <motion.div
                  key={`perspective-card-${course._id || course.slug}-${index}`}
                  animate={{
                    x: slot.x,
                    scale: slot.scale,
                    opacity: slot.opacity,
                    zIndex: slot.zIndex,
                    rotateY: slot.rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 24,
                    mass: 0.8,
                  }}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(index);
                  }}
                  className={`absolute rounded-3xl bg-white border overflow-hidden flex flex-col justify-between transition-[box-shadow,border-color] duration-400 ${
                    isCenter
                      ? "border-emerald-500 shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-500/10 cursor-default"
                      : "border-slate-200/90 shadow-md hover:border-slate-300 hover:shadow-xl cursor-pointer"
                  }`}
                  style={{
                    width: `${activeConfig.baseW}px`,
                    height: `${activeConfig.baseH}px`,
                    transformOrigin: "center center",
                    pointerEvents: slot.opacity === 0 ? "none" : "auto",
                  }}
                >
                  {/* Top: Thumbnail & Badges */}
                  <div className="relative w-full h-[180px] sm:h-[195px] bg-slate-900 overflow-hidden shrink-0 group/thumb">
                    <Image
                      src={
                        course.thumbnail ||
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop"
                      }
                      alt={displayTitle}
                      fill
                      sizes="(max-width: 640px) 270px, (max-width: 1024px) 280px, 310px"
                      priority={isCenter}
                      className={`object-cover transition-transform duration-700 ${
                        isCenter ? "group-hover/thumb:scale-105" : ""
                      }`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Top Left Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10 pointer-events-none">
                      {course.isPopular && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                          <IoCheckmarkCircle size={11} />
                          Popular
                        </span>
                      )}
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[9px] font-bold text-white uppercase tracking-wider">
                        {course.category || "Pro Track"}
                      </span>
                    </div>

                    {/* Top Right Rating Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-[11px] font-black">
                        <IoStar size={11} className="text-amber-400" />
                        <span>{course.rating || 4.9}</span>
                      </div>
                    </div>

                    {/* Mode Tag at Bottom Left of Thumbnail */}
                    <div className="absolute bottom-2 left-2.5 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-200">
                        <IoDesktopOutline
                          size={12}
                          className="text-emerald-400"
                        />
                        <span>{course.mode || "Online & Campus"}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body: Course Information */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Course Title */}
                      <h3
                        className={`font-black line-clamp-2 leading-[1.25] mb-1.5 transition-colors ${
                          isCenter
                            ? "text-sm sm:text-base text-slate-900 group-hover:text-emerald-600"
                            : "text-xs sm:text-sm text-slate-800"
                        }`}
                      >
                        {displayTitle}
                      </h3>

                      {/* Brief Tagline */}
                      <p className="text-[11px] text-slate-500 line-clamp-2 font-medium leading-[1.45] mb-2">
                        {course.tagline ||
                          "Master industrial tools and work on production codebases."}
                      </p>

                      {/* Stats Pills */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-semibold">
                        <div className="flex items-center gap-1">
                          <IoTimeOutline
                            size={13}
                            className="text-emerald-600 shrink-0"
                          />
                          <span>{course.duration || "4 Months"}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1">
                          <IoPeopleOutline
                            size={13}
                            className="text-teal-600 shrink-0"
                          />
                          <span>{course.totalStudents || 800}+</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1 mt-1.5">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black text-slate-900">
                            ৳{course.price?.toLocaleString() || "6,500"}
                          </span>
                          {course.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through font-semibold">
                              ৳{course.originalPrice?.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {isCenter ? (
                        <Link
                          href={`/${locale}/courses/${course.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[11px] font-black uppercase tracking-wider shadow-xs hover:shadow-md transition-all group/btn"
                        >
                          <span>Explore</span>
                          <IoArrowForwardOutline
                            size={12}
                            className="group-hover/btn:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(index);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-[10px] font-bold transition-all cursor-pointer"
                        >
                          <IoEyeOutline size={11} />
                          <span>Focus</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Dimmed Overlay for Non-Center Cards to enhance stage depth */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-slate-900/[0.03] hover:bg-transparent transition-colors pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── PAGINATION DOTS & COUNTER ── */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center justify-center gap-2.5">
          <div className="flex items-center gap-2">
            {coursesList.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Jump to course ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-8 h-2 bg-gradient-to-r from-emerald-600 to-teal-600"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              );
            })}
          </div>

          <div className="text-[11px] font-bold text-slate-400 tracking-wider">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-slate-300">/</span>
            <span>{String(totalCourses).padStart(2, "0")} Featured Tracks</span>
          </div>
        </div>

        {/* ── FOOTER CATALOG LINK (Text Only, No BG/Border) ── */}
        <div className="mt-6 sm:mt-7 text-center">
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>Explore Full Course Catalog (14+ Programs)</span>
            <IoArrowForwardOutline
              size={14}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
