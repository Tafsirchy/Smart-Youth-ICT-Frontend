"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoBusinessOutline,
  IoLocationOutline,
  IoGlobeOutline,
  IoCallOutline,
  IoArrowForwardOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoHardwareChipOutline,
  IoCheckmarkCircle,
  IoSparklesOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import api from "@/lib/api";

// Curated high-resolution campus photography by division (Matches BranchDirectory fallback system)
const DIVISION_CAMPUS_FALLBACKS = {
  Dhaka: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
  Chittagong: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",
  Chattogram: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",
  Rajshahi: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  Khulna: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1000&q=80",
  Barisal: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=80",
  Sylhet: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
  Rangpur: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
  Mymensingh: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
  Default: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
};

// Extracts photo from database record (coverImage base64 or URL, else division fallback)
function getBranchThumbnail(branch) {
  if (!branch) return DIVISION_CAMPUS_FALLBACKS.Default;
  if (branch.coverImage && typeof branch.coverImage === "string") {
    const trimmed = branch.coverImage.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    if (trimmed.startsWith("data:image/") && trimmed.length > 500) {
      return trimmed;
    }
  }
  const div = branch.address?.division || branch.division || "Default";
  return DIVISION_CAMPUS_FALLBACKS[div] || DIVISION_CAMPUS_FALLBACKS.Default;
}

// Normalizes real database branch schema (matching /branches directory page)
function normalizeBranch(b) {
  const parts = [
    b.address?.street,
    b.address?.houseNo && `House ${b.address.houseNo}`,
    b.address?.roadNo && `Road ${b.address.roadNo}`,
    b.address?.area,
    b.address?.thana,
    b.address?.district || b.address?.city,
  ].filter(Boolean);

  const addressStr =
    parts.length > 0
      ? parts.join(", ")
      : typeof b.address === "string"
      ? b.address
      : "Regional Tech Hub, Bangladesh";

  const division = b.address?.division || b.division || "Dhaka";
  const city =
    b.address?.district ||
    b.address?.city ||
    b.city ||
    b.address?.division ||
    b.division ||
    "Bangladesh";

  return {
    _id: b._id,
    name: b.name || "SYICT Campus Hub",
    code: b.code || "SYICT",
    city: city,
    division: division,
    address: addressStr,
    phone: b.contact?.phones?.[0] || b.phone || "01922772303",
    labCapacity: b.seatCapacity ? `${b.seatCapacity} Workstations` : "40 Workstations",
    photo: getBranchThumbnail(b),
    shortTagline: b.bio || `${b.name} — Modern High-Spec AC PC Lab & Regional Infrastructure`,
  };
}

