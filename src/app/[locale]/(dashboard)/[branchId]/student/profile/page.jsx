import { redirect } from 'next/navigation';

/**
 * Deprecated: Role-specific profile page.
 * Identity management has been centralized to the global dashboard profile.
 */
export default async function DeprecatedStudentProfile({ params }) {
  const { locale } = await params;
  redirect(`/${locale}/profile`);
}

