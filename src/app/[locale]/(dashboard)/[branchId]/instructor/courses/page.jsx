"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiChevronRight,
  HiOutlineExternalLink,
} from "react-icons/hi";
import api from "@/lib/api";
import Link from "next/link";

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/instructor/courses");
      if (res.data?.success) setCourses(res.data.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 space-y-8 animate-pulse">
        <div className="h-10 w-1/4 bg-neutral-100 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-neutral-100 rounded-[40px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          My Assigned Courses
        </h1>
        <p className="mt-2 text-neutral-500">
          Manage your course curriculum and monitor student engagement for each
          module.
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[40px] border border-neutral-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-neutral-500/5 transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center overflow-hidden">
                  {course.thumbnail ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={course.thumbnail}
                        alt={
                          course.title?.en || course.title || "Course thumbnail"
                        }
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <HiOutlineAcademicCap size={32} />
                  )}
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    course.isPublished
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-black text-neutral-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                  {course.title?.en || course.title}
                </h3>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-neutral-400">
                    <HiOutlineUserGroup size={18} />
                    <span className="text-xs font-bold">
                      {course.totalStudents || 0} Registered Students
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <HiOutlineCalendar size={18} />
                    <span className="text-xs font-bold">
                      Created: {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-50">
                <Link
                  href={`/instructor/lessons?courseId=${course._id}`}
                  className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
                >
                  Manage Lessons <HiChevronRight size={18} />
                </Link>
                <a
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  className="w-full mt-3 py-4 bg-neutral-50 text-neutral-500 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-100 transition-all"
                >
                  Preview Course <HiOutlineExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[40px] border-2 border-dashed border-neutral-100 p-20 text-center">
          <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-200 mx-auto mb-6">
            <HiOutlineAcademicCap size={40} />
          </div>
          <p className="text-neutral-400 font-medium font-italic">
            No courses have been assigned to you yet.
          </p>
        </div>
      )}
    </div>
  );
}
