"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { superQueryKeys } from "@/lib/queryKeys";
import api from "@/lib/api";
import toast from "react-hot-toast";
import BranchCourseAssignModal from "@/components/branches/BranchCourseAssignModal";
import BranchFormModal from "@/components/super/modals/BranchFormModal";

import {
    HiOutlineBuildingOffice,
    HiOutlinePlus,
    HiOutlineMagnifyingGlass,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineShieldCheck,
    HiOutlineShieldExclamation,
    HiOutlineMapPin,
    HiOutlineArrowTopRightOnSquare,
    HiOutlinePencilSquare,
    HiOutlineArrowDownTray,
    HiOutlineUsers,
    HiOutlineAcademicCap,
    HiOutlineTrash,
} from "react-icons/hi2";
import { IoLogoWhatsapp } from "react-icons/io5";
import useSuperTable from "@/hooks/useSuperTable";
import {
    BRANCH_TYPE_FILTERS,
    branchSearchFields,
    branchCsvContent,
} from "@/components/super/tables/branchTableSchema";

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

const resolveName = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.en || val.bn || "";
    return String(val);
};

export default function AllBranchesPage() {
    const { locale } = useParams();

    const {
        data: branchResponse,
        isLoading: loading,
        refetch: fetchBranches,
    } = useQuery({
        queryKey: superQueryKeys.superBranches(),
        queryFn: async () => {
            const res = await api.get("/super/branches");
            return res.data;
        },
    });

    const branches = useMemo(() => branchResponse?.data || [], [branchResponse?.data]);
    const summary = branchResponse?.summary || null;
    const [filterType, setFilterType] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [courseAssignBranch, setCourseAssignBranch] = useState(null);

    const handleToggleStatus = async (branch) => {
        const actionName = branch.isActive ? "Deactivate" : "Reactivate";
        if (
            !window.confirm(
                `Are you sure you want to ${actionName} "${branch.name}"? ${branch.isActive
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

    const handleDeleteBranch = async (branch) => {
        const confirmed = window.confirm(
            `⚠️ PERMANENT DELETE\n\nAre you sure you want to delete "${branch.name}"?\n\nThis will permanently remove the branch and all associated data. This action CANNOT be undone.`
        );
        if (!confirmed) return;

        // Second safety confirmation
        const doubleConfirm = window.confirm(
            `Final confirmation: Delete "${branch.name}" (${branch.code})?`
        );
        if (!doubleConfirm) return;

        try {
            const res = await api.delete(`/super/branches/${branch._id}`);
            if (res.data?.success) {
                toast.success(`Branch "${branch.name}" deleted successfully.`);
                fetchBranches();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete branch");
        }
    };

    const handleEditBranch = (branch) => {
        setEditingBranch(branch);
        setShowModal(true);
    };

    // Export to CSV
    const handleExportCSV = () => {
        if (!branches.length) {
            toast.error("No branches to export");
            return;
        }

        const csvContent = `data:text/csv;charset=utf-8,${encodeURI(
            branchCsvContent(branches)
        )}`;
        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", `syict_branch_network_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Branch network exported to CSV");
    };

    // Filtered branches — the shared table hook owns search and the type filter
    const {
        search,
        setSearch,
        rows: filteredBranches,
    } = useSuperTable({
        data: branches,
        searchFields: branchSearchFields,
        filter: BRANCH_TYPE_FILTERS[filterType] || BRANCH_TYPE_FILTERS.all,
        paginate: false,
    });

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
        <div className="space-y-4 w-full pb-10">
            {/* ── Header ── */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-3">
                        <HiOutlineBuildingOffice size={24} className="text-pink-600 shrink-0" />
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Branch Network Command
                            </h1>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                Manage global SYICT campuses, physical labs, operational hours & lead channels.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {/* Export CSV */}
                    <button
                        onClick={handleExportCSV}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-md"
                    >
                        <HiOutlineArrowDownTray size={15} /> Export CSV
                    </button>

                    {/* View Public Directory */}
                    <Link
                        href={`/${locale}/branches`}
                        target="_blank"
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-md"
                    >
                        <HiOutlineArrowTopRightOnSquare size={15} /> Public Page
                    </Link>

                    {/* Onboard Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setEditingBranch(null);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 bg-slate-900 dark:bg-pink-600 text-white px-4 py-2 font-bold shadow-md hover:bg-slate-800 transition-all text-xs uppercase tracking-wider rounded-md"
                    >
                        <HiOutlinePlus size={16} />
                        Onboard Campus
                    </motion.button>
                </div>
            </header>

            {/* ── Real Global Network KPI Cards ── */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
                <motion.div
                    variants={item}
                    className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden rounded-xl"
                >
                    <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Network Footprint
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                                {summary?.totalBranches ?? branches.length}
                            </h3>
                            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 pt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {summary?.activeBranches ?? branches.filter((b) => b.isActive).length} Live Campuses
                            </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-pink-600 shrink-0">
                            <HiOutlineBuildingOffice size={20} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden rounded-xl"
                >
                    <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Branch Students
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                                {summary?.totalStudents ?? 0}
                            </h3>
                            <p className="text-[11px] text-slate-400 font-medium pt-0.5">
                                Offline & hybrid enrollments
                            </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 shrink-0">
                            <HiOutlineUsers size={20} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden rounded-xl"
                >
                    <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Course Deployments
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                                {summary?.totalCourses ?? 0}
                            </h3>
                            <p className="text-[11px] text-slate-400 font-medium pt-0.5">
                                Active syllabus allocations
                            </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 shrink-0">
                            <HiOutlineAcademicCap size={20} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden rounded-xl"
                >
                    <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Network Status
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-emerald-600">
                                100% Operational
                            </h3>
                            <p className="text-[11px] text-slate-400 font-medium pt-0.5">
                                All hubs synced with database
                            </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 shrink-0">
                            <HiOutlineShieldCheck size={20} />
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Main Directory Section ── */}
            <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Controls Bar */}
                <div className="p-3 px-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-slate-50/40 dark:bg-slate-800/40">
                    {/* Functional Filter Tabs */}
                    <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap">
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
                                className={`min-h-[30px] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 whitespace-nowrap active:scale-95 rounded-md ${filterType === t.id
                                    ? "bg-slate-900 text-white dark:bg-pink-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <span>{t.label}</span>
                                <span
                                    className={`text-[9px] px-1 py-0.5 rounded ${filterType === t.id
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
                    <div className="relative w-full md:w-56">
                        <HiOutlineMagnifyingGlass
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                            size={15}
                        />
                        <input
                            type="text"
                            placeholder="Search campuses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all dark:text-white rounded-md"
                        />
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                <th className="px-3 py-2.5">Campus & Identity</th>
                                <th className="px-3 py-2.5">Division & Address</th>
                                <th className="px-3 py-2.5">Contact & WhatsApp</th>
                                <th className="px-3 py-2.5 text-center">Metrics</th>
                                <th className="px-3 py-2.5 text-center">Status</th>
                                <th className="px-3 py-2.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-3 py-4 h-12">
                                            <div className="h-3.5 bg-slate-100 dark:bg-slate-800 w-2/3" />
                                        </td>
                                    </tr>
                                ))
                            ) : filteredBranches.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-3 py-8 text-center text-slate-400 font-medium text-xs">
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
                                        <td className="px-3 py-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center font-black text-[10px] text-slate-500 shrink-0 relative rounded-md">
                                                    {branch.logo ? (
                                                        <Image
                                                            src={branch.logo}
                                                            alt={branch.name}
                                                            fill
                                                            className="object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        branch.code
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className="font-bold text-xs text-slate-800 dark:text-white leading-tight truncate">
                                                            {resolveName(branch.name)}
                                                        </span>
                                                        <span
                                                            className={`px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider rounded ${branch.type === "head_office"
                                                                ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                                }`}
                                                        >
                                                            {branch.type?.replace("_", " ")}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-medium text-slate-400 block">
                                                        {branch.code}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Address & Division */}
                                        <td className="px-3 py-2.5">
                                            <div className="space-y-0.5">
                                                <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] font-bold uppercase tracking-wider rounded">
                                                    {branch.division || "Dhaka"}
                                                </span>
                                                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-[140px] pt-0.5">
                                                    {branch.address?.area || branch.address?.street || "—"}
                                                </p>
                                                <p className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                                    <HiOutlineMapPin size={11} />
                                                    {branch.address?.city || "Bangladesh"}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Contact & WhatsApp */}
                                        <td className="px-3 py-2.5">
                                            <div className="space-y-0.5">
                                                {branch.contact?.email && (
                                                    <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                                                        <HiOutlineEnvelope size={12} className="text-slate-400 shrink-0" />
                                                        <span className="truncate max-w-[120px]">{branch.contact.email}</span>
                                                    </div>
                                                )}
                                                {branch.contact?.phones?.[0] && (
                                                    <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                                                        <HiOutlinePhone size={12} className="text-slate-400 shrink-0" />
                                                        <span className="truncate max-w-[120px]">{branch.contact.phones[0]}</span>
                                                    </div>
                                                )}
                                                {branch.whatsapp && (
                                                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                                        <IoLogoWhatsapp size={12} className="shrink-0" />
                                                        <span className="truncate max-w-[120px]">{branch.whatsapp}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* Metrics */}
                                        <td className="px-3 py-2.5 text-center">
                                            <div className="flex items-center justify-center gap-2.5 text-center">
                                                <div>
                                                    <div className="text-xs font-black text-slate-800 dark:text-white">
                                                        {branch.stats?.students || 0}
                                                    </div>
                                                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                                                        Students
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setCourseAssignBranch(branch)}
                                                    title="Click to assign or manage courses for this branch"
                                                    className="group/course text-center hover:opacity-80 transition-opacity"
                                                >
                                                    <div className="text-xs font-black text-violet-600 dark:text-violet-400 group-hover/course:underline flex items-center justify-center gap-0.5">
                                                        <HiOutlineAcademicCap size={12} />
                                                        {branch.stats?.courses || 0}
                                                    </div>
                                                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                                                        Courses
                                                    </div>
                                                </button>
                                            </div>
                                        </td>

                                        {/* Status with 1-Click Toggle */}
                                        <td className="px-3 py-2.5 text-center">
                                            <button
                                                onClick={() => handleToggleStatus(branch)}
                                                title={branch.isActive ? "Click to Deactivate" : "Click to Reactivate"}
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer rounded ${branch.isActive
                                                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${branch.isActive ? "bg-emerald-500" : "bg-slate-400"
                                                        }`}
                                                />
                                                {branch.isActive ? "Active" : "Paused"}
                                            </button>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-3 py-2.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {/* Jump into Branch Admin Dashboard */}
                                                <Link
                                                    href={`/${locale}/${branch._id}/admin`}
                                                    target="_blank"
                                                    title="Open Campus Admin Dashboard"
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors rounded-md"
                                                >
                                                    <HiOutlineBuildingOffice size={15} />
                                                </Link>

                                                {/* Assign & Manage Courses */}
                                                <button
                                                    onClick={() => setCourseAssignBranch(branch)}
                                                    title="Assign & Manage Courses for this Campus"
                                                    className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-slate-800 transition-colors rounded-md"
                                                >
                                                    <HiOutlineAcademicCap size={15} />
                                                </button>

                                                {/* Edit properties */}
                                                <button
                                                    onClick={() => handleEditBranch(branch)}
                                                    title="Edit Campus Metadata"
                                                    className="p-1.5 text-slate-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors rounded-md"
                                                >
                                                    <HiOutlinePencilSquare size={15} />
                                                </button>

                                                {/* View on Public Page */}
                                                <Link
                                                    href={`/${locale}/branches#branch-card-${branch._id}`}
                                                    target="_blank"
                                                    title="View on Public Directory"
                                                    className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-md"
                                                >
                                                    <HiOutlineArrowTopRightOnSquare size={15} />
                                                </Link>

                                                {/* Delete Branch */}
                                                <button
                                                    onClick={() => handleDeleteBranch(branch)}
                                                    title="Delete Branch Permanently"
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-md"
                                                >
                                                    <HiOutlineTrash size={15} />
                                                </button>
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
                            <div key={i} className="animate-pulse h-32 bg-slate-100 dark:bg-slate-800" />
                        ))
                    ) : (
                        filteredBranches.map((branch) => (
                            <div
                                key={branch._id}
                                className="p-4 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 rounded-lg"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">
                                            {branch.code}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                                {resolveName(branch.name)}
                                            </h4>
                                            <p className="text-[11px] text-slate-400 font-medium">
                                                {branch.division} • {branch.address?.city}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleToggleStatus(branch)}
                                        className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${branch.isActive
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
                                            className="flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 bg-violet-50 hover:bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                                            aria-label={`Manage courses for ${branch.name}`}
                                        >
                                            <HiOutlineAcademicCap size={16} />
                                            Courses
                                        </button>
                                        <button
                                            onClick={() => handleEditBranch(branch)}
                                            className="flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95"
                                            aria-label={`Edit campus ${branch.name}`}
                                        >
                                            <HiOutlinePencilSquare size={16} />
                                            Edit
                                        </button>
                                        <Link
                                            href={`/${locale}/${branch._id}/admin`}
                                            target="_blank"
                                            className="flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 rounded-md"
                                            aria-label={`Admin dashboard for ${branch.name}`}
                                        >
                                            Admin
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteBranch(branch)}
                                            className="min-h-[40px] px-3.5 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 rounded-md"
                                            aria-label={`Delete branch ${branch.name}`}
                                        >
                                            <HiOutlineTrash size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* 4-Tab Onboarding & Edit Modal */}
            <BranchFormModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingBranch(null);
                }}
                editingBranch={editingBranch}
                onSuccess={fetchBranches}
                branches={branches}
            />

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
