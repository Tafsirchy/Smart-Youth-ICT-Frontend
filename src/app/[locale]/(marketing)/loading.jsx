export default function MarketingLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero skeleton */}
      <div className="h-64 bg-gray-200 w-full" />

      {/* Content skeletons */}
      <div className="container-custom py-16 space-y-6">
        <div className="h-8 bg-gray-200 rounded-xl w-1/3 mx-auto" />
        <div className="h-4 bg-gray-200 rounded-full w-2/3 mx-auto" />
        <div className="h-4 bg-gray-200 rounded-full w-1/2 mx-auto" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-200 h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}
