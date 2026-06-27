"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt2, HiBell } from "react-icons/hi";

export default function DashboardTopbar({ user, toggleSidebar }) {
  return (
    <header className="dashboard-topbar bg-surface border-b border-border flex items-center justify-between px-4 sticky top-0 w-full z-[100] lg:hidden h-[60px]">
      {/* Mobile/Tablet View (Hidden on LG+) */}
      
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center gap-3 h-full">
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-11 h-11 flex items-center justify-center text-slate-500 hover:text-brand-pink active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg"
          aria-label="Open sidebar"
        >
          <HiMenuAlt2 size={24} />
        </button>
        
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/images/logo.png"
            alt="Smart Youth ICT Logo"
            width={120}
            height={30}
            className="h-6 w-auto object-contain"
            priority={true}
            fetchPriority="high"
            onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
          />
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-3 text-slate-500 hover:text-brand-pink active:scale-95 transition-all rounded-full"
          aria-label="Notifications"
        >
          <HiBell size={22} />
        </button>

        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-slate-100 text-slate-700 font-bold text-xs ml-1 shrink-0">
          {user?.name?.charAt(0) || "U"}
        </div>
      </div>
    </header>
  );
}
