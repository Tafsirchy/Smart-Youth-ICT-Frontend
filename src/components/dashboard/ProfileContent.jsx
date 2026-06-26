"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
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
  HiOutlineKey,
} from "react-icons/hi2";

export default function ProfileContent() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [passSaving, setPassSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    language: "en",
    bio: "",
  });

  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");
      if (res.data?.success) {
        const u = res.data.data;
        setForm({
          name: u.name || "",
          phone: u.phone || "",
          language: u.language || "en",
          bio: u.bio || "",
        });
      }
    } catch (err) {
      toast.error("Failed to load profile intelligence");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/users/me", form);
      if (res.data?.success) {
        await update({ user: { ...session?.user, name: form.name } });
        toast.success("Identity profile synchronized successfully");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm)
      return toast.error("Encryption keys do not match");
    if (passwords.new.length < 8)
      return toast.error("Security key must be 8+ characters");

    setPassSaving(true);
    try {
      await api.put("/auth/password", {
        oldPassword: passwords.old,
        newPassword: passwords.new,
      });
      toast.success("Security protocols updated");
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Access modification failed");
    } finally {
      setPassSaving(false);
    }
  };

  const handleAvatarUpdate = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload an image file");
    }

    const objectUrl = URL.createObjectURL(file);
    setSaving(true);
    try {
      const res = await api.put("/users/me", { avatar: objectUrl });
      if (res.data.success) {
        await update({ user: { ...session?.user, image: objectUrl } });
        toast.success("Visual identity updated");
      }
    } catch (err) {
      toast.error("Failed to update visual node");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 bg-slate-100 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-slate-50 rounded-2xl" />
          <div className="h-64 bg-slate-50 rounded-2xl" />
        </div>
      </div>
    );

  return (
    <div className="space-y-6 pb-8 max-w-6xl mx-auto">
      {/* Identity Header */}
      <div className="relative p-6 rounded-3xl bg-slate-900 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 -mr-48 -mt-48 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-slate-800 border-2 border-slate-700/50 overflow-hidden shadow-xl">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session?.user?.name || "Profile avatar"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-800">
                  <HiOutlineUser size={36} />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpdate}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-pink-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all ring-2 ring-slate-900"
            >
              <HiOutlineCamera size={18} />
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tight leading-snug">
                {session?.user?.name}
              </h1>
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                {session?.user?.role?.replace("_", " ")}
              </span>
            </div>
            <p className="text-slate-400 font-medium max-w-sm mb-4 leading-normal">
              {session?.user?.email}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                <HiOutlineFingerPrint className="text-slate-500" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">
                  ID Shared Securely
                </span>
              </div>
              <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">
                  System Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSave}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <HiOutlineIdentification size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                Personal Intelligence
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                  Universal Name
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all leading-tight"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                  Contact Node (Phone)
                </label>
                <div className="relative">
                  <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    className="w-full pl-10 pr-3 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all leading-tight"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                Linguistic Preference
              </label>
              <div className="relative">
                <HiOutlineGlobeAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <select
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all appearance-none leading-tight"
                  value={form.language}
                  onChange={(e) =>
                    setForm({ ...form, language: e.target.value })
                  }
                >
                  <option value="en">English (Universal)</option>
                  <option value="bn">Bengali (Native)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                Narrative (Bio)
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all resize-none leading-relaxed"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Share your technical narrative..."
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-2 leading-tight"
              >
                {saving ? "Synchronizing..." : "Update Identity"}
              </button>
            </div>
          </motion.form>
        </div>

        {/* Security Controls */}
        <div className="space-y-6">
          <motion.form
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handlePasswordChange}
            className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl space-y-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-white/10 text-pink-500">
                <HiOutlineKey size={20} />
              </div>
              <h3 className="text-xl font-black tracking-tight leading-snug">Security</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 leading-none">
                  Alpha Key (Current)
                </label>
                <input
                  type={showOld ? "text" : "password"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all pr-10 leading-tight"
                  value={passwords.old}
                  onChange={(e) =>
                    setPasswords({ ...passwords, old: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-8 text-slate-600 hover:text-white transition-colors"
                >
                  {showOld ? (
                    <HiOutlineEyeSlash size={18} />
                  ) : (
                    <HiOutlineEye size={18} />
                  )}
                </button>
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 leading-none">
                  New Protocol Key
                </label>
                <input
                  type={showNew ? "text" : "password"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all pr-10 leading-tight"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-8 text-slate-600 hover:text-white transition-colors"
                >
                  {showNew ? (
                    <HiOutlineEyeSlash size={18} />
                  ) : (
                    <HiOutlineEye size={18} />
                  )}
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 leading-none">
                  Confirm Protocol
                </label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all leading-tight"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={passSaving}
                  className="w-full py-3 bg-gradient-to-r from-pink-600 to-indigo-600 text-white rounded-xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 leading-tight"
                >
                  {passSaving ? "Hardening Security..." : "Rotat Key Protocol"}
                </button>
              </div>
            </div>
          </motion.form>

          {/* Ecosystem Status Card */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center relative overflow-hidden">
            <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center mx-auto mb-3 text-emerald-500 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1.5 leading-tight">
              Node Encryption
            </h4>
            <p className="text-slate-400 font-medium text-xs leading-relaxed">
              Your account session is active on the SYICT Global Grid. All
              identity interactions are encrypted end-to-end.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
