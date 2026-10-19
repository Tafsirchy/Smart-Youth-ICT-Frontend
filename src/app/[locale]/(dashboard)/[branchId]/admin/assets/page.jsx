'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  HiOutlineCube,
  HiOutlineComputerDesktop,
  HiOutlineWrenchScrewdriver,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineCurrencyBangladeshi,
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineArrowPath,
  HiOutlineArchiveBox,
  HiOutlineTag,
} from 'react-icons/hi2';
import { usePermissionGuard } from '@/hooks/usePermissionGuard';
import AccessDenied from '@/components/ui/AccessDenied';
import Portal from '@/components/ui/Portal';
import ImageUpload from '@/components/ui/ImageUpload';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'electronics', label: 'Electronics & Lab PCs', icon: HiOutlineComputerDesktop },
  { id: 'furniture', label: 'Furniture & Decor', icon: HiOutlineCube },
  { id: 'stationary', label: 'Stationary & Supplies', icon: HiOutlineTag },
  { id: 'other', label: 'Other Assets', icon: HiOutlineArchiveBox },
];

const STATUS_CONFIG = {
  available: { label: 'Available', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'in-use': { label: 'In-Use', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  maintenance: { label: 'In Maintenance', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  retired: { label: 'Retired', color: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function BranchAssetsPage() {
  const { isLoading: guardLoading, isDenied } = usePermissionGuard(['staff:manage', 'admin:only']);
  const { branchId } = useParams();

  const [assets, setAssets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [deletingAsset, setDeletingAsset] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    quantity: 1,
    unitPrice: 0,
    status: 'available',
    purchasedAt: '',
    description: '',
    image: '',
  });

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const params = { branchId };
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await api.get('/assets', { params });
      if (res.data?.success) {
        setAssets(res.data.data || []);
        if (res.data.stats) setStats(res.data.stats);
      }
    } catch (err) {
      toast.error('Failed to load branch assets');
    } finally {
      setLoading(false);
    }
  }, [branchId, categoryFilter, statusFilter, search]);

  useEffect(() => {
    if (!guardLoading && !isDenied) {
      fetchAssets();
    }
  }, [fetchAssets, guardLoading, isDenied]);

  const handleOpenAdd = () => {
    setEditingAsset(null);
    setFormData({
      name: '',
      category: 'electronics',
      quantity: 1,
      unitPrice: 0,
      status: 'available',
      purchasedAt: new Date().toISOString().split('T')[0],
      description: '',
      image: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name || '',
      category: asset.category || 'electronics',
      quantity: asset.quantity || 1,
      unitPrice: asset.unitPrice || 0,
      status: asset.status || 'available',
      purchasedAt: asset.purchasedAt ? new Date(asset.purchasedAt).toISOString().split('T')[0] : '',
      description: asset.description || '',
      image: asset.image || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return toast.error('Asset name is required');
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity) || 1,
        unitPrice: Number(formData.unitPrice) || 0,
        branchId,
      };

      if (editingAsset) {
        await api.patch(`/assets/${editingAsset._id}`, payload);
        toast.success('Asset updated successfully');
      } else {
        await api.post('/assets', payload);
        toast.success('New asset registered successfully');
      }

      setShowModal(false);
      fetchAssets();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingAsset) return;
    try {
      await api.delete(`/assets/${deletingAsset._id}`);
      toast.success('Asset deleted successfully');
      setDeletingAsset(null);
      fetchAssets();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete asset');
    }
  };

  if (guardLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <HiOutlineArrowPath className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (isDenied) {
    return <AccessDenied message="Access Denied: You do not have permission to manage assets." />;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <HiOutlineCube className="w-7 h-7 text-pink-600" />
            Branch Lab & Asset Inventory
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track hardware, lab computers, furniture, and maintenance status for this branch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAssets}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            title="Refresh"
          >
            <HiOutlineArrowPath className={`w-4 h-4 ${loading ? 'animate-spin text-pink-600' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-black transition-all shadow-md shadow-slate-900/10 active:scale-95"
          >
            <HiOutlinePlus className="w-4 h-4" />
            Add New Asset
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Valuation</span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <HiOutlineCurrencyBangladeshi className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ৳ {(stats?.totalValue || 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Across {stats?.totalItems || 0} physical units
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Available</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HiOutlineCheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {stats?.statusCounts?.available || 0}
          </div>
          <p className="text-[11px] text-emerald-600/80 font-medium mt-1">
            Ready for lab use or assignment
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In-Use</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <HiOutlineComputerDesktop className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-700">
            {stats?.statusCounts?.['in-use'] || 0}
          </div>
          <p className="text-[11px] text-blue-600/80 font-medium mt-1">
            Active in classrooms & staff stations
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Maintenance</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <HiOutlineWrenchScrewdriver className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700">
            {stats?.statusCounts?.maintenance || 0}
          </div>
          <p className="text-[11px] text-amber-600/80 font-medium mt-1">
            Under servicing or inspection
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets by name or specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'available', 'in-use', 'maintenance', 'retired'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all shrink-0 ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? 'All Status' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-slate-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                categoryFilter === cat.id
                  ? 'bg-pink-50 text-pink-700 border border-pink-200'
                  : 'bg-transparent text-slate-500 hover:bg-slate-100'
              }`}
            >
              {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <HiOutlineArrowPath className="w-8 h-8 animate-spin mx-auto mb-2 text-pink-600" />
            <p className="text-xs font-semibold">Loading assets inventory...</p>
          </div>
        ) : assets.length === 0 ? (
          <div className="p-12 text-center">
            <HiOutlineCube className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No Assets Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are no assets recorded matching your current filter. Click "Add New Asset" to register lab equipment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Item Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4">Unit Price</th>
                  <th className="py-3 px-4">Total Value</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Purchased</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assets.map((asset) => {
                  const st = STATUS_CONFIG[asset.status] || STATUS_CONFIG.available;
                  const total = (asset.quantity || 1) * (asset.unitPrice || 0);

                  return (
                    <tr key={asset._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {asset.image ? (
                            <img
                              src={asset.image}
                              alt={asset.name}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                              <HiOutlineCube className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{asset.name}</div>
                            {asset.description && (
                              <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {asset.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 capitalize">
                        {asset.category}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {asset.quantity || 1}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-600">
                        ৳ {(asset.unitPrice || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ৳ {total.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold border ${st.color}`}>
                          {st.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">
                        {asset.purchasedAt
                          ? new Date(asset.purchasedAt).toLocaleDateString('en-GB')
                          : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(asset)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                            title="Edit"
                          >
                            <HiOutlinePencilSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingAsset(asset)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Asset Modal */}
      <Portal>
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-8"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingAsset ? 'Edit Inventory Asset' : 'Add New Asset to Branch'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
                  >
                    <HiOutlineXMark className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Asset Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Core i7 12th Gen PC Lab Station 04"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
                      >
                        <option value="electronics">Electronics & Lab PCs</option>
                        <option value="furniture">Furniture</option>
                        <option value="stationary">Stationary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
                      >
                        <option value="available">Available</option>
                        <option value="in-use">In-Use</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="retired">Retired</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Unit Price (৳)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.unitPrice}
                        onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={formData.purchasedAt}
                      onChange={(e) => setFormData({ ...formData, purchasedAt: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description / Specifications
                    </label>
                    <textarea
                      rows="2"
                      placeholder="e.g. 16GB RAM, 512GB SSD, Dell 24 inch monitor, warranty valid till 2027"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-pink-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Asset Photo / Receipt
                    </label>
                    <ImageUpload
                      value={formData.image}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                      label="Upload Equipment Picture"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-black transition-all shadow-md shadow-slate-900/10 disabled:opacity-50"
                    >
                      {submitting ? 'Saving...' : editingAsset ? 'Update Asset' : 'Save Asset'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Delete Confirmation Modal */}
      <Portal>
        <AnimatePresence>
          {deletingAsset && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <HiOutlineExclamationTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Delete Asset?</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Are you sure you want to remove <span className="font-bold text-slate-700">{deletingAsset.name}</span> from the inventory? This action cannot be undone.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setDeletingAsset(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2 bg-rose-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-rose-700 transition-all shadow-md shadow-rose-600/20"
                  >
                    Delete Permanently
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
