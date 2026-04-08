import { Skeleton } from '@/components/ui/Skeleton';

/**
 * DashboardSkeleton — skeleton for dashboard-style pages (no hero banner).
 * Usually consists of a header section + content grid/table.
 */
export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* ── Header ───────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24 rounded bg-neutral-200/60" />
        <Skeleton className="h-9 w-64 rounded-lg bg-neutral-200/80" />
      </div>

      {/* ── Stats Row ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm flex flex-col gap-3">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        ))}
      </div>

      {/* ── Main content (Table/List placeholder) ─────── */}
      <div className="rounded-2xl bg-white border border-neutral-100 shadow-sm overflow-hidden p-6">
        <div className="flex justify-between mb-8">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-7 w-24 rounded-lg" />
        </div>
        
        <div className="flex flex-col gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-3 w-1/4 rounded" />
              </div>
              <Skeleton className="h-6 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
