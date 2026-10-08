import { Skeleton } from '@/components/ui/Skeleton';

export function HeaderSkeleton() {
 return (
 <div className="flex flex-col gap-2">
 <Skeleton className="h-4 w-24 bg-neutral-200/60" />
 <Skeleton className="h-9 w-64 bg-neutral-200/80" />
 </div>
 );
}

export function StatCardSkeleton() {
 return (
 <div className="p-6 bg-white border border-neutral-100 shadow-sm flex flex-col gap-3">
 <Skeleton className="h-4 w-20" />
 <Skeleton className="h-8 w-16" />
 </div>
 );
}

export function TableSkeleton({ rows = 6 }) {
 return (
 <div className="bg-white border border-neutral-100 shadow-sm overflow-hidden p-6">
 <div className="flex justify-between mb-8">
 <Skeleton className="h-7 w-48" />
 <Skeleton className="h-7 w-24" />
 </div>
 
 <div className="flex flex-col gap-5">
 {[...Array(rows)].map((_, i) => (
 <div key={i} className="flex gap-4 items-center">
 <Skeleton className="h-12 w-12" />
 <div className="flex-1 flex flex-col gap-2">
 <Skeleton className="h-4 w-1/2" />
 <Skeleton className="h-3 w-1/4" />
 </div>
 <Skeleton className="h-6 w-20" />
 </div>
 ))}
 </div>
 </div>
 );
}

/**
 * DashboardSkeleton — skeleton for dashboard-style pages (no hero banner).
 * Usually consists of a header section + content grid/table.
 */
export default function DashboardSkeleton() {
 return (
 <div className="flex flex-col min-h-full w-full gap-8 animate-in fade-in duration-500">
 <div className="w-full flex flex-col gap-8">
 <HeaderSkeleton />

 {/* ── Stats Row ────────────────────────────────── */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {[...Array(4)].map((_, i) => (
 <StatCardSkeleton key={i} />
 ))}
 </div>

 <TableSkeleton />
 </div>
 </div>
 );
}

