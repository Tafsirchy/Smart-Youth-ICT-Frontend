'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUserCircle, HiOutlineLink, HiOutlineBriefcase, 
  HiOutlineCheck, HiOutlinePlus, HiOutlinePencilAlt, HiOutlineTrash,
  HiOutlineX
} from 'react-icons/hi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function PortfolioBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    bio: '',
    skills: '', 
    username: '',
    github: '',
    linkedin: '',
    website: '',
    resumeUrl: '',
    isPublic: true,
  });

  // Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', projectUrl: '', imageUrl: '' });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await api.get('/portfolio/me');
      if (res.data?.success && res.data.data) {
        const p = res.data.data;
        setFormData({
          bio: p.bio || '',
          skills: p.skills ? p.skills.join(', ') : '',
          username: p.username || '',
          github: p.socialLinks?.github || '',
          linkedin: p.socialLinks?.linkedin || '',
          website: p.socialLinks?.website || '',
          resumeUrl: p.resumeUrl || '',
          isPublic: p.isPublic !== undefined ? p.isPublic : true,
        });
        setProjects(p.projects || []);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        socialLinks: {
          github: formData.github,
          linkedin: formData.linkedin,
          website: formData.website,
        }
      };

      const res = await api.put('/portfolio/me', payload);
      if (res.data?.success) toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving portfolio');
    } finally {
      setSaving(false);
    }
  };

  // --- Project Management ---

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({ 
        title: project.title, 
        description: project.description || '', 
        projectUrl: project.projectUrl || '',
        imageUrl: project.imageUrl || ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({ title: '', description: '', projectUrl: '', imageUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let res;
      if (editingProject) {
        // Update
        res = await api.put(`/portfolio/me/projects/${editingProject._id}`, projectForm);
      } else {
        // Create
        res = await api.post('/portfolio/me/projects', projectForm);
      }

      if (res.data?.success) {
        toast.success(res.data.message);
        setProjects(res.data.data.projects);
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to remove this project?')) return;
    try {
      const res = await api.delete(`/portfolio/me/projects/${id}`);
      if (res.data?.success) {
        toast.success(res.data.message);
        setProjects(res.data.data.projects);
      }
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return <div className="p-8 animate-pulse text-neutral-500">Loading Portfolio Data...</div>;
  }

  return (
    <div className="py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-3">
          <HiOutlineUserCircle className="text-blue-600" />
          Portfolio Builder
        </h1>
        <p className="mt-2 text-neutral-500">Customize your public profile to showcase your skills and projects to potential clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: BASIC INFO & SOCIALS */}
        <div className="lg:col-span-2 space-y-8">
           <form onSubmit={handleSave} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Profile Information</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Public Username (slug)</label>
                  <div className="flex rounded-xl shadow-sm border border-neutral-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <span className="inline-flex items-center px-4 bg-neutral-50 border-r border-neutral-300 text-neutral-500 text-sm">syict.com/p/</span>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="flex-1 block w-full outline-none px-3 py-2.5 sm:text-sm" placeholder="e.g. tafsirchy" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Professional Bio</label>
                  <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Tell clients about yourself..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Skills (Comma separated)</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="React, Node.js, Graphic Design..." />
                </div>
              </div>
            </div>

            {/* Social & Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4 flex items-center gap-2">
                <HiOutlineLink className="text-neutral-500" /> Links & Socials
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="GitHub URL" />
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="LinkedIn URL" />
                <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Personal Website" />
                <input type="url" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Resume PDF URL" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                <span className="text-sm font-medium text-neutral-700">Make Portfolio Public</span>
              </label>

              <button type="submit" disabled={saving} className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20">
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: PROJECTS LIST */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-neutral-900">Portfolio Projects</h2>
            <button 
              onClick={() => openModal()}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
              title="Add Project"
            >
              <HiOutlinePlus size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-neutral-900 line-clamp-1">{project.title}</h3>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(project)} className="text-blue-500 hover:text-blue-700"><HiOutlinePencilAlt size={18} /></button>
                      <button onClick={() => deleteProject(project._id)} className="text-red-500 hover:text-red-700"><HiOutlineTrash size={18} /></button>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{project.description}</p>
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline">
                      View Project ↗
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 border-2 border-dashed border-neutral-100 rounded-2xl text-center">
                <HiOutlineBriefcase className="mx-auto text-neutral-300 mb-2" size={32} />
                <p className="text-neutral-400 text-sm">No projects added yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PROJECT CRUD MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <h3 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-700"><HiOutlineX size={24} /></button>
              </div>

              <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Project Title*</label>
                  <input required value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. E-Commerce Website" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  <textarea rows={3} value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe what you built..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Project/Live URL</label>
                  <input type="url" value={projectForm.projectUrl} onChange={(e) => setProjectForm({...projectForm, projectUrl: e.target.value})} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Thumbnail Preview URL</label>
                  <input type="url" value={projectForm.imageUrl} onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Direct link to image" />
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 py-3 font-bold bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors">
                    {saving ? 'Saving...' : (editingProject ? 'Update' : 'Add Project')}
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

