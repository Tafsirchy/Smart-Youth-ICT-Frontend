'use client';

import CourseForm from '@/components/dashboard/courses/CourseForm';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateCoursePage() {
  const router = useRouter();

  const handleSuccess = (createdCourse) => {
    toast.success('Course created and published successfully!');
    router.back();
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <h1 className="text-2xl font-bold mb-6">Build a Master Course</h1>
      <CourseForm onSuccess={handleSuccess} />
    </div>
  );
}
