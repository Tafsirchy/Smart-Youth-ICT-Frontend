'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import {
  HiArchive,
  HiTruck,
  HiSearch,
  HiCheckCircle,
  HiClock,
  HiXCircle,
  HiClipboardList,
  HiChevronDown,
  HiChevronUp,
  HiFilter
} from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

const STATUS_CONFIG = {
  pending: { label: 'Pending Review', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  under_review: { label: 'Under Review', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  approved: { label: 'Approved', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  dispatched: { label: 'Dispatched (In Transit)', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
  received: { label: 'Received by Campus', bg: 'bg-teal-50 text-teal-700 border-teal-200' },
  rejected: { label: 'Rejected', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function SuperRequisitionsPage() {
  const [requisitions, setRequisitions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [reviewModalTicket, setReviewModalTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Review form state
  const [reviewStatus, setReviewStatus] = useState('approved');
  const [hqNotes, setHqNotes] = useState('');
  const [courierProvider, setCourierProvider] = useState('Sundarban Courier Service');
  const [trackingNumber, setTrackingNumber] = useState('');

  const fetchBranches = async () => {
    try {
      const res = await api.get('/branches/public/list');
      if (res.data?.success) setBranches(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRequisitions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/requisitions', {
        params: {
          branchId: selectedBranch !== 'all' ? selectedBranch : undefined,
          status: selectedStatus !== 'all' ? selectedStatus : undefined
        }
      });
      if (res.data?.success) {
        setRequisitions(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load requisitions:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedBranch, selectedStatus]);

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchRequisitions();
  }, [fetchRequisitions]);

  const handleOpenReview = (ticket) => {
    setReviewModalTicket(ticket);
    setReviewStatus(ticket.status === 'pending' ? 'approved' : 'dispatched');
    setHqNotes(ticket.hqNotes || '');
    setCourierProvider(ticket.courierInfo?.provider || 'Sundarban Courier Service');
    setTrackingNumber(ticket.courierInfo?.trackingNumber || '');
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    if (!reviewModalTicket) return;

    try {
      setSubmitting(true);
      const res = await api.patch(`/requisitions/${reviewModalTicket._id}/status`, {
        status: reviewStatus,
        hqNotes,
        courierProvider: reviewStatus === 'dispatched' ? courierProvider : undefined,
        trackingNumber: reviewStatus === 'dispatched' ? trackingNumber : undefined
      });

      if (res.data?.success) {
        setReviewModalTicket(null);
        setFeedback({ type: 'success', message: `Requisition updated to ${reviewStatus}` });
        fetchRequisitions();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Error updating status' });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRequisitions = requisitions.filter(r => {
    const q = searchQuery.toLowerCase();
    return (
      r.requisitionNumber.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.branchId?.name?.toLowerCase().includes(q) ||
      r.items.some(i => i.itemName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 via-cyan-900 to-slate-900 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <HiArchive className="h-4 w-4 text-teal-400" />
            <span>Central Inventory & Dispatch Management</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
            Branch Stock Requisitions & Dispatches
          </h1>
          <p className="mt-1 text-sm text-teal-100">
            Review material supply requests from all campuses, approve stock allocations, and enter courier tracking information.
          </p>
        </div>

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`flex items-center justify-between rounded-2xl p-4 text-sm font-semibold border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="text-gray-400 hover:text-gray-600">
            <IoCloseOutline className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative sm:col-span-1">
          <HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search ticket, campus, or items..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div>
          <select
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option value="all">All Campuses / Branches</option>
            {branches.map(b => (
              <option key={b._id} value={b._id}>{b.name} ({b.city})</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option value="all">All Requisition Statuses</option>
            <option value="pending">Pending HQ Review</option>
            <option value="approved">Approved by HQ</option>
            <option value="dispatched">Dispatched (In Transit)</option>
            <option value="received">Received by Campus</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requisitions List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
        </div>
      ) : filteredRequisitions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <HiArchive className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">No Tickets Found</h3>
          <p className="mt-1 text-sm text-slate-500">No branch requisition tickets match the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequisitions.map(req => {
            const isExpanded = expandedId === req._id;
            const statusStyle = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
            const totalItemsCount = req.items.reduce((sum, it) => sum + it.quantity, 0);

            return (
              <div
                key={req._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black uppercase text-teal-600 dark:text-teal-400">
                          {req.requisitionNumber}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold border ${statusStyle.bg}`}
                        >
                          {statusStyle.label}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {req.branchId?.name}
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold text-slate-800 dark:text-white">
                        {req.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Requested by{' '}
                        <strong className="text-slate-600 dark:text-slate-300">
                          {req.requestedBy?.name}
                        </strong>{' '}
                        on {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenReview(req)}
                        className="rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-teal-500/20 hover:bg-teal-700"
                      >
                        Review / Dispatch
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : req._id)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                      >
                        <span>{req.items.length} Items ({totalItemsCount} Total)</span>
                        {isExpanded ? <HiChevronUp className="h-4 w-4" /> : <HiChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {req.courierInfo?.trackingNumber && (
                    <div className="mt-4 rounded-2xl border border-purple-200 bg-purple-50/60 p-3.5 text-xs dark:border-purple-900/50 dark:bg-purple-950/20">
                      <span className="font-bold text-purple-900 dark:text-purple-300">
                        📦 Shipment: {req.courierInfo.provider} • Tracking: {req.courierInfo.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-800/40"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Requisition Items Breakdown
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-400 dark:border-slate-700">
                              <th className="pb-2 font-semibold">Item Name</th>
                              <th className="pb-2 font-semibold">Category</th>
                              <th className="pb-2 font-semibold">Quantity</th>
                              <th className="pb-2 font-semibold">Unit</th>
                              <th className="pb-2 font-semibold">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {req.items.map((it, idx) => (
                              <tr key={idx} className="text-slate-700 dark:text-slate-300">
                                <td className="py-2.5 font-bold">{it.itemName}</td>
                                <td className="py-2.5 capitalize">{it.category}</td>
                                <td className="py-2.5 font-black text-teal-600 dark:text-teal-400">{it.quantity}</td>
                                <td className="py-2.5">{it.unit}</td>
                                <td className="py-2.5 text-slate-400">{it.notes || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Review & Dispatch Modal */}
      <AnimatePresence>
        {reviewModalTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Review & Dispatch Stock</h3>
                  <p className="text-xs text-slate-500">{reviewModalTicket.requisitionNumber} • {reviewModalTicket.branchId?.name}</p>
                </div>
                <button
                  onClick={() => setReviewModalTicket(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <IoCloseOutline className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveReview} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Transition Status
                  </label>
                  <select
                    value={reviewStatus}
                    onChange={e => setReviewStatus(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approve Requisition</option>
                    <option value="dispatched">Dispatch Parcel (In Transit)</option>
                    <option value="rejected">Reject Request</option>
                  </select>
                </div>

                {reviewStatus === 'dispatched' && (
                  <div className="space-y-3 rounded-2xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900/50 dark:bg-purple-950/20">
                    <div>
                      <label className="block text-xs font-bold text-purple-900 dark:text-purple-300 mb-1">
                        Courier Service Provider *
                      </label>
                      <input
                        type="text"
                        required
                        value={courierProvider}
                        onChange={e => setCourierProvider(e.target.value)}
                        placeholder="e.g. Sundarban Courier / SA Paribahan / Pathao"
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-purple-900 dark:text-purple-300 mb-1">
                        Consignment / Tracking Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={trackingNumber}
                        onChange={e => setTrackingNumber(e.target.value)}
                        placeholder="e.g. CN-908234-DH"
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    HQ Feedback / Instruction Note
                  </label>
                  <textarea
                    rows={3}
                    value={hqNotes}
                    onChange={e => setHqNotes(e.target.value)}
                    placeholder="Instructions for campus manager or delivery notes..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setReviewModalTicket(null)}
                    className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-teal-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-teal-500/20 hover:bg-teal-700 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Confirm Update'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
