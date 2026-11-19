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
  LuAward,
  LuSearch,
  LuRefreshCw,
  LuArrowLeft,
  LuExternalLink,
  LuSparkles,
} from "react-icons/lu";
import {
  SiGoogle,
  SiMeta,
  SiShopify,
  SiCanva,
  SiUpwork,
  SiFiverr,
  SiNotion,
  SiHubspot,
  SiApple,
  SiNetflix,
  SiSpotify,
  SiAdobe,
  SiGithub,
  SiSlack,
  SiLinkedin,
} from "react-icons/si";
import { FaMicrosoft, FaAmazon } from "react-icons/fa6";
import api from "@/lib/api";
import toast from "react-hot-toast";

const BRAND_PRESETS = [
  { id: "google", label: "Google" },
  { id: "microsoft", label: "Microsoft" },
  { id: "amazon", label: "Amazon" },
  { id: "meta", label: "Meta / Facebook" },
  { id: "shopify", label: "Shopify" },
  { id: "canva", label: "Canva" },
  { id: "upwork", label: "Upwork" },
  { id: "fiverr", label: "Fiverr" },
  { id: "notion", label: "Notion" },
  { id: "hubspot", label: "HubSpot" },
  { id: "apple", label: "Apple" },
  { id: "netflix", label: "Netflix" },
  { id: "spotify", label: "Spotify" },
  { id: "adobe", label: "Adobe" },
  { id: "github", label: "GitHub" },
  { id: "slack", label: "Slack" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "custom", label: "Custom (Use Logo Image URL)" },
];

function renderDashboardBrandIcon(item) {
  if (item.logo) {
    return <img src={item.logo} alt={item.name} className="w-5 h-5 object-contain rounded" />;
  }
  const key = (item.icon || item.name || "").toLowerCase().trim();
  switch (key) {
    case "google": return <SiGoogle className="text-[#4285F4]" size={19} />;
    case "microsoft": return <FaMicrosoft className="text-[#00A4EF]" size={18} />;
    case "amazon": return <FaAmazon className="text-[#FF9900]" size={19} />;
    case "meta":
    case "facebook": return <SiMeta className="text-[#0668E1]" size={19} />;
    case "shopify": return <SiShopify className="text-[#96BF48]" size={19} />;
    case "canva": return <SiCanva className="text-[#00C4CC]" size={19} />;
    case "upwork": return <SiUpwork className="text-[#14A800]" size={19} />;
    case "fiverr": return <SiFiverr className="text-[#1DBF73]" size={19} />;
    case "notion": return <SiNotion className="text-[#000000]" size={18} />;
    case "hubspot": return <SiHubspot className="text-[#FF7A59]" size={19} />;
    case "apple": return <SiApple className="text-slate-800" size={19} />;
    case "netflix": return <SiNetflix className="text-[#E50914]" size={19} />;
    case "spotify": return <SiSpotify className="text-[#1DB954]" size={19} />;
    case "adobe": return <SiAdobe className="text-[#FF0000]" size={19} />;
    case "github": return <SiGithub className="text-slate-900" size={19} />;
    case "slack": return <SiSlack className="text-[#4A154B]" size={19} />;
    case "linkedin": return <SiLinkedin className="text-[#0A66C2]" size={19} />;
    default:
      return <span className="font-mono text-xs font-black text-emerald-700">{(item.name || "BR").slice(0, 2).toUpperCase()}</span>;
  }
}

