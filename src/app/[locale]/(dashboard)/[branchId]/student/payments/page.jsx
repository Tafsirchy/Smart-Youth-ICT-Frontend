'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Badge } from '@/components/ui/Badge';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get('/payments/history');
        if (res.data?.success) {
          setPayments(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch payment history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">Payment History</h1>
      <p className="text-neutral-500 mb-8">View your past transactions and installment status.</p>
      
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 w-full bg-white rounded-xl"></div>)}
        </div>
      ) : payments.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Course / Item</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {payments.map(payment => (
                <tr key={payment._id} className="hover:bg-neutral-50/50">
                  <td className="px-6 py-4 font-medium text-neutral-900">{payment.course?.title?.en || payment.course?.title || 'Unknown Course'}</td>
                  <td className="px-6 py-4 text-neutral-500">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 uppercase text-neutral-500">{payment.method}</td>
                  <td className="px-6 py-4 font-bold">৳ {payment.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <Badge variant={payment.status === 'completed' ? 'success' : payment.status === 'pending' ? 'warning' : 'destructive'}>
                      {payment.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-12 text-center text-neutral-500">
          No payment history found.
        </div>
      )}
    </div>
  );
}
