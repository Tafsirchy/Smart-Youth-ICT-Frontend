export const metadata = { title: 'Student Dashboard' };

export default function StudentDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-textPrimary mb-6">My Dashboard</h1>
      {/* TODO: Stats cards, enrolled courses, recent progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Enrolled Courses', 'Completed Lessons', 'Certificates'].map((label) => (
          <div key={label} className="card p-6">
            <p className="text-textSecondary text-sm">{label}</p>
            <p className="text-3xl font-extrabold text-textPrimary mt-1">0</p>
          </div>
        ))}
      </div>
    </div>
  );
}