export default function BrandsManagementPage() {
  const locale = useLocale();
  const [brandItems, setBrandItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    icon: "google",
    category: "Tech Giant",
    websiteUrl: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cms/home-brands/admin");
      setBrandItems(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load trusted brands");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || "",
        logo: item.logo || "",
        icon: item.icon || "google",
        category: item.category || "Tech Giant",
        websiteUrl: item.websiteUrl || "",
        order: item.order ?? 0,
        isActive: item.isActive !== false,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        logo: "",
        icon: "google",
        category: "Tech Giant",
        websiteUrl: "",
        order: brandItems.length + 1,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Brand name is required");
      return;
    }

    try {
      if (editingItem) {
        await api.put(`/cms/home-brands/${editingItem._id}`, formData);
        toast.success(`"${formData.name}" updated successfully`);
      } else {
        await api.post("/cms/home-brands", formData);
        toast.success(`"${formData.name}" added to trusted brands`);
      }
      setShowModal(false);
      fetchBrands();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleToggle = async (item) => {
    try {
      await api.patch(`/cms/home-brands/${item._id}/toggle`);
      setBrandItems((prev) =>
        prev.map((i) => (i._id === item._id ? { ...i, isActive: !i.isActive } : i))
      );
      toast.success(`${item.name} is now ${!item.isActive ? "Active" : "Paused"}`);
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from trusted brands?`)) return;
    try {
      await api.delete(`/cms/home-brands/${id}`);
      toast.success(`"${name}" deleted`);
      fetchBrands();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return brandItems;
    return brandItems.filter(
      (item) =>
        item.name?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.icon?.toLowerCase().includes(q)
    );
  }, [brandItems, search]);

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
        <span className="text-slate-800">Trusted Brands</span>
      </div>

      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider rounded-md mb-1.5">
            <LuAward className="w-3.5 h-3.5" />
            <span>Dedicated Section Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted Brands &amp; Logo Cloud
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Curate the global tech companies, freelance platforms, and corporate networks featured in the homepage &ldquo;Brands Our Learners Work With&rdquo; marquee.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all"
          >
            <LuPlus className="w-4 h-4" />
            <span>Add Brand</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Brands</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{brandItems.length}</p>
        </div>
        <div className="bg-white border border-emerald-200 p-4 rounded-xl shadow-xs">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Active in Marquee</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{brandItems.filter((i) => i.isActive).length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paused / Hidden</span>
          <p className="text-2xl font-black text-slate-400 mt-1">{brandItems.filter((i) => !i.isActive).length}</p>
        </div>
      </div>

      {/* ── Search & Filter Bar ────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-xs">
        <div className="relative flex-1 max-w-md">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search brands by name, category, or icon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>
        <button
          onClick={fetchBrands}
          title="Refresh List"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
        >
          <LuRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* ── Brands Grid ────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-100 animate-pulse rounded-xl border border-slate-200" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-xl">
          <LuAward className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">No brand found</h3>
          <p className="text-xs text-slate-400 mt-1">Try another search keyword or add a new brand.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`bg-white border p-3.5 flex flex-col justify-between rounded-xl shadow-xs transition-all hover:shadow-md ${
                item.isActive ? "border-slate-200" : "border-slate-200 opacity-50 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    {renderDashboardBrandIcon(item)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">{item.name}</h4>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                      {item.category || "Tech & Enterprise"}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-black text-slate-400 shrink-0">#{item.order}</span>
              </div>

              {item.websiteUrl && (
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold truncate mb-2"
                >
                  <LuExternalLink className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.websiteUrl.replace(/^https?:\/\//, "")}</span>
                </a>
              )}

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggle(item)}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                    item.isActive
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                  <span>{item.isActive ? "Active" : "Paused"}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    title="Edit Brand"
                  >
                    <LuPencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    title="Delete Brand"
                  >
                    <LuTrash2 className="w-3.5 h-3.5" />
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
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-black text-lg text-slate-900">
                  {editingItem ? `Edit: ${editingItem.name}` : "Add Trusted Brand"}
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
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google, Microsoft, Shopify, Upwork..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Brand Icon Preset
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    >
                      {BRAND_PRESETS.map((preset) => (
                        <option key={preset.id} value={preset.id}>
                          {preset.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tech Giant, Freelance"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Custom Logo Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or data:image/... (Leave empty for vector icon)"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    If empty, the selected vector brand icon preset will be used automatically.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://google.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
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

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="brand-is-active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="brand-is-active" className="text-xs font-bold text-slate-800">
                    Visible in Homepage Marquee
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
                    {editingItem ? "Save Changes" : "Create Brand"}
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
