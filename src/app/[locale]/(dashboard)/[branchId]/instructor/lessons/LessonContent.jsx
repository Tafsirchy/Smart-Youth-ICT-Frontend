'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Portal from '@/components/ui/Portal';
import { 
  HiOutlineRectangleStack, HiOutlinePlus, HiOutlinePencilSquare, 
  HiOutlineTrash, HiOutlineClock,
  HiOutlineXMark, HiChevronLeft
} from 'react-icons/hi2'; // Switched to hi2
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function LessonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  
  const [form, setForm] = useState({ title: '', duration: '', isFree: false, topics: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCourses();
    if (courseId) fetchLessons(courseId);
    else setLoading(false);
  }, [courseId]);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/instructor/courses');
      if (res.data?.success) setCourses(res.data.data);
    } catch (err) {
      console.error('Fetch courses error', err);
    }
  };

  const fetchLessons = async (cId) => {
    setLoading(true);
    try {
      const res = await api.get(`/lessons/course/${cId}`);
      if (res.data?.success) setLessons(res.data.data);
    } catch (err) {
      console.error('Fetch lessons error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingLesson(null);
    setForm({ title: '', duration: '', isFree: false, topics: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (lesson) => {
    setEditingLesson(lesson);
    setForm({ 
      title: lesson.title, 
      duration: lesson.duration || '', 
      isFree: lesson.isFree, 
      topics: lesson.topics?.join(', ') || '' 
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { 
        ...form, 
        course: courseId,
        topics: form.topics.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingLesson) {
        await api.put(`/lessons/${editingLesson._id}`, payload);
        toast.success('Lesson updated!');
      } else {
        await api.post('/lessons', payload);
        toast.success('Lesson created!');
      }
      setShowModal(false);
      fetchLessons(courseId);
    } catch (err) {
      toast.error('Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    try {
      await api.delete(`/lessons/${lId}`);
      toast.success('Lesson deleted');
      fetchLessons(courseId);
    } catch (err) {
      toast.error('Failed to delete lesson');
    }
  };

  if (!courseId) {
    return (
      <div className="py-8 max-w-4xl">
         <h1 className="text-3xl font-black text-neutral-900 mb-2">Select a Course</h1>
         <p className="text-neutral-500 mb-8">Choose a course to begin managing its curriculum items.</p>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map(course => (
              <button 
                key={course._id}
                onClick={() => router.push(`?courseId=${course._id}`)}
                className="bg-white p-6 rounded-[32px] border border-neutral-100 text-left hover:border-blue-500 transition-all flex items-center justify-between group shadow-sm"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                       <HiOutlineRectangleStack size={24} />
                    </div>
                    <div>
                       <p className="font-bold text-neutral-900">{course.title?.en || course.title}</p>
                       <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{course.category}</p>
                    </div>
                 </div>
                 <HiChevronLeft className="rotate-180 text-neutral-300 group-hover:text-blue-600 transition-all" size={24} />
              </button>
            ))}
         </div>
      </div>
    );
  }

  const selectedCourse = courses.find(c => c._id === courseId);

  return (
    <div className="py-8 max-w-6xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button onClick={() => router.push('/instructor/lessons')} className="flex items-center gap-2 text-neutral-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 transition-colors">
             <HiChevronLeft size={18} /> Switch Course
          </button>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Curriculum Builder</h1>
          <p className="text-sm text-neutral-500 mt-1">Managing: <span className="text-blue-600 font-bold">{selectedCourse?.title?.en || selectedCourse?.title}</span></p>
        </div>
        
        <button 
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <HiOutlinePlus size={20} /> Add New Lesson
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100">
                     <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Lesson Title</th>
                     <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Type</th>
                     <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Duration</th>
                     <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Actions</th>
               </tr>
               </thead>
               <tbody className="divide-y divide-neutral-50">
                  {loading ? (
                    [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="px-8 py-8 bg-neutral-50/50" /></tr>)
                  ) : lessons.length > 0 ? (
                    lessons.map((lesson, i) => (
                      <motion.tr 
                        key={lesson._id}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                        className="hover:bg-neutral-50/50 transition-colors group"
                      >
                         <td className="px-8 py-6">
                            <p className="font-bold text-neutral-900 text-sm">{lesson.title}</p>
                            <p className="text-[10px] text-neutral-400 font-bold truncate max-w-xs">{lesson.topics?.join(' • ')}</p>
                         </td>
                         <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                               lesson.isFree ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                               {lesson.isFree ? 'Free Preview' : 'Premium'}
                            </span>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
                               <HiOutlineClock className="text-neutral-300" />
                               {lesson.duration || 'N/A'}
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => handleOpenEdit(lesson)} className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                  <HiOutlinePencilSquare size={20} />
                               </button>
                               <button onClick={() => handleDelete(lesson._id)} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                  <HiOutlineTrash size={20} />
                               </button>
                            </div>
                         </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                       <td colSpan={4} className="px-8 py-20 text-center">
                          <p className="text-neutral-400 font-medium italic">No lessons created yet. Tap "Add New Lesson" above.</p>
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      <Portal>
         <AnimatePresence>
            {showModal && (
               <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setShowModal(false)}
                 className="absolute inset-0"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 30 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 30 }}
                 className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden z-[10000]"
               >
                  <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-neutral-400 hover:text-neutral-900 transition-colors">
                     <HiOutlineXMark size={28} />
                  </button>

                  <h2 className="text-2xl font-black text-neutral-900 mb-2">
                    {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
                  </h2>
                  <p className="text-sm text-neutral-500 mb-8">Maintain curriculum high-standards with clear titles and durations.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Lesson Title</label>
                        <input 
                           required className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                           placeholder="e.g. 01. Introduction to Next.js"
                           value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                        />
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Duration</label>
                           <input 
                              className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                              placeholder="e.g. 15 mins"
                              value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})}
                           />
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-center px-4">
                           <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Visibility</label>
                           <div className="flex items-center gap-2">
                             <input 
                                type="checkbox" id="isFree"
                                className="w-5 h-5 rounded-lg border-neutral-300 text-blue-600 focus:ring-blue-500"
                                checked={form.isFree} onChange={(e) => setForm({...form, isFree: e.target.checked})}
                             />
                             <label htmlFor="isFree" className="text-sm font-bold text-neutral-700">Free Preview</label>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[10px) font-black text-neutral-400 uppercase tracking-widest ml-1">Topics Covered (Comma separated)</label>
                        <textarea 
                           className="w-full bg-neutral-50 rounded-2xl border-none px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none resize-none" 
                           placeholder="Next.js Basics, Server Components, Hydration..."
                           rows={3}
                           value={form.topics} onChange={(e) => setForm({...form, topics: e.target.value})}
                        />
                     </div>

                     <button 
                        type="submit" disabled={saving}
                        className="w-full py-5 bg-blue-600 text-white rounded-[32px] font-extrabold text-lg shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50"
                     >
                        {saving ? 'Processing...' : (editingLesson ? 'Update Lesson' : 'Create Lesson Content')}
                     </button>
                  </form>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
