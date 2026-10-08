import { Skeleton } from '@/components/ui/Skeleton';

export default function CourseDetailLoading() {
 return (
 <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>

 {/* ── Hero Skeleton ────────────────────────────── */}
 <div
 className="py-16 px-4"
 style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}
 >
 <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
 {/* Left: text */}
 <div className="flex-1 flex flex-col gap-4">
 <Skeleton className="h-5 w-28 bg-white/10" />
 <Skeleton className="h-10 w-3/4 bg-white/10" />
 <Skeleton className="h-5 w-full bg-white/10" />
 <Skeleton className="h-5 w-2/3 bg-white/10" />
 <div className="flex gap-3 mt-2">
 <Skeleton className="h-8 w-24 bg-white/10" />
 <Skeleton className="h-8 w-24 bg-white/10" />
 </div>
 </div>
 {/* Right: thumbnail card */}
 <div className="w-full md:w-80 shrink-0">
 <Skeleton className="aspect-video w-full bg-white/10" />
 <Skeleton className="h-12 w-full mt-4 bg-white/10" />
 </div>
 </div>
 </div>

 {/* ── Body Skeleton ────────────────────────────── */}
 <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
 {/* Main content */}
 <div className="md:col-span-2 flex flex-col gap-6">
 {[...Array(3)].map((_, i) => (
 <div key={i} className="flex flex-col gap-3">
 <Skeleton className="h-6 w-40 " />
 <Skeleton className="h-4 w-full " />
 <Skeleton className="h-4 w-5/6 " />
 <Skeleton className="h-4 w-4/6 " />
 </div>
 ))}
 </div>
 {/* Sidebar */}
 <div className="flex flex-col gap-4">
 {[...Array(5)].map((_, i) => (
 <Skeleton key={i} className="h-5 w-full " />
 ))}
 </div>
 </div>
 </div>
 );
}
