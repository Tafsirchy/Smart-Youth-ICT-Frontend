"use client";

import { useState, useRef, useEffect } from "react";
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
      { label: "Mission & Vision", href: "/about/mission", desc: "Our goal" },
      {
        label: "How It Works",
        href: "/about/how-it-works",
        desc: "Step-by-step",
      },
    ],
  },
  {
    id: "trust",
    heading: "Trust & Proof",
    icon: "🤝",
    iconTheme: "bg-blue-100 text-blue-600",
    items: [
      {
        label: "Core Management",
        href: "/about/core-management",
        desc: "Our leadership",
      },
      {
        label: "Advisory Board",
        href: "/about/advisor",
        desc: "Expert guidance",
      },
      {
        label: "Our Mentors",
        href: "/about/instructors",
        desc: "Industry experts",
      },
      {
        label: "Success Stories",
        href: "/success-stories",
        desc: "Student wins",
      },
      { label: "Testimonials", href: "/testimonials", desc: "What they say" },
    ],
  },
  {
    id: "brand",
    heading: "Brand & Edge",
    icon: "🚀",
    iconTheme: "bg-purple-100 text-purple-600",
    items: [
      {
        label: "Why Choose Us",
        href: "/about/why-choose-us",
        desc: "Our unique edge",
      },
      {
        label: "Our Partners",
        href: "/about/partners",
        desc: "Collaborations",
      },
      {
        label: "Certifications",
        href: "/about/certifications",
        desc: "Official proof",
      },
    ],
  },
  {
    id: "outreach",
    heading: "Connect",
    icon: "📍",
    iconTheme: "bg-pink-100 text-pink-600",
    items: [
      {
        label: "Our Locations",
        href: "/about/locations",
        desc: "Find our branches",
      },
      { label: "Contact Us", href: "/contact", desc: "Get in touch" },
      { label: "Blog", href: "/blog", desc: "News & updates" },
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

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/branches", label: "Branches" },
  { href: "/success-stories", label: "Success" },
  { href: "/contact", label: "Contact" },
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
    queryKey: ['globalMessage'],
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
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
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
              className="h-16 w-auto object-contain"
              onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}

              decoding="async" />
          </motion.div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0">
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
                className={`px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive(href)
                  ? "text-brand-green bg-brand-green/10 font-semibold"
                  : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
                  }`}
              >
                {label}
              </Link>
            </motion.li>
          ))}

          {/* Services Trigger */}
          <motion.li
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="static"
          >
            <button
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive("/services") || activeDropdown === "services"
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
              onMouseLeave={handleMouseLeave}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${(isActive("/about") && !cleanPath.startsWith("/about/partnership-membership")) || activeDropdown === "about"
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
                  className="absolute top-full right-4 2xl:right-0 w-full max-w-[800px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right"
                >
                  {/* Minimalist Editorial Top Bar */}
                  <div className="bg-white px-6 py-5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📖</span>
                      <p className="text-slate-900 text-sm font-black uppercase tracking-[0.15em]">
                        About Smart Youth ICT
                      </p>
                    </div>
                  </div>

                  {/* 4-column minimal grid */}
                  <div className="grid grid-cols-4 gap-2 p-3 bg-white">
                    {aboutColumns.map((col) => (
                      <div
                        key={col.heading}
                        className="px-4 py-4 rounded-xl hover:bg-slate-50 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 bg-brand-pink/10 text-brand-pink rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-sm">{col.icon}</span>
                          </div>
                          <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-tight">
                            {col.heading}
                          </p>
                        </div>
                        <ul className="space-y-1">
                          {col.items.map((item) => {
                            const isItemActive = cleanPath === item.href;
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="flex flex-col gap-0.5 px-3 py-2 -mx-3 rounded-xl hover:bg-white hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group/item transition-all"
                                >
                                  <span
                                    className={`text-xs font-bold transition-all transform group-hover/item:translate-x-1 leading-tight ${isItemActive ? "text-brand-pink" : "text-slate-700 group-hover/item:text-brand-pink"}`}
                                  >
                                    {item.label}
                                  </span>
                                  <span className="text-[10px] text-slate-400 group-hover/item:text-slate-500 transition-colors transform group-hover/item:translate-x-1">
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
                  <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center justify-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic">
                      From Learning to Earning • Built for Real-World Skills
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>

          {/* Partnership & Membership Trigger */}
          <motion.li
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="static"
          >
            <button
              onMouseEnter={() => handleMouseEnter("partnership")}
              onMouseLeave={handleMouseLeave}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive("/about/partnership-membership") || activeDropdown === "partnership"
                ? "text-brand-green bg-brand-green/10 font-semibold"
                : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
                }`}
            >
              Partnership &amp; Membership
              <motion.span
                animate={{ rotate: activeDropdown === "partnership" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiChevronDown size={14} />
              </motion.span>
            </button>

            <AnimatePresence>
              {activeDropdown === "partnership" && (
                <motion.div
                  onMouseEnter={() => handleMouseEnter("partnership")}
                  onMouseLeave={handleMouseLeave}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.15 } }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-full max-w-[300px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top"
                >
                  <div className="bg-white px-5 py-4 flex items-center gap-2.5 border-b border-slate-100">
                    <div className="w-7 h-7 bg-brand-pink/10 text-brand-pink rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-sm">🤝</span>
                    </div>
                    <span className="text-slate-900 text-[11px] font-black uppercase tracking-[0.15em]">
                      Network &amp; Affiliations
                    </span>
                  </div>
                  <ul className="p-3 bg-white space-y-1">
                    <li>
                      <Link
                        href="/about/partnership-membership#memberships"
                        className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl hover:bg-slate-50 hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] transition-all group/item"
                      >
                        <span className="text-xs font-bold text-slate-700 group-hover/item:text-brand-pink transition-all transform group-hover/item:translate-x-1">Our Memberships</span>
                        <span className="text-[10px] text-slate-400 transition-all transform group-hover/item:translate-x-1">Organisations we belong to</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about/partnership-membership#partners"
                        className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl hover:bg-slate-50 hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] transition-all group/item"
                      >
                        <span className="text-xs font-bold text-slate-700 group-hover/item:text-brand-pink transition-all transform group-hover/item:translate-x-1">Our Partnerships</span>
                        <span className="text-[10px] text-slate-400 transition-all transform group-hover/item:translate-x-1">Who we work with</span>
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        </ul>

        {/* CTA / Auth */}
        <motion.div
          className="hidden md:flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onMouseEnter={() => handleMouseEnter(null)}
        >
          <Link
            href="/seminar"
            id="nav-seminar-badge"
            onMouseEnter={() => prefetchRoutes(["/seminar"])}
            className="group relative hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide text-rose-600 bg-rose-50 border border-rose-200/80 hover:bg-rose-100 hover:border-rose-300 transition-all shadow-sm shrink-0"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
            </span>
            <span>Free Seminar</span>
          </Link>
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
                className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg"
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
          className="md:hidden text-gray-800 p-0 min-h-[44px] min-w-[44px] flex items-center justify-end"
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
              // Positioned absolutely within the container-custom.
              // right-4 ensures it bounds to the right side of the screen minus container padding. No more left overflow!
              className="absolute top-[100%] right-4 2xl:right-0 w-full max-w-[800px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right"
            >
              {/* Minimalist Editorial Top Bar */}
              <div className="bg-white px-6 py-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <p className="text-slate-900 text-sm font-black uppercase tracking-[0.15em]">
                    Our Expert Services
                  </p>
                </div>
                <Link
                  href="/services"
                  className="text-brand-pink text-xs font-bold hover:text-rose-500 transition-colors flex items-center gap-1 group/link"
                >
                  View full catalog <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>

              {/* 4-column minimal grid */}
              <div className="grid grid-cols-4 gap-2 p-3 bg-white">
                {serviceColumns.map((col) => (
                  <div
                    key={col.heading}
                    className="px-4 py-4 rounded-xl hover:bg-slate-50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 bg-brand-pink/10 text-brand-pink rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-sm">{col.icon}</span>
                      </div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-tight">
                        {col.heading}
                      </p>
                    </div>
                    <div>
                      <ul className="space-y-1">
                        {col.items.map((item) => {
                          const isItemActive = cleanPath === item.href;
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="flex items-center justify-between gap-1 px-3 py-2 -mx-3 rounded-xl hover:bg-white hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group/item transition-all"
                              >
                                <span
                                  className={`text-xs font-bold transition-all transform group-hover/item:translate-x-1 leading-tight ${isItemActive ? "text-brand-pink" : "text-slate-700 group-hover/item:text-brand-pink"}`}
                                >
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="shrink-0 text-[10px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-sm uppercase tracking-wider transition-all transform group-hover/item:-translate-x-1">
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
              <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💬</span>
                  <p className="text-xs text-slate-600 font-medium tracking-wide">
                    Not sure what you need?{" "}
                    <strong className="text-slate-900 border-b border-slate-300 pb-0.5 ml-1">
                      Let's talk to our experts.
                    </strong>
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="text-[11px] font-black text-slate-900 border border-slate-200 hover:border-brand-pink hover:text-brand-pink px-4 py-1.5 rounded-full transition-colors flex items-center gap-2"
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
              onClose={() => setMobileOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
