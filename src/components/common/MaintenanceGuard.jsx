'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HiOutlineWrenchScrewdriver, 
  HiOutlinePhone,
  HiOutlineArrowRight,
  HiOutlineCog6Tooth,
  HiOutlineShieldCheck,
  HiOutlineClock
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function MaintenanceGuard({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname() || '';
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [checking, setChecking] = useState(true);
  const [turningOff, setTurningOff] = useState(false);

  // Extract locale from pathname (e.g. /en/... or /bn/...)
  const localeMatch = pathname.match(/^\/(en|bn)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'en';

  const isSuperAdmin = session?.user?.role === 'super_admin' || session?.user?.role === 'super_management';
  const isSuperRoute = pathname.includes('/super');
  const isLoginRoute = pathname.includes('/login') || pathname.includes('/auth');

  useEffect(() => {
    let isMounted = true;
    const fetchMaintenanceStatus = async () => {
      try {
        const res = await api.get('/cms/settings/public', { timeout: 8000 });
        if (isMounted && res.data?.success && res.data.data) {
          setMaintenanceMode(Boolean(res.data.data.maintenanceMode));
        }
      } catch (err) {
        // Fallback: silently ignore if offline/network drop
      } finally {
        if (isMounted) setChecking(false);
      }
    };

    fetchMaintenanceStatus();
    // Poll every 15 seconds to auto-recover when admin turns it off
    const interval = setInterval(fetchMaintenanceStatus, 15000);

    // Listen for real-time maintenanceModeChanged events dispatched across the app
    const handleSync = (e) => {
      if (typeof e.detail?.maintenanceMode === 'boolean') {
        setMaintenanceMode(e.detail.maintenanceMode);
      }
    };
    window.addEventListener('maintenanceModeChanged', handleSync);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('maintenanceModeChanged', handleSync);
    };
  }, [pathname]);

  const handleTurnOffMaintenance = async (e) => {
    if (e) e.preventDefault();
    if (turningOff) return;
    setTurningOff(true);

    // Instant optimistic UI update: hide banner right away
    setMaintenanceMode(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('maintenanceModeChanged', { detail: { maintenanceMode: false } }));
    }

    try {
      const res = await api.put('/super/settings', { key: 'maintenanceMode', value: false });
      if (res.data?.success) {
        toast.success('Maintenance mode disabled. Platform is now live!');
      } else {
        throw new Error(res.data?.message || 'Failed to update setting');
      }
    } catch (err) {
      console.error('[Turn Off Maintenance Error]', err);
      // Revert if API call fails
      setMaintenanceMode(true);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('maintenanceModeChanged', { detail: { maintenanceMode: true } }));
      }
      toast.error('Failed to turn off maintenance mode. Check your connection.');
    } finally {
      setTurningOff(false);
    }
  };

  // If maintenance is OFF, render children normally
  if (!maintenanceMode) {
    return <>{children}</>;
  }

  // If maintenance is ON and user is Super Admin or accessing Super/Login routes:
  if (isSuperAdmin || isSuperRoute || isLoginRoute) {
    return (
      <>
        {/* Top Sticky Super Admin Warning Ribbon */}
        {(isSuperAdmin || isSuperRoute) && (
          <div className="bg-amber-500 text-slate-950 text-xs font-bold py-2 px-4 shadow-sm flex items-center justify-between sticky top-0 z-[9999999] border-b border-amber-600/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
              <span>
                <strong>MAINTENANCE MODE ACTIVE:</strong> Public site & student portals are offline. You have Super Admin bypass.
              </span>
            </div>
            <button
              type="button"
              id="btn-turn-off-maintenance"
              onClick={handleTurnOffMaintenance}
              disabled={turningOff}
              className="px-2.5 py-0.5 bg-slate-950 text-white hover:bg-slate-900 active:scale-95 disabled:opacity-60 rounded text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer select-none"
            >
              <HiOutlineCog6Tooth size={13} className={turningOff ? 'animate-spin' : ''} />
              <span>{turningOff ? 'TURNING OFF...' : 'TURN OFF'}</span>
            </button>
          </div>
        )}
        {children}
      </>
    );
  }

  // Otherwise (Visitor, Student, Branch User on public or standard dashboard route):
  // Render Compact, Clean, Smart, Light-Theme Maintenance Screen
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-4 relative selection:bg-indigo-100">
      
      {/* Compact Center Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[420px] w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.06)] relative z-10 text-center space-y-4"
      >
        {/* Minimalist Icon Badge */}
        <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-indigo-600 shadow-xs relative">
          <HiOutlineWrenchScrewdriver size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white" />
        </div>

        {/* Maintenance Text Below Icon */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            Scheduled Maintenance
          </span>
        </div>

        {/* Headings */}
        <div className="space-y-1.5">
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            We are Upgrading the Platform
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-xs mx-auto">
            Smart Youth ICT is currently performing scheduled infrastructure and security upgrades. All courses and portals will resume shortly.
          </p>
        </div>

        {/* Live System Info Strip - Compact */}
        <div className="py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
          <div className="flex items-center gap-1.5 text-slate-700">
            <HiOutlineShieldCheck size={14} className="text-emerald-600" />
            <span>Infrastructure Sync</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <HiOutlineClock size={12} />
            <span>In Progress</span>
          </div>
        </div>

        {/* Contact Actions - Compact */}
        <div className="pt-1 flex items-center justify-center gap-2">
          <a
            href="https://wa.me/8801700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <FaWhatsapp size={14} /> WhatsApp
          </a>
          <a
            href="tel:+8801700000000"
            className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 shadow-xs transition-all active:scale-95"
          >
            <HiOutlinePhone size={14} /> Helpline
          </a>
        </div>

        {/* Staff Sign In Link */}
        <div className="pt-1">
          <Link
            href={`/${locale}/login`}
            className="text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
          >
            Authorized Staff Sign In <HiOutlineArrowRight size={11} />
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-4 text-center text-[10px] text-slate-400 font-medium">
        &copy; {new Date().getFullYear()} Smart Youth ICT. All rights reserved.
      </footer>
    </div>
  );
}
