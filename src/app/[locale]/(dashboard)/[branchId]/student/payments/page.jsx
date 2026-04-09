'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineCreditCard, HiOutlineCash, HiOutlineBadgeCheck, 
  HiOutlineExclamationCircle, HiOutlineDocumentDownload,
  HiOutlineLightningBolt
} from 'react-icons/hi';
import api from '@/lib/api';
import { Badge } from '@/components/ui/Badge';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const [paymentsRes, enrollmentsRes] = await Promise.all([
        api.get('/payments/history'),
        api.get('/enrollments/me')
      ]);

      if (paymentsRes.data?.success) setPayments(paymentsRes.data.data);
      if (enrollmentsRes.data?.success) setEnrollments(enrollmentsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch billing data', error);
    } finally {
      setLoading(false);
    }
  };

  const totalInvested = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;

  return (
    <div className="py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">Billing & Payments</h1>
        <p className="text-neutral-500">Track your investments, manage installments, and view transaction history.</p>
      </div>
      
      {loading ? (
        <div className="space-y-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-neutral-100 rounded-3xl"></div>)}
          </div>
          <div className="h-64 bg-neutral-100 rounded-3xl w-full"></div>
        </div>
      ) : (
        <div className="space-y-10">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HiOutlineCash size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Invested</p>
                <p className="text-2xl font-black text-neutral-900">৳{totalInvested.toLocaleString()}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <HiOutlineLightningBolt size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Active Courses</p>
                <p className="text-2xl font-black text-neutral-900">{enrollments.length}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <HiOutlineExclamationCircle size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Pending Review</p>
                <p className="text-2xl font-black text-neutral-900">{pendingPayments}</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Enrollment Status */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <HiOutlineBadgeCheck className="text-blue-500" /> Enrollment Status
              </h2>
              <div className="space-y-4">
                {enrollments.map(enrollment => (
                  <div key={enrollment._id} className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
                    <h3 className="font-bold text-neutral-800 text-sm mb-3">{enrollment.course?.title?.en || enrollment.course?.title}</h3>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-medium text-neutral-400">Status</span>
                       <Badge variant={enrollment.paymentStatus === 'paid' ? 'success' : 'warning'}>
                         {enrollment.paymentStatus === 'paid' ? 'Fully Paid' : 'Installment Plan'}
                       </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <HiOutlineCreditCard className="text-blue-500" /> Transaction History
              </h2>
              <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50/50 text-neutral-500 border-b border-neutral-100">
                    <tr>
                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Reference</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Method</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Amount</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {payments.length > 0 ? (
                      payments.map(payment => (
                        <tr key={payment._id} className="hover:bg-neutral-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-neutral-900">{payment.course?.title?.en || payment.course?.title || 'Course Payment'}</p>
                            <p className="text-[10px] font-medium text-neutral-400">{new Date(payment.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-md text-[10px] font-bold uppercase">
                              {payment.method}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-black text-neutral-900">৳{payment.amount.toLocaleString()}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              payment.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                              payment.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                              'bg-red-100 text-red-700'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-neutral-400 italic">No transactions found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

