'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { useRole } from '@/hooks/useRole';
import LoadErrorBanner from '@/components/ui/LoadErrorBanner';
import {
  HiGift,
  HiTag,
  HiTrendingUp,
  HiPlus,
  HiSearch,
  HiCheckCircle,
  HiXCircle,
  HiTrash,
  HiClock,
  HiClipboardCopy,
  HiCurrencyBangladeshi,
  HiUsers,
  HiFilter
} from 'react-icons/hi';
import { IoCloseOutline, IoCheckmarkDone } from 'react-icons/io5';

export default function BranchCouponsPage() {
  const { branchId } = useParams();
  const { isSuperAdmin, isBranchManager } = useRole();
  const canManage = isSuperAdmin || isBranchManager;

  const [coupons, setCoupons] = useState([]);
  const [metrics, setMetrics] = useState({
    totalCoupons: 0,
    activeCount: 0,
    totalRedemptions: 0,
    totalDiscountsGiven: 0,
    totalRevenueGenerated: 0
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    discountType: 'percentage',
    discountValue: 15,
    minPurchaseAmount: 0,
    maxDiscountAmount: 0,
    validUntil: '',
    usageLimit: 100,
  });

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const res = await api.get('/coupons', {
        params: { branchId: branchId || undefined }
      });
      if (res.data?.success) {
        setCoupons(res.data.data || []);
        if (res.data.metrics) setMetrics(res.data.metrics);
      }
    } catch (err) {
      console.error('Failed to load coupons:', err);
      setLoadError(err.response?.data?.message || 'Failed to load coupons. Please retry.');
    } finally {
      setLoading(false);
    }
  }, [branchId]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleGenerateCode = () => {
    const prefix = branchId && branchId !== 'hq' ? String(branchId).slice(0, 3).toUpperCase() : 'SY';
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    setFormData(prev => ({ ...prev, code: `${prefix}-${rand}` }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discountValue || !formData.validUntil) {
      setFeedback({ type: 'error', message: 'Please fill in all mandatory fields.' });
      return;
    }

    try {
      setSubmitting(true);
      setFeedback(null);
      const res = await api.post('/coupons', {
        ...formData,
        code: formData.code.trim().toUpperCase(),
        branchId: isSuperAdmin ? undefined : branchId
      });

      if (res.data?.success) {
        setIsModalOpen(false);
        setFormData({
          code: '',
          title: '',
          discountType: 'percentage',
          discountValue: 15,
          minPurchaseAmount: 0,
          maxDiscountAmount: 0,
          validUntil: '',
          usageLimit: 100,
        });
        setFeedback({ type: 'success', message: 'Promo coupon created successfully!' });
        fetchCoupons();
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Failed to create coupon'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/coupons/${id}/status`);
      if (res.data?.success) {
        setCoupons(prev =>
          prev.map(c => (c._id === id ? { ...c, isActive: res.data.isActive } : c))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  const handleDeleteCoupon = async (id, code) => {
    if (!confirm(`Are you sure you want to delete coupon "${code}"?`)) return;
    try {
      await api.delete(`/coupons/${id}`);
      setCoupons(prev => prev.filter(c => c._id !== id));
      setMetrics(prev => ({ ...prev, totalCoupons: Math.max(0, prev.totalCoupons - 1) }));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting coupon');
    }
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const isExpired = c.validUntil && new Date(c.validUntil) < new Date();

    if (statusFilter === 'active') return matchesSearch && c.isActive && !isExpired;
    if (statusFilter === 'inactive') return matchesSearch && !c.isActive;
    if (statusFilter === 'expired') return matchesSearch && isExpired;
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 p-8 text-white shadow-xl shadow-orange-500/10">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
              <HiGift className="h-4 w-4" />
              <span>Campus Campaign & Growth Hub</span>
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Branch Promo Codes & Coupons
            </h1>
            <p className="mt-1 max-w-xl text-sm text-orange-100">
              Create localized discount codes for campus admissions, workshop drives, and track campaign ROI.
            </p>
          </div>

          {canManage && (
            <button
              onClick={() => {
                handleGenerateCode();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-orange-600 shadow-lg transition-all hover:scale-105 hover:bg-orange-50 active:scale-95"
            >
              <HiPlus className="h-5 w-5" />
              <span>Create New Promo</span>
            </button>
          )}
        </div>

        {/* Decorative background circles */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 right-48 h-48 w-48 rounded-full bg-orange-400/20 blur-xl" />
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
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Promos</span>
            <span className="rounded-xl bg-orange-50 p-2 text-orange-600 dark:bg-orange-950/50">
              <HiTag className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-white">
              {metrics.activeCount}
            </span>
            <span className="text-xs text-slate-500">of {metrics.totalCoupons} Total</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Redemptions</span>
            <span className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/50">
              <HiUsers className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-white">
              {metrics.totalRedemptions}
            </span>
            <span className="text-xs text-slate-500">Students Saved</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Discount</span>
            <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950/50">
              <HiCurrencyBangladeshi className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">
              ৳{(metrics.totalDiscountsGiven || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gross Sales</span>
            <span className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-950/50">
              <HiTrendingUp className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-white">
              ৳{(metrics.totalRevenueGenerated || 0).toLocaleString()}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Attributed</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search coupon code or title..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'active', 'inactive', 'expired'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold capitalize transition-all ${
                statusFilter === status
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Grid */}
      <LoadErrorBanner message={loadError} onRetry={fetchCoupons} />
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
        </div>
      ) : filteredCoupons.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <HiGift className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">No Promo Codes Found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchQuery ? 'Try matching another search term.' : 'Get started by creating your first promotional coupon.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCoupons.map(coupon => {
            const isExpired = coupon.validUntil && new Date(coupon.validUntil) < new Date();
            const usagePercent = Math.min(100, Math.round(((coupon.usedCount || 0) / (coupon.usageLimit || 1)) * 100));

            return (
              <div
                key={coupon._id}
                className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all hover:shadow-lg ${
                  !coupon.isActive || isExpired
                    ? 'border-slate-200 bg-slate-50/50 opacity-80 dark:border-slate-800 dark:bg-slate-900/40'
                    : 'border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {/* Top Notch Border Style */}
                <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-orange-500" />

                <div className="p-6">
                  {/* Status Badges */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isExpired
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400'
                          : coupon.isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {isExpired ? 'Expired' : coupon.isActive ? 'Active Promo' : 'Deactivated'}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      {coupon.branchId ? coupon.branchId.name : 'All Campuses (HQ)'}
                    </span>
                  </div>

                  {/* Promo Code Box */}
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-orange-300 bg-orange-50/60 p-3.5 dark:border-orange-900/60 dark:bg-orange-950/20">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                        Promo Code
                      </span>
                      <p className="font-mono text-xl font-black text-slate-900 dark:text-white">
                        {coupon.code}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyCode(coupon.code)}
                      className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-orange-600 shadow-sm transition-all hover:bg-orange-50 dark:bg-slate-800 dark:text-orange-400"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <IoCheckmarkDone className="h-4 w-4 text-emerald-500" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <HiClipboardCopy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Title & Discount Highlight */}
                  <div className="mt-4">
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      {coupon.title || 'General Admission Discount'}
                    </h3>
                    <p className="mt-1 text-sm font-black text-orange-600 dark:text-orange-400">
                      {coupon.discountType === 'percentage'
                        ? `${coupon.discountValue}% OFF`
                        : `৳${coupon.discountValue.toLocaleString()} FLAT OFF`}
                      {coupon.maxDiscountAmount > 0 && (
                        <span className="text-xs font-medium text-slate-400 ml-1.5">
                          (Max ৳{coupon.maxDiscountAmount.toLocaleString()})
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Usage Progress */}
                  <div className="mt-5 space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>Redeemed: {coupon.usedCount || 0} times</span>
                      <span>Limit: {coupon.usageLimit}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-orange-500 transition-all"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Expiration Details */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <HiClock className="h-4 w-4" />
                    <span>
                      Expires:{' '}
                      <strong className="text-slate-600 dark:text-slate-300">
                        {new Date(coupon.validUntil).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Card Actions Footer */}
                {canManage && (
                  <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                    <button
                      onClick={() => handleToggleStatus(coupon._id)}
                      className={`text-xs font-bold transition-all ${
                        coupon.isActive
                          ? 'text-amber-600 hover:text-amber-700'
                          : 'text-emerald-600 hover:text-emerald-700'
                      }`}
                    >
                      {coupon.isActive ? 'Deactivate' : 'Reactivate'}
                    </button>

                    <button
                      onClick={() => handleDeleteCoupon(coupon._id, coupon.code)}
                      className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                      title="Delete Coupon"
                    >
                      <HiTrash className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Coupon Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded-xl bg-orange-50 p-2 text-orange-600 dark:bg-orange-950">
                    <HiGift className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    Create New Promo Coupon
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Code */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Promo Code *
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateCode}
                        className="text-[10px] font-bold text-orange-600 hover:underline"
                      >
                        Auto Generate
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      placeholder="e.g. BOGURA20"
                      className="w-full font-mono rounded-xl border border-slate-200 p-3 text-sm font-bold uppercase text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Title / Campaign */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Campaign Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Eid Mega Sale / Summer Batch"
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Discount Type & Value */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Discount Type
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={e => setFormData({ ...formData, discountType: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="percentage">Percentage Discount (%)</option>
                      <option value="fixed">Fixed Amount (৳ BDT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Discount Value * ({formData.discountType === 'percentage' ? '%' : '৳'})
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.discountValue}
                      onChange={e => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Minimum Purchase & Max Cap */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Minimum Course Fee (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.minPurchaseAmount}
                      onChange={e => setFormData({ ...formData, minPurchaseAmount: Number(e.target.value) })}
                      placeholder="0 for none"
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Max Discount Cap (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxDiscountAmount}
                      onChange={e => setFormData({ ...formData, maxDiscountAmount: Number(e.target.value) })}
                      placeholder="0 for unlimited"
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Usage Limit & Expiry Date */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Usage Limit (Max Students)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.usageLimit}
                      onChange={e => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Expiration Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.validUntil}
                      onChange={e => setFormData({ ...formData, validUntil: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
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
                    className="rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-700 disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Publish Coupon'}
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
