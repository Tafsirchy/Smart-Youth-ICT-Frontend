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
 HiOutlineEyeSlash,
 HiOutlineXMark
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

const DEFAULT_SETTINGS = {
  maintenanceMode: false,
  registrationOpen: true,
};

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [pendingKeys, setPendingKeys] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: '', category: 'getting-started', content: '', isPublished: false });
  const [newBroadcast, setNewBroadcast] = useState({ text: '', type: 'general' });
  const [editingBroadcastId, setEditingBroadcastId] = useState(null);

  useEffect(() => {
    fetchSettings();
    fetchArticles();

    const handleSync = (e) => {
      if (typeof e.detail?.maintenanceMode === 'boolean') {
        setSettings(prev => ({ ...prev, maintenanceMode: e.detail.maintenanceMode }));
      }
    };
    window.addEventListener('maintenanceModeChanged', handleSync);
    return () => window.removeEventListener('maintenanceModeChanged', handleSync);
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/super/settings');
      if (res.data?.success && Array.isArray(res.data.data)) {
        const map = {};
        res.data.data.forEach(item => { map[item.key] = item.value; });
        setSettings(prev => ({ ...prev, ...map }));
      }
    } catch (err) {
      console.error('[Fetch Settings Error]', err);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await api.get('/super/help-center');
      if (res.data?.success) setArticles(res.data.data);
    } catch (err) {
      console.error('[Fetch Articles Error]', err);
    }
  };

  const toggleSetting = async (key) => {
    const currentVal = Boolean(settings[key]);
    const nextVal = !currentVal;

    // Instant 0ms Optimistic UI update
    setSettings(prev => ({ ...prev, [key]: nextVal }));
    setPendingKeys(prev => ({ ...prev, [key]: true }));

    if (key === 'maintenanceMode' && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('maintenanceModeChanged', { detail: { maintenanceMode: nextVal } }));
    }

    try {
      const res = await api.put('/super/settings', { key, value: nextVal });
      if (res.data?.success) {
        const label = key === 'maintenanceMode' ? 'Maintenance Mode' : 'New Registrations';
        toast.success(`${label} ${nextVal ? 'Enabled' : 'Disabled'}`);
      }
    } catch (err) {
      // Revert on error
      setSettings(prev => ({ ...prev, [key]: currentVal }));
      if (key === 'maintenanceMode' && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('maintenanceModeChanged', { detail: { maintenanceMode: currentVal } }));
      }
      toast.error('Failed to update setting');
    } finally {
      setPendingKeys(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

 const updateGlobalMessages = async (newMessages) => {
 try {
 await api.put('/super/settings', { key: 'globalMessage', value: newMessages });
 setSettings({ ...settings, globalMessage: newMessages });
 toast.success('Broadcast updated');
 } catch (err) {
 toast.error('Failed to update broadcast');
 }
 };

 const addBroadcast = () => {
 if (!newBroadcast.text.trim()) return;
 const current = Array.isArray(settings.globalMessage) ? settings.globalMessage : (settings.globalMessage ? [{ id: '1', text: settings.globalMessage, type: 'general' }] : []);
 
 if (editingBroadcastId) {
 updateGlobalMessages(current.map(m => m.id === editingBroadcastId ? { ...m, text: newBroadcast.text, type: newBroadcast.type } : m));
 setEditingBroadcastId(null);
 } else {
 const msg = { id: Date.now().toString(), text: newBroadcast.text, type: newBroadcast.type };
 updateGlobalMessages([...current, msg]);
 }
 setNewBroadcast({ text: '', type: 'general' });
 };

 const removeBroadcast = (id) => {
 const current = Array.isArray(settings.globalMessage) ? settings.globalMessage : [];
 updateGlobalMessages(current.filter(m => m.id !== id));
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
 <div className="space-y-6 max-w-7xl mx-auto pb-10">
 {/* Header */}
 <header>
 <motion.h1 
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 flex items-center gap-3"
 >
 <span className="p-2 bg-rose-500 text-white shadow-lg shadow-rose-500/20 rounded-lg">
 <HiOutlineCog6Tooth size={32} />
 </span>
 System Core
 </motion.h1>
 </header>

 <motion.div 
 variants={container}
 initial="hidden"
 animate="show"
 className="grid grid-cols-1 lg:grid-cols-3 gap-3"
 >
 {/* Left Column: Toggles & Flags */}
 <div className="lg:col-span-2 space-y-5">
 <motion.div variants={item} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <HiOutlineShieldCheck className="text-rose-500" size={24} /> Security & Access Controls
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Global Policy
              </span>
            </div>

            <div className="space-y-3">
              {[
                { 
                  key: 'maintenanceMode', 
                  label: 'Maintenance Mode', 
                  desc: 'Suspend public access & student dashboards for platform updates. Super Admins retain full access.',
                  activeColor: 'bg-rose-500',
                  badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
                },
                { 
                  key: 'registrationOpen', 
                  label: 'New Student Registrations', 
                  desc: 'Allow new students to register accounts globally via email and Google OAuth.',
                  activeColor: 'bg-emerald-600',
                  badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
                },
              ].map((s) => {
                const isActive = Boolean(settings[s.key]);
                const isPending = Boolean(pendingKeys[s.key]);

                return (
                  <div 
                    key={s.key} 
                    onClick={() => toggleSetting(s.key)}
                    className="flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl transition-all cursor-pointer group select-none"
                  >
                    <div className="max-w-md pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-black text-slate-900 text-sm">{s.label}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                          isActive ? s.badgeColor : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}>
                          {isActive ? 'Active' : 'Disabled'}
                        </span>
                        {isPending && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                    </div>

                    {/* Instant 1-Click iOS / Linear Pill Switch */}
                    <button 
                      type="button"
                      role="switch"
                      aria-checked={isActive}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSetting(s.key);
                      }}
                      className={`w-[52px] h-[28px] rounded-full p-1 transition-colors duration-200 ease-out focus:outline-none flex items-center shrink-0 cursor-pointer ${
                        isActive ? s.activeColor : 'bg-slate-300'
                      }`}
                    >
                      <div 
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-out ${
                          isActive ? 'translate-x-[24px]' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

 <motion.div variants={item} className="bg-slate-900 p-6 -[2.5rem] shadow-2xl relative overflow-hidden flex flex-col rounded-lg">
 <div className="absolute top-0 right-0 p-6 opacity-5 text-white pointer-events-none">
 <HiOutlineGlobeAlt size={160} />
 </div>
 <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 relative z-10 shrink-0">
 <HiOutlineEnvelope className="text-rose-400" /> Global Communication
 </h3>
 
 {/* Ongoing Broadcasts */}
 <div className="relative z-10 mb-6 flex-1 flex flex-col min-h-0">
 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-[1.4] mb-2 block">Ongoing Broadcasts</label>
 <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1 flex-1">
 {(() => {
 const msgs = Array.isArray(settings.globalMessage) ? settings.globalMessage : (settings.globalMessage ? [{ id: '1', text: settings.globalMessage, type: 'general' }] : []);
 if (msgs.length === 0) return <p className="text-xs font-medium text-slate-500 italic py-2">No active broadcasts.</p>;
 return msgs.map((msg) => (
 <div key={msg.id} className="bg-slate-800/80 border border-slate-700 p-3 flex items-start gap-3 group rounded-lg">
 <span className="text-xl shrink-0 mt-0.5">
 {msg.type === 'hiring' ? '💼' : msg.type === 'holiday' ? '🎉' : msg.type === 'warning' ? '⚠️' : '📢'}
 </span>
 <div className="flex-1 min-w-0">
 <p className="text-white text-sm font-medium leading-snug">{msg.text}</p>
 <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">{msg.type}</p>
 </div>
 <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
 <button 
 onClick={() => {
 setEditingBroadcastId(msg.id);
 setNewBroadcast({ text: msg.text, type: msg.type });
 }}
 className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors shrink-0"
 >
 <HiOutlinePencilSquare size={16} />
 </button>
 <button onClick={() => removeBroadcast(msg.id)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0">
 <HiOutlineTrash size={16} />
 </button>
 </div>
 </div>
 ));
 })()}
 </div>
 </div>

 {/* Add New Broadcast */}
 <div className="space-y-2 relative z-10 shrink-0 bg-slate-800/50 p-4 border border-slate-700/50 mt-auto rounded-lg">
 <div className="flex justify-between items-center mb-1">
 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-[1.4]">{editingBroadcastId ? 'Edit Message' : 'Add New Message'}</label>
 {editingBroadcastId && (
 <button onClick={() => { setEditingBroadcastId(null); setNewBroadcast({ text: '', type: 'general' }); }} className="text-[10px] text-rose-500 hover:text-rose-400 font-bold uppercase tracking-widest">Cancel Edit</button>
 )}
 </div>
 <div className="flex gap-2">
 <select 
 value={newBroadcast.type}
 onChange={e => setNewBroadcast({...newBroadcast, type: e.target.value})}
 className="bg-slate-900 border border-slate-700 px-3 text-white text-xs font-medium outline-none focus:border-rose-500 w-28 shrink-0"
 >
 <option value="general">General</option>
 <option value="hiring">Hiring</option>
 <option value="holiday">Holiday</option>
 <option value="warning">Warning</option>
 </select>
 <input 
 type="text"
 className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2.5 text-white text-sm font-medium focus:ring-2 focus:ring-rose-500 transition-all outline-none rounded-md"
 placeholder="Type announcement here..."
 value={newBroadcast.text}
 onChange={e => setNewBroadcast({...newBroadcast, text: e.target.value})}
 onKeyDown={e => e.key === 'Enter' && addBroadcast()}
 />
 </div>
 <button 
 onClick={addBroadcast}
 disabled={!newBroadcast.text.trim()}
 className="w-full mt-2 bg-rose-600 text-white px-5 py-2.5 font-black text-xs uppercase tracking-widest leading-[1.4] hover:bg-rose-700 disabled:opacity-50 disabled:hover:bg-rose-600 transition-all shadow-lg shadow-rose-900/40 rounded-md"
 >
 {editingBroadcastId ? 'Save Changes' : 'Broadcast'}
 </button>
 </div>
 </motion.div>
 </div>

 {/* Right Column: Help Center Manager */}
 <motion.div variants={item} className="bg-white -[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
 <div className="p-6 border-b border-slate-50 flex items-center justify-between">
 <h3 className="text-xl font-black text-slate-900 leading-[1.4]">Help Center</h3>
 <button 
 onClick={() => {
 setEditingArticle(null);
 setArticleForm({ title: '', category: 'getting-started', content: '', isPublished: false });
 setShowArticleModal(true);
 }}
 className="p-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
 >
 <HiOutlinePlus size={20} />
 </button>
 </div>
 <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
 {articles.map((art) => (
 <div key={art._id} className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100/50 flex items-center justify-between group transition-all rounded-lg">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-rose-500 transition-all rounded-lg">
 {art.isPublished ? <HiOutlineEye className="text-emerald-500" /> : <HiOutlineEyeSlash />}
 </div>
 <div>
 <p className="font-bold text-slate-700 text-sm line-clamp-1 leading-[1.4]">{art.title}</p>
 <p className="text-[10px] font-black text-slate-400 uppercase leading-[1.4]">{art.category}</p>
 </div>
 </div>
 <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
 <button 
 onClick={() => {
 setEditingArticle(art);
 setArticleForm({ title: art.title, category: art.category, content: art.content, isPublished: art.isPublished });
 setShowArticleModal(true);
 }}
 className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-slate-900 active:bg-slate-100 transition-all"
 >
 <HiOutlinePencilSquare size={20} />
 </button>
 <button onClick={() => deleteArticle(art._id)} className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-red-500 active:bg-red-50 transition-all">
 <HiOutlineTrash size={20} />
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
 <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-sm">
 <motion.div 
 initial={{ scale: 0.9, opacity: 0, y: 50 }}
 animate={{ scale: 1, opacity: 1, y: 0 }}
 exit={{ scale: 0.9, opacity: 0, y: 50 }}
 className="bg-white w-full max-w-2xl -[2.5rem] sm:-[2.5rem] shadow-2xl p-6 overflow-hidden relative z-[10000] max-h-[90vh] overflow-y-auto rounded-lg"
 >
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-2xl font-black text-slate-900">{editingArticle ? 'Update Logic' : 'Establish Article'}</h2>
 <button 
 type="button" 
 onClick={() => setShowArticleModal(false)}
 className="w-11 h-11 flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 active:bg-slate-300 transition-all"
 aria-label="Close modal"
 >
 <HiOutlineXMark size={20} />
 </button>
 </div>
 <form onSubmit={handleArticleSubmit} className="space-y-4">
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-[1.4]">Title</label>
 <input required value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} className="w-full bg-slate-50 border-none p-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20 leading-[1.4]" />
 </div>
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-[1.4]">Category</label>
 <select value={articleForm.category} onChange={e => setArticleForm({...articleForm, category: e.target.value})} className="w-full bg-slate-50 border-none p-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20 leading-[1.4]">
 <option value="getting-started">Getting Started</option>
 <option value="billing">Billing & Finance</option>
 <option value="courses">Course Management</option>
 <option value="technical">Technical Support</option>
 <option value="other">Other</option>
 </select>
 </div>
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-[1.4]">Content</label>
 <textarea required value={articleForm.content} onChange={e => setArticleForm({...articleForm, content: e.target.value})} className="w-full bg-slate-50 border-none p-3 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-rose-500/20 min-h-[150px] leading-[1.6]" />
 </div>
 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
 <span className="text-xs font-black text-slate-800 uppercase tracking-widest leading-[1.4]">Publish Immediately</span>
 <button 
 type="button"
 onClick={() => setArticleForm({...articleForm, isPublished: !articleForm.isPublished})}
 className={`w-12 h-6 relative ${articleForm.isPublished ? 'bg-emerald-500' : 'bg-slate-300'}`}
 >
 <div className={`absolute top-1 left-1 w-4 h-4 bg-white transition-all ${articleForm.isPublished ? 'translate-x-6' : ''}`} />
 </button>
 </div>
 <div className="pt-2 flex gap-3">
 <button type="submit" className="flex-1 bg-rose-600 text-white py-3 font-black text-xs uppercase tracking-widest leading-[1.4] hover:bg-rose-700 transition-all rounded-md">
 {editingArticle ? 'Commit Changes' : 'Initialize Article'}
 </button>
 <button type="button" onClick={() => setShowArticleModal(false)} className="px-5 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest leading-[1.4]">Cancel</button>
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
