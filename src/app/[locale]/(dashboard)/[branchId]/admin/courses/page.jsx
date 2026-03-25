'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoBookOutline, IoSearch, IoCheckmarkCircle, IoCloseCircle,
  IoTimeOutline, IoAddOutline, IoPencilOutline
} from 'react-icons/io5';

export default function AdminCoursesPage() {
  const [courses, setCourses]   = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]         = useState({ title: '', description: '', price: '', category: '', thumbnail: '' });
  const [submitting, setSubmitting] = useState(false);
  const limit = 12;

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      // Admin can also see unpublished courses — we fetch all with a bigger limit
      const res = await api.get('/courses', { params: { page, limit: 100 } });
      setCourses(res.data.data || []);
      setTotal(res.data.count || 0);
    } catch {
      toast.error('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = {
        ...form,
        title: { en: form.title, bn: form.title },
        price: Number(form.price),
      };
      await api.post('/courses', body);
      toast.success('Course created successfully!');
      setShowModal(false);
      setForm({ title: '', description: '', price: '', category: '', thumbnail: '' });
      fetchCourses();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create course.');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = search
    ? courses.filter(c => (c.title?.en || c.title || '').toLowerCase().includes(search.toLowerCase()))
    : courses;

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">All Courses</h1>
          <p className="text-textSecondary text-sm mt-1">{total} total courses on platform</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 btn-primary px-5 py-2.5 text-sm rounded-xl"
        >
          <IoAddOutline size={18} /> New Course
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
        <input
          type="text"
          placeholder="Search courses…"
          className="input pl-10 max-w-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-neutral-200 rounded-2xl h-48"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <IoBookOutline size={40} className="mx-auto mb-3 opacity-30" />
          <p>No courses found. Create one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(course => (
            <div key={course._id} className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title?.en} className="w-full h-36 object-cover" />
              ) : (
                <div className="w-full h-36 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <IoBookOutline size={40} className="text-blue-300" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-neutral-900 text-sm leading-tight line-clamp-2">
                    {course.title?.en || course.title}
                  </h3>
                  <span className={`shrink-0 text-xs px-2 py-1 rounded-full font-semibold ${
                    course.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {course.isPublished ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mb-3 capitalize">{course.category || 'Uncategorized'}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600 text-sm">৳{course.price?.toLocaleString() || '—'}</span>
                  <div className="flex gap-2">
                    <button className="text-xs text-neutral-500 hover:text-neutral-700 flex items-center gap-1 border border-neutral-200 rounded-lg px-2.5 py-1.5 hover:bg-neutral-50">
                      <IoPencilOutline size={13} /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Course Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Create New Course</h2>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-neutral-700">
                <IoCloseCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Course Title (English)</label>
                <input required className="input w-full" placeholder="e.g. Complete Web Development" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Price (৳)</label>
                  <input required type="number" className="input w-full" placeholder="5000" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                  <select className="input w-full" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">Select…</option>
                    <option value="web-development">Web Development</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="ai">AI & Automation</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                <textarea rows={3} className="input w-full resize-none" placeholder="Brief summary…" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Thumbnail URL (optional)</label>
                <input className="input w-full" placeholder="https://…" value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-medium disabled:opacity-50">
                  {submitting ? 'Creating…' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
