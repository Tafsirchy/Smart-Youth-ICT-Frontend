export const metadata = { title: 'Certificates' };

export default function CertificatesPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">My Certificates</h1>
      <p className="text-neutral-500 mb-8">Download and share your achievements.</p>
      
      <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-12 text-center text-neutral-500">
        No certificates earned yet. Complete a course to generate your first certificate!
      </div>
    </div>
  );
}
