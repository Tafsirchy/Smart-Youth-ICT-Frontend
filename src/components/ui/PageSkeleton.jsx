import { Skeleton } from '@/components/ui/Skeleton';

/**
 * PageSkeleton — shared loading skeleton for standard marketing pages.
 * Used by all generic loading.jsx route files.
 *
 * @param {number} rows    - Number of content row blocks to render (default 3)
 */
export default function PageSkeleton({ rows = 3 }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero Banner ─────────────────────────────── */}
      <div
        className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Skeleton className="h-6 w-32 rounded-full bg-white/10" />
          <Skeleton className="h-12 w-64 rounded-xl bg-white/10" />
          <Skeleton className="h-5 w-96 max-w-full rounded-lg bg-white/10" />
        </div>
      </div>

      {/* ── Content Rows ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-10">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/6 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
