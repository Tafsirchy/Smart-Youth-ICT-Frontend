"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { getApiBaseUrl } from "@/lib/api-base";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import {
 motion,
 AnimatePresence,
 useScroll,
 useMotionValueEvent,
} from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import MobileMenu from "./MobileMenu";

/* ─── ABOUT MEGA MENU ─────────────────────────────────────────────── */
export const aboutColumns = [
  {
    id: "foundation",
    heading: "Overview",
    icon: "🧭",
    iconTheme: "bg-emerald-100 text-emerald-600",
    items: [
      { label: "Our Story", href: "/about/story", desc: "How we started" },
      { label: "Mission & Vision", href: "/about/mission", desc: "Our goal & purpose" },
      {
        label: "How It Works",
        href: "/about/how-it-works",
        desc: "Step-by-step roadmap",
      },
      {
        label: "Why Choose Us",
        href: "/about/why-choose-us",
        desc: "Our unique edge",
      },
    ],
  },
  {
    id: "people",
    heading: "Leadership & Team",
    icon: "🤝",
    iconTheme: "bg-blue-100 text-blue-600",
    items: [
      {
        label: "Core Management",
        href: "/about/core-management",
        desc: "Executive leaders",
      },
      {
        label: "Advisory Board",
        href: "/about/advisor",
        desc: "Strategic guidance",
      },
      {
        label: "Our Mentors",
        href: "/about/instructors",
        desc: "Industry experts",
      },
    ],
  },
  {
    id: "impact",
    heading: "Impact & Stories",
    icon: "🏆",
    iconTheme: "bg-purple-100 text-purple-600",
    items: [
      {
        label: "Success Stories",
        href: "/success-stories",
        desc: "Student wins & career shifts",
      },
      {
        label: "Testimonials",
        href: "/testimonials",
        desc: "Reviews & video proof",
      },
      {
        label: "Certifications",
        href: "/about/certifications",
        desc: "Official proof & licenses",
      },
    ],
  },
  {
    id: "connect",
    heading: "Network & Connect",
    icon: "📍",
    iconTheme: "bg-pink-100 text-pink-600",
    items: [
      {
        label: "Partnership & Membership",
        href: "/about/partnership-membership",
        desc: "Affiliations & network",
      },
      {
        label: "Our Campuses",
        href: "/branches",
        desc: "13 physical hubs",
      },
      {
        label: "Contact Us",
        href: "/contact",
        desc: "Get in touch & counseling",
      },
      {
        label: "Blog & Updates",
        href: "/blog",
        desc: "Tech news & guides",
      },
    ],
  },
];

/* ─── SERVICES MEGA MENU ─────────────────────────────────────────── */
export const serviceColumns = [
 {
 id: "learn",
 heading: "Learning & Career",
 iconTheme: "bg-pink-100 text-pink-600",
 icon: "🎓",
 items: [
 {
 label: "Free Career Seminar",
 href: "/seminar",
 badge: "🆓 Free",
 },
 {
 label: "Skill Development Programs",
 href: "/services/skill-development",
 badge: "🔥 Popular ",
 },
 {
 label: "Career Tracks (Web, AI, SMM)",
 href: "/services/career-tracks",
 },
 { label: "Certification Programs", href: "/services/certifications" },
 { label: "Freelancing Training", href: "/services/freelancing" },
 { label: "Job Placement Support", href: "/services/job-placement" },
 ],
 price: "", // Removed for compact version
 },
 {
 id: "web",
 heading: "Web & Software",
 iconTheme: "bg-blue-100 text-blue-600",
 icon: "💻",
 items: [
 { label: "Portfolio Websites", href: "/services/portfolio-websites" },
 {
 label: "Business Websites",
 href: "/services/business-websites",
 badge: "⭐ Popular ",
 },
 { label: "E-commerce Development", href: "/services/ecommerce" },
 { label: "Custom Web Applications", href: "/services/custom-apps" },
 { label: "ERP / CRM / POS Systems", href: "/services/erp-crm" },
 ],
 price: "", // Removed for compact version
 },
 {
 id: "design",
 heading: "Design & Marketing",
 iconTheme: "bg-purple-100 text-purple-600",
 icon: "🎨",
 items: [
 { label: "Logo & Brand Identity", href: "/services/branding" },
 { label: "UI/UX Design", href: "/services/ui-ux" },
 { label: "Social Media Creatives", href: "/services/social-creatives" },
 { label: "Facebook Ads Management", href: "/services/facebook-ads" },
 { label: "SEO Optimization", href: "/services/seo" },
 ],
 price: "", // Removed for compact version
 },
 {
 id: "ai",
 heading: "AI & Managed",
 iconTheme: "bg-emerald-100 text-emerald-600",
 icon: "🤖",
 items: [
 {
 label: "Chatbot Development",
 href: "/services/chatbot",
 badge: "✨ New ",
 },
 {
 label: "Business Automation",
 href: "/services/automation",
 badge: "✨ New ",
 },
 { label: "Domain & Hosting", href: "/services/hosting" },
 { label: "Website Maintenance", href: "/services/maintenance" },
 {
 label: "Hire a Student (Freelancer)",
 href: "/services/hire-student",
 badge: "🔥 Popular ",
 },
 ],
 price: "", // Removed for compact version
 },
];

