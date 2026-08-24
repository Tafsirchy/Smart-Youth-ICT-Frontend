import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoLocationOutline, IoCheckmarkCircle } from "react-icons/io5";
import api from "@/lib/api";
import { CourseCardSkeleton } from "@/components/ui/Skeleton";

export default function BranchSelectionModal({ onClose, onConfirm, availableBranches, enrolling }) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranchId, setSelectedBranchId] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await api.get("/branches/public/all");
        if (res.data?.success) {
          setBranches(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch branches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleConfirm = () => {
    if (selectedBranchId) {
      onConfirm(selectedBranchId);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-neutral-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Select Your Campus
            </h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
              Choose the branch where you want to attend this course.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full transition-colors"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-slate-50/50 dark:bg-neutral-900/50">
          {loading ? (
            <div className="space-y-4">
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </div>
          ) : branches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {branches.map((branch) => {
                // If availableBranches is provided, check if this branch is in it
                const isAvailable = availableBranches ? availableBranches.includes(branch._id) : true;
                const isSelected = selectedBranchId === branch._id;

                return (
                  <div
                    key={branch._id}
                    onClick={() => isAvailable && setSelectedBranchId(branch._id)}
                    className={`
                      relative p-4 rounded-2xl border-2 transition-all cursor-pointer
                      ${
                        !isAvailable 
                          ? "border-slate-100 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 opacity-60 cursor-not-allowed" 
                          : isSelected
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-md shadow-indigo-500/10"
                            : "border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm"
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-neutral-700 text-slate-500 dark:text-neutral-300'}`}>
                          <IoLocationOutline size={18} />
                        </div>
                        <div>
                          <h4 className={`font-bold text-base leading-tight ${!isAvailable ? 'text-slate-600 dark:text-neutral-400' : 'text-slate-900 dark:text-white'}`}>
                            {branch.name}
                          </h4>
                          <span className="text-xs font-medium text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                            {branch.code}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <IoCheckmarkCircle size={24} className="text-indigo-600" />
                        </motion.div>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-600 dark:text-neutral-400 line-clamp-2 ml-10">
                      {[branch.address?.street, branch.address?.area, branch.address?.city].filter(Boolean).join(", ")}
                    </p>

                    {!isAvailable && (
                      <div className="mt-3 ml-10">
                        <span className="inline-block px-2 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-md border border-red-100 dark:border-red-800">
                          Course Not Available Here
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-500">No branches found.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedBranchId || enrolling}
            className="px-8 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center min-w-[120px]"
          >
            {enrolling ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Confirm & Enroll"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
