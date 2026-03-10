'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '@/components/courses/CourseCard';
import api from '@/lib/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Digital Marketing', 'Graphic Design', 'AI'];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const query = category === 'All' ? '' : `?category=${category}`;
        const res = await api.get(`/courses${query}`);
        if (res.data?.success) {
          setCourses(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch courses', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category]);

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-blue-600 py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Explore Our Courses</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
          Learn demand-driven skills from industry experts and start earning via our real client projects.
        </p>
      </div>

      <div className="container-lg mx-auto px-4 mt-8">
        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                category === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-neutral-200"></div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-blue-100 p-6 text-blue-600 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900">No courses found</h3>
            <p className="mt-2 text-neutral-500">Check back later or try a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
