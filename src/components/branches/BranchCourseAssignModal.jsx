"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Portal from "@/components/ui/Portal";
import {
  HiOutlineAcademicCap,
  HiOutlineXMark,
  HiOutlineMagnifyingGlass,
  HiOutlineCheck,
  HiOutlineGlobeAlt,
  HiOutlineSparkles,
  HiOutlineArrowPath,
  HiOutlineTag,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function BranchCourseAssignModal({ branch, onClose, onSuccess }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [togglingGlobal, setTogglingGlobal] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterView, setFilterView] = useState("all"); // 'all', 'assigned', 'unassigned', 'global'

  // Set of selected course IDs
  const [assignedIds, setAssignedIds] = useState(new Set());

  // Load course list with branch assignment status
  const fetchAssignmentData = useCallback(async () => {
    if (!branch?._id) return;
    setLoading(true);
    try {
      const res = await api.get(`/super/branches/${branch._id}/courses`);
      if (res.data?.success) {
        const list = res.data.data || [];
        setCourses(list);

        // Pre-populate assigned IDs
        const preAssigned = new Set();
        list.forEach((c) => {
          if (c.isAssigned || c.isAllBranches) {
            preAssigned.add(c._id);
          }
        });
        setAssignedIds(preAssigned);
      }
    } catch (err) {
      console.error("Failed to load course assignments", err);
      toast.error(err.response?.data?.message || "Failed to load branch courses");
    } finally {
      setLoading(false);
    }
  }, [branch?._id]);

  useEffect(() => {
    fetchAssignmentData();
  }, [fetchAssignmentData]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set();
    courses.forEach((c) => {
      if (c.category) cats.add(c.category);
    });
    return ["all", ...Array.from(cats)];
  }, [courses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const titleEn = typeof c.title === "object" ? c.title?.en || "" : c.title || "";
        const titleBn = typeof c.title === "object" ? c.title?.bn || "" : "";
        const slug = c.slug || "";
        const matchTitle =
          titleEn.toLowerCase().includes(q) ||
          titleBn.toLowerCase().includes(q) ||
          slug.toLowerCase().includes(q);
        if (!matchTitle) return false;
      }

      // Category
      if (selectedCategory !== "all" && c.category !== selectedCategory) {
        return false;
      }

      // View Filter
      const isSelected = assignedIds.has(c._id);
      if (filterView === "assigned" && !isSelected) return false;
      if (filterView === "unassigned" && isSelected) return false;
      if (filterView === "global" && !c.isAllBranches) return false;

      return true;
    });
  }, [courses, search, selectedCategory, filterView, assignedIds]);

  // Toggle single course assignment
  const handleToggleCourse = (courseId) => {
    setAssignedIds((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  // Toggle global "All Campuses" status on a course
  const handleToggleGlobal = async (course, e) => {
    e.stopPropagation();
    setTogglingGlobal(course._id);
    try {
      const res = await api.patch(`/super/courses/${course._id}/toggle-all-branches`, {
        isAllBranches: !course.isAllBranches,
      });
      if (res.data?.success) {
        const nextState = res.data.data.isAllBranches;
        toast.success(res.data.message);

        // Update local course state
        setCourses((prev) =>
          prev.map((c) => (c._id === course._id ? { ...c, isAllBranches: nextState } : c))
        );

        // If enabled globally, ensure it's in assignedIds
        if (nextState) {
          setAssignedIds((prev) => new Set([...prev, course._id]));
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update global availability");
    } finally {
      setTogglingGlobal(null);
    }
  };

  // Bulk select / deselect filtered
  const handleSelectAllFiltered = () => {
    setAssignedIds((prev) => {
      const next = new Set(prev);
      filteredCourses.forEach((c) => next.add(c._id));
      return next;
    });
  };

  const handleDeselectAllFiltered = () => {
    setAssignedIds((prev) => {
      const next = new Set(prev);
      filteredCourses.forEach((c) => {
        // Only remove if not global
        if (!c.isAllBranches) {
          next.delete(c._id);
        }
      });
      return next;
    });
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      const courseIds = Array.from(assignedIds);
      const res = await api.put(`/super/branches/${branch._id}/courses`, { courseIds });
      if (res.data?.success) {
        toast.success(res.data.message || "Courses successfully assigned!");
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save course assignments");
    } finally {
      setSaving(false);
    }
  };

  const getCourseTitle = (course) => {
    if (!course?.title) return "Untitled Course";
    if (typeof course.title === "object") {
      return course.title.en || course.title.bn || "Untitled Course";
    }
    return String(course.title);
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-100 dark:border-slate-800"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/70 dark:bg-slate-800/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-black uppercase tracking-wider">
                  {branch.code}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {branch.division || "Dhaka"} Division
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <HiOutlineAcademicCap className="text-violet-600" />
                Assign Courses: {branch.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Choose syllabus modules available for offline or hybrid admission at this campus.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HiOutlineXMark size={20} />
            </button>
          </div>

          {/* Controls Bar: Search, Category & Quick Bulk actions */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <HiOutlineMagnifyingGlass
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search course title or slug..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all dark:text-white"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: "all", label: `All (${courses.length})` },
                  { id: "assigned", label: `Assigned (${assignedIds.size})` },
                  {
                    id: "global",
                    label: `Global (${courses.filter((c) => c.isAllBranches).length})`,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterView(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      filterView === tab.id
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills & Bulk Select buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <HiOutlineTag size={13} />
                  Category:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all active:scale-95 ${
                      selectedCategory === cat
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Bulk Toggle Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllFiltered}
                  className="px-2.5 py-1 text-[11px] font-bold text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
                >
                  Select All Visible
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  onClick={handleDeselectAllFiltered}
                  className="px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Deselect All Visible
                </button>
              </div>
            </div>
          </div>

          {/* Courses List Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 dark:bg-slate-950/40">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Loading courses curriculum...
                </p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <HiOutlineAcademicCap size={36} className="mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  No courses found matching criteria
                </p>
                <p className="text-xs text-slate-400">
                  Try adjusting your search keywords or category filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredCourses.map((course) => {
                  const isAssigned = assignedIds.has(course._id);
                  const isGlobal = Boolean(course.isAllBranches);

                  return (
                    <div
                      key={course._id}
                      onClick={() => handleToggleCourse(course._id)}
                      className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 relative select-none ${
                        isAssigned
                          ? "bg-white dark:bg-slate-900 border-violet-500 dark:border-violet-600 shadow-md ring-1 ring-violet-500/20"
                          : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* Checkbox Icon */}
                      <div className="pt-0.5">
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                            isAssigned
                              ? "bg-violet-600 text-white shadow-sm"
                              : "border-2 border-slate-300 dark:border-slate-600 group-hover:border-violet-400"
                          }`}
                        >
                          {isAssigned && <HiOutlineCheck size={14} className="stroke-[3]" />}
                        </div>
                      </div>

                      {/* Course Thumbnail */}
                      <div className="w-16 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 relative border border-slate-100 dark:border-slate-700">
                        {course.thumbnail ? (
                          <Image
                            src={course.thumbnail}
                            alt={getCourseTitle(course)}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <HiOutlineAcademicCap size={20} />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {course.category || "General"}
                          </span>
                          {course.mode && (
                            <span className="text-[10px] font-bold text-slate-400 capitalize">
                              • {course.mode}
                            </span>
                          )}
                          {course.duration && (
                            <span className="text-[10px] font-bold text-slate-400">
                              • {course.duration}
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-violet-600 transition-colors">
                          {getCourseTitle(course)}
                        </h4>

                        <div className="flex items-center justify-between pt-0.5">
                          <div className="text-xs font-black text-slate-900 dark:text-slate-100">
                            ৳{Number(course.price || 0).toLocaleString()}
                            {course.originalPrice && course.originalPrice > course.price && (
                              <span className="text-[10px] line-through text-slate-400 font-normal ml-1">
                                ৳{Number(course.originalPrice).toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Global All Campuses Toggle Button */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleGlobal(course, e)}
                            disabled={togglingGlobal === course._id}
                            title={
                              isGlobal
                                ? "Click to restrict from all campuses"
                                : "Click to make available at all campuses automatically"
                            }
                            className={`min-h-[32px] px-3 py-1 rounded-lg text-[11px] font-black tracking-wide flex items-center gap-1.5 transition-all active:scale-95 ${
                              isGlobal
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <HiOutlineGlobeAlt size={14} />
                            <span>{isGlobal ? "All Campuses" : "Make Global"}</span>
                            {togglingGlobal === course._id && (
                              <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Sticky Footer with Safe Area */}
          <div className="p-4 sm:p-5 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
              <strong className="text-violet-600 dark:text-violet-400 font-black">
                {assignedIds.size} courses
              </strong>{" "}
              assigned to{" "}
              <strong className="text-slate-900 dark:text-white font-bold">{branch.name}</strong>
              <span className="hidden sm:inline text-slate-400 ml-2">
                (Visible in public branch directory)
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="flex-1 sm:flex-none min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving || loading}
                className="flex-1 sm:flex-none min-h-[44px] px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-violet-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving Allocations...</span>
                  </>
                ) : (
                  <>
                    <HiOutlineCheckCircle size={16} />
                    <span>Save Course Allocations</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}
