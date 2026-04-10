import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

/**
 * Super Admin Route Guard
 * Enforces global management permissions for all /super routes.
 */
export default async function SuperDashboardLayout({ children, params }) {
  const session = await getServerSession(authOptions);
  const { locale } = params;

  // Roles allowed to access global management
  const allowedRoles = ['super_admin', 'super_management'];

  if (!session) {
    redirect(`/${locale}/login`);
  }

  if (!allowedRoles.includes(session.user.role)) {
    console.warn(`[Guard] ${session.user.email} (Role: ${session.user.role}) attempted to access super dashboard.`);
    
    // Redirect unauthorized staff back to their branch admin, students back to student dashboard
    if (session.user.branchId) {
      redirect(`/${locale}/${session.user.branchId}/admin`);
    } else {
      redirect(`/${locale}/student`);
    }
  }

  return <>{children}</>;
}
