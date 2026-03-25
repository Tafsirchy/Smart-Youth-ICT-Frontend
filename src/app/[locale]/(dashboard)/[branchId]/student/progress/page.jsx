export const metadata = { title: 'My Progress' };

export default function ProgressPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">My Learning Progress</h1>
      <p className="text-neutral-500 mb-8">Detailed breakdown of your course completions and milestones.</p>
      
      <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-12 text-center text-neutral-500">
        Advanced tracking metrics and radar charts are coming soon!
      </div>
    </div>
  );
}
