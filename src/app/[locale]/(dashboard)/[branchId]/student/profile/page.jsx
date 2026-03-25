"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  IoPersonOutline,
  IoCameraOutline,
  IoSaveOutline,
} from "react-icons/io5";

export default function StudentProfilePage() {
  const { data: session, update } = useSession();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    language: "en",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="pb-10 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-textPrimary">My Profile</h1>
        <p className="text-textSecondary text-sm mt-1">
          Manage your personal information and preferences.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Avatar section */}
        <div className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-6 flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="avatar"
                  className="w-20 h-20 rounded-2xl object-cover"
                />
              ) : (
                <IoPersonOutline size={36} />
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md ring-1 ring-neutral-200 flex items-center justify-center text-neutral-500 hover:text-blue-600 transition-colors">
              <IoCameraOutline size={16} />
            </button>
          </div>
          <div>
            <p className="font-bold text-textPrimary text-lg">
              {session?.user?.name || "Student"}
            </p>
            <p className="text-textSecondary text-sm">{session?.user?.email}</p>
            <span className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 capitalize">
              {session?.user?.role || "student"}
            </span>
          </div>
        </div>

        {/* Edit form */}
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm p-6 space-y-5"
        >
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-12 bg-neutral-200 rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1.5">
                    Full Name
                  </label>
                  <input
                    className="input w-full"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1.5">
                    Phone (bKash / Nagad)
                  </label>
                  <input
                    className="input w-full"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1.5">
                  Preferred Language
                </label>
                <select
                  className="input w-full"
                  value={form.language}
                  onChange={(e) =>
                    setForm({ ...form, language: e.target.value })
                  }
                >
                  <option value="en">English</option>
                  <option value="bn">বাংলা (Bangla)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1.5">
                  Short Bio
                </label>
                <textarea
                  rows={3}
                  className="input w-full resize-none"
                  placeholder="Tell us about yourself…"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              <motion.button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 btn-primary px-6 py-3 font-semibold disabled:opacity-60 rounded-xl"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <IoSaveOutline size={18} />
                {saving ? "Saving…" : "Save Changes"}
              </motion.button>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}
