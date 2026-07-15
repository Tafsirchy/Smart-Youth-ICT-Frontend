'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ManualPaymentModal({ courseId, amount, onClose }) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('bkash');
  
  // Bank fields
  const [bankName, setBankName] = useState('');
  const [slipFile, setSlipFile] = useState(null);
  
  // Shared fields
  const [transactionId, setTransactionId] = useState('');
  
  // MFS fields (Mobile Financial Services)
  const [senderNumber, setSenderNumber] = useState('');

  const isMFS = ['bkash', 'nagad', 'rocket'].includes(method);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isMFS) {
      if (!transactionId || !senderNumber) {
        return toast.error('Please enter the Sender Number and Transaction ID');
      }
    } else {
      if (!bankName || !transactionId || !slipFile) {
        return toast.error('Please fill all bank details and upload the deposit slip');
      }
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('courseId', courseId);
      submitData.append('amount', amount);
      submitData.append('method', method);
      submitData.append('transactionId', transactionId);
      
      if (isMFS) {
        submitData.append('senderNumber', senderNumber);
      } else {
        submitData.append('bankName', bankName);
        submitData.append('slip', slipFile);
      }

      const res = await api.post('/payments/manual/submit', submitData, {
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

  const getInstructions = () => {
    switch (method) {
      case 'bkash':
        return (
          <div className="mb-6 rounded-xl bg-pink-50 p-4 text-sm text-pink-800 border border-pink-100">
            <p className="font-semibold mb-2">bKash Send Money Details:</p>
            <p className="text-lg font-black mb-1">017XXXXXXXX <span className="text-xs font-normal text-pink-600 ml-2">(Personal)</span></p>
            <p className="font-medium mt-3">Amount to pay: ৳ {amount}</p>
          </div>
        );
      case 'nagad':
        return (
          <div className="mb-6 rounded-xl bg-orange-50 p-4 text-sm text-orange-800 border border-orange-100">
            <p className="font-semibold mb-2">Nagad Send Money Details:</p>
            <p className="text-lg font-black mb-1">017XXXXXXXX <span className="text-xs font-normal text-orange-600 ml-2">(Personal)</span></p>
            <p className="font-medium mt-3">Amount to pay: ৳ {amount}</p>
          </div>
        );
      case 'rocket':
        return (
          <div className="mb-6 rounded-xl bg-purple-50 p-4 text-sm text-purple-800 border border-purple-100">
            <p className="font-semibold mb-2">Rocket Send Money Details:</p>
            <p className="text-lg font-black mb-1">017XXXXXXXXX <span className="text-xs font-normal text-purple-600 ml-2">(Personal)</span></p>
            <p className="font-medium mt-3">Amount to pay: ৳ {amount}</p>
          </div>
        );
      case 'bank':
      default:
        return (
          <div className="mb-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-800 border border-blue-100">
            <p className="font-semibold mb-2">Our Bank Details:</p>
            <ul className="space-y-1">
              <li><strong>Bank:</strong> City Bank PLC</li>
              <li><strong>Account Name:</strong> Smart Youth ICT Ltd</li>
              <li><strong>Account No:</strong> 0123456789012</li>
              <li><strong>Branch:</strong> Gulshan Avenue</li>
            </ul>
            <p className="mt-3 font-medium">Amount to pay: ৳ {amount}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl bg-white p-5 sm:p-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manual Payment</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">✕</button>
        </div>

        {/* Payment Method Selector */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <button 
            type="button"
            onClick={() => setMethod('bkash')}
            className={`p-2 rounded-xl text-xs font-bold transition-all border-2 ${method === 'bkash' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-slate-100 bg-white text-slate-500 hover:border-pink-200'}`}
          >
            bKash
          </button>
          <button 
            type="button"
            onClick={() => setMethod('nagad')}
            className={`p-2 rounded-xl text-xs font-bold transition-all border-2 ${method === 'nagad' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-100 bg-white text-slate-500 hover:border-orange-200'}`}
          >
            Nagad
          </button>
          <button 
            type="button"
            onClick={() => setMethod('rocket')}
            className={`p-2 rounded-xl text-xs font-bold transition-all border-2 ${method === 'rocket' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-100 bg-white text-slate-500 hover:border-purple-200'}`}
          >
            Rocket
          </button>
          <button 
            type="button"
            onClick={() => setMethod('bank')}
            className={`p-2 rounded-xl text-xs font-bold transition-all border-2 ${method === 'bank' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200'}`}
          >
            Bank
          </button>
        </div>

        {getInstructions()}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isMFS && (
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-slate-500">Sender {method} Number</label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-slate-50 border-2 border-transparent p-3 outline-none focus:border-indigo-500/30 focus:bg-white font-medium transition-all"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                placeholder="e.g. 017XXXXXXXX"
              />
            </div>
          )}

          {!isMFS && (
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-slate-500">Bank Name (Sent From)</label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-slate-50 border-2 border-transparent p-3 outline-none focus:border-indigo-500/30 focus:bg-white font-medium transition-all"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. BRAC Bank"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-black uppercase text-slate-500">Transaction ID (TrxID)</label>
            <input
              type="text"
              required
              className="w-full rounded-xl bg-slate-50 border-2 border-transparent p-3 outline-none focus:border-indigo-500/30 focus:bg-white font-medium transition-all uppercase"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. TRX123456789"
            />
          </div>

          {!isMFS && (
            <div>
              <label className="mb-1 block text-xs font-black uppercase text-slate-500">Deposit Slip / Receipt</label>
              <input
                type="file"
                accept="image/*"
                required
                className="w-full rounded-xl bg-slate-50 border-2 border-transparent p-2 outline-none focus:border-indigo-500/30 focus:bg-white transition-all text-sm"
                onChange={(e) => setSlipFile(e.target.files[0])}
              />
            </div>
          )}

          <div className="mt-8 flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-black text-slate-400 hover:text-slate-700 transition-colors text-sm uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-black transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 text-sm flex items-center justify-center min-w-[140px]"
            >
              {loading ? 'Submitting...' : 'Submit Payment'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
