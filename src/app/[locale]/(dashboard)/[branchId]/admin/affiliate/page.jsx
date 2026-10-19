'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  HiOutlineGift,
  HiOutlineUsers,
  HiOutlineCurrencyBangladeshi,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineClipboardDocument,
  HiOutlineLink,
  HiOutlineCreditCard,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineEye,
} from 'react-icons/hi2';
import { usePermissionGuard } from '@/hooks/usePermissionGuard';
import AccessDenied from '@/components/ui/AccessDenied';
import Portal from '@/components/ui/Portal';

export default function BranchAffiliateAdminPage() {
  const { isLoading: guardLoading, isDenied } = usePermissionGuard(['admin:only', 'staff:manage']);
  const { branchId } = useParams();

  const [activeTab, setActiveTab] = useState('affiliates'); // 'affiliates' | 'withdrawals'
  const [affiliates, setAffiliates] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [withdrawalFilter, setWithdrawalFilter] = useState('all');

  // Action Modal State
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [actionType, setActionType] = useState('paid'); // 'paid' | 'rejected'
  const [adminNote, setAdminNote] = useState('');
  const [submittingAction, setSubmittingAction] = useState(false);

  // Detail Modal for Referred Users
  const [inspectAffiliate, setInspectAffiliate] = useState(null);

  const fetchAffiliateData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/affiliate/admin', { params: { branchId } });
      if (res.data?.success) {
        setAffiliates(res.data.data || []);
        setWithdrawals(res.data.withdrawals || []);
        setStats(res.data.stats || null);
      }
    } catch (err) {
      toast.error('Failed to load affiliate records');
    } finally {
      setLoading(false);
    }
  }, [branchId]);

  useEffect(() => {
    if (!guardLoading && !isDenied) {
      fetchAffiliateData();
    }
  }, [fetchAffiliateData, guardLoading, isDenied]);

  const handleProcessWithdrawal = async (e) => {
    e.preventDefault();
    if (!selectedWithdrawal) return;

    setSubmittingAction(true);
    try {
      const { affiliateId, _id: withdrawalId } = selectedWithdrawal;
      await api.patch(`/affiliate/admin/withdrawals/${affiliateId}/${withdrawalId}`, {
        status: actionType,
        note: adminNote.trim() || undefined,
      });

      toast.success(`Withdrawal request marked as ${actionType}`);
      setSelectedWithdrawal(null);
      setAdminNote('');
      fetchAffiliateData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update withdrawal status');
    } finally {
      setSubmittingAction(false);
    }
  };

  const copyRefCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Referral code ${code} copied!`);
  };

  // Filtered Affiliates
  const filteredAffiliates = useMemo(() => {
    return affiliates.filter((a) => {
      const q = search.toLowerCase();
      const name = a.user?.name?.toLowerCase() || '';
      const email = a.user?.email?.toLowerCase() || '';
      const code = a.referralCode?.toLowerCase() || '';
      return name.includes(q) || email.includes(q) || code.includes(q);
    });
  }, [affiliates, search]);

  // Filtered Withdrawals
  const filteredWithdrawals = useMemo(() => {
    return withdrawals.filter((w) => {
      if (withdrawalFilter !== 'all' && w.status !== withdrawalFilter) return false;
      const q = search.toLowerCase();
      const name = w.user?.name?.toLowerCase() || '';
      const email = w.user?.email?.toLowerCase() || '';
      const code = w.referralCode?.toLowerCase() || '';
      const method = w.method?.toLowerCase() || '';
      return name.includes(q) || email.includes(q) || code.includes(q) || method.includes(q);
    });
  }, [withdrawals, withdrawalFilter, search]);

  if (guardLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <HiOutlineArrowPath className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (isDenied) {
    return <AccessDenied message="Access Denied: You do not have permission to manage affiliates." />;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <HiOutlineGift className="w-7 h-7 text-pink-600" />
            Branch Affiliate & Referral Hub
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Monitor partner referral codes, track generated admissions, and disburse affiliate commissions.
          </p>
        </div>

        <button
          onClick={fetchAffiliateData}
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
          title="Refresh"
        >
          <HiOutlineArrowPath className={`w-4 h-4 ${loading ? 'animate-spin text-pink-600' : ''}`} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Affiliates</span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <HiOutlineGift className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {stats?.totalAffiliates || 0}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Active referral promoters in branch
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Referred Students</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <HiOutlineUsers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-700">
            {stats?.totalReferredStudents || 0}
          </div>
          <p className="text-[11px] text-blue-600/80 font-medium mt-1">
            Admissions via partner links
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Earnings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HiOutlineCurrencyBangladeshi className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            ৳ {(stats?.totalEarnings || 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600/80 font-medium mt-1">
            Lifetime commissions generated
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Payouts</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <HiOutlineCreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700">
            ৳ {(stats?.pendingPayoutsAmount || 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-600/80 font-medium mt-1">
            {stats?.pendingPayoutsCount || 0} requests awaiting review
          </p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('affiliates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'affiliates'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <HiOutlineUsers className="w-4 h-4" />
            Affiliate Partners ({affiliates.length})
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'withdrawals'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <HiOutlineCreditCard className="w-4 h-4" />
            Payout Requests
            {stats?.pendingPayoutsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold">
                {stats.pendingPayoutsCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {activeTab === 'withdrawals' && (
            <select
              value={withdrawalFilter}
              onChange={(e) => setWithdrawalFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500"
            >
              <option value="all">All Payouts</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          )}

          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search partner or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <HiOutlineArrowPath className="w-8 h-8 animate-spin mx-auto mb-2 text-pink-600" />
            <p className="text-xs font-semibold">Loading affiliate data...</p>
          </div>
        ) : activeTab === 'affiliates' ? (
          /* Tab 1: Affiliates List */
          filteredAffiliates.length === 0 ? (
            <div className="p-12 text-center">
              <HiOutlineGift className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No Affiliates Found</h3>
              <p className="text-xs text-slate-400 mt-1">
                No students or partners in this branch have activated their affiliate accounts yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Partner Profile</th>
                    <th className="py-3 px-4">Referral Code</th>
                    <th className="py-3 px-4">Rate</th>
                    <th className="py-3 px-4">Referred</th>
                    <th className="py-3 px-4">Total Earnings</th>
                    <th className="py-3 px-4">Pending Balance</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAffiliates.map((aff) => {
                    const refCount = Array.isArray(aff.referredUsers) ? aff.referredUsers.length : 0;
                    return (
                      <tr key={aff._id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0 border border-slate-200">
                              {aff.user?.name ? aff.user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{aff.user?.name || 'Anonymous User'}</div>
                              <div className="text-[11px] text-slate-400 font-medium">{aff.user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => copyRefCode(aff.referralCode)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 border border-pink-200 text-pink-700 rounded-lg font-mono font-bold text-xs hover:bg-pink-100 transition-colors"
                            title="Click to copy"
                          >
                            <span>{aff.referralCode}</span>
                            <HiOutlineClipboardDocument className="w-3.5 h-3.5" />
                          </button>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-700">
                          {aff.commissionRate || 10}%
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setInspectAffiliate(aff)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors"
                          >
                            <span>{refCount} Students</span>
                            <HiOutlineEye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700">
                          ৳ {(aff.totalEarnings || 0).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-amber-700">
                          ৳ {(aff.pendingAmount || 0).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setInspectAffiliate(aff)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Tab 2: Payout Requests */
          filteredWithdrawals.length === 0 ? (
            <div className="p-12 text-center">
              <HiOutlineCreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No Withdrawal Requests</h3>
              <p className="text-xs text-slate-400 mt-1">
                There are no commission withdrawal requests matching the selected filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Affiliate Partner</th>
                    <th className="py-3 px-4">Payout Amount</th>
                    <th className="py-3 px-4">Method / Account</th>
                    <th className="py-3 px-4">Requested Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Note / Audit</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWithdrawals.map((w, idx) => (
                    <tr key={w._id || idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{w.user?.name || 'Partner'}</div>
                        <div className="text-[11px] text-slate-400 font-medium font-mono">{w.referralCode}</div>
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                        ৳ {(w.amount || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-bold capitalize text-slate-700">
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200">
                          {w.method || 'bKash'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">
                        {w.requestedAt ? new Date(w.requestedAt).toLocaleDateString('en-GB') : '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                            w.status === 'paid'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : w.status === 'rejected'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {w.status === 'paid' ? 'Paid' : w.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px] italic">
                        {w.adminNote || (w.paidAt ? `Completed on ${new Date(w.paidAt).toLocaleDateString('en-GB')}` : '—')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {w.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedWithdrawal(w);
                                setActionType('paid');
                                setAdminNote('');
                              }}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedWithdrawal(w);
                                setActionType('rejected');
                                setAdminNote('');
                              }}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg transition-colors border border-rose-200"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-medium text-[11px]">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Process Payout Action Modal */}
      <Portal>
        <AnimatePresence>
          {selectedWithdrawal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base">
                    {actionType === 'paid' ? 'Confirm Payout Approval' : 'Reject Payout Request'}
                  </h3>
                  <button
                    onClick={() => setSelectedWithdrawal(null)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
                  >
                    <HiOutlineXMark className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-400">Partner:</span>
                    <span className="font-bold text-slate-800">{selectedWithdrawal.user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-400">Payout Amount:</span>
                    <span className="font-black text-slate-900">৳ {selectedWithdrawal.amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-400">Method:</span>
                    <span className="font-bold text-slate-800 uppercase">{selectedWithdrawal.method}</span>
                  </div>
                </div>

                <form onSubmit={handleProcessWithdrawal} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Administrative Note / TrxID
                    </label>
                    <input
                      type="text"
                      placeholder={actionType === 'paid' ? 'e.g. Sent via bKash TrxID #...' : 'e.g. Invalid account details'}
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedWithdrawal(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingAction}
                      className={`px-5 py-2 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50 ${
                        actionType === 'paid'
                          ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                          : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                      }`}
                    >
                      {submittingAction ? 'Processing...' : actionType === 'paid' ? 'Confirm & Mark Paid' : 'Reject Request'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Inspect Affiliate Details Modal */}
      <Portal>
        <AnimatePresence>
          {inspectAffiliate && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 my-8 max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{inspectAffiliate.user?.name}</h3>
                    <p className="text-xs text-slate-400">{inspectAffiliate.user?.email}</p>
                  </div>
                  <button
                    onClick={() => setInspectAffiliate(null)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
                  >
                    <HiOutlineXMark className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-medium">Referral Code</span>
                    <div className="font-mono font-bold text-pink-700 text-sm mt-0.5">{inspectAffiliate.referralCode}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-medium">Commission Rate</span>
                    <div className="font-bold text-slate-800 text-sm mt-0.5">{inspectAffiliate.commissionRate || 10}% per sale</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Referred Students ({inspectAffiliate.referredUsers?.length || 0})
                  </h4>
                  {inspectAffiliate.referredUsers?.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No students enrolled via this referral code yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                      {inspectAffiliate.referredUsers.map((u, i) => (
                        <div key={u._id || i} className="p-3 flex items-center justify-between text-xs bg-white hover:bg-slate-50">
                          <div>
                            <div className="font-bold text-slate-800">{u.name}</div>
                            <div className="text-[11px] text-slate-400">{u.email}</div>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : 'Enrolled'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setInspectAffiliate(null)}
                    className="px-4 py-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
