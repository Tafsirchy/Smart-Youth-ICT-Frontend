'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineLink, HiOutlineCurrencyBangladeshi, HiOutlineUsers,
  HiOutlineDocumentDuplicate, HiOutlinePencilSquare, HiOutlineCheckCircle,
  HiOutlineXMark, HiOutlineInformationCircle
} from 'react-icons/hi2';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AffiliateContent() {
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Withdrawal State
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bkash');
  const [requesting, setRequesting] = useState(false);

  // Edit Code State
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [codeSaving, setCodeSaving] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://syict.com';

  useEffect(() => {
    fetchAffiliate();
  }, []);

  const fetchAffiliate = async () => {
    try {
      const res = await api.get('/affiliate/me');
      if (res.data?.success) {
        setAffiliate(res.data.data);
        setNewCode(res.data.data.referralCode);
      }
    } catch (err) {
      console.error('Failed to fetch affiliate data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!affiliate) return;
    const link = `${baseUrl}?ref=${affiliate.referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied!');
  };

  const handleUpdateCode = async () => {
    if (!newCode || newCode === affiliate.referralCode) return setIsEditingCode(false);

    setCodeSaving(true);
    try {
      const res = await api.put('/affiliate/code', { code: newCode });
      if (res.data?.success) {
        toast.success('Referral code updated!');
        setAffiliate(res.data.data);
        setIsEditingCode(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating code');
    } finally {
      setCodeSaving(false);
    }
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
        fetchAffiliate();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred');
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-6 max-w-6xl animate-pulse space-y-4">
        <div className="h-8 w-1/4 bg-neutral-100 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map(n => <div key={n} className="h-24 bg-neutral-100 rounded-2xl"></div>)}
        </div>
        <div className="h-64 bg-neutral-100 rounded-3xl"></div>
      </div>
    );
  }

  const referralLink = affiliate ? `${baseUrl}?ref=${affiliate.referralCode}` : '';

  return (
    <div className="py-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">Affiliate Partner Hub</h1>
        <p className="mt-1 text-neutral-500 leading-relaxed">Partner with SYICT and earn <span className="text-blue-600 font-bold">10% commission</span> on every successful enrollment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* STATS BREAKDOWN */}
        <div className="lg:col-span-2 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <HiOutlineCurrencyBangladeshi size={20} />
              </div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 leading-snug">Total Earnings</p>
              <p className="text-xl font-black text-neutral-900">৳{affiliate?.totalEarnings?.toLocaleString()}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <HiOutlineCurrencyBangladeshi size={20} />
              </div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 leading-snug">Balance Available</p>
              <p className="text-xl font-black text-neutral-900">৳{affiliate?.pendingAmount?.toLocaleString()}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <HiOutlineUsers size={20} />
              </div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 leading-snug">Successful Leads</p>
              <p className="text-xl font-black text-neutral-900">{affiliate?.referredUsers?.length || 0}</p>
            </motion.div>
          </div>

          {/* Referral Link & Customization */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[80px] -mr-24 -mt-24" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-black text-white mb-1 flex items-center gap-2 leading-snug">
                    <HiOutlineLink className="text-white" /> Referral Branding
                  </h2>
                  <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">Share your personalized link. When your students enroll, you earn.</p>
                </div>
                <div className="hidden md:block">
                  <div className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 leading-snug">Tracking Active</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 px-4 py-3 font-mono text-sm text-blue-200 select-all truncate">
                  {referralLink}
                </div>
                <button onClick={handleCopyLink} className="bg-white text-neutral-900 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all active:scale-95">
                  <HiOutlineDocumentDuplicate size={18} /> Copy Link
                </button>
              </div>

              <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1 leading-snug">My Brand Code</p>
                  {isEditingCode ? (
                    <div className="flex items-center gap-2">
                      <input
                        className="bg-neutral-800 border-none rounded-md px-3 py-1 text-sm font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-blue-500"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        autoFocus
                      />
                      <button onClick={handleUpdateCode} className="text-emerald-400"><HiOutlineCheckCircle size={20} /></button>
                      <button onClick={() => setIsEditingCode(false)} className="text-red-400"><HiOutlineXMark size={20} /></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black uppercase tracking-widest text-blue-400">{affiliate?.referralCode}</span>
                      <button onClick={() => setIsEditingCode(true)} className="p-1 bg-white/5 rounded-md hover:bg-white/10 transition-colors">
                        <HiOutlinePencilSquare size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex justify-end">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold italic leading-snug">
                    <HiOutlineInformationCircle size={14} />
                    Custom codes attract 40% more clicks.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Referred Users List */}
          <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
            <h3 className="text-lg font-black text-neutral-900 mb-4 flex items-center gap-2 leading-snug">
              <HiOutlineUsers className="text-blue-600" /> Referred Students
            </h3>

            {affiliate?.referredUsers?.length > 0 ? (
              <div className="space-y-2">
                {affiliate.referredUsers.map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-blue-600 uppercase text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 text-sm leading-snug">{user.name}</p>
                        <p className="text-[10px] font-bold text-neutral-400 leading-snug">Enrolled: {new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-snug">Active Partner</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300 mb-3">
                  <HiOutlineUsers size={24} />
                </div>
                <p className="text-neutral-400 text-sm font-medium leading-relaxed">No students referred yet. Start sharing!</p>
              </div>
            )}
          </div>
        </div>

        {/* WITHDRAWAL PANEL */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
            <h3 className="text-lg font-black text-neutral-900 mb-1 leading-snug">Cash Out</h3>
            <p className="text-xs text-neutral-500 mb-4 leading-relaxed">Withdraw your verified earnings.</p>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 leading-snug">Withdrawal Amount (৳)</label>
                <input
                  type="number"
                  min="500"
                  className="w-full bg-neutral-50 rounded-xl border-none px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  placeholder="Min. ৳500"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 leading-snug">Payment Method</label>
                <div className="relative">
                  <select
                    className="w-full bg-neutral-50 rounded-xl border-none px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all appearance-none outline-none"
                    value={withdrawMethod}
                    onChange={(e) => setWithdrawMethod(e.target.value)}
                  >
                    <option value="bkash">bKash (Personal)</option>
                    <option value="nagad">Nagad (Personal)</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={requesting} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50">
                {requesting ? 'Processing...' : 'Request Payout'}
              </button>
            </form>
          </div>

          {/* History Mini List */}
          {affiliate?.withdrawals?.length > 0 && (
            <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm">
              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-4 border-b border-neutral-50 pb-3 leading-snug">Recent Payouts</h3>
              <div className="space-y-3">
                {affiliate.withdrawals.slice(0, 5).map((w, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-neutral-800 text-sm leading-snug">৳{w.amount.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-neutral-400 leading-snug">{new Date(w.requestedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest leading-snug ${w.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
