'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';

export default function ManualBankModal({ courseId, amount, onClose }) {
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [slipFile, setSlipFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bankName || !transactionId || !slipFile) {
      return toast.error('Please fill all fields and upload the deposit slip');
    }

    setLoading(true);
    try {
      // 1. Upload the slip image (simulating formData upload to backend or direct to ImgBB)
      const formData = new FormData();
      formData.append('image', slipFile);
      
      // Upload slip first (requires an explicit endpoint or we send it with the submit req)
      // For now, assume backend /bank/submit handles multipart/form-data
      const submitData = new FormData();
      submitData.append('courseId', courseId);
      submitData.append('amount', amount);
      submitData.append('bankName', bankName);
      submitData.append('transactionId', transactionId);
      submitData.append('slip', slipFile);

      const res = await api.post('/payments/bank/submit', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.success) {
        toast.success(res.data.message || 'Payment submitted for review');
        onClose();
      } else {
        toast.error(res.data?.message || 'Failed to submit payment');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">Manual Bank Transfer</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">✕</button>
        </div>

        <div className="mb-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-semibold mb-2">Our Bank Details:</p>
          <ul className="space-y-1">
            <li><strong>Bank:</strong> City Bank PLC</li>
            <li><strong>Account Name:</strong> Smart Youth ICT Ltd</li>
            <li><strong>Account No:</strong> 0123456789012</li>
            <li><strong>Branch:</strong> Gulshan Avenue</li>
          </ul>
          <p className="mt-3 font-medium">Amount to pay: ৳ {amount}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Bank Name (Sent From)</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-neutral-300 p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g. BRAC Bank"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Transaction ID</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-neutral-300 p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. TRX123456789"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Deposit Slip / Receipt</label>
            <input
              type="file"
              accept="image/*"
              required
              className="w-full rounded-lg border border-neutral-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={(e) => setSlipFile(e.target.files[0])}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" isLoading={loading}>Submit for Approval</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
