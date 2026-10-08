import { Skeleton } from '@/components/ui/Skeleton';
export default function PageLoading() {
 return (
 <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
 <div className="py-20 px-4 text-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)' }}>
 <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
 <Skeleton className="h-6 w-32 bg-white/10" />
 <Skeleton className="h-12 w-64 bg-white/10" />
 <Skeleton className="h-5 w-96 max-w-full bg-white/10" />
 </div>
 </div>
 {/* Instructor card grid skeleton */}
 <div className="max-w-5xl mx-auto px-4 py-16">
 <Skeleton className="h-8 w-48 mb-8" />
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
 {[...Array(8)].map((_, i) => (
 <div key={i} className="flex flex-col items-center gap-3">
 <Skeleton className="h-24 w-24 " />
 <Skeleton className="h-4 w-28 " />
 <Skeleton className="h-3 w-20 " />
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
