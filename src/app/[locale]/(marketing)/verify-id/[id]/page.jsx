'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import {
  HiShieldCheck,
  HiXCircle,
  HiBadgeCheck,
  HiOfficeBuilding,
  HiAcademicCap,
  HiCalendar,
  HiCheckCircle,
  HiArrowLeft
} from 'react-icons/hi';
import { IoSparklesOutline } from 'react-icons/io5';

export default function VerifyStudentPublicPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/users/public/verify-student/${id}`)
      .then((res) => {
        if (res.data?.success) {
          setData(res.data.data);
        } else {
          setError(res.data?.message || 'Student record not found.');
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Student record not found or invalid identification.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* ── Top Back Button ── */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
          >
            <HiArrowLeft size={16} /> Return to Homepage
          </Link>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Verifying student credentials with national registry...</p>
          </div>
        ) : error || !data ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-8 sm:p-10 text-center shadow-sm space-y-4"
          >
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <HiXCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Student Record Not Verified
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {error || 'The identification QR code or record ID provided could not be matched with any active student in the Smart Youth ICT database.'}
            </p>
            <div className="pt-4">
              <p className="text-xs text-gray-400">
                If you believe this is a technical error, please contact the campus branch registrar.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl overflow-hidden"
          >
            {/* ── Verified Header Banner ── */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-6 sm:p-8 text-white text-center relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
                <HiShieldCheck size={16} /> Official Verification Verified
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Smart Youth ICT Authenticated Student
              </h1>
              <p className="text-xs text-emerald-100 mt-1 max-w-md mx-auto">
                This certificate and credential ID is active and in good standing with the institute.
              </p>
            </div>

            {/* ── Student Profile Summary ── */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-6 border-b border-neutral-100 dark:border-neutral-800">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0 ring-4 ring-emerald-50 relative">
                  {data.avatar ? (
                    <Image
                      src={data.avatar}
                      alt={data.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-700 text-2xl font-black">
                      {data.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {data.name}
                    </h2>
                    <span className="p-1 text-emerald-600">
                      <HiCheckCircle size={20} />
                    </span>
                  </div>

                  <div className="inline-block font-mono text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/40 px-2.5 py-0.5 rounded-md mt-1 border border-indigo-100 dark:border-indigo-800">
                    ID: {data.studentId}
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                    <HiOfficeBuilding size={14} className="text-gray-400" />
                    Enrolled at: <span className="font-semibold text-gray-700 dark:text-gray-300">{data.branch?.name || 'Central Campus'}</span> ({data.branch?.city || 'Dhaka'})
                  </p>
                </div>
              </div>

              {/* ── Active Enrolled Programs ── */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                  Verified Active Programs ({data.courses?.length || 0})
                </h3>

                {data.courses?.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No public courses enrolled</p>
                ) : (
                  <div className="space-y-2.5">
                    {data.courses.map((c, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-lg">
                            <HiAcademicCap size={16} />
                          </span>
                          <div>
                            <div className="font-bold text-gray-800 dark:text-gray-200">
                              {c.title}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              Enrolled: {new Date(c.enrolledAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Verified
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Security Trust Notice ── */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl p-4 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <HiShieldCheck size={18} className="text-emerald-600" />
                  Official Smart Youth ICT Registry
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  This electronic identity record confirms that the individual above is registered in our academic student management system.
                </p>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 border-t border-neutral-100 dark:border-neutral-800 text-center text-[11px] text-gray-400">
              Smart Youth ICT Institute • Automated Verification Service • ID: {id}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
