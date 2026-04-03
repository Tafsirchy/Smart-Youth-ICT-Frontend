"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import MobileMenu from "./MobileMenu";

/* ─── ABOUT MEGA MENU ─────────────────────────────────────────────── */
const aboutColumns = [
  {
    id: "foundation",
    heading: "Foundation",
    icon: "🧭",
    iconTheme: "bg-emerald-100 text-emerald-600",
    items: [
      {
        label: "SYICT Foundation",
        href: "/about/foundation",
        desc: "Our foundation pillars",
      },
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
    ],
  },
];

/* ─── SERVICES MEGA MENU ─────────────────────────────────────────── */
const serviceColumns = [
  {
    id: "learn",
    heading: "Learning & Career",
    iconTheme: "bg-pink-100 text-pink-600",
    icon: "🎓",
    items: [
      {
        label: "Skill Development Programs",
        href: "/services/skill-development",
        badge: "🔥 Popular",
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
        badge: "⭐ Popular",
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
        badge: "✨ New",
      },
      {
        label: "Business Automation",
        href: "/services/automation",
        badge: "✨ New",
      },
      { label: "Domain & Hosting", href: "/services/hosting" },
      { label: "Website Maintenance", href: "/services/maintenance" },
      {
        label: "Hire a Student (Freelancer)",
        href: "/services/hire-student",
        badge: "🔥 Popular",
      },
    ],
    price: "", // Removed for compact version
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/freelancing", label: "Freelancing" },
  { href: "/success-stories", label: "Success" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/* ─── MAIN NAVBAR ─────────────────────────────────────────────────── */
export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Unified Dropdown State Orchestrator
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimer = useRef(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
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
    setActiveDropdown(menu);
  };
  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const allMobileLinks = [
    ...navLinks,
    { href: "/services", label: "Services" },
    ...aboutColumns.flatMap((col) => col.items),
  ];

  return (
    <motion.header
      className="bg-white shadow-sm sticky top-0 z-[100]"
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <nav className="container-custom relative flex items-center justify-between py-4">
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
            <img
              src="/images/logo.png"
              alt="Smart Youth ICT"
              className="h-10 w-auto object-contain"
            />
          </motion.div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
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
                onMouseEnter={() => handleMouseEnter(null)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(href)
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
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/services") || activeDropdown === "services"
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
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/about") || activeDropdown === "about"
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
                  className="absolute top-full right-4 2xl:right-0 w-full max-w-[800px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 origin-top-right"
                >
                  {/* Header */}
                  <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5">
                        <span className="text-white text-sm">📖</span>
                      </div>
                      <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                        About Smart Youth ICT
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 divide-x divide-slate-100/60 p-2 bg-slate-50/30">
                    {aboutColumns.map((col) => (
                      <div
                        key={col.heading}
                        className="px-4 py-3.5 group/col hover:bg-white rounded-xl transition-colors duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/col:scale-110 ${col.iconTheme}`}
                          >
                            <span className="text-[13px]">{col.icon}</span>
                          </div>
                          <p className="text-[9px] font-black text-slate-800 uppercase tracking-widest leading-tight">
                            {col.heading}
                          </p>
                        </div>
                        <ul className="space-y-0.5">
                          {col.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="flex flex-col gap-0.5 px-2 py-1.5 -mx-2 rounded-md hover:bg-slate-50 group/item transition-colors"
                              >
                                <span className="text-[11px] text-slate-700 font-bold group-hover/item:text-brand-pink transition-colors leading-tight">
                                  {item.label}
                                </span>
                                <span className="text-[9px] text-slate-400 group-hover/item:text-slate-500 transition-colors">
                                  {item.desc}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badge / Footer */}
                  <div className="border-t border-slate-100 bg-white px-6 py-3 flex items-center justify-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic">
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
          className="hidden md:flex items-center gap-3"
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
                      href={`/${branchId}/${dashboardPath}`}
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
          className="md:hidden text-gray-800 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
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
              className="absolute top-[100%] right-4 2xl:right-0 w-full max-w-[800px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 origin-top-right"
            >
              {/* Premium Top Bar */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-6 py-4 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-brand-pink/20 blur-3xl rounded-full" />
                <div className="relative z-10 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/5">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    Our Expert Services
                  </p>
                </div>
                <Link
                  href="/services"
                  className="relative z-10 text-brand-pink text-xs font-bold hover:text-white transition-colors bg-white/5 hover:bg-brand-pink border border-white/10 hover:border-brand-pink px-3 py-1.5 rounded-full flex items-center gap-1"
                >
                  View full catalog <span className="text-[10px]">→</span>
                </Link>
              </div>

              {/* 4-column glass grid */}
              <div className="grid grid-cols-4 divide-x divide-slate-100/60 p-2 bg-slate-50/30">
                {serviceColumns.map((col) => (
                  <div
                    key={col.heading}
                    className="px-4 py-3.5 group/col hover:bg-white rounded-xl transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/col:scale-110 ${col.iconTheme}`}
                      >
                        <span className="text-[13px]">{col.icon}</span>
                      </div>
                      <p className="text-[9px] font-black text-slate-800 uppercase tracking-widest leading-tight">
                        {col.heading}
                      </p>
                    </div>
                    {/* Scrollable container for items */}
                    <div className="max-h-[140px] overflow-y-auto pr-1 scrollbar-hide hover:scrollbar-default transition-all">
                      <ul className="space-y-0.5">
                        {col.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex items-center justify-between gap-1 px-2 py-1 -mx-2 rounded-md hover:bg-slate-50 group transition-colors"
                            >
                              <span className="text-[11px] text-slate-600 font-medium group-hover:text-brand-pink transition-colors leading-tight">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="shrink-0 text-[7px] font-black text-white bg-gradient-to-r from-pink-500 to-rose-500 px-1 py-0.5 rounded-sm shadow-sm uppercase tracking-wider">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="border-t border-slate-100 bg-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💬</span>
                  <p className="text-xs text-slate-600 font-medium tracking-wide">
                    Not sure what you need?{" "}
                    <strong className="text-slate-900 border-b border-slate-300 pb-0.5 ml-1">
                      Let's talk to our experts.
                    </strong>
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="text-xs font-black text-white bg-slate-900 hover:bg-brand-pink px-5 py-2 rounded-full transition-colors flex items-center gap-2"
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
            style={{ overflow: "hidden" }}
          >
            <MobileMenu
              links={allMobileLinks}
              session={session}
              onClose={() => setMobileOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
