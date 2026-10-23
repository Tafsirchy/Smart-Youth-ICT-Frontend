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
  IoSchoolOutline,
} from 'react-icons/io5';
import { getBranchThumbnail, DIVISION_CAMPUS_FALLBACKS } from './BranchDirectory';

// Fix Leaflet tile sizing & dynamic container reflow
function MapLifecycleController({ selectedBranch, branches }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate size on mount and staggered intervals to avoid black quadrants
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 400);
    const t3 = setTimeout(() => map.invalidateSize(), 800);

    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  // Fly to selected branch when changed
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
  const shortCode = branch.code || (isHQ ? 'HQ' : 'CAMPUS');
  const cacheKey = `${branch._id}_${shortCode}_${isSelected ? 's' : '0'}_${isHovered ? 'h' : '0'}`;

  if (markerIconCache.has(cacheKey)) {
    return markerIconCache.get(cacheKey);
  }

  const bgGradient = isHQ
    ? 'background: linear-gradient(135deg, #FF2C6D, #E11D48);'
    : 'background: linear-gradient(135deg, #2563EB, #4F46E5);';

  const transform = isSelected || isHovered ? 'scale(1.15); z-index: 999;' : 'scale(1);';
  const shadow = isSelected || isHovered
    ? 'box-shadow: 0 6px 18px -2px rgba(37, 99, 235, 0.45);'
    : 'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);';

  const pulseRing = isSelected || isHovered
    ? `<span style="position: absolute; inset: -4px; border-radius: 9999px; background-color: ${
        isHQ ? '#FF2C6D' : '#3B82F6'
      }; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>`
    : '';

  const html = `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); transform: ${transform}">
      ${pulseRing}
      <div style="${bgGradient} ${shadow} color: white; padding: 3px 8px; border-radius: 9px; font-weight: 800; font-size: 10px; letter-spacing: 0.03em; text-transform: uppercase; border: 1.5px solid #ffffff; display: flex; align-items: center; gap: 3px; white-space: nowrap;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 11px; height: 11px;" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <span>${shortCode}</span>
      </div>
      <div style="width: 6px; height: 6px; background-color: ${
        isHQ ? '#E11D48' : '#2563EB'
      }; transform: rotate(45deg); margin-top: -3px;"></div>
    </div>
  `;

  const icon = L.divIcon({
    html,
    className: 'custom-smart-marker',
    iconSize: [52, 32],
    iconAnchor: [26, 30],
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

  // Filter branches with coordinates
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
    <div className="w-full h-full relative overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-md bg-neutral-100 dark:bg-neutral-900 group">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={false}
        ref={mapRef}
        className="w-full h-full min-h-[360px] z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

      {/* Compact Floating Header Controls */}
      <div className="absolute top-2.5 inset-x-2.5 z-[400] flex items-center justify-between pointer-events-none">
        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-2.5 py-1 shadow-md border border-neutral-200/80 dark:border-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 rounded-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{mappableBranches.length} Campuses</span>
        </div>

        <button
          type="button"
          onClick={handleFitAll}
          className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-2.5 py-1 shadow-md border border-neutral-200/80 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 rounded-lg transition-all active:scale-95 pointer-events-auto"
        >
          <IoExpandOutline size={13} />
          <span>Fit All</span>
        </button>
      </div>

      {/* Floating Active Campus Preview Card (Compact & High-Density) */}
      {selectedBranch && (
        <div className="absolute bottom-2.5 inset-x-2.5 z-[400] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-neutral-200/80 dark:border-neutral-800 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex gap-2.5 items-center min-w-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 relative border border-neutral-200 dark:border-neutral-700">
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
                  <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 rounded">
                    {selectedBranch.code}
                  </span>
                  <h4 className="font-extrabold text-xs text-neutral-900 dark:text-white truncate m-0 leading-none">
                    {selectedBranch.name}
                  </h4>
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 truncate">
                  <IoLocationOutline size={12} className="text-blue-600 shrink-0" />
                  <span>
                    {[selectedBranch.address?.area, selectedBranch.address?.city]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </p>

                {getStatus && (
                  <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{getStatus(selectedBranch).label}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectBranch && onSelectBranch(null)}
              className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg transition-colors"
            >
              <IoCloseOutline size={16} />
            </button>
          </div>

          {/* Quick Action Buttons on Map */}
          <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onVirtualTour && onVirtualTour(selectedBranch)}
              className="flex-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center gap-1 active:scale-95"
            >
              <IoVideocamOutline size={13} />
              <span>Tour</span>
            </button>

            <button
              type="button"
              onClick={() => onScheduleVisit && onScheduleVisit(selectedBranch)}
              className="flex-1 py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1 active:scale-95"
            >
              <IoCalendarOutline size={12} />
              <span>Visit Desk</span>
            </button>

            {selectedBranch.location?.googleMapsUrl && (
              <a
                href={selectedBranch.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg transition-colors"
                title="Google Maps"
              >
                <IoNavigateOutline size={14} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
