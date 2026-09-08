"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Portal from "@/components/ui/Portal";
import ImageUpload from "@/components/ui/ImageUpload";
import BranchCourseAssignModal from "@/components/branches/BranchCourseAssignModal";

const MapPicker = dynamic(() => import("@/components/ui/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
      Initializing Map Picker Engine...
    </div>
  ),
});

import {
  HiOutlineBuildingOffice,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineArrowTopRightOnSquare,
  HiOutlinePencilSquare,
  HiOutlineArrowDownTray,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiOutlineMegaphone,
  HiOutlineXMark,
  HiOutlineCheck,
} from "react-icons/hi2";
import { IoLogoWhatsapp } from "react-icons/io5";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const defaultHours = [
  { day: "Monday", open: "09:00", close: "18:00", isClosed: false },
  { day: "Tuesday", open: "09:00", close: "18:00", isClosed: false },
  { day: "Wednesday", open: "09:00", close: "18:00", isClosed: false },
  { day: "Thursday", open: "09:00", close: "18:00", isClosed: false },
  { day: "Friday", open: "09:00", close: "18:00", isClosed: false },
  { day: "Saturday", open: "09:00", close: "18:00", isClosed: true },
  { day: "Sunday", open: "09:00", close: "18:00", isClosed: true },
];

const DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
  "Other",
];

const SUGGESTED_FACILITIES = [
  "50+ Core-i7 PCs",
  "Full Air Conditioned",
  "Gigabit Fiber Wi-Fi",
  "1:1 Mentorship Desk",
  "Job Placement Cell",
  "Prayer Room",
  "Student Lounge & Cafeteria",
  "Hardware Lab",
  "High-Definition Projector",
];

