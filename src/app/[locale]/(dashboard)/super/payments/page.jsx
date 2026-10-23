"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import api from "@/lib/api";
import { superQueryKeys } from "@/lib/queryKeys";
import toast from "react-hot-toast";
import {
  IoCardOutline,
  IoSearch,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCloseCircle,
  IoEyeOutline,
  IoFilter,
  IoDownloadOutline,
  IoRefreshOutline
} from "react-icons/io5";
import Portal from "@/components/ui/Portal";

const STATUS_COLORS = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
};

const METHOD_LABELS = {
  bkash: "bKash",
  nagad: "Nagad",
  rocket: "Rocket",
  stripe: "Stripe / Card",
  bank: "Manual Bank",
};

export default function SuperPaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [note, setNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const queryClient = useQueryClient();

  // Fetch Branches for filter
  const { data: branchesRes } = useQuery({
    queryKey: superQueryKeys.superBranches(),
    queryFn: async () => {
      const res = await api.get("/super/branches");
      return res.data?.data || [];
    },
    staleTime: 60000,
  });

  const branches = branchesRes || [];

  const { data: paymentsRes, isLoading: loading } = useQuery({
    queryKey: superQueryKeys.payments({ page, limit, statusFilter, branchFilter }),
    queryFn: async () => {
      const params = { page, limit };
      if (statusFilter) params.status = statusFilter;
      if (branchFilter) params.branchId = branchFilter;
      const res = await api.get("/payments", { params });
      return res.data || { data: [], total: 0 };
    },
    placeholderData: keepPreviousData,
    staleTime: 30000,
  });

  const payments = paymentsRes?.data || [];
  const total = paymentsRes?.total || 0;

  const filtered = search
    ? payments.filter(
        (p) =>
          p.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
          p.transactionId?.toLowerCase().includes(search.toLowerCase()),
      )
    : payments;

  const totalPages = Math.ceil(total / limit);

  // Stats - computed across full database match
  const summary = paymentsRes?.summary;
  const paidCount = summary ? summary.completedCount : payments.filter((p) => p.status === "completed").length;
  const pendingCount = summary ? summary.pendingCount : payments.filter((p) => p.status === "pending").length;
  const totalRevenue = summary ? summary.totalRevenue : payments
    .filter((p) => p.status === "completed")
    .reduce((acc, p) => acc + (p.amount || 0), 0);
  const netRevenue = summary?.netRevenue ?? totalRevenue;
  const totalGatewayFees = summary?.totalGatewayFees ?? 0;

  const handleReplayWebhook = async (paymentId) => {
    setActionLoading(true);
    const loadingToast = toast.loading("Replaying payment gateway webhook...");
    try {
      const res = await api.post(`/payments/${paymentId}/replay-webhook`);
      toast.success(res.data?.message || "Webhook replayed successfully", { id: loadingToast });
      queryClient.invalidateQueries(["payments"]);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Webhook replay failed", { id: loadingToast });
    } finally {
      setActionLoading(false);
    }
  };

  const handleAction = async (paymentId, actionStatus) => {
    setActionLoading(true);
    try {
      await api.put(`/payments/${paymentId}/verify`, {
        status: actionStatus,
        note,
      });
      toast.success(`Payment marked as ${actionStatus}`);
      setSelectedPayment(null);
      setNote("");
      queryClient.invalidateQueries(["payments"]);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update payment status.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      toast.loading("Exporting payments ledger...", { id: "export-csv" });
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (branchFilter) params.branchId = branchFilter;
      const res = await api.get("/payments/export", { params, responseType: "blob" });
      const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `SYICT_Payments_Ledger_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Payments ledger exported successfully!", { id: "export-csv" });
    } catch (err) {
      toast.error("Failed to export payments ledger.", { id: "export-csv" });
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary leading-tight">
            Global Payment Management
          </h1>
          <p className="text-textSecondary text-sm mt-0.5 leading-normal">
            {total} total payment records across all branches
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 text-sm rounded-md"
        >
          <IoDownloadOutline size={18} />
          Export to Excel
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          {
            label: "Gross Revenue (Filtered)",
            value: `৳${totalRevenue.toLocaleString()}`,
            subtext: "Total collected gross",
            color: "text-slate-900",
            bg: "bg-slate-50",
          },
          {
            label: "Net Operating Revenue",
            value: `৳${netRevenue.toLocaleString()}`,
            subtext: `-৳${totalGatewayFees.toLocaleString()} Gateway Fees`,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Paid Orders",
            value: paidCount,
            subtext: "Completed fulfillments",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Pending Verification",
            value: pendingCount,
            subtext: "Awaiting staff action",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`${card.bg} p-3.5 ring-1 ring-neutral-200 rounded-lg`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5 leading-normal">{card.label}</p>
            <p className={`text-2xl font-black ${card.color} leading-tight`}>{card.value}</p>
            {card.subtext && <p className="text-[11px] text-neutral-500 font-semibold mt-0.5 leading-normal">{card.subtext}</p>}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2.5 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <IoSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email, or transaction ID…"
            className="input pl-10 w-full rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative min-w-[180px]">
          <select
            className="input w-full pl-9"
            value={branchFilter}
            onChange={(e) => {
              setBranchFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Branches</option>
            {branches.map(b => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
          <IoFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        </div>
        <select
          className="input min-w-[140px]"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-neutral-200 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Student</th>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Course / Branch</th>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Method</th>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Amount</th>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Status</th>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Date</th>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Transaction ID</th>
                <th className="text-left px-3 py-2.5 font-semibold text-neutral-600 leading-normal whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(8)].map((_, j) => (
                      <td key={j} className="px-3 py-2.5">
                        <div className="h-4 bg-neutral-200 w-full rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-neutral-400">
                    <IoCardOutline size={36} className="mx-auto mb-2 opacity-30" />
                    No payments found.
                  </td>
                </tr>
              ) : (
                filtered.map((payment, i) => {
                  const branchName = branches.find(b => b._id === payment.branchId)?.name || "Unknown Branch";

                  return (
                    <tr key={payment._id || i} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-3 py-2.5 text-left align-middle whitespace-nowrap">
                        <div className="font-medium text-neutral-900 leading-snug">{payment.user?.name || "—"}</div>
                        <div className="text-xs text-neutral-500 leading-normal">{payment.user?.email || "—"}</div>
                      </td>
                      <td className="px-3 py-2.5 text-left align-middle text-neutral-600 whitespace-nowrap">
                        <div className="font-medium text-slate-800 leading-snug">
                          {payment.course?.title?.en || payment.course?.title || "—"}
                        </div>
                        <div className="text-xs text-indigo-500 font-semibold mt-0.5 leading-normal">
                          {branchName}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-left align-middle whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-md leading-normal inline-block">
                          {METHOD_LABELS[payment.method] || payment.method || "—"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-left align-middle whitespace-nowrap">
                        <div className="font-semibold text-neutral-900 leading-snug">৳{payment.amount?.toLocaleString() || "—"}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 leading-normal">
                          Fee: -৳{payment.gatewayFee || 0} • Net: <strong className="text-emerald-600 font-bold">৳{(payment.netAmount || payment.amount || 0).toLocaleString()}</strong>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-left align-middle whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md leading-normal ${STATUS_COLORS[payment.status] || "bg-neutral-100 text-neutral-600"}`}>
                          {payment.status === "completed" && <IoCheckmarkCircle size={12} />}
                          {payment.status === "pending" && <IoTimeOutline size={12} />}
                          {payment.status === "failed" && <IoCloseCircle size={12} />}
                          {payment.status || "—"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-left align-middle text-neutral-500 whitespace-nowrap leading-normal">
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-3 py-2.5 text-left align-middle text-neutral-400 text-xs font-mono whitespace-nowrap leading-normal">
                        {payment.transactionId || "—"}
                      </td>
                      <td className="px-3 py-2.5 text-left align-middle whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {payment.status === "pending" && (
                            <button
                              onClick={() => setSelectedPayment(payment)}
                              className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition rounded flex items-center gap-1"
                            >
                              <IoEyeOutline size={14} /> Review
                            </button>
                          )}
                          <button
                            onClick={() => handleReplayWebhook(payment._id)}
                            disabled={actionLoading}
                            title="Replay Webhook & Synchronize Student Enrollment"
                            className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition rounded flex items-center gap-1 border border-purple-200/60 disabled:opacity-40"
                          >
                            <IoRefreshOutline size={13} /> Replay
                          </button>
                          {payment.webhookReplayed && (
                            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded" title={`Replayed: ${new Date(payment.webhookReplayedAt).toLocaleString()}`}>
                              Sync&apos;d
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 border-t border-neutral-100 bg-neutral-50/50 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-3">
            <p>
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {total === 0 ? 0 : (page - 1) * limit + 1}
              </span>{" "}
              –{" "}
              <span className="font-semibold text-slate-800">
                {Math.min(page * limit, total)}
              </span>{" "}
              of <span className="font-semibold text-slate-800">{total}</span>{" "}
              records
            </p>
            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-white border border-neutral-200 rounded px-2 py-0.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-2.5 py-1 text-xs font-semibold border border-neutral-200 bg-white rounded text-slate-700 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {[...Array(Math.max(1, totalPages))].map((_, i) => {
                const p = i + 1;
                if (
                  totalPages > 5 &&
                  Math.abs(p - page) > 1 &&
                  p !== 1 &&
                  p !== totalPages
                ) {
                  if (Math.abs(p - page) === 2) {
                    return (
                      <span key={p} className="text-neutral-400 px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 text-xs font-bold rounded flex items-center justify-center transition-all ${
                      page === p
                        ? "bg-slate-900 text-white shadow-sm"
                        : "border border-neutral-200 text-neutral-600 bg-white hover:bg-neutral-50"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-2.5 py-1 text-xs font-semibold border border-neutral-200 bg-white rounded text-slate-700 hover:bg-neutral-50 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Portal>
        {selectedPayment && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 bg-black/95 backdrop-blur-sm">
            <div className="bg-white shadow-xl w-full max-w-md overflow-hidden relative z-[10000] max-h-[90vh] overflow-y-auto">
              <div className="px-4 py-2.5 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="font-bold text-lg text-textPrimary leading-tight">
                  Review Payment
                </h3>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <IoCloseCircle size={22} />
                </button>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-neutral-500 leading-normal">Student:</span>{" "}
                    <div className="font-semibold leading-snug">{selectedPayment.user?.name}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500 leading-normal">Course:</span>{" "}
                    <div className="font-semibold leading-snug">
                      {selectedPayment.course?.title?.en || selectedPayment.course?.title}
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500 leading-normal">Amount:</span>{" "}
                    <div className="font-semibold leading-snug">৳{selectedPayment.amount}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500 leading-normal">Method:</span>{" "}
                    <div className="font-semibold leading-snug">{METHOD_LABELS[selectedPayment.method]}</div>
                  </div>
                  {['bkash', 'nagad', 'rocket'].includes(selectedPayment.method) && selectedPayment.senderNumber && (
                    <div className="col-span-2">
                      <span className="text-neutral-500 leading-normal">Sender Number:</span>{" "}
                      <div className="font-semibold text-lg leading-snug">{selectedPayment.senderNumber}</div>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="text-neutral-500 leading-normal">TrxID:</span>{" "}
                    <div className="font-semibold font-mono leading-snug">{selectedPayment.transactionId}</div>
                  </div>
                </div>

                {selectedPayment.slip && (
                  <div>
                    <span className="text-neutral-500 block mb-0.5 leading-normal">Attached Slip:</span>
                    <a
                      href={selectedPayment.slip}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-1.5 border border-neutral-200 hover:border-blue-300"
                    >
                      <Image
                        src={selectedPayment.slip}
                        alt="Payment Slip"
                        width={420}
                        height={128}
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="w-full h-32 object-contain bg-neutral-50 rounded-md"
                        loading="lazy"
                        onError={(e) => { e.target.onerror = null; e.target.srcset = ''; e.target.src = '/assets/fallback.png'; }}
                        decoding="async"
                      />
                    </a>
                  </div>
                )}

                <div>
                  <label className="text-neutral-500 block mb-0.5 leading-normal">Admin Note (optional):</label>
                  <textarea
                    className="input w-full min-h-[64px]"
                    placeholder="Reason for rejection or internal notes..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    onClick={() => handleAction(selectedPayment._id, "failed")}
                    disabled={actionLoading}
                    className="flex-1 px-3 py-1.5 bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedPayment._id, "completed")}
                    disabled={actionLoading}
                    className="flex-1 px-3 py-1.5 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    Approve (Enroll)
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
