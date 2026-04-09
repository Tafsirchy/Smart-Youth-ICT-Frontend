'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineDocumentText, HiOutlineCloudUpload, HiCheckCircle, 
  HiOutlineClock, HiOutlineClipboardList, HiOutlineX 
} from 'react-icons/hi';
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [assignmentsRes, submissionsRes] = await Promise.all([
        api.get('/assignments/my-assignments'),
        api.get('/assignments/my-submissions')
      ]);

      if (assignmentsRes.data?.success) setAssignments(assignmentsRes.data.data);
      if (submissionsRes.data?.success) setSubmissions(submissionsRes.data.data);
    } catch (err) {
      console.error('Failed to fetch assignment data', err);
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitting = async (e) => {
    e.preventDefault();
    if (!fileUrl) return toast.error('Please provide a link to your work.');
    setSubmitting(true);
    try {
      const res = await api.post(`/assignments/${selectedAssignment._id}/submit`, { fileUrl, notes });
      if (res.data?.success) {
        toast.success('Assignment submitted!');
        setSelectedAssignment(null);
        setFileUrl('');
        setNotes('');
        fetchData(); // Refresh lists
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred during submission');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter assignments that haven't been submitted yet
  const pendingAssignments = assignments.filter(a => 
    !submissions.some(s => (s.assignment?._id || s.assignment) === a._id)
  );

  return (
    <div className="py-8 max-w-6xl">
      <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">Assignments</h1>
      <p className="text-neutral-500 mb-8">View, submit, and track the status of your practical coursework.</p>

      {/* Tabs */}
      <div className="flex gap-8 mb-8 border-b border-neutral-100">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`pb-4 px-2 font-bold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'pending' ? 'border-blue-600 text-blue-600' : 'border-transparent text-neutral-400 hover:text-neutral-700'}`}
        >
          <HiOutlineClock size={18} />
          Pending Assignments ({pendingAssignments.length})
        </button>
        <button 
          onClick={() => setActiveTab('submitted')}
          className={`pb-4 px-2 font-bold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'submitted' ? 'border-blue-600 text-blue-600' : 'border-transparent text-neutral-400 hover:text-neutral-700'}`}
        >
          <HiCheckCircle size={18} />
          My Submissions ({submissions.length})
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2, 3, 4].map(n => <div key={n} className="h-40 bg-neutral-100 rounded-3xl" />)}
        </div>
      ) : activeTab === 'pending' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {pendingAssignments.length > 0 ? (
             pendingAssignments.map(assignment => (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={assignment._id} className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                      {assignment.course?.category || 'Course Content'}
                    </span>
                    <span className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                      <HiOutlineClock /> Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                 </div>
                 <h3 className="text-lg font-bold text-neutral-900 mb-2">{assignment.title}</h3>
                 <p className="text-neutral-500 text-sm mb-6 line-clamp-2">{assignment.description}</p>
                 <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
                    <span className="text-sm font-bold text-neutral-700">{assignment.points} Points</span>
                    <button 
                      onClick={() => setSelectedAssignment(assignment)}
                      className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      <HiOutlineCloudUpload /> Submit Work
                    </button>
                 </div>
               </motion.div>
             ))
           ) : (
             <div className="col-span-full rounded-3xl border-2 border-dashed border-neutral-100 bg-neutral-50/50 p-16 text-center flex flex-col items-center">
               <HiOutlineClipboardList className="text-neutral-300 h-16 w-16 mb-4" />
               <h3 className="text-xl font-bold text-neutral-400">All caught up!</h3>
               <p className="text-neutral-400 text-sm mt-1 max-w-xs">There are no pending assignments available for your courses right now.</p>
             </div>
           )}
        </div>
      ) : (
        <div className="space-y-4">
           {submissions.length > 0 ? (
             submissions.map(sub => (
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={sub._id} className="bg-white rounded-3xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sub.status === 'graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {sub.status === 'graded' ? <HiCheckCircle size={24} /> : <HiOutlineClock size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900">{sub.assignment?.title || 'Assignment'}</h3>
                      <p className="text-sm text-neutral-500">Submitted on {new Date(sub.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Status</p>
                       <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${sub.status === 'graded' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                         {sub.status}
                       </span>
                    </div>
                    {sub.status === 'graded' && (
                      <div className="text-right min-w-[70px]">
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Grade</p>
                        <span className="text-lg font-black text-emerald-600">{sub.grade}%</span>
                      </div>
                    )}
                  </div>
               </motion.div>
             ))
           ) : (
             <div className="rounded-3xl border border-neutral-100 bg-white p-16 text-center flex flex-col items-center">
               <HiOutlineDocumentText className="text-neutral-300 h-16 w-16 mb-4" />
               <h3 className="text-xl font-bold text-neutral-400">No submissions yet</h3>
               <p className="text-neutral-400 text-sm mt-1">Start submitting your assignments to see your history here.</p>
             </div>
           )}
        </div>
      )}

      {/* Submission Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden">
               <div className="flex justify-between items-center p-8 border-b border-neutral-50 text-neutral-900">
                  <h2 className="text-2xl font-bold">Submit Assignment</h2>
                  <button onClick={() => setSelectedAssignment(null)} className="text-neutral-400 hover:text-neutral-700 transition-colors"><HiOutlineX size={28} /></button>
               </div>
               
               <form onSubmit={handleSubmitting} className="p-8 space-y-6">
                 <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                   <h3 className="font-bold text-blue-900">{selectedAssignment.title}</h3>
                   <div className="flex gap-4 mt-2">
                     <span className="text-xs font-bold text-blue-700 flex items-center gap-1"><HiOutlineClock /> Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
                     <span className="text-xs font-bold text-blue-700">Points: {selectedAssignment.points}</span>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="block text-sm font-bold text-neutral-700 ml-1">GitHub / Project URL*</label>
                   <input 
                     type="url" 
                     required 
                     value={fileUrl} 
                     onChange={(e) => setFileUrl(e.target.value)} 
                     placeholder="https://github.com/..." 
                     className="w-full rounded-2xl border border-neutral-200 px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                   />
                 </div>

                 <div className="space-y-2">
                   <label className="block text-sm font-bold text-neutral-700 ml-1">Notes for Instructor</label>
                   <textarea 
                     rows={3} 
                     value={notes} 
                     onChange={(e) => setNotes(e.target.value)} 
                     placeholder="Any extra info..." 
                     className="w-full rounded-2xl border border-neutral-200 px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                   />
                 </div>
                 
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setSelectedAssignment(null)} className="flex-1 py-4 font-bold text-neutral-500 hover:bg-neutral-50 rounded-2xl transition-colors">Cancel</button>
                    <button type="submit" disabled={submitting} className="flex-1 py-4 font-bold bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      {submitting ? 'Submitting...' : <><HiOutlineCloudUpload size={20} /> Submit Work</>}
                    </button>
                 </div>
               </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

