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

import TwoFactorSecurityCard from "./TwoFactorSecurityCard";

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
      <div className="space-y-3 animate-pulse">
        <div className="h-28 bg-slate-100 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-56 bg-slate-50 rounded-xl" />
          <div className="h-56 bg-slate-50 rounded-xl" />
        </div>
      </div>
    );

  return (
    <div className="space-y-4 pb-4 w-full">
      {/* Identity Header */}
      <div className="relative p-4 sm:p-5 bg-slate-900 overflow-hidden shadow-lg rounded-xl">
        <div className="absolute top-0 right-0 w-96 h-96 -mr-48 -mt-48 bg-blue-500/10 blur-[100px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-5">
          <div className="relative group">
            <div className="w-20 h-20 bg-slate-800 border-2 border-slate-700/50 overflow-hidden shadow-xl rounded-lg">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session?.user?.name || "Profile avatar"}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover bg-[#f0f0f0] rounded-md"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.srcset = "";
                    e.target.src = "/assets/fallback.png";
                  }}
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-800">
                  <HiOutlineUser size={32} />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden rounded-md"
              onChange={handleAvatarUpdate}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-pink-600 text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all ring-2 ring-slate-900 rounded-full"
            >
              <HiOutlineCamera size={16} />
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                {session?.user?.name}
              </h1>
              <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-md leading-tight">
                {session?.user?.role?.replace("_", " ")}
              </span>
            </div>
            <p className="text-slate-400 font-medium max-w-sm mb-2.5 leading-normal text-xs sm:text-sm">
              {session?.user?.email}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <div className="px-2.5 py-1 bg-white/5 border border-white/10 flex items-center gap-1.5 rounded-lg leading-tight">
                <HiOutlineFingerPrint className="text-slate-500" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">
                  ID Shared Securely
                </span>
              </div>
              <div className="px-2.5 py-1 bg-white/5 border border-white/10 flex items-center gap-1.5 rounded-lg leading-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">
                  System Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* Core Profile Details */}
        <div className="lg:col-span-2 space-y-4">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSave}
            className="bg-white p-4 sm:p-5 border border-slate-100 shadow-sm space-y-3.5 rounded-xl"
          >
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <HiOutlineIdentification size={18} />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                Personal Intelligence
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                  Universal Name
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all leading-tight rounded-md"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                  Contact Node (Phone)
                </label>
                <div className="relative">
                  <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all leading-tight rounded-md"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                Linguistic Preference
              </label>
              <div className="relative">
                <HiOutlineGlobeAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <select
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all appearance-none leading-tight rounded-md"
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

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-none">
                Narrative (Bio)
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all resize-none leading-normal rounded-md"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Share your technical narrative..."
              />
            </div>

            <div className="pt-1 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-black shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-1.5 leading-tight rounded-md"
              >
                {saving ? "Synchronizing..." : "Update Identity"}
              </button>
            </div>
          </motion.form>
        </div>

        {/* Security Controls */}
        <div className="space-y-3.5">
          <TwoFactorSecurityCard userEmail={session?.user?.email} />
          <motion.form
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handlePasswordChange}
            className="bg-slate-900 p-4 sm:p-5 text-white shadow-xl space-y-3.5 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-white/10 text-pink-500 rounded-md">
                <HiOutlineKey size={18} />
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                Security
              </h3>
            </div>

            <div className="space-y-2.5">
              <div className="space-y-1 relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 leading-none">
                  Alpha Key (Current)
                </label>
                <input
                  type={showOld ? "text" : "password"}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all pr-9 leading-tight rounded-md"
                  value={passwords.old}
                  onChange={(e) =>
                    setPasswords({ ...passwords, old: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-2.5 top-6 text-slate-500 hover:text-white transition-colors"
                >
                  {showOld ? (
                    <HiOutlineEyeSlash size={16} />
                  ) : (
                    <HiOutlineEye size={16} />
                  )}
                </button>
              </div>

              <div className="space-y-1 relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 leading-none">
                  New Protocol Key
                </label>
                <input
                  type={showNew ? "text" : "password"}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all pr-9 leading-tight rounded-md"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-2.5 top-6 text-slate-500 hover:text-white transition-colors"
                >
                  {showNew ? (
                    <HiOutlineEyeSlash size={16} />
                  ) : (
                    <HiOutlineEye size={16} />
                  )}
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 leading-none">
                  Confirm Protocol
                </label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-pink-500 transition-all leading-tight rounded-md"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={passSaving}
                  className="w-full py-2 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-black text-xs shadow-md hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 leading-tight rounded-md uppercase tracking-wider"
                >
                  {passSaving ? "Hardening Security..." : "Rotate Key Protocol"}
                </button>
              </div>
            </div>
          </motion.form>

          {/* Ecosystem Status Card */}
          <div className="bg-slate-50 p-3.5 sm:p-4 border border-slate-100 text-center relative overflow-hidden rounded-xl">
            <div className="w-9 h-9 bg-white border border-slate-100 flex items-center justify-center mx-auto mb-2 text-emerald-500 shadow-sm rounded-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1 leading-tight">
              Node Encryption
            </h4>
            <p className="text-slate-400 font-medium text-xs leading-normal">
              Your account session is active on the SYICT Global Grid. All
              identity interactions are encrypted end-to-end.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
