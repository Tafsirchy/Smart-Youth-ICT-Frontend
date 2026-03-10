import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/layout/Sidebar';

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Sidebar role={session.user.role} user={session.user} />
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
