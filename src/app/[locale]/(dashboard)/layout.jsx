import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/layout/Sidebar';
import SessionSync from '@/components/dashboard/SessionSync';

/**
 * Common Dashboard Layout for all roles (Student, Instructor, Admin, Super Admin)
 * It handles the shell (Sidebar, Scrolling) and Session Synchronization.
 */
export default async function SharedDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-background)' }}>
      <SessionSync />
      <Sidebar initialRole={session.user.role} initialUser={session.user} />
      <div className="flex-1 overflow-y-auto">
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
