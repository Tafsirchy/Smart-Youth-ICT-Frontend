'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getApiBaseUrl } from '@/lib/api-base';
import toast from 'react-hot-toast';
import {
  IoCloseOutline,
  IoLocationOutline,
  IoCallOutline,
  IoLogoWhatsapp,
  IoDesktopOutline,
  IoWifiOutline,
  IoFlashOutline,
  IoPeopleOutline,
  IoSchoolOutline,
  IoCalendarOutline,
  IoNavigateOutline,
  IoImageOutline,
  IoVideocamOutline,
  IoCheckmarkCircleOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoSparklesOutline,
} from 'react-icons/io5';

export default function VirtualTourModal({ branch, onClose, onScheduleVisit }) {
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery', 'labs', 'courses', 'visit'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // Visit appointment form state inside the tour
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  const [visitDate, setVisitDate] = useState(minDateStr);
  const [visitSlot, setVisitSlot] = useState('Morning (10:30 AM - 12:30 PM)');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [submittingVisit, setSubmittingVisit] = useState(false);
  const [visitSuccess, setVisitSuccess] = useState(false);

  // Valid non-empty gallery photos
  const validGallery = [
    branch.coverImage,
    ...(branch.gallery || []),
  ].filter((url) => typeof url === 'string' && url.trim().length > 0);

  useEffect(() => {
    if (!branch?._id) return;
    const fetchDetails = async () => {
      try {
        setCoursesLoading(true);
        const res = await axios.get(`${getApiBaseUrl()}/branches/public/${branch._id}`);
        if (res.data?.success && res.data.data?.courses) {
          setCourses(res.data.data.courses);
        }
      } catch (err) {
        console.warn('Failed to fetch courses in tour', err);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchDetails();
  }, [branch?._id]);

  if (!branch) return null;

  const handleBookVisitSubmit = async (e) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) {
      toast.error('Please enter name and phone number');
      return;
    }

    setSubmittingVisit(true);
    const bookingRef = `SY-VTOUR-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = {
      name: visitorName.trim(),
      phone: visitorPhone.trim(),
      interest: `Tour @ ${branch.name}`,
      message: `[Ref: ${bookingRef}] Date: ${visitDate} | Slot: ${visitSlot} | Campus: ${branch.name}`,
    };

    try {
      const res = await axios.post(
        `${getApiBaseUrl()}/branches/public/${branch._id}/inquiry`,
        payload
      );
      if (res.data?.success) {
        setVisitSuccess(true);
        toast.success('Appointment scheduled!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit appointment.');
    } finally {
      setSubmittingVisit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col max-h-[85vh]"
      >
        {/* Compact Top Header */}
        <div className="px-4 sm:px-5 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/70 dark:bg-neutral-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white inline-flex items-center justify-center shrink-0 shadow-sm">
              <IoVideocamOutline size={16} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white leading-tight m-0">
                  {branch.name}
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 rounded">
                  {branch.code}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                <IoLocationOutline size={12} className="text-blue-600 shrink-0" />
                <span className="truncate">
                  {[branch.address?.area, branch.address?.city].filter(Boolean).join(', ')}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg"
          >
            <IoCloseOutline size={20} />
          </button>
        </div>

        {/* Compact Tab Strip */}
        <div className="px-4 sm:px-5 py-2 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'gallery'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <IoImageOutline size={14} />
            <span>Gallery ({validGallery.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('labs')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'labs'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <IoDesktopOutline size={14} />
            <span>Lab Specs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <IoSchoolOutline size={14} />
            <span>Courses ({courses.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('visit')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ml-auto ${
              activeTab === 'visit'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 hover:bg-emerald-100'
            }`}
          >
            <IoCalendarOutline size={13} />
            <span>Book Visit</span>
          </button>
        </div>

        {/* Scrollable Content (Compact) */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5">
          {/* TAB 1: Gallery */}
          {activeTab === 'gallery' && (
            <div className="space-y-3">
              {validGallery.length > 0 ? (
                <>
                  <div className="relative w-full aspect-[16/7] sm:aspect-[21/9] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <img
                      src={validGallery[activeImageIndex]}
                      alt={`${branch.name} showcase`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />

                    <div className="absolute bottom-2 right-2 bg-black/60 px-2.5 py-0.5 rounded-md text-white text-[10px] font-bold">
                      {activeImageIndex + 1} / {validGallery.length}
                    </div>

                    {validGallery.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev > 0 ? prev - 1 : validGallery.length - 1
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/80"
                        >
                          <IoChevronBackOutline size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev < validGallery.length - 1 ? prev + 1 : 0
                            )
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/80"
                        >
                          <IoChevronForwardOutline size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {validGallery.length > 1 && (
                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                      {validGallery.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-16 h-10 rounded-lg overflow-hidden shrink-0 border transition-all ${
                            activeImageIndex === idx
                              ? 'border-blue-600 scale-105'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-10 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                  <IoImageOutline className="mx-auto text-neutral-400 mb-1" size={32} />
                  <p className="text-xs text-neutral-500">
                    Photos for this campus are being updated. Visit in person to inspect our facilities.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Lab Specs */}
          {activeTab === 'labs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs">
                  <IoDesktopOutline size={16} />
                  <span>High-Spec Rigs</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Core i7 / Ryzen 7, 16GB RAM, NVMe SSD, dual-monitor workstations for code, design, and rendering.
                </p>
              </div>

              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                  <IoWifiOutline size={16} />
                  <span>Gigabit Fiber</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Dual redundant optical lines with auto-failover, low latency, and Wi-Fi 6 across classrooms.
                </p>
              </div>

              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                  <IoFlashOutline size={16} />
                  <span>100% Power Redundancy</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Online UPS and rooftop generator guarantee seamless uninterrupted coding sessions.
                </p>
              </div>

              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-600 font-bold text-xs">
                  <IoPeopleOutline size={16} />
                  <span>Mentor Support</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Senior mentors on-site daily to solve bugs, review code, and guide live client projects.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Available Courses */}
          {activeTab === 'courses' && (
            <div className="space-y-3">
              {coursesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                </div>
              ) : courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800 flex gap-2.5 items-center justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 rounded">
                          {course.category || 'IT Track'}
                        </span>
                        <h5 className="font-bold text-xs text-neutral-900 dark:text-white mt-1 truncate">
                          {typeof course.title === 'object' ? course.title.en : course.title}
                        </h5>
                        <span className="font-extrabold text-[11px] text-neutral-800 dark:text-neutral-200">
                          ৳{course.price?.toLocaleString() || 'Inquire'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('visit')}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase rounded-lg transition-colors shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 text-center py-6">
                  Cohort schedules in progress. Book an in-person visit to reserve early-bird seats.
                </p>
              )}
            </div>
          )}

          {/* TAB 4: Book Visit */}
          {activeTab === 'visit' && (
            <div className="max-w-md mx-auto space-y-3">
              {visitSuccess ? (
                <div className="text-center py-4 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <IoCheckmarkCircleOutline size={24} />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                    Walkthrough Scheduled!
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Our team at {branch.name} will call you at {visitorPhone} to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookVisitSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        min={minDateStr}
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-lg outline-none focus:border-blue-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">
                        Time Slot
                      </label>
                      <select
                        value={visitSlot}
                        onChange={(e) => setVisitSlot(e.target.value)}
                        className="w-full px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-lg outline-none focus:border-blue-500 dark:text-white"
                      >
                        <option value="Morning (10:30 AM - 12:30 PM)">Morning</option>
                        <option value="Afternoon (02:30 PM - 04:30 PM)">Afternoon</option>
                        <option value="Evening (05:30 PM - 07:30 PM)">Evening</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-lg outline-none focus:border-blue-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs rounded-lg outline-none focus:border-blue-500 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingVisit}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    {submittingVisit ? 'Scheduling...' : 'Confirm Walkthrough'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Compact Footer */}
        <div className="px-4 sm:px-5 py-2.5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900 flex items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-3">
            {branch.contact?.phones?.[0] && (
              <a
                href={`tel:${branch.contact.phones[0]}`}
                className="font-bold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 flex items-center gap-1"
              >
                <IoCallOutline className="text-blue-600" size={13} />
                <span>{branch.contact.phones[0]}</span>
              </a>
            )}
            {branch.whatsapp && (
              <a
                href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 flex items-center gap-1 hover:underline"
              >
                <IoLogoWhatsapp size={14} />
                <span>WhatsApp</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            {branch.location?.googleMapsUrl && (
              <a
                href={branch.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-bold uppercase tracking-wider rounded-lg text-[10px] inline-flex items-center gap-1"
              >
                <IoNavigateOutline size={12} />
                <span>Map</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold uppercase tracking-wider rounded-lg text-[10px]"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
