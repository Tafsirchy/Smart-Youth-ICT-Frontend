"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiLogout,
  HiUserCircle,
  HiQuestionMarkCircle,
  HiAnnotation,
  HiCog,
  HiChevronDown,
  HiCollection,
  HiSparkles,
} from "react-icons/hi";

// Architectural Imports
import { useRole } from "@/hooks/useRole";
import { NAVIGATION_CONFIG } from "@/config/navigation.config";

/**
 * NavItem - Individual sidebar Link with active state detection.
 */
function NavItem({ href, Icon, label, isNested = false }) {
  const pathname = usePathname();
  const { branchId } = useParams();

  // Identify global routes that should not get branchId prepended
  const isGlobalRoute = href.startsWith("/profile") || href.startsWith("/contact") || href.startsWith("/super") || href.startsWith("/notifications");
  const fullHref = (branchId && !isGlobalRoute) ? `/${branchId}${href}` : href;
  
  // Remove locale prefix (e.g. /en, /bn) from pathname for accurate matching
  const normalizedPathname = pathname.replace(/^\/[a-zA-Z]{2}\b/, '') || '/';

  const isActive =
    normalizedPathname === fullHref ||
    (href !== "/student" &&
      href !== "/admin" &&
      href !== "/super" &&
      normalizedPathname.startsWith(fullHref));

  return (
    <motion.div whileHover={{ x: isNested ? 2 : 4 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={fullHref}
        id={`sidebar-${label.toLowerCase().replace(/\s/g, "-")}`}
        className={`sidebar-link flex items-center transition-all duration-300 ${
          isNested
            ? `gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium ${
                isActive
                  ? "bg-pink-500/20 text-white font-bold border-l-2 border-pink-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            : `gap-2.5 px-3 py-2 ${
                isActive
                  ? "bg-white/10 text-white font-bold border-l-2 border-pink-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white font-semibold"
              }`
        }`}
      >
        <Icon
          className={`${isActive ? "text-pink-500" : "text-slate-400"} transition-colors shrink-0`}
          size={isNested ? 16 : 20}
        />
        <span className="leading-snug truncate">{label}</span>
      </Link>
    </motion.div>
  );
}

/**
 * NavDropdown - Collapsible menu section for high-density grouped links
 */
function NavDropdown({
  title,
  Icon,
  items,
  badgeColor = "text-rose-400 bg-rose-500/10",
  iconColor = "text-rose-400",
  idPrefix = "cms-dropdown",
}) {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/^\/[a-zA-Z]{2}\b/, "") || "/";
  
  const hasActiveChild = items.some((item) =>
    normalizedPathname === item.href || normalizedPathname.startsWith(item.href)
  );

  const [isOpen, setIsOpen] = useState(hasActiveChild);

  // Auto-expand if active route changes to a child inside this dropdown
  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  // Group items if categories exist
  const hasCategories = items.some((item) => item.category);
  const groupedItems = hasCategories
    ? items.reduce((acc, item) => {
        const cat = item.category || "General";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {})
    : null;

  return (
    <div className="mt-2">
      <button
        type="button"
        id={`${idPrefix}-toggle`}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 group ${
          hasActiveChild
            ? "bg-white/10 text-white font-bold"
            : "text-slate-400 hover:bg-white/5 hover:text-white font-semibold"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon
            className={`shrink-0 transition-colors ${
              hasActiveChild ? iconColor : "text-slate-400 group-hover:text-white"
            }`}
            size={18}
          />
          <span className="text-xs uppercase tracking-wider font-bold truncate leading-none">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${badgeColor}`}>
            {items.length}
          </span>
          <HiChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-white" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pl-2 ml-3 border-l border-white/10 space-y-0.5 my-1">
              {groupedItems ? (
                Object.entries(groupedItems).map(([category, catItems]) => (
                  <div key={category} className="pt-2 first:pt-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-0.5 leading-none">
                      {category}
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {catItems.map((item) => (
                        <NavItem key={item.href} {...item} isNested />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                items.map((item) => (
                  <NavItem key={item.href} {...item} isNested />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Sidebar Component
 * Centralized navigation shell that dynamically adjusts menu items based on the user's role.
 * Optimized with server-side props to prevent hydration flickering.
 */
export default function Sidebar({ initialRole, initialUser, isOpen, onClose }) {
  const { user: clientUser, role: clientRole, isLoading } = useRole();
  const pathname = usePathname();

  // Dual-source of truth: prioritize hydrated client state, fallback to server-side props
  const user = clientUser || initialUser;
  const role = clientRole || initialRole;

  // Determine current role status
  const isSuperAdmin = role === "super_admin" || role === "super_management";
  const isBranchManager = role === "branch_admin" || role === "branch_management";
  const isAdmin = role === "admin" || isBranchManager;
  const isEmployee = role === "employee";
  const isInstructor = role === "instructor";
  const userPermissions = user?.permissions || [];

  // Determine which navigation set to display (avoid defaulting to student if role is undefined)
  let navItems = [];
  if (isSuperAdmin) {
    navItems = NAVIGATION_CONFIG.super_admin;
  } else if (isAdmin) {
    navItems = NAVIGATION_CONFIG.admin;
  } else if (isEmployee) {
    // Dynamically filter admin navigation according to employee's assigned tasks
    navItems = NAVIGATION_CONFIG.admin.filter((item) => {
      if (item.adminOnly || item.permission === 'staff:manage') return false;
      if (item.href === '/admin') return true;
      if (!item.permission) return false;
      const moduleKey = item.permission.split(':')[0];
      return userPermissions.some((p) => p.startsWith(moduleKey));
    });
  } else if (isInstructor) {
    navItems = NAVIGATION_CONFIG.instructor;
  } else if (role === "student" || (!role && !isLoading)) {
    navItems = NAVIGATION_CONFIG.student; // Final fallback
  }

  return (
    <aside className={`sidebar dashboard-sidebar w-72 h-full flex flex-col shrink-0 fixed inset-y-0 left-0 z-[200] transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand */}
      <div className="px-5 py-3 flex justify-between items-center h-[var(--topbar-height)] lg:h-auto lg:py-4 lg:justify-center border-b border-white/5 lg:border-none shrink-0">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Smart Youth ICT Logo"
            width={300}
            height={75}
            className="h-16 w-auto object-contain rounded-md"
            priority={true}
            fetchPriority="high"
            onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
            decoding="async"
          />
        </Link>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-md"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* User info Card */}
      <div className="sidebar-user-card mx-3 my-1.5 p-2.5 min-h-[46px]">
        {isLoading && !user ? (
          <div className="flex items-center gap-2.5 animate-pulse">
            <div className="w-9 h-9 bg-slate-700/50 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-20 bg-slate-700/50" />
              <div className="h-2 w-12 bg-slate-700/50" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 border-2 border-pink-500/20 p-0.5 rounded-lg shrink-0">
              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate leading-snug">
                {user?.name || "Guest User"}
              </p>
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider leading-tight">
                {role?.replace("_", " ") || "Authenticating..."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-3 overflow-y-auto scrollbar-hide">
        <div className="text-xs font-black text-slate-500 uppercase tracking-[0.15em] px-3 mb-2 leading-none">
          Main Menu
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Tertiary Links */}
        <div className="mt-5 text-xs font-black text-slate-500 uppercase tracking-[0.15em] px-3 mb-2 leading-none">
          Management
        </div>
        <div className="space-y-1">
          <NavItem
            href={isSuperAdmin ? "/super/support" : "/student/support"}
            Icon={HiAnnotation}
            label="Support Hub"
          />
          <NavItem
            href="/help"
            Icon={HiQuestionMarkCircle}
            label="Help Center"
          />
          <NavItem
            href="/profile"
            Icon={HiUserCircle}
            label="Account Profile"
          />
          {isSuperAdmin && (
            <NavItem
              href="/super/settings"
              Icon={HiCog}
              label="Global Settings"
            />
          )}
          {isAdmin && !isSuperAdmin && (
            <NavItem href="/settings" Icon={HiCog} label="Branch Settings" />
          )}
        </div>

        {/* CMS Collapsible Dropdowns for Super Admin */}
        {isSuperAdmin && (
          <div className="mt-5 pt-3 border-t border-white/5">
            <div className="text-xs font-black text-slate-500 uppercase tracking-[0.15em] px-3 mb-1 leading-none">
              Content Management
            </div>

            <NavDropdown
              title="About Us CMS"
              Icon={HiCollection}
              items={NAVIGATION_CONFIG.about_cms}
              badgeColor="text-rose-400 bg-rose-500/10"
              iconColor="text-rose-400"
              idPrefix="about-cms"
            />

            <NavDropdown
              title="Services CMS"
              Icon={HiSparkles}
              items={NAVIGATION_CONFIG.services_cms}
              badgeColor="text-blue-400 bg-blue-500/10"
              iconColor="text-blue-400"
              idPrefix="services-cms"
            />
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="px-3 pb-3 border-t border-white/5 pt-3 space-y-1">
        <button
          id="sidebar-logout"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="sidebar-logout group w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-md"
        >
          <HiLogout
            className="group-hover:-translate-x-1 transition-transform text-red-400 shrink-0"
            size={20}
          />
          <span className="font-bold leading-snug">Sign Out</span>
        </button>

        <Link
          href="/"
          id="sidebar-back-home"
          className="sidebar-link group w-full hover:bg-white/5 rounded-md flex items-center gap-2.5 px-3 py-2"
        >
          <HiHome
            className="group-hover:-translate-y-0.5 transition-transform text-slate-400 group-hover:text-white shrink-0"
            size={20}
          />
          <span className="font-bold text-slate-400 group-hover:text-white leading-snug">
            Back to Home
          </span>
        </Link>
      </div>
    </aside>
  );
}
