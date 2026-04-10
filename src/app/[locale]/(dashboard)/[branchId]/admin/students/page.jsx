'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { IoPersonOutline, IoSearch, IoCheckmarkCircle, IoCloseCircle, IoShieldOutline } from 'react-icons/io5';
import Portal from '@/components/ui/Portal';

export default function AdminStudentsPage() {
  const [users, setUsers]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage]         = useState(1);
  const [togglingId, setTogglingId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [roleUpdating, setRoleUpdating] = useState(false);
  const limit = 15;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (roleFilter) params.role = roleFilter;
      const res = await api.get('/users', { params });
      setUsers(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      toast.error('Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [page, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleToggle = async (userId, currentStatus) => {
    setTogglingId(userId);
    try {
      const res = await api.patch(`/users/${userId}/status`);
      toast.success(res.data.message);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, isActive: res.data.isActive } : u));
    } catch {
      toast.error('Failed to update user status.');
    } finally {
      setTogglingId(null);
    }
  };

  const handleRoleUpdate = async () => {
    if (!editingUser || !newRole) return;
    setRoleUpdating(true);
    try {
      const res = await api.put(`/users/${editingUser._id}/role`, { role: newRole });
      toast.success(res.data.message);
      setUsers(prev => prev.map(u => u._id === editingUser._id ? { ...u, role: res.data.data.role } : u));
      setEditingUser(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update user role.');
    } finally {
      setRoleUpdating(false);
    }
  };

  const filtered = search
    ? users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    : users;

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">All Students</h1>
          <p className="text-textSecondary text-sm mt-1">{total} total registered users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email…"
            className="input pl-10 w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input min-w-[140px]"
          value={roleFilter}
          onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="branch_admin">Branch Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">User</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Phone</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Role</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Joined</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-neutral-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-5 py-4"><div className="h-4 bg-neutral-200 rounded w-full"></div></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-neutral-400">No users found.</td></tr>
              ) : (
                filtered.map(user => (
                  <tr key={user._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          {user.avatar
                            ? <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                            : <IoPersonOutline className="text-blue-600" size={16} />
                          }
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">{user.name}</div>
                          <div className="text-xs text-neutral-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-600">{user.phone}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        ['super_admin', 'super_management'].includes(user.role) ? 'bg-purple-100 text-purple-700'
                        : ['branch_admin', 'branch_management'].includes(user.role) ? 'bg-blue-100 text-purple-700'
                        : user.role === 'instructor' ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role.includes('admin') && <IoShieldOutline size={12} />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-neutral-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? <IoCheckmarkCircle size={12} /> : <IoCloseCircle size={12} />}
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {user.role !== 'super_admin' && (
                          <button
                            onClick={() => handleToggle(user._id, user.isActive)}
                            disabled={togglingId === user._id}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${
                              user.isActive
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            }`}
                          >
                            {togglingId === user._id ? '…' : user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                        <button
                          onClick={() => { setEditingUser(user); setNewRole(user.role); }}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          Edit Role
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Role Edit Modal */}
      <Portal>
        {editingUser && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden relative z-[10000]">
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-textPrimary">Edit User Role</h3>
                <button onClick={() => setEditingUser(null)} className="text-neutral-400 hover:text-neutral-600"><IoCloseCircle size={24} /></button>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div>
                  <label className="text-neutral-500 block mb-1">User:</label>
                  <div className="font-semibold">{editingUser.name}</div>
                </div>
                <div>
                  <label className="text-neutral-500 block mb-1">Role:</label>
                  <select className="input w-full" value={newRole} onChange={e => setNewRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="branch_admin">Branch Admin</option>
                    <option value="branch_management">Branch Management</option>
                    <option value="super_management">Super Management</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setEditingUser(null)}
                    className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRoleUpdate}
                    disabled={roleUpdating || newRole === editingUser.role}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {roleUpdating ? 'Saving...' : 'Save Role'}
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
