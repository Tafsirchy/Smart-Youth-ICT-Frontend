import React from 'react';
import BranchDirectory from '@/components/marketing/BranchDirectory';

export const metadata = {
  title: 'Our Campuses & Branches',
  description: 'Find a branch near you and explore the available courses and expert instructors at each location.',
};

export default function BranchesPage({ params: { locale } }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-12">
      <BranchDirectory locale={locale} />
    </div>
  );
}
