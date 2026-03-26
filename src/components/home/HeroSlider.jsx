"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageLoader from "@/components/ui/ImageLoader";
import Link from "next/link";
import { HiArrowRight, HiArrowLeft, HiPlay } from "react-icons/hi";

// ─── Decorative SVGs ───────────────────────────────────────────────

const LoopScribble = ({ className }) => (
  <svg
    className={className}
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 40C20 10 50 10 60 40C70 70 100 70 110 40"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      opacity="0.3"
    />
    <path
      d="M110 40L100 45M110 40L100 35"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.3"
    />
  </svg>
);

const ArrowScribbleLong = ({ className }) => (
  <svg
    className={className}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M70 10C75 40 60 80 10 90"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.2"
    />
    <path
      d="M10 90L20 85M10 90L15 95"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.2"
    />
  </svg>
);
const LightbulbIcon = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 1 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2v2" />
    <path d="M5 8h2" />
    <path d="M17 8h2" />
    <path d="M7 3l1.5 1.5" />
    <path d="M15.5 4.5L17 3" />
  </svg>
);

const PieChartIcon = ({ className }) => (
  <svg
    className={className}
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const DotGrid = ({ className }) => (
  <div className={`grid grid-cols-4 gap-3 ${className}`}>
    {[...Array(16)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#204E47] opacity-20"
      />
    ))}
  </div>
);

// ─── Slide Data ─────────────────────────────────────────────────────

