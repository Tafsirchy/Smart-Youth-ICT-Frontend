"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  IoPersonOutline,
  IoCameraOutline,
  IoSaveOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

export default function StudentProfilePage() {
  const { data: session, update } = useSession();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    language: "en",
    bio: "",
  });

  // Password state
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passSaving, setPassSaving] = useState(false);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        const u = res.data.data || res.data.user;
        setForm({
          name: u.name || "",
          phone: u.phone || "",
          language: u.language || "en",
          bio: u.bio || "",
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/auth/profile", form);
      await update({ user: { ...session?.user, name: form.name } });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return toast.error("New passwords do not match!");
    if (passwords.new.length < 6) return toast.error("Password must be at least 6 characters.");
    
    setPassSaving(true);
    try {
      await api.put("/auth/password", { 
        oldPassword: passwords.old, 
        newPassword: passwords.new 
      });
      toast.success("Password updated!");
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update password.");
    } finally {
      setPassSaving(false);
    }
  };

  const handleAvatarUpdate = async () => {
    const url = window.prompt("Enter new Avatar Image URL:", session?.user?.image || "");
    if (!url) return;
    
    setSaving(true);
    try {
      const res = await api.put("/auth/profile", { avatar: url });
      if (res.data.success) {
        await update({ user: { ...session?.user, image: url } });
        toast.success("Avatar updated!");
      }
    } catch (err) {
      toast.error("Failed to update avatar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-20 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Account Settings</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage your identity, personal details, and account security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: IDENTITY & INFO */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Avatar & Basic Card */}
          <div className="bg-white rounded-[32px] ring-1 ring-neutral-200 shadow-sm p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-neutral-100 flex items-center justify-center text-neutral-400 overflow-hidden ring-4 ring-white shadow-lg">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <IoPersonOutline size={40} />
                )}
              </div>
              <button 
                onClick={handleAvatarUpdate}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-10"
              >
                <IoCameraOutline size={20} />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-black text-neutral-900">{session?.user?.name || "Student"}</h2>
              <p className="text-neutral-500 text-sm">{session?.user?.email}</p>
              <div className="mt-2 flex gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full leading-none">
                  Student Account
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full leading-none">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="bg-white rounded-[32px] ring-1 ring-neutral-200 shadow-sm p-8 space-y-6">
            <h3 className="text-lg font-bold text-neutral-900 border-b border-neutral-50 pb-4">Personal Details</h3>
            
            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map(i => <div key={i} className="h-14 bg-neutral-50 rounded-2xl" />)}
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input className="w-full rounded-2xl bg-neutral-50 border-none px-4 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input className="w-full rounded-2xl bg-neutral-50 border-none px-4 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Preferred Language</label>
                  <select className="w-full rounded-2xl bg-neutral-50 border-none px-4 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
                    <option value="en">English (US)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Professional Bio</label>
                  <textarea rows={4} className="w-full rounded-2xl bg-neutral-50 border-none px-4 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={saving} className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50">
                    {saving ? "Updating..." : "Save Profile Details"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: SECURITY */}
        <div className="lg:col-span-1 space-y-8">
           <form onSubmit={handlePasswordChange} className="bg-white rounded-[32px] ring-1 ring-neutral-200 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-neutral-50 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <IoLockClosedOutline size={20} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Security</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">Current Password</label>
                  <input 
                    type={showOld ? "text" : "password"} 
                    className="w-full rounded-2xl bg-neutral-50 border-none px-4 py-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all" 
                    value={passwords.old} 
                    onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-4 top-10 text-neutral-400">
                    {showOld ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">New Password</label>
                  <input 
                    type={showNew ? "text" : "password"} 
                    className="w-full rounded-2xl bg-neutral-50 border-none px-4 py-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all" 
                    value={passwords.new} 
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-10 text-neutral-400">
                    {showNew ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="w-full rounded-2xl bg-neutral-50 border-none px-4 py-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all" 
                    value={passwords.confirm} 
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={passSaving} className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold shadow-xl shadow-neutral-900/20 hover:bg-black transition-all disabled:opacity-50">
                    {passSaving ? "Updating Password..." : "Change Password"}
                  </button>
                </div>
              </div>
           </form>

           {/* Quick Stats Card */}
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[32px] p-8 text-white shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Account Status</h4>
              <p className="text-sm font-medium leading-relaxed">Your account is fully verified and connected to the SYICT Education Cloud.</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">System Online</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

