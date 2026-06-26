"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import { serviceColumns, aboutColumns } from "./Navbar";
function MobileAccordion({ label, children, isActiveAccordion }) {
  const [open, setOpen] = useState(isActiveAccordion || false);
  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all ${
          isActiveAccordion
            ? "text-brand-green bg-brand-green/10 font-semibold border-l-2 border-brand-green pl-4 pr-3"
            : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5 px-3"
        }`}
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
  const cleanPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, "") || "/";
  const isActive = (href) =>
    cleanPath === href || (href !== "/" && cleanPath.startsWith(href));

  // Filter out the flat service/about links (those are in the accordions below)
  // Also filter out success-stories and contact to prevent duplicates since they reside in the About accordion
  const topLinks = links.filter(
    (l) =>
      !l.href.startsWith("/services") &&
      !l.href.startsWith("/about") &&
      l.href !== "/success-stories" &&
      l.href !== "/contact",
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
              className={`flex items-center min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(href)
                  ? "text-brand-green bg-brand-green/10 font-semibold border-l-2 border-brand-green pl-4"
                  : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
                }`}
            >
              {label}
            </Link>
          </li>
        ))}

        {/* Services accordion */}
        <MobileAccordion label="Services" isActiveAccordion={isActive("/services")}>
          <li>
            <Link
              href="/services"
              onClick={onClose}
              className="flex items-center min-h-[44px] px-3 py-1.5 text-xs font-black text-brand-pink uppercase tracking-widest"
            >
              View All Services →
            </Link>
          </li>
          {serviceColumns.map((col, idx) => (
            <li key={`svc-col-${idx}`} className="mb-2">
              <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {col.heading}
              </div>
              <ul className="flex flex-col">
                {col.items.map((item) => {
                  const isItemActive = cleanPath === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between min-h-[44px] px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          isItemActive ? "text-brand-green font-semibold bg-brand-green/5" : "text-slate-600 hover:text-brand-green hover:bg-brand-green/5"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="shrink-0 text-[10px] font-black text-white bg-gradient-to-r from-pink-500 to-rose-500 px-1.5 py-0.5 rounded-sm shadow-sm uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </MobileAccordion>

        {/* About accordion */}
        <MobileAccordion label="About" isActiveAccordion={isActive("/about")}>
          {aboutColumns.map((col, idx) => (
            <li key={`abt-col-${idx}`} className="mb-2">
              <div className="px-3 py-1 flex items-center gap-2">
                <span className="text-xs">{col.icon}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{col.heading}</span>
              </div>
              <ul className="flex flex-col">
                {col.items.map((item) => {
                  const isItemActive = cleanPath === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex flex-col justify-center min-h-[44px] px-3 py-1.5 rounded-lg transition-colors ${
                          isItemActive ? "bg-brand-green/5" : "hover:bg-slate-50"
                        }`}
                      >
                        <span className={`text-sm ${isItemActive ? "text-brand-green font-semibold" : "text-slate-600"}`}>
                          {item.label}
                        </span>
                        <span className="text-xs text-slate-400">{item.desc}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
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
