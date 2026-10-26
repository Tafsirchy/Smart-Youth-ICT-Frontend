'use client';

import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  IoLocationOutline,
  IoCallOutline,
  IoExpandOutline,
  IoCalendarOutline,
  IoNavigateOutline,
  IoCloseOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
import { getBranchThumbnail, DIVISION_CAMPUS_FALLBACKS } from './BranchDirectory';

// Fix Leaflet tile sizing & dynamic container reflow
function MapLifecycleController({ selectedBranch, branches }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate size on mount and staggered intervals to avoid grey/black tiles
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);
    const t3 = setTimeout(() => map.invalidateSize(), 1000);

    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  // Smoothly fly to selected branch when changed
  useEffect(() => {
    if (selectedBranch && selectedBranch.location?.coordinates) {
      const [lng, lat] = selectedBranch.location.coordinates;
      if (lat && lng) {
        map.flyTo([lat, lng], 13, {
          duration: 1.2,
          easeLinearity: 0.25,
        });
      }
    }
  }, [selectedBranch, map]);

  return null;
}

// Cached marker icon generator for 60fps performance without DOM reconstruction
const markerIconCache = new Map();

const getMarkerIcon = (branch, isSelected, isHovered) => {
  const isHQ = branch.type === 'head_office';
  const displayName = isHQ ? 'Corporate HQ' : branch.name || branch.code || 'Campus';
  const cacheKey = `${branch._id}_${displayName}_${isSelected ? 's' : '0'}_${isHovered ? 'h' : '0'}`;

  if (markerIconCache.has(cacheKey)) {
    return markerIconCache.get(cacheKey);
  }

  const bgGradient = isHQ
    ? 'background: linear-gradient(135deg, #FF2C6D, #E11D48);'
    : 'background: linear-gradient(135deg, #1E293B, #0F172A);';

  const transform = isSelected || isHovered ? 'scale(1.12); z-index: 999;' : 'scale(1);';
  const shadow = isSelected || isHovered
    ? 'box-shadow: 0 8px 24px -2px rgba(30, 41, 59, 0.45);'
    : 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);';

  const pulseRing = isSelected || isHovered
    ? `<span style="position: absolute; inset: -4px; border-radius: 9999px; background-color: ${
        isHQ ? '#FF2C6D' : '#3B82F6'
      }; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>`
    : '';

  const html = `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); transform: ${transform}">
      ${pulseRing}
      <div style="${bgGradient} ${shadow} color: white; padding: 4px 9px; border-radius: 9999px; font-weight: 700; font-size: 10px; letter-spacing: 0.02em; border: 1.5px solid #ffffff; display: flex; align-items: center; gap: 4px; white-space: nowrap; font-family: system-ui, sans-serif;">
        <span style="width: 6px; height: 6px; border-radius: 50%; background-color: ${isHQ ? '#FFD700' : '#38BDF8'};"></span>
        <span>${displayName}</span>
      </div>
      <div style="width: 6px; height: 6px; background-color: ${
        isHQ ? '#E11D48' : '#0F172A'
      }; transform: rotate(45deg); margin-top: -3px; border-bottom: 1px solid #fff; border-right: 1px solid #fff;"></div>
    </div>
  `;

  const icon = L.divIcon({
    html,
    className: 'custom-smart-marker',
    iconSize: [80, 32],
    iconAnchor: [40, 30],
    popupAnchor: [0, -30],
  });

  markerIconCache.set(cacheKey, icon);
  return icon;
};

export default function BranchMap({
  branches,
  selectedBranchId,
  hoveredBranchId,
  onSelectBranch,
  onVirtualTour,
  onScheduleVisit,
  getStatus,
}) {
  const mapRef = useRef(null);

  // Center of Bangladesh
  const defaultCenter = [23.8103, 90.4125];

  const selectedBranch = useMemo(
    () => branches.find((b) => b._id === selectedBranchId) || null,
    [branches, selectedBranchId]
  );

  // Filter branches with valid coordinates
  const mappableBranches = useMemo(() => {
    return branches.filter((b) => {
      const coords = b.location?.coordinates;
      return (
        coords &&
        Array.isArray(coords) &&
        coords.length === 2 &&
        typeof coords[0] === 'number' &&
        typeof coords[1] === 'number' &&
        !isNaN(coords[0]) &&
        !isNaN(coords[1])
      );
    });
  }, [branches]);

  const handleFitAll = useCallback(() => {
    if (!mapRef.current) return;
    const coords = mappableBranches.map((b) => [
      b.location.coordinates[1],
      b.location.coordinates[0],
    ]);
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [mappableBranches]);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900 group">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={false}
        ref={mapRef}
        className="w-full h-full min-h-[420px] z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains="abc"
          maxZoom={19}
        />

        <MapLifecycleController
          selectedBranch={selectedBranch}
          branches={mappableBranches}
        />

        {mappableBranches.map((branch) => {
          const [lng, lat] = branch.location.coordinates;
          const isSelected = branch._id === selectedBranchId;
          const isHovered = branch._id === hoveredBranchId;

          return (
            <Marker
              key={branch._id}
              position={[lat, lng]}
              icon={getMarkerIcon(branch, isSelected, isHovered)}
              eventHandlers={{
                click: () => onSelectBranch && onSelectBranch(branch._id),
              }}
            />
          );
        })}
      </MapContainer>

      {/* Floating Map Controls Bar */}
      <div className="absolute top-3.5 inset-x-3.5 z-[400] flex items-center justify-between pointer-events-none">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 shadow-md border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 rounded-xl pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{mappableBranches.length} Campuses on Map</span>
        </div>

        <button
          type="button"
          onClick={handleFitAll}
          className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 shadow-md border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 rounded-xl transition-all active:scale-95 pointer-events-auto"
        >
          <IoExpandOutline size={14} />
          <span>Fit All</span>
        </button>
      </div>

      {/* Floating Active Campus Preview Card */}
      {selectedBranch && (
        <div className="absolute bottom-3.5 inset-x-3.5 z-[400] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3 items-center min-w-0">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 relative border border-slate-200 dark:border-slate-700 shadow-xs">
                <img
                  src={getBranchThumbnail(selectedBranch)}
                  alt={selectedBranch.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      DIVISION_CAMPUS_FALLBACKS[selectedBranch.division] ||
                      DIVISION_CAMPUS_FALLBACKS.Default;
                  }}
                />
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 rounded">
                    {selectedBranch.code || 'Campus'}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate m-0 leading-tight">
                    {selectedBranch.name}
                  </h4>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                  <IoLocationOutline size={13} className="text-blue-600 shrink-0" />
                  <span>
                    {[selectedBranch.address?.area, selectedBranch.address?.city, selectedBranch.division]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </p>

                {getStatus && (
                  <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{getStatus(selectedBranch).label}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectBranch && onSelectBranch(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
              title="Close preview"
            >
              <IoCloseOutline size={18} />
            </button>
          </div>

          {/* Quick Action Buttons on Map */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onScheduleVisit && onScheduleVisit(selectedBranch)}
              className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
            >
              <IoCalendarOutline size={14} />
              <span>Book Visit</span>
            </button>

            <button
              type="button"
              onClick={() => onVirtualTour && onVirtualTour(selectedBranch)}
              className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 dark:text-blue-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 active:scale-95 border border-blue-200 dark:border-blue-800"
            >
              <IoVideocamOutline size={15} />
              <span>Tour</span>
            </button>

            {selectedBranch.location?.googleMapsUrl && (
              <a
                href={selectedBranch.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors"
                title="Google Maps"
              >
                <IoNavigateOutline size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
