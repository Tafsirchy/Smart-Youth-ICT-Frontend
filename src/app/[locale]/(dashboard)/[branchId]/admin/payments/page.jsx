'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { IoCardOutline, IoSearch, IoCheckmarkCircle, IoTimeOutline, IoCloseCircle, IoEyeOutline } from 'react-icons/io5';
import Portal from '@/components/ui/Portal';

const STATUS_COLORS = {
  completed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  failed:  'bg-red-100 text-red-700',
};

const METHOD_LABELS = { bkash: 'bKash', nagad: 'Nagad', stripe: 'Stripe / Card', bank: 'Manual Bank' };

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage]         = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null); // For modal
  const [note, setNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const limit = 20;

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (statusFilter) params.status = statusFilter;
      const res = await api.get('/payments', { params });
      setPayments(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch {
      toast.error('Failed to load payments.');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const filtered = search
    ? payments.filter(p =>
        p.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
        p.transactionId?.toLowerCase().includes(search.toLowerCase())
      )
    : payments;

  const totalPages = Math.ceil(total / limit);

  // Stats (Using correct property 'status')
  const paidCount    = payments.filter(p => p.status === 'completed').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((acc, p) => acc + (p.amount || 0), 0);

  const handleAction = async (paymentId, actionStatus) => {
    setActionLoading(true);
    try {
      await api.put(`/payments/${paymentId}/verify`, { status: actionStatus, note });
      toast.success(`Payment marked as ${actionStatus}`);
      setSelectedPayment(null);
      setNote('');
      fetchPayments();
    } catch {
      toast.error('Failed to update payment status.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-textPrimary">Payment Management</h1>
        <p className="text-textSecondary text-sm mt-1">{total} total payment records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: `৳${totalRevenue.toLocaleString()}`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Paid', value: paidCount, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending', value: pendingCount, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(card => (
          <div key={card.label} className={`${card.bg} rounded-2xl p-5 ring-1 ring-neutral-200`}>
            <p className="text-sm text-neutral-600 mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or transaction ID…"
            className="input pl-10 w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input min-w-[140px]"
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Student</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Course</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Method</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Amount</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Date</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Transaction ID</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(8)].map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 bg-neutral-200 rounded w-full"></div></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-neutral-400">
                    <IoCardOutline size={36} className="mx-auto mb-2 opacity-30" />
                    No payments found.
                  </td>
                </tr>
              ) : (
                filtered.map((payment, i) => (
                  <tr key={payment._id || i} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-neutral-900">{payment.user?.name || '—'}</div>
                      <div className="text-xs text-neutral-500">{payment.user?.email || '—'}</div>
                    </td>
                    <td className="px-5 py-4 text-neutral-600 max-w-[160px] truncate">
                      {payment.course?.title?.en || payment.course?.title || '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium">
                        {METHOD_LABELS[payment.method] || payment.method || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-neutral-900">৳{payment.amount?.toLocaleString() || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[payment.status] || 'bg-neutral-100 text-neutral-600'}`}>
                        {payment.status === 'completed' && <IoCheckmarkCircle size={12} />}
                        {payment.status === 'pending'   && <IoTimeOutline size={12} />}
                        {payment.status === 'failed'    && <IoCloseCircle size={12} />}
                        {payment.status || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-neutral-500">{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="px-5 py-4 text-neutral-400 text-xs font-mono">{payment.transactionId || '—'}</td>
                    <td className="px-5 py-4">
                      {(payment.status === 'pending') && (
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition flex items-center gap-1"
                        >
                          <IoEyeOutline size={14} /> Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-sm rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40">Previous</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>
      
      {/* Review Modal */}
      <Portal>
        {selectedPayment && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative z-[10000]">
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-textPrimary">Review Payment</h3>
                <button onClick={() => setSelectedPayment(null)} className="text-neutral-400 hover:text-neutral-600"><IoCloseCircle size={24} /></button>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-neutral-500">Student:</span> <div className="font-semibold">{selectedPayment.user?.name}</div></div>
                  <div><span className="text-neutral-500">Course:</span> <div className="font-semibold">{selectedPayment.course?.title?.en || selectedPayment.course?.title}</div></div>
                  <div><span className="text-neutral-500">Amount:</span> <div className="font-semibold">৳{selectedPayment.amount}</div></div>
                  <div><span className="text-neutral-500">Method:</span> <div className="font-semibold">{METHOD_LABELS[selectedPayment.method]}</div></div>
                </div>
                
                {selectedPayment.slip && (
                  <div>
                    <span className="text-neutral-500 block mb-1">Attached Slip:</span>
                    <a href={selectedPayment.slip} target="_blank" rel="noreferrer" className="block p-2 border border-neutral-200 rounded-lg hover:border-blue-300">
                      <img src={selectedPayment.slip} alt="Payment Slip" className="w-full h-32 object-contain bg-neutral-50 rounded" />
                    </a>
                  </div>
                )}

                <div>
                  <label className="text-neutral-500 block mb-1">Admin Note (optional):</label>
                  <textarea
                    className="input w-full min-h-[80px]"
                    placeholder="Reason for rejection or internal notes..."
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleAction(selectedPayment._id, 'failed')}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedPayment._id, 'completed')}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    Approve (Enroll)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Portal>
    </div>
  );
}
