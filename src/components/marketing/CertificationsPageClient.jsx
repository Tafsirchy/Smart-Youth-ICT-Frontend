"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle,
  IoEyeOutline,
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoOpenOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoSearchOutline,
  IoArrowForward,
} from "react-icons/io5";
import OfficialCertificatePreview from "./OfficialCertificatePreview";

export default function CertificationsPageClient({
  initialCertifications = [],
  hero = null,
}) {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxCert, setLightboxCert] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sync if initialCertifications changes
  useEffect(() => {
    if (initialCertifications && initialCertifications.length > 0) {
      setCertifications(initialCertifications);
    }
  }, [initialCertifications]);

  // Current active certification for the hero showcase
  const activeCert = useMemo(() => {
    if (!certifications || certifications.length === 0) return null;
    return certifications[activeIndex] || certifications[0];
  }, [certifications, activeIndex]);

  // Filtered certificates for the course tracks section
  const filteredCertifications = useMemo(() => {
    return certifications.filter((item) => {
      const matchSearch =
        !searchQuery.trim() ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.skills?.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [certifications, searchQuery, selectedCategory]);

  // Unique categories for pills
  const categories = useMemo(() => {
    const set = new Set();
    certifications.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [certifications]);

  // Handlers for switching showcased certificate
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : certifications.length - 1
    );
  }, [certifications.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev < certifications.length - 1 ? prev + 1 : 0
    );
  }, [certifications.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!lightboxCert) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxCert(null);
      if (e.key === "ArrowLeft") {
        const currIdx = certifications.findIndex((c) => c._id === lightboxCert._id);
        const prevIdx = currIdx > 0 ? currIdx - 1 : certifications.length - 1;
        setLightboxCert(certifications[prevIdx]);
      }
      if (e.key === "ArrowRight") {
        const currIdx = certifications.findIndex((c) => c._id === lightboxCert._id);
        const nextIdx = currIdx < certifications.length - 1 ? currIdx + 1 : 0;
        setLightboxCert(certifications[nextIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxCert, certifications]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-pink-500 selection:text-white">
      {/* ── Hero Section: Certified Courses Showcase ── */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden relative border-b border-slate-200/80 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-7xl mx-auto">
            {/* Left Column: Heading, Value Proposition & Track Selector */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2.5"
              >
                <span className="w-6 h-[2px] bg-pink-600 rounded-full" />
                <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">
                  {hero?.eyebrow || "Verified Skill Credentials"}
                </p>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]"
              >
                Earn Globally Recognized{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                  Course Certificates.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal"
              >
                {hero?.description ||
                  "Upon completing any professional program at Smart Youth ICT, graduates receive an official, QR-verifiable skill certificate backed by ISO 9001:2015 quality frameworks and government standards. Select a course below to preview its official certification."}
              </motion.p>

              {/* Certified Course Selector List */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Select a Certified Track:
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {certifications.length} Certified Courses Available
                  </span>
                </div>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                  {certifications.map((item, i) => {
                    const isSelected = activeCert && activeCert._id === item._id;
                    return (
                      <motion.div
                        key={item._id || i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i + 0.1 }}
                        onClick={() => setActiveIndex(i)}
                        className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-pink-50/60 border-pink-500/70 shadow-sm ring-1 ring-pink-500/30"
                            : "bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-pink-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <IoSchoolOutline size={18} />
                          </div>

                          <div className="min-w-0">
                            <h4
                              className={`text-xs sm:text-sm font-bold truncate ${
                                isSelected ? "text-pink-700" : "text-slate-900"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {item.courseName || item.category} • {item.duration || "Professional Certification"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isSelected
                                ? "bg-pink-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isSelected ? "Previewing" : "Preview"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Official Certificate Document Showcase (Image or Official Mock Preview) */}
            <div className="lg:col-span-6">
              {activeCert ? (
                <div className="space-y-3">
                  {/* Top Bar for Showcase Card */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <IoRibbonOutline className="text-pink-600" size={16} />
                      <span>Official Certificate Preview</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setLightboxCert(activeCert)}
                      className="inline-flex items-center gap-1 text-pink-600 hover:text-pink-700 font-bold hover:underline"
                    >
                      <IoEyeOutline size={14} />
                      <span>Inspect Fullscreen</span>
                    </button>
                  </div>

                  {/* The Certificate Display: Shows Admin Uploaded Image or Official Dynamic Mock */}
                  <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200/90 transition-transform duration-300 hover:scale-[1.01]">
                    <OfficialCertificatePreview
                      cert={activeCert}
                      onClick={() => setLightboxCert(activeCert)}
                    />
                  </div>

                  {/* Certificate Context Information */}
                  <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 space-y-2.5 text-xs">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {activeCert.title}
                        </h4>
                        <p className="text-slate-500 font-medium mt-0.5">
                          Course Track:{" "}
                          <strong className="text-slate-700">
                            {activeCert.courseName || activeCert.title}
                          </strong>
                        </p>
                      </div>

                      <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px] uppercase tracking-wider rounded shrink-0 flex items-center gap-1">
                        <IoCheckmarkCircle size={12} />
                        <span>Verifiable</span>
                      </span>
                    </div>

                    {activeCert.description && (
                      <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                        {activeCert.description}
                      </p>
                    )}

                    {/* Validated Skills */}
                    {activeCert.skills && activeCert.skills.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/70">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Validated Core Competencies:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCert.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 font-semibold text-[10px] rounded"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pagination / Carousel controls */}
                    {certifications.length > 1 && (
                      <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 rounded hover:bg-slate-200/60 transition-colors"
                        >
                          <IoChevronBackOutline size={13} />
                          <span>Previous</span>
                        </button>

                        <span className="text-[11px] font-bold text-slate-400">
                          {activeIndex + 1} of {certifications.length}
                        </span>

                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 rounded hover:bg-slate-200/60 transition-colors"
                        >
                          <span>Next</span>
                          <IoChevronForwardOutline size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="aspect-[16/11] bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xs">
                  Loading certificate showcase...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Complete Catalog of Certified Courses & Credentials ── */}
      <section className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <div className="container-custom max-w-7xl mx-auto space-y-8">
          {/* Section Heading & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-200 text-pink-700 text-[11px] font-black uppercase tracking-wider rounded-md mb-2">
                <IoRibbonOutline size={14} />
                <span>Certification Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                All Certified Courses &amp; Diplomas
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Discover all courses at Smart Youth ICT that provide official, verifiable completion credentials upon student graduation.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <IoSearchOutline className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search course or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 text-xs font-medium text-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                All Categories ({certifications.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Certified Courses Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Certificate Preview Frame: Custom Uploaded Image OR Official Dynamic Mock */}
                  <div className="p-3 bg-slate-50/50 border-b border-slate-100">
                    <OfficialCertificatePreview
                      cert={item}
                      showFullDetails={false}
                      onClick={() => setLightboxCert(item)}
                      className="group-hover:border-pink-500/50 transition-colors"
                    />
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 bg-pink-50 text-pink-700 text-[10px] font-black uppercase tracking-wider rounded border border-pink-100">
                        {item.category || "Certified Track"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.credentialId || "ISO 9001:2015"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-pink-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Track: <strong className="text-slate-700">{item.courseName || item.title}</strong>
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Validated Skills List */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Skills Validated:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.skills.slice(0, 3).map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 bg-slate-50 text-slate-700 font-semibold text-[10px] rounded border border-slate-200/60"
                            >
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setLightboxCert(item)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg border border-slate-200 transition-colors inline-flex items-center gap-1.5"
                  >
                    <IoEyeOutline size={14} />
                    <span>Inspect</span>
                  </button>

                  <Link
                    href="/courses"
                    className="px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors inline-flex items-center gap-1 active:scale-95"
                  >
                    <span>Enroll Track</span>
                    <IoArrowForward size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCertifications.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
              <IoSchoolOutline className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-900">
                No certified courses match your criteria
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Try searching for different keywords or clearing your category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 3: Credential Verification & Quality Assurance Strip ── */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-7xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <IoShieldCheckmarkOutline size={28} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Global QR Credential Verification System
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Every graduate certificate from Smart Youth ICT includes a unique, encrypted credential ID verifiable worldwide by employers, embassies, and academic bodies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/courses"
                className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs active:scale-95"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal for Certificate Inspection (Clean Light Theme) ── */}
      <AnimatePresence>
        {lightboxCert && (
          <div
            onClick={() => setLightboxCert(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[1300] flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Lightbox Header Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-xl px-4 py-3 flex items-center justify-between border-b border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2.5 py-0.5 bg-pink-600 text-white text-[10px] font-black uppercase tracking-wider rounded">
                  {lightboxCert.category || "Official Credential"}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {lightboxCert.title}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    Track: {lightboxCert.courseName || lightboxCert.title} • Credential ID: {lightboxCert.credentialId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxCert(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <IoCloseOutline size={22} />
              </button>
            </div>

            {/* Lightbox Certificate Document Body */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 w-full max-w-4xl mx-auto my-3 flex items-center justify-center p-2 sm:p-4 bg-white shadow-2xl rounded-b-xl overflow-hidden"
            >
              <div className="w-full h-full max-h-[82vh] flex items-center justify-center">
                <OfficialCertificatePreview
                  cert={lightboxCert}
                  className="max-h-[78vh] w-auto aspect-[16/11]"
                />
              </div>
            </div>

            {/* Lightbox Footer Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 border border-slate-200 shadow-sm"
            >
              <span className="text-slate-500 font-medium">
                Use Arrow Keys to navigate between certificates • ESC to close
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href="/courses"
                  className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                >
                  Enroll in this Course
                </Link>
                <button
                  type="button"
                  onClick={() => setLightboxCert(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase tracking-wider rounded-lg transition-colors text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
