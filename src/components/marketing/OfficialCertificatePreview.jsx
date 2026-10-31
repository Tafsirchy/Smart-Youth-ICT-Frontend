"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IoShieldCheckmark,
  IoRibbon,
  IoQrCodeOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
} from "react-icons/io5";

/**
 * OfficialCertificatePreview Component
 * Renders the uploaded certificate image if present,
 * OR dynamically generates an official Smart Youth ICT Skill Certificate mock document
 * with real course details, verification ID, and ISO/BTEB accreditation seal.
 */
export default function OfficialCertificatePreview({
  cert,
  className = "",
  showFullDetails = true,
  onClick = null,
}) {
  const [imageError, setImageError] = useState(false);

  // If a valid uploaded image exists and hasn't errored out, display it!
  const hasUploadedImage =
    cert?.image &&
    typeof cert.image === "string" &&
    cert.image.trim().length > 0 &&
    !imageError;

  if (hasUploadedImage) {
    return (
      <div
        onClick={onClick}
        className={`relative aspect-[16/11] w-full bg-slate-50 border border-slate-200/90 rounded-xl overflow-hidden shadow-sm ${
          onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""
        } ${className}`}
      >
        <Image
          src={cert.image}
          alt={cert.title || "Certificate"}
          fill
          unoptimized={true}
          className="object-contain p-2"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // ── Official Smart Youth ICT Skill Certificate Mock (Clean Light Theme) ──
  const title = cert?.title || "Professional Skill Certification";
  const courseName = cert?.courseName || cert?.title || "Professional IT Course";
  const credentialId = cert?.credentialId || "SYICT-CERT-2026-VERIFIED";
  const duration = cert?.duration || "6 Months (240+ Hours Practical Lab)";
  const category = cert?.category || "Professional Track";
  const skills = cert?.skills || cert?.highlights || [
    "Full-Stack Architecture",
    "Production Lab Defense",
    "Industry Code Standards",
  ];

  return (
    <div
      onClick={onClick}
      className={`relative aspect-[16/11] w-full bg-[#FCFDFD] border-2 border-slate-300/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-md select-none overflow-hidden ${
        onClick ? "cursor-pointer hover:border-pink-500/60 transition-colors" : ""
      } ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #ffffff, #fcfcfd)",
        backgroundSize: "16px 16px, 100% 100%",
      }}
    >
      {/* Ornate Inner Double Border Frame */}
      <div className="absolute inset-1.5 border border-amber-600/25 rounded-lg pointer-events-none" />
      <div className="absolute inset-2 border border-slate-200 rounded-md pointer-events-none" />

      {/* Watermark Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]">
        <div className="relative w-64 h-64">
          <Image
            src="/images/logo.png"
            alt="Watermark"
            fill
            className="object-contain grayscale"
          />
        </div>
      </div>

      {/* Top Header Row: Logo & Academy Authority */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="relative w-28 sm:w-36 h-8 sm:h-9">
            <Image
              src="/images/logo.png"
              alt="Smart Youth ICT"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-pink-50 border border-pink-200 text-pink-700 text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded">
            <IoShieldCheckmark className="text-pink-600" />
            <span>ISO 9001:2015 Audited</span>
          </span>
          <p className="text-[9px] text-slate-500 font-mono mt-0.5">
            BTEB Approved Institute
          </p>
        </div>
      </div>

      {/* Center Body: Certificate Title & Recipient Details */}
      <div className="relative z-10 text-center my-auto py-1 sm:py-2">
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">
          Certificate of Professional Competency
        </p>

        <p className="text-[11px] sm:text-xs text-slate-500 font-serif italic mb-1">
          This is to certify that the candidate has successfully completed
        </p>

        {/* Certificate Title */}
        <h3 className="text-sm sm:text-lg md:text-xl font-black text-slate-900 tracking-tight leading-tight max-w-lg mx-auto">
          {title}
        </h3>

        <div className="inline-flex items-center gap-2 mt-1 px-2.5 py-0.5 bg-slate-100 rounded-full border border-slate-200 text-[10px] sm:text-[11px] font-bold text-slate-700">
          <span>Track: {courseName}</span>
          <span className="text-slate-300">•</span>
          <span className="text-pink-600">{category}</span>
        </div>

        {/* Validated Skills Strip */}
        {showFullDetails && skills && skills.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1 mt-2 max-w-md mx-auto">
            {skills.slice(0, 4).map((s, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-600 text-[9px] sm:text-[10px] font-semibold rounded"
              >
                ✓ {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer Row: Verifiable QR, Seal & Signatures */}
      <div className="relative z-10 pt-2 border-t border-slate-200/80 flex items-end justify-between text-slate-700">
        {/* Left: Verifiable QR Code Block */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-slate-300 rounded p-1 flex items-center justify-center text-slate-800 shadow-xs">
            <IoQrCodeOutline className="w-full h-full text-slate-800" />
          </div>
          <div className="text-left">
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-slate-400 block leading-none">
              Online Verification
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-800 block mt-0.5">
              {credentialId}
            </span>
          </div>
        </div>

        {/* Center: Gold / Emerald Embossed Academic Seal */}
        <div className="hidden sm:flex flex-col items-center justify-center text-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shadow-md border-2 border-white">
            <IoRibbon size={20} />
          </div>
          <span className="text-[7px] font-black uppercase tracking-widest text-amber-700 mt-0.5">
            Verified Seal
          </span>
        </div>

        {/* Right: Authorized Academic Signatures */}
        <div className="text-right">
          <div className="w-24 sm:w-28 border-b border-slate-400 pb-0.5 mb-0.5">
            <span className="font-serif italic text-xs sm:text-sm text-slate-800 block">
              Academic Council
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-slate-500 block">
            Managing Director &amp; Head of Academic Board
          </span>
          <span className="text-[8px] font-mono text-slate-400 block">
            Smart Youth ICT Academy
          </span>
        </div>
      </div>
    </div>
  );
}