export default function AllBranchesPage() {
  const { locale } = useParams();
  const [branches, setBranches] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("identity"); // 'identity', 'presence', 'channels', 'operations'

  // Dynamic Facilities Input Helper
  const [facilityInput, setFacilityInput] = useState("");

  // Module State
  const initialFormState = {
    name: "",
    code: "",
    type: "local",
    division: "Dhaka",
    establishedDate: "",
    logo: "",
    coverImage: "",
    gallery: [],
    facilities: [],
    notice: { title: "", text: "", isActive: false },
    website: "",
    address: { street: "", area: "", city: "", country: "Bangladesh" },
    location: { lat: "", long: "", googleMapsUrl: "" },
    contact: { email: "", phones: [""] },
    whatsapp: "",
    officeHours: defaultHours,
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingBranch, setEditingBranch] = useState(null);
  const [courseAssignBranch, setCourseAssignBranch] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await api.get("/super/branches");
      if (res.data?.success) {
        setBranches(res.data.data || []);
        if (res.data.summary) {
          setSummary(res.data.summary);
        }
      }
    } catch (err) {
      toast.error("Failed to load branches");
    } finally {
      setLoading(false);
    }
  };

  const updateNestedField = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const handleMapChange = useCallback((data) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        location: {
          ...prev.location,
          lat: data.lat,
          long: data.long,
          googleMapsUrl: `https://www.google.com/maps?q=${data.lat},${data.long}`,
        },
      };

      // Auto-fill address fields if reverse geocoding was successful
      if (data.address) {
        newData.address = {
          ...prev.address,
          street: data.address.street || prev.address.street,
          area: data.address.area || prev.address.area,
          city: data.address.city || prev.address.city,
        };
      }

      return newData;
    });
  }, []);

  // Dynamic Facility Tagger Helpers
  const addFacility = (fac) => {
    const trimmed = (fac || facilityInput).trim();
    if (!trimmed) return;
    if (formData.facilities.includes(trimmed)) {
      toast.error("Facility already added");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      facilities: [...prev.facilities, trimmed],
    }));
    setFacilityInput("");
  };

  const removeFacility = (index) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  // Multiple Phones Helpers
  const addPhoneField = () => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        phones: [...(prev.contact.phones || []), ""],
      },
    }));
  };

  const updatePhoneField = (index, value) => {
    setFormData((prev) => {
      const newPhones = [...(prev.contact.phones || [])];
      newPhones[index] = value;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          phones: newPhones,
        },
      };
    });
  };

  const removePhoneField = (index) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        phones: prev.contact.phones.filter((_, i) => i !== index),
      },
    }));
  };

  const handleOnboardOrUpdate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      editingBranch ? "Synchronizing branch metadata..." : "Onboarding new branch campus..."
    );

    try {
      const endpoint = editingBranch
        ? `/super/branches/${editingBranch._id}`
        : "/super/onboard-branch";
      const method = editingBranch ? "put" : "post";

      const res = await api[method](endpoint, formData);
      if (res.data?.success) {
        toast.success(
          editingBranch ? "Campus properties updated successfully" : "New campus onboarded!",
          { id: loadingToast }
        );
        setShowModal(false);
        setEditingBranch(null);
        setFormData(initialFormState);
        fetchBranches();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        id: loadingToast,
      });
    }
  };

  const handleToggleStatus = async (branch) => {
    const actionName = branch.isActive ? "Deactivate" : "Reactivate";
    if (
      !window.confirm(
        `Are you sure you want to ${actionName} "${branch.name}"? ${
          branch.isActive
            ? "Public visitors will no longer see this campus."
            : "This campus will become live on the public directory."
        }`
      )
    )
      return;

    try {
      const res = await api.patch(`/super/branches/${branch._id}/toggle-status`);
      if (res.data?.success) {
        toast.success(res.data.message || `Branch status updated`);
        fetchBranches();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle status");
    }
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);

    let lat = "";
    let long = "";
    if (branch.location?.type === "Point" && Array.isArray(branch.location.coordinates)) {
      long = branch.location.coordinates[0];
      lat = branch.location.coordinates[1];
    } else if (branch.location?.lat) {
      lat = branch.location.lat;
      long = branch.location.long;
    }

    setFormData({
      name: branch.name || "",
      code: branch.code || "",
      type: branch.type || "local",
      division: branch.division || "Dhaka",
      establishedDate: branch.establishedDate ? branch.establishedDate.split("T")[0] : "",
      logo: branch.logo || "",
      coverImage: branch.coverImage || "",
      gallery: Array.isArray(branch.gallery) ? branch.gallery : [],
      facilities: Array.isArray(branch.facilities) ? branch.facilities : [],
      notice: branch.notice || { title: "", text: "", isActive: false },
      website: branch.website || "",
      address: branch.address || { street: "", area: "", city: "", country: "Bangladesh" },
      location: {
        lat,
        long,
        googleMapsUrl: branch.location?.googleMapsUrl || "",
      },
      contact: {
        email: branch.contact?.email || "",
        phones: branch.contact?.phones?.length ? branch.contact.phones : [""],
      },
      whatsapp: branch.whatsapp || "",
      officeHours: branch.officeHours?.length ? branch.officeHours : defaultHours,
      adminName: "",
      adminEmail: "",
      adminPassword: "",
    });
    setActiveTab("identity");
    setShowModal(true);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!branches.length) {
      toast.error("No branches to export");
      return;
    }

    const headers = ["Name", "Code", "Type", "Division", "City", "Email", "Phone", "Status", "Students", "Courses"];
    const rows = branches.map((b) => [
      `"${b.name}"`,
      `"${b.code}"`,
      `"${b.type}"`,
      `"${b.division || ""}"`,
      `"${b.address?.city || ""}"`,
      `"${b.contact?.email || ""}"`,
      `"${b.contact?.phones?.[0] || ""}"`,
      b.isActive ? "Active" : "Inactive",
      b.stats?.students || 0,
      b.stats?.courses || 0,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `syict_branch_network_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Branch network exported to CSV");
  };

  // Filtered branches
  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      // Search
      const matchesSearch =
        b.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.code?.toLowerCase().includes(search.toLowerCase()) ||
        b.address?.city?.toLowerCase().includes(search.toLowerCase()) ||
        b.division?.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Filter type
      if (filterType === "active") return b.isActive;
      if (filterType === "inactive") return !b.isActive;
      if (filterType === "head_office") return b.type === "head_office";
      if (filterType === "regional") return b.type === "regional";
      if (filterType === "local") return b.type === "local";

      return true;
    });
  }, [branches, search, filterType]);

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: branches.length,
      active: branches.filter((b) => b.isActive).length,
      inactive: branches.filter((b) => !b.isActive).length,
      head_office: branches.filter((b) => b.type === "head_office").length,
      regional: branches.filter((b) => b.type === "regional").length,
      local: branches.filter((b) => b.type === "local").length,
    };
  }, [branches]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-gradient-to-tr from-pink-600 to-rose-500 text-white rounded-2xl shadow-lg shadow-pink-500/20">
              <HiOutlineBuildingOffice size={26} />
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Branch Network Command
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
                Manage global SYICT campuses, physical labs, operational hours & lead channels.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <HiOutlineArrowDownTray size={16} /> Export CSV
          </button>

          {/* View Public Directory */}
          <Link
            href={`/${locale}/branches`}
            target="_blank"
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <HiOutlineArrowTopRightOnSquare size={16} /> Public Page
          </Link>

          {/* Onboard Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEditingBranch(null);
              setFormData(initialFormState);
              setActiveTab("identity");
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-slate-900 dark:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-900/20 dark:shadow-pink-600/20 hover:bg-slate-800 transition-all text-xs uppercase tracking-wider"
          >
            <HiOutlinePlus size={18} />
            Onboard Campus
          </motion.button>
        </div>
      </header>

      {/* ── Real Global Network KPI Cards ── */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div
          variants={item}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Network Footprint
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {summary?.totalBranches ?? branches.length}
              </h3>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {summary?.activeBranches ?? branches.filter((b) => b.isActive).length} Live Campuses
              </p>
            </div>
            <div className="p-3 bg-pink-50 dark:bg-pink-900/20 text-pink-600 rounded-xl">
              <HiOutlineBuildingOffice size={22} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Branch Students
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {summary?.totalStudents ?? 0}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Offline & hybrid enrollments
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
              <HiOutlineUsers size={22} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Course Deployments
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {summary?.totalCourses ?? 0}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Active syllabus allocations
              </p>
            </div>
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 text-violet-600 rounded-xl">
              <HiOutlineAcademicCap size={22} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Network Status
              </span>
              <h3 className="text-2xl font-black text-emerald-600">
                100% Operational
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                All hubs synced with database
              </p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl">
              <HiOutlineShieldCheck size={22} />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Main Directory Section ── */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Controls Bar */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/40 dark:bg-slate-800/40">
          {/* Functional Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All" },
              { id: "active", label: "Active" },
              { id: "inactive", label: "Inactive" },
              { id: "head_office", label: "HQ" },
              { id: "regional", label: "Regional" },
              { id: "local", label: "Local" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                  filterType === t.id
                    ? "bg-slate-900 text-white dark:bg-pink-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    filterType === t.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {tabCounts[t.id] ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <HiOutlineMagnifyingGlass
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search campuses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Campus & Identity</th>
                <th className="px-6 py-4">Division & Address</th>
                <th className="px-6 py-4">Contact & WhatsApp</th>
                <th className="px-6 py-4 text-center">Metrics</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-6 h-16">
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3" />
                    </td>
                  </tr>
                ))
              ) : filteredBranches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                    No campuses found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBranches.map((branch) => (
                  <tr
                    key={branch._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    {/* Identity */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center font-black text-xs text-slate-500 shrink-0 relative">
                          {branch.logo ? (
                            <Image
                              src={branch.logo}
                              alt={branch.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            branch.code
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-slate-800 dark:text-white leading-tight">
                              {branch.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider ${
                                branch.type === "head_office"
                                  ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}
                            >
                              {branch.type?.replace("_", " ")}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-400">
                            {branch.code}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Address & Division */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                          {branch.division || "Dhaka"}
                        </span>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 line-clamp-1 pt-1">
                          {branch.address?.area || branch.address?.street || "—"}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <HiOutlineMapPin size={12} />
                          {branch.address?.city || "Bangladesh"}
                        </p>
                      </div>
                    </td>

                    {/* Contact & WhatsApp */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {branch.contact?.email && (
                          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                            <HiOutlineEnvelope size={14} className="text-slate-400" />
                            <span className="truncate max-w-[140px]">{branch.contact.email}</span>
                          </div>
                        )}
                        {branch.contact?.phones?.[0] && (
                          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                            <HiOutlinePhone size={14} className="text-slate-400" />
                            <span>{branch.contact.phones[0]}</span>
                          </div>
                        )}
                        {branch.whatsapp && (
                          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                            <IoLogoWhatsapp size={13} />
                            <span>{branch.whatsapp}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Metrics */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4 text-center">
                        <div>
                          <div className="text-sm font-black text-slate-800 dark:text-white">
                            {branch.stats?.students || 0}
                          </div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                            Students
                          </div>
                        </div>
                        <button
                          onClick={() => setCourseAssignBranch(branch)}
                          title="Click to assign or manage courses for this branch"
                          className="group/course text-center hover:opacity-80 transition-opacity"
                        >
                          <div className="text-sm font-black text-violet-600 dark:text-violet-400 group-hover/course:underline flex items-center justify-center gap-1">
                            <HiOutlineAcademicCap size={14} />
                            {branch.stats?.courses || 0}
                          </div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                            Courses
                          </div>
                        </button>
                      </div>
                    </td>

                    {/* Status with 1-Click Toggle */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(branch)}
                        title={branch.isActive ? "Click to Deactivate" : "Click to Reactivate"}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                          branch.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            branch.isActive ? "bg-emerald-500 animate-ping" : "bg-slate-400"
                          }`}
                        />
                        {branch.isActive ? "Active" : "Paused"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Jump into Branch Admin Dashboard */}
                        <Link
                          href={`/${locale}/${branch._id}/admin`}
                          target="_blank"
                          title="Open Campus Admin Dashboard"
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <HiOutlineBuildingOffice size={18} />
                        </Link>

                        {/* Assign & Manage Courses */}
                        <button
                          onClick={() => setCourseAssignBranch(branch)}
                          title="Assign & Manage Courses for this Campus"
                          className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <HiOutlineAcademicCap size={18} />
                        </button>

                        {/* Edit properties */}
                        <button
                          onClick={() => handleEditBranch(branch)}
                          title="Edit Campus Metadata"
                          className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <HiOutlinePencilSquare size={18} />
                        </button>

                        {/* View on Public Page */}
                        <Link
                          href={`/${locale}/branches#branch-card-${branch._id}`}
                          target="_blank"
                          title="View on Public Directory"
                          className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <HiOutlineArrowTopRightOnSquare size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View Card List */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            ))
          ) : (
            filteredBranches.map((branch) => (
              <div
                key={branch._id}
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">
                      {branch.code}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {branch.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {branch.division} • {branch.address?.city}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleStatus(branch)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      branch.isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {branch.isActive ? "Active" : "Paused"}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-slate-500 font-medium">
                    <strong className="text-slate-800 dark:text-white font-bold">{branch.stats?.students || 0}</strong> Students •{" "}
                    <strong className="text-slate-800 dark:text-white font-bold">{branch.stats?.courses || 0}</strong> Courses
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setCourseAssignBranch(branch)}
                      className="flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 bg-violet-50 hover:bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                      aria-label={`Manage courses for ${branch.name}`}
                    >
                      <HiOutlineAcademicCap size={16} />
                      Courses
                    </button>
                    <button
                      onClick={() => handleEditBranch(branch)}
                      className="flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95"
                      aria-label={`Edit campus ${branch.name}`}
                    >
                      <HiOutlinePencilSquare size={16} />
                      Edit
                    </button>
                    <Link
                      href={`/${locale}/${branch._id}/admin`}
                      target="_blank"
                      className="flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95"
                      aria-label={`Admin dashboard for ${branch.name}`}
                    >
                      Admin
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── 4-Tab Premium Onboarding & Edit Modal ── */}
      <Portal>
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 dark:border-slate-800"
              >
                {/* Modal Header */}
                <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/50 dark:bg-slate-800/50">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {editingBranch ? `Refine Campus: ${editingBranch.name}` : "Onboard New Campus"}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Configure facilities, geospatial coordinates, lead channels, and operational hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors"
                  >
                    <HiOutlineXMark size={20} />
                  </button>
                </div>

                {/* Modal 4 Tabs */}
                <div className="px-6 py-2.5 flex gap-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar bg-slate-50/20">
                  {[
                    { id: "identity", label: "Identity & Media", icon: HiOutlineGlobeAlt },
                    { id: "presence", label: "Geospatial & Map", icon: HiOutlineMapPin },
                    { id: "channels", label: "Contact & Leads", icon: HiOutlineEnvelope },
                    { id: "operations", label: "Weekly Schedule", icon: HiOutlineClock },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                        activeTab === t.id
                          ? "bg-slate-900 dark:bg-pink-600 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      <t.icon size={16} />
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  <form id="branch-manage-form" onSubmit={handleOnboardOrUpdate}>
                    {/* ── TAB 1: IDENTITY & MEDIA ── */}
                    {activeTab === "identity" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Branch / Campus Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Rangpur City Campus"
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Branch Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              required
                              value={formData.code}
                              onChange={(e) =>
                                setFormData({ ...formData, code: e.target.value.toUpperCase() })
                              }
                              placeholder="e.g. SYICT-001"
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Branch Type
                            </label>
                            <select
                              value={formData.type}
                              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                            >
                              <option value="local">Local Campus</option>
                              <option value="regional">Regional Hub</option>
                              <option value="head_office">Head Office</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Division
                            </label>
                            <select
                              value={formData.division}
                              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                            >
                              {DIVISIONS.map((div) => (
                                <option key={div} value={div}>
                                  {div}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Established Date
                            </label>
                            <input
                              type="date"
                              value={formData.establishedDate}
                              onChange={(e) =>
                                setFormData({ ...formData, establishedDate: e.target.value })
                              }
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                          </div>
                        </div>

                        {/* Media: Logo & Cover Image (Dual Mode: Device Upload + Web Link) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                          <ImageUpload
                            label="Branch Logo / Badge"
                            value={formData.logo}
                            onChange={(url) => setFormData((prev) => ({ ...prev, logo: url }))}
                            aspect="square"
                          />

                          <ImageUpload
                            label="Campus Cover Photo (Displayed on Public Directory)"
                            value={formData.coverImage}
                            onChange={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
                            aspect="video"
                          />
                        </div>

                        {/* Campus Photo Gallery (Device Upload or Link) */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <HiOutlineSparkles className="text-pink-600" />
                              Campus Photo Gallery ({formData.gallery?.length || 0} photos)
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Upload lab, classroom & reception photos
                            </span>
                          </div>

                          <ImageUpload
                            label="Add Photo to Campus Gallery (Device or Link)"
                            value=""
                            onChange={(url) => {
                              if (url) {
                                setFormData((prev) => ({
                                  ...prev,
                                  gallery: [...(prev.gallery || []), url],
                                }));
                              }
                            }}
                            aspect="video"
                          />

                          {formData.gallery && formData.gallery.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                              {formData.gallery.map((imgUrl, i) => (
                                <div
                                  key={i}
                                  className="relative aspect-video rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 group bg-slate-100 dark:bg-slate-800"
                                >
                                  <picture>
                                    <img
                                      src={imgUrl}
                                      alt={`Campus photo ${i + 1}`}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/images/placeholder.png";
                                      }}
                                    />
                                  </picture>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        gallery: prev.gallery.filter((_, idx) => idx !== i),
                                      }))
                                    }
                                    className="absolute top-1.5 right-1.5 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110"
                                    title="Remove Photo"
                                  >
                                    <HiOutlineXMark size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Dynamic Facilities Tagger */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              <HiOutlineSparkles className="text-pink-600" />
                              Campus Facilities & Infrastructure Tags
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {formData.facilities.length} active tags
                            </span>
                          </div>

                          {/* Custom Input */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Type custom facility (e.g. 50+ High-End PCs, 1:1 Mentorship)..."
                              value={facilityInput}
                              onChange={(e) => setFacilityInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addFacility();
                                }
                              }}
                              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => addFacility()}
                              className="px-4 py-2 bg-slate-900 dark:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90"
                            >
                              Add
                            </button>
                          </div>

                          {/* Quick Suggestions */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="text-[10px] font-bold text-slate-400 self-center mr-1">
                              Suggestions:
                            </span>
                            {SUGGESTED_FACILITIES.filter(
                              (s) => !formData.facilities.includes(s)
                            ).map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => addFacility(s)}
                                className="px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:border-pink-500 hover:text-pink-600 transition-colors"
                              >
                                + {s}
                              </button>
                            ))}
                          </div>

                          {/* Active Tags */}
                          {formData.facilities.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                              {formData.facilities.map((fac, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-xl text-xs font-bold flex items-center gap-1.5"
                                >
                                  {fac}
                                  <button
                                    type="button"
                                    onClick={() => removeFacility(idx)}
                                    className="hover:text-red-500 ml-1"
                                  >
                                    &times;
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Announcement / Notice Banner */}
                        <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                              <HiOutlineMegaphone size={16} /> Campus Notice / Announcement
                            </span>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                                Show on Public Card
                              </span>
                              <input
                                type="checkbox"
                                checked={formData.notice?.isActive || false}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    notice: { ...formData.notice, isActive: e.target.checked },
                                  })
                                }
                                className="w-4 h-4 rounded text-pink-600 focus:ring-pink-500"
                              />
                            </label>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Notice Title (e.g. Batch 14 Admissions Open)"
                              value={formData.notice?.title || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  notice: { ...formData.notice, title: e.target.value },
                                })
                              }
                              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none dark:text-white"
                            />
                            <input
                              type="text"
                              placeholder="Notice Text (e.g. 20% discount on offline registrations)"
                              value={formData.notice?.text || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  notice: { ...formData.notice, text: e.target.value },
                                })
                              }
                              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium outline-none dark:text-white"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── TAB 2: GEOSPATIAL & MAP ── */}
                    {activeTab === "presence" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Street Address
                            </label>
                            <input
                              value={formData.address.street}
                              onChange={(e) => updateNestedField("address", "street", e.target.value)}
                              placeholder="e.g. Holding 14/B, Main Road"
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Area / Sector
                            </label>
                            <input
                              value={formData.address.area}
                              onChange={(e) => updateNestedField("address", "area", e.target.value)}
                              placeholder="e.g. Modern More"
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              City / District
                            </label>
                            <input
                              value={formData.address.city}
                              onChange={(e) => updateNestedField("address", "city", e.target.value)}
                              placeholder="e.g. Rangpur"
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Country
                            </label>
                            <input
                              value={formData.address.country}
                              onChange={(e) => updateNestedField("address", "country", e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-xs text-slate-800 dark:text-white outline-none"
                            />
                          </div>
                        </div>

                        {/* OSM Interactive Leaflet MapPicker */}
                        <div className="p-4 bg-blue-50/50 dark:bg-slate-800/40 rounded-2xl border border-blue-100 dark:border-slate-700 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                              <HiOutlineMapPin size={16} /> Interactive Map Location Pin
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">
                              Click or search to pin exact campus coordinates
                            </span>
                          </div>

                          <MapPicker
                            value={{
                              lat: formData.location.lat,
                              long: formData.location.long,
                            }}
                            onChange={handleMapChange}
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                Latitude
                              </label>
                              <input
                                value={formData.location.lat}
                                onChange={(e) => updateNestedField("location", "lat", e.target.value)}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs font-mono dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                Longitude
                              </label>
                              <input
                                value={formData.location.long}
                                onChange={(e) => updateNestedField("location", "long", e.target.value)}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs font-mono dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                Google Maps Deep Link
                              </label>
                              <input
                                value={formData.location.googleMapsUrl}
                                onChange={(e) =>
                                  updateNestedField("location", "googleMapsUrl", e.target.value)
                                }
                                placeholder="https://maps.app.goo.gl/..."
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── TAB 3: CONTACT & CHANNELS ── */}
                    {activeTab === "channels" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Official Campus Email
                            </label>
                            <input
                              type="email"
                              value={formData.contact?.email}
                              onChange={(e) => updateNestedField("contact", "email", e.target.value)}
                              placeholder="branch@smartyouthict.com"
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Official WhatsApp Number (For Direct Student Chat)
                            </label>
                            <input
                              value={formData.whatsapp}
                              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                              placeholder="017XXXXXXXX or +88017XXXXXXXX"
                              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                        </div>

                        {/* Multiple Phone Numbers */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                              Campus Hotlines / Phone Numbers
                            </label>
                            <button
                              type="button"
                              onClick={addPhoneField}
                              className="text-[10px] font-bold text-pink-600 hover:underline uppercase"
                            >
                              + Add Another Phone
                            </button>
                          </div>

                          {formData.contact?.phones?.map((phone, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                value={phone}
                                onChange={(e) => updatePhoneField(idx, e.target.value)}
                                placeholder="e.g. 01722-550012"
                                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold text-xs text-slate-800 dark:text-white outline-none"
                              />
                              {formData.contact.phones.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removePhoneField(idx)}
                                  className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
                                >
                                  &times;
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                            Campus Website (Optional)
                          </label>
                          <input
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://smartyouthict.com/branches/..."
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-medium text-xs text-slate-800 dark:text-white outline-none"
                          />
                        </div>

                        {/* Admin Onboarding Fields if Creating New Branch */}
                        {!editingBranch && (
                          <div className="p-4 bg-pink-50/50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/30 space-y-3 mt-4">
                            <span className="text-xs font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                              <HiOutlineShieldCheck size={16} /> Initial Branch Administrator Account
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                placeholder="Admin Full Name"
                                value={formData.adminName}
                                onChange={(e) =>
                                  setFormData({ ...formData, adminName: e.target.value })
                                }
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold outline-none dark:text-white"
                              />
                              <input
                                type="email"
                                placeholder="admin.email@syict.com"
                                value={formData.adminEmail}
                                onChange={(e) =>
                                  setFormData({ ...formData, adminEmail: e.target.value })
                                }
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold outline-none dark:text-white"
                              />
                              <input
                                type="password"
                                placeholder="Temporary Password"
                                value={formData.adminPassword}
                                onChange={(e) =>
                                  setFormData({ ...formData, adminPassword: e.target.value })
                                }
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold outline-none dark:text-white"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* ── TAB 4: OPERATIONS & WEEKLY SCHEDULE ── */}
                    {activeTab === "operations" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            Weekly Operating Hours (Calculates Live Open/Closed Status on Public Directory)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {formData.officeHours.map((oh, idx) => (
                            <div
                              key={oh.day}
                              className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60"
                            >
                              <div className="w-24 font-black text-slate-800 dark:text-white text-xs uppercase tracking-tight">
                                {oh.day}
                              </div>

                              <div className="flex-1 flex items-center gap-2">
                                <input
                                  type="time"
                                  value={oh.open}
                                  disabled={oh.isClosed}
                                  onChange={(e) => {
                                    const newHours = [...formData.officeHours];
                                    newHours[idx].open = e.target.value;
                                    setFormData({ ...formData, officeHours: newHours });
                                  }}
                                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 text-xs font-bold disabled:opacity-30 dark:text-white"
                                />
                                <span className="text-slate-400 text-xs font-bold">to</span>
                                <input
                                  type="time"
                                  value={oh.close}
                                  disabled={oh.isClosed}
                                  onChange={(e) => {
                                    const newHours = [...formData.officeHours];
                                    newHours[idx].close = e.target.value;
                                    setFormData({ ...formData, officeHours: newHours });
                                  }}
                                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 text-xs font-bold disabled:opacity-30 dark:text-white"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const newHours = [...formData.officeHours];
                                  newHours[idx].isClosed = !newHours[idx].isClosed;
                                  setFormData({ ...formData, officeHours: newHours });
                                }}
                                className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                  oh.isClosed
                                    ? "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                }`}
                              >
                                {oh.isClosed ? "Closed" : "Open"}
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>

                {/* Modal Footer with Safe Area */}
                <div className="p-4 sm:p-6 pt-3 sm:pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="text-xs text-slate-400 font-bold hidden sm:block">
                    Tab {activeTab === "identity" ? "1" : activeTab === "presence" ? "2" : activeTab === "channels" ? "3" : "4"} of 4
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 sm:flex-none min-h-[44px] px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors active:scale-95 flex items-center justify-center"
                    >
                      Cancel
                    </button>
                    <button
                      form="branch-manage-form"
                      type="submit"
                      className="flex-1 sm:flex-none min-h-[44px] px-6 py-2.5 bg-slate-900 dark:bg-pink-600 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center justify-center"
                    >
                      {editingBranch ? "Save Changes" : "Finalize Onboarding"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Course Assignment Modal */}
      <AnimatePresence>
        {courseAssignBranch && (
          <BranchCourseAssignModal
            branch={courseAssignBranch}
            onClose={() => setCourseAssignBranch(null)}
            onSuccess={fetchBranches}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
