'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineCog6Tooth, 
  HiOutlineShieldCheck, 
  HiOutlineGlobeAlt, 
  HiOutlineEnvelope,
  HiOutlineBookOpen,
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCheckBadge,
  HiOutlineEye,
  HiOutlineEyeSlash
} from 'react-icons/hi2';
import { AnimatePresence } from 'framer-motion';
import Portal from '@/components/ui/Portal';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: '', category: 'getting-started', content: '', isPublished: false });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [setRes, artRes] = await Promise.all([
        api.get('/super/settings'),
        api.get('/super/help-center')
      ]);
      if (setRes.data?.success) setSettings(setRes.data.data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}));
      if (artRes.data?.success) setArticles(artRes.data.data);
    } catch (err) {
      toast.error('Session data partially loaded from cache');
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = async (key) => {
    const newVal = !settings[key];
    setSettings({ ...settings, [key]: newVal });
    try {
      await api.put('/super/settings', { key, value: newVal });
      toast.success(`${key} updated`);
    } catch (err) {
      toast.error('Failed to sync setting');
    }
  };

  const saveBroadcast = async () => {
    const msg = settings.globalMessage;
    try {
      await api.put('/super/settings', { key: 'globalMessage', value: msg });
      toast.success('Broadcast message published');
    } catch (err) {
      toast.error('Failed to update broadcast');
    }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await api.put(`/super/help-center/${editingArticle._id}`, articleForm);
        toast.success('Article updated');
      } else {
        await api.post('/super/help-center', articleForm);
        toast.success('New article established');
      }
      setShowArticleModal(false);
      setEditingArticle(null);
      setArticleForm({ title: '', category: 'getting-started', content: '', isPublished: false });
      fetchData();
    } catch (err) {
      toast.error('Failed to process article');
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm('Are you sure? This action is permanent.')) return;
    try {
      await api.delete(`/super/help-center/${id}`);
      toast.success('Article removed');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <header>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4"
          >
            <span className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-500/20">
              <HiOutlineCog6Tooth size={32} />
            </span>
            System Core
          </motion.h1>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Toggles & Flags */}
        <div className="lg:col-span-2 space-y-8">
           <motion.div variants={item} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                <HiOutlineShieldCheck className="text-rose-500" /> Security & Access
              </h3>
              <div className="space-y-6">
                {[
                  { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Take the entire platform offline for updates.' },
                  { key: 'registrationOpen', label: 'New Registrations', desc: 'Allow new students to create accounts globally.' },
                ].map((s) => (
                  <div key={s.key} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50">
                    <div className="max-w-md">
                       <p className="font-black text-slate-800 text-sm tracking-tight">{s.label}</p>
                       <p className="text-xs text-slate-400 font-medium">{s.desc}</p>
                    </div>
                    <button 
                      onClick={() => toggleSetting(s.key)}
                      className={`w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner ${settings[s.key] ? 'bg-rose-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${settings[s.key] ? 'translate-x-6' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
           </motion.div>

           <motion.div variants={item} className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 text-white">
                 <HiOutlineGlobeAlt size={160} />
              </div>
              <h3 className="text-xl font-black text-white mb-8 flex items-center gap-2 relative z-10">
                <HiOutlineEnvelope className="text-rose-400" /> Global Communication
              </h3>
              <div className="space-y-4 relative z-10">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Broadcast Message</label>
                 <textarea 
                   className="w-full bg-slate-800 border-none rounded-2xl p-6 text-white font-medium focus:ring-2 focus:ring-rose-500 transition-all outline-none min-h-[120px]"
                   placeholder="Announce something to all users..."
                   value={settings.globalMessage || ''}
                   onChange={e => setSettings({...settings, globalMessage: e.target.value})}
                 />
                 <button 
                  onClick={saveBroadcast}
                  className="bg-rose-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/40"
                 >
                   Broadcast Now
                 </button>
              </div>
           </motion.div>
        </div>

        {/* Right Column: Help Center Manager */}
        <motion.div variants={item} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
           <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Help Center</h3>
              <button 
                onClick={() => {
                  setEditingArticle(null);
                  setArticleForm({ title: '', category: 'getting-started', content: '', isPublished: false });
                  setShowArticleModal(true);
                }}
                className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
              >
                <HiOutlinePlus size={20} />
              </button>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {articles.map((art) => (
                <div key={art._id} className="p-6 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-slate-100/50 flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-rose-500 transition-all">
                        {art.isPublished ? <HiOutlineEye className="text-emerald-500" /> : <HiOutlineEyeSlash />}
                     </div>
                     <div>
                        <p className="font-bold text-slate-700 text-sm line-clamp-1">{art.title}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{art.category}</p>
                     </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => {
                        setEditingArticle(art);
                        setArticleForm({ title: art.title, category: art.category, content: art.content, isPublished: art.isPublished });
                        setShowArticleModal(true);
                      }}
                      className="p-2 text-slate-400 hover:text-slate-900"
                    >
                      <HiOutlinePencilSquare size={18} />
                    </button>
                    <button onClick={() => deleteArticle(art._id)} className="p-2 text-slate-400 hover:text-red-500">
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
           </div>
        </motion.div>
      </motion.div>

      {/* Article Modal */}
      <Portal>
        <AnimatePresence>
          {showArticleModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 overflow-hidden relative z-[10000]"
              >
              <h2 className="text-2xl font-black text-slate-900 mb-8">{editingArticle ? 'Update Logic' : 'Establish Article'}</h2>
              <form onSubmit={handleArticleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</label>
                  <input required value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select value={articleForm.category} onChange={e => setArticleForm({...articleForm, category: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20">
                    <option value="getting-started">Getting Started</option>
                    <option value="billing">Billing & Finance</option>
                    <option value="courses">Course Management</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Content</label>
                  <textarea required value={articleForm.content} onChange={e => setArticleForm({...articleForm, content: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-4 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20 min-h-[150px]" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                   <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Publish Immediately</span>
                   <button 
                    type="button"
                    onClick={() => setArticleForm({...articleForm, isPublished: !articleForm.isPublished})}
                    className={`w-12 h-6 rounded-full relative ${articleForm.isPublished ? 'bg-emerald-500' : 'bg-slate-300'}`}
                   >
                     <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${articleForm.isPublished ? 'translate-x-6' : ''}`} />
                   </button>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" className="flex-1 bg-rose-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all">
                    {editingArticle ? 'Commit Changes' : 'Initialize Article'}
                  </button>
                  <button type="button" onClick={() => setShowArticleModal(false)} className="px-8 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
