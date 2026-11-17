"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuCheck,
  LuX,
  LuLayers,
  LuCode2,
  LuEye,
  LuSearch,
  LuArrowUpDown,
  LuSparkles,
  LuRefreshCw,
  LuExternalLink
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

const TECH_CATEGORIES = [
  { id: "all", label: "All Technologies" },
  { id: "language", label: "True Languages" },
  { id: "markup", label: "Markup & Styling" },
  { id: "framework", label: "Libraries & Frameworks" },
  { id: "database", label: "Databases & Storage" },
  { id: "devops_cloud", label: "Cloud & DevOps" },
];

export default function HomepageShowcasesCMS() {
  const [activeTab, setActiveTab] = useState("erp"); // 'erp' | 'tech'
  
  // ERP State
  const [erpItems, setErpItems] = useState([]);
  const [loadingErp, setLoadingErp] = useState(true);
  const [showErpModal, setShowErpModal] = useState(false);
  const [editingErp, setEditingErp] = useState(null);
  const [erpSearch, setErpSearch] = useState("");
  const [erpFormData, setErpFormData] = useState({
    title: "",
    category: "",
    description: "",
    tag: "Ready to Deploy",
    badgeColor: "emerald",
    demoUrl: "/contact?service=erp",
    order: 0,
    isActive: true,
  });

  // Tech Stack State
  const [techItems, setTechItems] = useState([]);
  const [loadingTech, setLoadingTech] = useState(true);
  const [showTechModal, setShowTechModal] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [techSearch, setTechSearch] = useState("");
  const [techCategoryFilter, setTechCategoryFilter] = useState("all");
  const [techFormData, setTechFormData] = useState({
    name: "",
    category: "language",
    badge: "Core",
    color: "#10B981",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchErpItems();
    fetchTechItems();
  }, []);

  // ─── ERP CRUD ──────────────────────────────────────────────
  const fetchErpItems = async () => {
    setLoadingErp(true);
    try {
      const res = await api.get("/cms/home-erp/admin");
      setErpItems(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load ERP software list");
    } finally {
      setLoadingErp(false);
    }
  };

  const handleOpenErpModal = (item = null) => {
    if (item) {
      setEditingErp(item);
      setErpFormData({
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
      setEditingErp(null);
      setErpFormData({
        title: "",
        category: "Enterprise Software",
        description: "",
        tag: "Ready to Deploy",
        badgeColor: "emerald",
        demoUrl: "/contact?service=erp",
        order: erpItems.length + 1,
        isActive: true,
      });
    }
    setShowErpModal(true);
  };

  const handleSaveErp = async (e) => {
    e.preventDefault();
    if (!erpFormData.title.trim()) {
      toast.error("ERP Title is required");
      return;
    }

    try {
      if (editingErp) {
        await api.put(`/cms/home-erp/${editingErp._id}`, erpFormData);
        toast.success(`"${erpFormData.title}" updated successfully`);
      } else {
        await api.post("/cms/home-erp", erpFormData);
        toast.success(`"${erpFormData.title}" added to showcase`);
      }
      setShowErpModal(false);
      fetchErpItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleToggleErp = async (item) => {
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

  const handleDeleteErp = async (id, title) => {
    if (!window.confirm(`Delete "${title}" from the homepage ERP showcase?`)) return;
    try {
      await api.delete(`/cms/home-erp/${id}`);
      toast.success(`"${title}" deleted`);
      fetchErpItems();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ─── TECH STACK CRUD ───────────────────────────────────────
  const fetchTechItems = async () => {
    setLoadingTech(true);
    try {
      const res = await api.get("/cms/home-tech/admin");
      setTechItems(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load technologies list");
    } finally {
      setLoadingTech(false);
    }
  };

  const handleOpenTechModal = (item = null) => {
    if (item) {
      setEditingTech(item);
      setTechFormData({
        name: item.name || "",
        category: item.category || "language",
        badge: item.badge || "Core",
        color: item.color || "#10B981",
        order: item.order ?? 0,
        isActive: item.isActive !== false,
      });
    } else {
      setEditingTech(null);
      setTechFormData({
        name: "",
        category: "language",
        badge: "Core",
        color: "#10B981",
        order: techItems.length + 1,
        isActive: true,
      });
    }
    setShowTechModal(true);
  };

  const handleSaveTech = async (e) => {
    e.preventDefault();
    if (!techFormData.name.trim()) {
      toast.error("Technology name is required");
      return;
    }

    try {
      if (editingTech) {
        await api.put(`/cms/home-tech/${editingTech._id}`, techFormData);
        toast.success(`"${techFormData.name}" updated successfully`);
      } else {
        await api.post("/cms/home-tech", techFormData);
        toast.success(`"${techFormData.name}" added to tech stack`);
      }
      setShowTechModal(false);
      fetchTechItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleToggleTech = async (item) => {
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

  const handleDeleteTech = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from the tech stack showcase?`)) return;
    try {
      await api.delete(`/cms/home-tech/${id}`);
      toast.success(`"${name}" deleted`);
      fetchTechItems();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // Filtered Lists
  const filteredErps = useMemo(() => {
    const q = erpSearch.toLowerCase().trim();
    if (!q) return erpItems;
    return erpItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.tag?.toLowerCase().includes(q)
    );
  }, [erpItems, erpSearch]);

  const filteredTech = useMemo(() => {
    let list = techItems;
    if (techCategoryFilter !== "all") {
      list = list.filter((i) => i.category === techCategoryFilter);
    }
    const q = techSearch.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.badge?.toLowerCase().includes(q) ||
          i.category?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [techItems, techCategoryFilter, techSearch]);

  return (
    <div className="py-4 space-y-6 max-w-7xl mx-auto">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider rounded-md mb-1.5">
            <LuSparkles className="w-3.5 h-3.5" />
            <span>Homepage Showcases Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Homepage Showcases &amp; Tickers
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage the 13 Ready-Made ERP Systems and the complete Programming Languages &amp; Tech Stack tickers.
          </p>
        </div>

        {/* Global Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => (activeTab === "erp" ? handleOpenErpModal() : handleOpenTechModal())}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all"
          >
            <LuPlus className="w-4 h-4" />
            <span>{activeTab === "erp" ? "Add ERP Software" : "Add Technology"}</span>
          </button>
        </div>
      </div>

      {/* ── Stats & Tabs Navigation Bar ──────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-2 border border-slate-200 rounded-xl">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 border border-slate-200/80 rounded-lg shadow-xs">
          <button
            onClick={() => setActiveTab("erp")}
            className={`flex items-center gap-2 px-4 py-2 font-bold text-xs sm:text-sm rounded-md transition-all ${
              activeTab === "erp"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <LuLayers className="w-4 h-4" />
            <span>13+ ERP Softwares</span>
            <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-full">
              {erpItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("tech")}
            className={`flex items-center gap-2 px-4 py-2 font-bold text-xs sm:text-sm rounded-md transition-all ${
              activeTab === "tech"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <LuCode2 className="w-4 h-4" />
            <span>Tech Stack &amp; Languages</span>
            <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-400 text-[10px] rounded-full">
              {techItems.length}
            </span>
          </button>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-4 px-3 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active ERPs: {erpItems.filter((i) => i.isActive).length}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>Active Tech: {techItems.filter((i) => i.isActive).length}</span>
          </span>
        </div>
      </div>

      {/* ── TAB 1: ERP SOFTWARES ───────────────────────────────── */}
      {activeTab === "erp" && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-xs">
            <div className="relative flex-1 max-w-md">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search ERP systems by name, category, or tag..."
                value={erpSearch}
                onChange={(e) => setErpSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>
            <button
              onClick={fetchErpItems}
              title="Refresh List"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            >
              <LuRefreshCw className={`w-4 h-4 ${loadingErp ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* ERP Cards Grid */}
          {loadingErp ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-44 bg-slate-100 animate-pulse rounded-xl border border-slate-200" />
              ))}
            </div>
          ) : filteredErps.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-xl">
              <LuLayers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-700">No ERP software found</h3>
              <p className="text-xs text-slate-400 mt-1">Try another search or add a new ERP system.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredErps.map((item) => (
                <div
                  key={item._id}
                  className={`bg-white border p-4 flex flex-col justify-between rounded-xl shadow-xs transition-all hover:shadow-md ${
                    item.isActive ? "border-slate-200/90" : "border-slate-200 opacity-60 bg-slate-50/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 rounded">
                        #{item.order} • {item.tag || "Ready Software"}
                      </span>
                      <button
                        onClick={() => handleToggleErp(item)}
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full transition-colors ${
                          item.isActive
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                        }`}
                      >
                        {item.isActive ? "Active" : "Paused"}
                      </button>
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2 mt-0.5">
                      {item.category}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 truncate max-w-[130px]">
                      {item.demoUrl}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenErpModal(item)}
                        className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit ERP"
                      >
                        <LuPencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteErp(item._id, item.title)}
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
        </div>
      )}

      {/* ── TAB 2: TECH STACK & LANGUAGES ─────────────────────── */}
      {activeTab === "tech" && (
        <div className="space-y-4">
          {/* Controls: Category Filter + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-xs">
            {/* Category Selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              {TECH_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTechCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap rounded-md transition-all ${
                    techCategoryFilter === cat.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search technology..."
                value={techSearch}
                onChange={(e) => setTechSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Tech Grid */}
          {loadingTech ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-28 bg-slate-100 animate-pulse rounded-lg border border-slate-200" />
              ))}
            </div>
          ) : filteredTech.length === 0 ? (
            <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-xl">
              <LuCode2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-700">No technology found</h3>
              <p className="text-xs text-slate-400 mt-1">Try another filter or add a new technology.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredTech.map((item) => (
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
                        onClick={() => handleToggleTech(item)}
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
                      onClick={() => handleOpenTechModal(item)}
                      className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                      title="Edit"
                    >
                      <LuPencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTech(item._id, item.name)}
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
        </div>
      )}

      {/* ── MODAL: ERP SOFTWARE ADD / EDIT ─────────────────────── */}
      <AnimatePresence>
        {showErpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-black text-lg text-slate-900">
                  {editingErp ? `Edit: ${editingErp.title}` : "Add Ready ERP Software"}
                </h3>
                <button
                  onClick={() => setShowErpModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveErp} className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    ERP Software Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. POS System, CRM System, Hospital ERP..."
                    value={erpFormData.title}
                    onChange={(e) => setErpFormData({ ...erpFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Retail & Billing"
                      value={erpFormData.category}
                      onChange={(e) => setErpFormData({ ...erpFormData, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Display Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. High Velocity"
                      value={erpFormData.tag}
                      onChange={(e) => setErpFormData({ ...erpFormData, tag: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief highlights of this software system..."
                    value={erpFormData.description}
                    onChange={(e) => setErpFormData({ ...erpFormData, description: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Display Order #
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={erpFormData.order}
                      onChange={(e) => setErpFormData({ ...erpFormData, order: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Badge Theme
                    </label>
                    <select
                      value={erpFormData.badgeColor}
                      onChange={(e) => setErpFormData({ ...erpFormData, badgeColor: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      {BADGE_COLORS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Demo CTA Link
                  </label>
                  <input
                    type="text"
                    placeholder="/contact?service=erp"
                    value={erpFormData.demoUrl}
                    onChange={(e) => setErpFormData({ ...erpFormData, demoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="erp-is-active"
                    checked={erpFormData.isActive}
                    onChange={(e) => setErpFormData({ ...erpFormData, isActive: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="erp-is-active" className="text-xs font-bold text-slate-800">
                    Visible in Homepage Marquee
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowErpModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    {editingErp ? "Save Changes" : "Create ERP"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: TECH STACK ADD / EDIT ──────────────────────── */}
      <AnimatePresence>
        {showTechModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-black text-lg text-slate-900">
                  {editingTech ? `Edit: ${editingTech.name}` : "Add Technology / Language"}
                </h3>
                <button
                  onClick={() => setShowTechModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTech} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Technology Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Python, React, Go, Docker, PostgreSQL..."
                    value={techFormData.name}
                    onChange={(e) => setTechFormData({ ...techFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Classification *
                    </label>
                    <select
                      value={techFormData.category}
                      onChange={(e) => setTechFormData({ ...techFormData, category: e.target.value })}
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
                      value={techFormData.badge}
                      onChange={(e) => setTechFormData({ ...techFormData, badge: e.target.value })}
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
                        value={techFormData.color}
                        onChange={(e) => setTechFormData({ ...techFormData, color: e.target.value })}
                        className="w-9 h-9 p-0.5 border border-slate-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={techFormData.color}
                        onChange={(e) => setTechFormData({ ...techFormData, color: e.target.value })}
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
                      value={techFormData.order}
                      onChange={(e) => setTechFormData({ ...techFormData, order: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="tech-is-active"
                    checked={techFormData.isActive}
                    onChange={(e) => setTechFormData({ ...techFormData, isActive: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <label htmlFor="tech-is-active" className="text-xs font-bold text-slate-800">
                    Visible in Homepage Tech Ticker
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowTechModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    {editingTech ? "Save Changes" : "Create Technology"}
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
