"use client";

import { useRef, useState, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  IoSearchOutline,
  IoCodeSlashOutline,
  IoCloudUploadOutline,
  IoSchoolOutline,
  IoHeadsetOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoClose,
  IoPeopleOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import Link from "next/link";
import { useLocale } from "next-intl";

/* ─────────────────────────────────────────────────────────────
   Step Data (Enriched for Interactive Modal & Cards)
───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    id: "01",
    icon: IoSearchOutline,
    title: "Consultation & Analysis",
    subtitle: "Discovery & Process Audit",
    desc: "We analyze your business operations, existing workflows, and pain-points to design a custom ERP blueprint.",
    fullOverview:
      "Every successful enterprise ERP transformation begins with deep operational alignment. Our senior enterprise architects and business analysts work with your executive leadership, department heads, and operational teams to audit existing processes, map transactions, and formulate a rock-solid technical blueprint before writing a single line of code.",
    deliverables: [
      "Comprehensive Business Requirements Document (BRD)",
      "Current-State (As-Is) vs. Target-State (To-Be) workflow mapping",
      "Legacy database structure audit & sanitization plan",
      "Custom ERP system architecture blueprint & milestone roadmap",
    ],
    stakeholders: "Executive Leadership, Operations Heads, SYICT Business Analysts",
    milestone: "Signed Architecture Blueprint & Fixed-Scope Technical Roadmap",
    color: "#6366F1",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    tags: ["Requirement Gathering", "Process Audit", "Gap Analysis"],
    days: "3–5 Days",
    yShift: 0,
  },
  {
    id: "02",
    icon: IoCodeSlashOutline,
    title: "Customization & Development",
    subtitle: "Architecture & Integration",
    desc: "Our engineers build and configure your ERP modules — HR, Accounts, Inventory, Sales, and more.",
    fullOverview:
      "Our dedicated full-stack engineering squads develop and tailor-fit modular microservices to your exact business specifications. From multi-branch inventory tracking and automated payroll to customized double-entry accounts ledgers and role-based permissions, every workflow is natively coded with enterprise security and speed.",
    deliverables: [
      "Core modules engineering (HRMS, Accounts, Inventory, POS, CRM)",
      "Secure REST & GraphQL API bridges for banking, SMS & IoT hardware",
      "Granular role-based access control (RBAC) & automated audit trails",
      "Weekly sprint demonstrations with hands-on client feedback loops",
    ],
    stakeholders: "Lead Software Architects, UI/UX Designers, Client Project Lead",
    milestone: "Staging Release with Fully Configured Production Modules",
    color: "#10B981",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    tags: ["Module Config", "Custom Workflows", "API Integration"],
    days: "2–6 Weeks",
    yShift: 72,
  },
  {
    id: "03",
    icon: IoCloudUploadOutline,
    title: "Deployment & Migration",
    subtitle: "Data Migration & Go-Live",
    desc: "Live data migration, server deployment, and system-wide testing before official go-live.",
    fullOverview:
      "We handle the end-to-end data extraction, sanitization, and migration from your legacy Excel sheets, desktop systems, or old databases into your cloud ERP. We conduct rigorous User Acceptance Testing (UAT), penetration testing, and load simulations to guarantee 100% data integrity with zero disruption during cutover.",
    deliverables: [
      "Automated legacy data ETL (Extract, Transform, Load) & deduplication",
      "High-availability cloud server deployment (AWS/DigitalOcean/On-Premise)",
      "End-to-end UAT sign-off with stress & penetration security tests",
      "Seamless cutover schedule ensuring zero operational interruption",
    ],
    stakeholders: "DevOps Specialists, Database Administrators, Client QA Team",
    milestone: "Verified Production Go-Live with Live Enterprise Data",
    color: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
    tags: ["Data Migration", "UAT Testing", "Go-Live"],
    days: "1 Week",
    yShift: 0,
  },
  {
    id: "04",
    icon: IoSchoolOutline,
    title: "Staff Training",
    subtitle: "Team Onboarding & Guides",
    desc: "Hands-on training sessions for your team covering all ERP modules, roles, and admin controls.",
    fullOverview:
      "Software is only as valuable as the employees operating it. Our senior implementation specialists conduct interactive, role-specific workshops across your departments. We train your staff, branch managers, and IT administrators on real commercial data and provide recorded video documentation and manuals for future hiring onboarding.",
    deliverables: [
      "Role-based practical training workshops for operators and managers",
      "Executive reporting & master analytics dashboard orientation",
      "Step-by-step video tutorials and searchable knowledge base guides",
      "Staff certification assessment to verify operational proficiency",
    ],
    stakeholders: "Department Managers, Operational Staff, SYICT Training Mentors",
    milestone: "100% Team Onboarding & Operations Sign-Off",
    color: "#EC4899",
    bg: "#FDF2F8",
    border: "#FBCFE8",
    tags: ["Role-Based Training", "Video Docs", "Admin Guide"],
    days: "2–3 Days",
    yShift: 72,
  },
  {
    id: "05",
    icon: IoHeadsetOutline,
    title: "24/7 Dedicated Support",
    subtitle: "Continuous Maintenance & SLA",
    desc: "Dedicated post-launch support, monthly maintenance, and free upgrades for contract clients.",
    fullOverview:
      "Our partnership continues long after go-live. You receive an assigned technical account manager, SLA-backed response times, daily automated cloud backups, security patching, and ongoing software enhancements so your ERP platform continuously scales alongside your company's expansion.",
    deliverables: [
      "Dedicated WhatsApp / hotline support desk with guaranteed SLA response",
      "Automated daily offsite cloud backups & proactive disaster recovery",
      "Quarterly performance audits & database optimization reviews",
      "Continuous feature updates and compatibility enhancements",
    ],
    stakeholders: "Dedicated Support Engineers, SysAdmin, Client Account Manager",
    milestone: "Ongoing 99.9% Cloud Uptime SLA Guarantee",
    color: "#0EA5E9",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    tags: ["24/7 Helpdesk", "Free Updates", "SLA Guarantee"],
    days: "Ongoing",
    yShift: 0,
  },
];

/* ─────────────────────────────────────────────────────────────
   Animated SVG Connector (zigzag arrow between cards)
───────────────────────────────────────────────────────────── */
function ZigzagArrow({ fromY, toY, color, delay = 0, inView }) {
  const goingDown = toY > fromY;

  return (
    <div
      className="hidden lg:flex flex-1 items-start justify-center min-w-[20px] max-w-[85px] h-[160px] shrink"
      style={{ marginTop: `${Math.min(fromY, toY)}px` }}
    >
      <svg
        viewBox="0 0 60 160"
        fill="none"
        className="w-full h-full max-w-[60px]"
        style={{ overflow: "visible" }}
      >
        {/* Background faint track */}
        <path
          d={goingDown ? "M 4 20 C 30 20, 30 140, 56 140" : "M 4 140 C 30 140, 30 20, 56 20"}
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.15"
          strokeDasharray="4 4"
        />

        {/* Animated stroke */}
        <motion.path
          d={goingDown ? "M 4 20 C 30 20, 30 140, 56 140" : "M 4 140 C 30 140, 30 20, 56 20"}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="140 140"
          initial={{ strokeDashoffset: 140, opacity: 0 }}
          animate={inView ? { strokeDashoffset: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.3, ease: "easeInOut" }}
          fill="none"
        />

        {/* Animated arrowhead dot */}
        <motion.circle
          cx="56"
          cy={goingDown ? "140" : "20"}
          r="4"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.95 }}
        />
        {/* Pulse ring on arrowhead */}
        <motion.circle
          cx="56"
          cy={goingDown ? "140" : "20"}
          r="8"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.95, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Step Card (Center Aligned Approach with Interactive Modal Trigger)
───────────────────────────────────────────────────────────── */
function StepCard({ step, index, isActive, onHover, onClick, inView }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: step.yShift > 0 ? 40 : -40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      className="shrink-0 w-[172px] xl:w-[195px] 2xl:w-[215px]"
      style={{ marginTop: `${step.yShift}px`, marginBottom: `${step.yShift > 0 ? 0 : 72}px` }}
    >
      <motion.div
        onClick={() => onClick(step)}
        animate={{
          boxShadow: isActive
            ? `0 16px 40px ${step.color}25, 0 0 0 2px ${step.color}50`
            : `0 2px 12px rgba(0,0,0,0.06), 0 0 0 1.5px ${step.border}`,
          y: isActive ? -6 : 0,
        }}
        transition={{ duration: 0.25 }}
        className="relative rounded-2xl bg-white overflow-hidden cursor-pointer group/card hover:border-slate-300"
      >
        {/* Top accent bar — animates width in */}
        <motion.div
          className="h-1.5 w-full"
          style={{ background: step.color }}
          initial={{ scaleX: 0, transformOrigin: "center" }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.13 + 0.2 }}
        />

        <div className="p-4 flex flex-col items-center text-center">
          {/* Phase icon + floating badge */}
          <div className="relative mb-3 mt-1">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs"
              style={{ background: step.bg }}
              animate={isActive ? { rotate: [0, -8, 8, 0], scale: 1.08 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Icon size={24} style={{ color: step.color }} />
            </motion.div>
            <span
              className="absolute -top-1.5 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-black border bg-white shadow-xs tabular-nums"
              style={{ borderColor: step.border, color: step.color }}
            >
              {step.id}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-black text-slate-900 text-sm xl:text-base leading-snug mb-0.5 text-center min-h-[38px] flex items-center justify-center">
            {step.title}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 mb-2 leading-tight text-center uppercase tracking-wider">
            {step.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-[1.55] mb-3 text-center line-clamp-3">
            {step.desc}
          </p>

          {/* Tags (centered flex) */}
          <div className="flex flex-wrap items-center justify-center gap-1 mb-2.5">
            {step.tags.slice(0, 2).map((tag) => (
              <motion.span
                key={tag}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full text-center"
                style={{ background: step.bg, color: step.color }}
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Duration badge (centered) */}
          <div
            className="inline-flex items-center justify-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-full mx-auto"
            style={{ background: step.bg, color: step.color }}
          >
            <IoTimeOutline size={12} />
            <span>{step.days}</span>
          </div>

          {/* Action prompt */}
          <div className="w-full mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-600 group-hover/card:text-emerald-700">
            <span>View Details</span>
            <IoArrowForwardOutline size={11} className="transition-transform group-hover/card:translate-x-0.5" />
          </div>
        </div>

        {/* Active glow overlay */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${step.color}10 0%, transparent 70%)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mobile Vertical Step (compact with Modal Trigger)
───────────────────────────────────────────────────────────── */
function MobileStep({ step, index, onClick, inView }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="relative pl-14"
    >
      {index < STEPS.length - 1 && (
        <motion.div
          className="absolute left-5 top-10 w-0.5"
          style={{ background: `linear-gradient(to bottom, ${step.color}, ${STEPS[index + 1].color})` }}
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: "calc(100% + 16px)", opacity: 0.3 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        />
      )}

      <div
        className="absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: step.bg }}
      >
        <Icon size={20} style={{ color: step.color }} />
      </div>

      <div
        onClick={() => onClick(step)}
        className="rounded-xl border bg-white p-4 shadow-xs cursor-pointer active:scale-[0.99] transition-all hover:shadow-md"
        style={{ borderColor: step.border }}
      >
        <div className="flex items-start justify-between mb-1">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest mr-1" style={{ color: step.color }}>
              Phase {step.id} • {step.subtitle}
            </span>
            <h3 className="font-black text-slate-900 text-sm leading-tight mt-0.5">
              {step.title}
            </h3>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2" style={{ background: step.bg, color: step.color }}>
            {step.days}
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-[1.5] mt-1">{step.desc}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {step.tags.map((t) => (
            <span key={t} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: step.bg, color: step.color }}>{t}</span>
          ))}
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-600">
          <span>Click to view phase deliverables &amp; specs</span>
          <IoArrowForwardOutline size={12} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Phase Detail Modal Component
───────────────────────────────────────────────────────────── */
function PhaseDetailModal({ step, onClose, onSelectStep, allSteps, locale }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const idx = allSteps.findIndex((s) => s.id === step.id);
        const prev = (idx - 1 + allSteps.length) % allSteps.length;
        onSelectStep(allSteps[prev]);
      }
      if (e.key === "ArrowRight") {
        const idx = allSteps.findIndex((s) => s.id === step.id);
        const next = (idx + 1) % allSteps.length;
        onSelectStep(allSteps[next]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step, onClose, onSelectStep, allSteps]);

  const currentIndex = allSteps.findIndex((s) => s.id === step.id);
  const prevStep = allSteps[(currentIndex - 1 + allSteps.length) % allSteps.length];
  const nextStep = allSteps[(currentIndex + 1) % allSteps.length];
  const Icon = step.icon;

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-slate-950/65 isolate"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col my-auto max-h-[92vh] transform-gpu"
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full shrink-0" style={{ background: step.color }} />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-xs shrink-0"
              style={{ background: step.bg }}
            >
              <Icon size={26} style={{ color: step.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider"
                  style={{ background: step.bg, color: step.color }}
                >
                  Phase {step.id} of 05
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  <IoTimeOutline size={12} className="text-slate-400" />
                  <span>{step.days}</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {step.title}
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {step.subtitle}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
          {/* Comprehensive Overview */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: step.color }} />
              <span>Phase Mission &amp; Overview</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {step.fullOverview}
            </p>
          </div>

          {/* Core Deliverables Card */}
          <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <IoDocumentTextOutline size={15} className="text-emerald-600" />
              <span>Core Deliverables &amp; Engineering Scope</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {step.deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <IoCheckmarkCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stakeholders & Milestone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 mb-1">
                <IoPeopleOutline size={15} className="text-indigo-600" />
                <span>Key Stakeholders</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                {step.stakeholders}
              </p>
            </div>

            <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 mb-1">
                <IoCheckmarkCircle size={15} className="text-emerald-600" />
                <span>Milestone Sign-Off</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                {step.milestone}
              </p>
            </div>
          </div>

          {/* Focus Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Focus Areas:</span>
            {step.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg"
                style={{ background: step.bg, color: step.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Phase Stepper Prev/Next */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => onSelectStep(prevStep)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer"
            >
              <IoChevronBackOutline size={13} />
              <span>Phase {prevStep.id}</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              {step.id} / 05
            </span>

            <button
              onClick={() => onSelectStep(nextStep)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer"
            >
              <span>Phase {nextStep.id}</span>
              <IoChevronForwardOutline size={13} />
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer flex-1 sm:flex-initial"
            >
              Close
            </button>

            <Link
              href={`/${locale}/contact`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm flex-1 sm:flex-initial"
            >
              <span>Discuss ERP Project</span>
              <IoArrowForwardOutline size={12} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function ERPImplementationProcess() {
  const locale = useLocale();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <section
      ref={sectionRef}
      id="erp-process"
      className="relative w-full overflow-hidden bg-white py-10 sm:py-14 md:py-16 border-b border-slate-200/80 font-sans"
    >
      <div className="container-custom relative z-10">

        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-6 sm:mb-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-widest rounded-full mb-2 shadow-xs">
            <IoCodeSlashOutline className="text-emerald-600" size={12} />
            <span>End-to-End ERP Delivery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.15] tracking-tight mb-2">
            How We Implement{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">
              Your ERP System
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-[1.6]">
            From your first consultation to post-launch support — a structured
            5-phase process that ensures zero disruption and 100% adoption.
          </p>
        </motion.div>

        {/* ── DESKTOP ZIGZAG STAGE (Aligned horizontally with navbar container) ── */}
        <div
          ref={stageRef}
          className="hidden lg:block w-full"
        >
          <div
            className="w-full flex items-start justify-between"
            style={{
              paddingTop: "16px",
              paddingBottom: "80px",
            }}
          >
            {STEPS.map((step, i) => (
              <Fragment key={step.id}>
                <StepCard
                  step={step}
                  index={i}
                  isActive={hoveredIndex === i}
                  onHover={setHoveredIndex}
                  onClick={setSelectedStep}
                  inView={inView}
                />

                {/* Connector arrow to next card */}
                {i < STEPS.length - 1 && (
                  <ZigzagArrow
                    fromY={step.yShift}
                    toY={STEPS[i + 1].yShift}
                    color={step.color}
                    delay={i * 0.13}
                    inView={inView}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Progress dots for desktop */}
        <div className="hidden lg:flex items-center justify-center gap-2 mt-2 mb-6">
          {STEPS.map((step, i) => (
            <motion.button
              key={step.id}
              onClick={() => setSelectedStep(step)}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
              title={`Click to view details for Phase ${step.id}: ${step.title}`}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: hoveredIndex === i ? 28 : 8,
                  height: 8,
                  background: step.color,
                  opacity: hoveredIndex === i ? 1 : 0.35,
                }}
                transition={{ duration: 0.25 }}
              />
              <span
                className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: step.color }}
              >
                {step.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── MOBILE VERTICAL LIST ── */}
        <div className="lg:hidden flex flex-col gap-4 max-w-xl mx-auto">
          {STEPS.map((step, i) => (
            <MobileStep
              key={step.id}
              step={step}
              index={i}
              onClick={setSelectedStep}
              inView={inView}
            />
          ))}
        </div>

        {/* ── FOOTER CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-4 sm:mt-6 text-center"
        >
          <p className="text-xs text-slate-500 mb-2.5 font-medium">
            Ready to transform your business operations with a custom ERP?
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>Get Free ERP Consultation</span>
            <IoArrowForwardOutline
              size={14}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* ── PHASE DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedStep && (
          <PhaseDetailModal
            step={selectedStep}
            onClose={() => setSelectedStep(null)}
            onSelectStep={setSelectedStep}
            allSteps={STEPS}
            locale={locale}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
