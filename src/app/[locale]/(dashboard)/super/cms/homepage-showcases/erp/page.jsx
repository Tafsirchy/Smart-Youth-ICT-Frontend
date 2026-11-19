"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuCheck,
  LuX,
  LuLayers,
  LuSearch,
  LuRefreshCw,
  LuArrowLeft,
  LuExternalLink,
  LuSparkles,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

const BADGE_COLORS = [
  { id: "emerald", label: "Emerald Green", border: "border-emerald-500", bg: "bg-emerald-50 text-emerald-700" },
  { id: "blue", label: "Sky Blue", border: "border-blue-500", bg: "bg-blue-50 text-blue-700" },
  { id: "indigo", label: "Indigo Core", border: "border-indigo-500", bg: "bg-indigo-50 text-indigo-700" },
  { id: "teal", label: "Deep Teal", border: "border-teal-500", bg: "bg-teal-50 text-teal-700" },
  { id: "amber", label: "Warm Amber", border: "border-amber-500", bg: "bg-amber-50 text-amber-800" },
  { id: "rose", label: "Vibrant Rose", border: "border-rose-500", bg: "bg-rose-50 text-rose-700" },
  { id: "violet", label: "Royal Violet", border: "border-purple-500", bg: "bg-purple-50 text-purple-700" },
];

export default function ERPManagementPage() {
  const locale = useLocale();
  const [erpItems, setErpItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tag: "Ready to Deploy",
    badgeColor: "emerald",
    demoUrl: "/contact?service=erp",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchErps();
  }, []);

  const fetchErps = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cms/home-erp/admin");
      setErpItems(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load ERP software list");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || "",
        category: item.category || "",
        description: item.description || "",
        tag: item.tag || "Ready to Deploy",
        badgeColor: item.badgeColor || "emerald",
        demoUrl: item.demoUrl || "/contact?service=erp",
        order: item.order ?? 0,
        isActive: item.isActive !== false,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        category: "",
        description: "",
        tag: "Ready to Deploy",
        badgeColor: "emerald",
        demoUrl: "/contact?service=erp",
        order: erpItems.length + 1,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("ERP Title is required");
      return;
    }

    try {
      if (editingItem) {
        await api.put(`/cms/home-erp/${editingItem._id}`, formData);
        toast.success(`"${formData.title}" updated successfully`);
      } else {
        await api.post("/cms/home-erp", formData);
        toast.success(`"${formData.title}" created successfully`);
      }
      setShowModal(false);
      fetchErps();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleToggle = async (item) => {
    try {
      await api.patch(`/cms/home-erp/${item._id}/toggle`);
      setErpItems((prev) =>
        prev.map((i) => (i._id === item._id ? { ...i, isActive: !i.isActive } : i))
      );
      toast.success(`${item.title} is now ${!item.isActive ? "Active" : "Paused"}`);
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.delete(`/cms/home-erp/${id}`);
      toast.success(`"${title}" deleted`);
      fetchErps();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return erpItems;
    return erpItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.tag?.toLowerCase().includes(q)
    );
  }, [erpItems, search]);

  return (
    <div className="py-4 space-y-6 max-w-7xl mx-auto">
      {/* ── Breadcrumb & Navigation ────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Link
          href={`/${locale}/super/cms/homepage-showcases`}
          className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>Showcases Hub</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800">ERP Software Suite</span>
      </div>

      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider rounded-md mb-1.5">
            <LuLayers className="w-3.5 h-3.5" />
            <span>Dedicated Section Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Enterprise ERP Software Suite
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage the ready-to-deploy commercial software systems displayed in the homepage 3D marquee.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all"
          >
            <LuPlus className="w-4 h-4" />
            <span>Add ERP Software</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Systems</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{erpItems.length}</p>
        </div>
        <div className="bg-white border border-emerald-200 p-4 rounded-xl shadow-xs">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Active in Marquee</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{erpItems.filter((i) => i.isActive).length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paused / Hidden</span>
          <p className="text-2xl font-black text-slate-400 mt-1">{erpItems.filter((i) => !i.isActive).length}</p>
        </div>
      </div>

      {/* ── Search & Filter Bar ────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-xs">
        <div className="relative flex-1 max-w-md">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search ERP systems by title, category, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>
        <button
          onClick={fetchErps}
          title="Refresh List"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
        >
          <LuRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* ── Cards Grid ─────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-100 animate-pulse rounded-xl border border-slate-200" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-xl">
          <LuLayers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">No ERP software found</h3>
          <p className="text-xs text-slate-400 mt-1">Try another search keyword or create a new ERP system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`bg-white border rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all ${
                item.isActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md ${
                      BADGE_COLORS.find((b) => b.id === item.badgeColor)?.bg || "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {item.tag || "Ready Software"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-slate-400">#{item.order}</span>
                    <button
                      onClick={() => handleToggle(item)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        item.isActive
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                      title="Toggle active status"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                      <span>{item.isActive ? "Active" : "Paused"}</span>
                    </button>
                  </div>
                </div>

                <h3 className="font-black text-base text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs font-bold text-slate-500 mt-0.5 mb-2">{item.category}</p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={item.demoUrl || "/contact"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-bold"
                >
                  <span>Live Demo</span>
                  <LuExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    title="Edit ERP"
                  >
                    <LuPencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    title="Delete ERP"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-black text-lg text-slate-900">
                  {editingItem ? `Edit: ${editingItem.title}` : "Add Ready ERP Software"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    ERP Software Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smart POS, Smart HR, Hospital ERP..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Category Subtitle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Retail POS, Healthcare"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Pill Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Retail ERP, Cloud SaaS"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Brief Feature Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Key highlights and commercial features..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Theme Accent Color
                    </label>
                    <select
                      value={formData.badgeColor}
                      onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      {BADGE_COLORS.map((color) => (
                        <option key={color.id} value={color.id}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Display Order #
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Live Demo Link
                  </label>
                  <input
                    type="text"
                    placeholder="/contact?service=smart-pos"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="erp-is-active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="erp-is-active" className="text-xs font-bold text-slate-800">
                    Visible in Homepage ERP Marquee
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    {editingItem ? "Save Changes" : "Create ERP"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
