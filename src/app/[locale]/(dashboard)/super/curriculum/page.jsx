"use client";

import {
  HiOutlineAcademicCap,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlineCloudArrowUp,
  HiOutlineRectangleStack,
  HiOutlineCube,
  HiOutlineCheckBadge,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlineXMark,
  HiOutlineChevronRight,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import Portal from "@/components/ui/Portal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

const PAGE_SIZE = 12;

const createBlankCourseForm = () => ({
  title: { en: "", bn: "" },
  tagline: { en: "", bn: "" },
  thumbnail: "",
  introVideo: "",
  category: "web-dev",
  description: { en: "", bn: "" },
  targetAudience: "beginner",
  keyOutcomes: [
    { en: "", bn: "" },
    { en: "", bn: "" },
    { en: "", bn: "" },
  ],
  curriculum: [
    {
      title: { en: "", bn: "" },
      lessons: [{ title: { en: "", bn: "" }, duration: "" }],
    },
  ],
  price: 0,
  discountedPrice: 0,
  duration: { value: 0, unit: "months" },
  totalLectures: 0,
  projectsCount: 0,
  language: "english",
  mode: "online",
  instructorName: "",
  instructorBio: "",
  whatsIncluded: [
    { text: "Lifetime access", included: true },
    { text: "Certificate", included: true },
    { text: "24/7 Support", included: true },
  ],
  projects: [{ title: { en: "", bn: "" }, description: { en: "", bn: "" } }],
  certificationDetails: "",
  faqs: [{ question: { en: "", bn: "" }, answer: { en: "", bn: "" } }],
});

const mapCourseToForm = (course = {}) => ({
  title: course.title || { en: "", bn: "" },
  tagline:
    typeof course.tagline === "string"
      ? { en: course.tagline, bn: "" }
      : course.tagline || { en: "", bn: "" },
  thumbnail: course.thumbnail || "",
  introVideo: course.previewVideo || "",
  category: course.category || "web-dev",
  description: course.description || { en: "", bn: "" },
  targetAudience: Array.isArray(course.targetAudience)
    ? course.targetAudience[0] || "beginner"
    : course.targetAudience || "beginner",
  keyOutcomes: (course.outcomes?.length ? course.outcomes : ["", "", ""])
    .slice(0, 3)
    .map((item) => (typeof item === "string" ? { en: item, bn: "" } : item)),
  curriculum: (course.curriculum?.length
    ? course.curriculum
    : [{ title: "", lessons: [{ title: "", duration: "" }] }]
  ).map((module) => ({
    title:
      typeof module.title === "string"
        ? { en: module.title, bn: "" }
        : module.title || { en: "", bn: "" },
    lessons: (module.lessons?.length
      ? module.lessons
      : module.topics?.length
        ? module.topics
        : [""]
    ).map((lesson) => ({
      title:
        typeof lesson === "string"
          ? { en: lesson, bn: "" }
          : lesson.title || { en: "", bn: "" },
      duration: lesson.duration || "",
    })),
  })),
  price: course.price || 0,
  discountedPrice: course.originalPrice || 0,
  duration: (() => {
    const durationText = course.duration || "0 months";
    const durationMatch = String(durationText).match(/(\d+)\s*(\w+)/i);
    return {
      value: durationMatch ? Number(durationMatch[1]) : 0,
      unit: durationMatch ? durationMatch[2].toLowerCase() : "months",
    };
  })(),
  totalLectures: course.totalLectures || 0,
  projectsCount: course.projectsCount || course.projects?.length || 0,
  language: course.language || "english",
  mode: course.mode || "online",
  instructorName: course.instructorName || "",
  instructorBio: course.instructorBio || "",
  whatsIncluded: course.whatsIncluded?.length
    ? course.whatsIncluded
    : [
        { text: "Lifetime access", included: true },
        { text: "Certificate", included: true },
        { text: "24/7 Support", included: true },
      ],
  projects: (course.projects?.length
    ? course.projects
    : [{ title: "", desc: "" }]
  ).map((project) => ({
    title:
      typeof project.title === "string"
        ? { en: project.title, bn: "" }
        : project.title || { en: "", bn: "" },
    description:
      typeof project.desc === "string"
        ? { en: project.desc, bn: "" }
        : project.description || { en: "", bn: "" },
  })),
  certificationDetails: course.certification?.desc || "",
  faqs: (course.faqs?.length
    ? course.faqs
    : [{ question: "", answer: "" }]
  ).map((faq) => ({
    question:
      typeof faq.question === "string"
        ? { en: faq.question, bn: "" }
        : faq.question || { en: "", bn: "" },
    answer:
      typeof faq.answer === "string"
        ? { en: faq.answer, bn: "" }
        : faq.answer || { en: "", bn: "" },
  })),
});

const buildCoursePayload = (form, existingCourse) => ({
  title: form.title,
  tagline: form.tagline.en || form.tagline.bn || "",
  thumbnail: form.thumbnail,
  previewVideo: form.introVideo,
  category: form.category,
  description: form.description,
  targetAudience: [form.targetAudience].filter(Boolean),
  outcomes: form.keyOutcomes
    .map((item) => item.en || item.bn || "")
    .filter(Boolean),
  curriculum: form.curriculum
    .filter((module) => module.title?.en || module.title?.bn)
    .map((module) => ({
      title: module.title.en || module.title.bn || "",
      duration: module.lessons
        .map((lesson) => lesson.duration)
        .filter(Boolean)
        .join(", "),
      isFree: false,
      topics: module.lessons
        .map((lesson) => lesson.title?.en || lesson.title?.bn || "")
        .filter(Boolean),
    })),
  price: Number(form.price) || 0,
  originalPrice: Number(form.discountedPrice) || null,
  duration: `${Number(form.duration.value) || 0} ${form.duration.unit}`.trim(),
  totalLectures: Number(form.totalLectures) || 0,
  projectsCount: Number(form.projectsCount) || 0,
  language: form.language,
  mode: form.mode,
  instructorName: form.instructorName,
  instructorBio: form.instructorBio,
  whatsIncluded: form.whatsIncluded.filter((item) => item.text?.trim()),
  projects: form.projects
    .filter((project) => project.title?.en || project.title?.bn)
    .map((project) => ({
      title: project.title.en || project.title.bn || "",
      desc: project.description.en || project.description.bn || "",
      techs: [],
      image: "",
    })),
  certification: {
    included: true,
    desc: form.certificationDetails,
  },
  faqs: form.faqs
    .filter((faq) => faq.question?.en || faq.question?.bn)
    .map((faq) => ({
      question: faq.question.en || faq.question.bn || "",
      answer: faq.answer.en || faq.answer.bn || "",
    })),
  instructor:
    (typeof existingCourse === "object"
      ? existingCourse?._id
      : existingCourse) || "65f1234567890abcdef12345",
  isMaster: true,
  branchId: null,
});

export default function MasterCurriculumPage() {
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [showFilters, setShowFilters] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseModalTab, setCourseModalTab] = useState("basic");
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [deployingCourse, setDeployingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState(createBlankCourseForm());

  useEffect(() => {
    fetchCourses();
    fetchBranches();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/super/courses");
      if (res.data?.success) setCourses(res.data.data);
    } catch (err) {
      toast.error("Failed to load master curriculum");
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get("/super/branches");
      if (res.data?.success) setBranches(res.data.data);
    } catch (err) {}
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = buildCoursePayload(courseForm, editingCourse?.instructor);
      if (editingCourse) {
        await api.put(`/super/courses/${editingCourse._id}`, payload);
        toast.success("Curriculum updated");
      } else {
        await api.post("/super/courses", payload);
        toast.success("New master course established");
      }
      setShowCourseModal(false);
      setEditingCourse(null);
      setCourseForm(createBlankCourseForm());
      fetchCourses();
    } catch (err) {
      toast.error("Failed to save master course");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (
      !window.confirm(
        "Deactivate this master course? Branch-level instances will remain active.",
      )
    )
      return;
    try {
      await api.delete(`/super/courses/${id}`);
      toast.success("Course deactivated");
      fetchCourses();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleDeploy = async () => {
    if (selectedBranches.length === 0)
      return toast.error("Select at least one branch");
    try {
      const res = await api.post("/super/deploy-course", {
        masterCourseId: deployingCourse._id,
        branchIds: selectedBranches,
      });
      if (res.data?.success) {
        toast.success(
          `Successfully pushed to ${res.data.data.filter((r) => r.status === "deployed").length} locations`,
        );
        setShowDeployModal(false);
        setSelectedBranches([]);
      }
    } catch (err) {
      toast.error("Deployment protocol failed");
    }
  };

  const uniqueCategories = [
    ...new Set(courses.map((c) => c.category).filter(Boolean)),
  ];

  const getMaxPrice = () => {
    const prices = courses.map((c) => c.price || 0);
    return prices.length > 0 ? Math.max(...prices) : 50000;
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title?.en?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(c.category);

    const matchesPrice = c.price >= priceRange.min && c.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const totalFiltered = filteredCourses.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: getMaxPrice() });
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories, priceRange]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4"
          >
            <span className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20">
              <HiOutlineAcademicCap size={32} />
            </span>
            Central Curriculum
          </motion.h1>
          <p className="mt-4 text-slate-500 font-medium max-w-md">
            The core intellectual property of SYICT. Define master courses here
            and deploy them instantly to any branch in your network.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search master courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl w-full md:w-64 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium text-slate-700 shadow-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEditingCourse(null);
              setCourseModalTab("basic");
              setCourseForm({
                title: { en: "", bn: "" },
                tagline: { en: "", bn: "" },
                thumbnail: "",
                introVideo: "",
                category: "web-dev",
                description: { en: "", bn: "" },
                targetAudience: "beginner",
                keyOutcomes: [
                  { en: "", bn: "" },
                  { en: "", bn: "" },
                  { en: "", bn: "" },
                ],
                curriculum: [
                  {
                    title: { en: "", bn: "" },
                    lessons: [{ title: { en: "", bn: "" }, duration: "" }],
                  },
                ],
                price: 0,
                discountedPrice: 0,
                duration: { value: 0, unit: "months" },
                totalLectures: 0,
                projectsCount: 0,
                language: "english",
                mode: "online",
                instructorName: "",
                instructorBio: "",
                whatsIncluded: [
                  { text: "Lifetime access", included: true },
                  { text: "Certificate", included: true },
                  { text: "24/7 Support", included: true },
                ],
                projects: [
                  {
                    title: { en: "", bn: "" },
                    description: { en: "", bn: "" },
                  },
                ],
                certificationDetails: "",
                faqs: [
                  { question: { en: "", bn: "" }, answer: { en: "", bn: "" } },
                ],
              });
              setShowCourseModal(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all text-sm whitespace-nowrap"
          >
            <HiOutlinePlus size={20} />
            New Master Course
          </motion.button>
        </div>
      </header>

      {/* Dynamic Filter Panel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-100 bg-white shadow-sm p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
            Filter & Refine
          </h3>
          {(selectedCategories.length > 0 ||
            priceRange.min > 0 ||
            priceRange.max < getMaxPrice()) && (
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Category
            </label>
            <div className="space-y-2.5">
              {uniqueCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, cat]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== cat),
                        );
                      }
                    }}
                    className="w-4 h-4 rounded border-slate-200 text-indigo-600 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors capitalize">
                    {cat.replace(/-/g, " ")}
                  </span>
                  <span className="text-xs font-bold text-slate-300 ml-auto">
                    ({courses.filter((c) => c.category === cat).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Price Range (৳)
            </label>
            <div className="space-y-4">
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={getMaxPrice()}
                  step="1000"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Min: ৳{priceRange.min.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={getMaxPrice()}
                  step="1000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Max: ৳{priceRange.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Results Info */}
          <div className="flex flex-col items-start md:items-end gap-4 md:justify-end">
            <div className="text-right">
              <p className="text-2xl font-black text-indigo-600">
                {totalFiltered}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Master Courses Match
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Course Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-slate-100 rounded-[2.5rem] animate-pulse"
              />
            ))
          : paginatedCourses.map((course) => (
              <motion.div
                key={course._id}
                variants={item}
                className="bg-white group rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-2"
              >
                <div className="relative h-48 rounded-[2rem] overflow-hidden bg-slate-900 mb-4">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                      <HiOutlineCube
                        size={48}
                        className="text-indigo-400 opacity-40 group-hover:rotate-12 transition-transform"
                      />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                      <HiOutlineCheckBadge size={14} />
                      Master Certified
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setCourseModalTab("basic");
                      setCourseForm(mapCourseToForm(course));
                      setShowCourseModal(true);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-400 hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <HiOutlinePencilSquare size={18} />
                  </button>
                </div>

                <div className="px-5 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {course.category || "General"}
                    </span>
                    <p className="text-xl font-black text-indigo-600">
                      ৳{course.price}
                    </p>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 leading-tight mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {course.title?.en}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                      <HiOutlineRectangleStack className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">
                        {course.curriculum?.length || 0} Modules
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                      <HiOutlineCloudArrowUp className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">
                        Active Node
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setDeployingCourse(course);
                        setShowDeployModal(true);
                      }}
                      className="flex-1 bg-slate-900 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                    >
                      <HiOutlinePaperAirplane size={14} className="rotate-45" />
                      Deploy Course
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
      </motion.div>

      {!loading && totalFiltered > 0 && totalPages > 1 && (
        <div className="rounded-3xl border border-slate-100 bg-white px-6 py-4 md:px-8 md:py-5 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Showing{" "}
            <span className="text-slate-900">{(page - 1) * PAGE_SIZE + 1}</span>{" "}
            -{" "}
            <span className="text-slate-900">
              {Math.min(page * PAGE_SIZE, totalFiltered)}
            </span>{" "}
            of <span className="text-slate-900">{totalFiltered}</span> master
            courses
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                if (
                  totalPages > 7 &&
                  Math.abs(p - page) > 1 &&
                  p !== 1 &&
                  p !== totalPages
                ) {
                  if (Math.abs(p - page) === 2) {
                    return (
                      <span
                        key={`ellipsis-${p}`}
                        className="px-2 text-slate-300"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                }
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                      page === p
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Course Modal */}
      <Portal>
        <AnimatePresence>
          {showCourseModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto custom-scrollbar relative z-[10000]"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900">
                    {editingCourse
                      ? "Refine Curriculum"
                      : "Establish Master Course"}
                  </h2>
                  <button
                    onClick={() => setShowCourseModal(false)}
                    className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 border-b border-slate-200 overflow-x-auto">
                  {[
                    { id: "basic", label: "Basic Info" },
                    { id: "overview", label: "Overview" },
                    { id: "curriculum", label: "Curriculum" },
                    { id: "pricing", label: "Pricing & Details" },
                    { id: "additional", label: "Additional" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCourseModalTab(tab.id)}
                      className={`px-4 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                        courseModalTab === tab.id
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={handleCourseSubmit}
                  className="space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto pr-4"
                >
                  {/* BASIC INFO TAB */}
                  {courseModalTab === "basic" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Title (English)
                          </label>
                          <input
                            required
                            value={courseForm.title.en}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                title: {
                                  ...courseForm.title,
                                  en: e.target.value,
                                },
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Title (Bengali)
                          </label>
                          <input
                            value={courseForm.title.bn}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                title: {
                                  ...courseForm.title,
                                  bn: e.target.value,
                                },
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Tagline (English)
                          </label>
                          <input
                            value={courseForm.tagline.en}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                tagline: {
                                  ...courseForm.tagline,
                                  en: e.target.value,
                                },
                              })
                            }
                            placeholder="Short value proposition"
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Category
                          </label>
                          <select
                            value={courseForm.category}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                category: e.target.value,
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          >
                            <option value="web-dev">Web Development</option>
                            <option value="graphic-design">
                              Graphic Design
                            </option>
                            <option value="smm">Digital Marketing</option>
                            <option value="ai">Artificial Intelligence</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Thumbnail URL
                        </label>
                        <input
                          value={courseForm.thumbnail}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              thumbnail: e.target.value,
                            })
                          }
                          placeholder="https://example.com/image.jpg"
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Intro Video URL
                        </label>
                        <input
                          value={courseForm.introVideo}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              introVideo: e.target.value,
                            })
                          }
                          placeholder="https://youtube.com/..."
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* OVERVIEW TAB */}
                  {courseModalTab === "overview" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Description (English)
                        </label>
                        <textarea
                          required
                          value={courseForm.description.en}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              description: {
                                ...courseForm.description,
                                en: e.target.value,
                              },
                            })
                          }
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 font-medium text-slate-700 outline-none min-h-[120px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Target Audience
                        </label>
                        <select
                          value={courseForm.targetAudience}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              targetAudience: e.target.value,
                            })
                          }
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Key Outcomes (English)
                        </label>
                        {courseForm.keyOutcomes.map((outcome, idx) => (
                          <input
                            key={idx}
                            value={outcome.en}
                            onChange={(e) => {
                              const updated = [...courseForm.keyOutcomes];
                              updated[idx] = {
                                ...updated[idx],
                                en: e.target.value,
                              };
                              setCourseForm({
                                ...courseForm,
                                keyOutcomes: updated,
                              });
                            }}
                            placeholder={`Outcome ${idx + 1}`}
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CURRICULUM TAB */}
                  {courseModalTab === "curriculum" && (
                    <div className="space-y-6">
                      {courseForm.curriculum.map((module, modIdx) => (
                        <div
                          key={modIdx}
                          className="border border-slate-200 rounded-2xl p-4 space-y-3"
                        >
                          <input
                            value={module.title.en}
                            onChange={(e) => {
                              const updated = [...courseForm.curriculum];
                              updated[modIdx] = {
                                ...updated[modIdx],
                                title: {
                                  ...updated[modIdx].title,
                                  en: e.target.value,
                                },
                              };
                              setCourseForm({
                                ...courseForm,
                                curriculum: updated,
                              });
                            }}
                            placeholder={`Module ${modIdx + 1} Title`}
                            className="w-full bg-slate-50 border-none rounded-xl p-3 font-bold text-slate-700 outline-none"
                          />
                          {module.lessons.map((lesson, lesIdx) => (
                            <div key={lesIdx} className="flex gap-2">
                              <input
                                value={lesson.title.en}
                                onChange={(e) => {
                                  const updated = [...courseForm.curriculum];
                                  updated[modIdx].lessons[lesIdx] = {
                                    ...updated[modIdx].lessons[lesIdx],
                                    title: {
                                      ...updated[modIdx].lessons[lesIdx].title,
                                      en: e.target.value,
                                    },
                                  };
                                  setCourseForm({
                                    ...courseForm,
                                    curriculum: updated,
                                  });
                                }}
                                placeholder="Lesson title"
                                className="flex-1 bg-slate-50 border-none rounded-xl p-3 text-sm text-slate-700 outline-none"
                              />
                              <input
                                value={lesson.duration}
                                onChange={(e) => {
                                  const updated = [...courseForm.curriculum];
                                  updated[modIdx].lessons[lesIdx] = {
                                    ...updated[modIdx].lessons[lesIdx],
                                    duration: e.target.value,
                                  };
                                  setCourseForm({
                                    ...courseForm,
                                    curriculum: updated,
                                  });
                                }}
                                placeholder="1h 30m"
                                className="w-20 bg-slate-50 border-none rounded-xl p-3 text-sm text-slate-700 outline-none"
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PRICING & DETAILS TAB */}
                  {courseModalTab === "pricing" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Base Price (৳)
                          </label>
                          <input
                            type="number"
                            required
                            value={courseForm.price}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                price: parseInt(e.target.value),
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Discounted Price (৳)
                          </label>
                          <input
                            type="number"
                            value={courseForm.discountedPrice}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                discountedPrice: parseInt(e.target.value),
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Duration
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={courseForm.duration.value}
                              onChange={(e) =>
                                setCourseForm({
                                  ...courseForm,
                                  duration: {
                                    ...courseForm.duration,
                                    value: parseInt(e.target.value),
                                  },
                                })
                              }
                              className="flex-1 bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                            />
                            <select
                              value={courseForm.duration.unit}
                              onChange={(e) =>
                                setCourseForm({
                                  ...courseForm,
                                  duration: {
                                    ...courseForm.duration,
                                    unit: e.target.value,
                                  },
                                })
                              }
                              className="w-32 bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                            >
                              <option value="weeks">Weeks</option>
                              <option value="months">Months</option>
                              <option value="years">Years</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Total Lectures
                          </label>
                          <input
                            type="number"
                            value={courseForm.totalLectures}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                totalLectures: parseInt(e.target.value),
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Projects
                          </label>
                          <input
                            type="number"
                            value={courseForm.projectsCount}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                projectsCount: parseInt(e.target.value),
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Language
                          </label>
                          <select
                            value={courseForm.language}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                language: e.target.value,
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          >
                            <option value="english">English</option>
                            <option value="bengali">Bengali</option>
                            <option value="both">Both</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Mode
                          </label>
                          <select
                            value={courseForm.mode}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                mode: e.target.value,
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ADDITIONAL TAB */}
                  {courseModalTab === "additional" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Instructor Name
                          </label>
                          <input
                            value={courseForm.instructorName}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                instructorName: e.target.value,
                              })
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Certification Details
                          </label>
                          <input
                            value={courseForm.certificationDetails}
                            onChange={(e) =>
                              setCourseForm({
                                ...courseForm,
                                certificationDetails: e.target.value,
                              })
                            }
                            placeholder="Industry-recognized certificate"
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Instructor Bio
                        </label>
                        <textarea
                          value={courseForm.instructorBio}
                          onChange={(e) =>
                            setCourseForm({
                              ...courseForm,
                              instructorBio: e.target.value,
                            })
                          }
                          className="w-full bg-slate-50 border-none rounded-2xl p-4 font-medium text-slate-700 outline-none min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20"
                  >
                    {editingCourse
                      ? "Update Curriculum"
                      : "Create Master Course"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Deployment Modal */}
      <Portal>
        <AnimatePresence>
          {showDeployModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 relative z-[10000]"
              >
                <h2 className="text-2xl font-black text-slate-900 mb-2">
                  Mass Deployment
                </h2>
                <p className="text-slate-400 font-medium mb-8">
                  Select branches to push{" "}
                  <span className="text-indigo-600 font-bold">
                    "{deployingCourse?.title?.en}"
                  </span>
                </p>

                <div className="max-h-[300px] overflow-y-auto space-y-3 mb-8 pr-2 custom-scrollbar">
                  {branches.map((b) => (
                    <button
                      key={b._id}
                      onClick={() => {
                        if (selectedBranches.includes(b._id))
                          setSelectedBranches(
                            selectedBranches.filter((id) => id !== b._id),
                          );
                        else setSelectedBranches([...selectedBranches, b._id]);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        selectedBranches.includes(b._id)
                          ? "border-indigo-600 bg-indigo-50/50"
                          : "border-slate-50 hover:border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black">
                          {b.code}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-800 text-sm">
                            {b.name}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase">
                            {b.type}
                          </p>
                        </div>
                      </div>
                      {selectedBranches.includes(b._id) && (
                        <HiOutlineCheckBadge
                          className="text-indigo-600"
                          size={24}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleDeploy}
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                  >
                    Push to {selectedBranches.length} Nodes
                    <HiOutlineChevronRight />
                  </button>
                  <button
                    onClick={() => setShowDeployModal(false)}
                    className="px-8 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
