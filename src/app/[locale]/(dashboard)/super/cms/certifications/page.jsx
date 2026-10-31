"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  LuPlus,
  LuTrash2,
  LuPencil,
  LuCheck,
  LuX,
  LuAward,
  LuShieldCheck,
  LuSearch,
  LuExternalLink,
  LuEye,
  LuGraduationCap,
  LuSparkles,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";
import OfficialCertificatePreview from "@/components/marketing/OfficialCertificatePreview";

const CATEGORY_SUGGESTIONS = [
  "Web & Software",
  "Design & Product",
  "Marketing & Growth",
  "Artificial Intelligence",
  "Mobile Development",
  "Cyber Security",
  "Data & Analytics",
  "Creative & Multimedia",
];

const initialFormState = {
  title: "",
  courseName: "",
  issuer: "Smart Youth ICT Academy • ISO 9001:2015 Audited",
  category: "Web & Software",
  credentialId: "",
  duration: "6 Months (240+ Hours)",
  issueDate: "Upon Course Completion & Project Defense",
  expiryDate: "Lifetime Professional Credential",
  description: "",
  image: "",
  verificationUrl: "https://www.smartyouthict.com/verify",
  skills: [],
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
  const [skillInput, setSkillInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [previewCert, setPreviewCert] = useState(null);

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
      toast.error("Failed to load certified courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        title: cert.title || "",
        courseName: cert.courseName || "",
        issuer: cert.issuer || "Smart Youth ICT Academy • ISO 9001:2015 Audited",
        category: cert.category || "Web & Software",
        credentialId: cert.credentialId || "",
        duration: cert.duration || "6 Months (240+ Hours)",
        issueDate: cert.issueDate || "Upon Course Completion & Project Defense",
        expiryDate: cert.expiryDate || "Lifetime Professional Credential",
        description: cert.description || "",
        image: cert.image || "",
        verificationUrl: cert.verificationUrl || "https://www.smartyouthict.com/verify",
        skills: Array.isArray(cert.skills) ? cert.skills : [],
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
    setSkillInput("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCert(null);
    setFormData(initialFormState);
    setSkillInput("");
  };

  const addSkill = () => {
    const val = skillInput.trim();
    if (!val) return;
    if (formData.skills.includes(val)) {
      toast.error("Skill already added");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, val],
    }));
    setSkillInput("");
  };

  const removeSkill = (idx) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
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

    setSaving(true);
    const toastId = toast.loading(
      editingCert ? "Updating certified course..." : "Creating certified course..."
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
      `Delete "${cert.title}"?\n\nThis will remove this certified course from the public certifications page.`
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
        cert.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // Unique Categories
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
      withCustomImage: certifications.filter((c) => c.image && c.image.trim().length > 0).length,
      dynamicMocks: certifications.filter((c) => !c.image || c.image.trim().length === 0).length,
    };
  }, [certifications]);

  return (
    <div className="py-2.5 sm:py-3.5 space-y-4 font-sans bg-white text-slate-900">
      {/* ── Page Header ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
              <LuGraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Course Certifications Management
              </h1>
              <p className="text-xs text-slate-500">
                Manage all certified course credentials awarded to students at Smart Youth ICT (/about/certifications).
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/${locale}/about/certifications`}
            target="_blank"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 rounded-lg transition-colors"
          >
            <LuExternalLink className="w-3.5 h-3.5" />
            Public Page
          </Link>

          <button
            onClick={() => handleOpenModal()}
            className="px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <LuPlus className="w-4 h-4" />
            Add Certified Track
          </button>
        </div>
      </header>

      {/* ── KPI Metrics Cards (Clean Light Theme) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Certified Courses
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {summary.total}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            Total course credentials
          </p>
        </div>

        <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Active on Public Site
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">
            {summary.active}
          </h3>
          <p className="text-[11px] text-emerald-600/80 font-medium mt-0.5">
            Visible to students
          </p>
        </div>

        <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Custom Uploaded Scans
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-blue-600 mt-0.5">
            {summary.withCustomImage}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            Custom certificate scans
          </p>
        </div>

        <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Auto-Generated Mocks
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-pink-600 mt-0.5">
            {summary.dynamicMocks}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            Dynamic official template
          </p>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white p-3 border border-slate-200 rounded-xl shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <LuSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by course, certification title, credential ID, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg outline-none"
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
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Paused Only</option>
          </select>
        </div>
      </div>

      {/* ── Certified Courses Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : filteredCertifications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <LuAward className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No certified course tracks found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            {searchQuery
              ? "Try adjusting your search query or category filters."
              : "Click 'Add Certified Track' to create your first certified course entry."}
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm"
          >
            Add New Certified Track
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCertifications.map((cert) => (
            <div
              key={cert._id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Certificate Visual Preview Frame */}
                <div className="p-2.5 bg-slate-50/60 border-b border-slate-100">
                  <OfficialCertificatePreview
                    cert={cert}
                    showFullDetails={false}
                    onClick={() => setPreviewCert(cert)}
                  />

                  {/* Mode Badge: Uploaded Image vs Dynamic Mock */}
                  <div className="flex items-center justify-between text-[10px] mt-2 px-1">
                    <span className="font-mono text-slate-400">
                      ID: {cert.credentialId || "N/A"}
                    </span>
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded ${
                        cert.image && cert.image.trim().length > 0
                          ? "bg-blue-50 text-blue-700"
                          : "bg-pink-50 text-pink-700"
                      }`}
                    >
                      {cert.image && cert.image.trim().length > 0
                        ? "Custom Uploaded Scan"
                        : "Official Mock Preview"}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="px-2 py-0.5 bg-pink-50 text-pink-700 text-[10px] font-bold uppercase rounded">
                        {cert.category || "Professional Track"}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 leading-snug mt-1 truncate">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                        Track: <strong className="text-slate-700">{cert.courseName || cert.title}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleStatus(cert)}
                      className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded transition-all shrink-0 ${
                        cert.isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {cert.isActive ? "Active" : "Paused"}
                    </button>
                  </div>

                  {cert.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {/* Validated Skills Tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 bg-slate-100 text-[10px] text-slate-700 font-medium rounded truncate max-w-[140px]"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="px-3.5 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 font-mono">
                  Order: {cert.order}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded transition-colors"
                    title="Preview Full Certificate"
                  >
                    <LuEye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenModal(cert)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded transition-all flex items-center gap-1"
                  >
                    <LuPencil className="w-3 h-3" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cert)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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

      {/* ── Modal: Add / Edit Certified Course Track ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                    <LuAward className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {editingCert ? "Edit Certified Track" : "Add Certified Course Track"}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Configure certificate credentials &amp; optional custom certificate scan.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Body */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                {/* 1. Custom Certificate Image (Optional with fallback guarantee) */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                      Custom Certificate Document / Scan (Optional)
                    </span>
                    <span className="text-[10px] font-semibold text-pink-600">
                      {formData.image ? "Custom Image Active" : "Dynamic Mock Will Display"}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal">
                    If you upload a custom certificate scan here, it will be displayed on the public page. If left empty, Smart Youth ICT&apos;s official dynamic certificate mock will automatically be generated with this course&apos;s title and skills. <strong>No empty image box is ever shown!</strong>
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
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Certificate Award Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Professional Full-Stack Web Engineering Certification"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Associated Course Track Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Full-Stack Web Engineering"
                      value={formData.courseName}
                      onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                  </div>
                </div>

                {/* 3. Category & Credential ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Category
                    </label>
                    <input
                      list="category-suggestions"
                      placeholder="Select or type category..."
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-lg outline-none"
                    />
                    <datalist id="category-suggestions">
                      {CATEGORY_SUGGESTIONS.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Credential ID Format / Serial
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SYICT-FSW-2026-CERT"
                      value={formData.credentialId}
                      onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono font-medium text-slate-800 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* 4. Issuing Body & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Issuing Authority
                    </label>
                    <input
                      type="text"
                      placeholder="Smart Youth ICT Academy • ISO 9001:2015 Audited"
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-lg outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Course Duration / Lab Hours
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 6 Months (240+ Hours Practical Lab)"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* 5. Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Certification Scope &amp; Career Impact
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Details about what this certification confirms, capstone project requirements, and industry job market value..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 rounded-lg outline-none leading-relaxed"
                  />
                </div>

                {/* 6. Validated Skills Tagger */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    Core Skills Validated on Certificate
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type skill (e.g. React.js, Next.js 15, Node.js API)..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 rounded-lg outline-none"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg"
                    >
                      Add
                    </button>
                  </div>

                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {formData.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold rounded-md flex items-center gap-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(i)}
                            className="hover:text-red-500 ml-0.5"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 7. Display Order & Status Flags */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 items-center">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-lg outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-4">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Active on Public Page
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer pt-4">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                    />
                    <span className="text-xs font-bold text-slate-700">
                      Featured in Showcase
                    </span>
                  </label>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
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

      {/* ── Document Full Preview Lightbox (Clean Light Theme) ── */}
      <AnimatePresence>
        {previewCert && (
          <div
            onClick={() => setPreviewCert(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[1200] flex items-center justify-center p-4 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-4 max-w-3xl w-full cursor-default border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <LuAward className="w-5 h-5 text-pink-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    {previewCert.title}
                  </h4>
                </div>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-1 text-slate-400 hover:text-slate-800 rounded"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              <OfficialCertificatePreview cert={previewCert} />

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Credential ID: {previewCert.credentialId}</span>
                <span>Track: {previewCert.courseName || previewCert.title}</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
