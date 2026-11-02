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

  useEffect(() => {
    if (initialCertifications && initialCertifications.length > 0) {
      setCertifications(initialCertifications);
    }
  }, [initialCertifications]);

  const activeCert = useMemo(() => {
    if (!certifications || certifications.length === 0) return null;
    return certifications[activeIndex] || certifications[0];
  }, [certifications, activeIndex]);

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

  const categories = useMemo(() => {
    const set = new Set();
    certifications.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [certifications]);

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
      {/* â”€â”€ Hero Section: Certified Courses Showcase â”€â”€ */}
      <section className="pt-12 sm:pt-18 pb-8 sm:pb-10 overflow-hidden relative border-b border-slate-200/80 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-7xl mx-auto">
            {/* Left Column: Heading, Value Proposition & Track Selector */}
            <div className="lg:col-span-6 space-y-3.5">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="w-5 h-[2px] bg-pink-600 rounded-full" />
                <p className="text-xs font-black uppercase tracking-[0.18em] text-pink-600 leading-none">
                  {hero?.eyebrow || "Verified Skill Credentials"}
                </p>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 }}
                className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.15]"
              >
                Earn Globally Recognized{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                  Course Certificates.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="text-slate-600 text-xs sm:text-sm md:text-base leading-[1.6] font-normal"
              >
                {hero?.description ||
                  "Upon completing any professional program at Smart Youth ICT, graduates receive an official, QR-verifiable skill certificate backed by ISO 9001:2015 quality frameworks and government standards. Select a course below to preview its official certification."}
              </motion.p>

              {/* Certified Course Selector List */}
              <div className="pt-1 space-y-2">
                <div className="flex items-center justify-between text-xs leading-[1.4]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Select a Certified Track:
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    {certifications.length} Certified Courses Available
                  </span>
                </div>

                <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1 custom-scrollbar">
                  {certifications.map((item, i) => {
                    const isSelected = activeCert && activeCert._id === item._id;
                    return (
                      <motion.div
                        key={item._id || i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * i + 0.08 }}
                        onClick={() => setActiveIndex(i)}
                        className={`p-2 sm:p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                          isSelected
                            ? "bg-pink-50/60 border-pink-500/70 shadow-xs ring-1 ring-pink-500/30"
                            : "bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-pink-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <IoSchoolOutline size={15} />
                          </div>

                          <div className="min-w-0">
                            <h4
                              className={`text-xs sm:text-sm font-bold truncate leading-[1.4] ${
                                isSelected ? "text-pink-700" : "text-slate-900"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 truncate leading-none mt-0.5">
                              {item.courseName || item.category} â€¢ {item.duration || "Professional Certification"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded leading-none inline-block ${
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

            {/* Right Column: Official Certificate Document Showcase */}
            <div className="lg:col-span-6">
              {activeCert ? (
                <div className="space-y-2">
                  {/* Top Bar for Showcase Card */}
                  <div className="flex items-center justify-between text-xs leading-[1.4]">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <IoRibbonOutline className="text-pink-600" size={15} />
                      <span>Official Certificate Preview</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setLightboxCert(activeCert)}
                      className="inline-flex items-center gap-1 text-pink-600 hover:text-pink-700 font-bold hover:underline leading-none"
                    >
                      <IoEyeOutline size={13} />
                      <span>Inspect Fullscreen</span>
                    </button>
                  </div>

                  {/* Certificate Display Frame */}
                  <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200/90 transition-transform duration-200 hover:scale-[1.005]">
                    <OfficialCertificatePreview
                      cert={activeCert}
                      onClick={() => setLightboxCert(activeCert)}
                    />
                  </div>

                  {/* Certificate Context Information */}
                  <div className="bg-slate-50/80 border border-slate-200/80 rounded-lg p-3 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-[1.4] truncate">
                          {activeCert.title}
                        </h4>
                        <p className="text-slate-500 font-medium leading-none mt-0.5 text-[11px]">
                          Course Track:{" "}
                          <strong className="text-slate-700">
                            {activeCert.courseName || activeCert.title}
                          </strong>
                        </p>
                      </div>

                      <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[9px] uppercase tracking-wider rounded shrink-0 flex items-center gap-1 leading-none">
                        <IoCheckmarkCircle size={11} />
                        <span>Verifiable</span>
                      </span>
                    </div>

                    {activeCert.description && (
                      <p className="text-slate-600 leading-[1.5] text-[11px] line-clamp-2">
                        {activeCert.description}
                      </p>
                    )}

                    {/* Validated Skills */}
                    {activeCert.skills && activeCert.skills.length > 0 && (
                      <div className="pt-1.5 border-t border-slate-200/70">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1 leading-none">
                          Validated Core Competencies:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {activeCert.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-700 font-semibold text-[9px] rounded leading-none"
                            >
                              âœ“ {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pagination / Carousel controls */}
                    {certifications.length > 1 && (
                      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between text-xs leading-[1.4]">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="px-2 py-0.5 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 rounded hover:bg-slate-200/60 transition-colors"
                        >
                          <IoChevronBackOutline size={12} />
                          <span>Previous</span>
                        </button>

                        <span className="text-[10px] font-bold text-slate-400">
                          {activeIndex + 1} of {certifications.length}
                        </span>

                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-2 py-0.5 text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 rounded hover:bg-slate-200/60 transition-colors"
                        >
                          <span>Next</span>
                          <IoChevronForwardOutline size={12} />
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

      {/* â”€â”€ Section 2: Complete Catalog of Certified Courses & Credentials â”€â”€ */}
      <section className="py-10 md:py-12 bg-slate-50/70 border-b border-slate-200/80">
        <div className="container-custom max-w-7xl mx-auto space-y-5">
          {/* Section Heading & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-50 border border-pink-200 text-pink-700 text-[10px] font-black uppercase tracking-wider rounded mb-1 leading-none">
                <IoRibbonOutline size={13} />
                <span>Certification Catalog</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                All Certified Courses &amp; Diplomas
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5 max-w-2xl leading-[1.5]">
                Discover all courses at Smart Youth ICT that provide official, verifiable completion credentials upon student graduation.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <IoSearchOutline className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search course or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 bg-white border border-slate-200 text-xs font-medium text-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors whitespace-nowrap leading-none ${
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
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors whitespace-nowrap leading-none ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredCertifications.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Certificate Preview Frame */}
                  <div className="p-2 bg-slate-50/50 border-b border-slate-100">
                    <OfficialCertificatePreview
                      cert={item}
                      showFullDetails={false}
                      onClick={() => setLightboxCert(item)}
                      className="group-hover:border-pink-500/50 transition-colors"
                    />
                  </div>

                  {/* Card Content Details */}
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 bg-pink-50 text-pink-700 text-[9px] font-black uppercase tracking-wider rounded border border-pink-100 leading-none">
                        {item.category || "Certified Track"}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 leading-none">
                        {item.credentialId || "ISO 9001:2015"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-[1.4] group-hover:text-pink-600 transition-colors truncate">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5 truncate">
                        Track: <strong className="text-slate-700">{item.courseName || item.title}</strong>
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-[1.5] line-clamp-2">
                      {item.description}
                    </p>

                    {/* Validated Skills List */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="pt-1.5 border-t border-slate-100 space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block leading-none">
                          Skills Validated:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.skills.slice(0, 3).map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-1.5 py-0.5 bg-slate-50 text-slate-700 font-semibold text-[9px] rounded border border-slate-200/60 leading-none"
                            >
                              âœ“ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-2.5 px-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setLightboxCert(item)}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold text-[11px] uppercase tracking-wider rounded-md border border-slate-200 transition-colors inline-flex items-center gap-1 leading-none"
                  >
                    <IoEyeOutline size={13} />
                    <span>Inspect</span>
                  </button>

                  <Link
                    href="/courses"
                    className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white font-bold text-[11px] uppercase tracking-wider rounded-md shadow-xs transition-colors inline-flex items-center gap-1 leading-none active:scale-95"
                  >
                    <span>Enroll Track</span>
                    <IoArrowForward size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCertifications.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl border border-slate-200 p-4">
              <IoSchoolOutline className="w-10 h-10 text-slate-300 mx-auto mb-1.5" />
              <h3 className="text-sm font-bold text-slate-900 leading-[1.4]">
                No certified courses match your criteria
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 mb-3 leading-[1.5]">
                Try searching for different keywords or clearing your category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-3.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-md leading-none"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* â”€â”€ Section 3: Credential Verification & Quality Assurance Strip â”€â”€ */}
      <section className="py-8 bg-white">
        <div className="container-custom max-w-7xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <IoShieldCheckmarkOutline size={22} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-[1.4]">
                  Global QR Credential Verification System
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-xl leading-[1.5]">
                  Every graduate certificate from Smart Youth ICT includes a unique, encrypted credential ID verifiable worldwide by employers, embassies, and academic bodies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                href="/courses"
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs leading-none active:scale-95"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Lightbox Modal for Certificate Inspection â”€â”€ */}
      <AnimatePresence>
        {lightboxCert && (
          <div
            onClick={() => setLightboxCert(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[1300] flex flex-col justify-between p-3 sm:p-4"
          >
            {/* Lightbox Header Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-xl px-3.5 py-2.5 flex items-center justify-between border-b border-slate-200 shadow-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 bg-pink-600 text-white text-[9px] font-black uppercase tracking-wider rounded leading-none">
                  {lightboxCert.category || "Official Credential"}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-[1.4]">
                    {lightboxCert.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate leading-none">
                    Track: {lightboxCert.courseName || lightboxCert.title} â€¢ Credential ID: {lightboxCert.credentialId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxCert(null)}
                className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              >
                <IoCloseOutline size={20} />
              </button>
            </div>

            {/* Lightbox Certificate Document Body */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 w-full max-w-4xl mx-auto my-2 flex items-center justify-center p-2 sm:p-3 bg-white shadow-xl rounded-b-xl overflow-hidden"
            >
              <div className="w-full h-full max-h-[80vh] flex items-center justify-center">
                <OfficialCertificatePreview
                  cert={lightboxCert}
                  className="max-h-[76vh] w-auto aspect-[16/11]"
                />
              </div>
            </div>

            {/* Lightbox Footer Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-slate-600 border border-slate-200 shadow-xs leading-[1.4]"
            >
              <span className="text-slate-500 font-medium text-[11px]">
                Use Arrow Keys to navigate between certificates â€¢ ESC to close
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href="/courses"
                  className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors leading-none"
                >
                  Enroll in this Course
                </Link>
                <button
                  type="button"
                  onClick={() => setLightboxCert(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase tracking-wider rounded-md transition-colors text-xs leading-none"
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
