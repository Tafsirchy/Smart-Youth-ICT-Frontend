import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function StudentLayout({ children, params }) {
  const session = await getServerSession(authOptions);
  const { locale } = params;

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  );
}
