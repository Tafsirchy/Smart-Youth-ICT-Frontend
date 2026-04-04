import React from "react";
import ImageLoader from "@/components/ui/ImageLoader";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoTimeOutline,
  IoPeopleOutline,
  IoLanguageOutline,
  IoVideocamOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";

export default function CourseCard({ course, locale }) {
  const {
    slug,
    title,
    thumbnail,
    price,
    originalPrice,
    duration = "3 Months",
    enrolledCount = 0,
    mode = "Online",
    language = "Bengali",
    category,
    isPopular,
  } = course;

  // Use English title by default
  const displayTitle = title?.en || title || "Untitled Course";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-2xl dark:bg-neutral-900 dark:ring-neutral-800"
    >
      {/* Thumbnail + Overlays */}
      <Link
        href={`/${locale}/courses/${slug}`}
        className="relative aspect-video w-full overflow-hidden bg-neutral-100"
      >
        <ImageLoader
          src={thumbnail || "/images/course-placeholder.jpg"}
          alt={displayTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Floating Badges */}
        <div className="absolute inset-x-3 top-3 flex justify-between items-start pointer-events-none">
          {category && (
            <div className="rounded-xl bg-blue-600/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-lg pointer-events-auto">
              {category}
            </div>
          )}
          {isPopular && (
            <div className="rounded-xl bg-pink-600/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-lg pointer-events-auto">
              Popular
            </div>
          )}
        </div>

        {/* Bottom Overlays (Glassmorphic) */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex gap-1.5 justify-end bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <span className="flex items-center gap-1 rounded-lg bg-black/40 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-white backdrop-blur-md">
            <IoVideocamOutline size={12} className="opacity-70" />
            {mode}
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-black/40 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-white backdrop-blur-md">
            <IoLanguageOutline size={12} className="opacity-70" />
            {language}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <Link href={`/${locale}/courses/${slug}`} className="mb-3 block flex-1">
          <h3 className="line-clamp-2 text-[1.15rem] font-black leading-tight text-neutral-900 group-hover:text-blue-600 transition-colors dark:text-white">
            {displayTitle}
          </h3>
        </Link>

        {/* Course stats Row (Compact) */}
        <div className="mb-5 flex items-center gap-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-4 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            <IoTimeOutline size={14} className="text-blue-600" />
            {duration}
          </div>
          <div className="flex items-center gap-1.5">
            <IoPeopleOutline size={14} className="text-blue-600" />
            {enrolledCount} Students
          </div>
        </div>

        {/* Action Bar (Footer) */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && originalPrice > price && (
              <span className="text-[0.7rem] font-bold text-neutral-400 line-through decoration-pink-500/50 tracking-tighter mb-[-4px]">
                ৳{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-black text-blue-600 tracking-tighter">
              ৳{price?.toLocaleString()}
            </span>
          </div>

          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/${locale}/courses/${slug}`}
              className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-white transition-all hover:bg-blue-600 shadow-xl shadow-transparent hover:shadow-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Details
              <HiArrowLongRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
