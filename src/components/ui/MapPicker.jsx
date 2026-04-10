'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HiOutlineMagnifyingGlass, HiOutlineMapPin, HiOutlineCursorArrowRays } from 'react-icons/hi2';

// Local Icon Configuration
const getIcon = (retina = false) => L.icon({
  iconUrl: retina ? '/images/map/marker-icon-2x.png' : '/images/map/marker-icon.png',
  shadowUrl: '/images/map/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const defaultIcon = getIcon();

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={defaultIcon} />
  );
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Internal Controls Component
function MapControls({ onLocate }) {
  return (
    <div className="absolute top-20 right-3 z-[1000] flex flex-col gap-2">
      <button 
        type="button"
        onClick={onLocate}
        className="p-3 bg-white hover:bg-slate-50 text-slate-600 rounded-xl shadow-lg border border-slate-100 transition-all active:scale-95"
        title="Locate Me"
      >
        <HiOutlineCursorArrowRays size={20} />
      </button>
    </div>
  );
}

const MapPicker = React.memo(({ value, onChange }) => {
  const initialPos = useMemo(() => (
    value?.lat && value?.long ? { lat: parseFloat(value.lat), lng: parseFloat(value.long) } : { lat: 23.8103, lng: 90.4125 }
  ), [value?.lat, value?.long]);

  const [position, setPosition] = useState(initialPos);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(13);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Sync internal position with prop value when it changes externally
  useEffect(() => {
    if (value?.lat && value?.long) {
      const newPos = { lat: parseFloat(value.lat), lng: parseFloat(value.long) };
      if (newPos.lat !== position.lat || newPos.lng !== position.lng) {
        setPosition(newPos);
      }
    }
  }, [value?.lat, value?.long]);

  const fetchAddress = async (lat, lon) => {
    setIsGeocoding(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data && data.address) {
        return {
          street: data.address.road || data.address.suburb || '',
          area: data.address.neighbourhood || data.address.suburb || data.address.residential || '',
          city: data.address.city || data.address.town || data.address.village || '',
          fullAddress: data.display_name
        };
      }
    } catch (err) {
      console.error('Reverse geocode failed', err);
    } finally {
      setIsGeocoding(false);
    }
    return null;
  };

  const handlePositionUpdate = useCallback(async (newPos, shouldGeocode = true) => {
    setPosition(newPos);
    
    let addressData = null;
    if (shouldGeocode) {
      addressData = await fetchAddress(newPos.lat, newPos.lng);
    }

    onChange({
      lat: newPos.lat.toFixed(6),
      long: newPos.lng.toFixed(6),
      address: addressData
    });
  }, [onChange]);

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      handlePositionUpdate(newPos);
      setZoom(16);
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
        handlePositionUpdate(newPos);
        setZoom(16);
      }
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative group">
        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Search for a building, area, or city..."
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit"
          disabled={isGeocoding}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl border border-slate-100 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
        >
          {isGeocoding ? <div className="w-3 h-3 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" /> : 'Find'}
        </button>
      </form>

      {/* Map Container */}
      <div className="h-[400px] w-full rounded-[32px] overflow-hidden border-4 border-slate-50 relative group shadow-inner">
        <MapContainer 
          center={position} 
          zoom={zoom} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={handlePositionUpdate} />
          <ChangeView center={position} zoom={zoom} />
          <MapControls onLocate={handleLocateMe} />
        </MapContainer>
        
        {/* Coordinates Badge */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
             <HiOutlineMapPin size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Precise Focus</p>
            <p className="text-sm font-bold text-slate-900">{position.lat.toFixed(4)}, {position.lng.toFixed(4)}</p>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-slate-400 font-medium italic text-center">
        Click to pin precise coordinates. Address data will be inferred automatically.
      </p>
    </div>
  );
});

MapPicker.displayName = 'MapPicker';
export default MapPicker;
