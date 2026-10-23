'use client';

import React, { useState, useMemo, useCallback, useDeferredValue } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getApiBaseUrl } from '@/lib/api-base';
import CampusVisitModal from '@/components/marketing/CampusVisitModal';
import VirtualTourModal from '@/components/marketing/VirtualTourModal';
import CampusGalleryLightbox from '@/components/marketing/CampusGalleryLightbox';
import {
  IoLocationOutline,
  IoCallOutline,
  IoChevronDown,
  IoChevronUp,
  IoMapOutline,
  IoListOutline,
  IoNavigateOutline,
  IoMegaphoneOutline,
  IoCalendarOutline,
  IoBusinessOutline,
  IoSearchOutline,
  IoCloseCircleOutline,
  IoVideocamOutline,
} from 'react-icons/io5';

// Curated high-resolution campus and IT lab photos by division for instant fallback
export const DIVISION_CAMPUS_FALLBACKS = {
  Dhaka: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  Chittagong: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  Chattogram: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  Rajshahi: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  Khulna: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80',
  Barisal: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
  Sylhet: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  Rangpur: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
  Mymensingh: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  Other: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  Default: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
};

export const getBranchThumbnail = (branch) => {
  if (!branch) return DIVISION_CAMPUS_FALLBACKS.Default;
  if (branch.coverImage && typeof branch.coverImage === 'string' && branch.coverImage.trim().length > 10) {
    return branch.coverImage.trim();
  }
  if (Array.isArray(branch.gallery) && branch.gallery.length > 0 && branch.gallery[0]?.trim()?.length > 10) {
    return branch.gallery[0].trim();
  }
  if (branch.logo && typeof branch.logo === 'string' && branch.logo.trim().length > 10) {
    return branch.logo.trim();
  }
  if (branch.division && DIVISION_CAMPUS_FALLBACKS[branch.division]) {
    return DIVISION_CAMPUS_FALLBACKS[branch.division];
  }
  return DIVISION_CAMPUS_FALLBACKS.Default;
};

// Dynamically import Leaflet Map to avoid SSR window errors
const BranchMap = dynamic(() => import('@/components/marketing/BranchMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-2xl flex flex-col items-center justify-center text-neutral-400 font-bold uppercase tracking-wider text-xs gap-2">
      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
      <span>Loading Interactive Map...</span>
    </div>
  ),
});

// Haversine formula for distance calculation in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const DEFAULT_FACILITIES = [
  'High-Spec Labs',
  'Fiber Wi-Fi',
  'Generator Backup',
  'Mentor Desk',
];

