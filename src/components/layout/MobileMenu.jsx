"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const serviceLinks = [
  { href: "/services/skill-development", label: "Skill Development Programs" },
  { href: "/services/career-tracks", label: "Career Tracks (Web, AI, SMM)" },
  { href: "/services/freelancing", label: "Freelancing Training" },
  { href: "/services/business-websites", label: "Business Websites" },
  { href: "/services/ecommerce", label: "E-commerce Development" },
  { href: "/services/custom-apps", label: "Custom Web Applications" },
  { href: "/services/branding", label: "Logo & Brand Identity" },
  { href: "/services/facebook-ads", label: "Facebook Ads Management" },
  { href: "/services/chatbot", label: "Chatbot Development" },
  { href: "/services/hire-student", label: "Hire a Student (Freelancer)" },
];

const aboutLinks = [
  { href: "/about/foundation", label: "🧭 SYICT Foundation" },
  { href: "/about/advisor", label: "🎓 Advisor" },
  { href: "/about/core-management", label: "🏛️ Core Management" },
];

function MobileAccordion({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-green hover:bg-brand-green/5 transition-all"
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden pl-4 mt-1 space-y-0.5"
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function MobileMenu({ links, session, onClose }) {
  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, "");
  const isActive = (href) =>
    cleanPath === href || (href !== "/" && cleanPath.startsWith(href));

  // Filter out the flat service/about links (those are in the accordions below)
  const topLinks = links.filter(
    (l) => !l.href.startsWith("/services") && !l.href.startsWith("/about"),
  );

  return (
    <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
      <ul className="flex flex-col gap-1 pt-3">
        {/* Regular top-level links */}
        {topLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onClose}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(href)
                  ? "text-brand-green bg-brand-green/10 font-semibold border-l-2 border-brand-green pl-4"
                  : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}

        {/* Services accordion */}
        <MobileAccordion label="Services">
          <li>
            <Link
              href="/services"
              onClick={onClose}
              className="block px-3 py-1.5 text-[12px] font-black text-brand-pink uppercase tracking-widest"
            >
              View All Services →
            </Link>
          </li>
          {serviceLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:text-brand-green hover:bg-brand-green/5 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </MobileAccordion>

        {/* About accordion */}
        <MobileAccordion label="About">
          {aboutLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:text-brand-green hover:bg-brand-green/5 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </MobileAccordion>
      </ul>

      {/* Auth CTA */}
      <div className="mt-4 flex flex-col gap-2">
        {session ? (
          <>
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
                  onClick={onClose}
                  className="btn-primary text-center text-sm"
                >
                  Dashboard
                </Link>
              );
            })()}
            <button
              onClick={() => {
                import("next-auth/react").then(({ signOut }) =>
                  signOut({ callbackUrl: "/" }),
                );
                onClose();
              }}
              className="px-4 py-2 text-center text-sm font-medium text-gray-700 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={onClose}
              className="btn-ghost text-center text-sm font-medium text-gray-700"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={onClose}
              className="btn-primary text-center text-sm"
            >
              Enroll Now
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
