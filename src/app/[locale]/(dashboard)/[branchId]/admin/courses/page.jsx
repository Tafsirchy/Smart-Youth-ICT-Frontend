"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  IoBookOutline,
  IoSearch,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoTimeOutline,
  IoAddOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

export default function AdminCoursesPage() {
  const params = useParams();
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/courses", {
        params: {
          page,
          limit: 100,
          includeUnpublished: "true",
          branchId: params.branchId,
        },
      });
      setCourses(res.data.data || []);
      setTotal(res.data.count || 0);
    } catch {
      toast.error("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  }, [page, params.branchId]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this course? This will hide it from users.",
      )
    )
      return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted successfully");
      setCourses(courses.filter((c) => c._id !== id));
      setTotal((t) => t - 1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete course");
    }
  };

  const filtered = search
    ? courses.filter((c) =>
        (c.title?.en || c.title || "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
    : courses;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">All Courses</h1>
          <p className="text-textSecondary text-sm mt-1">
            {total} total courses on platform
          </p>
        </div>
        <Link
          href={`/${params.locale}/${params.branchId}/admin/courses/create`}
          className="flex items-center gap-2 btn-primary px-5 py-2.5 text-sm rounded-xl"
        >
          <IoAddOutline size={18} /> New Course
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <IoSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search courses…"
          className="input pl-10 max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white border border-neutral-100 rounded-2xl h-[280px]"
            ></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-neutral-100 shadow-sm mt-8">
          <IoBookOutline size={48} className="mx-auto mb-4 text-neutral-300" />
          <h3 className="text-xl font-bold text-neutral-700">
            No courses found
          </h3>
          <p className="text-neutral-500 mt-2 max-w-md mx-auto">
            Click "New Course" above to create your first comprehensive landing
            page course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              {course.thumbnail ? (
                <div className="relative w-full h-40 border-b">
                  <Image
                    src={course.thumbnail}
                    alt={course.title?.en || course.title || "Course thumbnail"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-neutral-100 flex items-center justify-center border-b">
                  <IoBookOutline size={32} className="text-neutral-300" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-neutral-900 text-[15px] leading-snug line-clamp-2">
                    {course.title?.en || course.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`shrink-0 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                      course.isPublished
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {course.isPublished ? "Live" : "Draft"}
                  </span>
                  {course.isPopular && (
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-pink-100 text-pink-700">
                      Popular
                    </span>
                  )}
                  <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider px-2 py-0.5 bg-neutral-100 rounded-md">
                    {course.category}
                  </span>
                </div>

                <div className="mt-auto flex justify-between items-center pt-2 border-t border-neutral-100">
                  <div className="flex flex-col">
                    {course.originalPrice &&
                      course.originalPrice > course.price && (
                        <span className="text-[11px] text-neutral-400 line-through">
                          ৳{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                    <span className="font-extrabold text-blue-600 text-sm">
                      ৳{course.price?.toLocaleString() || "—"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-neutral-400 hover:text-red-500 p-1.5 rounded bg-neutral-50 hover:bg-red-50 transition-colors"
                    >
                      <IoTrashOutline size={16} />
                    </button>
                    <Link
                      href={`/${params.locale}/${params.branchId}/admin/courses/${course._id}/edit`}
                      className="text-blue-600 hover:text-blue-800 p-1.5 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <IoPencilOutline size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
