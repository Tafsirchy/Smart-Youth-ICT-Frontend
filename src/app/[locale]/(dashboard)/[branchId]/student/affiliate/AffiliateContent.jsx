'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineLink, HiOutlineCurrencyBangladeshi, HiOutlineUsers, 
  HiOutlineDocumentDuplicate, HiOutlinePencilSquare, HiOutlineCheckCircle,
  HiOutlineXMark, HiOutlineInformationCircle
} from 'react-icons/hi2'; // Switched to hi2
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
      <div className="py-12 max-w-6xl animate-pulse space-y-8">
        <div className="h-10 w-1/4 bg-neutral-100 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => <div key={n} className="h-32 bg-neutral-100 rounded-3xl"></div>)}
        </div>
        <div className="h-80 bg-neutral-100 rounded-[32px]"></div>
      </div>
    );
  }

  const referralLink = affiliate ? `${baseUrl}?ref=${affiliate.referralCode}` : '';

  return (
    <div className="py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Affiliate Partner Hub</h1>
        <p className="mt-2 text-neutral-500">Partner with SYICT and earn <span className="text-blue-600 font-bold">10% commission</span> on every successful enrollment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* STATS BREAKDOWN */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <HiOutlineCurrencyBangladeshi size={24} />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Total Earnings</p>
                <p className="text-2xl font-black text-neutral-900">৳{affiliate?.totalEarnings?.toLocaleString()}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <HiOutlineCurrencyBangladeshi size={24} />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Balance Available</p>
                <p className="text-2xl font-black text-neutral-900">৳{affiliate?.pendingAmount?.toLocaleString()}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <HiOutlineUsers size={24} />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Successful Leads</p>
                <p className="text-2xl font-black text-neutral-900">{affiliate?.referredUsers?.length || 0}</p>
            </motion.div>
          </div>

          {/* Referral Link & Customization */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[40px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
                    <HiOutlineLink className="text-blue-400" /> Referral Branding
                  </h2>
                  <p className="text-neutral-400 text-sm max-w-sm">Share your personalized link. When your students enroll, you earn.</p>
                </div>
                <div className="hidden md:block">
                   <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Tracking Active</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                 <div className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 px-5 py-4 font-mono text-sm text-blue-200 select-all truncate">
                   {referralLink}
                 </div>
                 <button onClick={handleCopyLink} className="bg-white text-neutral-900 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all active:scale-95">
                   <HiOutlineDocumentDuplicate size={20} /> Copy Link
                 </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6">
                 <div>
                   <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-2">My Brand Code</p>
                   {isEditingCode ? (
                     <div className="flex items-center gap-2">
                       <input 
                         className="bg-neutral-800 border-none rounded-lg px-3 py-1 text-sm font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-blue-500" 
                         value={newCode} 
                         onChange={(e) => setNewCode(e.target.value)} 
                         autoFocus
                       />
                       <button onClick={handleUpdateCode} className="text-emerald-400"><HiOutlineCheckCircle size={24} /></button>
                       <button onClick={() => setIsEditingCode(false)} className="text-red-400"><HiOutlineXMark size={24} /></button>
                     </div>
                   ) : (
                     <div className="flex items-center gap-3">
                       <span className="text-xl font-black uppercase tracking-widest text-blue-400">{affiliate?.referralCode}</span>
                       <button onClick={() => setIsEditingCode(true)} className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                         <HiOutlinePencilSquare size={16} />
                       </button>
                     </div>
                   )}
                 </div>
                 
                 <div className="flex-1 flex justify-end">
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-bold italic">
                       <HiOutlineInformationCircle size={14} />
                       Custom codes attract 40% more clicks.
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Referred Users List */}
          <div className="bg-white rounded-[40px] border border-neutral-100 p-8 shadow-sm">
             <h3 className="text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
               <HiOutlineUsers className="text-blue-600" /> Referred Students
             </h3>
             
             {affiliate?.referredUsers?.length > 0 ? (
               <div className="space-y-4">
                 {affiliate.referredUsers.map((user, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-blue-600 uppercase">
                           {user.name.charAt(0)}
                         </div>
                         <div>
                            <p className="font-bold text-neutral-900 text-sm">{user.name}</p>
                            <p className="text-[10px] font-bold text-neutral-400">Enrolled: {new Date(user.createdAt).toLocaleDateString()}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Partner</p>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300 mb-4">
                    <HiOutlineUsers size={32} />
                  </div>
                  <p className="text-neutral-400 text-sm font-medium">No students referred yet. Start sharing!</p>
               </div>
             )}
          </div>
        </div>

        {/* WITHDRAWAL PANEL */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white rounded-[40px] border border-neutral-100 p-8 shadow-sm">
             <h3 className="text-xl font-black text-neutral-900 mb-1">Cash Out</h3>
             <p className="text-xs text-neutral-500 mb-6">Withdraw your verified earnings.</p>
             
             <form onSubmit={handleWithdraw} className="space-y-5">
               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Withdrawal Amount (৳)</label>
                  <input 
                    type="number" 
                    min="500" 
                    className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                    placeholder="Min. ৳500" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
               </div>

               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Payment Method</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all appearance-none outline-none"
                      value={withdrawMethod}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                    >
                      <option value="bkash">bKash (Personal)</option>
                      <option value="nagad">Nagad (Personal)</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
               </div>

               <button type="submit" disabled={requesting} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50">
                 {requesting ? 'Processing...' : 'Request Payout'}
               </button>
             </form>
           </div>

           {/* History Mini List */}
           {affiliate?.withdrawals?.length > 0 && (
             <div className="bg-white rounded-[40px] border border-neutral-100 p-8 shadow-sm">
                <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-6 border-b border-neutral-50 pb-4">Recent Payouts</h3>
                <div className="space-y-5">
                   {affiliate.withdrawals.slice(0, 5).map((w, i) => (
                     <div key={i} className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-neutral-800 text-sm">৳{w.amount.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-neutral-400">{new Date(w.requestedAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${w.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
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