export default function BranchDirectory({ locale }) {
  // Use TanStack Query with persistent in-memory cache for instant loading
  const {
    data: branches = [],
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ['public-branches-directory'],
    queryFn: async () => {
      const res = await axios.get(`${getApiBaseUrl()}/branches/public/all`);
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
  const error = isError ? 'Failed to load campuses.' : null;

  // Filters & State
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'grid', 'map'
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [hoveredBranchId, setHoveredBranchId] = useState(null);

  // Geolocation
  const [userLocation, setUserLocation] = useState(null);
  const [locatingUser, setLocatingUser] = useState(false);

  // Expanded Courses
  const [expandedBranchId, setExpandedBranchId] = useState(null);
  const [branchCourses, setBranchCourses] = useState({});
  const [coursesLoading, setCoursesLoading] = useState({});

  // Modals
  const [virtualTourBranch, setVirtualTourBranch] = useState(null);
  const [visitBranch, setVisitBranch] = useState(null);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    index: 0,
    branchName: '',
  });

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocatingUser(false);
      },
      () => setLocatingUser(false)
    );
  }, []);

  const getBranchStatus = useCallback((branch) => {
    if (!branch.officeHours || !branch.officeHours.length) {
      return { isOpen: true, label: 'Open Daily' };
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const todayName = days[now.getDay()];
    const todaySchedule = branch.officeHours.find((h) => h.day === todayName);

    if (!todaySchedule || todaySchedule.isClosed) {
      return { isOpen: false, label: 'Closed Today' };
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = (todaySchedule.open || '09:00').split(':').map(Number);
    const [closeH, closeM] = (todaySchedule.close || '18:00').split(':').map(Number);
    const openMinutes = openH * 60 + (openM || 0);
    const closeMinutes = closeH * 60 + (closeM || 0);

    if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
      return { isOpen: true, label: `Open • Closes ${todaySchedule.close}` };
    } else if (currentMinutes < openMinutes) {
      return { isOpen: false, label: `Opens ${todaySchedule.open}` };
    } else {
      return { isOpen: false, label: 'Closed' };
    }
  }, []);

  const divisionCounts = useMemo(() => {
    const counts = { All: branches.length };
    branches.forEach((b) => {
      if (b.division) {
        counts[b.division] = (counts[b.division] || 0) + 1;
      }
    });
    return counts;
  }, [branches]);

  const divisions = useMemo(() => Object.keys(divisionCounts), [divisionCounts]);

  const filteredBranches = useMemo(() => {
    let list = branches.map((b) => {
      let distance = null;
      if (userLocation && b.location?.coordinates) {
        const [bLng, bLat] = b.location.coordinates;
        distance = calculateDistance(userLocation.lat, userLocation.lng, bLat, bLng);
      }
      return { ...b, distance };
    });

    if (selectedDivision !== 'All') {
      list = list.filter((b) => b.division === selectedDivision);
    }

    if (deferredSearch.trim()) {
      const q = deferredSearch.toLowerCase();
      list = list.filter(
        (b) =>
          b.name?.toLowerCase().includes(q) ||
          b.code?.toLowerCase().includes(q) ||
          b.address?.city?.toLowerCase().includes(q) ||
          b.address?.area?.toLowerCase().includes(q) ||
          b.address?.street?.toLowerCase().includes(q) ||
          b.division?.toLowerCase().includes(q)
      );
    }

    if (onlyOpenNow) {
      list = list.filter((b) => getBranchStatus(b).isOpen);
    }

    if (userLocation) {
      list.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });
    } else {
      list.sort((a, b) => {
        if (a.type === 'head_office') return -1;
        if (b.type === 'head_office') return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return list;
  }, [branches, selectedDivision, deferredSearch, onlyOpenNow, userLocation, getBranchStatus]);

  const toggleBranchCourses = async (branchId) => {
    if (expandedBranchId === branchId) {
      setExpandedBranchId(null);
      return;
    }

    setExpandedBranchId(branchId);

    if (!branchCourses[branchId]) {
      setCoursesLoading((prev) => ({ ...prev, [branchId]: true }));
      try {
        const res = await axios.get(`${getApiBaseUrl()}/branches/public/${branchId}`);
        setBranchCourses((prev) => ({ ...prev, [branchId]: res.data.data?.courses || [] }));
      } catch (err) {
        console.warn('Failed to load branch courses', err);
      } finally {
        setCoursesLoading((prev) => ({ ...prev, [branchId]: false }));
      }
    }
  };

  const handleSelectBranch = (branchId) => {
    setSelectedBranchId(branchId);
    if (branchId) {
      const el = document.getElementById(`branch-card-${branchId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 gap-2.5">
        <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
        <p className="text-neutral-500 font-medium text-xs">Loading campuses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-rose-500 font-medium text-sm max-w-sm mx-auto">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-4 space-y-2.5 pb-8 pt-0">
      {/* ── Compact Header & Telemetry ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1.5 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-600 text-white inline-flex items-center justify-center shrink-0 shadow-sm">
            <IoBusinessOutline size={15} />
          </span>
          <h1 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight leading-none m-0">
            Campuses & Learning Centers
          </h1>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">•</span>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:inline">
            Labs & mentor support across Bangladesh
          </span>
        </div>

        {/* Telemetry Badges */}
        <div className="flex items-center gap-1.5 text-xs font-semibold shrink-0">
          <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span><strong>{branches.length}</strong> Campuses</span>
          </span>
          <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md">
            <strong>{divisions.length - 1 || 1}</strong> Divisions
          </span>
          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md font-bold text-[10px]">
            Virtual Tour Live
          </span>
        </div>
      </div>

      {/* ── Compact Unified Filter Toolbar ── */}
      <div className="bg-white dark:bg-neutral-900 px-3 py-2 rounded-xl border border-neutral-200/90 dark:border-neutral-800 shadow-sm space-y-1.5">
        <div className="flex flex-col sm:flex-row gap-1.5 items-stretch sm:items-center justify-between">
          {/* Quick Search */}
          <div className="relative flex-1">
            <IoSearchOutline
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={15}
            />
            <input
              type="text"
              placeholder="Search by campus, district, or area (e.g. Uttara, Mirpur)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white rounded-lg"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <IoCloseCircleOutline size={15} />
              </button>
            )}
          </div>

          {/* Quick Actions & View Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleLocateMe}
              disabled={locatingUser}
              className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all rounded-lg border ${
                userLocation
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'
              }`}
            >
              <IoNavigateOutline size={13} className={locatingUser ? 'animate-spin' : ''} />
              <span>{locatingUser ? 'Locating...' : 'Near Me'}</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlyOpenNow(!onlyOpenNow)}
              className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all rounded-lg border ${
                onlyOpenNow
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${onlyOpenNow ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>Open</span>
            </button>

            {/* View Mode */}
            <div className="flex p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg gap-0.5 border border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 rounded-md transition-all ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                }`}
              >
                <IoMapOutline size={13} />
                <span className="hidden sm:inline">Split</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                }`}
              >
                <IoListOutline size={13} />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 rounded-md transition-all ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                }`}
              >
                <IoMapOutline size={13} />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Division Filter Strip */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar pt-1 border-t border-neutral-100 dark:border-neutral-800">
          {divisions.map((div) => {
            const count = divisionCounts[div] || 0;
            const isSelected = selectedDivision === div;
            return (
              <button
                key={div}
                type="button"
                onClick={() => setSelectedDivision(div)}
                className={`px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap rounded-md border transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-sm'
                    : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                }`}
              >
                <span>{div}</span>
                <span className="ml-1 opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout: Map & Compact Cards ── */}
      <div
        className={`grid gap-3 ${
          viewMode === 'split'
            ? 'grid-cols-1 lg:grid-cols-12'
            : 'grid-cols-1'
        }`}
      >
        {/* Interactive Map Column */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div
            className={`${
              viewMode === 'split'
                ? 'lg:col-span-5 xl:col-span-5 lg:sticky lg:top-20 h-[360px] lg:h-[calc(100vh-140px)]'
                : 'w-full h-[540px]'
            }`}
          >
            <BranchMap
              branches={filteredBranches}
              selectedBranchId={selectedBranchId}
              hoveredBranchId={hoveredBranchId}
              onSelectBranch={handleSelectBranch}
              onVirtualTour={(branch) => setVirtualTourBranch(branch)}
              onScheduleVisit={(branch) => setVisitBranch(branch)}
              getStatus={getBranchStatus}
            />
          </div>
        )}

        {/* Campus Cards Column (High-Density, Zero-Clutter Compact Cards) */}
        {viewMode !== 'map' && (
          <div
            className={`space-y-2.5 ${
              viewMode === 'split'
                ? 'lg:col-span-7 xl:col-span-7'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 space-y-0'
            }`}
          >
            {filteredBranches.length === 0 ? (
              <div className="col-span-full text-center py-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
                <IoLocationOutline className="mx-auto text-neutral-400 mb-2" size={32} />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  No campuses match your filters
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSelectedDivision('All');
                    setOnlyOpenNow(false);
                  }}
                  className="mt-2.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-xs font-bold uppercase tracking-wider text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredBranches.map((branch) => {
                const isExpanded = expandedBranchId === branch._id;
                const courses = branchCourses[branch._id];
                const isLoadingCourses = coursesLoading[branch._id];
                const status = getBranchStatus(branch);
                const isSelected = selectedBranchId === branch._id;

                const campusFacilities =
                  branch.facilities && branch.facilities.length > 0
                    ? branch.facilities
                    : DEFAULT_FACILITIES;

                return (
                  <div
                    key={branch._id}
                    id={`branch-card-${branch._id}`}
                    onMouseEnter={() => setHoveredBranchId(branch._id)}
                    onMouseLeave={() => setHoveredBranchId(null)}
                    onClick={() => setSelectedBranchId(branch._id)}
                    className={`bg-white dark:bg-neutral-900 rounded-xl border transition-all overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-md'
                        : 'border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Notice Banner (compact) */}
                      {branch.notice?.isActive && branch.notice.title && (
                        <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 px-3 py-1 flex items-center gap-1.5 text-amber-800 dark:text-amber-300 text-[10px] font-medium">
                          <IoMegaphoneOutline size={12} className="shrink-0 text-amber-600" />
                          <span className="font-bold">{branch.notice.title}:</span>
                          <span className="truncate">{branch.notice.text}</span>
                        </div>
                      )}

                      {/* Main Card Layout: Horizontal Split on Desktop, Stack on Grid */}
                      <div className={`flex flex-col ${viewMode === 'split' ? 'sm:flex-row' : ''}`}>
                        {/* Media Thumbnail */}
                        <div
                          className={`relative overflow-hidden bg-neutral-900 group shrink-0 ${
                            viewMode === 'split'
                              ? 'w-full sm:w-44 md:w-48 h-28 sm:h-auto min-h-[115px]'
                              : 'w-full h-28 sm:h-32'
                          }`}
                        >
                          <img
                            src={getBranchThumbnail(branch)}
                            alt={branch.name}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                DIVISION_CAMPUS_FALLBACKS[branch.division] ||
                                DIVISION_CAMPUS_FALLBACKS.Default;
                            }}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* Top Badges Overlay */}
                          <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1">
                            <span
                              className={`px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider rounded backdrop-blur-md shadow-sm ${
                                branch.type === 'head_office'
                                  ? 'bg-rose-600/90 text-white'
                                  : 'bg-blue-600/90 text-white'
                              }`}
                            >
                              {branch.code} • {branch.type === 'head_office' ? 'HQ' : 'Branch'}
                            </span>

                            <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[8.5px] font-bold uppercase tracking-wider rounded flex items-center gap-1">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-400'
                                }`}
                              />
                              <span>{status.label}</span>
                            </span>
                          </div>

                          {/* Virtual Tour Overlay Trigger */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVirtualTourBranch(branch);
                            }}
                            className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 hover:bg-blue-600 text-white backdrop-blur-md rounded-md text-[9.5px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow active:scale-95"
                          >
                            <IoVideocamOutline size={12} />
                            <span>Tour</span>
                          </button>
                        </div>

                        {/* Card Content (Tight, high-density padding) */}
                        <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between min-w-0 space-y-2">
                          <div>
                            <div className="flex items-center justify-between gap-1.5">
                              <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white leading-tight truncate m-0">
                                {branch.name}
                              </h3>
                              {branch.division && (
                                <span className="px-1.5 py-0.2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[9.5px] font-bold uppercase rounded shrink-0">
                                  {branch.division}
                                </span>
                              )}
                            </div>

                            {branch.address && (
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5 truncate">
                                <IoLocationOutline
                                  className="shrink-0 text-blue-600"
                                  size={12}
                                />
                                <span className="truncate">
                                  {[
                                    branch.address.street,
                                    branch.address.area,
                                    branch.address.city,
                                  ]
                                    .filter(Boolean)
                                    .join(', ')}
                                </span>
                              </p>
                            )}
                          </div>

                          {/* Contacts & Distance & Facilities */}
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px]">
                            {branch.contact?.phones?.[0] ? (
                              <a
                                href={`tel:${branch.contact.phones[0]}`}
                                className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 font-bold"
                              >
                                <IoCallOutline className="text-blue-600" size={12} />
                                <span>{branch.contact.phones[0]}</span>
                              </a>
                            ) : (
                              <span className="text-neutral-400">Desk help available</span>
                            )}

                            {branch.distance !== null && (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 ml-auto">
                                <IoNavigateOutline size={11} />
                                {branch.distance.toFixed(1)} km
                              </span>
                            )}
                          </div>

                          {/* Facilities Pills */}
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {campusFacilities.slice(0, 3).map((fac, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.2 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[9.5px] font-medium rounded border border-neutral-100 dark:border-neutral-800"
                              >
                                {fac}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Suite (Compact Toolbar) */}
                    <div className="px-3 py-1.5 bg-neutral-50/70 dark:bg-neutral-800/40 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setVirtualTourBranch(branch)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10.5px] font-bold uppercase tracking-wider rounded-md transition-all shadow-sm inline-flex items-center gap-1 active:scale-95"
                        >
                          <IoVideocamOutline size={12} />
                          <span>Tour</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setVisitBranch(branch)}
                          className="px-2.5 py-1 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[10.5px] font-bold uppercase tracking-wider rounded-md border border-neutral-200 dark:border-neutral-700 transition-colors inline-flex items-center gap-1 active:scale-95"
                        >
                          <IoCalendarOutline size={11} />
                          <span>Visit</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 ml-auto">
                        {branch.location?.googleMapsUrl && (
                          <a
                            href={branch.location.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700 transition-colors"
                            title="Google Maps"
                          >
                            <IoNavigateOutline size={13} />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleBranchCourses(branch._id)}
                          className="px-2 py-0.5 text-[10.5px] font-bold text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-0.5 transition-colors"
                        >
                          <span>Courses</span>
                          {isExpanded ? <IoChevronUp size={12} /> : <IoChevronDown size={12} />}
                        </button>
                      </div>
                    </div>

                    {/* Compact Offline Courses Drawer */}
                    {isExpanded && (
                      <div className="border-t border-neutral-100 dark:border-neutral-800 p-3 bg-neutral-50/50 dark:bg-neutral-900 animate-in slide-in-from-top-1 duration-150">
                        <div className="mb-2 flex items-center justify-between text-xs font-bold text-neutral-800 dark:text-white">
                          <span>Offline Batches at {branch.name}</span>
                          <span className="text-blue-600 text-[11px]">
                            {courses ? `${courses.length} courses` : 'Loading...'}
                          </span>
                        </div>

                        {isLoadingCourses ? (
                          <div className="flex justify-center py-3">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                          </div>
                        ) : courses && courses.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {courses.map((course) => (
                              <div
                                key={course._id}
                                className="p-2 bg-white dark:bg-neutral-800/80 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-2 hover:border-blue-500 transition-colors"
                              >
                                <div className="min-w-0">
                                  <span className="text-[8.5px] font-bold uppercase px-1 py-0.2 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 rounded">
                                    In-Person
                                  </span>
                                  <h5 className="font-bold text-xs text-neutral-900 dark:text-white truncate mt-0.5">
                                    {typeof course.title === 'object'
                                      ? course.title[locale] || course.title.en
                                      : course.title}
                                  </h5>
                                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-0.5">
                                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                      ৳{course.price?.toLocaleString() || 'Inquire'}
                                    </span>
                                    <span>•</span>
                                    <span>{course.duration || '3 Months'}</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setVisitBranch(branch)}
                                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase rounded transition-colors shrink-0"
                                >
                                  Enroll
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-neutral-500 text-center py-2">
                            No active cohorts listed. Click &ldquo;Tour&rdquo; or &ldquo;Visit&rdquo; to inquire.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Virtual Tour Modal */}
      {virtualTourBranch && (
        <VirtualTourModal
          branch={virtualTourBranch}
          onClose={() => setVirtualTourBranch(null)}
          onScheduleVisit={(b) => {
            setVirtualTourBranch(null);
            setVisitBranch(b);
          }}
        />
      )}

      {/* Campus Visit Modal */}
      {visitBranch && (
        <CampusVisitModal
          branch={visitBranch}
          onClose={() => setVisitBranch(null)}
        />
      )}

      {/* Photo Lightbox */}
      <CampusGalleryLightbox
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        initialIndex={lightboxState.index}
        branchName={lightboxState.branchName}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
