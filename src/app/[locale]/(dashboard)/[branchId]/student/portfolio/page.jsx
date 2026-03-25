'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUserCircle, HiOutlineLink, HiOutlineBriefcase, HiOutlineCheck } from 'react-icons/hi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function PortfolioBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: '', // Comma separated string for UI simplicity
    username: '',
    github: '',
    linkedin: '',
    website: '',
    resumeUrl: '',
    isPublic: true,
  });

  useEffect(() => {
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
        }
      } catch (err) {
        console.error('Failed to fetch portfolio', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
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
      if (res.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.message || 'Failed to update portfolio');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving portfolio');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 animate-pulse text-neutral-500">Loading Portfolio Data...</div>;
  }

  return (
    <div className="py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-3">
          <HiOutlineUserCircle className="text-blue-600" />
          Portfolio Builder
        </h1>
        <p className="mt-2 text-neutral-500">Customize your public profile to showcase your skills and projects to potential clients.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Profile Information</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Public Username (slug)</label>
              <div className="flex rounded-xl shadow-sm border border-neutral-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <span className="inline-flex items-center px-4 bg-neutral-50 border-r border-neutral-300 text-neutral-500 text-sm">syict.com/portfolio/</span>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="flex-1 block w-full outline-none px-3 py-2.5 sm:text-sm" placeholder="e.g. tafsirchy" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Professional Bio</label>
              <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Tell clients about yourself, your experience, and what you do best..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Skills (Comma separated)</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="React, Node.js, Graphic Design, Figma..." />
            </div>
          </div>
        </div>

        {/* Social & Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4 flex items-center gap-2">
            <HiOutlineLink className="text-neutral-500" /> Links & Socials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">GitHub URL</label>
              <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://github.com/username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">LinkedIn URL</label>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://linkedin.com/in/username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Personal Website</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://mywebsite.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Resume PDF Link</label>
              <input type="url" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className="w-full rounded-xl border border-neutral-300 p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Google Drive or direct PDF link" />
            </div>
          </div>
        </div>

        {/* Projects Section Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
               <HiOutlineBriefcase size={32} />
             </div>
             <h3 className="font-bold text-lg text-neutral-900 mb-2">Showcase Your Projects</h3>
             <p className="text-neutral-500 text-sm mb-6 max-w-sm">Completed assignments scoring over 90% or successful freelance contracts can be added here automatically.</p>
             <button type="button" className="px-5 py-2 font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
               Add External Project Manually
             </button>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span className="text-sm font-medium text-neutral-700">Make Portfolio Public</span>
          </label>

          <button type="submit" disabled={saving} className="btn-primary px-8 py-3 flex items-center gap-2 rounded-xl text-md shadow-lg shadow-blue-500/20">
            {saving ? 'Saving...' : <><HiOutlineCheck size={20} /> Save Changes</>}
          </button>
        </div>

      </form>
    </div>
  );
}
