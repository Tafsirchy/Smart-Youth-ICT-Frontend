'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineCloudUpload, HiCheckCircle } from 'react-icons/hi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'submitted'
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // For submission modal/state
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Mocking fetching all assignments and user's submissions
    // In reality, we would fetch assignments for all enrolled courses
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileUrl) return toast.error('Please provide a file URL or repository link.');
    setSubmitting(true);
    try {
      const res = await api.post(`/assignments/${selectedAssignment._id}/submit`, { fileUrl, notes });
      if (res.data?.success) {
        toast.success(res.data.message);
        setSelectedAssignment(null);
        setFileUrl('');
        setNotes('');
        // Refresh submissions
      } else {
         toast.error(res.data?.message || 'Submission failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred during submission');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">Assignments</h1>
      <p className="text-neutral-500 mb-8">View, submit, and track the status of your practical coursework.</p>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-neutral-200">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'pending' ? 'border-blue-600 text-blue-600' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          Pending Assignments
        </button>
        <button 
          onClick={() => setActiveTab('submitted')}
          className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'submitted' ? 'border-blue-600 text-blue-600' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          My Submissions
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-neutral-200 rounded-xl"></div>
          <div className="h-24 bg-neutral-200 rounded-xl"></div>
        </div>
      ) : activeTab === 'pending' ? (
        <div className="space-y-4">
           {/* Placeholder for pending assignments mapping */}
           <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 text-center flex flex-col items-center">
             <HiOutlineDocumentText className="text-neutral-400 h-12 w-12 mb-3" />
             <h3 className="font-bold text-neutral-900">You are all caught up!</h3>
             <p className="text-neutral-500 text-sm mt-1">There are no pending assignments for your enrolled courses.</p>
           </div>
        </div>
      ) : (
        <div className="space-y-4">
           {/* Placeholder for submitted assignments mapping */}
           <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center flex flex-col items-center shadow-sm">
             <HiCheckCircle className="text-emerald-500 h-12 w-12 mb-3" />
             <h3 className="font-bold text-neutral-900">No submission history</h3>
             <p className="text-neutral-500 text-sm mt-1">You haven't submitted any assignments yet.</p>
           </div>
        </div>
      )}

      {/* Assignment Submit Modal (Simplified generic layout) */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Submit Assignment</h2>
                <button onClick={() => setSelectedAssignment(null)} className="text-neutral-400 hover:text-neutral-700">✕</button>
             </div>
             
             <div className="mb-6 p-4 bg-blue-50 rounded-xl">
               <h3 className="font-semibold text-blue-900">{selectedAssignment.title}</h3>
               <p className="text-sm text-blue-700 mt-1">Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-neutral-700 mb-1">Project Link / File URL</label>
                 <input type="url" required value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="e.g. GitHub Repository link or Google Drive link" className="w-full rounded-lg border border-neutral-300 p-2.5 outline-none focus:ring-1 focus:ring-blue-500" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-neutral-700 mb-1">Instructor Notes (Optional)</label>
                 <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions on how to run your code..." className="w-full rounded-lg border border-neutral-300 p-2.5 outline-none focus:ring-1 focus:ring-blue-500" />
               </div>
               
               <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button type="button" onClick={() => setSelectedAssignment(null)} className="px-4 py-2 font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
                  <button type="submit" disabled={submitting} className="btn-primary px-6 py-2 flex items-center gap-2">
                    {submitting ? 'Submitting...' : <><HiOutlineCloudUpload /> Submit Now</>}
                  </button>
               </div>
             </form>
           </motion.div>
        </div>
      )}
    </div>
  );
}
