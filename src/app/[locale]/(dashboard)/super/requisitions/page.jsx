'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import LoadErrorBanner from '@/components/ui/LoadErrorBanner';
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
  HiFilter,
  HiPlus,
  HiRefresh,
  HiExclamation
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
  const [loadError, setLoadError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [reviewModalTicket, setReviewModalTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Warehouse Central Inventory state
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [warehouseInventory, setWarehouseInventory] = useState([]);
  const [warehouseStats, setWarehouseStats] = useState({ totalItems: 0, lowStockCount: 0, totalUnits: 0, totalValuation: 0 });
  const [warehouseLoading, setWarehouseLoading] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemForm, setNewItemForm] = useState({
    name: '', sku: '', category: 'stationery', stockQuantity: 50, minStockAlert: 10, unitCost: 100, unit: 'pcs', location: 'Dhaka Central Hub'
  });
  const [simulatingCourierId, setSimulatingCourierId] = useState(null);

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
      setLoadError(null);
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
      setLoadError(err.response?.data?.message || 'Failed to load requisitions. Please retry.');
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

  const fetchWarehouseInventory = async () => {
    try {
      setWarehouseLoading(true);
      const res = await api.get('/requisitions/warehouse/items');
      if (res.data?.success) {
        // Canonical backend shape: { success, metrics: { totalItems, lowStockCount,
        // totalStockUnits, totalValuation }, data: items[] }
        const items = Array.isArray(res.data.data) ? res.data.data : (res.data.data?.inventory || []);
        const metrics = res.data.metrics || res.data.data?.stats || {};
        setWarehouseInventory(items);
        setWarehouseStats({
          totalItems: metrics.totalItems ?? items.length,
          lowStockCount: metrics.lowStockCount ?? 0,
          totalUnits: metrics.totalStockUnits ?? metrics.totalUnits ?? 0,
          totalValuation: metrics.totalValuation ?? 0,
        });
      }
    } catch (err) {
      console.error('Failed to load warehouse inventory:', err);
    } finally {
      setWarehouseLoading(false);
    }
  };

  const handleUpdateStock = async (itemId, currentQty) => {
    const qtyStr = prompt(`Update stock quantity (Current: ${currentQty}):`, currentQty);
    if (qtyStr === null) return;
    const newQty = parseInt(qtyStr, 10);
    if (isNaN(newQty) || newQty < 0) {
      alert('Invalid quantity entered');
      return;
    }
    try {
      const res = await api.put(`/requisitions/warehouse/items/${itemId}`, { stockQuantity: newQty });
      if (res.data?.success) {
        setFeedback({ type: 'success', message: 'Warehouse stock updated successfully' });
        fetchWarehouseInventory();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Stock update failed' });
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/requisitions/warehouse/items', newItemForm);
      if (res.data?.success) {
        setFeedback({ type: 'success', message: `Added ${newItemForm.name} to Central Warehouse` });
        setShowAddItem(false);
        setNewItemForm({ name: '', sku: '', category: 'stationery', stockQuantity: 50, minStockAlert: 10, unitCost: 100, unit: 'pcs', location: 'Dhaka Central Hub' });
        fetchWarehouseInventory();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed to create warehouse item' });
    }
  };

  const handleSimulateDelivery = async (requisitionId) => {
    try {
      setSimulatingCourierId(requisitionId);
      const res = await api.post(`/requisitions/${requisitionId}/simulate-delivery`);
      if (res.data?.success) {
        setFeedback({ type: 'success', message: '⚡ Automated Courier Webhook processed! Requisition moved to Received status.' });
        fetchRequisitions();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed to simulate courier webhook' });
    } finally {
      setSimulatingCourierId(null);
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 via-cyan-900 to-slate-900 p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <HiArchive className="h-4 w-4 text-teal-400" />
            <span>Central Inventory & Dispatch Management</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
            Branch Stock Requisitions & Dispatches
          </h1>
          <p className="mt-1 text-sm text-teal-100">
            Review material supply requests from all campuses, approve stock allocations, and enter courier tracking information.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => {
              fetchWarehouseInventory();
              setWarehouseModalOpen(true);
            }}
            className="flex items-center gap-2.5 rounded-2xl bg-white/15 px-5 py-3.5 text-xs font-black text-white backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all shadow-lg active:scale-95"
          >
            <HiArchive className="h-5 w-5 text-teal-300" />
            <span>Warehouse Inventory Catalog</span>
          </button>
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
      <LoadErrorBanner message={loadError} onRetry={fetchRequisitions} />
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
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-purple-200 bg-purple-50/60 p-3.5 text-xs dark:border-purple-900/50 dark:bg-purple-950/20">
                      <div>
                        <span className="font-bold text-purple-900 dark:text-purple-300">
                          📦 Shipment: {req.courierInfo.provider} • Tracking: <span className="font-mono">{req.courierInfo.trackingNumber}</span>
                        </span>
                        {req.courierInfo.deliveryStatus && (
                          <span className="ml-2 inline-flex items-center rounded bg-purple-100 px-2 py-0.5 font-bold uppercase text-[10px] text-purple-700">
                            {req.courierInfo.deliveryStatus}
                          </span>
                        )}
                      </div>

                      {req.status === 'dispatched' && (
                        <button
                          disabled={simulatingCourierId === req._id}
                          onClick={() => handleSimulateDelivery(req._id)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-purple-700 disabled:opacity-50 transition-all shrink-0"
                          title="Simulate courier delivery webhook callback from Pathao / Steadfast"
                        >
                          <HiTruck className="h-4 w-4" />
                          <span>{simulatingCourierId === req._id ? 'Processing...' : '⚡ Simulate Delivery Webhook'}</span>
                        </button>
                      )}
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

      {/* Central Warehouse Inventory Modal */}
      <AnimatePresence>
        {warehouseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                    <HiArchive className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">Central Warehouse Inventory</h3>
                    <p className="text-xs text-slate-500">Live HQ stock valuation and item replenishment</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchWarehouseInventory}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Refresh Inventory"
                  >
                    <HiRefresh className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setWarehouseModalOpen(false)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <IoCloseOutline className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Valuation</span>
                    <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">৳{(warehouseStats.totalValuation || 0).toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Units in Stock</span>
                    <p className="mt-1 text-xl font-black text-teal-600 dark:text-teal-400">{(warehouseStats.totalUnits || 0).toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Low Stock Alerts</span>
                    <p className={`mt-1 text-xl font-black ${warehouseStats.lowStockCount > 0 ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                      {warehouseStats.lowStockCount || 0}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Catalog SKUs</span>
                    <p className="mt-1 text-xl font-black text-indigo-600 dark:text-indigo-400">{warehouseStats.totalItems || 0}</p>
                  </div>
                </div>

                {/* Add Item Trigger / Form */}
                <div className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/30 p-4 dark:border-teal-900/50 dark:bg-teal-950/20">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-teal-900 dark:text-teal-300">
                      Catalog Provisioning
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddItem(!showAddItem)}
                      className="inline-flex items-center gap-1 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700"
                    >
                      <HiPlus className="h-4 w-4" />
                      <span>{showAddItem ? 'Cancel' : 'Add New Item SKU'}</span>
                    </button>
                  </div>

                  {showAddItem && (
                    <form onSubmit={handleCreateItem} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-teal-100 pt-3 dark:border-teal-900/40">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Item Name *</label>
                        <input
                          type="text"
                          required
                          value={newItemForm.name}
                          onChange={e => setNewItemForm({ ...newItemForm, name: e.target.value })}
                          placeholder="e.g. SYICT Welcome Bag"
                          className="mt-1 w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">SKU Code *</label>
                        <input
                          type="text"
                          required
                          value={newItemForm.sku}
                          onChange={e => setNewItemForm({ ...newItemForm, sku: e.target.value.toUpperCase() })}
                          placeholder="e.g. BAG-01"
                          className="mt-1 w-full rounded-xl border border-slate-200 p-2 text-xs uppercase outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Category</label>
                        <select
                          value={newItemForm.category}
                          onChange={e => setNewItemForm({ ...newItemForm, category: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value="stationery">Stationery</option>
                          <option value="electronics">Electronics</option>
                          <option value="books">Books & Guides</option>
                          <option value="branding">Branding & Merch</option>
                          <option value="hardware">Hardware</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Stock Quantity</label>
                        <input
                          type="number"
                          min="0"
                          value={newItemForm.stockQuantity}
                          onChange={e => setNewItemForm({ ...newItemForm, stockQuantity: parseInt(e.target.value, 10) || 0 })}
                          className="mt-1 w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Unit Cost (BDT)</label>
                        <input
                          type="number"
                          min="0"
                          value={newItemForm.unitCost}
                          onChange={e => setNewItemForm({ ...newItemForm, unitCost: parseFloat(e.target.value) || 0 })}
                          className="mt-1 w-full rounded-xl border border-slate-200 p-2 text-xs outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-teal-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-700"
                        >
                          Save New Item
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-400">
                      <tr>
                        <th className="p-3 font-semibold">SKU</th>
                        <th className="p-3 font-semibold">Item Name</th>
                        <th className="p-3 font-semibold">Category</th>
                        <th className="p-3 font-semibold">Unit Cost</th>
                        <th className="p-3 font-semibold">Stock Level</th>
                        <th className="p-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {warehouseLoading ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-400">Loading Central Inventory...</td>
                        </tr>
                      ) : warehouseInventory.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-400">No warehouse items registered yet.</td>
                        </tr>
                      ) : (
                        warehouseInventory.map((item) => {
                          const isLowStock = item.stockQuantity <= (item.minStockAlert || 10);
                          return (
                            <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                              <td className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400">{item.sku}</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">{item.name}</td>
                              <td className="p-3 capitalize text-slate-500">{item.category}</td>
                              <td className="p-3 font-mono">৳{(item.unitCost || 0).toLocaleString()}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className={`font-black ${isLowStock ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                                    {item.stockQuantity} {item.unit || 'pcs'}
                                  </span>
                                  {isLowStock && (
                                    <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                                      <HiExclamation className="h-3 w-3" /> Low
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateStock(item._id, item.stockQuantity)}
                                  className="rounded-lg bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                >
                                  Restock
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setWarehouseModalOpen(false)}
                  className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-white hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
