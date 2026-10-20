'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useRole } from '@/hooks/useRole';
import LoadErrorBanner from '@/components/ui/LoadErrorBanner';
import {
  HiArchive,
  HiTruck,
  HiPlus,
  HiSearch,
  HiCheckCircle,
  HiClock,
  HiExclamation,
  HiTrash,
  HiClipboardList,
  HiChevronDown,
  HiChevronUp,
  HiOutlineDocumentText
} from 'react-icons/hi';
import { IoCloseOutline, IoCheckmarkDone } from 'react-icons/io5';

const STATUS_CONFIG = {
  pending: { label: 'Pending HQ Review', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  under_review: { label: 'Under Review', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  approved: { label: 'Approved by HQ', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  dispatched: { label: 'Dispatched (In Transit)', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
  received: { label: 'Received & Stocked', bg: 'bg-teal-50 text-teal-700 border-teal-200' },
  rejected: { label: 'Rejected', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
};

const CATEGORIES = [
  { value: 'books', label: 'Curriculum Books' },
  { value: 'kits', label: 'Student Welcome Kits' },
  { value: 'stationery', label: 'Office Stationery' },
  { value: 'hardware', label: 'Lab Accessories / Hardware' },
  { value: 'marketing', label: 'Marketing Banners & Leaflets' },
  { value: 'other', label: 'Other Items' },
];

export default function BranchRequisitionsPage() {
  const { branchId } = useParams();
  const { isSuperAdmin, isBranchManager } = useRole();
  const canCreate = isSuperAdmin || isBranchManager;

  const [requisitions, setRequisitions] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    pendingCount: 0,
    approvedCount: 0,
    inTransitCount: 0,
    receivedCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [receivingTicket, setReceivingTicket] = useState(null);
  const [receivingNotes, setReceivingNotes] = useState('');
  const [feedback, setFeedback] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    urgency: 'normal',
    purpose: '',
    items: [
      { itemName: '', category: 'books', quantity: 10, unit: 'pcs', notes: '' }
    ]
  });

  const fetchRequisitions = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await api.get('/requisitions', {
        params: {
          branchId: branchId || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined
        }
      });
      if (res.data?.success) {
        setRequisitions(res.data.data || []);
        if (res.data.metrics) setMetrics(res.data.metrics);
      }
    } catch (err) {
      console.error('Failed to load requisitions:', err);
      setLoadError(err.response?.data?.message || 'Failed to load requisitions. Please retry.');
    } finally {
      setLoading(false);
    }
  }, [branchId, statusFilter]);

  useEffect(() => {
    fetchRequisitions();
  }, [fetchRequisitions]);

  const handleAddItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { itemName: '', category: 'stationery', quantity: 5, unit: 'pcs', notes: '' }
      ]
    }));
  };

  const handleRemoveItemRow = (index) => {
    if (formData.items.length === 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.items];
      updated[index][field] = value;
      return { ...prev, items: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || formData.items.some(it => !it.itemName)) {
      setFeedback({ type: 'error', message: 'Please provide a requisition title and all item names.' });
      return;
    }

    try {
      setSubmitting(true);
      setFeedback(null);
      const res = await api.post('/requisitions', {
        ...formData,
        branchId: branchId || undefined
      });

      if (res.data?.success) {
        setIsModalOpen(false);
        setFormData({
          title: '',
          urgency: 'normal',
          purpose: '',
          items: [{ itemName: '', category: 'books', quantity: 10, unit: 'pcs', notes: '' }]
        });
        setFeedback({ type: 'success', message: 'Requisition ticket submitted to Central HQ!' });
        fetchRequisitions();
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Failed to submit requisition'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmReceived = async () => {
    if (!receivingTicket) return;
    try {
      const res = await api.patch(`/requisitions/${receivingTicket._id}/receive`, {
        receivingNotes
      });
      if (res.data?.success) {
        setReceivingTicket(null);
        setReceivingNotes('');
        setFeedback({ type: 'success', message: 'Parcel marked as successfully received & verified.' });
        fetchRequisitions();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error confirming receipt');
    }
  };

  const filteredRequisitions = requisitions.filter(r => {
    const q = searchQuery.toLowerCase();
    return (
      r.requisitionNumber.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.items.some(i => i.itemName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-700 p-8 text-white shadow-xl shadow-teal-500/10">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
              <HiArchive className="h-4 w-4" />
              <span>Campus Stock & Inventory Supply Chain</span>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              HQ Requisition & Stock Portal
            </h1>
            <p className="mt-1 max-w-xl text-sm text-teal-100">
              Request curriculum books, student welcome kits, office stationery, and lab hardware parts directly from Head Office.
            </p>
          </div>

          {canCreate && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-teal-700 shadow-lg transition-all hover:scale-105 hover:bg-teal-50 active:scale-95"
            >
              <HiPlus className="h-5 w-5" />
              <span>Submit Requisition</span>
            </button>
          )}
        </div>

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
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

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Orders</span>
            <span className="rounded-xl bg-teal-50 p-2 text-teal-600 dark:bg-teal-950/50">
              <HiClipboardList className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-white">
              {metrics.total}
            </span>
            <span className="text-xs text-slate-500">Requisitions</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending Review</span>
            <span className="rounded-xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/50">
              <HiClock className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600">
              {metrics.pendingCount}
            </span>
            <span className="text-xs text-slate-500">Awaiting HQ</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Transit</span>
            <span className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-950/50">
              <HiTruck className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-600">
              {metrics.inTransitCount}
            </span>
            <span className="text-xs text-slate-500">Dispatched Courier</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Stocked</span>
            <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/50">
              <HiCheckCircle className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">
              {metrics.receivedCount}
            </span>
            <span className="text-xs text-slate-500">Safely Received</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search requisition number, title, or items..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'pending', 'approved', 'dispatched', 'received', 'rejected'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold capitalize transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {st === 'all' ? 'All Tickets' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Requisition Cards */}
      <LoadErrorBanner message={loadError} onRetry={fetchRequisitions} />
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
        </div>
      ) : filteredRequisitions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <HiArchive className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">No Requisition Tickets</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchQuery ? 'No match found.' : 'Submit a requisition to request books and materials from Central HQ.'}
          </p>
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
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold border ${statusStyle.bg}`}
                        >
                          {statusStyle.label}
                        </span>
                        {req.urgency === 'urgent' && (
                          <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-rose-700 border border-rose-200">
                            Urgent
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 text-lg font-bold text-slate-800 dark:text-white">
                        {req.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Requested on {new Date(req.createdAt).toLocaleDateString()} by{' '}
                        <strong className="text-slate-600 dark:text-slate-300">
                          {req.requestedBy?.name}
                        </strong>{' '}
                        • {req.branchId?.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {req.status === 'dispatched' && (
                        <button
                          onClick={() => setReceivingTicket(req)}
                          className="flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-teal-500/20 hover:bg-teal-700"
                        >
                          <IoCheckmarkDone className="h-4 w-4" />
                          <span>Confirm Received</span>
                        </button>
                      )}

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : req._id)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                      >
                        <span>{req.items.length} Items ({totalItemsCount} Total)</span>
                        {isExpanded ? <HiChevronUp className="h-4 w-4" /> : <HiChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Dispatched Courier Notification Card */}
                  {req.status === 'dispatched' && req.courierInfo?.trackingNumber && (
                    <div className="mt-5 rounded-2xl border border-purple-200 bg-purple-50/60 p-4 text-xs dark:border-purple-900/50 dark:bg-purple-950/20">
                      <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-300">
                        <HiTruck className="h-5 w-5 text-purple-600" />
                        <span>Courier Shipment In Transit</span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-purple-800 dark:text-purple-300 sm:grid-cols-3">
                        <div>Courier: <strong>{req.courierInfo.provider}</strong></div>
                        <div>Tracking No: <strong>{req.courierInfo.trackingNumber}</strong></div>
                        <div>
                          Dispatched:{' '}
                          <strong>
                            {req.courierInfo.dispatchedDate
                              ? new Date(req.courierInfo.dispatchedDate).toLocaleDateString()
                              : 'Recent'}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Purpose / Notes */}
                  {req.purpose && (
                    <p className="mt-3 text-xs italic text-slate-500">
                      &quot;{req.purpose}&quot;
                    </p>
                  )}
                </div>

                {/* Expandable Items Details */}
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
                                <td className="py-2.5 font-black text-teal-600 dark:text-teal-400">
                                  {it.quantity}
                                </td>
                                <td className="py-2.5">{it.unit}</td>
                                <td className="py-2.5 text-slate-400">{it.notes || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* HQ Review Notes if available */}
                      {req.hqNotes && (
                        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/50 p-3 text-xs text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200">
                          <strong>HQ Note:</strong> {req.hqNotes}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* New Requisition Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-teal-50 p-2 text-teal-600 dark:bg-teal-950">
                    <HiArchive className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Submit HQ Stock Requisition
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <IoCloseOutline className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Requisition Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Monthly Batch Books & Student Kits"
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Urgency
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={e => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Purpose / Justification
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="e.g. Starting Web Dev Batch 12 with 35 new students"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Requested Items ({formData.items.length})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddItemRow}
                      className="text-xs font-bold text-teal-600 hover:underline"
                    >
                      + Add Another Item
                    </button>
                  </div>

                  {formData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-2 rounded-2xl border border-slate-200 bg-slate-50/50 p-3 items-center dark:border-slate-800 dark:bg-slate-800/40"
                    >
                      <div className="col-span-12 sm:col-span-4">
                        <input
                          type="text"
                          required
                          placeholder="Item Name (e.g. Python Books)"
                          value={item.itemName}
                          onChange={e => handleItemChange(idx, 'itemName', e.target.value)}
                          className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <select
                          value={item.category}
                          onChange={e => handleItemChange(idx, 'category', e.target.value)}
                          className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          {CATEGORIES.map(c => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-3 sm:col-span-2">
                        <input
                          type="number"
                          min="1"
                          required
                          value={item.quantity}
                          onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                          className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="col-span-2 sm:col-span-2">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={e => handleItemChange(idx, 'unit', e.target.value)}
                          placeholder="unit"
                          className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-700 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit to HQ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation of Receipt Modal */}
      <AnimatePresence>
        {receivingTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950">
                  <HiCheckCircle className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Confirm Parcel Receipt</h3>
                  <p className="text-xs text-slate-500">{receivingTicket.requisitionNumber}</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-600 dark:text-slate-300">
                Please confirm that the parcel containing <strong>{receivingTicket.items.length} requested items</strong> has arrived in good condition at your campus.
              </p>

              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Receiving Note / Condition (Optional)
                </label>
                <textarea
                  rows={3}
                  value={receivingNotes}
                  onChange={e => setReceivingNotes(e.target.value)}
                  placeholder="e.g. All 35 books received intact without damage."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setReceivingTicket(null)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReceived}
                  className="rounded-xl bg-teal-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-teal-500/20 hover:bg-teal-700"
                >
                  Confirm & Stock
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
