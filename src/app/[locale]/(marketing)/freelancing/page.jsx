import React from 'react';
import FreelancingDirectory from '@/components/freelancing/FreelancingDirectory';

export const metadata = {
  title: 'Freelancing Projects | SYICT',
  description: 'Earn while you learn. Browse active freelancing projects and internships available for SYICT students.',
};

export default function FreelancingPage() {
  return <FreelancingDirectory />;
}
