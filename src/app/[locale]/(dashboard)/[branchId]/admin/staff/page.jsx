'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  HiUsers,
  HiUserAdd,
  HiShieldCheck,
  HiKey,
  HiCheck,
  HiX,
  HiPencil,
  HiTrash,
  HiRefresh,
  HiCheckCircle,
  HiXCircle,
  HiSearch,
} from 'react-icons/hi';
import { usePermissionGuard } from '@/hooks/usePermissionGuard';
import AccessDenied from '@/components/ui/AccessDenied';

export default function StaffManagementPage() {
  const { isLoading: guardLoading, isDenied } = usePermissionGuard('staff:manage');
  const { branchId } = useParams();
  const [staffList, setStaffList] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'employee',
    permissions: [],
  });
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Staff & Catalog
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [staffRes, catalogRes] = await Promise.all([
        api.get('/users/branch/staff', { params: { branchId } }),
        api.get('/users/permissions/catalog'),
      ]);

      if (staffRes.data?.success) setStaffList(staffRes.data.data);
      if (catalogRes.data?.success) setCatalog(catalogRes.data.data.catalog || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load staff list.');
    } finally {
      setLoading(false);
    }
  }, [branchId]);

  useEffect(() => {
    if (!guardLoading && !isDenied) fetchData();
  }, [fetchData, guardLoading, isDenied]);

  // Handle Form Permission Toggles
  const togglePermission = (permId, isEditing = false) => {
    if (isEditing) {
      setEditingStaff((prev) => {
        const current = prev.permissions || [];
        const exists = current.includes(permId);
        const updated = exists ? current.filter((p) => p !== permId) : [...current, permId];
        return { ...prev, permissions: updated };
      });
    } else {
      setFormData((prev) => {
        const current = prev.permissions || [];
        const exists = current.includes(permId);
        const updated = exists ? current.filter((p) => p !== permId) : [...current, permId];
        return { ...prev, permissions: updated };
      });
    }
  };

  const selectAllCategory = (categoryPerms, isEditing = false) => {
    const ids = categoryPerms.map((p) => p.id);
    if (isEditing) {
      setEditingStaff((prev) => {
        const current = new Set(prev.permissions || []);
        ids.forEach((id) => current.add(id));
        return { ...prev, permissions: Array.from(current) };
      });
    } else {
      setFormData((prev) => {
        const current = new Set(prev.permissions || []);
        ids.forEach((id) => current.add(id));
        return { ...prev, permissions: Array.from(current) };
      });
    }
  };

  const clearCategory = (categoryPerms, isEditing = false) => {
    const ids = new Set(categoryPerms.map((p) => p.id));
    if (isEditing) {
      setEditingStaff((prev) => ({
        ...prev,
        permissions: (prev.permissions || []).filter((p) => !ids.has(p)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        permissions: (prev.permissions || []).filter((p) => !ids.has(p)),
      }));
    }
  };

  // Submit New Employee
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      return toast.error('Name, email, and initial password are required.');
    }

    setSubmitting(true);
    try {
      const res = await api.post('/users/branch/staff', {
        ...formData,
        branchId,
      });

      if (res.data?.success) {
        toast.success(res.data.message || 'Staff member created successfully!');
        setShowAddModal(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          role: 'employee',
          permissions: [],
        });
        fetchData();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create staff member.');
    } finally {
      setSubmitting(false);
    }
  };

  // Update Permissions
  const handleUpdatePermissions = async () => {
    if (!editingStaff) return;
    setSubmitting(true);
    try {
      const res = await api.put(`/users/branch/staff/${editingStaff._id}/permissions`, {
        permissions: editingStaff.permissions || [],
      });

      if (res.data?.success) {
        toast.success(res.data.message || 'Permissions updated successfully!');
        setEditingStaff(null);
        fetchData();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update permissions.');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Staff Active/Suspended Status
  const handleToggleStatus = async (staffId) => {
    try {
      const res = await api.patch(`/users/branch/staff/${staffId}/status`);
      if (res.data?.success) {
        toast.success(res.data.message);
        setStaffList((prev) =>
          prev.map((s) => (s._id === staffId ? { ...s, isActive: res.data.isActive } : s))
        );
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to toggle status.');
    }
  };

  // Delete Staff
  const handleDeleteStaff = async (staffId, staffName) => {
    if (!window.confirm(`Are you sure you want to remove ${staffName} from this branch?`)) return;

    try {
      const res = await api.delete(`/users/branch/staff/${staffId}`);
      if (res.data?.success) {
        toast.success('Staff member removed successfully');
        setStaffList((prev) => prev.filter((s) => s._id !== staffId));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete staff member.');
    }
  };

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (guardLoading) return null;
  if (isDenied) return <AccessDenied permission="staff:manage" moduleName="Staff Management" />;

  return (
    <div className="space-y-8 pb-12">
      {/* ── Header Banner ── */}
      <div
        className="relative overflow-hidden rounded-2xl px-8 py-7 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)' }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-pink-500/20 text-pink-400 rounded-xl border border-pink-500/30">
                <HiUsers size={28} />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Branch Staff Room</h1>
                <p className="text-indigo-200 text-sm">
                  Delegate tasks and manage role-based limited permissions for your local branch employees.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-pink-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <HiUserAdd size={18} />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* ── Metrics Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Staff</p>
            <p className="text-3xl font-black text-slate-800 mt-1">{staffList.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <HiUsers size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Employees</p>
            <p className="text-3xl font-black text-emerald-600 mt-1">
              {staffList.filter((s) => s.isActive && s.role === 'employee').length}
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <HiCheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instructors & Leads</p>
            <p className="text-3xl font-black text-purple-600 mt-1">
              {staffList.filter((s) => s.role !== 'employee').length}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
            <HiShieldCheck size={24} />
          </div>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-pink-500"
          />
        </div>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
        >
          <HiRefresh size={16} />
          Refresh Roster
        </button>
      </div>

      {/* ── Staff Table ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Delegated Tasks / Permissions</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Loading branch staff directory...
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No staff members found. Click "Add Employee" above to invite your branch staff.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff) => (
                  <tr key={staff._id} className="hover:bg-slate-50/70 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                          {staff.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{staff.name}</p>
                          <p className="text-xs text-slate-500">{staff.email}</p>
                          {staff.phone && <p className="text-xs text-slate-400">{staff.phone}</p>}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          staff.role === 'branch_admin'
                            ? 'bg-amber-100 text-amber-800'
                            : staff.role === 'employee'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {staff.role.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-md">
                      {staff.role === 'branch_admin' ? (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          Full Branch Administrator Access
                        </span>
                      ) : staff.permissions && staff.permissions.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {staff.permissions.map((p) => (
                            <span
                              key={p}
                              className="text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No tasks delegated yet</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(staff._id)}
                        disabled={staff.role === 'branch_admin'}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
                          staff.isActive
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        } ${staff.role === 'branch_admin' ? 'cursor-not-allowed opacity-80' : ''}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            staff.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        {staff.isActive ? 'Active' : 'Suspended'}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      {staff.role === 'employee' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingStaff(staff)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            title="Edit Permissions"
                          >
                            <HiKey size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(staff._id, staff.name)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            title="Remove Employee"
                          >
                            <HiTrash size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal: Add New Employee ── */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                    <HiUserAdd size={22} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Add Branch Employee</h2>
                    <p className="text-xs text-slate-500">
                      Create an employee and grant specific task permissions for this branch.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <HiX size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateStaff} className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tanvir@syict.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="017xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Initial Password *
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      placeholder="Min 8 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Granular Permission Checklist */}
                <div className="border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Delegate Tasks & Permissions</h3>
                      <p className="text-xs text-slate-500">
                        Check the tasks this employee is allowed to perform. Unchecked areas will be completely hidden.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {catalog.map((cat) => (
                      <div key={cat.category} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 mb-3">
                          <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                            {cat.category}
                          </span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => selectAllCategory(cat.permissions)}
                              className="text-[11px] font-semibold text-pink-600 hover:underline"
                            >
                              Select All
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => clearCategory(cat.permissions)}
                              className="text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                            >
                              Clear
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {cat.permissions.map((perm) => {
                            const isChecked = formData.permissions.includes(perm.id);
                            return (
                              <label
                                key={perm.id}
                                className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer border transition text-xs ${
                                  isChecked
                                    ? 'bg-pink-50/80 border-pink-200 text-pink-900'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePermission(perm.id)}
                                  className="mt-0.5 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                                />
                                <div>
                                  <p className="font-bold">{perm.name}</p>
                                  <p className="text-[11px] text-slate-500 leading-tight">{perm.description}</p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-slate-100 pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-pink-600/30 disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Create Employee'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal: Edit Existing Permissions ── */}
      <AnimatePresence>
        {editingStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <HiKey size={22} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Edit Permissions for {editingStaff.name}
                    </h2>
                    <p className="text-xs text-slate-500">{editingStaff.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingStaff(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <HiX size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
                {catalog.map((cat) => (
                  <div key={cat.category} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 mb-3">
                      <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                        {cat.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => selectAllCategory(cat.permissions, true)}
                          className="text-[11px] font-semibold text-pink-600 hover:underline"
                        >
                          Select All
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => clearCategory(cat.permissions, true)}
                          className="text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cat.permissions.map((perm) => {
                        const isChecked = (editingStaff.permissions || []).includes(perm.id);
                        return (
                          <label
                            key={perm.id}
                            className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer border transition text-xs ${
                              isChecked
                                ? 'bg-pink-50/80 border-pink-200 text-pink-900'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => togglePermission(perm.id, true)}
                              className="mt-0.5 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                            />
                            <div>
                              <p className="font-bold">{perm.name}</p>
                              <p className="text-[11px] text-slate-500 leading-tight">{perm.description}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdatePermissions}
                  disabled={submitting}
                  className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-pink-600/30 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Permissions'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
