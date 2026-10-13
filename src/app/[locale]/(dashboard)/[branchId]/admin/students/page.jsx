"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  IoPersonOutline,
  IoSearch,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoShieldOutline,
  IoPersonAddOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoMailOutline,
} from "react-icons/io5";
import Portal from "@/components/ui/Portal";
import { usePermissionGuard } from "@/hooks/usePermissionGuard";
import AccessDenied from "@/components/ui/AccessDenied";

function AddStudentModal({ branchId, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { toast.error("Name and email are required."); return; }
    setSubmitting(true);
    try {
      const payload = { name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim(), role: "student", branchId };
      if (form.password.trim()) payload.password = form.password.trim();
      const res = await api.post("/users", payload);
      toast.success(res.data.message || "Student added! Credentials sent via email.");
      onSuccess(res.data.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add student.");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white shadow-2xl w-full max-w-lg rounded-2xl overflow-hidden relative z-[10000]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <IoPersonAddOutline size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-neutral-900 leading-none">Add New Student</h3>
              <p className="text-neutral-500 text-sm mt-1 flex items-center gap-1.5 font-normal">
                <IoMailOutline size={15} className="text-neutral-400" />Credentials auto-emailed on creation
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-lg hover:bg-neutral-100">
            <IoCloseCircle size={24} />
          </button>
        </div>

        {/* Form — two-column grid */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Rahim Uddin" className="input w-full" required />
            </div>

            {/* Phone */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Phone <span className="text-neutral-400 font-normal text-xs">(optional)</span>
              </label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                placeholder="+880 1XX-XXXXXXX" className="input w-full" />
            </div>

            {/* Email */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="student@example.com" className="input w-full pl-9" required />
              </div>
            </div>

            {/* Password */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Password <span className="text-neutral-400 font-normal text-xs">(auto if blank)</span>
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={form.password}
                  onChange={handleChange} placeholder="Leave blank to auto-generate"
                  className="input w-full pr-9" />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPassword ? <IoEyeOffOutline size={17} /> : <IoEyeOutline size={17} />}
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 mt-4">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-semibold hover:bg-neutral-200 transition-colors rounded-lg">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors rounded-lg disabled:opacity-60 flex items-center justify-center gap-1.5">
              {submitting
                ? <><span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating…</>
                : <><IoPersonAddOutline size={15} />Add Student</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminStudentsPage() {
  const { isLoading: guardLoading, isDenied } = usePermissionGuard(["students:view", "students:enroll", "students:manage"]);
  const { branchId } = useParams();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [togglingId, setTogglingId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [roleUpdating, setRoleUpdating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const limit = 15;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit, branchId };
      if (roleFilter) params.role = roleFilter;
      const res = await api.get("/users", { params });
      setUsers(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) { toast.error("Failed to load users."); } finally { setLoading(false); }
  }, [page, roleFilter, branchId]);

  useEffect(() => { if (!guardLoading && !isDenied) fetchUsers(); }, [fetchUsers, guardLoading, isDenied]);

  const handleToggle = async (userId) => {
    setTogglingId(userId);
    try {
      const res = await api.patch(`/users/${userId}/status`);
      toast.success(res.data.message);
      setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, isActive: res.data.isActive } : u));
    } catch { toast.error("Failed to update user status."); } finally { setTogglingId(null); }
  };

  const handleRoleUpdate = async () => {
    if (!editingUser || !newRole) return;
    setRoleUpdating(true);
    try {
      const res = await api.put(`/users/${editingUser._id}/role`, { role: newRole });
      toast.success(res.data.message);
      setUsers((prev) => prev.map((u) => u._id === editingUser._id ? { ...u, role: res.data.data.role } : u));
      setEditingUser(null);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update user role."); } finally { setRoleUpdating(false); }
  };

  const handleStudentAdded = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
    setTotal((t) => t + 1);
  };

  const filtered = search ? users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) : users;
  const totalPages = Math.ceil(total / limit);

  if (guardLoading) return null;
  if (isDenied) return <AccessDenied permission="students:view" moduleName="Students" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">All Students</h1>
          <p className="text-textSecondary text-sm mt-0.5">{total} total registered users</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm">
          <IoPersonAddOutline size={18} />Add Student
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input type="text" placeholder="Search by name or email..." className="input pl-9 py-2 text-sm w-full rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input min-w-[130px] py-2 text-sm" value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}>
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="branch_admin">Branch Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-neutral-200 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {["User","Phone","Role","Joined","Status","Action"].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 font-semibold text-neutral-600 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(6)].map((_, j) => (<td key={j} className="px-5 py-4"><div className="h-4 bg-neutral-200 w-full"></div></td>))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-neutral-400">No users found.</td></tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center shrink-0">
                          {user.avatar ? (
                            <Image src={user.avatar} alt={user.name || "User"} width={32} height={32} className="w-8 h-8 object-cover rounded-md" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = "/assets/fallback.png"; }} decoding="async" />
                          ) : (<IoPersonOutline className="text-blue-600" size={16} />)}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">{user.name}</div>
                          <div className="text-xs text-neutral-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-neutral-600 text-xs">{user.phone || "—"}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${
                        ["super_admin","super_management"].includes(user.role) ? "bg-purple-100 text-purple-700"
                        : ["branch_admin","branch_management"].includes(user.role) ? "bg-blue-100 text-blue-700"
                        : user.role === "instructor" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                      }`}>
                        {user.role.includes("admin") && <IoShieldOutline size={12} />}{user.role}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-neutral-500 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${user.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {user.isActive ? <IoCheckmarkCircle size={12} /> : <IoCloseCircle size={12} />}
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1.5">
                        {user.role !== "super_admin" && (
                          <button onClick={() => handleToggle(user._id)} disabled={togglingId === user._id}
                            className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors disabled:opacity-50 ${user.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>
                            {togglingId === user._id ? "..." : user.isActive ? "Deactivate" : "Activate"}
                          </button>
                        )}
                        <button onClick={() => { setEditingUser(user); setNewRole(user.role); }} className="text-xs font-semibold px-3 py-1.5 rounded transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100">Edit Role</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-sm border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40 rounded">Previous</button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40 rounded">Next</button>
            </div>
          </div>
        )}
      </div>

      <Portal>
        {showAddModal && <AddStudentModal branchId={branchId} onClose={() => setShowAddModal(false)} onSuccess={handleStudentAdded} />}
      </Portal>

      <Portal>
        {editingUser && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white shadow-xl w-full max-w-sm overflow-hidden relative z-[10000] rounded-xl">
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-textPrimary">Edit User Role</h3>
                <button onClick={() => setEditingUser(null)} className="text-neutral-400 hover:text-neutral-600"><IoCloseCircle size={24} /></button>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div><label className="text-neutral-500 block mb-1">User:</label><div className="font-semibold">{editingUser.name}</div></div>
                <div>
                  <label className="text-neutral-500 block mb-1">Role:</label>
                  <select className="input w-full" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="branch_admin">Branch Admin</option>
                    <option value="branch_management">Branch Management</option>
                    <option value="super_management">Super Management</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setEditingUser(null)} className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 font-semibold hover:bg-neutral-200 transition-colors rounded-lg">Cancel</button>
                  <button onClick={handleRoleUpdate} disabled={roleUpdating || newRole === editingUser.role} className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 rounded-lg">
                    {roleUpdating ? "Saving..." : "Save Role"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Portal>
    </div>
  );
}