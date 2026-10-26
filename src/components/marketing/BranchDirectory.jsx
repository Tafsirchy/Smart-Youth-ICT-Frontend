'use client';

import React, { useState, useMemo, useCallback, useDeferredValue, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  IoGridOutline,
  IoNavigateOutline,
  IoMegaphoneOutline,
  IoCalendarOutline,
  IoBusinessOutline,
  IoSearchOutline,
  IoCloseCircleOutline,
  IoVideocamOutline,
  IoDesktopOutline,
  IoWifiOutline,
  IoFlashOutline,
  IoPeopleOutline,
  IoLogoWhatsapp,
  IoSchoolOutline,
  IoCheckmarkCircleOutline,
  IoSparklesOutline,
} from 'react-icons/io5';

// Curated high-resolution campus and IT lab photos by division
export const DIVISION_CAMPUS_FALLBACKS = {
  Dhaka: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
  Chittagong: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
  Chattogram: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
  Rajshahi: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  Khulna: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1000&q=80',
  Barisal: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=80',
  Sylhet: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
  Rangpur: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
  Mymensingh: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
  Other: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
  Default: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
};

// Fallback approximate geographic coordinates for branches missing coordinates in the DB
export const BRANCH_COORDINATE_FALLBACKS = {
  Gazipur: [90.4125, 23.9984],
  'Mymensingh-2': [90.7279, 24.8774],
  'Mymensingh-3': [90.0137, 25.0194],
  'Rangpur -2': [89.2600, 25.7550],
  'Rangpur -3': [89.2750, 25.7350],
};

export const getBranchThumbnail = (branch) => {
  if (!branch) return DIVISION_CAMPUS_FALLBACKS.Default;

  // Check coverImage
  if (branch.coverImage && typeof branch.coverImage === 'string') {
    const trimmed = branch.coverImage.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    // Only accept base64 if valid and reasonably sized (avoid broken truncated base64)
    if (trimmed.startsWith('data:image/') && trimmed.length > 500) {
      return trimmed;
    }
  }

  // Check gallery
  if (Array.isArray(branch.gallery) && branch.gallery.length > 0) {
    const valid = branch.gallery.find(
      (img) =>
        typeof img === 'string' &&
        (img.startsWith('http://') || img.startsWith('https://') || (img.startsWith('data:image/') && img.length > 500))
    );
    if (valid) return valid.trim();
  }

  // Division fallback
  if (branch.division && DIVISION_CAMPUS_FALLBACKS[branch.division]) {
    return DIVISION_CAMPUS_FALLBACKS[branch.division];
  }

  return DIVISION_CAMPUS_FALLBACKS.Default;
};

