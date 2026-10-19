'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  HiBadgeCheck,
  HiPrinter,
  HiDownload,
  HiIdentification,
  HiOfficeBuilding,
  HiCalendar,
  HiShieldCheck,
  HiRefresh
} from 'react-icons/hi';
import { IoCheckmarkCircle, IoSparkles } from 'react-icons/io5';

export default function StudentIdCardPage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipBack, setFlipBack] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/users/me').catch(() => ({ data: { data: null } })),
      api.get('/enrollments/my-courses').catch(() => ({ data: { data: [] } })),
    ]).then(([uRes, eRes]) => {
      if (uRes.data?.data) {
        setProfile(uRes.data.data);
      }
      setEnrollments(eRes.data?.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const user = profile || session?.user;
  const branch = user?.branchId;
  const branchCode = branch?.code || 'HQ';
  const studentUid = user?._id || '';
  const formattedStudentId = `SYICT-${branchCode}-${studentUid.slice(-6).toUpperCase()}`;
  const verificationUrl = `https://www.smartyouthict.com/verify-id/${studentUid}`;

  const primaryCourse = enrollments[0]?.course?.title || 'Professional Skill Development';
  const issueDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <HiIdentification size={24} />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Digital Student ID Card
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Official smart credential with instant QR code authenticity verification.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setFlipBack(!flipBack)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition"
          >
            <HiRefresh size={16} />
            {flipBack ? 'View Front Side' : 'View Back Side'}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
          >
            <HiPrinter size={18} />
            Print ID Card
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center text-sm text-gray-500 bg-white border rounded-2xl">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Generating your digital ID badge...
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-6">
          {/* ── Card Container ── */}
          <div className="w-full max-w-sm">
            {!flipBack ? (
              /* ── FRONT SIDE OF ID CARD ── */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 relative flex flex-col justify-between"
                style={{ aspectRatio: '1 / 1.58' }}
              >
                {/* Header Gradient */}
                <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 p-5 text-white text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-xs font-black">
                        SY
                      </div>
                      <span className="text-xs font-black tracking-widest uppercase">
                        Smart Youth ICT
                      </span>
                    </div>
                    <p className="text-[10px] text-indigo-200 font-medium uppercase tracking-wider">
                      {branch?.name || 'Central Campus'} • Official Student Badge
                    </p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col items-center justify-between text-center">
                  {/* Avatar */}
                  <div className="relative -mt-12 mb-3">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl bg-gray-100 relative">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-700 text-2xl font-black">
                          {user?.name?.slice(0, 2).toUpperCase() || 'ST'}
                        </div>
                      )}
                    </div>
                    <span className="absolute -bottom-1.5 -right-1.5 p-1 bg-emerald-500 text-white rounded-full shadow-md">
                      <IoCheckmarkCircle size={16} />
                    </span>
                  </div>

                  {/* Name & ID */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 leading-tight">
                      {user?.name || 'Verified Student'}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 font-mono text-xs font-extrabold rounded-full mt-1.5 border border-indigo-100">
                      ID: {formattedStudentId}
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-xs text-left">
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      Active Program
                    </div>
                    <div className="font-bold text-gray-800 truncate mt-0.5">
                      {primaryCourse}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex items-center gap-3 w-full bg-gray-50/70 border border-gray-100 rounded-xl p-2.5">
                    <div className="p-1 bg-white rounded-lg shadow-xs shrink-0">
                      <QRCodeSVG value={verificationUrl} size={64} level="M" />
                    </div>
                    <div className="text-left text-[11px] leading-tight text-gray-500">
                      <span className="font-bold text-gray-800 block">Scan to Verify</span>
                      Scan with smartphone camera to check verified student status.
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="bg-gray-50 px-5 py-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                  <span>Issued: {issueDate}</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <HiShieldCheck size={13} /> Official Pass
                  </span>
                </div>
              </motion.div>
            ) : (
              /* ── BACK SIDE OF ID CARD ── */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 p-6 flex flex-col justify-between"
                style={{ aspectRatio: '1 / 1.58' }}
              >
                <div>
                  <div className="text-center pb-3 border-b border-gray-100 mb-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-950">
                      Terms of Identification
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Property of Smart Youth ICT Platform
                    </p>
                  </div>

                  <ul className="text-[11px] text-gray-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      This card is non-transferable and must be presented upon entering campus labs.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      Grants access to high-speed internet labs, libraries, and workshops.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      If lost or found, please return to any Smart Youth ICT branch office.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 text-[11px] text-gray-600 space-y-1">
                  <div className="font-bold text-gray-800">Campus Contact:</div>
                  <div>{branch?.address || 'Smart Youth ICT Campus, Dhaka'}</div>
                  <div className="font-mono text-[10px] text-indigo-600">
                    Phone: {branch?.phone || '+880 1700-000000'}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-end justify-between text-[10px] text-gray-400">
                  <div>
                    <div>Verification URL:</div>
                    <div className="font-mono text-[9px] text-gray-500">smartyouthict.com/verify-id</div>
                  </div>
                  <div className="text-right">
                    <div className="font-script text-base text-gray-800 italic leading-none font-serif">
                      Academic Director
                    </div>
                    <div className="text-[9px] mt-0.5">Authorized Signature</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Instructions & Features ── */}
          <div className="max-w-md space-y-4 print:hidden">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <IoSparkles className="text-indigo-600" size={18} />
                Smart Credential Features
              </h3>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-start gap-2.5">
                  <HiBadgeCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800">Instant Mobile Verification:</span>{' '}
                    Anyone can scan your QR code with their smartphone camera to verify your official student status.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <HiOfficeBuilding size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800">Lab & Campus Access:</span> Use this
                    digital ID badge for entry to physical workstations, project rooms, and seminars.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <HiPrinter size={18} className="text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-800">Print Ready:</span> Press the Print
                    button to output standard CR80 wallet card size on any color printer or PVC card machine.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900">
              <span className="font-bold">Pro-tip:</span> You can take a screenshot or keep this
              page bookmarked on your smartphone to show at the front desk when visiting the branch.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
