import { redirect } from 'next/navigation';

/**
 * Deprecated: Role-specific profile page.
 * Identity management has been centralized to the global dashboard profile.
 */
export default function DeprecatedStudentProfile({ params }) {
  const { locale } = params;
  redirect(`/${locale}/profile`);
}

