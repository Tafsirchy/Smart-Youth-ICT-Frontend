'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  IoCheckmarkCircle, IoCloseCircle, IoTrashOutline,
  IoStar, IoChatbubblesOutline, IoRefreshOutline
} from 'react-icons/io5';

const STATUS_OPTS = ['pending', 'approved', 'rejected'];
const STATUS_COLORS = {
  pending:  'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};

const AVATAR_GRADS = [
  'from-pink-500 to-rose-500','from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-500','from-violet-500 to-purple-600',
  'from-amber-500 to-orange-500','from-cyan-500 to-blue-500',
];

export default function AdminTestimonialsPage() {
  const [items, setItems]       = useState([]);
  const [filter, setFilter]     = useState('pending');
  const [loading, setLoading]   = useState(true);
  const [acting, setActing]     = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials', { params: { status: filter, limit: 50 } });
      setItems(res.data?.data || []);
    } catch { toast.error('Failed to load testimonials.'); }
    finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleAction = async (id, action) => {
    setActing(id + action);
    try {
      if (action === 'delete') {
        await api.delete(`/testimonials/${id}`);
        toast.success('Testimonial deleted.');
      } else {
        await api.patch(`/testimonials/${id}/status`, { status: action });
        toast.success(`Testimonial ${action}.`);
      }
      setItems(prev => prev.filter(t => t._id !== id));
    } catch { toast.error('Action failed.'); }
    finally { setActing(null); }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-textPrimary flex items-center gap-3">
            <IoChatbubblesOutline className="text-amber-500" /> Testimonials
          </h1>
          <p className="text-textSecondary text-sm mt-1">Review and moderate student testimonials before they appear on the homepage.</p>
        </div>
        <button onClick={fetchItems} className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-textPrimary transition">
          <IoRefreshOutline size={16} /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {STATUS_OPTS.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
              filter === s ? 'bg-blue-600 text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}>{s}</button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1,2,3,4].map(n => <div key={n} className="h-40 animate-pulse rounded-2xl bg-neutral-200" />)}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((t, idx) => (
            <motion.div key={t._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
              className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-5">
              {/* Stars */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {[...Array(t.rating || 5)].map((_, i) => <IoStar key={i} size={14} className="text-amber-400" />)}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[t.status] || STATUS_COLORS.pending}`}>
                  {t.status || 'pending'}
                </span>
              </div>

              <p className="text-sm text-textSecondary italic leading-relaxed mb-4 line-clamp-3">
                &ldquo;{t.text || t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${AVATAR_GRADS[idx % AVATAR_GRADS.length]} flex items-center justify-center text-white text-xs font-extrabold shrink-0`}>
                  {t.name?.[0] || t.user?.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-textPrimary">{t.name || t.user?.name}</p>
                  <p className="text-xs text-textSecondary">{t.role || t.course?.title?.en || 'Student'}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-neutral-100">
                {t.status !== 'approved' && (
                  <button onClick={() => handleAction(t._id, 'approved')} disabled={acting === t._id + 'approved'}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition disabled:opacity-50">
                    <IoCheckmarkCircle size={14} /> Approve
                  </button>
                )}
                {t.status !== 'rejected' && (
                  <button onClick={() => handleAction(t._id, 'rejected')} disabled={acting === t._id + 'rejected'}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-100 transition disabled:opacity-50">
                    <IoCloseCircle size={14} /> Reject
                  </button>
                )}
                <button onClick={() => handleAction(t._id, 'delete')} disabled={acting === t._id + 'delete'}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition disabled:opacity-50">
                  <IoTrashOutline size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 ring-1 ring-amber-100 flex items-center justify-center mb-5">
            <IoChatbubblesOutline size={40} className="text-amber-300" />
          </div>
          <h3 className="text-lg font-bold text-textPrimary mb-1">No {filter} testimonials</h3>
          <p className="text-textSecondary text-sm">Switch filter to see other statuses.</p>
        </div>
      )}
    </div>
  );
}
