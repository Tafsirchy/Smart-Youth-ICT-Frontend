'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoCloseOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoCallOutline,
  IoPersonOutline,
  IoMailOutline,
  IoCheckmarkCircleOutline,
  IoLogoWhatsapp,
} from 'react-icons/io5';
import axios from 'axios';
import { getApiBaseUrl } from '@/lib/api-base';
import toast from 'react-hot-toast';

const TIME_SLOTS = [
  'Morning (10:30 AM - 12:30 PM)',
  'Afternoon (02:30 PM - 04:30 PM)',
  'Evening (05:30 PM - 07:30 PM)',
];

const PURPOSES = [
  'Campus & Lab Tour',
  'Career & Course Counseling',
  'Offline Spot Admission',
];

export default function CampusVisitModal({ branch, onClose }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [preferredDate, setPreferredDate] = useState(minDateStr);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    note: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);

  if (!branch) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Please enter your full name and phone number');
      return;
    }

    setSubmitting(true);
    const refCode = `SY-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      interest: `${purpose} @ ${branch.name}`,
      message: `[Ref: ${refCode}] Date: ${preferredDate} | Slot: ${timeSlot} | Purpose: ${purpose}${
        formData.note ? ` | Note: ${formData.note}` : ''
      }`,
    };

    try {
      const res = await axios.post(
        `${getApiBaseUrl()}/branches/public/${branch._id}/inquiry`,
        payload
      );

      if (res.data?.success) {
        setBookingRef(refCode);
        toast.success('Visit scheduled successfully!');
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to submit request. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const rawPhone = branch.whatsapp || branch.contact?.phones?.[0] || '01922772303';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;
    const text = encodeURIComponent(
      `Hello Smart Youth ICT ${branch.name}!\nI have scheduled a campus visit.\n• Name: ${formData.name}\n• Ref: ${bookingRef}\n• Date: ${preferredDate} (${timeSlot})\n• Purpose: ${purpose}`
    );
    return `https://wa.me/${phoneWithCountry}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Schedule Campus Visit
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight m-0 mt-0.5">
              {branch.name}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
              <IoLocationOutline size={13} className="text-blue-600 shrink-0" />
              <span>{[branch.address?.area, branch.address?.city].filter(Boolean).join(', ')}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg transition-colors"
          >
            <IoCloseOutline size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {bookingRef ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <IoCheckmarkCircleOutline size={28} />
              </div>

              <div>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-md">
                  Reference: {bookingRef}
                </span>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white mt-2">
                  Visit Request Submitted!
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Our coordinator at {branch.name} will contact you shortly to confirm your visit.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <IoLogoWhatsapp size={16} />
                  Confirm on WhatsApp
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Purpose */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Reason for Visit
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium rounded-xl outline-none focus:border-blue-500 dark:text-white"
                >
                  {PURPOSES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    min={minDateStr}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium rounded-xl outline-none focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-2 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium rounded-xl outline-none focus:border-blue-500 dark:text-white"
                  >
                    {TIME_SLOTS.map((s) => (
                      <option key={s} value={s}>
                        {s.split(' ')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah Al Mamun"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium rounded-xl outline-none focus:border-blue-500 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IoCallOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium rounded-xl outline-none focus:border-blue-500 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
                >
                  {submitting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <>
                      <IoCalendarOutline size={14} />
                      <span>Confirm Visit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
