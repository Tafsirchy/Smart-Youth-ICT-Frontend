export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo pulse */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-green animate-pulse opacity-80" />
        {/* Bar skeletons */}
        <div className="flex flex-col gap-2 items-center">
          <div className="h-3 w-48 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-3 w-32 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
