import React, { Suspense } from 'react';
import LessonContent from './LessonContent';
import DashboardSkeleton from '@/components/ui/DashboardSkeleton';

export const metadata = {
  title: 'Lesson Builder — SYICT Instructor',
  description: 'Manage your course curriculum and lessons.',
};

export default function InstructorLessonsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <LessonContent />
    </Suspense>
  );
}
