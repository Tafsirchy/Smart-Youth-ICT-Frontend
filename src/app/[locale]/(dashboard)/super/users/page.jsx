'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Portal from '@/components/ui/Portal';
import { useRole } from '@/hooks/useRole';
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
 HiOutlineArrowsRightLeft
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

 const administrativeRoles = ['super_admin', 'super_management', 'admin', 'branch_admin', 'branch_management'];

 const { data: branchesData } = useQuery({
 queryKey: ['branches'],
 queryFn: async () => {
 const res = await api.get('/super/branches');
 return res.data?.data || [];
 },
 staleTime: 5 * 60 * 1000 // Cache branches for 5 mins
 });

 const branches = branchesData || [];

 const { data: permissionsCatalog = [] } = useQuery({
  queryKey: ['permissions-catalog'],
  queryFn: async () => {
   const res = await api.get('/users/permissions/catalog');
   return res.data?.data?.catalog || [];
  },
  staleTime: 10 * 60 * 1000
 });

 const { data: usersData, isLoading: loading, isPlaceholderData } = useQuery({
 queryKey: ['users', { page, filterRole, filterBranch, search }],
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
    targetBranchId,
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

 return (
 <div className="space-y-6 pb-10 max-w-7xl mx-auto">
 {/* Dynamic Header */}
 <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
 <div>
 <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">User Registry</h1>
 <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest text-[10px]">Global Ecosystem Oversight</p>
 </div>
 <button 
 onClick={() => openForm()}
 className="hidden md:flex px-6 py-3 bg-indigo-600 text-white font-black shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all items-center gap-2"
 >
 <HiOutlineUserPlus size={20} />
 Provision User
 </button>
 </header>

 {/* Control Bar */}
 <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 bg-white p-4 shadow-sm border border-slate-50 rounded-lg">
 <div className="lg:col-span-2 relative">
 <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
 <input 
 type="text"
 placeholder="Search by name, email, or credentials..."
 className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 />
 </div>
 <div className="relative">
 <HiOutlineFunnel className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
 <select 
 className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
 value={filterRole}
 onChange={(e) => setFilterRole(e.target.value)}
 >
 <option value="">All Roles</option>
 <option value="student">Students</option>
 <option value="instructor">Instructors</option>
 <option value="branch_admin">Branch Admins</option>
 <option value="branch_management">Branch Management</option>
 <option value="super_admin">Super Admins</option>
 <option value="super_management">Super Management</option>
 </select>
 </div>
 <div className="relative">
 <HiOutlineBuildingOffice className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
 <select 
 className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
 value={filterBranch}
 onChange={(e) => setFilterBranch(e.target.value)}
 >
 <option value="">All Branches</option>
 {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
 </select>
 </div>
 </div>

 {/* Mobile Card Grid (Visible on SM) */}
 <div className="grid grid-cols-1 gap-4 md:hidden">
 {loading ? (
 [...Array(3)].map((_, i) => (
 <div key={i} className="bg-white p-4 border border-slate-100 shadow-sm h-32 animate-pulse rounded-lg" />
 ))
 ) : (
 users.length > 0 ? users.map(user => (
 <div key={user._id} className="bg-white p-4 border border-slate-100 shadow-sm flex flex-col gap-4 rounded-lg">
 <div className="flex justify-between items-start">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-indigo-50 text-indigo-500 font-black flex items-center justify-center border border-indigo-100 shrink-0 rounded-lg">
 {user.name.charAt(0)}
 </div>
 <div>
 <p className="font-extrabold text-slate-900 leading-none mb-1">{user.name}</p>
 <p className="text-xs text-slate-400 font-medium">{user.email}</p>
 </div>
 </div>
 <button onClick={() => openForm(user)} className="p-2 text-indigo-600 bg-indigo-50 shrink-0">
 <HiOutlinePencilSquare size={20} />
 </button>
 </div>
 
 <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-50">
 <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
 user.role === 'super_admin' ? 'bg-pink-100 text-pink-600' :
 user.role === 'branch_admin' ? 'bg-blue-100 text-blue-600' :
 user.role === 'instructor' ? 'bg-amber-100 text-amber-600' :
 'bg-emerald-100 text-emerald-600'
 }`}>
 {user.role.replace('_', ' ')}
 </span>
 <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
 <HiOutlineBuildingOffice className="text-slate-300" size={14} />
 {user.branchId ? (branches.find(b => b._id === user.branchId)?.name || 'Unknown Node') : 'Global HQ'}
 </div>
 <div className={`ml-auto flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'text-emerald-500' : 'text-rose-500'}`}>
 {user.isActive ? <HiOutlineCheckCircle size={14} /> : <HiOutlineXCircle size={14} />}
 {user.isActive ? 'Active' : 'Suspended'}
 </div>
 </div>
 
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
 {!['super_admin', 'super_management'].includes(user.role) && user._id !== currentUser?.id && (
 <button onClick={() => handleImpersonate(user)} className="w-full py-2 bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-100 flex justify-center items-center gap-1.5 rounded transition-all">
 <HiOutlineArrowRightOnRectangle size={15} /> Login As
 </button>
 )}
 {user.role === 'student' && (
 <button onClick={() => {
  setTransferModalStudent(user);
  setTargetBranchId(branches.find(b => b._id !== user.branchId)?._id || '');
 }} className="w-full py-2 bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 flex justify-center items-center gap-1.5 rounded transition-all">
  <HiOutlineArrowsRightLeft size={15} /> Transfer
 </button>
 )}
 <button onClick={() => openPermissionsModal(user)} className="w-full py-2 bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 flex justify-center items-center gap-1.5 rounded transition-all">
 <HiOutlineKey size={15} /> PBAC
 </button>
 <button onClick={() => handleForceLogout(user)} className="w-full py-2 bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 flex justify-center items-center gap-1.5 rounded transition-all">
 <HiOutlineLockClosed size={15} /> Revoke
 </button>
 <button onClick={() => handleDeactivate(user)} className="w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 flex justify-center items-center gap-1.5 rounded transition-all">
 <HiOutlineShieldCheck size={15} /> {user.isActive ? 'Suspend' : 'Activate'}
 </button>
 <button onClick={() => handleDelete(user)} className="w-full py-2 bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 flex justify-center items-center gap-1.5 rounded transition-all col-span-2 sm:col-span-1">
 <HiOutlineTrash size={15} /> Delete
 </button>
 </div>
 </div>
 )) : (
 <div className="py-10 text-center space-y-2 bg-white border border-slate-100 rounded-lg">
 <HiOutlineUserPlus size={40} className="mx-auto text-slate-200" />
 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No biological nodes detected</p>
 </div>
 )
 )}
 </div>

 {/* Desktop Registry Table (Hidden on SM) */}
 <div className="hidden md:block bg-white border border-slate-100 shadow-sm overflow-hidden overflow-x-auto rounded-lg">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
 <th className="px-6 py-4">Identity Node</th>
 <th className="px-6 py-4">Access Layer</th>
 <th className="px-6 py-4">Branch Assignment</th>
 <th className="px-6 py-4">State</th>
 <th className="px-6 py-4 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-50 text-slate-700">
 {loading ? (
 [...Array(5)].map((_, i) => (
 <tr key={i} className="animate-pulse">
 <td colSpan={5} className="px-6 py-6 h-16 bg-slate-50/20 rounded-md" />
 </tr>
 ))
 ) : (
 users.map(user => (
 <tr key={user._id} className="group hover:bg-slate-50/50 transition-all rounded-md">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-indigo-50 text-indigo-500 font-black flex items-center justify-center border border-indigo-100 rounded-lg">
 {user.name.charAt(0)}
 </div>
 <div>
 <p className="font-extrabold text-slate-900 leading-none mb-1">{user.name}</p>
 <p className="text-xs text-slate-400 font-medium">{user.email}</p>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex flex-col items-start gap-1">
 <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
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
 className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-50 text-indigo-600 border border-indigo-200/50 hover:bg-indigo-100 transition-colors"
 title={user.permissions.join(', ')}
 >
 <HiOutlineKey size={10} /> {user.permissions.length} PBAC
 </button>
 )}
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
 <HiOutlineBuildingOffice className="text-slate-300" size={14} />
 {user.branchId ? (branches.find(b => b._id === user.branchId)?.name || 'Unknown Node') : 'Global HQ'}
 </div>
 </td>
 <td className="px-6 py-4">
 <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'text-emerald-500' : 'text-rose-500'}`}>
 {user.isActive ? <HiOutlineCheckCircle size={14} /> : <HiOutlineXCircle size={14} />}
 {user.isActive ? 'Active Node' : 'Suspended'}
 </div>
 </td>
 <td className="px-6 py-4 text-right font-medium">
 <div className="flex justify-end items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
 {user.role === 'student' && (
 <button 
 type="button"
 onClick={() => {
  setTransferModalStudent(user);
  setTargetBranchId(branches.find(b => b._id !== user.branchId)?._id || '');
 }}
 title="Transfer Student to Another Campus"
 className="p-1.5 hover:bg-teal-50 hover:text-teal-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineArrowsRightLeft size={18} />
 </button>
 )}
 {!['super_admin', 'super_management'].includes(user.role) && user._id !== currentUser?.id && (
 <button 
 type="button"
 onClick={() => handleImpersonate(user)} 
 title="Impersonate / Login As this user"
 className="p-1.5 hover:bg-amber-50 hover:text-amber-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineArrowRightOnRectangle size={18} />
 </button>
 )}
 <button 
 type="button"
 onClick={() => openPermissionsModal(user)} 
 title="Manage PBAC Permissions Matrix"
 className="p-1.5 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineKey size={18} />
 </button>
 <button 
 type="button"
 onClick={() => handleForceLogout(user)} 
 title="Revoke All Active Sessions (Force Logout)"
 className="p-1.5 hover:bg-rose-50 hover:text-rose-600 transition-all text-slate-400 rounded"
 >
 <HiOutlineLockClosed size={18} />
 </button>
 <button type="button" onClick={() => openForm(user)} title="Edit Node" className="p-1.5 hover:bg-white hover:text-indigo-600 transition-all text-slate-400 rounded">
 <HiOutlinePencilSquare size={18} />
 </button>
 <button type="button" onClick={() => handleDeactivate(user)} title={user.isActive ? "Deactivate" : "Activate"} className="p-1.5 hover:bg-white hover:text-amber-600 transition-all text-slate-400 rounded">
 <HiOutlineShieldCheck size={18} />
 </button>
 <button type="button" onClick={() => handleDelete(user)} title="Delete Node" className="p-1.5 hover:bg-white hover:text-rose-600 transition-all text-slate-400 rounded">
 <HiOutlineTrash size={18} />
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
 <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
 <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
 {total > 0 ? (
 <>Showing <span className="text-slate-900">{(page-1)*limit + 1}</span> - <span className="text-slate-900">{Math.min(page*limit, total)}</span> of <span className="text-slate-900">{total}</span> nodes</>
 ) : (
 "No active nodes matching criteria"
 )}
 </div>
 <div className="flex items-center gap-2">
 <button 
 type="button"
 disabled={page === 1}
 onClick={() => setPage(p => p - 1)}
 className="p-1.5 bg-white border border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-xs px-3"
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
 className={`w-8 h-8 text-xs font-black transition-all ${page === p ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
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
 className="p-1.5 bg-white border border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-xs px-3"
 >
 Next
 </button>
 </div>
 </div>
 )}

 {users.length === 0 && !loading && (
 <div className="py-10 text-center space-y-2">
 <HiOutlineUserPlus size={40} className="mx-auto text-slate-200" />
 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No biological nodes detected with current parameters</p>
 </div>
 )}
 </div>

 {/* Mobile Sticky CTA */}
 <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 pb-[calc(env(safe-area-inset-bottom)+1rem)] z-40">
 <button 
 onClick={() => openForm()}
 className="w-full py-4 bg-indigo-600 text-white font-black shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
 >
 <HiOutlineUserPlus size={20} />
 Provision User
 </button>
 </div>

 {/* Onboarding / Edit Modal */}
 <Portal>
 <AnimatePresence>
 {showModal && (
 <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-4">
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
 className="relative w-full max-w-2xl bg-white -[2rem] md: max-h-[90vh] overflow-y-auto shadow-2xl"
 >
 <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] md:pb-8">
 <div className="flex justify-between items-center mb-4">
 <div>
 <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
 {editingUser ? 'Synchronize Identity' : 'Provision New Identity'}
 </h3>
 <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-1">Ecosystem Node Management</p>
 </div>
 <button type="button" onClick={() => setShowModal(false)} className="w-10 h-10 bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100">
 <HiOutlineXCircle size={24} />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Name</label>
 <input 
 required
 className="w-full px-4 py-3 bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md"
 value={formData.name}
 onChange={(e) => setFormData({...formData, name: e.target.value})}
 />
 </div>
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Credentials</label>
 <input 
 required
 type="email"
 className="w-full px-4 py-3 bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md"
 value={formData.email}
 onChange={(e) => setFormData({...formData, email: e.target.value})}
 />
 </div>
 </div>

 {!editingUser && (
 <div className="bg-slate-50 p-4 space-y-3 rounded-md">
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Setup Method</p>
 <div className="grid grid-cols-2 gap-2">
 <button
 type="button"
 onClick={() => setSetupMode('invite')}
 className={`px-4 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 ${setupMode === 'invite' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
 >
 <HiOutlineEnvelope size={16} /> Email Invite Link
 </button>
 <button
 type="button"
 onClick={() => setSetupMode('password')}
 className={`px-4 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 ${setupMode === 'password' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
 >
 <HiOutlineLockClosed size={16} /> Set Password Now
 </button>
 </div>

 {setupMode === 'invite' ? (
 <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
 The staff member receives an email with their role and branch pre-assigned. They set their own secure password via a link (valid 72 hours). Recommended for Instructor / Branch Admin / Branch Management.
 </p>
 ) : (
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Secure Key (Password)</label>
 <input
 required
 type="password"
 minLength={8}
 className="w-full px-4 py-3 bg-white border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all rounded-md"
 value={formData.password}
 onChange={(e) => setFormData({...formData, password: e.target.value})}
 />
 </div>
 )}
 </div>
 )}

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hierarchy Role</label>
 <select 
 className="w-full px-4 py-3 bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
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
 <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter ml-1 italic">
 {editingUser._id === currentUser?.id ? 'Self-role reconfiguration restricted' : 'Administrative hierarchy nodes are protected'}
 </p>
 )}
 </div>
 <div className="space-y-1">
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Geographical Node (Branch)</label>
 <select 
 className="w-full px-4 py-3 bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
 value={formData.branchId}
 onChange={(e) => setFormData({...formData, branchId: e.target.value})}
 >
 <option value="">Global Head Office</option>
 {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
 </select>
 </div>
 </div>

 <div className="flex items-center justify-between pt-2">
 <div className="flex items-center gap-3">
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Access Node</p>
 <button 
 type="button"
 onClick={() => setFormData({...formData, isActive: !formData.isActive})}
 className={`w-14 h-8 transition-all relative ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
 >
 <div className={`absolute top-1 w-6 h-6 bg-white transition-all ${formData.isActive ? 'right-1' : 'left-1'}`} />
 </button>
 </div>
 <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-black shadow-xl shadow-indigo-600/30 hover:-translate-y-1 transition-all rounded-md">
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
 <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 md:p-6">
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
 <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
 <HiOutlineKey size={22} />
 </div>
 <div>
 <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
 <span>PBAC Permissions Matrix</span>
 <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 font-bold uppercase">
 {permissionsModalUser.role.replace('_', ' ')}
 </span>
 </h3>
 <p className="text-xs text-slate-400 mt-0.5">
 Managing granular access for <strong className="text-white">{permissionsModalUser.name}</strong> ({permissionsModalUser.email})
 </p>
 </div>
 </div>
 <button 
 onClick={() => setPermissionsModalUser(null)}
 className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-all"
 >
 <HiOutlineXCircle size={22} />
 </button>
 </div>

 {/* Sub-header info bar */}
 <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs shrink-0">
 <div className="flex items-center gap-2 font-bold text-slate-600">
 <span>Selected Permissions:</span>
 <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[11px]">
 {selectedPermissions.length} Active
 </span>
 </div>
 <div className="flex items-center gap-2">
 <button
 type="button"
 onClick={() => setSelectedPermissions([])}
 className="px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded text-xs font-bold transition-all"
 >
 Clear All
 </button>
 </div>
 </div>

 {/* Body: Grouped Categories */}
 <div className="p-6 overflow-y-auto space-y-6 flex-1">
 {permissionsCatalog && permissionsCatalog.length > 0 ? (
 permissionsCatalog.map((category) => {
 const catPermIds = category.permissions.map(p => p.id);
 const allCatSelected = catPermIds.length > 0 && catPermIds.every(id => selectedPermissions.includes(id));

 return (
 <div key={category.category} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
 <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
 <div className="flex items-center gap-2 font-black text-slate-800 text-sm">
 <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
 <span>{category.category}</span>
 <span className="text-[11px] font-bold text-slate-400">
 ({catPermIds.filter(id => selectedPermissions.includes(id)).length}/{category.permissions.length})
 </span>
 </div>
 <button
 type="button"
 onClick={() => toggleCategoryPermissions(category.permissions)}
 className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${
 allCatSelected
 ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
 : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
 }`}
 >
 {allCatSelected ? 'Deselect Category' : 'Select Category'}
 </button>
 </div>

 <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
 {category.permissions.map((perm) => {
 const isChecked = selectedPermissions.includes(perm.id);
 return (
 <label
 key={perm.id}
 className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
 isChecked
 ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-200'
 : 'bg-white border-slate-100 hover:border-slate-300'
 }`}
 >
 <input
 type="checkbox"
 checked={isChecked}
 onChange={() => togglePermission(perm.id)}
 className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
 />
 <div className="flex-1">
 <div className="flex items-center justify-between">
 <span className="text-xs font-black text-slate-900">{perm.name}</span>
 <code className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
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
 <div className="py-12 text-center text-slate-400 text-xs font-bold">
 Loading permissions catalog...
 </div>
 )}
 </div>

 {/* Footer */}
 <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
 <p className="text-xs text-slate-400 font-medium text-center sm:text-left">
 Changes take effect immediately upon next user authentication token verification.
 </p>
 <div className="flex items-center gap-3">
 <button
 type="button"
 onClick={() => setPermissionsModalUser(null)}
 className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all"
 >
 Cancel
 </button>
 <button
 type="button"
 disabled={savingPermissions}
 onClick={handleSavePermissions}
 className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-black text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
 >
 {savingPermissions ? <HiOutlineArrowPath className="animate-spin" size={16} /> : <HiOutlineKey size={16} />}
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
 <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
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
 <div className="p-6 border-b border-slate-100 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
 <HiOutlineArrowsRightLeft size={20} />
 </div>
 <div>
 <h3 className="font-extrabold text-base text-slate-900">Transfer Student Campus</h3>
 <p className="text-xs text-slate-400">Reassign campus, active enrollments, and ledger</p>
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

 <form onSubmit={handleTransferCampus} className="p-6 space-y-4">
 <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 text-xs">
 <div className="font-bold text-slate-800">{transferModalStudent.name}</div>
 <div className="text-slate-500">{transferModalStudent.email} • Phone: {transferModalStudent.phone || 'N/A'}</div>
 <div className="mt-1 font-semibold text-teal-700">
 Current Campus: {branches.find(b => b._id === transferModalStudent.branchId)?.name || 'Unknown / Global'}
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1">
 Target Destination Campus *
 </label>
 <select
 required
 value={targetBranchId}
 onChange={(e) => setTargetBranchId(e.target.value)}
 className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-teal-500"
 >
 <option value="">Select Target Campus...</option>
 {branches.filter(b => b._id !== transferModalStudent.branchId).map(b => (
 <option key={b._id} value={b._id}>{b.name} ({b.city})</option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1">
 Reason for Transfer
 </label>
 <select
 value={transferReason}
 onChange={(e) => setTransferReason(e.target.value)}
 className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-teal-500"
 >
 <option value="relocation">Student Residential Relocation</option>
 <option value="schedule_conflict">Schedule & Batch Timing Preference</option>
 <option value="course_availability">Specific Course/Lab Facility Availability</option>
 <option value="administrative">Administrative Reorganization</option>
 <option value="other">Other Official Reason</option>
 </select>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1">
 Transfer Audit Notes / Approval Reference
 </label>
 <textarea
 rows={3}
 value={transferNotes}
 onChange={(e) => setTransferNotes(e.target.value)}
 placeholder="Official approval reference or instructions for destination campus..."
 className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-teal-500"
 />
 </div>

 <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
 <button
 type="button"
 onClick={() => setTransferModalStudent(null)}
 className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={transferring || !targetBranchId}
 className="px-5 py-2 text-xs font-black text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-md shadow-teal-600/20 disabled:opacity-50 flex items-center gap-1.5"
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
 </div>
 );
}
