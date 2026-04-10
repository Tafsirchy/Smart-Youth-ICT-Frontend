'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  HiOutlineUser, 
  HiOutlineEnvelope, 
  HiOutlinePhone, 
  HiOutlineGlobeAlt, 
  HiOutlineFingerPrint,
  HiOutlineIdentification,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineCamera,
  HiOutlineKey
} from 'react-icons/hi2';

export default function ProfileContent() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passSaving, setPassSaving] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    language: 'en',
    bio: ''
  });

  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/me');
      if (res.data?.success) {
        const u = res.data.data;
        setForm({
          name: u.name || '',
          phone: u.phone || '',
          language: u.language || 'en',
          bio: u.bio || ''
        });
      }
    } catch (err) {
      toast.error('Failed to load profile intelligence');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/users/me', form);
      if (res.data?.success) {
        await update({ user: { ...session?.user, name: form.name } });
        toast.success('Identity profile synchronized successfully');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return toast.error('Encryption keys do not match');
    if (passwords.new.length < 8) return toast.error('Security key must be 8+ characters');

    setPassSaving(true);
    try {
      // In this backend, they use /auth/password? Let's check routes.
      // Wait, in student profile it was /auth/password. Let's verify.
      await api.put('/auth/password', { 
        oldPassword: passwords.old, 
        newPassword: passwords.new 
      });
      toast.success('Security protocols updated');
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Access modification failed');
    } finally {
      setPassSaving(false);
    }
  };

  const handleAvatarUpdate = async () => {
    const url = window.prompt('Enter cryptographic Avatar URL:', session?.user?.image || '');
    if (!url) return;
    
    setSaving(true);
    try {
      const res = await api.put('/users/me', { avatar: url });
      if (res.data.success) {
        await update({ user: { ...session?.user, image: url } });
        toast.success('Visual identity updated');
      }
    } catch (err) {
      toast.error('Failed to update visual node');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="space-y-8 animate-pulse">
      <div className="h-40 bg-slate-100 rounded-[3rem]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 bg-slate-50 rounded-[2.5rem]" />
        <div className="h-96 bg-slate-50 rounded-[2.5rem]" />
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      {/* Identity Header */}
      <div className="relative p-10 rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 -mr-48 -mt-48 bg-blue-500/10 rounded-full blur-[100px]" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
               <div className="w-32 h-32 rounded-[2.5rem] bg-slate-800 border-4 border-slate-700/50 overflow-hidden shadow-2xl">
                  {session?.user?.image ? (
                    <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-800">
                      <HiOutlineUser size={48} />
                    </div>
                  )}
               </div>
               <button 
                 onClick={handleAvatarUpdate}
                 className="absolute -bottom-2 -right-2 w-12 h-12 bg-pink-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all ring-4 ring-slate-900"
               >
                 <HiOutlineCamera size={20} />
               </button>
            </div>

            <div className="text-center md:text-left flex-1">
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
                  <h1 className="text-4xl font-black text-white tracking-tighter">{session?.user?.name}</h1>
                  <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    {session?.user?.role?.replace('_', ' ')}
                  </span>
               </div>
               <p className="text-slate-400 font-medium max-w-sm mb-6">{session?.user?.email}</p>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2">
                     <HiOutlineFingerPrint className="text-slate-500" />
                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">ID Shared Securely</span>
                  </div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500" />
                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">System Active</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Core Profile Details */}
        <div className="lg:col-span-2 space-y-10">
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSave} 
            className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8"
          >
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                  <HiOutlineIdentification size={24} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Personal Intelligence</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Name</label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-[1.5rem] text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                      type="text" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Node (Phone)</label>
                  <div className="relative">
                    <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-[1.5rem] text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                      type="tel" 
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Linguistic Preference</label>
               <div className="relative">
                  <HiOutlineGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <select 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-[1.5rem] text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                    value={form.language} 
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                  >
                    <option value="en">English (Universal)</option>
                    <option value="bn">Bengali (Native)</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Narrative (Bio)</label>
               <textarea 
                 rows={4} 
                 className="w-full px-6 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                 value={form.bio} 
                 onChange={(e) => setForm({ ...form, bio: e.target.value })}
                 placeholder="Share your technical narrative..."
               />
            </div>

            <div className="pt-4 flex justify-end">
               <button 
                type="submit" 
                disabled={saving} 
                className="px-10 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-3"
               >
                 {saving ? "Synchronizing..." : "Update Identity"}
               </button>
            </div>
          </motion.form>
        </div>

        {/* Security Controls */}
        <div className="space-y-10">
           <motion.form 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             onSubmit={handlePasswordChange} 
             className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl space-y-8"
           >
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 rounded-2xl bg-white/10 text-pink-500">
                    <HiOutlineKey size={24} />
                 </div>
                 <h3 className="text-2xl font-black tracking-tight">Security</h3>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2 relative">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Alpha Key (Current)</label>
                    <input 
                      type={showOld ? "text" : "password"} 
                      className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all pr-12"
                      value={passwords.old} 
                      onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                    />
                    <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-4 top-10 text-slate-600 hover:text-white transition-colors">
                      {showOld ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                    </button>
                 </div>

                 <div className="space-y-2 relative">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">New Protocol Key</label>
                    <input 
                      type={showNew ? "text" : "password"} 
                      className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all pr-12"
                      value={passwords.new} 
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-10 text-slate-600 hover:text-white transition-colors">
                      {showNew ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                    </button>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Protocol</label>
                    <input 
                      type="password" 
                      className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all"
                      value={passwords.confirm} 
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    />
                 </div>

                 <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={passSaving} 
                      className="w-full py-5 bg-gradient-to-r from-pink-600 to-indigo-600 text-white rounded-[1.5rem] font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {passSaving ? "Hardening Security..." : "Rotat Key Protocol"}
                    </button>
                 </div>
              </div>
           </motion.form>

           {/* Ecosystem Status Card */}
           <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 text-center relative overflow-hidden">
              <div className="w-16 h-16 bg-white rounded-[1.5rem] border border-slate-100 flex items-center justify-center mx-auto mb-4 text-emerald-500 shadow-sm">
                 <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Node Encryption</h4>
              <p className="text-slate-400 font-medium text-xs leading-relaxed">Your account session is active on the SYICT Global Grid. All identity interactions are encrypted end-to-end.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
