'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Portal from '@/components/ui/Portal';
import {
  IoCloseOutline,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoLogoWhatsapp,
  IoCalendarOutline,
  IoVideocamOutline,
  IoNavigateOutline,
  IoPeopleOutline,
  IoResizeOutline,
  IoGridOutline,
  IoIdCardOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoGlobeOutline,
  IoBusinessOutline,
  IoInformationCircleOutline,
} from 'react-icons/io5';

const DIVISION_FALLBACK_THUMB =
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';

export default function BranchDetailModal({
  branch,
  status,
  thumbnailUrl,
  onClose,
  onScheduleVisit,
  onVirtualTour,
}) {
  useEffect(() => {
    if (!branch) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [branch, onClose]);

  if (!branch) return null;

  const addr = branch.address || {};
  const isHQ = branch.type === 'head_office';

  const addressItems = [
    { label: 'House No.', value: addr.houseNo },
    { label: 'Road No.', value: addr.roadNo || addr.street },
    { label: 'Area / Locality', value: addr.area },
    { label: 'Thana / Upazila', value: addr.thana },
    { label: 'District', value: addr.district || addr.city },
    { label: 'Division', value: addr.division || branch.division },
    { label: 'Postal Code', value: addr.postalCode },
    { label: 'Country', value: addr.country || 'Bangladesh' },
  ];

  const fullFormattedAddress = [
    addr.houseNo && `House ${addr.houseNo}`,
    addr.roadNo && `Road ${addr.roadNo}`,
    !addr.houseNo && !addr.roadNo && addr.street,
    addr.area,
    addr.thana,
    addr.district || addr.city,
    addr.division || branch.division,
    addr.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  const whatsappNum = branch.whatsapp || branch.contact?.whatsapp || '';

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[1250] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]"
        >
          {/* Floating Always-Accessible Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Branch Details"
            className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-white border border-white/20 flex items-center justify-center transition-colors shadow-lg"
          >
            <IoCloseOutline size={20} />
          </button>

          {/* GPU-Accelerated Single Scrollable Body (Hero + Content) */}
          <div
            className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain will-change-scroll [transform:translateZ(0)] custom-scrollbar"
            style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Hero Header Image */}
            <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
              <img
                src={thumbnailUrl || branch.coverImage || DIVISION_FALLBACK_THUMB}
                alt={branch.name}
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DIVISION_FALLBACK_THUMB;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30" />

              {/* Top Bar Badges */}
              <div className="absolute top-3.5 left-4 right-14 flex items-center gap-2 flex-wrap z-10">
                <span
                  className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm ${
                    isHQ
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-900/90 text-white border border-white/15'
                  }`}
                >
                  {isHQ ? 'Corporate Headquarters' : branch.code || 'Campus Hub'}
                </span>

                {status && (
                  <span className="px-2.5 py-1 bg-slate-950/90 text-white text-[10px] font-semibold rounded-lg border border-white/15 flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        status.isOpen ? 'bg-emerald-400' : 'bg-slate-400'
                      }`}
                    />
                    <span>{status.label}</span>
                  </span>
                )}
              </div>

              {/* Bottom Hero Identity */}
              <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 flex items-end justify-between gap-3 z-10">
                <div className="flex items-center gap-3 min-w-0">
                  {branch.logo && (
                    <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg shrink-0 overflow-hidden hidden sm:block">
                      <img
                        src={branch.logo}
                        alt={`${branch.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg sm:text-2xl font-black text-white leading-tight truncate">
                        {branch.name}
                      </h2>
                      {branch.division && (
                        <span className="px-2 py-0.5 bg-blue-600/85 border border-blue-400/40 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                          {branch.division} Division
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5 mt-1 truncate">
                      <IoLocationOutline size={14} className="text-blue-400 shrink-0" />
                      <span className="truncate">
                        {fullFormattedAddress || 'Bangladesh Campus'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inner Details Content */}
            <div className="p-4 sm:p-6 space-y-5">
            {/* Key Infrastructure Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <IoGridOutline size={14} />
                  <span>Seat Capacity</span>
                </div>
                <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  {branch.seatCapacity > 0 ? `${branch.seatCapacity.toLocaleString()} Seats` : '—'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <IoResizeOutline size={14} />
                  <span>Area Size</span>
                </div>
                <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  {branch.areaSqFt > 0 ? `${branch.areaSqFt.toLocaleString()} sq ft` : '—'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  <IoPeopleOutline size={14} />
                  <span>Total Employee</span>
                </div>
                <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  {branch.totalEmployees > 0 ? `${branch.totalEmployees} Staff` : '—'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <IoIdCardOutline size={14} />
                  <span>Sponsor ID</span>
                </div>
                <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-1 truncate">
                  {branch.sponsorId || branch.code || '—'}
                </p>
              </div>
            </div>

            {/* Branch Bio / Details */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <IoInformationCircleOutline size={16} className="text-blue-600" />
                <span>About This Branch</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {branch.bio?.trim()
                  ? branch.bio
                  : `${branch.name} is an official Smart Youth ICT training center offering modern computer labs, experienced mentors, and career-focused ICT cohorts.`}
              </p>
            </div>

            {/* Granular Address Breakdown */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-700/70 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <IoBusinessOutline size={15} className="text-blue-600" />
                  <span>Branch Address Details</span>
                </h3>
                {branch.location?.googleMapsUrl && (
                  <a
                    href={branch.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <IoNavigateOutline size={13} />
                    <span>Open Google Maps</span>
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {addressItems.map((item) => (
                  <div
                    key={item.label}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5 block truncate">
                      {item.value || '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            {Array.isArray(branch.facilities) && branch.facilities.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Campus Facilities & Infrastructure
                </h3>
                <div className="flex flex-wrap gap-2">
                  {branch.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      <IoCheckmarkCircleOutline size={14} className="text-emerald-600 shrink-0" />
                      <span>{fac}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Office Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Channels */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Contact Information
                </h3>
                <div className="space-y-2 text-xs">
                  {branch.contact?.phones?.filter(Boolean).length > 0 ? (
                    branch.contact.phones.filter(Boolean).map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                      >
                        <IoCallOutline size={15} className="text-blue-600 shrink-0" />
                        <span>{phone}</span>
                      </a>
                    ))
                  ) : (
                    <p className="text-slate-400">Hotline available at front desk</p>
                  )}

                  {whatsappNum && (
                    <a
                      href={`https://wa.me/${whatsappNum.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <IoLogoWhatsapp size={15} className="shrink-0" />
                      <span>WhatsApp: {whatsappNum}</span>
                    </a>
                  )}

                  {branch.contact?.email && (
                    <a
                      href={`mailto:${branch.contact.email}`}
                      className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                    >
                      <IoMailOutline size={15} className="text-blue-600 shrink-0" />
                      <span className="truncate">{branch.contact.email}</span>
                    </a>
                  )}

                  {branch.website && (
                    <a
                      href={branch.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                    >
                      <IoGlobeOutline size={15} className="shrink-0" />
                      <span className="truncate">{branch.website}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Weekly Hours */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <IoTimeOutline size={15} className="text-blue-600" />
                  <span>Office Hours</span>
                </h3>
                {Array.isArray(branch.officeHours) && branch.officeHours.length > 0 ? (
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {branch.officeHours.map((oh) => (
                      <div key={oh.day} className="flex items-center justify-between py-0.5">
                        <span className="font-semibold text-slate-600 dark:text-slate-300">
                          {oh.day}
                        </span>
                        <span
                          className={
                            oh.isClosed
                              ? 'text-rose-500 font-bold'
                              : 'text-slate-800 dark:text-slate-100 font-bold'
                          }
                        >
                          {oh.isClosed ? 'Closed' : `${oh.open} – ${oh.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Saturday – Thursday: 09:00 AM – 06:00 PM</p>
                )}
              </div>
            </div>
            </div>
          </div>

          {/* Sticky Action Footer */}
          <div className="p-4 sm:px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/95 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              {onVirtualTour && (
                <button
                  type="button"
                  onClick={() => onVirtualTour(branch)}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider rounded-xl border border-blue-200 dark:border-blue-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <IoVideocamOutline size={15} />
                  <span>Virtual Tour</span>
                </button>
              )}
              {branch.location?.googleMapsUrl && (
                <a
                  href={branch.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 dark:border-slate-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <IoNavigateOutline size={15} />
                  <span>Directions</span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Close
              </button>
              {onScheduleVisit && (
                <button
                  type="button"
                  onClick={() => onScheduleVisit(branch)}
                  className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5 active:scale-95"
                >
                  <IoCalendarOutline size={14} />
                  <span>Book Visit</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}
