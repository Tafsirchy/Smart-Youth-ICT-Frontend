"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

import { slidesConfig } from "./hero/slidesConfig";
import Slide1Collage from "./hero/Slide1Collage";
import Slide2Geometric from "./hero/Slide2Geometric";
import SlideAiCloud from "./hero/SlideAiCloud";
import Slide3DualPortrait from "./hero/Slide3DualPortrait";

// Map each slide type to its dedicated layout component
const SLIDE_COMPONENTS = {
  collage: Slide1Collage,
  geometric: Slide2Geometric,
  "ai-cloud": SlideAiCloud,
  "dual-portrait": Slide3DualPortrait,
};

// ─── Slide Transition Variants ──────────────────────────────────────────────
const variants = {
  enter: (direction) => ({ x: direction > 0 ? "50%" : "-50%", opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slidesConfig.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slidesConfig.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(nextSlide, 8000); // 8 seconds for slower read
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slidesConfig[current];
  const SlideComponent = SLIDE_COMPONENTS[slide.type];

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
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            const threshold = 80;
            if (info.offset.x > threshold) {
              prevSlide();
            } else if (info.offset.x < -threshold) {
              nextSlide();
            }
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 touch-pan-y"
          style={{
            background: slide.hasStripes
              ? "none"
              : slide.bgGradient || slide.bgColor,
          }}
        >
          {SlideComponent && (
            <SlideComponent
              slide={slide}
              mounted={mounted}
              current={current}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls - Hidden on mobile/tablet, shown on desktop (lg and up) */}
      <div className="hidden lg:flex absolute inset-x-2 xl:inset-x-6 top-1/2 -translate-y-1/2 justify-between pointer-events-none z-30">
        <button
          onClick={prevSlide}
          className={`w-11 h-11 flex items-center justify-center cursor-pointer pointer-events-auto transition-all duration-300 hover:scale-110 active:scale-95 group rounded-full ${
            slide.isDark
              ? "text-white/85 hover:text-white hover:bg-white/15"
              : "text-slate-800 hover:bg-[#2D5A54] hover:text-white"
          }`}
          aria-label="Previous slide"
        >
          <HiArrowLeft
            size={22}
            className="group-hover:-translate-x-1 transition-transform duration-300 ease-out"
          />
        </button>
        <button
          onClick={nextSlide}
          className={`w-11 h-11 flex items-center justify-center cursor-pointer pointer-events-auto transition-all duration-300 hover:scale-110 active:scale-95 group rounded-full ${
            slide.isDark
              ? "text-white/85 hover:text-white hover:bg-white/15"
              : "text-slate-800 hover:bg-[#2D5A54] hover:text-white"
          }`}
          aria-label="Next slide"
        >
          <HiArrowRight
            size={22}
            className="group-hover:translate-x-1 transition-transform duration-300 ease-out"
          />
        </button>
      </div>

      {/* Progress Dots - Touch Target Optimized */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 flex justify-center items-center gap-1 z-40">
        {slidesConfig.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className="p-3 focus:outline-none transition-transform hover:scale-110"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-500 ${
                current === i
                  ? "w-8 bg-[#10B981] shadow-md shadow-emerald-400/50"
                  : slide.isDark
                  ? "w-2 bg-white/40 hover:bg-white/70"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
