import { CourseCardSkeleton, Skeleton } from '@/components/ui/Skeleton';

export default function CoursesLoading() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

      {/* ── Hero Banner Skeleton ─────────────────────── */}
      <section
        className="relative overflow-hidden py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-5 px-4">
          <Skeleton className="h-6 w-40 rounded-full bg-white/10" />
          <Skeleton className="h-12 w-72 rounded-xl bg-white/10" />
          <Skeleton className="h-5 w-96 max-w-full rounded-lg bg-white/10" />
          <Skeleton className="h-14 w-full max-w-lg rounded-2xl bg-white/10" />
        </div>
      </section>

      {/* ── Filter Tab Skeleton ──────────────────────── */}
      <div className="sticky top-0 z-20 bg-[var(--color-surface)] border-b border-neutral-200 shadow-sm">
        <div className="container-custom py-3 flex gap-2 overflow-hidden">
          {[100, 88, 72, 96, 80, 76].map((w, i) => (
            <Skeleton key={i} className="h-9 shrink-0 rounded-full" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* ── Course Card Grid ─────────────────────────── */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
