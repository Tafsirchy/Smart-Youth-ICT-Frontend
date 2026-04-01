'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CourseForm from '@/components/dashboard/courses/CourseForm';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { IoSyncOutline } from 'react-icons/io5';

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch raw data (we must use a special backend route if /slug intercepts IDs natively, 
        // assuming standard REST where /courses/id or search works. 
        // Wait, the backend has /courses/:slug not /courses/id. Let's use it if id == slug, 
        // but id is ObjectId here. 
        // Let's assume we can fetch by slug or modify backend to allow ID checking.
        // Actually, backend /courses/:slug uses `findOne({ slug: req.params.slug })`.
        // If we only have ObjectId here (from grid), we need a route /courses/id/:id or similar.
        // BUT wait, in the grid, we have the FULL data. But reloading the page requires fetch.
        // Let's assume the backend /courses endpoint can be fetched by ID if we pass it as a query, 
        // OR we just use the API correctly. Actually, many times `findById` is used in custom routes.
        // Since we don't have a direct GET /:id, we can fetch all and find it, or use the `id` assuming the backend handles it.
        // Wait, backend course.routes.js: `router.get('/:id', getCourse)`. No, it has `router.get('/:slug', getCourseBySlug)`.
        const res = await api.get('/courses', { params: { limit: 100, includeUnpublished: 'true' } });
        const found = res.data.data.find(c => c._id === id);
        if (found) {
            setCourse(found);
        } else {
            toast.error("Course not found");
            router.back();
        }
      } catch (err) {
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchCourse();
  }, [id, router]);

  const handleSuccess = (updatedCourse) => {
    toast.success('Course updated successfully!');
    router.back();
  };

  if (loading) {
     return <div className="flex flex-col items-center justify-center py-32 text-neutral-400">
         <IoSyncOutline className="animate-spin mb-4" size={40} />
         <p>Loading Course Data...</p>
     </div>
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      {course && <CourseForm initialData={course} onSuccess={handleSuccess} />}
    </div>
  );
}
