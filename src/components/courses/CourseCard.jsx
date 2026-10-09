import React from "react";
import ImageLoader from "@/components/ui/ImageLoader";
import Link from "next/link";
import { motion } from "framer-motion";
import {
 IoTimeOutline,
 IoPeopleOutline,
} from "react-icons/io5";

export default function CourseCard({ course, locale, priority }) {
 const {
 slug,
 title,
 thumbnail,
 price,
 originalPrice,
 duration = "3 Months",
 enrolledCount = 0,
 category,
 isPopular,
 instructor,
 } = course;

 const displayTitle = title?.en || title || "Untitled Course";

 const formatMode = (modeStr) => {
 if (!modeStr) return "Online";
 const lower = modeStr.toLowerCase();
 const hasOnline = lower.includes("online") || lower.includes("live");
 const hasOffline = lower.includes("offline") || lower.includes("physical") || lower.includes("campus");
 
 if (hasOnline && hasOffline) return "Online & Offline";
 if (hasOffline) return "Offline";
 return "Online";
 };

 return (
 <motion.div
 whileHover={{ y: -4 }}
 transition={{ type: "spring", stiffness: 300, damping: 20 }}
 className="group flex h-full flex-col bg-white -[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
 >
 {/* Thumbnail Area - Premium Product Look */}
 <div className="relative w-full aspect-[4/3] sm:aspect-video bg-white overflow-hidden p-2">
 <Link
 href={`/${locale}/courses/${slug}`}
 className="relative block w-full h-full -[1.5rem] overflow-hidden bg-slate-50 border border-slate-100 rounded-md"
 >
 <ImageLoader
 src={thumbnail || "/images/course-placeholder.jpg"}
 alt={displayTitle}
 fill
 sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 25vw"
 priority={priority}
 className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-md"
 />
 
 {/* Top Badges */}
 <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
 {isPopular && (
 <div className="inline-flex items-center bg-brand-pink text-white px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest shadow-md rounded-lg">
 Popular
 </div>
 )}
 {category && (
 <div className="inline-flex items-center bg-white/95 backdrop-blur-sm text-slate-800 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest shadow-md rounded-lg">
 {category}
 </div>
 )}
 </div>
 </Link>
 </div>

 {/* Content Area */}
 <div className="flex flex-col flex-grow p-4 sm:p-5 pt-1.5">
 
 {/* Title */}
 <Link href={`/${locale}/courses/${slug}`} className="mb-3 block flex-grow mt-1.5">
 <h3 className="line-clamp-2 text-lg sm:text-[1.15rem] font-black leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
 {displayTitle}
 </h3>
 </Link>

 {/* Stats Grid */}
 <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-100">
 <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
 <IoTimeOutline size={14} className="text-blue-500 shrink-0" />
 <span className="truncate">{duration}</span>
 </div>
 <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
 <IoPeopleOutline size={14} className="text-blue-500 shrink-0" />
 <span className="truncate">{enrolledCount} Students</span>
 </div>
 </div>

 {/* Commercial Footer: Price + Instructor */}
 <div className="flex flex-row items-end justify-between gap-4 mt-auto">
 
 {/* Pricing (Left Aligned) */}
 <div className="flex flex-col text-left shrink-0">
 {originalPrice && originalPrice > price && (
 <span className="text-[10px] font-bold text-slate-400 line-through decoration-brand-pink/50 tracking-wider mb-[-2px]">
 ৳{originalPrice.toLocaleString()}
 </span>
 )}
 <span className="text-xl font-black text-blue-600 tracking-tight">
 ৳{price?.toLocaleString()}
 </span>
 </div>

 {/* Instructor OR Course Mode Status (Right Aligned) */}
 {instructor ? (
 <div className="flex items-center gap-2 text-right min-w-0 ml-2">
 <div className="flex flex-col min-w-0">
 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">By</span>
 <span className="text-xs font-black text-slate-900 truncate max-w-[80px] sm:max-w-[100px]">
 {instructor.name}
 </span>
 </div>
 <div className="relative w-8 h-8 overflow-hidden border border-slate-200 bg-slate-50 shrink-0 rounded-lg">
 <ImageLoader
 src={instructor.avatar || "/images/avatar-placeholder.png"}
 alt={instructor.name}
 fill
 className="object-cover rounded-md"
 />
 </div>
 </div>
 ) : (
 <div className="flex items-center justify-end min-w-0 ml-2">
 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100/50 min-w-0 rounded-lg">
 <span className="relative flex h-2 w-2 shrink-0">
 <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
 <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
 </span>
 <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 truncate max-w-[100px]">
 {formatMode(course.mode)}
 </span>
 </div>
 </div>
 )}
 </div>
 
 {/* Commercial Full-Width CTA Button */}
 <Link
 href={`/${locale}/courses/${slug}`}
 className="mt-4 w-full flex justify-center items-center gap-2 bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 transition-all duration-300 py-3 -[1rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-xl hover:-translate-y-0.5 rounded-md"
 >
 Enroll Now
 </Link>
 </div>
 </motion.div>
 );
}
