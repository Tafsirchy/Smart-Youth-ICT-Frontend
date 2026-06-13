import React from "react";
import ImageLoader from "@/components/ui/ImageLoader";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoTimeOutline,
  IoPeopleOutline,
  IoLanguageOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";

export default function CourseCard({ course, locale, priority }) {
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
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Floating Badges */}
        <div className="absolute inset-x-2.5 top-2.5 flex justify-between items-start pointer-events-none">
          {category && (
            <div className="rounded-lg bg-blue-600/90 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white backdrop-blur-md shadow-md pointer-events-auto">
              {category}
            </div>
          )}
          {isPopular && (
            <div className="rounded-lg bg-pink-600/90 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white backdrop-blur-md shadow-md pointer-events-auto">
              Popular
            </div>
          )}
        </div>

        {/* Bottom Overlays (Glassmorphic) */}
        {/* On Mobile: smaller icons and text labels */}
        <div className="absolute inset-x-0 bottom-0 p-2 flex gap-1 justify-end bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <span className="flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-white backdrop-blur-md">
            <IoVideocamOutline size={10} className="opacity-70" />
            {mode}
          </span>
          <span className="flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-white backdrop-blur-md">
            <IoLanguageOutline size={10} className="opacity-70" />
            {language}
          </span>
        </div>
      </Link>

      {/* Content wrapper with responsive padding (p-3.5 sm:p-6) */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6">
        
        {/* Title */}
        <Link href={`/${locale}/courses/${slug}`} className="mb-2 sm:mb-3 block flex-1">
          <h3 className="line-clamp-2 text-sm sm:text-base lg:text-[1.15rem] font-black leading-snug text-neutral-900 group-hover:text-blue-600 transition-colors dark:text-white">
            {displayTitle}
          </h3>
        </Link>

        {/* Course stats Row (Compact on mobile, wider on desktop) */}
        <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-black text-neutral-400 uppercase tracking-wider sm:tracking-widest border-b border-neutral-100 pb-3 sm:pb-4 dark:border-neutral-800">
          <div className="flex items-center gap-1">
            <IoTimeOutline size={12} className="text-blue-600 shrink-0" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <IoPeopleOutline size={12} className="text-blue-600 shrink-0" />
            <span>{enrolledCount} Studs</span>
          </div>
        </div>

        {/* Action Bar (Footer) */}
        {/* Flex wrap to support small screens, price is set responsively */}
        <div className="mt-auto flex items-center justify-between gap-1.5">
          <div className="flex flex-col min-w-0">
            {originalPrice && originalPrice > price && (
              <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 line-through decoration-pink-500/50 tracking-tighter mb-[-3px] truncate">
                ৳{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-base sm:text-lg lg:text-xl font-black text-blue-600 tracking-tighter truncate">
              ৳{price?.toLocaleString()}
            </span>
          </div>

          <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }} className="shrink-0">
            <Link
              href={`/${locale}/courses/${slug}`}
              className="inline-flex items-center gap-1 sm:gap-2 rounded-xl bg-neutral-900 px-3 py-2.5 sm:px-4 sm:py-2.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider sm:tracking-widest text-white transition-all hover:bg-blue-600 shadow-md hover:shadow-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 min-h-[38px] sm:min-h-[44px]"
            >
              Details
              <HiArrowLongRight size={12} className="hidden sm:inline" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
