import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function InstructorLayout({ children, params }) {
  const session = await getServerSession(authOptions);
  const { locale, branchId } = params;

  // Roles allowed to access the instructor dashboard
  const allowedRoles = [
    'instructor',
    'super_admin',
    'super_management',
    'branch_admin',
    'branch_management'
  ];

  if (!session) {
    redirect(`/${locale}/login`);
  }

  if (!allowedRoles.includes(session.user.role)) {
    // Redirect unauthorized users to their student dashboard
    redirect(`/${locale}/${branchId}/student`);
  }

  return <>{children}</>;
}
