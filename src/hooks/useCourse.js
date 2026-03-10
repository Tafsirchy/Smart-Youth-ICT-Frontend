import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/services/courseService';

export function useCourses(params) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn:  () => courseService.getAll(params).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCourse(slug) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn:  () => courseService.getBySlug(slug).then((r) => r.data),
    enabled:  !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function useEnrolledCourses() {
  return useQuery({
    queryKey: ['enrolled-courses'],
    queryFn:  () => courseService.getMine().then((r) => r.data),
  });
}
