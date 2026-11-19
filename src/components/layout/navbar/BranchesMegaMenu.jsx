"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BranchesMegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  branchDivisions,
  publicBranchesCount,
}) {
  const pathname = usePathname();
  const [currentDivision, setCurrentDivision] = useState("");
  const totalCount = publicBranchesCount || 14;

  // Track active division from search params safely on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCurrentDivision(params.get("division") || "");
    }
  }, [pathname, isOpen]);

  const isBranchesRoute = pathname?.includes("/branches");
  const isAllActive = isBranchesRoute && !currentDivision;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.98,
            transition: { duration: 0.15 },
          }}
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
                <p className="text-[10px] text-slate-400">
                  8 Administrative Divisions • {totalCount} physical hubs
                </p>
              </div>
            </div>
            <Link
              href="/branches"
              onClick={onClose}
              className={`text-xs font-bold transition-all px-2.5 py-1 rounded-lg ${
                isAllActive
                  ? "bg-blue-600 text-white shadow-xs font-black"
                  : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              All Campuses ({totalCount}) →
            </Link>
          </div>

          {/* Division Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-3 !bg-white">
            {branchDivisions
              .filter((div) => div.division !== "All")
              .map((div) => {
                const href = `/branches?division=${encodeURIComponent(div.division)}`;
                const isDivActive =
                  isBranchesRoute &&
                  currentDivision.trim().toLowerCase() ===
                    div.division.trim().toLowerCase();

                return (
                  <Link
                    key={div.division}
                    href={href}
                    onClick={onClose}
                    className={`flex items-center justify-between p-2.5 transition-all group/div rounded-lg border ${
                      isDivActive
                        ? "bg-blue-50/90 border-blue-300 text-blue-700 shadow-xs ring-1 ring-blue-200"
                        : "border-transparent hover:bg-slate-50 hover:border-slate-100 text-slate-800"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        {isDivActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 animate-pulse" />
                        )}
                        <span
                          className={`text-xs transition-colors ${
                            isDivActive
                              ? "font-black text-blue-700"
                              : "font-bold text-slate-800 group-hover/div:text-blue-600"
                          }`}
                        >
                          {div.name}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 text-[10px] rounded transition-colors ${
                            isDivActive
                              ? "bg-blue-600 text-white font-black"
                              : div.count > 0
                                ? "bg-blue-50 text-blue-700 font-extrabold"
                                : "bg-slate-100 text-slate-400 font-semibold"
                          }`}
                        >
                          {div.count > 0 ? div.count : "Soon"}
                        </span>
                      </div>
                      <p
                        className={`text-[10px] truncate mt-0.5 ${
                          isDivActive
                            ? "text-blue-600/80 font-medium"
                            : "text-slate-400"
                        }`}
                      >
                        {div.desc}
                      </p>
                    </div>
                    <span
                      className={`text-xs transition-all ${
                        isDivActive
                          ? "text-blue-600 translate-x-1 font-black"
                          : "text-slate-300 group-hover/div:text-blue-600 group-hover/div:translate-x-0.5"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                );
              })}
          </div>

          {/* Bottom Banner */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-2.5 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">
              Walk-in admission &amp; counselor desks
            </span>
            <Link
              href="/branches"
              onClick={onClose}
              className={`text-xs font-bold transition-colors ${
                isAllActive
                  ? "text-blue-700 font-black underline"
                  : "text-slate-900 hover:text-blue-600"
              }`}
            >
              Explore Map &amp; Labs
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
