'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineBriefcase, HiOutlineCurrencyDollar, HiCheckCircle } from 'react-icons/hi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProjectBoard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedPrice, setProposedPrice] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        if (res.data?.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!coverLetter) return toast.error('Please provide a cover letter.');
    setSubmitting(true);
    try {
      const res = await api.post(`/projects/${selectedProject._id}/apply`, {
        coverLetter,
        proposedPrice: Number(proposedPrice),
        estimatedDays: Number(estimatedDays),
      });
      if (res.data?.success) {
        toast.success(res.data.message);
        setSelectedProject(null);
        setCoverLetter('');
        setProposedPrice('');
        setEstimatedDays('');
      } else {
        toast.error(res.data?.message || 'Application failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred during application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-3">
          <HiOutlineBriefcase className="text-blue-600" />
          Freelance Projects
        </h1>
        <p className="mt-2 text-neutral-500 text-lg">Apply for real client projects and earn while you learn.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-64 animate-pulse rounded-2xl bg-neutral-200"></div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-neutral-200 hover:shadow-xl transition-all flex flex-col"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 line-clamp-2">{project.title}</h3>
              </div>
              <p className="text-sm text-neutral-600 line-clamp-3 mb-6 flex-1">
                {project.description}
              </p>
              <div className="flex items-center justify-between mt-auto border-t border-neutral-100 pt-4">
                <div className="flex items-center gap-2 text-neutral-900 font-bold">
                  <HiOutlineCurrencyDollar className="text-emerald-500 text-xl" />
                  ৳ {project.budget}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn-primary px-5 py-2 text-sm"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-neutral-200 bg-white py-20 text-center flex flex-col items-center">
          <div className="rounded-full bg-blue-50 p-6 mb-4">
            <HiOutlineBriefcase size={48} className="text-blue-500 opacity-80" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No open projects right now</h3>
          <p className="text-neutral-500 max-w-md mx-auto mb-8">
            Check back later for new freelance opportunities posted by our partners and clients.
          </p>
        </div>
      )}

      {/* Application Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Apply for Project</h2>
                <button onClick={() => setSelectedProject(null)} className="text-neutral-400 hover:text-neutral-700">✕</button>
              </div>

              <div className="mb-6 p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                <h3 className="font-bold text-lg text-neutral-900 mb-2">{selectedProject.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-md">Budget: ৳ {selectedProject.budget}</span>
                  <span className="text-neutral-600 bg-neutral-200 px-3 py-1 rounded-md">Deadline: {new Date(selectedProject.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <form onSubmit={handleApply} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Cover Letter</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Why are you the best fit for this project? Mention any relevant skills or past work."
                    className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Proposed Price (৳)</label>
                    <input
                      type="number"
                      required
                      placeholder={selectedProject.budget}
                      className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={proposedPrice}
                      onChange={(e) => setProposedPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Estimated Days</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 7"
                      className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={estimatedDays}
                      onChange={(e) => setEstimatedDays(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-neutral-100">
                  <button type="button" onClick={() => setSelectedProject(null)} className="px-5 py-2.5 font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="btn-primary px-8 py-2.5 flex items-center gap-2 rounded-xl text-md shadow-lg shadow-blue-500/20">
                    {submitting ? 'Submitting...' : <><HiCheckCircle size={20} /> Submit Application</>}
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
