"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  HiOutlineArrowUpTray,
  HiOutlineArrowDownTray,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineDocumentText,
  HiOutlineUsers,
} from "react-icons/hi2";

export default function BulkUserImportModal({ isOpen, onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [parsedRows, setParsedRows] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const downloadSampleTemplate = () => {
    const csvContent =
      "name,email,phone,role,branchCode,password\n" +
      "Rahim Ahmed,rahim.ahmed@example.com,01711000001,student,SYICT-001,Student@123\n" +
      "Karim Uddin,karim.uddin@example.com,01811000002,instructor,SYICT-001,Instructor@123\n" +
      "Fatima Begum,fatima.begum@example.com,01911000003,employee,SYICT-002,Staff@123\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "syict_bulk_users_template.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Sample CSV template downloaded");
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv") && selectedFile.type !== "text/csv") {
      return toast.error("Please upload a valid .csv format file");
    }

    setFile(selectedFile);
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text !== "string") return;

      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        return toast.error("CSV file must contain a header row and at least 1 user data row");
      }

      const headers = lines[0]
        .split(",")
        .map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));

      const rows = [];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i]
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""));
        if (!values || values.length === 0 || (values.length === 1 && !values[0])) continue;

        const rowObj = {};
        headers.forEach((h, idx) => {
          rowObj[h] = values[idx] || "";
        });

        const isValidEmail = emailRegex.test(rowObj.email || "");
        const hasName = Boolean(rowObj.name);

        rows.push({
          rowNumber: i + 1,
          name: rowObj.name || "",
          email: rowObj.email || "",
          phone: rowObj.phone || "",
          role: rowObj.role || "student",
          branchCode: rowObj.branchcode || rowObj.branch_code || rowObj.branch || "",
          password: rowObj.password || "",
          isValid: isValidEmail && hasName,
          error: !hasName ? "Name is required" : !isValidEmail ? "Invalid email" : null,
        });
      }

      setParsedRows(rows);
      toast.success(`Parsed ${rows.length} records from CSV`);
    };

    reader.readAsText(selectedFile);
  };

  const handleExecuteImport = async () => {
    const validUsers = parsedRows
      .filter((r) => r.isValid)
      .map((r) => ({
        name: r.name,
        email: r.email,
        phone: r.phone,
        role: r.role,
        branchCode: r.branchCode,
        password: r.password,
      }));

    if (!validUsers.length) {
      return toast.error("No valid user records to import");
    }

    setImporting(true);
    try {
      const res = await api.post("/users/bulk-import", { users: validUsers });
      if (res.data?.success) {
        setImportResult(res.data.data);
        toast.success(res.data.message);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Bulk import failed");
    } finally {
      setImporting(false);
    }
  };

  const validCount = parsedRows.filter((r) => r.isValid).length;
  const invalidCount = parsedRows.filter((r) => !r.isValid).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl p-6 text-slate-800 relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <HiOutlineArrowUpTray size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Bulk User Ingestion & CSV Import
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Batch onboarding for students, instructors, and campus staff
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <HiOutlineXMark size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar pr-1">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <HiOutlineDocumentText size={16} />
                <span>{file ? "Replace CSV File" : "Choose CSV File"}</span>
              </button>
              {file && (
                <span className="text-xs font-mono font-bold text-slate-600 truncate max-w-xs">
                  {file.name}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={downloadSampleTemplate}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <HiOutlineArrowDownTray size={14} />
              <span>Download CSV Template</span>
            </button>
          </div>

          {/* Validation Metrics Banner */}
          {parsedRows.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Total Rows
                </span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {parsedRows.length}
                </span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                  Valid Users
                </span>
                <span className="text-lg font-black text-emerald-700 font-mono">
                  {validCount}
                </span>
              </div>
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                  Invalid / Warnings
                </span>
                <span className="text-lg font-black text-rose-700 font-mono">
                  {invalidCount}
                </span>
              </div>
            </div>
          )}

          {/* Parsed Preview Table */}
          {parsedRows.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-500 uppercase text-[10px] font-black tracking-wider sticky top-0">
                  <tr>
                    <th className="px-3 py-2">Row</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Branch Code</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {parsedRows.slice(0, 100).map((r, idx) => (
                    <tr key={idx} className={r.isValid ? "bg-white" : "bg-rose-50/50"}>
                      <td className="px-3 py-2 font-mono text-[11px] text-slate-400">
                        #{r.rowNumber}
                      </td>
                      <td className="px-3 py-2 font-bold text-slate-900 truncate max-w-[120px]">
                        {r.name || "—"}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] truncate max-w-[150px]">
                        {r.email || "—"}
                      </td>
                      <td className="px-3 py-2 uppercase text-[10px] font-bold">
                        {r.role}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px]">
                        {r.branchCode || "Central"}
                      </td>
                      <td className="px-3 py-2">
                        {r.isValid ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <HiOutlineCheckCircle size={12} /> Ready
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                            <HiOutlineExclamationTriangle size={12} /> {r.error}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Import Result Notification */}
          {importResult && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <HiOutlineCheckCircle size={20} className="text-emerald-600" />
                <span>Import Finished: {importResult.createdCount} user(s) created!</span>
              </div>
              {importResult.skipped?.length > 0 && (
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-rose-600">{importResult.skippedCount} row(s) skipped:</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                    {importResult.skipped.slice(0, 5).map((s, idx) => (
                      <li key={idx}>Row #{s.row}: {s.email} — {s.reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            {validCount > 0 ? `${validCount} ready for ingestion` : "Upload a CSV file to begin"}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={importing || validCount === 0}
              onClick={handleExecuteImport}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <HiOutlineUsers size={16} />
              <span>{importing ? "Importing Users..." : `Execute Import (${validCount})`}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
