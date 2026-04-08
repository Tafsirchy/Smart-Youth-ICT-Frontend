import { Skeleton } from '@/components/ui/Skeleton';

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full ml-auto" />
        </div>
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-4/5 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
        <Skeleton className="h-4 w-16 rounded mt-1" />
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero Skeleton ────────────────────────────── */}
      <div
        className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Skeleton className="h-6 w-36 rounded-full bg-white/10" />
          <Skeleton className="h-12 w-64 rounded-xl bg-white/10" />
          <Skeleton className="h-5 w-80 max-w-full rounded-lg bg-white/10" />
          <Skeleton className="h-12 w-full max-w-md rounded-2xl bg-white/10" />
        </div>
      </div>

      {/* ── Tag Pills Skeleton ───────────────────────── */}
      <div className="bg-[var(--color-surface)] border-b border-neutral-200 shadow-sm">
        <div className="container-lg mx-auto px-4 py-3 flex gap-2 overflow-hidden">
          {[64, 80, 72, 88, 68].map((w, i) => (
            <Skeleton key={i} className="h-9 shrink-0 rounded-full" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* ── Featured Post Skeleton ───────────────────── */}
      <div className="container-lg mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg ring-1 ring-neutral-100 mb-12">
          <Skeleton className="md:w-3/5 h-64 md:h-96 rounded-none" />
          <div className="md:w-2/5 p-10 flex flex-col gap-4 bg-white">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="h-8 w-full rounded-xl" />
            <Skeleton className="h-8 w-4/5 rounded-xl" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <div className="flex items-center gap-3 mt-auto">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Card Grid Skeleton ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
