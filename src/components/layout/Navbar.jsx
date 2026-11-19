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
import AnnouncementBanner from "./navbar/AnnouncementBanner";
import BranchesMegaMenu from "./navbar/BranchesMegaMenu";
import ServicesMegaMenu from "./navbar/ServicesMegaMenu";
import AboutMegaMenu from "./navbar/AboutMegaMenu";
import NavAuthButtons from "./navbar/NavAuthButtons";
import {
  aboutColumns,
  serviceColumns,
  BANGLADESH_DIVISIONS,
  BRANCH_DIVISIONS,
  navLinks,
} from "./navbar/navbar.config";

// Re-export constants for backward compatibility (e.g. MobileMenu, external consumers)
export {
  aboutColumns,
  serviceColumns,
  BANGLADESH_DIVISIONS,
  BRANCH_DIVISIONS,
};

/* ─── MAIN NAVBAR ─────────────────────────────────────────────────── */
export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Queries: Global Announcement & Branches
  const { data: globalMessage } = useQuery({
    queryKey: queryKeys.globalMessage(),
    queryFn: async () => {
      try {
        const res = await api.get("/cms/settings/globalMessage");
        return res.data?.data || null;
      } catch {
        return null;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const { data: publicBranches = [] } = useQuery({
    queryKey: ["public-branches-directory"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${getApiBaseUrl()}/branches/public/all`);
        return res.data?.data || [];
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // Calculate branch counts per division dynamically
  const branchDivisions = useMemo(() => {
    const totalCount = publicBranches.length || 14;
    const counts = {};

    publicBranches.forEach((b) => {
      const rawDiv = (b.division || "").trim();
      const matched = BANGLADESH_DIVISIONS.find((d) =>
        d.aliases.some((a) => a.toLowerCase() === rawDiv.toLowerCase()),
      );
      const key = matched ? matched.division : rawDiv;
      if (key) {
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return [
      {
        name: "All Divisions",
        division: "All",
        count: totalCount,
        desc: `View all ${totalCount} nationwide campuses`,
      },
      ...BANGLADESH_DIVISIONS.map((d) => {
        const count = publicBranches.length
          ? counts[d.division] || 0
          : d.division === "Dhaka"
            ? 4
            : d.division === "Chittagong"
              ? 2
              : d.division === "Mymensingh"
                ? 3
                : d.division === "Rangpur"
                  ? 3
                  : d.division === "Rajshahi"
                    ? 1
                    : d.division === "Khulna"
                      ? 1
                      : 0;
        return {
          name: d.name,
          shortName: d.shortName,
          division: d.division,
          count,
          desc: count > 0 ? d.desc : "Upcoming Regional Hub",
        };
      }),
    ];
  }, [publicBranches]);

  const localeMatch = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)(?=\/|$)/);
  const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";

  // Unified Dropdown State Orchestrator
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimer = useRef(null);
  const prefetchedRoutes = useRef(new Set());

  // Hide on scroll down, show on scroll up
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
      setTimeout(() => {
        window.__isNavigatingToHome = false;
      }, 1000);
    }
    handleMouseEnter(null);
  };

  const prefetchRoutes = (routes) => {
    routes.forEach((href) => {
      if (prefetchedRoutes.current.has(href)) return;
      prefetchedRoutes.current.add(href);
      router.prefetch(href);
    });
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

  useEffect(() => {
    // Warm up common navigation targets
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

  // Body overflow lock when mobile menu is open
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
      {/* ── 1. Announcement Banner ── */}
      <AnnouncementBanner globalMessage={globalMessage} />

      <nav className="container-custom relative flex items-center justify-between h-[var(--navbar-height)]">
        {/* ── 2. Brand Logo ── */}
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
            className="flex items-center"
          >
            <Image
              src="/images/logo.png"
              alt="Smart Youth ICT Logo"
              width={220}
              height={149}
              priority={true}
              fetchPriority="high"
              className="h-[62px] sm:h-[68px] md:h-[72px] w-auto object-contain"
              onError={(e) => {
                e.target.srcset = "";
                e.target.src = "/images/placeholder.png";
              }}
              decoding="async"
            />
          </motion.div>
        </Link>

        {/* ── 3. Desktop Navigation Links & Triggers ── */}
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
                className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                  isActive(href)
                    ? "text-brand-green bg-brand-green/10 font-semibold"
                    : "text-gray-700 hover:text-brand-green hover:bg-brand-green/5"
                }`}
              >
                {label}
              </Link>
            </motion.li>
          ))}

          {/* Branches Trigger & Mega Menu */}
          <motion.li
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative"
          >
            <button
              onMouseEnter={() => handleMouseEnter("branches")}
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "branches" ? null : "branches",
                )
              }
              onMouseLeave={handleMouseLeave}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
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

            <BranchesMegaMenu
              isOpen={activeDropdown === "branches"}
              onMouseEnter={() => handleMouseEnter("branches")}
              onMouseLeave={handleMouseLeave}
              onClose={() => setActiveDropdown(null)}
              branchDivisions={branchDivisions}
              publicBranchesCount={publicBranches.length}
            />
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
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "services" ? null : "services",
                )
              }
              onMouseLeave={handleMouseLeave}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
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

          {/* About Trigger & Mega Menu */}
          <motion.li
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="static"
          >
            <button
              onMouseEnter={() => handleMouseEnter("about")}
              onClick={() =>
                setActiveDropdown(activeDropdown === "about" ? null : "about")
              }
              onMouseLeave={handleMouseLeave}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                isActive("/about") ||
                isActive("/success-stories") ||
                isActive("/contact") ||
                activeDropdown === "about"
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

            <AboutMegaMenu
              isOpen={activeDropdown === "about"}
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
              onClose={() => setActiveDropdown(null)}
              cleanPath={cleanPath}
              aboutColumns={aboutColumns}
            />
          </motion.li>
        </ul>

        {/* ── 4. CTA / Auth Buttons ── */}
        <NavAuthButtons
          session={session}
          localePrefix={localePrefix}
          prefetchRoutes={prefetchRoutes}
          onMouseEnter={() => handleMouseEnter(null)}
        />

        {/* ── 5. Mobile Hamburger Button ── */}
        <motion.button
          id="nav-mobile-toggle"
          className="md:hidden text-gray-800 p-0 min-h-[44px] min-w-[44px] flex items-center justify-end rounded-md cursor-pointer"
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

        {/* ── 6. Services Mega Menu Overlay ── */}
        <ServicesMegaMenu
          isOpen={activeDropdown === "services"}
          onMouseEnter={() => handleMouseEnter("services")}
          onMouseLeave={handleMouseLeave}
          onClose={() => setActiveDropdown(null)}
          cleanPath={cleanPath}
          serviceColumns={serviceColumns}
        />
      </nav>

      {/* ── 7. Mobile Menu Slide-Down ── */}
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
