'use client';

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IoLocationOutline, IoCallOutline } from 'react-icons/io5';

// Component to dynamically re-center/fly to selected branch
function MapFlyTo({ selectedBranch }) {
  const map = useMap();

  useEffect(() => {
    if (selectedBranch && selectedBranch.location?.coordinates) {
      const [lng, lat] = selectedBranch.location.coordinates;
      if (lat && lng) {
        map.flyTo([lat, lng], 14, {
          duration: 1.2,
          easeLinearity: 0.25,
        });
      }
    }
  }, [selectedBranch, map]);

  return null;
}

// Custom Leaflet DivIcon generator
const createBranchIcon = (isHQ, isSelected) => {
  const bgClass = isHQ
    ? 'bg-gradient-to-tr from-pink-600 to-rose-500 ring-4 ring-pink-500/20'
    : 'bg-gradient-to-tr from-blue-600 to-indigo-600 ring-4 ring-blue-500/20';

  const scale = isSelected ? 'scale-125 z-50' : 'hover:scale-110';

  const html = `
    <div class="relative flex items-center justify-center transition-transform duration-300 ${scale}">
      <div class="w-9 h-9 rounded-2xl ${bgClass} text-white shadow-xl flex items-center justify-center font-bold text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 bg-slate-900 rotate-45 rounded-sm"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-branch-marker',
    iconSize: [36, 42],
    iconAnchor: [18, 42],
    popupAnchor: [0, -42],
  });
};

export default function BranchMap({ branches, selectedBranchId, onSelectBranch, getStatus }) {
  // Center of Bangladesh as default
  const defaultCenter = [23.8103, 90.4125];

  const selectedBranch = useMemo(
    () => branches.find((b) => b._id === selectedBranchId),
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

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800">
      <MapContainer
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-full min-h-[440px] z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFlyTo selectedBranch={selectedBranch} />

        {mappableBranches.map((branch) => {
          const [lng, lat] = branch.location.coordinates;
          const isHQ = branch.type === 'head_office';
          const isSelected = branch._id === selectedBranchId;
          const status = getStatus ? getStatus(branch) : null;

          return (
            <Marker
              key={branch._id}
              position={[lat, lng]}
              icon={createBranchIcon(isHQ, isSelected)}
              eventHandlers={{
                click: () => onSelectBranch && onSelectBranch(branch._id),
              }}
            >
              <Popup className="custom-branch-popup">
                <div className="p-2 max-w-xs space-y-2 text-neutral-800">
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                      {branch.code} • {branch.type?.replace('_', ' ')}
                    </span>
                    {status && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          status.isOpen
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {status.label}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-neutral-900 leading-tight">
                      {branch.name}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5 flex items-start gap-1">
                      <IoLocationOutline className="shrink-0 mt-0.5 text-blue-600" size={14} />
                      <span>
                        {[branch.address?.area, branch.address?.city].filter(Boolean).join(', ')}
                      </span>
                    </p>
                  </div>

                  {branch.contact?.phones?.[0] && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                      <IoCallOutline className="text-blue-600" size={13} />
                      <a href={`tel:${branch.contact.phones[0]}`} className="hover:underline font-semibold">
                        {branch.contact.phones[0]}
                      </a>
                    </div>
                  )}

                  <div className="pt-1 flex gap-2">
                    {branch.location?.googleMapsUrl && (
                      <a
                        href={branch.location.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-colors"
                      >
                        Directions
                      </a>
                    )}
                    <button
                      onClick={() => onSelectBranch && onSelectBranch(branch._id)}
                      className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Overlay Badge */}
      <div className="absolute top-4 left-4 z-[400] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-neutral-200/60 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-200 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span>{mappableBranches.length} Campuses on Map</span>
      </div>
    </div>
  );
}
