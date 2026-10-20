'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import {
  HiOfficeBuilding,
  HiChevronDown,
  HiSparkles,
  HiGlobe,
  HiCheck,
  HiSearch,
  HiArrowRight,
  HiX,
} from 'react-icons/hi';
import api from '@/lib/api';

export default function SuperAdminBranchSwitcher({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale || 'en';
  const currentBranchId = params.branchId;

  const [branches, setBranches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user?.role === 'super_admin' || user?.role === 'super_management') {
      api
        .get('/branches/public/list')
        .then((res) => {
          if (res.data?.success) setBranches(res.data.data || []);
        })
        .catch(() => {});
    }
  }, [user]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredBranches = useMemo(() => {
    if (!searchQuery.trim()) return branches;
    const query = searchQuery.toLowerCase();
    return branches.filter(
      (b) =>
        b.name?.toLowerCase().includes(query) ||
        b.code?.toLowerCase().includes(query) ||
        b.city?.toLowerCase().includes(query)
    );
  }, [branches, searchQuery]);

  if (user?.role !== 'super_admin' && user?.role !== 'super_management') {
    return null;
  }

  const isGlobalView = pathname.includes('/super');

  // Accurately resolve current branch - guard against undefined checks matching undefined === undefined
  const currentBranch =
    !isGlobalView && currentBranchId
      ? branches.find(
          (b) =>
            b._id === currentBranchId ||
            (b.code && b.code.toLowerCase() === currentBranchId.toLowerCase()) ||
            (b.slug && b.slug.toLowerCase() === currentBranchId.toLowerCase())
        )
      : null;

  const handleSelectBranch = (branch) => {
    setIsOpen(false);
    setSearchQuery('');
    if (!branch) {
      router.push(`/${locale}/super`);
    } else {
      router.push(`/${locale}/${branch._id}/admin`);
    }
  };

  return (
    <div className="mb-4 max-w-7xl mx-auto bg-slate-900 border border-slate-800 text-white px-4 py-2.5 rounded-xl shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs transition-all">
      {/* Left side: Mode identifier & Global HQ shortcut */}
      <div className="flex items-center flex-wrap gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-pink-500/15 border border-pink-500/30 text-pink-400 rounded-lg font-bold">
          <HiSparkles size={14} className="animate-pulse" />
          <span>Super Admin Mode</span>
        </div>

        {isGlobalView ? (
          <span className="text-slate-400 font-medium">
            Global Headquarters Overview
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">
              Inspecting Branch Portal
            </span>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => handleSelectBranch(null)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-pink-300 border border-slate-700 hover:border-pink-500/40 transition text-[11px]"
              title="Return to Global Headquarters view"
            >
              <HiGlobe size={13} className="text-pink-400" />
              <span>Back to Global HQ</span>
              <HiArrowRight size={11} />
            </button>
          </div>
        )}
      </div>

      {/* Right side: Interactive Switcher Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg border transition shadow-sm active:scale-95 ${
            isGlobalView
              ? 'bg-slate-800 hover:bg-slate-750 text-slate-100 border-pink-500/40 hover:border-pink-500/70'
              : 'bg-indigo-950/70 hover:bg-indigo-900/80 text-white border-indigo-500/50 hover:border-indigo-400 ring-1 ring-indigo-500/30'
          }`}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {isGlobalView ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <HiGlobe size={15} className="text-pink-400" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-100">Global HQ</span>
                <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <HiOfficeBuilding size={15} className="text-indigo-400" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white max-w-[140px] truncate">
                  {currentBranch?.name || currentBranchId || 'Branch'}
                </span>
                {currentBranch?.code && (
                  <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
                    {currentBranch.code}
                  </span>
                )}
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>
            </>
          )}

          <HiChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-200 ml-0.5 ${isOpen ? 'rotate-180 text-pink-400' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-850 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-1.5 z-[250] text-slate-200 divide-y divide-slate-800 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md">
            {/* Header info */}
            <div className="px-3.5 py-2 flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/40">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">Current Access Portal</span>
              {isGlobalView ? (
                <span className="flex items-center gap-1 text-pink-400 font-semibold text-[10px]">
                  <HiGlobe size={11} /> Global View
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  {currentBranch?.name || 'Local'}
                </span>
              )}
            </div>

            {/* Global HQ Option */}
            <div className="p-1.5">
              <button
                type="button"
                onClick={() => handleSelectBranch(null)}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition group ${
                  isGlobalView
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold ring-2 ring-pink-400/50 shadow-md shadow-pink-600/30'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:border-pink-500/40'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`p-1.5 rounded-md ${
                      isGlobalView ? 'bg-white/20 text-white' : 'bg-pink-500/20 text-pink-400 group-hover:scale-105 transition-transform'
                    }`}
                  >
                    <HiGlobe size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold text-xs leading-snug ${isGlobalView ? 'text-white font-bold' : 'text-slate-100'}`}>
                      Global Headquarters
                    </p>
                    <p className={`text-[10px] truncate ${isGlobalView ? 'text-pink-100' : 'text-slate-400'}`}>
                      All branches overview & master stats
                    </p>
                  </div>
                </div>

                {isGlobalView ? (
                  <span className="shrink-0 flex items-center gap-1 bg-white/20 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                    <HiCheck size={12} /> Active
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] text-slate-400 group-hover:text-pink-300 opacity-0 group-hover:opacity-100 transition">
                    Switch →
                  </span>
                )}
              </button>
            </div>

            {/* Branch Search Filter */}
            {branches.length > 4 && (
              <div className="p-2 bg-slate-950/30">
                <div className="relative">
                  <HiSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search local branch..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <HiX size={12} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Local Branches Section */}
            <div className="p-1.5 max-h-64 overflow-y-auto space-y-1 custom-scrollbar">
              <div className="flex items-center justify-between px-2.5 py-1 text-[10px] uppercase font-bold text-slate-400">
                <span>Local Branches ({filteredBranches.length})</span>
                <span className="font-normal text-[9px] text-slate-400">Click to switch access</span>
              </div>

              {filteredBranches.length === 0 ? (
                <div className="px-3 py-4 text-center text-xs text-slate-400">
                  No branch matches &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredBranches.map((b) => {
                  const isActive =
                    !isGlobalView &&
                    (currentBranch?._id === b._id ||
                      currentBranchId === b._id ||
                      (b.code && currentBranchId && b.code.toLowerCase() === currentBranchId.toLowerCase()));

                  return (
                    <button
                      key={b._id}
                      type="button"
                      onClick={() => handleSelectBranch(b)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition group ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold ring-2 ring-indigo-400/60 shadow-md shadow-indigo-600/30'
                          : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <div
                          className={`p-1 rounded ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-indigo-400'
                          }`}
                        >
                          <HiOfficeBuilding size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className={`truncate text-xs ${isActive ? 'text-white font-bold' : 'font-medium'}`}>
                            {b.name}
                          </p>
                          {b.city && !isActive && (
                            <p className="text-[10px] text-slate-400 truncate">{b.city}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-white/25 text-white font-bold'
                              : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          {b.code}
                        </span>

                        {isActive ? (
                          <span className="flex items-center gap-1 bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 group-hover:text-indigo-300 opacity-0 group-hover:opacity-100 transition">
                            →
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer notice */}
            <div className="px-3 py-1.5 bg-slate-950/40 text-[10px] text-slate-400 text-center">
              Active branch determines all current portal data and scope.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