export const BRANCH_DIVISIONS = [
  { name: 'All Divisions', division: 'All', count: 13, desc: 'View all 13 nationwide campuses' },
  { name: 'Dhaka', division: 'Dhaka', count: 3, desc: 'Corporate HQ, Mirpur, Gazipur' },
  { name: 'Rajshahi', division: 'Rajshahi', count: 1, desc: 'Bogura City Campus' },
  { name: 'Chittagong', division: 'Chittagong', count: 1, desc: 'Agrabad, Chattagram' },
  { name: 'Other', division: 'Other', count: 1, desc: 'Kutubpur, Cumilla Campus' },
  { name: 'Khulna', division: 'Khulna', count: 1, desc: 'Jashore / Khulna Hub' },
  { name: 'Mymensingh', division: 'Mymensingh', count: 3, desc: 'Fulbaria, Netrakona, Sherpur' },
  { name: 'Rangpur', division: 'Rangpur', count: 3, desc: 'Rangpur Metropolitan & Hubs' },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
];

/* ─── MAIN NAVBAR ─────────────────────────────────────────────────── */
export default function Navbar() {
 const { data: session } = useSession();
 const pathname = usePathname();
 const router = useRouter();
 const [mobileOpen, setMobileOpen] = useState(false);
 const [hidden, setHidden] = useState(false);
 const { scrollY } = useScroll();

 const { data: globalMessage } = useQuery({
 queryKey: queryKeys.globalMessage(),
 queryFn: async () => {
 try {
 const res = await api.get("/cms/settings/globalMessage");
 return res.data?.data || null;
 } catch (e) {
 return null;
 }
 },
 staleTime: 0,
 refetchOnWindowFocus: true,
 });
  const { data: publicBranches = [] } = useQuery({
    queryKey: ['public-branches-directory'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${getApiBaseUrl()}/branches/public/all`);
        return res.data?.data || [];
      } catch (e) {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const branchDivisions = useMemo(() => {
    if (!publicBranches || publicBranches.length === 0) {
      return BRANCH_DIVISIONS;
    }
    const counts = {};
    const divisionSubtitles = {
      Dhaka: 'Corporate HQ, Mirpur, Gazipur',
      Rajshahi: 'Bogura City Campus',
      Chittagong: 'Agrabad, Chattagram',
      Chattogram: 'Agrabad, Chattagram',
      Khulna: 'Jashore / Khulna Hub',
      Mymensingh: 'Fulbaria, Netrakona, Sherpur',
      Rangpur: 'Rangpur Metropolitan & Hubs',
      Barisal: 'Barisal Regional Hub',
      Sylhet: 'Sylhet Regional Hub',
      Other: 'Kutubpur, Cumilla Campus',
    };

    publicBranches.forEach((b) => {
      const div = b.division || 'Other';
      counts[div] = (counts[div] || 0) + 1;
    });

    return [
      {
        name: 'All Divisions',
        division: 'All',
        count: publicBranches.length,
        desc: `View all ${publicBranches.length} nationwide campuses`,
      },
      ...Object.entries(counts).map(([div, count]) => ({
        name: div,
        division: div,
        count,
        desc: divisionSubtitles[div] || `${count} campus${count > 1 ? 'es' : ''} in ${div}`,
      })),
    ];
  }, [publicBranches]);


 const localeMatch = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(?=\/|$)/);
 const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";

 // Unified Dropdown State Orchestrator
 const [activeDropdown, setActiveDropdown] = useState(null);
 const dropdownTimer = useRef(null);
 const prefetchedRoutes = useRef(new Set());

 useMotionValueEvent(scrollY, "change", (latest) => {
 if (mobileOpen) return;
 const previous = scrollY.getPrevious();
 if (latest > 50 && latest > previous) {
 setHidden(true);
 setActiveDropdown(null);
 } else {
 setHidden(false);
 }
 });

 const cleanPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, "");
 const isActive = (href) =>
 cleanPath === href || (href !== "/" && cleanPath.startsWith(href));

 // Flag for Home navigation to help the loader decide which UI to show
 const handleHomeClick = () => {
 if (typeof window !== "undefined") {
 window.__isNavigatingToHome = true;
 // Reset flag after a delay so it doesn't affect subsequent navigations
 setTimeout(() => {
 window.__isNavigatingToHome = false;
 }, 1000);
 }
 handleMouseEnter(null);
 };

 const handleMouseEnter = (menu) => {
 clearTimeout(dropdownTimer.current);

 if (menu === "services") {
 prefetchRoutes([
 "/services",
 ...serviceColumns.flatMap((col) => col.items.map((item) => item.href)),
 ]);
 }

 if (menu === "about") {
 prefetchRoutes(
 aboutColumns.flatMap((col) => col.items.map((item) => item.href)),
 );
 }

 setActiveDropdown(menu);
 };
 const handleMouseLeave = () => {
 dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 250);
 };

 const prefetchRoutes = (routes) => {
 routes.forEach((href) => {
 if (prefetchedRoutes.current.has(href)) return;
 prefetchedRoutes.current.add(href);
 router.prefetch(href);
 });
 };

 useEffect(() => {
 // Warm up the most common navigation targets so first click is faster.
 prefetchRoutes([
 ...navLinks.map((item) => item.href),
 "/seminar",
 "/services",
 "/about",
 "/about/partnership-membership",
 "/login",
 "/register",
 ]);
 }, []);

 useEffect(() => {
 if (mobileOpen) {
 document.body.style.overflow = "hidden";
 document.body.style.height = "100%";
 document.documentElement.style.overflow = "hidden";
 document.documentElement.style.height = "100%";
 } else {
 document.body.style.overflow = "";
 document.body.style.height = "";
 document.documentElement.style.overflow = "";
 document.documentElement.style.height = "";
 }
 return () => {
 document.body.style.overflow = "";
 document.body.style.height = "";
 document.documentElement.style.overflow = "";
 document.documentElement.style.height = "";
 };
 }, [mobileOpen]);

 return (
 <motion.header
 className="bg-white shadow-sm fixed top-0 left-0 right-0 w-full z-[100]"
 style={{ minHeight: "var(--navbar-height)" }}
 variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
 animate={hidden ? "hidden" : "visible"}
 transition={{ duration: 0.35, ease: "easeInOut" }}
 >
 {/* ── Announcement Banner ── */}
 <AnimatePresence>
 {globalMessage && (!Array.isArray(globalMessage) || globalMessage.length > 0) && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white w-full overflow-hidden relative"
 >
 <style>{`
 @keyframes marquee {
 0% { transform: translateX(100vw); }
 100% { transform: translateX(-100%); }
 }
 .animate-marquee {
 display: inline-flex;
 white-space: nowrap;
 animation: marquee 30s linear infinite;
 }
 .animate-marquee:hover {
 animation-play-state: paused;
 }
 `}</style>

 <div className="py-2 flex items-center overflow-hidden whitespace-nowrap group">
 <div className="animate-marquee w-full min-w-full">
 {(Array.isArray(globalMessage) ? globalMessage : globalMessage.split('\n').filter(Boolean).map((msg, i) => ({ id: i, text: msg.trim(), type: 'general' }))).map((msg) => (
 <span key={msg.id} className="text-xs sm:text-sm font-bold tracking-wide mx-8 inline-flex items-center gap-2">
 <span className="animate-pulse text-green-200">
 {msg.type === 'hiring' ? '💼' : msg.type === 'holiday' ? '🎉' : msg.type === 'warning' ? '⚠️' : '✨'}
 </span>
 {msg.text}
 <span className="animate-pulse text-green-200">
 {msg.type === 'hiring' ? '💼' : msg.type === 'holiday' ? '🎉' : msg.type === 'warning' ? '⚠️' : '✨'}
 </span>
 </span>
 ))}
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 <nav className="container-custom relative flex items-center justify-between h-[var(--navbar-height)]">
 {/* Logo */}
 <Link
 href="/"
 id="nav-logo"
 className="flex items-center gap-2"
 onClick={handleHomeClick}
 onMouseEnter={() => handleMouseEnter(null)}
 >
 <motion.div
 whileHover={{ scale: 1.05 }}
 transition={{ type: "spring", stiffness: 400, damping: 15 }}
 >
 <Image
 src="/images/logo.png"
 alt="Smart Youth ICT Logo"
 width={240}
 height={60}
 priority={true}
 fetchPriority="high"
 className="h-16 w-auto object-contain rounded-md"
 onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}

 decoding="async" />
 </motion.div>
 </Link>

 {/* Desktop links */}
 <ul className="hidden md:flex items-center gap-1.5 lg:gap-3 xl:gap-4">
 {navLinks.map(({ href, label }, i) => (
 <motion.li
 key={href}
 initial={{ opacity: 0, y: -8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.05 * i + 0.1 }}
 >
 <Link
 href={href}
 onClick={
 href === "/" ? handleHomeClick : () => handleMouseEnter(null)
 }
 onMouseEnter={() => {
 handleMouseEnter(null);
 prefetchRoutes([href]);
 }}
 className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all ${isActive(href)
 ? "text-brand-green bg-brand-green/10 font-semibold"
 : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
 }`}
 >
 {label}
 </Link>
 </motion.li>
 ))}

 {/* Branches Trigger with Divisions Dropdown */}
        <motion.li
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative"
        >
          <button
            onMouseEnter={() => handleMouseEnter("branches")}
            onClick={() => setActiveDropdown(activeDropdown === "branches" ? null : "branches")}
            onMouseLeave={handleMouseLeave}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
              isActive("/branches") || activeDropdown === "branches"
                ? "text-brand-green bg-brand-green/10 font-bold"
                : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
            }`}
          >
            Branches
            <motion.span
              animate={{ rotate: activeDropdown === "branches" ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <HiChevronDown size={14} />
            </motion.span>
          </button>

          {/* Branches Divisions Dropdown */}
          <AnimatePresence>
            {activeDropdown === "branches" && (
              <motion.div
                onMouseEnter={() => handleMouseEnter("branches")}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.15 } }}
                style={{ backgroundColor: "#ffffff" }}
                className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 w-[340px] sm:w-[480px] md:w-[540px] !bg-white shadow-2xl border border-slate-200/90 overflow-hidden z-50 origin-top before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-[''] mt-1"
              >
                {/* Header */}
                <div className="!bg-white px-5 py-3.5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🏢</span>
                    <div>
                      <p className="text-slate-900 text-xs font-black uppercase tracking-wider">
                        Campuses by Division
                      </p>
                      <p className="text-[10px] text-slate-400">{(publicBranches && publicBranches.length) ? publicBranches.length : 13} physical hubs across Bangladesh</p>
                    </div>
                  </div>
                  <Link
                    href="/branches"
                    onClick={() => setActiveDropdown(null)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    All Campuses ({(publicBranches && publicBranches.length) ? publicBranches.length : 13}) →
                  </Link>
                </div>

                {/* Division Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-3 !bg-white">
                  {branchDivisions.map((div) => {
                    const isAll = div.division === 'All';
                    const href = isAll ? '/branches' : `/branches?division=${encodeURIComponent(div.division)}`;
                    return (
                      <Link
                        key={div.division}
                        href={href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 transition-colors group/div"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 group-hover/div:text-blue-600 transition-colors">
                              {div.name}
                            </span>
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-extrabold">
                              {div.count}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{div.desc}</p>
                        </div>
                        <span className="text-slate-300 group-hover/div:text-blue-600 group-hover/div:translate-x-0.5 transition-all text-xs">
                          →
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom Banner */}
                <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Walk-in admission & counselor desks</span>
                  <Link
                    href="/branches"
                    onClick={() => setActiveDropdown(null)}
                    className="text-xs font-bold text-slate-900 hover:text-blue-600"
                  >
                    Explore Map & Labs
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>

        {/* Services Trigger */}
 <motion.li
 initial={{ opacity: 0, y: -8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 className="static"
 >
 <button
 onMouseEnter={() => handleMouseEnter("services")}
 onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
 onMouseLeave={handleMouseLeave}
 className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${isActive("/services") || activeDropdown === "services"
 ? "text-brand-green bg-brand-green/10 font-semibold"
 : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
 }`}
 >
 Services
 <motion.span
 animate={{ rotate: activeDropdown === "services" ? 180 : 0 }}
 transition={{ duration: 0.2 }}
 >
 <HiChevronDown size={14} />
 </motion.span>
 </button>
 </motion.li>

 {/* About Trigger */}
 <motion.li
 initial={{ opacity: 0, y: -8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.45 }}
 className="static"
 >
 <button
 onMouseEnter={() => handleMouseEnter("about")}
 onClick={() => setActiveDropdown(activeDropdown === "about" ? null : "about")}
 onMouseLeave={handleMouseLeave}
 className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all ${isActive("/about") || isActive("/success-stories") || isActive("/contact") || activeDropdown === "about"
 ? "text-brand-green bg-brand-green/10 font-semibold"
 : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
 }`}
 >
 About
 <motion.span
 animate={{ rotate: activeDropdown === "about" ? 180 : 0 }}
 transition={{ duration: 0.2 }}
 >
 <HiChevronDown size={14} />
 </motion.span>
 </button>

 {/* Upgrade: About Mega Menu Overlay */}
          <AnimatePresence>
            {activeDropdown === "about" && (
              <motion.div
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.98,
                  transition: { duration: 0.15 },
                }}
                className="absolute top-full right-4 2xl:right-0 w-full max-w-[840px] !bg-white shadow-2xl border border-slate-200/90 overflow-hidden z-50 origin-top-right before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-['']"
              >
                {/* Minimalist Editorial Top Bar */}
                <div className="!bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl leading-none">📖</span>
                    <p className="text-slate-900 text-sm font-black uppercase tracking-[0.15em] leading-[1.4]">
                      About Smart Youth ICT
                    </p>
                  </div>
                </div>

                {/* 4-column minimal grid */}
                <div className="grid grid-cols-4 gap-1.5 p-2 !bg-white">
                  {aboutColumns.map((col) => (
                    <div
                      key={col.heading}
                      className="px-2.5 py-2 hover:bg-slate-50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-6 h-6 bg-brand-pink/10 text-brand-pink flex items-center justify-center shrink-0">
                          <span className="text-xs leading-none">{col.icon}</span>
                        </div>
                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-[1.4]">
                          {col.heading}
                        </p>
                      </div>
                      <ul className="space-y-0.5">
                        {col.items.map((item) => {
                          const isItemActive = cleanPath === item.href;
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="flex flex-col gap-0.5 px-2.5 py-1.5 -mx-2.5 hover:bg-white hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group/item transition-all"
                              >
                                <span
                                  className={`text-xs font-bold transition-all transform group-hover/item:translate-x-1 leading-[1.4] ${isItemActive ? "text-brand-pink" : "text-slate-700 group-hover/item:text-brand-pink"}`}
                                >
                                  {item.label}
                                </span>
                                <span className="text-[10px] text-slate-400 group-hover/item:text-slate-500 transition-colors transform group-hover/item:translate-x-1 leading-[1.4]">
                                  {item.desc}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Trust Badge / Footer */}
                <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 flex items-center justify-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic leading-[1.4]">
                    From Learning to Earning • Built for Real-World Skills
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
 </motion.li>

 
 </ul>

 {/* CTA / Auth */}
 <motion.div
 className="hidden md:flex items-center gap-2.5 lg:gap-3"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.3 }}
 onMouseEnter={() => handleMouseEnter(null)}
 >
 {session ? (
 <div className="flex items-center gap-3">
 <motion.div
 whileHover={{ scale: 1.04 }}
 whileTap={{ scale: 0.96 }}
 >
 {(() => {
 const role = session?.user?.role || "student";
 const branchId = session?.user?.branchId || "BR1";
 const redirectMap = {
 admin: "admin",
 instructor: "instructor",
 student: "student",
 branch_admin: "admin",
 };
 const dashboardPath = redirectMap[role] || "student";
 return (
 <Link
 href={`${localePrefix}/${branchId}/${dashboardPath}`}
 id="nav-dashboard"
 className="btn-primary text-sm px-4 py-2"
 >
 Dashboard
 </Link>
 );
 })()}
 </motion.div>
 <button
 onClick={() =>
 import("next-auth/react").then(({ signOut }) =>
 signOut({ callbackUrl: "/" }),
 )
 }
 className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 px-3 py-2"
 >
 Sign Out
 </button>
 </div>
 ) : (
 <>
 <Link
 href="/login"
 id="nav-login"
 onMouseEnter={() => prefetchRoutes(["/login"])}
 className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
 >
 Sign In
 </Link>
 <motion.div
 whileHover={{ scale: 1.04 }}
 whileTap={{ scale: 0.96 }}
 >
 <Link
 href="/register"
 id="nav-register"
 onMouseEnter={() => prefetchRoutes(["/register"])}
 className="btn-primary text-sm px-4 py-2"
 >
 Enroll Now
 </Link>
 </motion.div>
 </>
 )}
 </motion.div>

 {/* Mobile hamburger */}
 <motion.button
 id="nav-mobile-toggle"
 className="md:hidden text-gray-800 p-0 min-h-[44px] min-w-[44px] flex items-center justify-end rounded-md"
 onClick={() => {
 setMobileOpen(!mobileOpen);
 setHidden(false);
 }}
 aria-label="Toggle menu"
 whileTap={{ scale: 0.85 }}
 >
 <AnimatePresence mode="wait" initial={false}>
 {mobileOpen ? (
 <motion.span
 key="x"
 initial={{ rotate: -90, opacity: 0 }}
 animate={{ rotate: 0, opacity: 1 }}
 exit={{ rotate: 90, opacity: 0 }}
 transition={{ duration: 0.2 }}
 >
 <HiX size={24} />
 </motion.span>
 ) : (
 <motion.span
 key="menu"
 initial={{ rotate: 90, opacity: 0 }}
 animate={{ rotate: 0, opacity: 1 }}
 exit={{ rotate: -90, opacity: 0 }}
 transition={{ duration: 0.2 }}
 >
 <HiMenu size={24} />
 </motion.span>
 )}
 </AnimatePresence>
 </motion.button>

 {/* ─── 900px MEGA MENU OVERLAY (Services) ─── */}
          <AnimatePresence>
            {activeDropdown === "services" && (
              <motion.div
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.98,
                  transition: { duration: 0.15 },
                }}
                className="absolute top-[100%] right-4 2xl:right-0 w-full max-w-[800px] bg-white shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right"
              >
                {/* Minimalist Editorial Top Bar */}
                <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl leading-none">💡</span>
                    <p className="text-slate-900 text-sm font-black uppercase tracking-[0.15em] leading-[1.4]">
                      Our Expert Services
                    </p>
                  </div>
                  <Link
                    href="/services"
                    className="text-brand-pink text-xs font-bold hover:text-rose-500 transition-colors flex items-center gap-1 group/link leading-[1.4]"
                  >
                    View full catalog <span className="transition-transform group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>

                {/* 4-column minimal grid */}
                <div className="grid grid-cols-4 gap-1.5 p-2 bg-white">
                  {serviceColumns.map((col) => (
                    <div
                      key={col.heading}
                      className="px-2.5 py-2 hover:bg-slate-50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-6 h-6 bg-brand-pink/10 text-brand-pink flex items-center justify-center shrink-0">
                          <span className="text-xs leading-none">{col.icon}</span>
                        </div>
                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-[1.4]">
                          {col.heading}
                        </p>
                      </div>
                      <div>
                        <ul className="space-y-0.5">
                          {col.items.map((item) => {
                            const isItemActive = cleanPath === item.href;
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="flex items-center justify-between gap-1 px-2.5 py-1.5 -mx-2 hover:bg-white hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group/item transition-all"
                                >
                                  <span
                                    className={`text-xs font-bold transition-all transform group-hover/item:translate-x-1 leading-[1.4] ${isItemActive ? "text-brand-pink" : "text-slate-700 group-hover/item:text-brand-pink"}`}
                                  >
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="shrink-0 text-[10px] font-black text-rose-500 bg-rose-50 px-1 py-0.5 uppercase tracking-wider transition-all transform group-hover/item:-translate-x-1 leading-none">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">💬</span>
                    <p className="text-xs text-slate-600 font-medium leading-[1.4]">
                      Not sure what you need?{" "}
                      <strong className="text-slate-900 border-b border-slate-300 pb-0.5 ml-1">
                        Let's talk to our experts.
                      </strong>
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="text-[11px] font-black text-slate-900 border border-slate-200 hover:border-brand-pink hover:text-brand-pink px-3 py-1 transition-colors flex items-center gap-1.5 leading-[1.4]"
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
 </nav>

 {/* Mobile menu slide-down */}
 <AnimatePresence>
 {mobileOpen && (
 <motion.div
 key="mobile-menu"
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3, ease: "easeInOut" }}
 className="max-h-[calc(100dvh-80px)] overflow-y-auto overscroll-y-contain custom-scrollbar"
 style={{ overflowX: "hidden" }}
 >
 <MobileMenu
 links={navLinks}
            session={session}
            branchDivisions={branchDivisions}
            onClose={() => setMobileOpen(false)}
 />
 </motion.div>
 )}
 </AnimatePresence>
 </motion.header>
 );
}
