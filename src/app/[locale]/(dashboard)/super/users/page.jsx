'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Portal from '@/components/ui/Portal';
import BulkUserImportModal from '@/components/dashboard/BulkUserImportModal';
import { useRole } from '@/hooks/useRole';
import { ROLE_FILTERS } from '@/components/super/tables/userTableSchema';
import { superQueryKeys } from '@/lib/queryKeys';
import { 
 HiOutlineUserPlus, 
 HiOutlineMagnifyingGlass, 
 HiOutlineFunnel,
 HiOutlineEllipsisHorizontal,
 HiOutlineEnvelope,
 HiOutlineLockClosed,
 HiOutlinePhone,
 HiOutlineShieldCheck,
 HiOutlineTrash,
 HiOutlinePencilSquare,
 HiOutlineDevicePhoneMobile,
 HiOutlineBuildingOffice,
 HiOutlineCheckCircle,
 HiOutlineXCircle,
 HiOutlineKey,
 HiOutlineArrowRightOnRectangle,
 HiOutlineArrowPath,
 HiOutlineArrowsRightLeft,
 HiOutlineArrowUpTray,
 HiOutlineCheck,
 HiOutlineUserGroup
} from 'react-icons/hi2';

export default function GlobalUserManagement() {
 const [showModal, setShowModal] = useState(false);
 const [editingUser, setEditingUser] = useState(null);
 const [page, setPage] = useState(1);
 const limit = 20;

 const { user: currentUser } = useRole();
 const queryClient = useQueryClient();
 const [formData, setFormData] = useState({
 name: '', email: '', password: '', role: 'student', branchId: '', phone: '', isActive: true
 });
 const [setupMode, setSetupMode] = useState('invite'); // 'invite' (email link) | 'password' (set now)
 
 const [search, setSearch] = useState('');
 const [filterRole, setFilterRole] = useState('');
 const [filterBranch, setFilterBranch] = useState('');

 const router = useRouter();
 const params = useParams();
 const locale = params?.locale || 'bn';

 const [permissionsModalUser, setPermissionsModalUser] = useState(null);
 const [selectedPermissions, setSelectedPermissions] = useState([]);
 const [savingPermissions, setSavingPermissions] = useState(false);

 // Campus Transfer State
 const [transferModalStudent, setTransferModalStudent] = useState(null);
 const [targetBranchId, setTargetBranchId] = useState('');
 const [transferReason, setTransferReason] = useState('relocation');
 const [transferNotes, setTransferNotes] = useState('');
 const [transferring, setTransferring] = useState(false);

 // Bulk Import (CSV) State
 const [showBulkImport, setShowBulkImport] = useState(false);

 // Bulk Action State
 const [selectedUserIds, setSelectedUserIds] = useState([]);
 const [bulkAction, setBulkAction] = useState('activate');
 const [bulkNewRole, setBulkNewRole] = useState('instructor');
 const [bulkRunning, setBulkRunning] = useState(false);

 const administrativeRoles = ['super_admin', 'super_management', 'admin', 'branch_admin', 'branch_management'];

 const { data: branchesData } = useQuery({
 queryKey: superQueryKeys.branches(),
 queryFn: async () => {
 const res = await api.get('/super/branches');
 return res.data?.data || [];
 },
 staleTime: 5 * 60 * 1000 // Cache branches for 5 mins
 });

 const branches = branchesData || [];

 const { data: permissionsCatalog = [] } = useQuery({
  queryKey: superQueryKeys.permissionsCatalog(),
  queryFn: async () => {
   const res = await api.get('/users/permissions/catalog');
   return res.data?.data?.catalog || [];
  },
  staleTime: 10 * 60 * 1000
 });

 const { data: usersData, isLoading: loading, isPlaceholderData } = useQuery({
 queryKey: superQueryKeys.users({ page, filterRole, filterBranch, search }),
 queryFn: async () => {
 const res = await api.get('/users', {
 params: {
 page,
 limit,
 role: filterRole,
 branchId: filterBranch,
 q: search
 }
 });
 return res.data || { data: [], total: 0, totalPages: 1 };
 },
 placeholderData: keepPreviousData,
 staleTime: 30000 // 30 sec freshness
 });

 const users = usersData?.data || [];
 const total = usersData?.total || 0;
 const totalPages = usersData?.totalPages || 1;


 const handleSubmit = async (e) => {
 e.preventDefault();
 const loadingToast = toast.loading(editingUser ? 'Synchronizing node...' : 'Provisioning new system user...');
 try {
 if (editingUser) {
 await api.put(`/users/${editingUser._id}`, formData);
 toast.success('Cognitive node updated', { id: loadingToast });
 } else if (setupMode === 'invite') {
 await api.post('/users/invite', {
 name: formData.name, email: formData.email, role: formData.role,
 branchId: formData.branchId, phone: formData.phone
 });
 toast.success('Invitation email sent — the staff member will set their own password', { id: loadingToast });
 } else {
 await api.post('/users', formData);
 toast.success('New user established', { id: loadingToast });
 }
 setShowModal(false);
 queryClient.invalidateQueries(['users']);
 } catch (err) {
 toast.error(err?.response?.data?.message || 'Transaction failed', { id: loadingToast });
 }
 };

 const handleDeactivate = async (user) => {
 if (!confirm(`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} this user?`)) return;
 try {
 await api.patch(`/users/${user._id}/status`);
 toast.success('Access state toggled');
 queryClient.invalidateQueries(['users']);
 } catch (err) {
 toast.error('Failed to update state');
 }
 };

 const handleDelete = async (user) => {
 if (!confirm('CRITICAL: This will permanently remove the user and all associated security keys. Proceed?')) return;
 try {
 await api.delete(`/users/${user._id}`);
 toast.success('Node purged from system');
 queryClient.invalidateQueries(['users']);
 } catch (err) {
 toast.error('Purge failed');
 }
 };

 const handleImpersonate = async (user) => {
  if (user._id === currentUser?.id) {
   toast.error('You are already active in this administrative session');
   return;
  }
  if (['super_admin', 'super_management'].includes(user.role)) {
   toast.error('Impersonating another Super Administrator is prohibited by security policy');
   return;
  }
  if (!confirm(`AUDIT WARNING: Enter platform session as ${user.name} (${user.role.replace('_', ' ')})?\n\nAll actions performed will be auditable under your Super Admin credentials.`)) {
   return;
  }

  const loadingToast = toast.loading(`Generating secure session credentials for ${user.name}...`);
  try {
   const res = await api.post(`/auth/impersonate/${user._id}`);
   if (res.data?.success && res.data?.token) {
    localStorage.setItem(
     'syict_impersonation',
     JSON.stringify({
      token: res.data.token,
      targetUser: res.data.targetUser,
      originalAdmin: res.data.impersonation?.originalAdmin,
     })
    );
    window.dispatchEvent(new Event('syict-impersonation-change'));
    toast.success(`Session active: Viewing as ${user.name}`, { id: loadingToast });

    // Determine target dashboard workspace
    let targetWorkspace = `/${locale}/super`;
    if (user.role === 'student') targetWorkspace = `/${locale}/student`;
    else if (user.role === 'instructor') targetWorkspace = `/${locale}/instructor`;
    else if (['branch_admin', 'branch_management', 'employee'].includes(user.role)) targetWorkspace = `/${locale}/branch`;

    window.location.href = targetWorkspace;
   }
  } catch (err) {
   toast.error(err?.response?.data?.message || 'Impersonation failed', { id: loadingToast });
  }
 };

 const handleForceLogout = async (user) => {
  if (!confirm(`Revoke all active sessions for ${user.name}?\n\nThis will invalidate their active JWT token immediately across all devices.`)) {
   return;
  }

  const loadingToast = toast.loading(`Revoking all active sessions for ${user.name}...`);
  try {
   const res = await api.post(`/users/${user._id}/force-logout`);
   toast.success(res.data?.message || `Sessions revoked for ${user.name}`, { id: loadingToast });
   queryClient.invalidateQueries(['users']);
  } catch (err) {
   toast.error(err?.response?.data?.message || 'Failed to revoke user sessions', { id: loadingToast });
  }
 };

 const openPermissionsModal = (user) => {
  setPermissionsModalUser(user);
  setSelectedPermissions(user.permissions || []);
 };

 const handleSavePermissions = async () => {
  if (!permissionsModalUser) return;
  setSavingPermissions(true);
  const loadingToast = toast.loading(`Deploying PBAC policy to ${permissionsModalUser.name}...`);
  try {
   await api.put(`/users/${permissionsModalUser._id}/permissions`, {
    permissions: selectedPermissions,
   });
   toast.success('Permissions successfully synchronized', { id: loadingToast });
   queryClient.invalidateQueries(['users']);
   setPermissionsModalUser(null);
  } catch (err) {
   toast.error(err?.response?.data?.message || 'Failed to synchronize permissions', { id: loadingToast });
  } finally {
   setSavingPermissions(false);
  }
 };

 const togglePermission = (permId) => {
  setSelectedPermissions((prev) =>
   prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId]
  );
 };

 const toggleCategoryPermissions = (permsInCategory) => {
  const permIds = permsInCategory.map((p) => p.id);
  const allSelected = permIds.every((id) => selectedPermissions.includes(id));
  if (allSelected) {
   setSelectedPermissions((prev) => prev.filter((id) => !permIds.includes(id)));
  } else {
   setSelectedPermissions((prev) => [...new Set([...prev, ...permIds])]);
  }
 };

 const handleTransferCampus = async (e) => {
  e.preventDefault();
  if (!transferModalStudent || !targetBranchId) {
   toast.error('Please select a target campus');
   return;
  }
  setTransferring(true);
  const loadingToast = toast.loading(`Transferring student ${transferModalStudent.name} to target campus...`);
  try {
   const res = await api.post('/super/transfers/student', {
    studentId: transferModalStudent._id,
    toBranchId: targetBranchId,
    reason: transferReason,
    transferNotes,
   });
   toast.success(res.data?.message || 'Campus transfer completed successfully!', { id: loadingToast });
   queryClient.invalidateQueries(['users']);
   setTransferModalStudent(null);
   setTargetBranchId('');
   setTransferNotes('');
  } catch (err) {
   toast.error(err?.response?.data?.message || 'Transfer failed', { id: loadingToast });
  } finally {
   setTransferring(false);
  }
 };

 const openForm = (user = null) => {
 if (user) {
 setEditingUser(user);
 setFormData({
 name: user.name, email: user.email, role: user.role, 
 branchId: user.branchId || '', phone: user.phone || '', isActive: user.isActive
 });
 } else {
 setEditingUser(null);
 setSetupMode('invite');
 setFormData({ name: '', email: '', password: '', role: 'instructor', branchId: '', phone: '', isActive: true });
 }
 setShowModal(true);
 };

 const toggleUserSelection = (userId) => {
 setSelectedUserIds((prev) =>
 prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
 );
 };

 const toggleSelectAll = () => {
 setSelectedUserIds((prev) =>
 prev.length === users.length ? [] : users.map((u) => u._id)
 );
 };

 const clearSelection = () => setSelectedUserIds([]);

 const handleBulkAction = async () => {
 if (!selectedUserIds.length) {
 toast.error('Select at least one user node first');
 return;
 }
 setBulkRunning(true);
 const loadingToast = toast.loading(`Applying "${bulkAction}" to ${selectedUserIds.length} user node(s)...`);
 try {
 const payload = { userIds: selectedUserIds, action: bulkAction };
 if (bulkAction === 'change_role') payload.newRole = bulkNewRole;
 const res = await api.post('/users/bulk-action', payload);
 toast.success(res.data?.message || 'Bulk action completed successfully', { id: loadingToast });
 setSelectedUserIds([]);
 queryClient.invalidateQueries(['users']);
 } catch (err) {
 toast.error(err?.response?.data?.message || 'Bulk action failed', { id: loadingToast });
 } finally {
 setBulkRunning(false);
 }
 };

 const handleBulkImportSuccess = () => {
 queryClient.invalidateQueries(['users']);
 };

 return (
 <div className="space-y-4 pb-6 w-full">
 {/* Dynamic Header */}
 <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
 <div>
 <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter leading-tight">User Registry</h1>
 <p className="text-slate-400 font-medium text-xs mt-0.5 uppercase tracking-widest text-[10px] leading-tight">Global Ecosystem Oversight</p>
 </div>
 <div className="flex items-center gap-2">
 <button 
 onClick={() => setShowBulkImport(true)}
 className="hidden md:flex px-3.5 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 font-black shadow-xs hover:scale-[1.02] active:scale-95 transition-all items-center gap-2 rounded-lg text-xs sm:text-sm leading-tight"
 >
 <HiOutlineArrowUpTray size={16} />
 Bulk Import
 </button>
 <button 
 onClick={() => openForm()}
 className="hidden md:flex px-4 py-2 bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all items-center gap-2 rounded-lg text-xs sm:text-sm leading-tight"
 >
 <HiOutlineUserPlus size={18} />
 Provision User
 </button>
 </div>
 </header>

 {/* Bulk Action Bar */}
 {selectedUserIds.length > 0 && (
 <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 bg-indigo-50 border border-indigo-200 p-2.5 sm:p-3 rounded-lg">
 <div className="flex items-center gap-2 text-indigo-700 font-black text-xs sm:text-sm leading-tight">
 <HiOutlineUserGroup size={18} />
 {selectedUserIds.length} node(s) selected
 </div>
 <div className="flex-1 flex flex-wrap items-center gap-2">
 <select
 value={bulkAction}
 onChange={(e) => setBulkAction(e.target.value)}
 className="px-2.5 py-1.5 bg-white border border-indigo-200 text-xs font-bold focus:ring-2 focus:ring-indigo-500 rounded-md leading-tight"
 >
 <option value="activate">Activate</option>
 <option value="suspend">Suspend</option>
 <option value="force_logout">Force Logout</option>
 <option value="change_role">Change Role</option>
 </select>
 {bulkAction === 'change_role' && (
 <select
 value={bulkNewRole}
 onChange={(e) => setBulkNewRole(e.target.value)}
 className="px-2.5 py-1.5 bg-white border border-indigo-200 text-xs font-bold focus:ring-2 focus:ring-indigo-500 rounded-md leading-tight"
 >
 <option value="student">Student</option>
 <option value="instructor">Instructor</option>
 <option value="employee">Employee</option>
 <option value="branch_admin">Branch Admin</option>
 <option value="branch_management">Branch Management</option>
 </select>
 )}
 <button
 type="button"
 onClick={handleBulkAction}
 disabled={bulkRunning}
 className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-sm shadow-indigo-600/20 disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer leading-tight"
 >
 {bulkRunning ? <HiOutlineArrowPath className="animate-spin" size={14} /> : <HiOutlineCheck size={14} />}
 {bulkRunning ? 'Applying...' : 'Apply'}
 </button>
 <button
 type="button"
 onClick={clearSelection}
 className="px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors leading-tight"
 >
 Clear
 </button>
 </div>
 </div>
 )}

 {/* Control Bar */}
 <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5 bg-white p-2.5 sm:p-3 shadow-xs border border-slate-50 rounded-lg">
 <div className="lg:col-span-2 relative">
 <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
 <input 
 type="text"
 placeholder="Search by name, email, or credentials..."
 className="w-full pl-10 pr-3.5 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md leading-tight"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 />
 </div>
 <div className="relative">
 <HiOutlineFunnel className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
 <select 
 className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none leading-tight"
 value={filterRole}
 onChange={(e) => setFilterRole(e.target.value)}
 >
  {ROLE_FILTERS.map(role => (
  <option key={role.value} value={role.value}>{role.label}</option>
  ))}
  </select>
 </div>
 <div className="relative">
 <HiOutlineBuildingOffice className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
 <select 
 className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none leading-tight"
 value={filterBranch}
 onChange={(e) => setFilterBranch(e.target.value)}
 >
 <option value="">All Branches</option>
 {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
 </select>
 </div>
 </div>

 {/* Mobile Card Grid (Visible on SM) */}
 <div className="grid grid-cols-1 gap-2.5 md:hidden">
 {loading ? (
 [...Array(3)].map((_, i) => (
 <div key={i} className="bg-white p-3 border border-slate-100 shadow-xs h-28 animate-pulse rounded-lg" />
 ))
 ) : (
 users.length > 0 ? users.map(user => (
 <div key={user._id} className="bg-white p-3 border border-slate-100 shadow-xs flex flex-col gap-2.5 rounded-lg">
 <div className="flex justify-between items-start">
 <div className="flex items-center gap-2.5">
 <input
 type="checkbox"
 checked={selectedUserIds.includes(user._id)}
 onChange={() => toggleUserSelection(user._id)}
 className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
 aria-label={`Select ${user.name}`}
 />
 <div className="w-9 h-9 bg-indigo-50 text-indigo-500 font-black flex items-center justify-center border border-indigo-100 shrink-0 rounded-lg text-sm">
 {user.name.charAt(0)}
 </div>
 <div>
 <p className="font-extrabold text-slate-900 leading-tight mb-0.5 text-xs sm:text-sm">{user.name}</p>
 <p className="text-[11px] text-slate-400 font-medium leading-tight">{user.email}</p>
 </div>
 </div>
 <button onClick={() => openForm(user)} className="p-1.5 text-indigo-600 bg-indigo-50 shrink-0 rounded-md">
 <HiOutlinePencilSquare size={18} />
 </button>
 </div>
 
 <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-50">
 <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest leading-tight ${
 user.role === 'super_admin' ? 'bg-pink-100 text-pink-600' :
 user.role === 'branch_admin' ? 'bg-blue-100 text-blue-600' :
 user.role === 'instructor' ? 'bg-amber-100 text-amber-600' :
 'bg-emerald-100 text-emerald-600'
 }`}>
 {user.role.replace('_', ' ')}
 </span>
 <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">
 <HiOutlineBuildingOffice className="text-slate-300" size={13} />
 {user.branchId ? (branches.find(b => b._id === user.branchId)?.name || 'Unknown Node') : 'Global HQ'}
 </div>
 <div className={`ml-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-widest leading-tight ${user.isActive ? 'text-emerald-500' : 'text-rose-500'}`}>
 {user.isActive ? <HiOutlineCheckCircle size={13} /> : <HiOutlineXCircle size={13} />}
 {user.isActive ? 'Active' : 'Suspended'}
 </div>
 </div>
 
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-0.5">
 {!['super_admin', 'super_management'].includes(user.role) && user._id !== currentUser?.id && (
 <button onClick={() => handleImpersonate(user)} className="w-full py-1.5 bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-100 flex justify-center items-center gap-1.5 rounded transition-all leading-tight">
 <HiOutlineArrowRightOnRectangle size={14} /> Login As
 </button>
 )}
 {user.role === 'student' && (
 <button onClick={() => {
  setTransferModalStudent(user);
  setTargetBranchId(branches.find(b => b._id !== user.branchId)?._id || '');
 }} className="w-full py-1.5 bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 flex justify-center items-center gap-1.5 rounded transition-all leading-tight">
  <HiOutlineArrowsRightLeft size={14} /> Transfer
 </button>
 )}
 <button onClick={() => openPermissionsModal(user)} className="w-full py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 flex justify-center items-center gap-1.5 rounded transition-all leading-tight">
 <HiOutlineKey size={14} /> PBAC
 </button>
 <button onClick={() => handleForceLogout(user)} className="w-full py-1.5 bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 flex justify-center items-center gap-1.5 rounded transition-all leading-tight">
 <HiOutlineLockClosed size={14} /> Revoke
 </button>
 <button onClick={() => handleDeactivate(user)} className="w-full py-1.5 bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 flex justify-center items-center gap-1.5 rounded transition-all leading-tight">
 <HiOutlineShieldCheck size={14} /> {user.isActive ? 'Suspend' : 'Activate'}
 </button>
 <button onClick={() => handleDelete(user)} className="w-full py-1.5 bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 flex justify-center items-center gap-1.5 rounded transition-all col-span-2 sm:col-span-1 leading-tight">
 <HiOutlineTrash size={14} /> Delete
 </button>
 </div>
 </div>
 )) : (
 <div className="py-6 text-center space-y-1.5 bg-white border border-slate-100 rounded-lg">
 <HiOutlineUserPlus size={32} className="mx-auto text-slate-200" />
 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-tight">No biological nodes detected</p>
 </div>
 )
 )}
 </div>

 {/* Desktop Registry Table (Hidden on SM) */}
 <div className="hidden md:block bg-white border border-slate-100 shadow-xs overflow-hidden overflow-x-auto rounded-lg">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
 <th className="px-3 py-2.5 w-10">
 <input
 type="checkbox"
 checked={users.length > 0 && selectedUserIds.length === users.length}
 onChange={toggleSelectAll}
 className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
 title="Select all nodes on this page"
 />
 </th>
 <th className="px-4 py-2.5">Identity Node</th>
 <th className="px-4 py-2.5">Access Layer</th>
 <th className="px-4 py-2.5">Branch Assignment</th>
 <th className="px-4 py-2.5">State</th>
 <th className="px-4 py-2.5 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-50 text-slate-700">
 {loading ? (
 [...Array(5)].map((_, i) => (
 <tr key={i} className="animate-pulse">
 <td colSpan={6} className="px-4 py-4 h-12 bg-slate-50/20 rounded-md" />
 </tr>
 ))
 ) : (
 users.map(user => (
 <tr key={user._id} className="group hover:bg-slate-50/50 transition-all rounded-md">
 <td className="px-3 py-2.5">
 <input
 type="checkbox"
 checked={selectedUserIds.includes(user._id)}
 onChange={() => toggleUserSelection(user._id)}
 className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
 aria-label={`Select ${user.name}`}
 />
 </td>
 <td className="px-4 py-2.5">
 <div className="flex items-center gap-2.5">
 <div className="w-9 h-9 bg-indigo-50 text-indigo-500 font-black flex items-center justify-center border border-indigo-100 rounded-lg text-sm shrink-0">
 {user.name.charAt(0)}
 </div>
 <div>
 <p className="font-extrabold text-slate-900 leading-tight mb-0.5 text-xs sm:text-sm">{user.name}</p>
 <p className="text-[11px] text-slate-400 font-medium leading-tight">{user.email}</p>
 </div>
 </div>
 </td>
 <td className="px-4 py-2.5">
 <div className="flex flex-col items-start gap-0.5">
 <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest leading-tight ${
 user.role === 'super_admin' ? 'bg-pink-100 text-pink-600' :
 user.role === 'branch_admin' ? 'bg-blue-100 text-blue-600' :
 user.role === 'instructor' ? 'bg-amber-100 text-amber-600' :
 'bg-emerald-100 text-emerald-600'
 }`}>
 {user.role.replace('_', ' ')}
 </span>
 {user.permissions?.length > 0 && (
 <button
 type="button"
 onClick={() => openPermissionsModal(user)}
 className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-50 text-indigo-600 border border-indigo-200/50 hover:bg-indigo-100 transition-colors leading-tight"
 title={user.permissions.join(', ')}
 >
 <HiOutlineKey size={10} /> {user.permissions.length} PBAC
 </button>
 )}
 </div>
 </td>
 <td className="px-4 py-2.5">
 <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 leading-tight">
 <HiOutlineBuildingOffice className="text-slate-300" size={14} />
 {user.branchId ? (branches.find(b => b._id === user.branchId)?.name || 'Unknown Node') : 'Global HQ'}
 </div>
 </td>
 <td className="px-4 py-2.5">
 <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest leading-tight ${user.isActive ? 'text-emerald-500' : 'text-rose-500'}`}>
 {user.isActive ? <HiOutlineCheckCircle size={13} /> : <HiOutlineXCircle size={13} />}
 {user.isActive ? 'Active Node' : 'Suspended'}
 </div>
 </td>
 <td className="px-4 py-2.5 text-right font-medium">
 <div className="flex justify-end items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
 {user.role === 'student' && (
 <button 
 type="button"
 onClick={() => {
  setTransferModalStudent(user);
  setTargetBranchId(branches.find(b => b._id !== user.branchId)?._id || '');
 }}
 title="Transfer Student to Another Campus"
 className="p-1 hover:bg-teal-50 hover:text-teal-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineArrowsRightLeft size={16} />
 </button>
 )}
 {!['super_admin', 'super_management'].includes(user.role) && user._id !== currentUser?.id && (
 <button 
 type="button"
 onClick={() => handleImpersonate(user)} 
 title="Impersonate / Login As this user"
 className="p-1 hover:bg-amber-50 hover:text-amber-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineArrowRightOnRectangle size={16} />
 </button>
 )}
 <button 
 type="button"
 onClick={() => openPermissionsModal(user)} 
 title="Manage PBAC Permissions Matrix"
 className="p-1 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineKey size={16} />
 </button>
 <button 
 type="button"
 onClick={() => handleForceLogout(user)} 
 title="Revoke All Active Sessions (Force Logout)"
 className="p-1 hover:bg-rose-50 hover:text-rose-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineLockClosed size={16} />
 </button>
 <button type="button" onClick={() => openForm(user)} title="Edit Node" className="p-1 hover:bg-white hover:text-indigo-600 transition-all text-slate-400 rounded">
 <HiOutlinePencilSquare size={16} />
 </button>
 <button type="button" onClick={() => handleDeactivate(user)} title={user.isActive ? "Deactivate" : "Activate"} className="p-1 hover:bg-white hover:text-amber-600 transition-all text-slate-400 rounded">
 <HiOutlineShieldCheck size={16} />
 </button>
 <button type="button" onClick={() => handleDelete(user)} title="Delete Node" className="p-1 hover:bg-white hover:text-rose-600 transition-all text-slate-400 rounded">
 <HiOutlineTrash size={16} />
 </button>
 </div>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>

 {/* Pagination Footer */}
 {!loading && users.length > 0 && (
 <div className="px-4 py-2.5 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
 <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">
 {total > 0 ? (
 <>Showing <span className="text-slate-900">{(page-1)*limit + 1}</span> - <span className="text-slate-900">{Math.min(page*limit, total)}</span> of <span className="text-slate-900">{total}</span> nodes</>
 ) : (
 "No active nodes matching criteria"
 )}
 </div>
 <div className="flex items-center gap-1.5">
 <button 
 type="button"
 disabled={page === 1}
 onClick={() => setPage(p => p - 1)}
 className="py-1 px-2.5 bg-white border border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-xs rounded leading-tight"
 >
 Previous
 </button>
 <div className="flex items-center gap-1">
 {[...Array(totalPages)].map((_, i) => {
 const p = i + 1;
 if (totalPages > 5 && Math.abs(p - page) > 1 && p !== 1 && p !== totalPages) {
 if (Math.abs(p - page) === 2) return <span key={p} className="text-slate-300">...</span>;
 return null;
 }
 return (
 <button 
 key={p}
 type="button"
 onClick={() => setPage(p)}
 className={`w-7 h-7 text-xs font-black rounded transition-all leading-tight ${page === p ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
 >
 {p}
 </button>
 );
 })}
 </div>
 <button 
 type="button"
 disabled={page === totalPages}
 onClick={() => setPage(p => p + 1)}
 className="py-1 px-2.5 bg-white border border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-xs rounded leading-tight"
 >
 Next
 </button>
 </div>
 </div>
 )}

 {users.length === 0 && !loading && (
 <div className="py-6 text-center space-y-1.5">
 <HiOutlineUserPlus size={32} className="mx-auto text-slate-200" />
 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-tight">No biological nodes detected with current parameters</p>
 </div>
 )}
 </div>

 {/* Mobile Sticky CTA */}
 <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/80 backdrop-blur-md border-t border-slate-100 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] z-40">
 <button 
 onClick={() => openForm()}
 className="w-full py-2.5 bg-indigo-600 text-white font-black shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all rounded-lg leading-tight text-xs sm:text-sm"
 >
 <HiOutlineUserPlus size={18} />
 Provision User
 </button>
 </div>

 {/* Onboarding / Edit Modal */}
 <Portal>
 <AnimatePresence>
 {showModal && (
 <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-3">
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setShowModal(false)}
 className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm"
 />
 <motion.div 
 initial={{ scale: 0.95, opacity: 0, y: 40 }}
 animate={{ scale: 1, opacity: 1, y: 0 }}
 exit={{ scale: 0.95, opacity: 0, y: 40 }}
 className="relative w-full max-w-2xl bg-white rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
 >
 <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-3 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:pb-5">
 <div className="flex justify-between items-center mb-2.5">
 <div>
 <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter leading-tight">
 {editingUser ? 'Synchronize Identity' : 'Provision New Identity'}
 </h3>
 <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-0.5 leading-tight">Ecosystem Node Management</p>
 </div>
 <button type="button" onClick={() => setShowModal(false)} className="w-8 h-8 bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 rounded-lg">
 <HiOutlineXCircle size={20} />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-tight">Universal Name</label>
 <input 
 required
 className="w-full px-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md leading-tight"
 value={formData.name}
 onChange={(e) => setFormData({...formData, name: e.target.value})}
 />
 </div>
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-tight">Email Credentials</label>
 <input 
 required
 type="email"
 className="w-full px-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md leading-tight"
 value={formData.email}
 onChange={(e) => setFormData({...formData, email: e.target.value})}
 />
 </div>
 </div>

 {!editingUser && (
 <div className="bg-slate-50 p-2.5 sm:p-3 space-y-2 rounded-md">
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Account Setup Method</p>
 <div className="grid grid-cols-2 gap-1.5">
 <button
 type="button"
 onClick={() => setSetupMode('invite')}
 className={`px-3 py-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 rounded-md leading-tight ${setupMode === 'invite' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
 >
 <HiOutlineEnvelope size={15} /> Email Invite Link
 </button>
 <button
 type="button"
 onClick={() => setSetupMode('password')}
 className={`px-3 py-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 rounded-md leading-tight ${setupMode === 'password' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
 >
 <HiOutlineLockClosed size={15} /> Set Password Now
 </button>
 </div>

 {setupMode === 'invite' ? (
 <p className="text-[11px] font-medium text-slate-400 leading-normal">
 The staff member receives an email with their role and branch pre-assigned. They set their own secure password via a link (valid 72 hours). Recommended for Instructor / Branch Admin / Branch Management.
 </p>
 ) : (
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-tight">Initial Secure Key (Password)</label>
 <input
 required
 type="password"
 minLength={8}
 className="w-full px-3 py-2 bg-white border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md leading-tight"
 value={formData.password}
 onChange={(e) => setFormData({...formData, password: e.target.value})}
 />
 </div>
 )}
 </div>
 )}

 <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-tight">Hierarchy Role</label>
 <select 
 className="w-full px-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50 leading-tight rounded-md"
 value={formData.role}
 disabled={editingUser && (editingUser._id === currentUser?.id || administrativeRoles.includes(editingUser.role))}
 onChange={(e) => setFormData({...formData, role: e.target.value})}
 >
 <option value="instructor">Instructor</option>
 <option value="branch_admin">Branch Admin</option>
 <option value="branch_management">Branch Management</option>
 <option value="student">Student</option>
 <option value="super_admin">Super Admin</option>
 <option value="super_management">Super Management</option>
 </select>
 {editingUser && (editingUser._id === currentUser?.id || administrativeRoles.includes(editingUser.role)) && (
 <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter ml-1 italic leading-tight">
 {editingUser._id === currentUser?.id ? 'Self-role reconfiguration restricted' : 'Administrative hierarchy nodes are protected'}
 </p>
 )}
 </div>
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 leading-tight">Geographical Node (Branch)</label>
 <select 
 className="w-full px-3 py-2 bg-slate-50 border-none text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all leading-tight rounded-md"
 value={formData.branchId}
 onChange={(e) => setFormData({...formData, branchId: e.target.value})}
 >
 <option value="">Global Head Office</option>
 {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
 </select>
 </div>
 </div>

 <div className="flex items-center justify-between pt-1.5">
 <div className="flex items-center gap-2.5">
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Active Access Node</p>
 <button 
 type="button"
 onClick={() => setFormData({...formData, isActive: !formData.isActive})}
 className={`w-12 h-6 transition-all relative rounded-full ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
 >
 <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${formData.isActive ? 'right-0.5' : 'left-0.5'}`} />
 </button>
 </div>
 <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-black shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all rounded-md text-xs sm:text-sm leading-tight">
 {editingUser ? 'Synchronize Updates' : 'Establish Access Node'}
 </button>
 </div>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </Portal>

 {/* PBAC Permissions Matrix Modal */}
 <Portal>
 <AnimatePresence>
 {permissionsModalUser && (
 <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2.5 md:p-4">
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setPermissionsModalUser(null)}
 className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
 />
 <motion.div 
 initial={{ scale: 0.95, opacity: 0, y: 20 }}
 animate={{ scale: 1, opacity: 1, y: 0 }}
 exit={{ scale: 0.95, opacity: 0, y: 20 }}
 className="relative w-full max-w-4xl bg-white rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden z-10"
 >
 {/* Header */}
 <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
 <div className="flex items-center gap-2.5">
 <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
 <HiOutlineKey size={20} />
 </div>
 <div>
 <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2 leading-tight">
 <span>PBAC Permissions Matrix</span>
 <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 font-bold uppercase leading-tight">
 {permissionsModalUser.role.replace('_', ' ')}
 </span>
 </h3>
 <p className="text-xs text-slate-400 mt-0.5 leading-tight">
 Managing granular access for <strong className="text-white">{permissionsModalUser.name}</strong> ({permissionsModalUser.email})
 </p>
 </div>
 </div>
 <button 
 onClick={() => setPermissionsModalUser(null)}
 className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-all"
 >
 <HiOutlineXCircle size={20} />
 </button>
 </div>

 {/* Sub-header info bar */}
 <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs shrink-0">
 <div className="flex items-center gap-2 font-bold text-slate-600 leading-tight">
 <span>Selected Permissions:</span>
 <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[11px] leading-tight">
 {selectedPermissions.length} Active
 </span>
 </div>
 <div className="flex items-center gap-2">
 <button
 type="button"
 onClick={() => setSelectedPermissions([])}
 className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded text-xs font-bold transition-all leading-tight"
 >
 Clear All
 </button>
 </div>
 </div>

 {/* Body: Grouped Categories */}
 <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3 flex-1">
 {permissionsCatalog && permissionsCatalog.length > 0 ? (
 permissionsCatalog.map((category) => {
 const catPermIds = category.permissions.map(p => p.id);
 const allCatSelected = catPermIds.length > 0 && catPermIds.every(id => selectedPermissions.includes(id));

 return (
 <div key={category.category} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
 <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
 <div className="flex items-center gap-2 font-black text-slate-800 text-xs sm:text-sm leading-tight">
 <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
 <span>{category.category}</span>
 <span className="text-[11px] font-bold text-slate-400">
 ({catPermIds.filter(id => selectedPermissions.includes(id)).length}/{category.permissions.length})
 </span>
 </div>
 <button
 type="button"
 onClick={() => toggleCategoryPermissions(category.permissions)}
 className={`text-xs font-bold px-2 py-0.5 rounded transition-colors leading-tight ${
 allCatSelected
 ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
 : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
 }`}
 >
 {allCatSelected ? 'Deselect Category' : 'Select Category'}
 </button>
 </div>

 <div className="p-2.5 sm:p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
 {category.permissions.map((perm) => {
 const isChecked = selectedPermissions.includes(perm.id);
 return (
 <label
 key={perm.id}
 className={`flex items-start gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
 isChecked
 ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-200'
 : 'bg-white border-slate-100 hover:border-slate-300'
 }`}
 >
 <input
 type="checkbox"
 checked={isChecked}
 onChange={() => togglePermission(perm.id)}
 className="mt-0.5 w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
 />
 <div className="flex-1">
 <div className="flex items-center justify-between">
 <span className="text-xs font-black text-slate-900 leading-tight">{perm.name}</span>
 <code className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded leading-tight">
 {perm.id}
 </code>
 </div>
 <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{perm.description}</p>
 </div>
 </label>
 );
 })}
 </div>
 </div>
 );
 })
 ) : (
 <div className="py-6 text-center text-slate-400 text-xs font-bold leading-tight">
 Loading permissions catalog...
 </div>
 )}
 </div>

 {/* Footer */}
 <div className="p-3 px-4 sm:px-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
 <p className="text-xs text-slate-400 font-medium text-center sm:text-left leading-normal">
 Changes take effect immediately upon next user authentication token verification.
 </p>
 <div className="flex items-center gap-2">
 <button
 type="button"
 onClick={() => setPermissionsModalUser(null)}
 className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all leading-tight"
 >
 Cancel
 </button>
 <button
 type="button"
 disabled={savingPermissions}
 onClick={handleSavePermissions}
 className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-black text-xs shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-1.5 leading-tight"
 >
 {savingPermissions ? <HiOutlineArrowPath className="animate-spin" size={14} /> : <HiOutlineKey size={14} />}
 <span>Save Permissions Matrix</span>
 </button>
 </div>
 </div>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </Portal>

 {/* Transfer Student Campus Modal */}
 <Portal>
 <AnimatePresence>
 {transferModalStudent && (
 <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3">
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setTransferModalStudent(null)}
 className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
 />
 <motion.div
 initial={{ scale: 0.95, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.95, opacity: 0 }}
 className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10"
 >
 <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
 <div className="flex items-center gap-2.5">
 <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
 <HiOutlineArrowsRightLeft size={18} />
 </div>
 <div>
 <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">Transfer Student Campus</h3>
 <p className="text-xs text-slate-400 leading-tight mt-0.5">Reassign campus, active enrollments, and ledger</p>
 </div>
 </div>
 <button
 type="button"
 onClick={() => setTransferModalStudent(null)}
 className="text-slate-400 hover:text-slate-600 text-lg font-bold"
 >
 ✕
 </button>
 </div>

 <form onSubmit={handleTransferCampus} className="p-3.5 sm:p-4 space-y-2.5">
 <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-xs">
 <div className="font-bold text-slate-800 leading-tight">{transferModalStudent.name}</div>
 <div className="text-slate-500 leading-tight mt-0.5">{transferModalStudent.email} • Phone: {transferModalStudent.phone || 'N/A'}</div>
 <div className="mt-1 font-semibold text-teal-700 leading-tight">
 Current Campus: {branches.find(b => b._id === transferModalStudent.branchId)?.name || 'Unknown / Global'}
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1 leading-tight">
 Target Destination Campus *
 </label>
 <select
 required
 value={targetBranchId}
 onChange={(e) => setTargetBranchId(e.target.value)}
 className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-teal-500 leading-tight"
 >
 <option value="">Select Target Campus...</option>
 {branches.filter(b => b._id !== transferModalStudent.branchId).map(b => (
 <option key={b._id} value={b._id}>{b.name} ({b.city})</option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1 leading-tight">
 Reason for Transfer
 </label>
 <select
 value={transferReason}
 onChange={(e) => setTransferReason(e.target.value)}
 className="w-full p-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-teal-500 leading-tight"
 >
 <option value="relocation">Student Residential Relocation</option>
 <option value="schedule_conflict">Schedule & Batch Timing Preference</option>
 <option value="course_availability">Specific Course/Lab Facility Availability</option>
 <option value="administrative">Administrative Reorganization</option>
 <option value="other">Other Official Reason</option>
 </select>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1 leading-tight">
 Transfer Audit Notes / Approval Reference
 </label>
 <textarea
 rows={3}
 value={transferNotes}
 onChange={(e) => setTransferNotes(e.target.value)}
 placeholder="Official approval reference or instructions for destination campus..."
 className="w-full p-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-teal-500"
 />
 </div>

 <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1.5">
 <button
 type="button"
 onClick={() => setTransferModalStudent(null)}
 className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg leading-tight"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={transferring || !targetBranchId}
 className="px-4 py-1.5 text-xs font-black text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 disabled:opacity-50 flex items-center gap-1.5 leading-tight"
 >
 {transferring ? <HiOutlineArrowPath className="animate-spin" size={14} /> : <HiOutlineArrowsRightLeft size={14} />}
 <span>{transferring ? 'Transferring...' : 'Execute Campus Transfer'}</span>
 </button>
 </div>
 </form>
 </motion.div>
 </div>
 )}
 </AnimatePresence>
 </Portal>

 {/* Bulk User Import (CSV) Modal */}
 {showBulkImport && (
 <Portal>
 <BulkUserImportModal
 isOpen={showBulkImport}
 onClose={() => setShowBulkImport(false)}
 onSuccess={handleBulkImportSuccess}
 />
 </Portal>
 )}
 </div>
 );
}
