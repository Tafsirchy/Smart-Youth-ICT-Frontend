"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
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
  IoDocumentTextOutline,
  IoRibbonOutline,
  IoTimeOutline,
  IoKeyOutline,
} from "react-icons/io5";

export default function CertificationsPageClient({
  initialCertifications = [],
  hero = null,
}) {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxCert, setLightboxCert] = useState(null);

  // Sync if initialCertifications changes
  useEffect(() => {
    if (initialCertifications && initialCertifications.length > 0) {
      setCertifications(initialCertifications);
    }
  }, [initialCertifications]);

  // Current active certification for the showcase
  const activeCert = useMemo(() => {
    if (!certifications || certifications.length === 0) return null;
    return certifications[activeIndex] || certifications[0];
  }, [certifications, activeIndex]);

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
      {/* ── Top Texture Background ── */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden relative border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center max-w-7xl mx-auto">
            {/* ── Left Column: Value Proposition & Interactive Certificate List ── */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-pink-600 rounded-full" />
                <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">
                  {hero?.eyebrow || "Approvals & Trust"}
                </p>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]"
              >
                {hero?.title ? (
                  hero.title
                ) : (
                  <>
                    Institutional{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                      Certifications.
                    </span>
                  </>
                )}
              </motion.h1>

              {/* Subtitle Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal"
              >
                {hero?.description ||
                  "When you earn a certificate from Smart Youth ICT, you carry a credential backed by the Government and international ISO standards. Every credential is permanently verifiable with audited quality assurance."}
              </motion.p>

              {/* Interactive Accreditation List */}
              <div className="pt-2 space-y-3">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Select a credential to preview document:
                </p>

                <div className="space-y-2.5">
                  {certifications.map((item, i) => {
                    const isSelected = activeCert && activeCert._id === item._id;
                    return (
                      <motion.div
                        key={item._id || i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i + 0.2 }}
                        onClick={() => setActiveIndex(i)}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 scale-[1.01]"
                            : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <IoShieldCheckmarkOutline size={20} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider ${
                                isSelected ? "text-pink-400" : "text-pink-600"
                              }`}
                            >
                              {item.category || "Official Accreditation"}
                            </span>
                            {item.credentialId && (
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                  isSelected
                                    ? "bg-white/10 text-slate-300"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {item.credentialId}
                              </span>
                            )}
                          </div>

                          <h3
                            className={`text-sm sm:text-base font-bold mt-0.5 leading-snug truncate ${
                              isSelected ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {item.title}
                          </h3>

                          <p
                            className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                              isSelected ? "text-slate-300" : "text-slate-500"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right Column: REAL Uploaded Certificate Document Showcase (NO FAKE SVGs!) ── */}
            <div className="lg:col-span-6">
              {activeCert ? (
                <div className="relative">
                  {/* Outer Frame with realistic physical certificate feel */}
                  <motion.div
                    key={activeCert._id || activeIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden group"
                  >
                    {/* Top Certificate Header Bar */}
                    <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="text-xs font-black uppercase tracking-wider truncate">
                          {activeCert.category || "Official Credential Document"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setLightboxCert(activeCert)}
                          className="px-2.5 py-1 bg-white/10 hover:bg-pink-600 text-white text-[11px] font-bold uppercase tracking-wider rounded flex items-center gap-1 transition-all"
                          title="Open Fullscreen Document"
                        >
                          <IoEyeOutline size={14} />
                          <span>Inspect</span>
                        </button>
                      </div>
                    </div>

                    {/* Actual Uploaded Certificate Image Container */}
                    <div
                      onClick={() => setLightboxCert(activeCert)}
                      className="relative aspect-[16/11] sm:aspect-[16/11] w-full bg-slate-950 cursor-zoom-in overflow-hidden"
                    >
                      <Image
                        src={activeCert.image}
                        alt={activeCert.title}
                        fill
                        priority
                        unoptimized={true}
                        className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.srcset = "";
                          e.currentTarget.src = "/images/certificate-placeholder.png";
                        }}
                      />

                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-3.5 py-2 bg-white/95 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-xl flex items-center gap-2">
                          <IoEyeOutline size={16} />
                          <span>Click to View Full Resolution</span>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Footer / Metadata Bar */}
                    <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                            {activeCert.title}
                          </h4>
                          <p className="text-xs font-bold text-pink-600 mt-0.5">
                            {activeCert.issuer}
                          </p>
                        </div>

                        {activeCert.credentialId && (
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                              Reg / Ref No.
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-800">
                              {activeCert.credentialId}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Date & Verification Link */}
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                        <span>
                          Validity:{" "}
                          <strong className="text-slate-700">
                            {activeCert.expiryDate || "Active Standard"}
                          </strong>
                        </span>

                        {activeCert.verificationUrl && (
                          <a
                            href={activeCert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold hover:underline"
                          >
                            <span>Verify Authority Registry</span>
                            <IoOpenOutline size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Carousel Nav Controls */}
                    {certifications.length > 1 && (
                      <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 rounded hover:bg-slate-100 transition-colors"
                        >
                          <IoChevronBackOutline size={14} />
                          <span>Previous</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {certifications.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={() => setActiveIndex(dotIdx)}
                              className={`h-2 rounded-full transition-all ${
                                dotIdx === activeIndex
                                  ? "w-6 bg-pink-600"
                                  : "w-2 bg-slate-300 hover:bg-slate-400"
                              }`}
                              title={`View certificate ${dotIdx + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 rounded hover:bg-slate-100 transition-colors"
                        >
                          <span>Next</span>
                          <IoChevronForwardOutline size={14} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              ) : (
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
                  Loading certificate documentation...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Complete Accreditation & Document Verification Grid ── */}
      <section className="py-20 bg-slate-50 relative">
        <div className="container-custom max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-700 text-[11px] font-black uppercase tracking-wider rounded-md mb-3">
              <IoRibbonOutline size={15} />
              <span>Full Verification Registry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Official Quality Standards &amp; Accreditation Details
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Every course syllabus, lab facility, and certification issued by Smart Youth ICT adheres to strict national frameworks and audited international protocols.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Certificate Image Frame */}
                  <div
                    onClick={() => setLightboxCert(item)}
                    className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden cursor-zoom-in group/cardimg border-b border-slate-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized={true}
                      className="object-cover group-hover/cardimg:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.srcset = "";
                        e.currentTarget.src = "/images/certificate-placeholder.png";
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                    {/* Top Badge */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                      <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-md border border-white/10">
                        {item.category || "Accreditation"}
                      </span>

                      <span className="px-2 py-0.5 bg-emerald-500/90 text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-sm">
                        <IoCheckmarkCircle size={12} />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Bottom Image Strip */}
                    <div className="absolute bottom-2.5 inset-x-3 flex items-end justify-between z-10 text-white">
                      <span className="text-[11px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm truncate max-w-[200px]">
                        {item.credentialId || "Certified Facility"}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxCert(item);
                        }}
                        className="p-1.5 bg-white/20 hover:bg-pink-600 text-white rounded-md backdrop-blur-md transition-colors"
                        title="View Full Document"
                      >
                        <IoEyeOutline size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-pink-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 mt-1">
                        {item.issuer}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="pt-2 space-y-1">
                        {item.highlights.map((hl, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-center gap-1.5 text-xs text-slate-700 font-medium"
                          >
                            <IoCheckmarkCircle className="text-emerald-500 shrink-0" size={14} />
                            <span className="truncate">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setLightboxCert(item)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <IoDocumentTextOutline size={14} />
                    <span>View Scan</span>
                  </button>

                  {item.verificationUrl ? (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Registry</span>
                      <IoOpenOutline size={13} />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400">
                      ID: {item.credentialId?.slice(0, 14) || "Audited"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Banner Callout */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                <IoShieldCheckmarkOutline size={28} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black">
                  Graduate Certificate Verification System
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                  Every Smart Youth ICT student certificate contains an encrypted credential ID verifiable worldwide by employers, universities, and visa authorities.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/courses"
                className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── High-Resolution Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxCert && (
          <div
            onClick={() => setLightboxCert(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[1300] flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Lightbox Header Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-white pb-3 border-b border-white/10"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2.5 py-1 bg-pink-600 text-white text-xs font-black uppercase tracking-wider rounded">
                  {lightboxCert.category || "Official Certificate"}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold truncate">
                    {lightboxCert.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    {lightboxCert.issuer} {lightboxCert.credentialId ? `• ${lightboxCert.credentialId}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {lightboxCert.verificationUrl && (
                  <a
                    href={lightboxCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-slate-900 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Verify</span>
                    <IoOpenOutline size={14} />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setLightboxCert(null)}
                  className="p-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-lg transition-colors"
                >
                  <IoCloseOutline size={20} />
                </button>
              </div>
            </div>

            {/* Lightbox Image Body */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 w-full my-4 flex items-center justify-center overflow-hidden"
            >
              <Image
                src={lightboxCert.image}
                alt={lightboxCert.title}
                fill
                unoptimized={true}
                className="object-contain"
              />
            </div>

            {/* Lightbox Footer Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-white text-xs pt-3 border-t border-white/10"
            >
              <span className="text-slate-400">
                Use Arrow Keys or buttons to browse certificates • Press ESC to close
              </span>

              <button
                type="button"
                onClick={() => setLightboxCert(null)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white hover:text-slate-900 font-bold uppercase tracking-wider rounded-lg transition-colors text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
