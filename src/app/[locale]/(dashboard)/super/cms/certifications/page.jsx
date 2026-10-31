"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  LuPlus,
  LuTrash2,
  LuPencil,
  LuLink,
  LuCheck,
  LuX,
  LuAward,
  LuShieldCheck,
  LuFileText,
  LuSearch,
  LuExternalLink,
  LuEye,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

const CATEGORY_SUGGESTIONS = [
  "ISO Quality Standard",
  "Government Accreditation",
  "Industry Validation",
  "Industry Affiliation",
  "Technical Education Board",
  "International Benchmark",
];

const initialFormState = {
  title: "",
  issuer: "",
  category: "ISO Quality Standard",
  credentialId: "",
  issueDate: "",
  expiryDate: "",
  description: "",
  image: "",
  verificationUrl: "",
  highlights: [],
  order: 0,
  isActive: true,
  isFeatured: false,
};

export default function CertificationsCMSPage() {
  const { locale = "en" } = useParams();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [highlightInput, setHighlightInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cms/certifications/admin");
      setCertifications(res.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load certifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        title: cert.title || "",
        issuer: cert.issuer || "",
        category: cert.category || "ISO Quality Standard",
        credentialId: cert.credentialId || "",
        issueDate: cert.issueDate || "",
        expiryDate: cert.expiryDate || "",
        description: cert.description || "",
        image: cert.image || "",
        verificationUrl: cert.verificationUrl || "",
        highlights: Array.isArray(cert.highlights) ? cert.highlights : [],
        order: cert.order !== undefined ? cert.order : 0,
        isActive: cert.isActive !== undefined ? cert.isActive : true,
        isFeatured: cert.isFeatured || false,
      });
    } else {
      setEditingCert(null);
      setFormData({
        ...initialFormState,
        order: certifications.length,
      });
    }
    setHighlightInput("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCert(null);
    setFormData(initialFormState);
    setHighlightInput("");
  };

  const addHighlight = () => {
    const val = highlightInput.trim();
    if (!val) return;
    if (formData.highlights.includes(val)) {
      toast.error("Highlight already added");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, val],
    }));
    setHighlightInput("");
  };

  const removeHighlight = (idx) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter certification title.");
      return;
    }
    if (!formData.issuer.trim()) {
      toast.error("Please enter issuing authority.");
      return;
    }
    if (!formData.image) {
      toast.error("Please upload or provide certificate document image.");
      return;
    }

    setSaving(true);
    const toastId = toast.loading(
      editingCert ? "Updating certification..." : "Creating certification..."
    );

    try {
      if (editingCert) {
        await api.put(`/cms/certifications/${editingCert._id}`, formData);
        toast.success("Certification updated successfully", { id: toastId });
      } else {
        await api.post("/cms/certifications", formData);
        toast.success("Certification added successfully", { id: toastId });
      }
      handleCloseModal();
      fetchCertifications();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Operation failed", {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cert) => {
    const confirmed = window.confirm(
      `Delete "${cert.title}"?\n\nThis will permanently remove this certificate from the public site.`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/cms/certifications/${cert._id}`);
      toast.success("Certification removed");
      fetchCertifications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete certification");
    }
  };

  const handleToggleStatus = async (cert) => {
    try {
      const res = await api.patch(`/cms/certifications/${cert._id}/toggle`);
      toast.success(res.data?.message || "Status updated");
      setCertifications((prev) =>
        prev.map((c) =>
          c._id === cert._id ? { ...c, isActive: !c.isActive } : c
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Filtered List
  const filteredCertifications = useMemo(() => {
    return certifications.filter((cert) => {
      const matchSearch =
        !searchQuery.trim() ||
        cert.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.credentialId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        filterCategory === "all" || cert.category === filterCategory;

      const matchStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && cert.isActive) ||
        (filterStatus === "inactive" && !cert.isActive);

      return matchSearch && matchCategory && matchStatus;
    });
  }, [certifications, searchQuery, filterCategory, filterStatus]);

  // Unique Categories for Filter
  const categories = useMemo(() => {
    const set = new Set();
    certifications.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [certifications]);

  // Summary Metrics
  const summary = useMemo(() => {
    return {
      total: certifications.length,
      active: certifications.filter((c) => c.isActive).length,
      featured: certifications.filter((c) => c.isFeatured).length,
      govIso: certifications.filter(
        (c) =>
          c.category?.toLowerCase().includes("iso") ||
          c.category?.toLowerCase().includes("gov") ||
          c.category?.toLowerCase().includes("bteb")
      ).length,
    };
  }, [certifications]);

  return (
    <div className="py-2.5 sm:py-3.5 space-y-4">
      {/* ── Page Header ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0">
              <LuShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Institutional Certifications
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage official ISO standards, government registrations &amp; board accreditations for /about/certifications.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/${locale}/about/certifications`}
            target="_blank"
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 rounded-lg transition-colors"
          >
            <LuExternalLink className="w-3.5 h-3.5" />
            Public Page
          </Link>

          <button
            onClick={() => handleOpenModal()}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <LuPlus className="w-4 h-4" />
            Add Certification
          </button>
        </div>
      </header>

      {/* ── KPI Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white dark:bg-slate-900 p-3 sm:p-3.5 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Total Certifications
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            {summary.total}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Registered on platform
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 sm:p-3.5 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Active on Public Page
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
            {summary.active}
          </h3>
          <p className="text-[11px] text-emerald-600/80 font-medium mt-0.5">
            Visible to visitors
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 sm:p-3.5 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Gov / ISO Approvals
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
            {summary.govIso}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Core authority standards
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 sm:p-3.5 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Featured Badges
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-pink-600 dark:text-pink-400 mt-0.5">
            {summary.featured}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Highlighted in showcase
          </p>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <LuSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, authority, credential ID, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-lg outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-lg outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Paused Only</option>
          </select>
        </div>
      </div>

      {/* ── Certifications Card Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : filteredCertifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <LuAward className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No certifications found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            {searchQuery
              ? "Try adjusting your search query or filters."
              : "Click 'Add Certification' to upload and configure your first institutional certification."}
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-slate-900 dark:bg-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm"
          >
            Add New Certification
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredCertifications.map((cert) => (
            <div
              key={cert._id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Certificate Scan / Document Preview Header */}
                <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-800 group/img">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={true}
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-1.5 p-4 text-center">
                      <LuFileText className="w-8 h-8 text-slate-600" />
                      <span className="text-xs font-medium">No document uploaded</span>
                    </div>
                  )}

                  {/* Soft overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10">
                    <span className="px-2 py-0.5 bg-slate-900/85 backdrop-blur-md text-white border border-white/10 text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                      {cert.category || "Accreditation"}
                    </span>

                    <button
                      onClick={() => handleToggleStatus(cert)}
                      title={cert.isActive ? "Click to Pause" : "Click to Activate"}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md backdrop-blur-md transition-all ${
                        cert.isActive
                          ? "bg-emerald-500/90 text-white shadow-xs"
                          : "bg-slate-800/90 text-slate-300 border border-slate-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          cert.isActive ? "bg-white" : "bg-slate-400"
                        }`}
                      />
                      {cert.isActive ? "Active" : "Paused"}
                    </button>
                  </div>

                  {/* Bottom Image Strip */}
                  <div className="absolute bottom-2 inset-x-2.5 flex items-end justify-between z-10">
                    <span className="text-[10px] font-mono font-bold text-slate-200 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm truncate max-w-[200px]">
                      {cert.credentialId || "No Reg No."}
                    </span>

                    {cert.image && (
                      <button
                        type="button"
                        onClick={() => setPreviewImage(cert.image)}
                        className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-md backdrop-blur-md transition-all shadow-sm"
                        title="Inspect Certificate Document"
                      >
                        <LuEye className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5 space-y-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] font-medium text-pink-600 dark:text-pink-400 truncate mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>

                  {cert.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {/* Metadata Row: Issue Date / Expiry */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <span>
                      Issued:{" "}
                      <strong className="text-slate-700 dark:text-slate-300">
                        {cert.issueDate || "N/A"}
                      </strong>
                    </span>
                    {cert.expiryDate && (
                      <span>
                        Valid:{" "}
                        <strong className="text-slate-700 dark:text-slate-300">
                          {cert.expiryDate}
                        </strong>
                      </span>
                    )}
                  </div>

                  {/* Highlights Tags */}
                  {cert.highlights && cert.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.highlights.slice(0, 3).map((hl, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 rounded font-medium truncate max-w-[150px]"
                        >
                          • {hl}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                      title="Open External Verification Link"
                    >
                      <LuExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <span className="text-[10px] text-slate-400 font-mono">
                    Order: {cert.order}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(cert)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md transition-all flex items-center gap-1"
                  >
                    <LuPencil className="w-3 h-3" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cert)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors"
                    title="Delete Certification"
                  >
                    <LuTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal: Add / Edit Certification ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0">
                    <LuAward className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {editingCert ? "Edit Certification" : "Add New Certification"}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Configure accreditation credentials &amp; upload certificate document scan.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Body */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                {/* 1. Upload Certificate Image */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 rounded-xl space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Certificate Document / Scan Photo <span className="text-red-500">*</span>
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Upload official certificate photo or PDF/scan (A4 Landscape or Portrait). This image is displayed on the public page instead of generic SVGs.
                  </p>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                    label="Upload / Paste Certificate Image URL"
                    aspect="video"
                  />
                </div>

                {/* 2. Core Identity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Certification Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. ISO 9001:2015 Quality Management"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Issuing Authority <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. International Organization for Standardization"
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                  </div>
                </div>

                {/* 3. Category & Credential ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Category
                    </label>
                    <input
                      list="category-suggestions"
                      placeholder="Select or type category..."
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-white rounded-lg outline-none"
                    />
                    <datalist id="category-suggestions">
                      {CATEGORY_SUGGESTIONS.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Credential / License No.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ISO-9001-2015-SYICT-BD"
                      value={formData.credentialId}
                      onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-white rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* 4. Dates & Verification URL */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Issue Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2023-03-15 or 2023"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-white rounded-lg outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Validity / Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2026-03-14 or Permanent"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-white rounded-lg outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* 5. Verification Link */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Online Verification / External Accreditation URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.iso.org/standard/..."
                    value={formData.verificationUrl}
                    onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-white rounded-lg outline-none"
                  />
                </div>

                {/* 6. Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Description &amp; Educational Impact
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation of the standard, audit rigor, and what this certificate means for students..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-white rounded-lg outline-none leading-relaxed"
                  />
                </div>

                {/* 7. Key Highlights Tags */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Key Highlights &amp; Trust Pillars
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add highlight (e.g. Standardized Curriculum, Annual Audits)..."
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addHighlight();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-white rounded-lg outline-none"
                    />
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg"
                    >
                      Add
                    </button>
                  </div>

                  {formData.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {formData.highlights.map((hl, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-semibold rounded-md flex items-center gap-1.5"
                        >
                          {hl}
                          <button
                            type="button"
                            onClick={() => removeHighlight(i)}
                            className="hover:text-red-500"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 8. Active & Featured Toggles */}
                <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Active (Visible on Website)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Featured in Hero Showcase
                    </span>
                  </label>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingCert ? "Update Certification" : "Publish Certification"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Document Full Preview Lightbox ── */}
      <AnimatePresence>
        {previewImage && (
          <div
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 bg-black/90 z-[1200] flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-[80vh]">
              <Image
                src={previewImage}
                alt="Certificate Document"
                fill
                unoptimized={true}
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-colors"
            >
              <LuX className="w-6 h-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
