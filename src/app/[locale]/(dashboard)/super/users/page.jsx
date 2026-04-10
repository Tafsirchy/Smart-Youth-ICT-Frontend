'use client';

import { useState, useEffect, useMemo } from 'react';
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
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlineDevicePhoneMobile,
  HiOutlineBuildingOffice,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from 'react-icons/hi2';

export default function GlobalUserManagement() {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const { user: currentUser } = useRole();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'student', branchId: '', phone: '', isActive: true
  });

  const administrativeRoles = ['super_admin', 'super_management', 'admin', 'branch_admin', 'branch_management'];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300); // Simple debounce
    return () => clearTimeout(timer);
  }, [page, filterRole, filterBranch, search]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filterRole, filterBranch, search]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const bRes = await api.get('/super/branches');
      if (bRes.data?.success) {
        setBranches(bRes.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch branches:', err);
      toast.error('Partial core failure: Branch registry unavailable');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const uRes = await api.get('/users', {
        params: {
          page,
          limit,
          role: filterRole,
          branchId: filterBranch,
          q: search
        }
      });
      if (uRes.data?.success) {
        setUsers(uRes.data.data);
        setTotal(uRes.data.total);
        setTotalPages(uRes.data.totalPages);
      }
    } catch (err) {
      toast.error('System failure: Unable to retrieve global user registry');
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(editingUser ? 'Synchronizing node...' : 'Provisioning new system user...');
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser._id}`, formData);
        toast.success('Cognitive node updated', { id: loadingToast });
      } else {
        await api.post('/users', formData);
        toast.success('New user established', { id: loadingToast });
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Transaction failed', { id: loadingToast });
    }
  };

  const handleDeactivate = async (user) => {
    if (!confirm(`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} this user?`)) return;
    try {
      await api.patch(`/users/${user._id}/status`);
      toast.success('Access state toggled');
      fetchData();
    } catch (err) {
      toast.error('Failed to update state');
    }
  };

  const handleDelete = async (user) => {
    if (!confirm('CRITICAL: This will permanently remove the user and all associated security keys. Proceed?')) return;
    try {
      await api.delete(`/users/${user._id}`);
      toast.success('Node purged from system');
      fetchData();
    } catch (err) {
      toast.error('Purge failed');
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
      setFormData({ name: '', email: '', password: '', role: 'student', branchId: '', phone: '', isActive: true });
    }
    setShowModal(true);
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">User Registry</h1>
            <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest text-[10px]">Global Ecosystem Oversight</p>
         </div>
         <button 
           onClick={() => openForm()}
           className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
         >
           <HiOutlineUserPlus size={20} />
           Provision User
         </button>
      </header>

      {/* Control Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-50">
         <div className="lg:col-span-2 relative">
            <HiOutlineMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name, email, or credentials..."
              className="w-full pl-16 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <div className="relative">
            <HiOutlineFunnel className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
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
            <HiOutlineBuildingOffice className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
            </select>
         </div>
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                  <th className="px-10 py-6">Identity Node</th>
                  <th className="px-10 py-6">Access Layer</th>
                  <th className="px-10 py-6">Branch Assignment</th>
                  <th className="px-10 py-6">State</th>
                  <th className="px-10 py-6 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
               {loading ? (
                 [...Array(5)].map((_, i) => (
                   <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-10 py-8 h-20 bg-slate-50/20" />
                   </tr>
                 ))
               ) : (
                 users.map(user => (
                   <tr key={user._id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 font-black flex items-center justify-center border border-indigo-100">
                              {user.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-extrabold text-slate-900 leading-none mb-1.5">{user.name}</p>
                              <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          user.role === 'super_admin' ? 'bg-pink-100 text-pink-600' :
                          user.role === 'branch_admin' ? 'bg-blue-100 text-blue-600' :
                          user.role === 'instructor' ? 'bg-amber-100 text-amber-600' :
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <HiOutlineBuildingOffice className="text-slate-300" size={14} />
                            {user.branchId ? (branches.find(b => b._id === user.branchId)?.name || 'Unknown Node') : 'Global HQ'}
                         </div>
                      </td>
                      <td className="px-10 py-6">
                         <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {user.isActive ? <HiOutlineCheckCircle size={14} /> : <HiOutlineXCircle size={14} />}
                            {user.isActive ? 'Active Node' : 'Suspended'}
                         </div>
                      </td>
                      <td className="px-10 py-6 text-right font-medium">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => openForm(user)} className="p-2 hover:bg-white hover:text-indigo-600 rounded-xl transition-all text-slate-300">
                              <HiOutlinePencilSquare size={18} />
                           </button>
                           <button onClick={() => handleDeactivate(user)} className="p-2 hover:bg-white hover:text-amber-600 rounded-xl transition-all text-slate-300">
                              <HiOutlineShieldCheck size={18} />
                           </button>
                           <button onClick={() => handleDelete(user)} className="p-2 hover:bg-white hover:text-rose-600 rounded-xl transition-all text-slate-300">
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
           <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
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
                   className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-xs px-4"
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
                           className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${page === p ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
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
                   className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all font-bold text-xs px-4"
                 >
                   Next
                 </button>
              </div>
           </div>
         )}

         {users.length === 0 && !loading && (
           <div className="py-20 text-center space-y-4">
              <HiOutlineUserPlus size={40} className="mx-auto text-slate-200" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No biological nodes detected with current parameters</p>
           </div>
         )}
      </div>

      {/* Onboarding / Edit Modal */}
      <Portal>
         <AnimatePresence>
            {showModal && (
               <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowModal(false)}
                    className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm"
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
                  >
                     <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        <div className="flex justify-between items-center mb-4">
                           <div>
                              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                                {editingUser ? 'Synchronize Identity' : 'Provision New Identity'}
                              </h3>
                              <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mt-1">Ecosystem Node Management</p>
                           </div>
                           <button type="button" onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100">
                              <HiOutlineXCircle size={24} />
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Name</label>
                              <input 
                                required
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Credentials</label>
                              <input 
                                required
                                type="email"
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                              />
                           </div>
                        </div>

                        {!editingUser && (
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Secure Key (Password)</label>
                              <input 
                                required
                                type="password"
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                              />
                           </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hierarchy Role</label>
                              <select 
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                                value={formData.role}
                                disabled={editingUser && (editingUser._id === currentUser?.id || administrativeRoles.includes(editingUser.role))}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                              >
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="branch_admin">Branch Admin</option>
                                <option value="branch_management">Branch Management</option>
                                <option value="super_admin">Super Admin</option>
                                <option value="super_management">Super Management</option>
                              </select>
                              {editingUser && (editingUser._id === currentUser?.id || administrativeRoles.includes(editingUser.role)) && (
                                <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter ml-1 italic">
                                  {editingUser._id === currentUser?.id ? 'Self-role reconfiguration restricted' : 'Administrative hierarchy nodes are protected'}
                                </p>
                              )}
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Geographical Node (Branch)</label>
                              <select 
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.branchId}
                                onChange={(e) => setFormData({...formData, branchId: e.target.value})}
                              >
                                <option value="">Global Head Office</option>
                                {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                              </select>
                           </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                           <div className="flex items-center gap-3">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Access Node</p>
                              <button 
                                type="button"
                                onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                                className={`w-14 h-8 rounded-full transition-all relative ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
                              >
                                 <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.isActive ? 'right-1' : 'left-1'}`} />
                              </button>
                           </div>
                           <button type="submit" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/30 hover:-translate-y-1 transition-all">
                              {editingUser ? 'Synchronize Updates' : 'Establish Access Node'}
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
