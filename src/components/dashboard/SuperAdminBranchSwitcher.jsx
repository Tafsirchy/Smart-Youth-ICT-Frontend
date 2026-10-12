'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { HiOfficeBuilding, HiChevronDown, HiSparkles, HiGlobe } from 'react-icons/hi';
import api from '@/lib/api';

export default function SuperAdminBranchSwitcher({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale || 'en';
  const currentBranchId = params.branchId;

  const [branches, setBranches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.role === 'super_admin' || user?.role === 'super_management') {
      api.get('/branches/public/list')
        .then((res) => {
          if (res.data?.success) setBranches(res.data.data || []);
        })
        .catch(() => {});
    }
  }, [user]);

  if (user?.role !== 'super_admin' && user?.role !== 'super_management') {
    return null;
  }

  const currentBranch = branches.find((b) => b._id === currentBranchId || b.code?.toLowerCase() === currentBranchId?.toLowerCase() || b.slug === currentBranchId);
  const isGlobalView = pathname.includes('/super');

  const handleSelectBranch = (branch) => {
    setIsOpen(false);
    if (!branch) {
      router.push(`/${locale}/super`);
    } else {
      router.push(`/${locale}/${branch._id}/admin`);
    }
  };

  return (
    <div className="mb-4 bg-slate-900 border border-slate-800 text-white px-4 py-2.5 rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="p-1.5 bg-pink-500/20 text-pink-400 rounded-lg">
          <HiSparkles size={16} />
        </span>
        <span className="font-bold text-slate-300">Super Admin Mode:</span>
        <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono font-semibold">
          {isGlobalView ? 'Global Headquarters View' : `Inspecting: ${currentBranch?.name || currentBranchId || 'Local Branch'}`}
        </span>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg border border-slate-700 transition"
        >
          <HiOfficeBuilding size={14} className="text-pink-400" />
          <span>Switch Branch Portal</span>
          <HiChevronDown size={14} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-1 z-[250] text-slate-200 divide-y divide-slate-700">
            <div className="p-1">
              <button
                type="button"
                onClick={() => handleSelectBranch(null)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700/80 transition ${
                  isGlobalView ? 'bg-pink-600 text-white font-bold' : ''
                }`}
              >
                <HiGlobe size={16} className="text-pink-400" />
                <div>
                  <p className="font-semibold">Global Headquarters</p>
                  <p className="text-[10px] text-slate-400">All branches overview & stats</p>
                </div>
              </button>
            </div>

            <div className="p-1 max-h-56 overflow-y-auto">
              <p className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">Local Branches</p>
              {branches.map((b) => (
                <button
                  key={b._id}
                  type="button"
                  onClick={() => handleSelectBranch(b)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between hover:bg-slate-700/80 transition ${
                    currentBranch?._id === b._id ? 'bg-indigo-600 text-white font-bold' : ''
                  }`}
                >
                  <span className="truncate">{b.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{b.code}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
