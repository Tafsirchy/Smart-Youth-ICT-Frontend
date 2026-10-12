'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HiShieldExclamation, HiArrowLeft } from 'react-icons/hi';
import { motion } from 'framer-motion';

/**
 * AccessDenied
 * Displayed when an employee attempts to access a page they do not have permission for.
 * Shows what permission is missing and links back to the branch dashboard.
 * 
 * @param {string} permission - The permission that was required (for display)
 * @param {string} moduleName - Human-readable module name (e.g. "Payments")
 */
export default function AccessDenied({ permission, moduleName = 'this section' }) {
  const { branchId } = useParams();
  const backHref = branchId ? `/${branchId}/admin` : '/';

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100 shadow-sm">
            <HiShieldExclamation className="text-rose-500" size={40} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed">
          You don&apos;t have permission to access <span className="font-semibold text-slate-700">{moduleName}</span>.
          Please contact your Branch Manager to request access.
        </p>

        {/* Permission Badge */}
        {permission && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            Required: <span className="font-bold text-rose-600">{permission}</span>
          </div>
        )}

        {/* Back link */}
        <div>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            <HiArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
