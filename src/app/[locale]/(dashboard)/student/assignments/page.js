'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoDocumentTextOutline, IoCloudUploadOutline, IoCheckmarkCircle,
  IoTimeOutline, IoCloseCircle, IoAttachOutline
} from 'react-icons/io5';

const STATUS = {
  pending:   { label: 'Pending',   color: 'bg-amber-100 text-amber-700' },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
  graded:    { label: 'Graded',    color: 'bg-emerald-100 text-emerald-700' },
  failed:    { label: 'Needs Revision', color: 'bg-red-100 text-red-700' },
};

export default function AssignmentsPage() {
  const locale = useLocale();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [submitting, setSubmitting]   = useState(null); // assignment id being submitted
  const [selectedFile, setSelectedFile] = useState({}); // { [assignmentId]: File }
  const fileRefs = useRef({});

  useEffect(() => {
    api.get('/assignments')
      .then(res => { if (res.data?.success) setAssignments(res.data.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (assignmentId, file) => {
    setSelectedFile(prev => ({ ...prev, [assignmentId]: file }));
  };

  const handleSubmit = async (assignmentId) => {
    const file = selectedFile[assignmentId];
    if (!file) { toast.error('Please select a file first.'); return; }
    setSubmitting(assignmentId);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await api.post(`/assignments/${assignmentId}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Assignment submitted successfully!');
      setAssignments(prev => prev.map(a => a._id === assignmentId ? { ...a, status: 'submitted' } : a));
      setSelectedFile(prev => { const n = { ...prev }; delete n[assignmentId]; return n; });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Submission failed.');
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div className="pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-textPrimary flex items-center gap-3">
          <IoDocumentTextOutline className="text-violet-500" /> My Assignments
        </h1>
        <p className="text-textSecondary text-sm mt-1">Submit your work and track your grades.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(n => <div key={n} className="h-28 animate-pulse rounded-2xl bg-neutral-200" />)}
        </div>
      ) : assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment, i) => {
            const status = STATUS[assignment.status] || STATUS.pending;
            const isSubmitted = ['submitted', 'graded'].includes(assignment.status);
            const file = selectedFile[assignment._id];
            return (
              <motion.div key={assignment._id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-5 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                    <IoDocumentTextOutline size={24} className="text-violet-500" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-textPrimary text-base">{assignment.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-textSecondary text-sm mb-2 line-clamp-2">{assignment.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-textSecondary">
                      <span className="flex items-center gap-1">
                        <IoTimeOutline size={13} />
                        Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No deadline'}
                      </span>
                      {assignment.grade != null && (
                        <span className="flex items-center gap-1 font-semibold text-emerald-600">
                          <IoCheckmarkCircle size={13} /> Grade: {assignment.grade}/100
                        </span>
                      )}
                    </div>
                    {assignment.feedback && (
                      <div className="mt-3 p-3 bg-neutral-50 rounded-xl text-xs text-textSecondary border border-neutral-100">
                        <strong className="text-textPrimary">Instructor feedback:</strong> {assignment.feedback}
                      </div>
                    )}
                  </div>

                  {/* Submit Area */}
                  {!isSubmitted && (
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <input
                        type="file"
                        ref={el => { if (el) fileRefs.current[assignment._id] = el; }}
                        className="hidden"
                        accept=".pdf,.zip,.doc,.docx,.png,.jpg"
                        onChange={e => handleFileChange(assignment._id, e.target.files[0])}
                      />
                      {file ? (
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 rounded-lg px-3 py-2 max-w-[160px]">
                          <IoAttachOutline size={13} />
                          <span className="truncate">{file.name}</span>
                          <button onClick={() => handleFileChange(assignment._id, null)} className="text-red-400 hover:text-red-600 ml-1">
                            <IoCloseCircle size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => fileRefs.current[assignment._id]?.click()}
                          className="flex items-center gap-1.5 text-xs text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-2 rounded-lg transition-colors font-semibold">
                          <IoCloudUploadOutline size={14} /> Choose File
                        </button>
                      )}
                      <button
                        onClick={() => handleSubmit(assignment._id)}
                        disabled={!file || submitting === assignment._id}
                        className="text-xs font-bold px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-40 transition-colors">
                        {submitting === assignment._id ? 'Uploading…' : 'Submit →'}
                      </button>
                    </div>
                  )}
                  {isSubmitted && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg shrink-0 self-start">
                      <IoCheckmarkCircle size={14} /> {assignment.status === 'graded' ? 'Graded' : 'Submitted'}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-3xl bg-violet-50 ring-1 ring-violet-100 flex items-center justify-center mb-6">
            <IoDocumentTextOutline size={48} className="text-violet-300" />
          </div>
          <h3 className="text-xl font-bold text-textPrimary mb-2">No assignments yet</h3>
          <p className="text-textSecondary text-sm max-w-sm">
            Assignments from your enrolled courses will appear here when instructors post them.
          </p>
        </div>
      )}
    </div>
  );
}
