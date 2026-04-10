'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Portal from '@/components/ui/Portal';
import { 
  HiOutlineClipboardList, HiOutlineSearch, HiOutlineFilter,
  HiOutlineExternalLink, HiOutlineCheckCircle, HiOutlineX,
  HiOutlineChatAlt2, HiChevronRight
} from 'react-icons/hi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function GradingHub() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Grading Modal State
  const [selectedSub, setSelectedSub] = useState(null);
  const [gradingForm, setGradingForm] = useState({ grade: '', feedback: '' });
  const [grading, setGrading] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get('/assignments/instructor/submissions');
      if (res.data?.success) setSubmissions(res.data.data);
    } catch (err) {
      console.error('Failed to fetch submissions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGrading = (sub) => {
    setSelectedSub(sub);
    setGradingForm({ 
      grade: sub.grade || '', 
      feedback: sub.feedback || '' 
    });
  };

  const submitGrade = async (e) => {
    e.preventDefault();
    setGrading(true);
    try {
      const res = await api.put(`/assignments/submissions/${selectedSub._id}/grade`, gradingForm);
      if (res.data?.success) {
        toast.success('Grade submitted successfully!');
        setSelectedSub(null);
        fetchSubmissions();
      }
    } catch (err) {
      toast.error('Error submitting grade');
    } finally {
      setGrading(false);
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.assignment?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 max-w-6xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Grading Hub</h1>
          <p className="mt-2 text-neutral-500">Review student work, provide feedback, and award grades.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                 type="text"
                 placeholder="Search student or course..."
                 className="pl-12 pr-4 py-3 bg-white border border-neutral-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none w-64 shadow-sm"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="p-3 bg-white border border-neutral-100 rounded-2xl text-neutral-500 hover:text-blue-600 shadow-sm transition-all">
              <HiOutlineFilter size={20} />
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-neutral-50 border-b border-neutral-100">
                    <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Student</th>
                    <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Assignment</th>
                    <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Submitted</th>
                    <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                 {loading ? (
                    [1, 2, 3].map(i => (
                       <tr key={i} className="animate-pulse">
                          <td colSpan={5} className="px-8 py-6 h-20 bg-neutral-50/50" />
                       </tr>
                    ))
                 ) : filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((sub, i) => (
                       <motion.tr 
                         key={sub._id}
                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                         className="hover:bg-neutral-50/50 transition-colors group"
                       >
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                                   {sub.student?.name?.charAt(0)}
                                </div>
                                <div>
                                   <p className="font-bold text-neutral-900 text-sm whitespace-nowrap">{sub.student?.name}</p>
                                   <p className="text-[10px] text-neutral-400 font-bold">{sub.student?.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <p className="font-bold text-neutral-900 text-sm line-clamp-1">{sub.assignment?.title}</p>
                             <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{sub.assignment?.course?.title}</p>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-sm font-medium text-neutral-600">{new Date(sub.createdAt).toLocaleDateString()}</p>
                             <p className="text-[10px] text-neutral-400 font-bold">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </td>
                          <td className="px-8 py-6 flex justify-center">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                sub.status === 'graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                             }`}>
                                {sub.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button 
                                onClick={() => handleOpenGrading(sub)}
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:translate-x-1 transition-all"
                             >
                                {sub.status === 'graded' ? 'Edit Grade' : 'Grade Now'} <HiChevronRight size={18} />
                             </button>
                          </td>
                       </motion.tr>
                    ))
                 ) : (
                    <tr>
                       <td colSpan={5} className="px-8 py-20 text-center">
                          <p className="text-neutral-400 font-medium font-italic">No submissions found to review.</p>
                       </td>
                    </tr>
                 )
                 }
              </tbody>
           </table>
        </div>
      </div>

      {/* GRADING MODAL */}
      <Portal>
         <AnimatePresence>
            {selectedSub && (
               <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedSub(null)}
                    className="absolute inset-0"
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden z-[10000]"
                  >
                     <button onClick={() => setSelectedSub(null)} className="absolute top-8 right-8 text-neutral-400 hover:text-neutral-900 transition-colors">
                        <HiOutlineX size={28} />
                     </button>

                     <h2 className="text-2xl font-black text-neutral-900 mb-2">Grade Submission</h2>
                     <p className="text-sm text-neutral-500 mb-8 border-b border-neutral-50 pb-4">
                        Reviewing work by <span className="text-blue-600 font-bold">{selectedSub.student?.name}</span> for 
                        <span className="font-bold text-neutral-900"> {selectedSub.assignment?.title}</span>
                     </p>

                     <div className="space-y-8">
                        {/* Student Work Preview Card */}
                        <div className="bg-neutral-900 rounded-[32px] p-8 text-white">
                           <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-4">Submission Link</h3>
                           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="font-mono text-sm text-blue-300 truncate max-w-sm">
                                 {selectedSub.fileUrl}
                              </div>
                              <a 
                                href={selectedSub.fileUrl} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all hover:-translate-y-1"
                              >
                                 <HiOutlineExternalLink size={20} /> View Work
                              </a>
                           </div>
                           {selectedSub.notes && (
                              <div className="mt-6 pt-6 border-t border-white/10">
                                 <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-2">Student Notes</h3>
                                 <p className="text-sm text-neutral-300 italic">"{selectedSub.notes}"</p>
                              </div>
                           )}
                        </div>

                        {/* Grading Form */}
                        <form onSubmit={submitGrade} className="space-y-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-1.5">
                                 <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Grade (0-100)</label>
                                 <input 
                                    required type="number" min="0" max="100"
                                    className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all" 
                                    placeholder="e.g. 95"
                                    value={gradingForm.grade} onChange={(e) => setGradingForm({...gradingForm, grade: e.target.value})}
                                 />
                              </div>
                           </div>

                           <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                 <HiOutlineChatAlt2 /> Instructor Feedback
                              </label>
                              <textarea 
                                 required rows={4}
                                 className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-600 transition-all resize-none" 
                                 placeholder="Great work! The attention to detail is excellent..."
                                 value={gradingForm.feedback} onChange={(e) => setGradingForm({...gradingForm, feedback: e.target.value})}
                              />
                           </div>

                           <button 
                              type="submit" disabled={grading}
                              className="w-full py-5 bg-blue-600 text-white rounded-[32px] font-extrabold text-lg shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
                           >
                              {grading ? 'Recording Grade...' : 'Confirm & Publish Grade'}
                           </button>
                        </form>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </Portal>
    </div>
  );
}