const slides = [
  {
    id: 1,
    bgColor: "#EFF6F3",
    label: "Welcome Back",
    heading: (
      <>
        <span className="text-[#FF9D2E]">Education</span> Is the Fruit <br /> of
        All Knowledge
      </>
    ),
    description:
      "We bring students and teachers together to create a more personalized learning experience and foster growth.",
    primaryBtn: { text: "Get started", href: "/courses" },
    secondaryBtn: { text: "Now it's free", href: "/courses" },
    image: "/images/hero-slide-1.png",
    type: "collage",
  },
  {
    id: 2,
    bgColor: "#FFFFFF",
    bgBanner: "linear-gradient(135deg, #0F7C5A 0%, #178964 100%)",
    badge: "ENHANCE YOUR LIFE",
    heading: (
      <>
        Transform <br /> <span className="text-[#13DC9D]">Your Skills and</span>{" "}
        <br /> Career!
      </>
    ),
    description:
      "Meet the platform for modern design education. Master soft technical skills taught by industry experts.",
    primaryBtn: {
      text: "Browse Courses",
      href: "/courses",
      color: "#13DC9D",
      textColor: "#0F7C5A",
    },
    image: "/images/hero-slide-2-curly.png",
    type: "geometric",
    stats: [
      { value: "769+", label: "Recorded videos" },
      { value: "1200+", label: "Happy students" },
      { value: "10+", label: "Course topics" },
    ],
    testimonial: {
      name: "Abdul Aziz",
      role: "Student | Batch- 01",
      text: "An amazing platform for skill seekers that helps you find a better job easily.",
      avatar: "A",
    },
  },
  {
    id: 3,
    bgColor: "#FDF8F7",
    label: "Loved by 6K+ happy learners",
    heading: (
      <>
        Find Your<span className="text-[#A85161]"> Next Level</span> Online
        course
      </>
    ),
    description:
      "Meet the platform for modern design education. master soft and technical skills taught by industry experts.",
    primaryBtn: {
      text: "Browse courses",
      href: "/courses",
      color: "#4A2C2E",
      textColor: "#FFFFFF",
    },
    image: "/images/hero-slide-3.png",
    archImage: "/images/hero-slide-4.png",
    type: "dual-portrait",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); // 8 seconds for slower read
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? "50%" : "-50%", opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "50%" : "-50%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-[530px] md:h-[600px] w-full overflow-hidden font-sans bg-white">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0"
          style={{
            background: slides[current].hasStripes
              ? "none"
              : slides[current].bgGradient || slides[current].bgColor,
          }}
        >
          {/* Decorative Elements for Slide 1 */}
          {slides[current].id === 1 && (
            <>
              <LoopScribble className="absolute top-10 left-10" />
              <ArrowScribbleLong className="absolute top-20 right-40" />
              <DotGrid className="absolute bottom-10 left-10" />
            </>
          )}

          {/* Slide 2 Layout */}
          {slides[current].bgBanner && (
            <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
              <div
                className="w-[96%] max-w-[1500px] h-[90%] rounded-[32px] md:rounded-[84px] overflow-hidden relative"
                style={{ background: slides[current].bgBanner }}
              >
                <div className="absolute bottom-0 right-0 w-[40%] max-w-[500px] h-[35%] bg-white rounded-tl-[100px]" />
              </div>
            </div>
          )}

          <div className="container-custom grid lg:grid-cols-2 gap-6 lg:gap-8 items-center relative z-20 py-10 lg:py-12">
            {/* Left Texts */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slides[current].badge ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[11px] font-bold tracking-widest mb-5">
                    🚀 {slides[current].badge}
                  </div>
                ) : slides[current].type === "dual-portrait" ? (
                  <div className="flex flex-col gap-3 mb-5">
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                          >
                            <ImageLoader
                              src={`https://i.pravatar.cc/100?u=user${i + 5}`}
                              alt="User"
                              width={40}
                              height={40}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <StarIcon key={i} />
                          ))}
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {slides[current].label}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[13px] font-medium tracking-tight mb-4 text-slate-500">
                    {slides[current].label}
                  </p>
                )}

                <h1
                  className={`text-4xl md:text-[52px] font-[900] leading-[1.05] mb-5 ${slides[current].id === 1 ? "text-[#232F3E]" : slides[current].id === 3 ? "text-[#232F3E]" : "text-white"}`}
                >
                  {slides[current].heading}
                </h1>

                <p
                  className={`text-base md:text-lg mb-6 leading-relaxed max-w-lg font-medium opacity-90 ${slides[current].id === 1 ? "text-[#5E6D77]" : slides[current].id === 3 ? "text-[#5E6D77]" : "text-white/80"}`}
                >
                  {slides[current].description}
                </p>

                {/* Buttons Container for Slide 1 */}
                {slides[current].id === 1 ? (
                  <div className="inline-flex items-center bg-white p-2 rounded-[24px] shadow-2xl border border-slate-50 overflow-hidden">
                    <Link
                      href="/courses"
                      className="px-10 py-5 text-[#232F3E] font-black text-sm hover:translate-y-[-1px] transition-transform"
                    >
                      {slides[current].primaryBtn.text}
                    </Link>
                    <Link
                      href="/courses"
                      className="px-10 py-5 bg-[#2D5A54] text-white rounded-[20px] font-black text-sm shadow-xl hover:translate-y-[-1px] transition-transform"
                    >
                      {slides[current].secondaryBtn.text}
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 items-center">
                    <Link
                      href={slides[current].primaryBtn.href}
                      className="px-12 py-5 rounded-full font-black text-sm transition-all transform hover:scale-105 shadow-2xl"
                      style={{
                        background:
                          slides[current].primaryBtn.color || "#FFFFFF",
                        color:
                          slides[current].primaryBtn.textColor || "#0F7C5A",
                      }}
                    >
                      {slides[current].primaryBtn.text}
                    </Link>
                    {slides[current].secondaryBtn && (
                      <Link
                        href="#"
                        className="px-12 py-5 rounded-full font-black text-sm border-2 border-white/20 text-white flex items-center gap-3 hover:bg-white/10 transition-colors"
                      >
                        <HiPlay size={24} />
                        {slides[current].secondaryBtn.text}
                      </Link>
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Visuals */}
            <div className="relative flex items-center justify-center lg:justify-end h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Puzzle Grid - Slide 1 */}
                {slides[current].type === "collage" && (
                  <div className="relative w-[520px] h-[520px] scale-[0.74] md:scale-[0.84] lg:scale-[0.9] origin-center lg:origin-right">
                    {/* Background Rectangles split using background-position */}
                    {[
                      { w: 100, h: 100, x: 20, y: 180, bgX: -20, bgY: -180 },
                      { w: 100, h: 100, x: 130, y: 10, bgX: -130, bgY: -10 },
                      { w: 100, h: 100, x: 240, y: 50, bgX: -240, bgY: -50 },
                      { w: 220, h: 120, x: 130, y: 390, bgX: -130, bgY: -390 },
                      { w: 120, h: 260, x: 130, y: 120, bgX: -130, bgY: -120 },
                      { w: 150, h: 220, x: 260, y: 160, bgX: -260, bgY: -160 },
                      { w: 100, h: 140, x: 420, y: 190, bgX: -420, bgY: -190 },
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.05 }}
                        className="absolute rounded-[24px] overflow-hidden shadow-2xl border border-white/40"
                        style={{
                          width: card.w,
                          height: card.h,
                          left: card.x,
                          top: card.y,
                        }}
                      >
                        <div
                          className="w-[600px] h-[600px]"
                          style={{
                            backgroundImage: `url(${slides[current].image})`,
                            backgroundSize: "800px auto",
                            backgroundPosition: `${card.bgX - 100}px ${card.bgY}px`,
                          }}
                        />
                      </motion.div>
                    ))}

                    {/* Floating Audio Card for Slide 1 */}
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-[230px] left-[-16px] md:left-[-44px] bg-white px-5 md:px-7 py-4 md:py-5 rounded-[24px] md:rounded-[30px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] flex items-center gap-4 md:gap-5 border border-slate-50 z-30 min-w-[230px] md:min-w-[280px]"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#FF9D2E] flex items-center justify-center text-white shadow-xl shadow-orange-200">
                        <HiPlay size={28} className="translate-x-0.5" />
                      </div>
                      <div className="flex gap-2 items-center flex-1">
                        {[15, 30, 45, 30, 15, 35, 50, 35, 20, 40, 25, 10].map(
                          (h, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                height: [`${h}px`, `${h * 0.5}px`, `${h}px`],
                              }}
                              transition={{
                                duration: 1 + i * 0.1,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="w-[3px] bg-slate-900 rounded-full"
                            />
                          ),
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Geometric Layout - Slide 2 */}
                {slides[current].id === 2 && (
                  <div className="relative w-full h-[350px] md:h-[460px] flex items-center justify-center">
                    <div className="relative w-[240px] h-[240px] md:w-[390px] md:h-[390px]">
                      {/* Decorative Triangles */}
                      {/* Top Left - Lime */}
                      <motion.div
                        animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-14 -left-14 md:-top-20 md:-left-20 w-32 h-32 md:w-60 md:h-60 bg-[#D9F99D] z-0"
                        style={{
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transform: "rotate(-15deg)",
                        }}
                      />
                      {/* Top Right - Yellow-Green */}
                      <motion.div
                        animate={{ rotate: [0, -5, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-8 right-0 w-28 h-28 md:w-48 md:h-48 bg-[#BEF264] z-0 opacity-80"
                        style={{
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transform: "rotate(45deg)",
                        }}
                      />
                      {/* Bottom Right - Teal */}
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute bottom-0 -right-14 md:-right-20 w-[120px] h-[120px] md:w-56 md:h-56 bg-[#0D9488] z-0"
                        style={{
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transform: "rotate(160deg)",
                        }}
                      />
                      {/* Bottom Right Small - Lime */}
                      <div
                        className="absolute bottom-10 right-10 w-24 h-24 bg-[#D9F99D] z-0 opacity-60"
                        style={{
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transform: "rotate(30deg)",
                        }}
                      />

                      {/* Center Portrait Square */}
                      <div className="absolute inset-0 bg-[#D1FAE5] shadow-inner z-10 overflow-hidden">
                        <ImageLoader
                          src={slides[current].image}
                          alt="Student"
                          fill
                          className="w-full h-full object-cover object-center"
                          wrapperClassName="w-full h-full"
                        />
                      </div>

                      {/* Rotated Black Frame */}
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 8 }}
                        className="absolute inset-0 border-[3px] border-slate-900 rounded-[40px] z-20 pointer-events-none"
                      />

                      {/* Testimonial Floating Card - Repositioned for this layout */}
                      <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -bottom-6 -left-8 md:-left-16 z-30 bg-white p-4 md:p-5 rounded-[22px] md:rounded-[26px] shadow-2xl border border-slate-100 max-w-[230px] md:max-w-[260px]"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg overflow-hidden shrink-0">
                            <ImageLoader
                              src="https://i.pravatar.cc/150?u=abdul"
                              alt="Avatar"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-900 text-sm font-black leading-tight">
                              {slides[current].testimonial.name}
                            </p>
                            <p className="text-slate-400 text-[10px] font-bold leading-tight uppercase tracking-wider">
                              {slides[current].testimonial.role}
                            </p>
                          </div>
                        </div>
                        <p className="text-slate-600 text-[12px] leading-relaxed font-semibold italic line-clamp-2">
                          "{slides[current].testimonial.text}"
                        </p>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Dual Portrait - Slide 3 */}
                {slides[current].type === "dual-portrait" && (
                  <div className="relative w-full h-[380px] md:h-[470px] flex items-center justify-center lg:justify-end lg:pr-12">
                    <div className="relative">
                      {/* Background Frames from Schematic */}
                      {/* Top-Left Frame */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute -top-8 -left-8 md:-top-10 md:-left-10 w-[85%] h-[85%] border-2 border-[#A85161]/20 rounded-[20px] pointer-events-none"
                      />
                      {/* Bottom-Right Frame */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 w-[85%] h-[85%] border-2 border-[#A85161]/20 rounded-[20px] pointer-events-none ml-auto"
                        style={{ left: "auto" }}
                      />

                      <div className="relative flex items-center gap-3 z-10">
                        {/* Left Pillar */}
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                          className="relative w-[120px] h-[260px] md:w-[170px] md:h-[390px] rounded-[24px] overflow-hidden border border-rose-100 bg-[#FAF1F2] shadow-xl"
                        >
                          <div
                            className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none select-none"
                            style={{
                              backgroundImage:
                                "radial-gradient(#A85161 0.5px, transparent 0.5px)",
                              backgroundSize: "12px 12px",
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageLoader
                              src={slides[current].archImage}
                              alt="Student Left"
                              fill
                              className="w-full h-full object-cover"
                              wrapperClassName="w-full h-full"
                            />
                          </div>
                        </motion.div>

                        {/* Right Pillar */}
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                          className="relative w-[120px] h-[260px] md:w-[170px] md:h-[390px] rounded-[24px] overflow-hidden border border-rose-100 bg-[#FAF1F2] shadow-xl"
                        >
                          <div
                            className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none select-none"
                            style={{
                              backgroundImage:
                                "radial-gradient(#A85161 0.5px, transparent 0.5px)",
                              backgroundSize: "12px 12px",
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageLoader
                              src={slides[current].image}
                              alt="Student Right"
                              fill
                              className="w-full h-full object-cover"
                              wrapperClassName="w-full h-full"
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Floating Decorative Icons */}
                      <motion.div
                        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-16 -right-8 z-30 text-[#A85161] opacity-60"
                      >
                        <LightbulbIcon className="w-12 h-12" />
                      </motion.div>

                      <motion.div
                        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -bottom-16 -left-16 z-30 text-[#A85161] opacity-60"
                      >
                        <PieChartIcon className="w-10 h-10" />
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
        <button
          onClick={prevSlide}
          className="p-3 text-slate-800/40 cursor-pointer pointer-events-auto hover:text-[#10B981] transition-all group scale-125 md:scale-150"
        >
          <motion.div
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiArrowLeft
              size={28}
              className="group-hover:scale-110 transition-transform"
            />
          </motion.div>
        </button>
        <button
          onClick={nextSlide}
          className="p-3 text-slate-800/40 cursor-pointer pointer-events-auto hover:text-[#10B981] transition-all group scale-125 md:scale-150"
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiArrowRight
              size={28}
              className="group-hover:scale-110 transition-transform"
            />
          </motion.div>
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 flex justify-center gap-3 md:gap-4 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-2.5 rounded-full transition-all duration-1000 ${current === i ? "w-12 bg-[#10B981] shadow-xl" : "w-2.5 bg-slate-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