// 14 Real Database Fallback Campuses ensuring zero blank states or hydration mismatch
const DEFAULT_BRANCHES = [
  {
    _id: "6a3e7e62c1a5dd7a836b33af",
    name: "Corporate Office",
    code: "HQ",
    city: "Dhaka-1230",
    division: "Dhaka",
    address: "House 18, Road 02, Uttara, Dhaka",
    phone: "01922772303",
    labCapacity: "50 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Dhaka,
    shortTagline: "Central Corporate Headquarters & Production Suite",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b0",
    name: "Dhaka North",
    code: "SYICT-003",
    city: "Dhaka",
    division: "Dhaka",
    address: "Main Commercial Avenue, Dhaka North",
    phone: "01922772303",
    labCapacity: "45 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Dhaka,
    shortTagline: "North Zone High-Spec AC Workstation Lab",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b1",
    name: "Dhaka South",
    code: "SYICT-0048",
    city: "Dhaka",
    division: "Dhaka",
    address: "Dhanmondi / New Market Hub, Dhaka South",
    phone: "01922772303",
    labCapacity: "40 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Dhaka,
    shortTagline: "South Zone Innovation Hub & Mentorship Desk",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b2",
    name: "Gazipur",
    code: "SYICT-081",
    city: "Gazipur",
    division: "Dhaka",
    address: "Chowrasta Commercial Area, Gazipur",
    phone: "01922772303",
    labCapacity: "35 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Dhaka,
    shortTagline: "Industrial Tech Center & Fiber Workstations",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b3",
    name: "Bogura",
    code: "SYICT-10",
    city: "Bogura",
    division: "Rajshahi",
    address: "Jaleshwaritola, Sherpur Road, Bogura",
    phone: "01922772303",
    labCapacity: "40 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Rajshahi,
    shortTagline: "Regional Software Lab & Project Studio",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b4",
    name: "Chattragram",
    code: "SYICT-02",
    city: "Chattogram",
    division: "Chittagong",
    address: "Agrabad Commercial Area, Chattogram",
    phone: "01922772303",
    labCapacity: "45 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Chittagong,
    shortTagline: "Port City Enterprise Center & Dual Monitors",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b5",
    name: "Cumilla",
    code: "SYICT-06",
    city: "Cumilla",
    division: "Chittagong",
    address: "Kandirpar, Laksam Road, Cumilla",
    phone: "01922772303",
    labCapacity: "35 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Chittagong,
    shortTagline: "Modern High-Spec Classroom & Dedicated Lab",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b6",
    name: "Khulna",
    code: "SYICT-05",
    city: "Jashore",
    division: "Khulna",
    address: "KDA Avenue, Shibbari More, Khulna",
    phone: "01922772303",
    labCapacity: "35 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Khulna,
    shortTagline: "South-West Innovation Hub & Placement Desk",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b7",
    name: "Mymensingh-1",
    code: "SYICT-03",
    city: "Mymensingh",
    division: "Mymensingh",
    address: "Town Hall Commercial Zone, Mymensingh",
    phone: "01922772303",
    labCapacity: "30 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Mymensingh,
    shortTagline: "Division Central Tech Hub & High-Speed Lab",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b8",
    name: "Mymensingh-2",
    code: "SYICT-012",
    city: "Mymensingh",
    division: "Mymensingh",
    address: "Regional Campus Area, Mymensingh",
    phone: "01922772303",
    labCapacity: "30 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Mymensingh,
    shortTagline: "AC Computer Workstations & 1:1 Mentors",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33b9",
    name: "Mymensingh-3",
    code: "SYICT-0047",
    city: "Mymensingh",
    division: "Mymensingh",
    address: "Station Road, Mymensingh",
    phone: "01922772303",
    labCapacity: "30 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Mymensingh,
    shortTagline: "Practical Project Studio & Dual Displays",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33ba",
    name: "Rangpur -1",
    code: "SYICT-001",
    city: "Rangpur",
    division: "Rangpur",
    address: "Medical Road, Jahangir Mor, Rangpur",
    phone: "01922772303",
    labCapacity: "35 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Rangpur,
    shortTagline: "Northern Division Technology Center & Lounge",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33bb",
    name: "Rangpur -2",
    code: "SYICT-002",
    city: "Kurigram",
    division: "Rangpur",
    address: "Kurigram Regional Tech Lab, Rangpur",
    phone: "01922772303",
    labCapacity: "30 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Rangpur,
    shortTagline: "Kurigram Campus Workstation Lab & Mentorship",
  },
  {
    _id: "6a3e7e62c1a5dd7a836b33bc",
    name: "Rangpur -3",
    code: "SYICT-0004",
    city: "Dinajpur",
    division: "Rangpur",
    address: "Dinajpur Central Hub, Rangpur Division",
    phone: "01922772303",
    labCapacity: "30 Workstations",
    photo: DIVISION_CAMPUS_FALLBACKS.Rangpur,
    shortTagline: "Dinajpur Technology Suite & In-Person Lab",
  },
];

const DIVISIONS = ["All", "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Mymensingh", "Rangpur"];

