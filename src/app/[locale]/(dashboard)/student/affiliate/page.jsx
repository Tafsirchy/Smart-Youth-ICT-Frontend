'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLink, HiOutlineCurrencyDollar, HiOutlineUsers, HiDuplicate } from 'react-icons/hi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AffiliateDashboardPage() {
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bkash');
  const [requesting, setRequesting] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://syict.com';

  useEffect(() => {
    const fetchAffiliate = async () => {
      try {
        const res = await api.get('/affiliate/me');
        if (res.data?.success) setAffiliate(res.data.data);
      } catch (err) {
        console.error('Failed to fetch affiliate data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAffiliate();
  }, []);

  const handleCopyLink = () => {
    if (!affiliate) return;
    const link = `${baseUrl}?ref=${affiliate.referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard!');
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) < 500) {
      return toast.error('Minimum withdrawal is ৳500');
    }
    setRequesting(true);
    try {
      const res = await api.post('/affiliate/withdraw', { amount: Number(withdrawAmount), method: withdrawMethod });
      if (res.data?.success) {
        toast.success(res.data.message);
        setWithdrawAmount('');
        // Refresh data
        const updated = await api.get('/affiliate/me');
        if (updated.data?.success) setAffiliate(updated.data.data);
      } else {
        toast.error(res.data?.message || 'Request failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred');
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 animate-pulse space-y-6">
        <div className="h-10 w-1/3 bg-neutral-200 rounded-lg"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(n => <div key={n} className="h-28 bg-neutral-200 rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  const referralLink = affiliate ? `${baseUrl}?ref=${affiliate.referralCode}` : '';

  const stats = [
    { label: 'Total Earnings', value: `৳ ${affiliate?.totalEarnings?.toFixed(2) || '0.00'}`, icon: HiOutlineCurrencyDollar, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pending Payout', value: `৳ ${affiliate?.pendingAmount?.toFixed(2) || '0.00'}`, icon: HiOutlineCurrencyDollar, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Referrals', value: affiliate?.referredUsers?.length || 0, icon: HiOutlineUsers, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Affiliate Program</h1>
        <p className="mt-2 text-neutral-500">Refer friends and earn <span className="font-bold text-emerald-600">10% commission</span> on every successful enrollment.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-5 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-neutral-500">{stat.label}</p>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Referral Link Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl shadow-blue-500/20">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><HiOutlineLink /> Your Referral Link</h2>
        <p className="text-blue-200 text-sm mb-5">Share this link with anyone. When they enroll, you earn a commission.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-sm font-mono text-blue-100 truncate">
            {referralLink}
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 bg-white text-blue-700 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors shrink-0"
          >
            <HiDuplicate size={18} /> Copy Link
          </button>
        </div>
        <p className="text-blue-300 text-xs mt-4">Referral Code: <span className="font-mono font-bold text-white">{affiliate?.referralCode}</span></p>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Request Payout</h2>
        <p className="text-sm text-neutral-500 mb-6">Withdraw your earnings. Minimum withdrawal: ৳500.</p>
        
        <form onSubmit={handleWithdraw} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Amount (৳)</label>
            <input
              type="number"
              min="500"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 1000"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Payment Method</label>
            <select
              value={withdrawMethod}
              onChange={(e) => setWithdrawMethod(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <button type="submit" disabled={requesting} className="btn-primary px-8 py-3 rounded-xl shrink-0">
            {requesting ? 'Requesting...' : 'Request Payout'}
          </button>
        </form>
      </div>

      {/* Withdrawal History */}
      {affiliate?.withdrawals?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
          <div className="p-5 border-b border-neutral-100">
            <h2 className="font-bold text-neutral-900">Withdrawal History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 text-left text-xs text-neutral-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Requested</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {affiliate.withdrawals.map((w, i) => (
                  <tr key={i} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 font-semibold">৳ {w.amount}</td>
                    <td className="px-4 py-3 capitalize">{w.method}</td>
                    <td className="px-4 py-3 text-neutral-500">{new Date(w.requestedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${w.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
