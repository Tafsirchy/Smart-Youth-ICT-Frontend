"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getApiBaseUrl } from "@/lib/api-base";
import CourseCard from "@/components/courses/CourseCard";
import { IoLocationOutline, IoCallOutline, IoTimeOutline, IoChevronDown, IoChevronUp, IoMapOutline } from "react-icons/io5";

export default function BranchDirectory({ locale }) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track which branch has its courses expanded
  const [expandedBranchId, setExpandedBranchId] = useState(null);
  const [branchCourses, setBranchCourses] = useState({});
  const [coursesLoading, setCoursesLoading] = useState({});

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get(`${getApiBaseUrl()}/branches/public/all`);
        setBranches(res.data.data || []);
      } catch (err) {
        setError("Failed to load branches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const toggleBranchCourses = async (branchId) => {
    if (expandedBranchId === branchId) {
      setExpandedBranchId(null);
      return;
    }

    setExpandedBranchId(branchId);

    // Fetch if we haven't already
    if (!branchCourses[branchId]) {
      setCoursesLoading(prev => ({ ...prev, [branchId]: true }));
      try {
        const res = await axios.get(`${getApiBaseUrl()}/courses?branchId=${branchId}&limit=50`);
        setBranchCourses(prev => ({ ...prev, [branchId]: res.data.data || [] }));
      } catch (err) {
        console.error("Failed to load courses for branch", err);
      } finally {
        setCoursesLoading(prev => ({ ...prev, [branchId]: false }));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-4">
          Our Campuses
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Find a branch near you and explore the courses and expert instructors available at each location.
        </p>
      </div>

      <div className="space-y-6">
        {branches.map(branch => {
          const isExpanded = expandedBranchId === branch._id;
          const courses = branchCourses[branch._id];
          const isLoadingCourses = coursesLoading[branch._id];

          return (
            <div key={branch._id} className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800 overflow-hidden transition-all hover:shadow-md">
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-start md:items-center">

                {/* Branch Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
                      {branch.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                      {branch.code}
                    </span>
                  </div>

                  <div className="space-y-2 mt-4">
                    {branch.address && (
                      <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <IoLocationOutline className="shrink-0 mt-0.5 text-blue-600" size={16} />
                        <span>
                          {branch.address.street && `${branch.address.street}, `}
                          {branch.address.area && `${branch.address.area}, `}
                          {branch.address.city && `${branch.address.city}, `}
                          {branch.address.country}
                        </span>
                      </div>
                    )}
                    {branch.contact?.phones && branch.contact.phones.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <IoCallOutline className="shrink-0 text-blue-600" size={16} />
                        <span>{branch.contact.phones.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                  {branch.location?.googleMapsUrl && (
                    <a
                      href={branch.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <IoMapOutline size={16} />
                      View on Map
                    </a>
                  )}
                  <button
                    onClick={() => toggleBranchCourses(branch._id)}
                    className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-md hover:shadow-blue-200 dark:hover:shadow-none"
                  >
                    Available Courses
                    {isExpanded ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expandable Courses Section */}
              {isExpanded && (
                <div className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-6 md:p-8 animate-in slide-in-from-top-4 fade-in duration-300">
                  {isLoadingCourses ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : courses && courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map(course => (
                        <CourseCard key={course._id} course={course} locale={locale} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                      No courses currently available at this branch.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
