"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageLoader from "@/components/ui/ImageLoader";
import { useLocale } from "next-intl";
import api from "@/lib/api";
import {
  IoTimeOutline,
  IoPeopleOutline,
  IoStar,
  IoArrowForwardOutline,
  IoBookOutline,
  IoFlashOutline,
} from "react-icons/io5";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardAnim = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const FALLBACK = [
  {
    _id: "1",
    slug: "web-development",
    title: { en: "Web Development Mastery" },
    category: "Development",
    price: 6000,
    originalPrice: 8000,
    duration: "6 Months",
    enrolledCount: 340,
    rating: 4.9,
    badge: "🔥 Hero Course",
    thumbnail: "/images/web.png",
  },
  {
    _id: "2",
    slug: "social-media-marketing",
    title: { en: "Digital Marketing Growth" },
    category: "Marketing",
    price: 3500,
    originalPrice: 5000,
    duration: "6 Months",
    enrolledCount: 210,
    rating: 4.8,
    badge: "📈 Trending",
    thumbnail: "/images/marketing.png",
  },
  {
    _id: "3",
    slug: "graphic-design",
    title: { en: "Visual Design & UI" },
    category: "Creative",
    price: 4000,
    originalPrice: 5500,
    duration: "6 Months",
    enrolledCount: 180,
    rating: 4.8,
    badge: "🎨 Artistic",
    thumbnail: "/images/graphic.png",
  },
  {
    _id: "4",
    slug: "ai-prompt-engineering",
    title: { en: "AI & Future Automation" },
    category: "Advanced AI",
    price: 2800,
    originalPrice: 4000,
    duration: "6 Months",
    enrolledCount: 120,
    rating: 4.9,
    badge: "🤖 Smart Choice",
    thumbnail: "/images/ai.png",
  },
];

export default function PopularCourses() {
  const locale = useLocale();
  const [courses, setCourses] = useState(FALLBACK);

  useEffect(() => {
    api
      .get("/courses", { params: { limit: 4 } })
      .then((res) => {
        if (res.data?.success && res.data.data.length) {
          const enriched = res.data.data.map((c) => ({
            ...c,
            originalPrice:
              c.originalPrice ?? Math.round(c.price * 1.3), // fallback: show 23% discount
          }));
          setCourses(enriched);
        }

      })
      .catch(() => {});
  }, []);

  return (
    <section className="section py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-pink-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Skill Up Daily
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              Most Popular <span className="text-pink-600">Career Paths</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">
              Join 5,000+ students already mastering the most in-demand digital
              skills in today's competitive job market.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {courses.map((course, index) => {
            const title =
              course.title?.en ||
              (typeof course.title === "string"
                ? course.title
                : "Premium Course");
            return (
              <motion.div
                key={course._id}
                variants={cardAnim}
                className="group relative"
              >
                <div className="h-full bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {course.thumbnail ? (
                      <ImageLoader
                        src={course.thumbnail}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <IoBookOutline size={48} className="text-slate-300" />
                      </div>
                    )}

                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-900 shadow-sm flex items-center gap-1">
                        <IoFlashOutline className="text-amber-500" />
                        {course.badge || "New"}
                      </span>
                    </div>

                    {/* Overlay reveal on hover */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <Link
                        href={`/${locale}/courses/${course.slug}`}
                        className="px-6 py-2.5 bg-green-200 text-green-900 text-xs font-black rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 uppercase tracking-widest"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest bg-pink-50 px-2 py-0.5 rounded-md">
                        {course.category || "General"}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                        <IoStar size={12} />
                        {course.rating || 4.9}
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
                      {title}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <div className="flex flex-col gap-0.5">
                        {course.originalPrice && course.originalPrice > course.price && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400 line-through">
                              ৳{course.originalPrice?.toLocaleString()}
                            </span>
                            <span className="text-[9px] font-black text-white bg-pink-500 px-1.5 py-0.5 rounded-md uppercase tracking-wide">
                              {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                            </span>
                          </div>
                        )}
                        <span className="text-xl font-black text-green-600">
                          ৳{course.price?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          Duration
                        </span>
                        <div className="flex items-center gap-1 text-slate-600 text-xs font-bold">
                          <IoTimeOutline size={14} className="text-slate-400" />
                          {course.duration || "3m"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Decorative Line */}
                <div className="absolute -bottom-1 left-8 right-8 h-1 bg-pink-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Link */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 text-slate-900 font-black uppercase tracking-[0.2em] text-xs group"
          >
            Explore All Courses
            <IoArrowForwardOutline
              className="group-hover:translate-x-2 transition-transform duration-300 text-pink-600"
              size={18}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
