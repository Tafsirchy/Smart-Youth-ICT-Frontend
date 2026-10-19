'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useRole } from '@/hooks/useRole';
import ImageUpload from '@/components/ui/ImageUpload';
import Image from 'next/image';
import {
  HiCash,
  HiTrendingUp,
  HiTrendingDown,
  HiClock,
  HiPlus,
  HiSearch,
  HiCheckCircle,
  HiXCircle,
  HiOutlinePhotograph,
  HiTrash,
  HiFilter,
  HiReceiptTax
} from 'react-icons/hi';
import { IoCloseOutline, IoCheckmarkCircle, IoEyeOutline } from 'react-icons/io5';

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'rent', label: 'Office Rent' },
  { value: 'utility', label: 'Electricity / Utility' },
  { value: 'internet', label: 'Internet & ISP' },
  { value: 'entertainment', label: 'Entertainment & Tea' },
  { value: 'stationery', label: 'Stationery & Printing' },
  { value: 'maintenance', label: 'Lab & PC Maintenance' },
  { value: 'other', label: 'Other Expenses' },
];

const STATUS_CONFIG = {
  approved: { label: 'Approved', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  pending: { label: 'Pending Review', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  rejected: { label: 'Rejected', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function BranchExpensesPage() {
  const { branchId } = useParams();
  const { isSuperAdmin, isBranchManager } = useRole();
  const canApprove = isSuperAdmin || isBranchManager;

  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'other',
    amount: '',
    expenseDate: new Date().toISOString().split('T')[0],
    description: '',
    voucherUrl: '',
  });

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/expenses', {
        params: {
          branchId,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          search: searchQuery || undefined,
        },
      });
      if (res.data?.success) {
        setExpenses(res.data.data || []);
        setAnalytics(res.data.analytics || null);
      }
    } catch (err) {
      console.error('Failed to fetch branch expenses:', err);
    } finally {
      setLoading(false);
    }
  }, [branchId, statusFilter, categoryFilter, searchQuery]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    try {
      setSubmitting(true);
      const res = await api.post('/expenses', {
        ...formData,
        branchId,
        amount: Number(formData.amount),
      });
      if (res.data?.success) {
        setShowAddModal(false);
        setFormData({
          title: '',
          category: 'other',
          amount: '',
          expenseDate: new Date().toISOString().split('T')[0],
          description: '',
          voucherUrl: '',
        });
        fetchExpenses();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit expense voucher');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusAction = async (id, status, note = '') => {
    try {
      const res = await api.patch(`/expenses/${id}/approval`, {
        status,
        actionNote: note,
      });
      if (res.data?.success) {
        setRejectingId(null);
        setRejectReason('');
        fetchExpenses();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update expense status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this expense record?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete expense record');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <HiReceiptTax size={24} />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Branch Expenses & P&L
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Track branch operational costs, approve petty cash vouchers, and monitor net profitability.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
        >
          <HiPlus size={18} />
          Record Expense Voucher
        </button>
      </div>

      {/* ── Financial P&L Metric Cards ── */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <HiCash size={20} />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">
              ৳ {analytics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">From student course enrollments</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Approved Expenses</span>
              <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                <HiTrendingDown size={20} />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-rose-600">
              ৳ {analytics.totalApprovedExpense.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Operating and petty cash costs</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Net Margin (P&L)</span>
              <span className={`p-1.5 rounded-lg ${analytics.isProfitable ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {analytics.isProfitable ? <HiTrendingUp size={20} /> : <HiTrendingDown size={20} />}
              </span>
            </div>
            <div className={`text-2xl font-extrabold ${analytics.isProfitable ? 'text-emerald-600' : 'text-rose-600'}`}>
              ৳ {analytics.netMargin.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {analytics.isProfitable ? 'Branch is in Net Profit 🎉' : 'Operating at a deficit'}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Pending Review</span>
              <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                <HiClock size={20} />
              </span>
            </div>
            <div className="text-2xl font-extrabold text-amber-600">
              ৳ {analytics.totalPendingExpense.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Awaiting management approval</p>
          </div>
        </div>
      )}

      {/* ── Filters & Search Bar ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-lg">
            {['all', 'pending', 'approved', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition ${
                  statusFilter === st
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {st === 'all' ? 'All Vouchers' : st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-3 py-2 pr-7 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative">
              <HiSearch className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search expense title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg w-48 sm:w-60 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Expense List Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-sm text-gray-500">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading expenses...
          </div>
        ) : expenses.length === 0 ? (
          <div className="py-20 text-center text-sm text-gray-500">
            <HiReceiptTax className="mx-auto text-gray-300 mb-2" size={44} />
            No expense vouchers found matching the filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/80 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Expense Title & Category</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Submitted By</th>
                  <th className="px-5 py-3 font-semibold">Voucher</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses.map((item) => {
                  const statusConf = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
                  return (
                    <tr key={item._id} className="hover:bg-gray-50/60 transition">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-400 capitalize">
                          {item.category} {item.description ? `• ${item.description}` : ''}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-gray-900 whitespace-nowrap">
                        ৳ {Number(item.amount).toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(item.expenseDate).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="text-xs font-medium text-gray-900">{item.submittedBy?.name || 'Staff'}</div>
                        <div className="text-[11px] text-gray-400">{item.submittedBy?.role}</div>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {item.voucherUrl ? (
                          <button
                            onClick={() => setSelectedVoucher(item.voucherUrl)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                          >
                            <HiOutlinePhotograph size={16} />
                            View Receipt
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">No Slip</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConf.bg}`}>
                          {statusConf.label}
                        </span>
                        {item.actionNote && (
                          <p className="text-[11px] text-gray-400 mt-0.5 italic">Note: {item.actionNote}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {canApprove && item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusAction(item._id, 'approved')}
                                title="Approve Voucher"
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              >
                                <HiCheckCircle size={20} />
                              </button>
                              <button
                                onClick={() => setRejectingId(item._id)}
                                title="Reject Voucher"
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              >
                                <HiXCircle size={20} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(item._id)}
                            title="Delete Record"
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <HiTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Record Expense Modal ── */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <h3 className="text-lg font-bold text-gray-900">Record Branch Expense</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <IoCloseOutline size={22} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Expense Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Office Stationery & Whiteboard Markers"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      {CATEGORIES.filter((c) => c.value !== 'all').map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Amount (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 1500"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Expense Date
                  </label>
                  <input
                    type="date"
                    value={formData.expenseDate}
                    onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description / Purpose (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short note describing what this was spent for..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Money Receipt / Voucher Photo
                  </label>
                  <ImageUpload
                    value={formData.voucherUrl}
                    onChange={(url) => setFormData({ ...formData, voucherUrl: url })}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Voucher'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Reject Reason Prompt Modal ── */}
      <AnimatePresence>
        {rejectingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-gray-100"
            >
              <h3 className="text-base font-bold text-gray-900 mb-2">Reject Expense Voucher</h3>
              <p className="text-xs text-gray-500 mb-4">
                Please provide an explanation for rejecting this voucher so the submitter can review it.
              </p>
              <textarea
                rows={3}
                required
                placeholder="Reason for rejection (e.g. Receipt image unclear, unauthorized purchase)"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none mb-4"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRejectingId(null);
                    setRejectReason('');
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusAction(rejectingId, 'rejected', rejectReason)}
                  className="px-4 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition"
                >
                  Confirm Reject
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Voucher Image Preview Modal ── */}
      <AnimatePresence>
        {selectedVoucher && (
          <div
            onClick={() => setSelectedVoucher(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVoucher(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition"
              >
                <IoCloseOutline size={20} />
              </button>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedVoucher}
                  alt="Expense Voucher"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
