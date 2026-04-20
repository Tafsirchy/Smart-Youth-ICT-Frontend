"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Portal from "@/components/ui/Portal";

const MapPicker = dynamic(() => import("@/components/ui/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-[32px] flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
      Initializing Secure Map Engine...
    </div>
  ),
});
import {
  HiOutlineBuildingOffice,
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlineEllipsisVertical,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineTrash,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
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

export default function AllBranchesPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("identity"); // For the onboarding modal

  // Module State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "local",
    establishedDate: "",
    logo: "",
    website: "",
    address: { street: "", area: "", city: "", country: "Bangladesh" },
    location: { lat: "", long: "", googleMapsUrl: "" },
    contact: { email: "", phones: [""] },
    officeHours: defaultHours,
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });
  const [editingBranch, setEditingBranch] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await api.get("/super/branches");
      if (res.data?.success) setBranches(res.data.data);
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

  const handleOnboard = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      editingBranch
        ? "Synchronizing branch metadata..."
        : "Establishing new branch location...",
    );
    try {
      const endpoint = editingBranch
        ? `/super/branches/${editingBranch._id}`
        : "/super/onboard-branch";
      const method = editingBranch ? "put" : "post";

      const res = await api[method](endpoint, formData);
      if (res.data?.success) {
        toast.success(
          editingBranch ? "Infrastructure updated" : "Location onboarded",
          { id: loadingToast },
        );
        setShowModal(false);
        setEditingBranch(null);
        fetchBranches();
        setFormData({
          name: "",
          code: "",
          type: "local",
          establishedDate: "",
          logo: "",
          website: "",
          address: { street: "", area: "", city: "", country: "Bangladesh" },
          location: { lat: "", long: "", googleMapsUrl: "" },
          contact: { email: "", phones: [""] },
          officeHours: defaultHours,
          adminName: "",
          adminEmail: "",
          adminPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        id: loadingToast,
      });
    }
  };

  const handleDeactivate = async (branch) => {
    if (
      !window.confirm(
        `Are you sure you want to deactivate ${branch.name}? All branch-specific operations will be suspended.`,
      )
    )
      return;
    try {
      const res = await api.delete(`/super/branches/${branch._id}`);
      if (res.data?.success) {
        toast.success("Branch status updated to Inactive");
        fetchBranches();
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredBranches = branches.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4"
          >
            <span className="p-3 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-500/20">
              <HiOutlineBuildingOffice size={32} />
            </span>
            Branch Network
          </motion.h1>
          <p className="mt-4 text-slate-500 font-medium max-w-md">
            The infrastructure of SYICT. High-fidelity management of global
            locations, performance metrics, and operational hours.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
            <input
              type="text"
              placeholder="Search network..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl w-full md:w-64 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none font-medium text-slate-700 shadow-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setFormData({ ...formData, officeHours: defaultHours });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all text-sm whitespace-nowrap"
          >
            <HiOutlinePlus size={20} />
            Onboard Branch
          </motion.button>
        </div>
      </header>

      {/* Grid Overview */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {branches.slice(0, 3).map((branch, idx) => (
          <motion.div
            key={branch._id}
            variants={item}
            className="relative overflow-hidden group bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${idx === 0 ? "bg-pink-500" : idx === 1 ? "bg-blue-500" : "bg-emerald-500"}`}
            />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full mb-3 inline-block">
                  {branch.code} • {branch.type?.replace("_", " ")}
                </span>
                <h3 className="text-xl font-black text-slate-800 group-hover:text-pink-600 transition-colors line-clamp-1">
                  {branch.name}
                </h3>
              </div>
              <div
                className={`p-3 rounded-2xl ${branch.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"}`}
              >
                {branch.isActive ? (
                  <HiOutlineShieldCheck size={20} />
                ) : (
                  <HiOutlineShieldExclamation size={20} />
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <HiOutlineMapPin size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Location
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    {branch.address?.city || "HQ"}
                  </p>
                </div>
              </div>

              <a
                href={branch.location?.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-all opacity-0 group-hover:opacity-100"
              >
                <HiOutlineArrowTopRightOnSquare size={16} />
              </a>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  Established
                </p>
                <p className="text-sm font-black text-slate-700">
                  {branch.establishedDate
                    ? new Date(branch.establishedDate).getFullYear()
                    : "2024"}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  Students
                </p>
                <p className="text-sm font-black text-slate-700">
                  {branch.stats?.students || 0}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Main Directory Table */}
      <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <h2 className="text-xl font-black text-slate-900">
            Infrastructure Directory
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
              {["All", "HQ", "Active"].map((f) => (
                <button
                  key={f}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all ${f === "All" ? "bg-white shadow-sm text-slate-900" : "text-slate-400"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Branch Identity
                </th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Presence
                </th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Contact & Social
                </th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {loading
                  ? [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={4} className="px-10 py-6 h-20">
                          <div className="h-4 bg-slate-100 rounded-full w-3/4 mx-auto" />
                        </td>
                      </tr>
                    ))
                  : filteredBranches.map((branch) => (
                      <motion.tr
                        layout
                        key={branch._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-slate-50/40 transition-colors"
                      >
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-pink-100 group-hover:text-pink-600 transition-all overflow-hidden">
                              {branch.logo ? (
                                <Image
                                  src={branch.logo}
                                  alt={branch.name || "Branch logo"}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                branch.code
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-700">
                                {branch.name}
                              </p>
                              <span
                                className={`inline-block px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                  branch.type === "head_office"
                                    ? "bg-amber-100 text-amber-600"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {branch.type?.replace("_", " ")}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="space-y-1">
                            <p className="text-xs text-slate-600 font-bold">
                              {branch.address?.area || "Not Set"}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                              <HiOutlineMapPin /> {branch.address?.city},{" "}
                              {branch.address?.country}
                            </p>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                              <HiOutlineEnvelope className="text-slate-300" />
                              {branch.contact?.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <a
                                href={branch.location?.googleMapsUrl}
                                target="_blank"
                                className="p-1 px-2 bg-slate-100 text-[10px] font-black text-slate-400 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-1.5"
                              >
                                <HiOutlineArrowTopRightOnSquare size={12} />{" "}
                                Google Maps
                              </a>
                              {branch.website && (
                                <a
                                  href={branch.website}
                                  className="p-1 px-2 bg-slate-100 text-[10px] font-black text-slate-400 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-all"
                                >
                                  Website
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingBranch(branch);
                                setFormData({
                                  name: branch.name,
                                  code: branch.code,
                                  type: branch.type,
                                  establishedDate:
                                    branch.establishedDate?.split("T")[0],
                                  logo: branch.logo,
                                  website: branch.website,
                                  address: branch.address || {
                                    street: "",
                                    area: "",
                                    city: "",
                                    country: "Bangladesh",
                                  },
                                  location:
                                    branch.location?.type === "Point" &&
                                    branch.location.coordinates
                                      ? {
                                          lat: branch.location.coordinates[1],
                                          long: branch.location.coordinates[0],
                                          googleMapsUrl:
                                            branch.location.googleMapsUrl,
                                        }
                                      : branch.location || {
                                          lat: "",
                                          long: "",
                                          googleMapsUrl: "",
                                        },
                                  contact: branch.contact || {
                                    email: "",
                                    phones: [""],
                                  },
                                  officeHours: branch.officeHours?.length
                                    ? branch.officeHours
                                    : defaultHours,
                                  adminName: "",
                                  adminEmail: "",
                                  adminPassword: "",
                                });
                                setShowModal(true);
                              }}
                              className="p-2 hover:bg-white hover:text-slate-900 rounded-xl text-slate-300 transition-all"
                            >
                              <HiOutlinePencilSquare size={18} />
                            </button>
                            <button
                              onClick={() => handleDeactivate(branch)}
                              className="p-2 hover:bg-white hover:text-red-500 rounded-xl text-slate-300 transition-all"
                            >
                              <HiOutlineTrash size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </section>

      {/* Premium Onboarding Modal */}
      <Portal>
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative z-[10000]"
              >
                {/* Modal Header */}
                <div className="p-10 pb-6 border-b border-slate-50 flex justify-between items-start bg-slate-50/10">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      {editingBranch
                        ? "Refine Infrastructure"
                        : "Onboard Strategic Location"}
                    </h2>
                    <p className="text-slate-400 font-medium mt-1">
                      {editingBranch
                        ? `Modifying properties for ${editingBranch.code}`
                        : "Expanding the global SYICT footprint."}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-all"
                  >
                    &times;
                  </button>
                </div>

                {/* Modal Tabs */}
                <div className="px-10 py-4 flex gap-8 border-b border-slate-50">
                  {[
                    {
                      id: "identity",
                      label: "Identity",
                      icon: HiOutlineGlobeAlt,
                    },
                    {
                      id: "presence",
                      label: "Presence",
                      icon: HiOutlineMapPin,
                    },
                    {
                      id: "operations",
                      label: "Operations",
                      icon: HiOutlineClock,
                    },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center gap-2 pb-4 border-b-2 transition-all text-xs font-black uppercase tracking-widest ${
                        activeTab === t.id
                          ? "border-pink-500 text-pink-600"
                          : "border-transparent text-slate-300 hover:text-slate-500"
                      }`}
                    >
                      <t.icon size={16} />
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                  <form
                    id="onboard-form"
                    onSubmit={handleOnboard}
                    className="space-y-8"
                  >
                    {activeTab === "identity" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Branch Name
                            </label>
                            <input
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Branch Code (Unique ID)
                            </label>
                            <input
                              required
                              value={formData.code}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  code: e.target.value.toUpperCase(),
                                })
                              }
                              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Branch Type
                            </label>
                            <select
                              value={formData.type}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  type: e.target.value,
                                })
                              }
                              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
                            >
                              <option value="local">Local Branch</option>
                              <option value="regional">Regional Hub</option>
                              <option value="head_office">Head Office</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Established Date
                            </label>
                            <input
                              type="date"
                              value={formData.establishedDate}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  establishedDate: e.target.value,
                                })
                              }
                              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
                            />
                          </div>
                        </div>
                        {!editingBranch && (
                          <div className="p-8 bg-pink-50/50 rounded-[2rem] border border-pink-100/50 space-y-6">
                            <h4 className="text-xs font-black text-pink-600 uppercase tracking-widest flex items-center gap-2">
                              <HiOutlineShieldCheck /> Account Security
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  Primary admin name
                                </label>
                                <input
                                  required
                                  value={formData.adminName}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      adminName: e.target.value,
                                    })
                                  }
                                  className="w-full bg-white border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  Primary admin Email
                                </label>
                                <input
                                  required
                                  type="email"
                                  value={formData.adminEmail}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      adminEmail: e.target.value,
                                    })
                                  }
                                  className="w-full bg-white border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Temporary Access Code (Password)
                              </label>
                              <input
                                required
                                type="password"
                                value={formData.adminPassword}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    adminPassword: e.target.value,
                                  })
                                }
                                className="w-full bg-white border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "presence" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Street Address
                          </label>
                          <input
                            value={formData.address.street}
                            onChange={(e) =>
                              updateNestedField(
                                "address",
                                "street",
                                e.target.value,
                              )
                            }
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Area / Sector
                            </label>
                            <input
                              value={formData.address.area}
                              onChange={(e) =>
                                updateNestedField(
                                  "address",
                                  "area",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              City
                            </label>
                            <input
                              value={formData.address.city}
                              onChange={(e) =>
                                updateNestedField(
                                  "address",
                                  "city",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                        <div className="p-8 bg-blue-50/50 rounded-[3rem] border border-blue-100/50 space-y-8">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                              <HiOutlineMapPin size={18} /> Geospatial
                              Infrastructure
                            </h4>
                            <div className="flex gap-2">
                              <div className="px-3 py-1 bg-white rounded-lg text-[10px] font-black text-slate-500 border border-blue-100">
                                OSM ENGINE
                              </div>
                              <div className="px-3 py-1 bg-blue-600 rounded-lg text-[10px] font-black text-white">
                                LIVE PREVIEW
                              </div>
                            </div>
                          </div>{" "}
                          <MapPicker
                            value={{
                              lat: formData.location.lat,
                              long: formData.location.long,
                            }}
                            onChange={handleMapChange}
                          />
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Manual Latitude
                              </label>
                              <input
                                value={formData.location.lat}
                                onChange={(e) =>
                                  updateNestedField(
                                    "location",
                                    "lat",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Manual Longitude
                              </label>
                              <input
                                value={formData.location.long}
                                onChange={(e) =>
                                  updateNestedField(
                                    "location",
                                    "long",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Google Maps Public URL
                            </label>
                            <input
                              value={formData.location.googleMapsUrl}
                              onChange={(e) =>
                                updateNestedField(
                                  "location",
                                  "googleMapsUrl",
                                  e.target.value,
                                )
                              }
                              placeholder="https://maps.app.goo.gl/..."
                              className="w-full bg-white border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "operations" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                            Weekly Operation Cycle
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {formData.officeHours.map((oh, idx) => (
                              <div
                                key={oh.day}
                                className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl group transition-all hover:bg-white hover:shadow-sm"
                              >
                                <div className="w-24 font-black text-slate-800 text-xs uppercase tracking-tighter">
                                  {oh.day}
                                </div>
                                <div className="flex-1 flex items-center gap-4">
                                  <input
                                    type="time"
                                    value={oh.open}
                                    disabled={oh.isClosed}
                                    onChange={(e) => {
                                      const newHours = [
                                        ...formData.officeHours,
                                      ];
                                      newHours[idx].open = e.target.value;
                                      setFormData({
                                        ...formData,
                                        officeHours: newHours,
                                      });
                                    }}
                                    className="bg-white border-none rounded-xl p-2 text-xs font-bold disabled:opacity-30"
                                  />
                                  <span className="text-slate-300">to</span>
                                  <input
                                    type="time"
                                    value={oh.close}
                                    disabled={oh.isClosed}
                                    onChange={(e) => {
                                      const newHours = [
                                        ...formData.officeHours,
                                      ];
                                      newHours[idx].close = e.target.value;
                                      setFormData({
                                        ...formData,
                                        officeHours: newHours,
                                      });
                                    }}
                                    className="bg-white border-none rounded-xl p-2 text-xs font-bold disabled:opacity-30"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newHours = [...formData.officeHours];
                                    newHours[idx].isClosed =
                                      !newHours[idx].isClosed;
                                    setFormData({
                                      ...formData,
                                      officeHours: newHours,
                                    });
                                  }}
                                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${oh.isClosed ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}
                                >
                                  {oh.isClosed ? "Closed" : "Open"}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="p-10 pt-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/5">
                  <div className="flex gap-2">
                    {["identity", "presence", "operations"].map((t, i) => (
                      <div
                        key={t}
                        className={`w-2 h-2 rounded-full transition-all ${activeTab === t ? "bg-pink-500 w-6" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditingBranch(null);
                      }}
                      type="button"
                      className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      form="onboard-form"
                      type="submit"
                      className="px-8 py-4 bg-pink-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-pink-700 transition-all shadow-xl shadow-pink-600/20"
                    >
                      {editingBranch ? "Commit Changes" : "Finalize Onboarding"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