// Division alias matching (Matches BranchDirectory.jsx logic)
function isDivisionMatch(branchDivision, selectedDiv) {
  if (selectedDiv === "All") return true;
  if (!branchDivision) return false;
  const b = branchDivision.toLowerCase().trim();
  const s = selectedDiv.toLowerCase().trim();
  if (b === s) return true;
  if (
    (b === "chittagong" || b === "chattogram") &&
    (s === "chittagong" || s === "chattogram")
  ) {
    return true;
  }
  if (
    (b === "barisal" || b === "barishal") &&
    (s === "barisal" || s === "barishal")
  ) {
    return true;
  }
  return false;
}

// Responsive 3D Curved Arc Configuration (Matches Uploaded Reference Image Exactly)
function computeArcSlotConfig(viewport, stageWidth) {
  if (viewport === "desktop") {
    const cardW = 295;
    const cardH = 410;
    const stepX = Math.min(320, Math.max(260, Math.round(stageWidth * 0.25)));
    return {
      cardW,
      cardH,
      stageH: 470,
      slots: {
        0: { x: 0, y: 0, rotateZ: 0, scale: 1.0, zIndex: 30, opacity: 1 },
        1: { x: stepX, y: 28, rotateZ: 7, scale: 0.88, zIndex: 20, opacity: 0.9 },
        "-1": { x: -stepX, y: 28, rotateZ: -7, scale: 0.88, zIndex: 20, opacity: 0.9 },
        2: { x: stepX * 1.85, y: 88, rotateZ: 14, scale: 0.72, zIndex: 10, opacity: 0.75 },
        "-2": { x: -stepX * 1.85, y: 88, rotateZ: -14, scale: 0.72, zIndex: 10, opacity: 0.75 },
        3: { x: stepX * 2.5, y: 140, rotateZ: 18, scale: 0.55, zIndex: 5, opacity: 0 },
        "-3": { x: -stepX * 2.5, y: 140, rotateZ: -18, scale: 0.55, zIndex: 5, opacity: 0 },
      },
    };
  }

  if (viewport === "tablet") {
    const cardW = 250;
    const cardH = 370;
    const stepX = 220;
    return {
      cardW,
      cardH,
      stageH: 430,
      slots: {
        0: { x: 0, y: 0, rotateZ: 0, scale: 1.0, zIndex: 30, opacity: 1 },
        1: { x: stepX, y: 22, rotateZ: 6, scale: 0.85, zIndex: 20, opacity: 0.85 },
        "-1": { x: -stepX, y: 22, rotateZ: -6, scale: 0.85, zIndex: 20, opacity: 0.85 },
        2: { x: stepX * 1.7, y: 70, rotateZ: 12, scale: 0.65, zIndex: 10, opacity: 0.55 },
        "-2": { x: -stepX * 1.7, y: 70, rotateZ: -12, scale: 0.65, zIndex: 10, opacity: 0.55 },
        3: { x: stepX * 2.3, y: 110, rotateZ: 16, scale: 0.5, zIndex: 5, opacity: 0 },
        "-3": { x: -stepX * 2.3, y: 110, rotateZ: -16, scale: 0.5, zIndex: 5, opacity: 0 },
      },
    };
  }

  // Mobile
  const cardW = 230;
  const cardH = 340;
  const stepX = 175;
  return {
    cardW,
    cardH,
    stageH: 390,
    slots: {
      0: { x: 0, y: 0, rotateZ: 0, scale: 1.0, zIndex: 30, opacity: 1 },
      1: { x: stepX, y: 16, rotateZ: 5, scale: 0.82, zIndex: 20, opacity: 0.4 },
      "-1": { x: -stepX, y: 16, rotateZ: -5, scale: 0.82, zIndex: 20, opacity: 0.4 },
      2: { x: stepX * 1.6, y: 55, rotateZ: 10, scale: 0.55, zIndex: 10, opacity: 0 },
      "-2": { x: -stepX * 1.6, y: 55, rotateZ: -10, scale: 0.55, zIndex: 10, opacity: 0 },
      3: { x: stepX * 2.1, y: 90, rotateZ: 14, scale: 0.45, zIndex: 5, opacity: 0 },
      "-3": { x: -stepX * 2.1, y: 90, rotateZ: -14, scale: 0.45, zIndex: 5, opacity: 0 },
    },
  };
}

