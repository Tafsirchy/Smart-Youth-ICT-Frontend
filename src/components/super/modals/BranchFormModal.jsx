"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "@/lib/api";
import Portal from "@/components/ui/Portal";
import ImageUpload from "@/components/ui/ImageUpload";

const MapPicker = dynamic(() => import("@/components/ui/MapPicker"), {
    ssr: false,
    loading: () => (
        <div className="h-[360px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
            Initializing Map Picker Engine...
        </div>
    ),
});

import {
    HiOutlineGlobeAlt,
    HiOutlineMapPin,
    HiOutlineEnvelope,
    HiOutlineClock,
    HiOutlineSparkles,
    HiOutlineMegaphone,
    HiOutlineXMark,
    HiOutlineShieldCheck,
} from "react-icons/hi2";

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
    "CCTV Security Campus",
    "Generator Backup",
    "Library & Study Corner",
    "Conference & Seminar Hall",
];

export const initialFormState = {
    name: "",
    code: "",
    type: "local",
    division: "Dhaka",
    establishedDate: "",
    logo: "",
    coverImage: "",
    gallery: [],
    facilities: [
        "Full Air Conditioned",
        "Gigabit Fiber Wi-Fi",
        "Job Placement Cell",
        "50+ Core-i7 PCs",
    ],
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

export default function BranchFormModal({
    isOpen,
    onClose,
    editingBranch,
    onSuccess,
    branches = [],
}) {
    const [formData, setFormData] = useState(initialFormState);
    const [activeTab, setActiveTab] = useState("identity");
    const [facilityInput, setFacilityInput] = useState("");

    // Initialize or reset form state whenever modal opens or editing target changes
    useEffect(() => {
        if (!isOpen) return;

        if (editingBranch) {
            let lat = "";
            let long = "";
            if (editingBranch.location?.type === "Point" && Array.isArray(editingBranch.location.coordinates)) {
                long = editingBranch.location.coordinates[0];
                lat = editingBranch.location.coordinates[1];
            } else if (editingBranch.location?.lat) {
                lat = editingBranch.location.lat;
                long = editingBranch.location.long;
            }

            setFormData({
                name: editingBranch.name || "",
                code: editingBranch.code || "",
                type: editingBranch.type || "local",
                division: editingBranch.division || "Dhaka",
                establishedDate: editingBranch.establishedDate ? editingBranch.establishedDate.split("T")[0] : "",
                logo: editingBranch.logo || "",
                coverImage: editingBranch.coverImage || "",
                gallery: Array.isArray(editingBranch.gallery) ? editingBranch.gallery : [],
                facilities: Array.isArray(editingBranch.facilities) ? editingBranch.facilities : [],
                notice: editingBranch.notice || { title: "", text: "", isActive: false },
                website: editingBranch.website || "",
                address: editingBranch.address || { street: "", area: "", city: "", country: "Bangladesh" },
                location: {
                    lat,
                    long,
                    googleMapsUrl: editingBranch.location?.googleMapsUrl || "",
                },
                contact: {
                    email: editingBranch.contact?.email || "",
                    phones: editingBranch.contact?.phones?.length ? editingBranch.contact.phones : [""],
                },
                whatsapp: editingBranch.whatsapp || "",
                officeHours: editingBranch.officeHours?.length ? editingBranch.officeHours : defaultHours,
                adminName: "",
                adminEmail: "",
                adminPassword: "",
            });
        } else {
            setFormData(initialFormState);
        }
        setActiveTab("identity");
        setFacilityInput("");
    }, [isOpen, editingBranch]);

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

    const { usedCodes, suggestedCode } = useMemo(() => {
        const taken = branches
            .map((b) => (b.code || "").toUpperCase())
            .filter(Boolean)
            .sort();

        const takenSet = new Set(taken);

        let suggestion = "SYICT-001";
        let n = 1;
        while (takenSet.has(suggestion) && n < 1000) {
            n += 1;
            suggestion = `SYICT-${String(n).padStart(3, "0")}`;
        }

        return { usedCodes: taken, suggestedCode: suggestion };
    }, [branches]);

    const codeAlreadyUsed = useMemo(() => {
        const candidate = (formData.code || "").trim().toUpperCase();
        if (!candidate) return false;
        if (editingBranch && (editingBranch.code || "").toUpperCase() === candidate) {
            return false;
        }
        return usedCodes.includes(candidate);
    }, [formData.code, editingBranch, usedCodes]);

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

            const requestedCode = (formData.code || "").trim().toUpperCase();

            if (!requestedCode) {
                toast.error("Branch code is required", { id: loadingToast });
                return;
            }

            const clash = branches.find(
                (branch) =>
                    (branch.code || "").toUpperCase() === requestedCode &&
                    branch._id !== editingBranch?._id
            );

            if (clash) {
                toast.error(`Code "${requestedCode}" is already used by "${clash.name}"`, {
                    id: loadingToast,
                });
                return;
            }

            const payload = { ...formData, code: requestedCode };
            const hasCoordinates =
                formData.location?.lat !== "" &&
                formData.location?.lat !== null &&
                formData.location?.lat !== undefined &&
                formData.location?.long !== "" &&
                formData.location?.long !== null &&
                formData.location?.long !== undefined;

            if (!hasCoordinates) {
                payload.location = null;
            }

            const res = await api[method](endpoint, payload);
            if (res.data?.success) {
                toast.success(
                    editingBranch ? "Campus properties updated successfully" : "New campus onboarded!",
                    { id: loadingToast }
                );
                onClose();
                if (typeof onSuccess === "function") {
                    onSuccess();
                }
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed", {
                id: loadingToast,
            });
        }
    };

    if (!isOpen) return null;

    return (
        <Portal>
            <AnimatePresence>
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-white dark:bg-slate-900 w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100 dark:border-slate-800"
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
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
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
                                    className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                                    Branch Code <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    required
                                                    list="branch-code-suggestions"
                                                    value={formData.code}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, code: e.target.value.toUpperCase() })
                                                    }
                                                    placeholder={`e.g. ${suggestedCode}`}
                                                    className={`w-full bg-slate-50 dark:bg-slate-800 p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20 ${
                                                        codeAlreadyUsed
                                                            ? "border border-red-400 dark:border-red-500"
                                                            : "border border-slate-200 dark:border-slate-700"
                                                    }`}
                                                />
                                                <datalist id="branch-code-suggestions">
                                                    <option value={suggestedCode} />
                                                    {usedCodes.map((code) => (
                                                        <option key={code} value={code} />
                                                    ))}
                                                </datalist>
                                                <p
                                                    className={`text-[10px] font-bold uppercase tracking-wider ${
                                                        codeAlreadyUsed ? "text-red-500" : "text-slate-400"
                                                    }`}
                                                >
                                                    {codeAlreadyUsed
                                                        ? `Code "${formData.code.trim().toUpperCase()}" is already taken`
                                                        : usedCodes.length > 0
                                                        ? `Taken: ${usedCodes.slice(0, 5).join(", ")}${
                                                              usedCodes.length > 5 ? "…" : ""
                                                          } · next free: ${suggestedCode}`
                                                        : `Next free: ${suggestedCode}`}
                                                </p>
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                        </div>

                                        {/* Media: Logo & Cover Image */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
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

                                        {/* Campus Photo Gallery */}
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 rounded-lg">
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
                                                            className="relative aspect-video overflow-hidden border-2 border-slate-200 dark:border-slate-700 group bg-slate-100 dark:bg-slate-800 rounded-lg"
                                                        >
                                                            <picture>
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={`Campus photo ${i + 1}`}
                                                                    className="w-full h-full object-cover rounded-md"
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
                                                                className="absolute top-1.5 right-1.5 p-1.5 bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110"
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
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                                    <HiOutlineSparkles className="text-pink-600" />
                                                    Campus Facilities & Infrastructure Tags
                                                </span>
                                                <span className="text-[10px] text-slate-400">
                                                    {formData.facilities.length} active tags
                                                </span>
                                            </div>

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
                                                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-bold outline-none dark:text-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => addFacility()}
                                                    className="px-4 py-2 bg-slate-900 dark:bg-pink-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-90"
                                                >
                                                    Add
                                                </button>
                                            </div>

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
                                                        className="px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:border-pink-500 hover:text-pink-600 transition-colors"
                                                    >
                                                        + {s}
                                                    </button>
                                                ))}
                                            </div>

                                            {formData.facilities.length > 0 && (
                                                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                                                    {formData.facilities.map((fac, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-bold flex items-center gap-1.5 rounded-md"
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
                                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 space-y-3 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                                                    <HiOutlineMegaphone size={16} /> Campus Notice / Announcement
                                                </span>
                                                <label className="flex items-center gap-2 cursor-pointer rounded-md">
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
                                                        className="w-4 h-4 text-pink-600 focus:ring-pink-500"
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
                                                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-bold outline-none dark:text-white"
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
                                                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium outline-none dark:text-white"
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                                    Country
                                                </label>
                                                <input
                                                    value={formData.address.country}
                                                    onChange={(e) => updateNestedField("address", "country", e.target.value)}
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-xs text-slate-800 dark:text-white outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* OSM Interactive Leaflet MapPicker */}
                                        <div className="p-4 bg-blue-50/50 dark:bg-slate-800/40 border border-blue-100 dark:border-slate-700 space-y-3 rounded-md">
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
                                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 text-xs font-mono dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[9px] font-bold text-slate-400 uppercase">
                                                        Longitude
                                                    </label>
                                                    <input
                                                        value={formData.location.long}
                                                        onChange={(e) => updateNestedField("location", "long", e.target.value)}
                                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 text-xs font-mono dark:text-white"
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
                                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 text-xs dark:text-white"
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-pink-500/20"
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
                                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-xs text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                                                    className="text-[10px] font-bold text-pink-600 hover:underline uppercase rounded-md"
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
                                                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-bold text-xs text-slate-800 dark:text-white outline-none"
                                                    />
                                                    {formData.contact.phones.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removePhoneField(idx)}
                                                            className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
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
                                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 font-medium text-xs text-slate-800 dark:text-white outline-none"
                                            />
                                        </div>

                                        {/* Admin Onboarding Fields if Creating New Branch */}
                                        {!editingBranch && (
                                            <div className="p-4 bg-pink-50/50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/30 space-y-3 mt-4 rounded-lg">
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
                                                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-xs font-bold outline-none dark:text-white"
                                                    />
                                                    <input
                                                        type="email"
                                                        placeholder="admin.email@syict.com"
                                                        value={formData.adminEmail}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, adminEmail: e.target.value })
                                                        }
                                                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-xs font-bold outline-none dark:text-white"
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder="Temporary Password"
                                                        value={formData.adminPassword}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, adminPassword: e.target.value })
                                                        }
                                                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-xs font-bold outline-none dark:text-white"
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
                                                    className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 border border-slate-100 dark:border-slate-700/60 rounded-lg"
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
                                                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 text-xs font-bold disabled:opacity-30 dark:text-white"
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
                                                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 text-xs font-bold disabled:opacity-30 dark:text-white"
                                                        />
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newHours = [...formData.officeHours];
                                                            newHours[idx].isClosed = !newHours[idx].isClosed;
                                                            setFormData({ ...formData, officeHours: newHours });
                                                        }}
                                                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-all ${
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

                        {/* Modal Footer */}
                        <div className="p-4 sm:p-6 pt-3 sm:pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="text-xs text-slate-400 font-bold hidden sm:block">
                                Tab {activeTab === "identity" ? "1" : activeTab === "presence" ? "2" : activeTab === "channels" ? "3" : "4"} of 4
                            </div>

                            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 sm:flex-none min-h-[44px] px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors active:scale-95 flex items-center justify-center"
                                >
                                    Cancel
                                </button>
                                <button
                                    form="branch-manage-form"
                                    type="submit"
                                    className="flex-1 sm:flex-none min-h-[44px] px-6 py-2.5 bg-slate-900 dark:bg-pink-600 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center justify-center rounded-md"
                                >
                                    {editingBranch ? "Save Changes" : "Finalize Onboarding"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </AnimatePresence>
        </Portal>
    );
}
