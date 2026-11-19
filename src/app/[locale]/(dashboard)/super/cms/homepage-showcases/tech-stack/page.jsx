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
  LuCode,
  LuSearch,
  LuRefreshCw,
  LuArrowLeft,
  LuSparkles,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

const TECH_CATEGORIES = [
  { id: "all", label: "All Technologies" },
  { id: "language", label: "True Languages" },
  { id: "markup", label: "Markup & Styling" },
  { id: "framework", label: "Libraries & Frameworks" },
  { id: "database", label: "Databases & Storage" },
  { id: "devops_cloud", label: "Cloud & DevOps" },
];

export default function TechStackManagementPage() {
  const locale = useLocale();
  const [techItems, setTechItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    category: "language",
    badge: "Core",
    color: "#10B981",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchTechItems();
  }, []);

  const fetchTechItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cms/home-tech/admin");
      setTechItems(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load technologies list");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || "",
        category: item.category || "language",
        badge: item.badge || "Core",
        color: item.color || "#10B981",
        order: item.order ?? 0,
        isActive: item.isActive !== false,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "language",
        badge: "Core",
        color: "#10B981",
        order: techItems.length + 1,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Technology name is required");
      return;
    }

    try {
      if (editingItem) {
        await api.put(`/cms/home-tech/${editingItem._id}`, formData);
        toast.success(`"${formData.name}" updated successfully`);
      } else {
        await api.post("/cms/home-tech", formData);
        toast.success(`"${formData.name}" added to tech stack`);
      }
      setShowModal(false);
      fetchTechItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleToggle = async (item) => {
    try {
      await api.patch(`/cms/home-tech/${item._id}/toggle`);
      setTechItems((prev) =>
        prev.map((i) => (i._id === item._id ? { ...i, isActive: !i.isActive } : i))
      );
      toast.success(`${item.name} is now ${!item.isActive ? "Active" : "Paused"}`);
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from the tech stack showcase?`)) return;
    try {
      await api.delete(`/cms/home-tech/${id}`);
      toast.success(`"${name}" deleted`);
      fetchTechItems();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredItems = useMemo(() => {
    let list = techItems;
    if (categoryFilter !== "all") {
      list = list.filter((i) => i.category === categoryFilter);
    }
    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.badge?.toLowerCase().includes(q) ||
          i.category?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [techItems, categoryFilter, search]);

  return (
    <div className="py-4 space-y-6 max-w-7xl mx-auto">
      {/* ── Breadcrumb & Navigation ────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Link
          href={`/${locale}/super/cms/homepage-showcases`}
          className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>Showcases Hub</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800">Languages &amp; Tech Stack</span>
      </div>

      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider rounded-md mb-1.5">
            <LuCode className="w-3.5 h-3.5" />
            <span>Dedicated Section Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Programming Languages &amp; Tech Stack
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage the complete multi-row marquee arsenal: true programming languages, frameworks, styling, databases, and DevOps tools.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all"
          >
            <LuPlus className="w-4 h-4" />
            <span>Add Technology</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Tech</span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{techItems.length}</p>
        </div>
        <div className="bg-white border border-indigo-200 p-3.5 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Active</span>
          <p className="text-xl sm:text-2xl font-black text-indigo-600 mt-0.5">{techItems.filter((i) => i.isActive).length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Languages</span>
          <p className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
            {techItems.filter((i) => i.category === "language").length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Frameworks/DB</span>
          <p className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
            {techItems.filter((i) => i.category !== "language").length}
          </p>
        </div>
      </div>

      {/* ── Controls: Category Filter + Search ──────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-xs">
        {/* Category Selector */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap rounded-md transition-all ${
                categoryFilter === cat.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search languages, frameworks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* ── High Density Tech Grid ──────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-100 animate-pulse rounded-lg border border-slate-200" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-xl">
          <LuCode className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">No technology found</h3>
          <p className="text-xs text-slate-400 mt-1">Try another filter or add a new technology.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`bg-white border p-3 flex flex-col justify-between rounded-lg shadow-xs transition-all hover:shadow-md ${
                item.isActive ? "border-slate-200" : "border-slate-200 opacity-50 bg-slate-50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-black text-slate-400">#{item.order}</span>
                  <button
                    onClick={() => handleToggle(item)}
                    className={`w-2 h-2 rounded-full ${item.isActive ? "bg-emerald-500" : "bg-slate-300"}`}
                    title={item.isActive ? "Active" : "Paused"}
                  />
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color || "#10B981" }}
                  />
                  <h4 className="font-extrabold text-sm text-slate-900 truncate">{item.name}</h4>
                </div>

                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                  {item.badge || item.category}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-end gap-1">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                  title="Edit"
                >
                  <LuPencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                  title="Delete"
                >
                  <LuTrash2 className="w-3.5 h-3.5" />
                </button>
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
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-black text-lg text-slate-900">
                  {editingItem ? `Edit: ${editingItem.name}` : "Add Technology / Language"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Technology Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Python, React, Go, Docker, PostgreSQL..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Classification *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    >
                      <option value="language">True Language</option>
                      <option value="markup">Markup &amp; Styling</option>
                      <option value="framework">Library / Framework</option>
                      <option value="database">Database</option>
                      <option value="devops_cloud">Cloud / DevOps</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Badge Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI / Data, Modern UI"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Brand Accent Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-9 h-9 p-0.5 border border-slate-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                      />
                    </div>
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
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="tech-is-active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <label htmlFor="tech-is-active" className="text-xs font-bold text-slate-800">
                    Visible in Homepage Tech Ticker
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
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    {editingItem ? "Save Changes" : "Create Technology"}
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