// Dynamically import Leaflet Map to avoid SSR window errors
const BranchMap = dynamic(() => import('@/components/marketing/BranchMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl flex flex-col items-center justify-center text-slate-400 font-semibold tracking-wide text-xs gap-3">
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
      <span className="text-slate-600 dark:text-slate-300 font-medium">Loading Interactive Campus Map...</span>
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
  { label: 'High-Spec Labs', icon: IoDesktopOutline },
  { label: 'Gigabit Fiber', icon: IoWifiOutline },
  { label: 'Power Backup', icon: IoFlashOutline },
  { label: 'Mentor Desk', icon: IoPeopleOutline },
];

export default function BranchDirectory({ locale = 'en', initialDivision = 'All' }) {
  // TanStack Query for caching public branches
  const {
    data: rawBranches = [],
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

  const error = isError ? 'Unable to load campuses at this moment. Please refresh.' : null;

  // Ensure all branches have valid coordinates for the map
  const branches = useMemo(() => {
    return rawBranches.map((b) => {
      let coords = b.location?.coordinates;
      if (
        !coords ||
        !Array.isArray(coords) ||
        coords.length < 2 ||
        isNaN(coords[0]) ||
        isNaN(coords[1])
      ) {
        if (BRANCH_COORDINATE_FALLBACKS[b.name]) {
          coords = BRANCH_COORDINATE_FALLBACKS[b.name];
        }
      }
      return {
        ...b,
        location: {
          ...b.location,
          coordinates: coords || null,
        },
      };
    });
  }, [rawBranches]);

  // URL-driven division filter
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filters & UI State
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [selectedDivision, setSelectedDivision] = useState(initialDivision);

  // Sync division state when URL search params change
  useEffect(() => {
    const divParam = searchParams.get('division') || 'All';
    setSelectedDivision(divParam);
  }, [searchParams]);

  const handleDivisionChange = useCallback((div) => {
    setSelectedDivision(div);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (div === 'All') {
      params.delete('division');
    } else {
      params.set('division', div);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'grid', 'map'
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [hoveredBranchId, setHoveredBranchId] = useState(null);

  // Geolocation
  const [userLocation, setUserLocation] = useState(null);
  const [locatingUser, setLocatingUser] = useState(false);

  // Expanded Offline Batches
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
      () => setLocatingUser(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const getBranchStatus = useCallback((branch) => {
    if (!branch.officeHours || !branch.officeHours.length) {
      return { isOpen: true, label: 'Open Daily', detail: '09:00 AM – 08:00 PM' };
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const todayName = days[now.getDay()];
    const todaySchedule = branch.officeHours.find((h) => h.day === todayName);

    if (!todaySchedule || todaySchedule.isClosed) {
      return { isOpen: false, label: 'Closed Today', detail: 'Weekend or Holiday' };
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = (todaySchedule.open || '09:00').split(':').map(Number);
    const [closeH, closeM] = (todaySchedule.close || '18:00').split(':').map(Number);
    const openMinutes = openH * 60 + (openM || 0);
    const closeMinutes = closeH * 60 + (closeM || 0);

    if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
      return { isOpen: true, label: 'Open Now', detail: `Closes at ${todaySchedule.close}` };
    } else if (currentMinutes < openMinutes) {
      return { isOpen: false, label: 'Closed', detail: `Opens at ${todaySchedule.open}` };
    } else {
      return { isOpen: false, label: 'Closed', detail: 'Reopens tomorrow morning' };
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
      <div className="flex flex-col justify-center items-center py-28 gap-4">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
        <p className="text-slate-500 font-medium text-sm">Discovering nationwide learning centers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-4 max-w-md mx-auto">
        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <IoLocationOutline size={24} />
        </div>
        <p className="text-slate-700 font-semibold mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container-custom space-y-4 pb-10">
      {/* ── Modern Search & Controls Toolbar ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-3 space-y-2.5">
        <div className="flex flex-col lg:flex-row gap-2 items-stretch lg:items-center justify-between">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <IoSearchOutline
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search campus by name, area, or city (e.g. Uttara, Mirpur, Gazipur, Bogura)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear search"
              >
                <IoCloseCircleOutline size={18} />
              </button>
            )}
          </div>

          {/* Action Filters & View Switcher */}
          <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
            {/* Near Me GPS */}
            <button
              type="button"
              onClick={handleLocateMe}
              disabled={locatingUser}
              className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all active:scale-95 border ${
                userLocation
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <IoNavigateOutline size={15} className={locatingUser ? 'animate-spin text-blue-600' : 'text-blue-600'} />
              <span>{locatingUser ? 'Finding location...' : userLocation ? 'Near You (Active)' : 'Find Nearest'}</span>
            </button>

            {/* Open Now Toggle */}
            <button
              type="button"
              onClick={() => setOnlyOpenNow(!onlyOpenNow)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all active:scale-95 border ${
                onlyOpenNow
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyOpenNow ? 'bg-white' : 'bg-emerald-500 animate-pulse'}`} />
              <span>Open Today</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl gap-1 border border-slate-200/80 dark:border-slate-700 ml-auto sm:ml-0">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-lg transition-all ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
                title="Split Map & List"
              >
                <IoMapOutline size={14} />
                <span className="hidden md:inline">Split</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
                title="Cards Grid View"
              >
                <IoGridOutline size={14} />
                <span className="hidden md:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-lg transition-all ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
                title="Full Interactive Map"
              >
                <IoLocationOutline size={14} />
                <span className="hidden md:inline">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar flex-1">
            {divisions.map((div) => {
              const count = divisionCounts[div] || 0;
              const isSelected = selectedDivision === div;
              return (
                <button
                  key={div}
                  type="button"
                  onClick={() => handleDivisionChange(div)}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{div}</span>
                  <span className={`ml-1.5 text-[10px] ${isSelected ? 'opacity-90' : 'text-slate-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {selectedDivision !== 'All' && (
            <button
              type="button"
              onClick={() => handleDivisionChange('All')}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-lg hover:bg-rose-100 transition-all shrink-0"
            >
              <span>Clear</span>
              <IoCloseCircleOutline size={13} />
            </button>
          )}
        </div>
      </div>

      {/* ── Main Layout: Split, Grid, or Map ── */}
      <div
        className={`grid gap-4 ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
        }`}
      >
        {/* Interactive Map Column */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div
            className={`${
              viewMode === 'split'
                ? 'lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 h-[420px] lg:h-[calc(100vh-140px)]'
                : 'w-full h-[620px]'
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

        {/* Campus Cards Column */}
        {viewMode !== 'map' && (
          <div
            className={`${
              viewMode === 'split'
                ? 'lg:col-span-7 xl:col-span-7 space-y-3'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            }`}
          >
            {filteredBranches.length === 0 ? (
              <div className="col-span-full text-center py-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <IoLocationOutline size={30} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  No campuses match your criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Try adjusting your search keywords, division filter, or clearing the &ldquo;Open Today&rdquo; filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSelectedDivision('All');
                    setOnlyOpenNow(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-bold uppercase tracking-wider text-white rounded-xl transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredBranches.map((branch) => {
                const isExpanded = expandedBranchId === branch._id;
                const courses = branchCourses[branch._id];
                const isLoadingCourses = coursesLoading[branch._id];
                const status = getBranchStatus(branch);
                const isSelected = selectedBranchId === branch._id;
                const isHQ = branch.type === 'head_office';

                const fullAddress = [
                  branch.address?.street,
                  branch.address?.area,
                  branch.address?.city,
                  branch.division,
                ]
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div
                    key={branch._id}
                    id={`branch-card-${branch._id}`}
                    onMouseEnter={() => setHoveredBranchId(branch._id)}
                    onMouseLeave={() => setHoveredBranchId(null)}
                    onClick={() => setSelectedBranchId(branch._id)}
                    className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Notice Banner */}
                      {branch.notice?.isActive && branch.notice.title && (
                        <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-900/50 px-4 py-2 flex items-center gap-2 text-amber-900 dark:text-amber-200 text-xs font-medium">
                          <IoMegaphoneOutline size={14} className="shrink-0 text-amber-600" />
                          <span className="font-bold">{branch.notice.title}:</span>
                          <span className="truncate">{branch.notice.text}</span>
                        </div>
                      )}

                      {/* Card Media Header */}
                      <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-950">
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
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Soft Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/40"></div>

                        {/* Top Badges */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                          {/* Branch Classification Badge */}
                          <span
                            className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg backdrop-blur-md shadow-sm ${
                              isHQ
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-900/85 text-white border border-white/10'
                            }`}
                          >
                            {isHQ ? 'Corporate Headquarters' : `${branch.code || 'Campus Hub'}`}
                          </span>

                          {/* Live Status Badge */}
                          <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-semibold rounded-lg border border-white/10 flex items-center gap-1.5 shadow-sm">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                              }`}
                            />
                            <span>{status.label}</span>
                          </span>
                        </div>

                        {/* Bottom Image Info: Division & Virtual Tour Button */}
                        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between z-10">
                          <div className="text-white">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 block">
                              {branch.division || 'Bangladesh'}
                            </span>
                            <span className="text-xs text-white/90 font-medium">
                              {status.detail}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVirtualTourBranch(branch);
                            }}
                            className="px-3 py-1.5 bg-white/20 hover:bg-blue-600 text-white backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow border border-white/20 active:scale-95"
                          >
                            <IoVideocamOutline size={14} />
                            <span>Tour</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Content Area */}
                      <div className="p-3 sm:p-4 space-y-2.5">
                        {/* Title and Division Tag */}
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                              {branch.name}
                            </h3>
                            {branch.division && (
                              <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 text-[10px] font-bold uppercase tracking-wider rounded-md shrink-0">
                                {branch.division}
                              </span>
                            )}
                          </div>

                          {/* Full Location Address */}
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 mt-1 leading-relaxed">
                            <IoLocationOutline
                              className="shrink-0 text-blue-600 mt-0.5"
                              size={15}
                            />
                            <span>{fullAddress || 'Address details available at front desk'}</span>
                          </p>
                        </div>

                        {/* Contacts & Distance Bar */}
                        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-xs">
                          {branch.contact?.phones?.[0] ? (
                            <a
                              href={`tel:${branch.contact.phones[0]}`}
                              className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 font-bold transition-colors"
                            >
                              <IoCallOutline className="text-blue-600" size={14} />
                              <span>{branch.contact.phones[0]}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 flex items-center gap-1">
                              <IoCallOutline size={13} />
                              <span>Direct assistance</span>
                            </span>
                          )}

                          {branch.contact?.whatsapp && (
                            <a
                              href={`https://wa.me/${branch.contact.whatsapp.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                              title="Chat on WhatsApp"
                            >
                              <IoLogoWhatsapp size={14} />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </a>
                          )}

                          {branch.distance !== null && (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 ml-auto">
                              <IoNavigateOutline size={13} />
                              <span>{branch.distance.toFixed(1)} km</span>
                            </span>
                          )}
                        </div>

                        {/* Campus Facilities Pills */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          {DEFAULT_FACILITIES.map((fac, idx) => {
                            const Icon = fac.icon;
                            return (
                              <div
                                key={idx}
                                className="px-2 py-1 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium"
                              >
                                <Icon className="text-blue-600 shrink-0" size={12} />
                                <span className="truncate">{fac.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Suite */}
                    <div className="px-3 py-2 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Primary: Schedule Free Visit */}
                        <button
                          type="button"
                          onClick={() => setVisitBranch(branch)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5 active:scale-95"
                        >
                          <IoCalendarOutline size={13} />
                          <span>Book Visit</span>
                        </button>

                        {/* Google Maps External Directions */}
                        {branch.location?.googleMapsUrl && (
                          <a
                            href={branch.location.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                            title="Get Directions on Google Maps"
                          >
                            <IoNavigateOutline size={15} />
                          </a>
                        )}
                      </div>

                      {/* Toggle Courses Accordion */}
                      <button
                        type="button"
                        onClick={() => toggleBranchCourses(branch._id)}
                        className="px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
                      >
                        <IoSchoolOutline size={14} className="text-blue-600" />
                        <span>Batches</span>
                        {isExpanded ? <IoChevronUp size={13} /> : <IoChevronDown size={13} />}
                      </button>
                    </div>

                    {/* Expandable Offline Courses Drawer */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 dark:border-slate-800 p-3 bg-slate-50/70 dark:bg-slate-900/90 animate-in slide-in-from-top-1 duration-200">
                        <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-white">
                          <span className="flex items-center gap-1.5">
                            <IoSparklesOutline className="text-blue-600" size={14} />
                            <span>Active Offline Cohorts at {branch.name}</span>
                          </span>
                          <span className="text-blue-600 text-[11px]">
                            {courses ? `${courses.length} courses` : 'Checking...'}
                          </span>
                        </div>

                        {isLoadingCourses ? (
                          <div className="flex justify-center py-4">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                          </div>
                        ) : courses && courses.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {courses.map((course) => (
                              <div
                                key={course._id}
                                className="p-2.5 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200/90 dark:border-slate-700 flex items-center justify-between gap-2 hover:border-blue-500 transition-all shadow-sm"
                              >
                                <div className="min-w-0">
                                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 rounded-md">
                                    In-Person Lab
                                  </span>
                                  <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate mt-1">
                                    {typeof course.title === 'object'
                                      ? course.title[locale] || course.title.en
                                      : course.title}
                                  </h5>
                                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                                    <span className="font-extrabold text-slate-900 dark:text-slate-100">
                                      ৳{course.price?.toLocaleString() || 'Contact'}
                                    </span>
                                    <span>•</span>
                                    <span>{course.duration || '3 Months'}</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setVisitBranch(branch)}
                                  className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold uppercase rounded-lg transition-colors shrink-0 shadow-sm"
                                >
                                  Enroll
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700">
                            <p className="text-xs text-slate-500">
                              Upcoming cohorts are being scheduled.
                            </p>
                            <button
                              type="button"
                              onClick={() => setVisitBranch(branch)}
                              className="text-xs text-blue-600 hover:underline font-bold mt-1 inline-flex items-center gap-1"
                            >
                              <span>Speak with branch counselor</span>
                              <IoChevronDown size={12} className="-rotate-90" />
                            </button>
                          </div>
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

      {/* ── Modals ── */}
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

      {visitBranch && (
        <CampusVisitModal
          branch={visitBranch}
          onClose={() => setVisitBranch(null)}
        />
      )}

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
