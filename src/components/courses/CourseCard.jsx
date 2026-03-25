import React from 'react';
import ImageLoader from '@/components/ui/ImageLoader';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoTimeOutline, IoPeopleOutline, IoStar } from 'react-icons/io5';

export default function CourseCard({ course }) {
  const { slug, title, thumbnail, price, instructor, duration = '3 Months', enrolledCount = 0, rating = 4.8 } = course;
  
  // Use English title by default
  const displayTitle = title?.en || title || 'Untitled Course';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-xl"
    >
      {/* Thumbnail */}
      <Link href={`/courses/${slug}`} className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        <ImageLoader
          src={thumbnail || '/images/course-placeholder.jpg'}
          alt={displayTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge overlay */}
        {course.category && (
          <div className="absolute left-3 top-3 rounded-md bg-blue-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {course.category}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta info */}
        <div className="mb-3 flex items-center gap-4 text-xs font-medium text-neutral-500">
          <span className="flex items-center gap-1.5">
            <IoTimeOutline size={16} className="text-blue-600" />
            {duration}
          </span>
          <span className="flex items-center gap-1.5">
            <IoPeopleOutline size={16} className="text-emerald-600" />
            {enrolledCount} Students
          </span>
        </div>

        {/* Title */}
        <Link href={`/courses/${slug}`} className="mb-4 flex-1">
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
            {displayTitle}
          </h3>
        </Link>

        {/* Footer (Instructor & Price) */}
        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-neutral-200">
              {instructor?.avatar ? (
                <ImageLoader src={instructor.avatar} alt={instructor.name || 'Instructor'} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-xs font-bold text-blue-700">
                  {instructor?.name?.charAt(0) || 'I'}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-neutral-700 truncate w-24">
              {instructor?.name || 'Expert Instructor'}
            </span>
          </div>
          
          <div className="text-right">
            <span className="text-lg font-bold text-blue-600">৳ {price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
