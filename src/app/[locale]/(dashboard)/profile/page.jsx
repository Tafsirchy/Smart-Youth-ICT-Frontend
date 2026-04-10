import ProfileContent from '@/components/dashboard/ProfileContent';

export const metadata = {
  title: 'Profile Settings | SYICT',
  description: 'Manage your identity and security protocols on the SYICT Global Grid.',
};

/**
 * Global Profile Entry Point
 * Accessible by all roles (Super Admin, Admin, Instructor, Student)
 */
export default function GlobalProfilePage() {
  return (
    <div className="min-h-screen">
      <ProfileContent />
    </div>
  );
}
