'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  HiOutlineShieldExclamation, 
  HiOutlineArrowLeftOnRectangle, 
  HiOutlineEye,
  HiOutlineArrowTopRightOnSquare 
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

export default function ImpersonationBanner() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'bn';
  const [impersonation, setImpersonation] = useState(null);

  const checkImpersonation = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem('syict_impersonation') || localStorage.getItem('syict_impersonation');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.token && parsed?.targetUser) {
          setImpersonation(parsed);
          return;
        }
      }
      setImpersonation(null);
    } catch {
      setImpersonation(null);
    }
  }, []);

  useEffect(() => {
    checkImpersonation();

    const handleStorageChange = () => checkImpersonation();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('syict-impersonation-change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('syict-impersonation-change', handleStorageChange);
    };
  }, [checkImpersonation]);

  const handleExit = () => {
    try {
      localStorage.removeItem('syict_impersonation');
      sessionStorage.removeItem('syict_impersonation');
      window.dispatchEvent(new Event('syict-impersonation-change'));
      toast.success('Exited impersonation. Restored Super Admin privileges.');
      window.location.href = `/${locale}/super/users`;
    } catch {
      window.location.href = `/${locale}/super/users`;
    }
  };

  const getRoleDashboardRoute = (role) => {
    switch (role) {
      case 'student':
        return `/${locale}/student`;
      case 'instructor':
        return `/${locale}/instructor`;
      case 'branch_admin':
      case 'branch_management':
      case 'employee':
        return `/${locale}/branch`;
      default:
        return `/${locale}/super`;
    }
  };

  if (!impersonation) return null;

  const { targetUser, originalAdmin } = impersonation;

  return (
    <div className="sticky top-0 z-[200] w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-xl px-6 py-2.5 transition-all animate-fadeIn border-b border-amber-400/30">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Indicator & Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm shrink-0 border border-white/30 animate-pulse">
            <HiOutlineShieldExclamation size={20} className="text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-amber-200 border border-amber-300/20">
                ACTIVE IMPERSONATION
              </span>
              <span className="font-extrabold text-sm text-white">
                Viewing as {targetUser?.name || 'User'}
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                {targetUser?.role ? targetUser.role.replace('_', ' ') : 'USER'}
              </span>
            </div>
            <p className="text-[11px] text-amber-100/90 mt-0.5">
              Audited session under Super Admin <strong className="text-white underline">{originalAdmin?.name || 'Administrator'}</strong>. All actions are cryptographically logged.
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={() => router.push(getRoleDashboardRoute(targetUser?.role))}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded transition-all text-xs border border-white/20 active:scale-95"
            title="Navigate to impersonated role dashboard"
          >
            <HiOutlineEye size={15} />
            <span>Role Workspace</span>
            <HiOutlineArrowTopRightOnSquare size={13} className="opacity-70" />
          </button>

          <button
            onClick={handleExit}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-slate-900 hover:bg-amber-50 font-black rounded shadow-md transition-all text-xs active:scale-95"
          >
            <HiOutlineArrowLeftOnRectangle size={16} className="text-rose-600" />
            <span>Exit Impersonation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
