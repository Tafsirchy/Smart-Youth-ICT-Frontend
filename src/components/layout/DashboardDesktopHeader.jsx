"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HiLightningBolt, HiShieldCheck, HiSparkles } from "react-icons/hi";
import NotificationBell from "@/components/notifications/NotificationBell";

export default function DashboardDesktopHeader({ user }) {
  const params = useParams();
  const locale = params?.locale || "en";

  const isSuperAdmin = user?.role === "super_admin" || user?.role === "super_management";
  const isBranchAdmin = user?.role === "branch_admin" || user?.role === "branch_management" || user?.role === "admin";
  const isEmployee = user?.role === "employee";
  const isInstructor = user?.role === "instructor";
  const isStudent = user?.role === "student";

  let roleLabel = "User";
  let roleBadgeClass = "bg-slate-800 text-slate-300 border-slate-700";

  if (user?.role === "super_admin") {
    roleLabel = "Super Admin HQ";
    roleBadgeClass = "bg-pink-500/15 text-pink-400 border-pink-500/30";
  } else if (user?.role === "super_management") {
    roleLabel = "Executive Director";
    roleBadgeClass = "bg-pink-500/15 text-pink-400 border-pink-500/30";
  } else if (user?.role === "branch_admin") {
    roleLabel = "Branch Manager";
    roleBadgeClass = "bg-amber-500/15 text-amber-300 border-amber-500/30";
  } else if (user?.role === "branch_management") {
    roleLabel = "Branch Operations";
    roleBadgeClass = "bg-amber-500/15 text-amber-300 border-amber-500/30";
  } else if (isEmployee) {
    roleLabel = "Staff Officer";
    roleBadgeClass = "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
  } else if (isInstructor) {
    roleLabel = "Senior Instructor";
    roleBadgeClass = "bg-purple-500/15 text-purple-300 border-purple-500/30";
  } else if (isStudent) {
    roleLabel = "Student Scholar";
    roleBadgeClass = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  }

  return (
    <header className="hidden lg:flex items-center justify-between px-6 py-3 border-b border-border/80 bg-surface/90 backdrop-blur-md sticky top-0 z-40 w-full mb-4">
      {/* Left: Quick System Beacon & Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500" />
          <span>Smart Youth ICT Enterprise</span>
          <span className="text-slate-600">•</span>
          <span className="text-pink-400">Live Gateway</span>
        </div>
      </div>

      {/* Right: Actions, Notification Bell, User Avatar */}
      <div className="flex items-center gap-3">
        {/* Real-time Notification Bell */}
        <NotificationBell user={user} iconSize={20} />

        <div className="h-5 w-[1px] bg-border mx-1" />

        {/* User Pill */}
        <Link
          href={`/${locale}/profile`}
          className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-border/80 transition group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-200 group-hover:text-pink-400 transition leading-tight line-clamp-1 max-w-[130px]">
              {user?.name || "My Account"}
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">
              {roleLabel}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
