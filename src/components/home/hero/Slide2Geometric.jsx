"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── 6 Floating IT Solution Cards mapped to the Provided Reference Graphic ───
const FLOATING_CARDS = [
  {
    id: "software",
    title: "Custom Software",
    alt: "Custom Software",
    src: "/images/slider2/Software.png",
    style: { left: "75.5%", top: "2.5%", width: "15.2%" },
    floatAnim: { y: [0, -5, 0], rotate: [0, 0.8, 0] },
    duration: 4.2,
    delay: 0.1,
  },
  {
    id: "web",
    title: "Web Portals",
    alt: "Web Portals",
    src: "/images/slider2/Web.png",
    style: { left: "83.8%", top: "28.5%", width: "14.2%" },
    floatAnim: { y: [0, 5, 0], rotate: [0, -0.8, 0] },
    duration: 4.8,
    delay: 0.3,
  },
  {
    id: "enterprise",
    title: "Enterprise Solutions",
    alt: "Enterprise Solutions",
    src: "/images/slider2/Enterprise.png",
    style: { left: "85.2%", top: "48.8%", width: "16.1%" },
    floatAnim: { y: [0, -4, 0], rotate: [0, 0.6, 0] },
    duration: 4.5,
    delay: 0.5,
  },
  {
    id: "app",
    title: "Mobile Apps",
    alt: "Mobile Apps",
    src: "/images/slider2/App.png",
    style: { left: "35.8%", top: "11.3%", width: "14.9%" },
    floatAnim: { y: [0, -5, 0], rotate: [0, -0.8, 0] },
    duration: 4.4,
    delay: 0.2,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    alt: "Cloud & DevOps",
    src: "/images/slider2/Cloud.png",
    style: { left: "26.8%", top: "34.2%", width: "14.2%" },
    floatAnim: { y: [0, 5, 0], rotate: [0, 0.8, 0] },
    duration: 5.0,
    delay: 0.4,
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    alt: "Cybersecurity",
    src: "/images/slider2/Cyber.png",
    style: { left: "21.6%", top: "52.7%", width: "15.7%" },
    floatAnim: { y: [0, -4, 0], rotate: [0, -0.6, 0] },
    duration: 4.6,
    delay: 0.6,
  },
];

/**
 * Slide 2 (11+ Ready-Made Software & Cloud Solutions)
 * Features an animated interactive developer workspace with 6 floating IT solution cards
 * aligned 1:1 with the canonical reference design.
 */
export default function Slide2Geometric({ slide, mounted, current }) {
  return (
    <>
      {/* Slide 2 Background Banner - Full bleed across the entire section */}
      {slide.bgBanner && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ background: slide.bgBanner }}
        />
      )}

      <div className="container-custom px-4 sm:px-6 lg:px-14 xl:px-16 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-20 py-6 lg:py-8">
        {/* Left Texts */}
        <div className="max-w-xl mx-auto text-center lg:text-left lg:mx-0 flex flex-col items-center lg:items-start w-full">
          <motion.div
            initial={mounted ? { opacity: 0, x: -50 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center lg:items-start w-full motion-gpu"
          >
            {slide.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-wider mb-3 md:mb-4 rounded-lg">
                🚀 {slide.badge}
              </div>
            )}

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black leading-[1.18] mb-3 md:mb-4 tracking-tight text-white">
              {slide.heading}
            </h1>

            <p className="text-sm md:text-base mb-5 md:mb-6 leading-relaxed max-w-lg font-medium opacity-90 text-white/80">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
              <Link
                href={slide.primaryBtn.href}
                className="px-6 py-3.5 sm:px-8 sm:py-3.5 font-bold text-sm transition-all transform hover:scale-105 shadow-xl text-center rounded-md"
                style={{
                  background: slide.primaryBtn.color || "#FFFFFF",
                  color: slide.primaryBtn.textColor || "#0F7C5A",
                }}
              >
                {slide.primaryBtn.text}
              </Link>
              {slide.secondaryBtn && (
                <Link
                  href={slide.secondaryBtn.href || "/services"}
                  className="px-6 py-3.5 sm:px-8 sm:py-3.5 font-bold text-sm border-2 border-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-center rounded-md"
                >
                  {slide.secondaryBtn.text}
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Visuals - Animated Developer Workspace with 6 Floating IT Solution Cards */}
        <div className="hidden lg:flex relative items-center justify-center lg:justify-end h-full">
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.94 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="relative w-full max-w-[560px] xl:max-w-[620px] 2xl:max-w-[660px] flex items-center justify-center"
          >
            {/* Ambient Background Radial Glow */}
            <div className="absolute w-[440px] h-[440px] rounded-full bg-emerald-300/20 blur-3xl pointer-events-none -z-10" />

            {/* Composite Scene Container (Matches exact 1024x682 3:2 aspect ratio of reference graphic) */}
            <div className="relative w-full aspect-[1024/682] select-none">
              {/* Central Developer Workspace Base (Smiling Dev + Laptop + Desk + Potted Plant + Mug) */}
              <motion.div
                initial={mounted ? { opacity: 0, y: 20, scale: 0.98 } : false}
                animate={{
                  opacity: 1,
                  y: [0, -3, 0],
                  scale: 1,
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.2 },
                  scale: { duration: 0.6, delay: 0.2 },
                  y: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/slider2/Smiling Workspace Cutout with Laptop and Plant.png"
                  alt="Ready-Made Software & Solutions Developer Workspace"
                  fill
                  priority
                  unoptimized
                  className="w-full h-full object-contain pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.32)]"
                />
              </motion.div>

              {/* 6 Floating Solution Cards around the Workspace */}
              {FLOATING_CARDS.map((card) => (
                <motion.div
                  key={card.id}
                  initial={mounted ? { opacity: 0, scale: 0.6, y: 15 } : false}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: card.floatAnim.y,
                    rotate: card.floatAnim.rotate,
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: card.delay },
                    scale: {
                      duration: 0.5,
                      delay: card.delay,
                      type: "spring",
                      stiffness: 220,
                    },
                    y: {
                      duration: card.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: card.delay,
                    },
                    rotate: {
                      duration: card.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: card.delay,
                    },
                  }}
                  whileHover={{
                    scale: 1.12,
                    zIndex: 40,
                    transition: { duration: 0.2 },
                  }}
                  className="absolute z-20 cursor-pointer drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:drop-shadow-[0_16px_28px_rgba(0,0,0,0.32)] transition-shadow duration-300"
                  style={{
                    left: card.style.left,
                    top: card.style.top,
                    width: card.style.width,
                  }}
                >
                  <Link
                    href="/services"
                    className="block relative w-full aspect-[480/380]"
                    title={card.title}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt || card.title || "IT Solution"}
                      fill
                      unoptimized
                      className="object-contain select-none pointer-events-none"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
