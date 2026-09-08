"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import { getApiBaseUrl } from "@/lib/api-base";
import CourseCard from "@/components/courses/CourseCard";
import CampusVisitModal from "@/components/marketing/CampusVisitModal";
import {
  IoLocationOutline,
  IoCallOutline,
  IoLogoWhatsapp,
  IoTimeOutline,
  IoChevronDown,
  IoChevronUp,
  IoMapOutline,
  IoListOutline,
  IoSparklesOutline,
  IoNavigateOutline,
  IoMegaphoneOutline,
  IoCheckmarkCircleOutline,
  IoCalendarOutline,
  IoBusinessOutline,
  IoSearchOutline,
} from "react-icons/io5";

// Dynamically import Leaflet Map to avoid SSR issues
const BranchMap = dynamic(() => import("@/components/marketing/BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[440px] bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-3xl flex items-center justify-center text-neutral-400 font-bold uppercase tracking-widest text-xs">
      Loading Interactive Campus Map...
    </div>
  ),
});

// Haversine formula for distance calculation in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
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

export default function BranchDirectory({ locale }) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & State
  const [search, setSearch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [viewMode, setViewMode] = useState("split"); // 'split', 'cards', 'map'
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  // Geolocation
  const [userLocation, setUserLocation] = useState(null);
  const [locatingUser, setLocatingUser] = useState(false);

  // Expandable Courses
  const [expandedBranchId, setExpandedBranchId] = useState(null);
  const [branchCourses, setBranchCourses] = useState({});
  const [coursesLoading, setCoursesLoading] = useState({});

  // Campus Visit Modal
  const [visitBranch, setVisitBranch] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get(`${getApiBaseUrl()}/branches/public/all`);
        setBranches(res.data.data || []);
      } catch (err) {
        setError("Failed to load branches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // Request browser location
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocatingUser(false);
      },
      (err) => {
        console.warn("Geolocation failed", err);
        alert("Could not access your location. Please check browser permissions.");
        setLocatingUser(false);
      }
    );
  };

  // Live status calculation based on dynamic officeHours
  const getBranchStatus = useCallback((branch) => {
    if (!branch.officeHours || !branch.officeHours.length) {
      return { isOpen: true, label: "Open Daily 9 AM - 6 PM", color: "emerald" };
    }
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    const todayName = days[now.getDay()];
    const todaySchedule = branch.officeHours.find((h) => h.day === todayName);

    if (!todaySchedule || todaySchedule.isClosed) {
      return { isOpen: false, label: "Closed Today", color: "rose" };
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = (todaySchedule.open || "09:00").split(":").map(Number);
    const [closeH, closeM] = (todaySchedule.close || "18:00").split(":").map(Number);
    const openMinutes = openH * 60 + (openM || 0);
    const closeMinutes = closeH * 60 + (closeM || 0);

    if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
      return { isOpen: true, label: `Open Now • Closes ${todaySchedule.close}`, color: "emerald" };
    } else if (currentMinutes < openMinutes) {
      return { isOpen: false, label: `Opens Today at ${todaySchedule.open}`, color: "amber" };
    } else {
      return { isOpen: false, label: "Closed for Today", color: "neutral" };
    }
  }, []);

  // Dynamically extract divisions
  const divisions = useMemo(() => {
    const list = new Set();
    branches.forEach((b) => {
      if (b.division) list.add(b.division);
    });
    return ["All", ...Array.from(list)];
  }, [branches]);

  // Filtered & sorted branches
  const filteredBranches = useMemo(() => {
    let list = branches.map((b) => {
      let distance = null;
      if (userLocation && b.location?.coordinates) {
        const [bLng, bLat] = b.location.coordinates;
        distance = calculateDistance(userLocation.lat, userLocation.lng, bLat, bLng);
      }
      return { ...b, distance };
    });

    if (selectedDivision !== "All") {
      list = list.filter((b) => b.division === selectedDivision);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.name?.toLowerCase().includes(q) ||
          b.code?.toLowerCase().includes(q) ||
          b.address?.city?.toLowerCase().includes(q) ||
          b.address?.area?.toLowerCase().includes(q) ||
          b.address?.street?.toLowerCase().includes(q)
      );
    }

    // Sort by distance if GPS is active
    if (userLocation) {
      list.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });
    }

    return list;
  }, [branches, selectedDivision, search, userLocation]);

  const toggleBranchCourses = async (branchId) => {
    if (expandedBranchId === branchId) {
      setExpandedBranchId(null);
      return;
    }

    setExpandedBranchId(branchId);

    if (!branchCourses[branchId]) {
      setCoursesLoading((prev) => ({ ...prev, [branchId]: true }));
      try {
        const res = await axios.get(`${getApiBaseUrl()}/courses?branchId=${branchId}&limit=50`);
        setBranchCourses((prev) => ({ ...prev, [branchId]: res.data.data || [] }));
      } catch (err) {
        console.error("Failed to load courses for branch", err);
      } finally {
        setCoursesLoading((prev) => ({ ...prev, [branchId]: false }));
      }
    }
  };

  const handleSelectBranch = (branchId) => {
    setSelectedBranchId(branchId);
    // Scroll smoothly to branch card if in view
    const el = document.getElementById(`branch-card-${branchId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-24 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm">
          Locating Smart Youth ICT campuses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-medium max-w-md mx-auto px-4">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      {/* ── Hero Banner ── */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <IoBusinessOutline size={15} />
          Physical Hubs & Learning Centers
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
          Our Campuses Across Bangladesh
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed">
          Experience project-based learning in person. Benefit from high-spec computer labs,
          face-to-face mentor support, offline hackathons, and a vibrant student community.
        </p>

        {/* Network Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-white dark:bg-neutral-900 rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
            <div className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
              {branches.length}
            </div>
            <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Active Campuses
            </div>
          </div>
          <div className="p-3 bg-white dark:bg-neutral-900 rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
            <div className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
              {divisions.length - 1 || 1}
            </div>
            <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Divisions Covered
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-3 bg-white dark:bg-neutral-900 rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
            <div className="text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              100%
            </div>
            <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Hands-On Practical Labs
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-4 md:p-6 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <IoSearchOutline
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search branch name, district, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Locate Me Button */}
            <button
              onClick={handleLocateMe}
              disabled={locatingUser}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm ${
                userLocation
                  ? "bg-emerald-600 text-white shadow-emerald-500/20"
                  : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200"
              }`}
            >
              <IoNavigateOutline size={16} className={locatingUser ? "animate-spin" : ""} />
              {locatingUser
                ? "Locating..."
                : userLocation
                ? "Sorted by Proximity"
                : "Near Me (GPS)"}
            </button>

            {/* View Mode Switcher */}
            <div className="hidden lg:flex p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl gap-1">
              <button
                onClick={() => setViewMode("split")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === "split"
                    ? "bg-white dark:bg-neutral-900 text-blue-600 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400"
                }`}
              >
                <IoMapOutline size={14} /> Split
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === "cards"
                    ? "bg-white dark:bg-neutral-900 text-blue-600 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400"
                }`}
              >
                <IoListOutline size={14} /> List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  viewMode === "map"
                    ? "bg-white dark:bg-neutral-900 text-blue-600 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400"
                }`}
              >
                <IoMapOutline size={14} /> Map Only
              </button>
            </div>
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {divisions.map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                selectedDivision === div
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {div}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Layout: Map & Cards ── */}
      <div
        className={`grid gap-8 ${
          viewMode === "split"
            ? "grid-cols-1 lg:grid-cols-12"
            : viewMode === "map"
            ? "grid-cols-1"
            : "grid-cols-1"
        }`}
      >
        {/* Interactive Map Column */}
        {(viewMode === "split" || viewMode === "map") && (
          <div
            className={`${
              viewMode === "split"
                ? "lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 h-[450px] lg:h-[calc(100vh-140px)]"
                : "w-full h-[600px]"
            }`}
          >
            <BranchMap
              branches={filteredBranches}
              selectedBranchId={selectedBranchId}
              onSelectBranch={handleSelectBranch}
              getStatus={getBranchStatus}
            />
          </div>
        )}

        {/* Campus Cards Column */}
        {viewMode !== "map" && (
          <div
            className={`space-y-6 ${
              viewMode === "split" ? "lg:col-span-7 xl:col-span-7" : "w-full"
            }`}
          >
            {filteredBranches.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8">
                <IoLocationOutline className="mx-auto text-neutral-400 mb-3" size={40} />
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
                  No campuses match your criteria
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Try adjusting your search query or selecting a different division.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedDivision("All");
                  }}
                  className="mt-4 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
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

                return (
                  <div
                    key={branch._id}
                    id={`branch-card-${branch._id}`}
                    onClick={() => setSelectedBranchId(branch._id)}
                    className={`bg-white dark:bg-neutral-900 rounded-3xl shadow-sm ring-1 transition-all overflow-hidden ${
                      isSelected
                        ? "ring-2 ring-blue-600 shadow-lg shadow-blue-500/5"
                        : "ring-neutral-200 dark:ring-neutral-800 hover:shadow-md"
                    }`}
                  >
                    {/* Notice / Announcement if configured in dashboard */}
                    {branch.notice?.isActive && branch.notice.title && (
                      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center gap-2 text-amber-700 dark:text-amber-300 text-xs font-bold">
                        <IoMegaphoneOutline size={16} className="shrink-0" />
                        <span>{branch.notice.title}:</span>
                        <span className="font-medium">{branch.notice.text}</span>
                      </div>
                    )}

                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Top Bar: Badges & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              branch.type === "head_office"
                                ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {branch.code} • {branch.type?.replace("_", " ")}
                          </span>

                          {branch.division && (
                            <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                              {branch.division}
                            </span>
                          )}

                          {branch.distance !== null && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold tracking-wider flex items-center gap-1">
                              <IoNavigateOutline size={12} />
                              {branch.distance.toFixed(1)} km away
                            </span>
                          )}
                        </div>

                        {/* Live Status Badge */}
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            status.isOpen
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : status.color === "amber"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              status.isOpen
                                ? "bg-emerald-500 animate-ping"
                                : "bg-neutral-400"
                            }`}
                          />
                          <span>{status.label}</span>
                        </div>
                      </div>

                      {/* Identity & Location */}
                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                        {branch.coverImage ? (
                          <div className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 relative">
                            <Image
                              src={branch.coverImage}
                              alt={branch.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        ) : branch.logo ? (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 relative">
                            <Image
                              src={branch.logo}
                              alt={branch.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        ) : null}

                        <div className="flex-1 space-y-2">
                          <h3 className="text-2xl font-black text-neutral-900 dark:text-white leading-tight">
                            {branch.name}
                          </h3>

                          {branch.address && (
                            <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <IoLocationOutline
                                className="shrink-0 mt-0.5 text-blue-600"
                                size={18}
                              />
                              <span>
                                {[
                                  branch.address.street,
                                  branch.address.area,
                                  branch.address.city,
                                  branch.address.country,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </div>
                          )}

                          {branch.contact?.phones && branch.contact.phones.length > 0 && (
                            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 pt-1">
                              <div className="flex items-center gap-1.5">
                                <IoCallOutline className="text-blue-600" size={16} />
                                <a
                                  href={`tel:${branch.contact.phones[0]}`}
                                  className="hover:underline font-semibold"
                                >
                                  {branch.contact.phones.join(" / ")}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dynamic Facilities Chips */}
                      {branch.facilities && branch.facilities.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                            Campus Amenities & Infrastructure
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {branch.facilities.map((fac, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5"
                              >
                                <IoSparklesOutline size={12} className="text-blue-600" />
                                {fac}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dynamic Campus Photo Gallery */}
                      {branch.gallery && branch.gallery.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                            Campus & Lab Showcase ({branch.gallery.length} photos)
                          </div>
                          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
                            {branch.gallery.map((imgUrl, idx) => (
                              <a
                                key={idx}
                                href={imgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-36 sm:w-44 aspect-video rounded-xl overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700 hover:scale-105 active:scale-95 transition-all shadow-sm snap-start group"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`${branch.name} photo ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        {/* Book Tour / Consultation Modal Trigger */}
                        <button
                          onClick={() => setVisitBranch(branch)}
                          className="flex-1 sm:flex-none min-h-[44px] inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md shadow-blue-500/20"
                        >
                          <IoCalendarOutline size={16} />
                          Schedule Campus Visit
                        </button>

                        {/* WhatsApp Direct */}
                        {branch.whatsapp && (
                          <a
                            href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Smart%20Youth%20ICT%20${encodeURIComponent(
                              branch.name
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-bold uppercase tracking-wider transition-colors border border-emerald-200 dark:border-emerald-800 active:scale-95"
                          >
                            <IoLogoWhatsapp size={16} />
                            WhatsApp
                          </a>
                        )}

                        {/* Google Maps Directions */}
                        {branch.location?.googleMapsUrl && (
                          <a
                            href={branch.location.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-colors"
                          >
                            <IoMapOutline size={16} />
                            Directions
                          </a>
                        )}

                        {/* Courses Accordion Toggle */}
                        <button
                          onClick={() => toggleBranchCourses(branch._id)}
                          className="min-h-[44px] inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-colors ml-auto w-full sm:w-auto"
                        >
                          Available Courses
                          {isExpanded ? (
                            <IoChevronUp size={16} />
                          ) : (
                            <IoChevronDown size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Courses Section */}
                    {isExpanded && (
                      <div className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-6 md:p-8 animate-in slide-in-from-top-4 fade-in duration-300">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase tracking-wider">
                            Courses Offered at {branch.name}
                          </h4>
                          <span className="text-xs text-neutral-500">
                            {courses ? `${courses.length} courses` : "Loading..."}
                          </span>
                        </div>

                        {isLoadingCourses ? (
                          <div className="flex justify-center py-8">
                            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : courses && courses.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                              <CourseCard key={course._id} course={course} locale={locale} />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10 text-neutral-500 dark:text-neutral-400 text-sm">
                            No active courses assigned to this branch right now. Please inquire for upcoming batches.
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

      {/* Campus Visit Modal */}
      {visitBranch && (
        <CampusVisitModal
          branch={visitBranch}
          onClose={() => setVisitBranch(null)}
        />
      )}
    </div>
  );
}