export default function CampusNetworkSection() {
  const [branches, setBranches] = useState(DEFAULT_BRANCHES);
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState("desktop");
  const [isPaused, setIsPaused] = useState(false);
  const stageRef = useRef(null);
  const [stageWidth, setStageWidth] = useState(1200);

  // Live database fetch from /branches/public/all (same source as /en/branches page)
  useEffect(() => {
    api
      .get("/branches/public/all")
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const normalized = res.data.data.map(normalizeBranch);
          setBranches(normalized);
        }
      })
      .catch((err) => {
        console.warn("[CampusNetwork] Live database fetch fallback to preloaded records", err?.message);
      });
  }, []);

  // Filtered branches by division
  const filteredBranches = useMemo(() => {
    return branches.filter((b) => isDivisionMatch(b.division, selectedDivision));
  }, [branches, selectedDivision]);

  // Keep active index in bounds when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedDivision]);

  // Viewport resize tracking
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setViewport("mobile");
      else if (width < 1024) setViewport("tablet");
      else setViewport("desktop");

      if (stageRef.current && stageRef.current.clientWidth > 0) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = filteredBranches.length;

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Gentle auto-slide (pauses on hover or drag)
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Drag swipe calculation
  const handleDragEnd = (_e, info) => {
    if (info.offset.x < -40) handleNext();
    else if (info.offset.x > 40) handlePrev();
  };

  const arcConfig = useMemo(
    () => computeArcSlotConfig(viewport, stageWidth),
    [viewport, stageWidth]
  );

  return (
    <section
      className="relative w-full py-8 sm:py-10 md:py-12 bg-white font-sans border-b border-slate-200/80 overflow-hidden"
      id="campus-network"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom relative z-10">
        {/* ── SECTION HEADER & DIVISION FILTERS ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-6 sm:mb-8 max-w-3xl mx-auto"
        >
          {/* Section Eyebrow */}
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-emerald-600 mb-2">
            Nationwide Physical Presence
          </p>

          {/* Punchy Clean Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.15] mb-2">
            14+ Regional Campuses &amp;{" "} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Tech Hubs
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl my-4 mx-auto">
            Experience our air-conditioned PC labs, dual-monitor workstation suites, dedicated gigabit fiber, and full-time senior lab mentors.
          </p>
        </motion.div>

        {/* ── 3D CURVED ARC CAROUSEL STAGE (Soft Subtle Edge Blend) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden"
        >
          {/* Subtle Left Gradient Edge Blend (Gentle feather into white) */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-30" />

          {/* Subtle Right Gradient Edge Blend (Gentle feather into white) */}
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-30" />

          <div
            ref={stageRef}
            className="relative w-full overflow-hidden flex items-center justify-center select-none"
            style={{
              height: `${arcConfig.stageH}px`,
            }}
          >
            {filteredBranches.map((branch, idx) => {
            // Compute circular slot relative to active index
            let diff = idx - activeIndex;
            while (diff > total / 2) diff -= total;
            while (diff < -total / 2) diff += total;

            const slotKey = String(diff);
            const slot = arcConfig.slots[slotKey];
            const isVisible = Boolean(slot);
            const isCenter = diff === 0;

            if (!isVisible) return null;

            return (
              <motion.div
                key={branch._id || branch.code || idx}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                className={`absolute top-0 cursor-pointer rounded-3xl overflow-hidden transform-gpu transition-[box-shadow,border-color] duration-300 ${
                  isCenter
                    ? "shadow-2xl shadow-slate-900/20 border-2 border-emerald-600 ring-2 ring-slate-100"
                    : "border border-slate-200/90 shadow-md hover:border-slate-300"
                }`}
                style={{
                  width: `${arcConfig.cardW}px`,
                  height: `${arcConfig.cardH}px`,
                  pointerEvents: slot.opacity === 0 ? "none" : "auto",
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={{
                  x: slot.x,
                  y: slot.y,
                  rotateZ: slot.rotateZ,
                  scale: slot.scale,
                  zIndex: slot.zIndex,
                  opacity: slot.opacity,
                }}
                transition={{
                  duration: 0.48,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                {/* Full-Bleed Photograph Background */}
                <div className="relative w-full h-full bg-slate-900 group">
                  <Image
                    src={branch.photo}
                    alt={branch.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 250px, 320px"
                    priority={Math.abs(diff) <= 1}
                  />

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

                  {/* Top Badges (Code & City) */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                    <span className="px-2.5 py-0.5 rounded-lg bg-white/95 text-slate-900 text-[10px] font-mono font-black uppercase tracking-wider border border-white/40 shadow-xs">
                      {branch.code || "CAMPUS"}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                      {branch.city || branch.division}
                    </span>
                  </div>

                  {/* Bottom Content Area (Fixed layout prevents layout shifts during transitions) */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-10 flex flex-col justify-end text-left h-44">
                    <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight mb-1 text-white drop-shadow-sm">
                      {branch.name}
                    </h3>

                    <p className="text-[11px] text-slate-300 line-clamp-1 mb-2 font-medium">
                      {branch.shortTagline || branch.address}
                    </p>

                    {/* Features Badges on Center Card (Smooth opacity crossfade, 0 layout reflow) */}
                    <div
                      className={`flex flex-wrap items-center gap-1.5 mb-2.5 transition-opacity duration-300 ${
                        isCenter ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 bg-slate-900/70 border border-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-300 shadow-2xs">
                        <IoHardwareChipOutline size={11} />
                        <span>{branch.labCapacity || "Dedicated Lab"}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-900/70 border border-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-300 shadow-2xs">
                        <IoCheckmarkCircle size={11} />
                        <span>AC Campus</span>
                      </span>
                    </div>

                    {/* Action Row on Center Card (Smooth opacity crossfade, 0 layout reflow) */}
                    <div
                      className={`flex items-center gap-2 pt-2 border-t border-white/15 transition-opacity duration-300 ${
                        isCenter ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      {branch.phone && (
                        <a
                          href={`tel:${branch.phone}`}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-xl text-xs font-bold transition border border-white/25"
                          title={`Call ${branch.name}`}
                        >
                          <IoCallOutline size={13} className="text-emerald-400" />
                          <span>Hotline</span>
                        </a>
                      )}

                      <Link
                        href="/seminar"
                        className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm"
                      >
                        <span>Tour Lab</span>
                        <IoArrowForwardOutline size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

        {/* ── CENTER NAVIGATION CONTROLS (Directly Matching Uploaded Image) ── */}
        <div className="flex items-center justify-center gap-3 mt-1 sm:mt-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-emerald-600 flex items-center justify-center transition shadow-xs hover:shadow-md cursor-pointer hover:border-emerald-300 active:scale-95"
            title="Previous Campus"
          >
            <IoChevronBackOutline size={16} />
          </button>

          <span className="text-xs font-mono font-bold text-slate-400 px-2">
            {activeIndex + 1} / {total}
          </span>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-emerald-600 flex items-center justify-center transition shadow-xs hover:shadow-md cursor-pointer hover:border-emerald-300 active:scale-95"
            title="Next Campus"
          >
            <IoChevronForwardOutline size={16} />
          </button>
        </div>

        {/* ── SINGLE ACTION TEXT LINK (Text Only, No BG/Border) ── */}
        <div className="mt-6 sm:mt-7 flex justify-center">
          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>Book Campus Visit</span>
            <IoArrowForwardOutline
              size={14}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
