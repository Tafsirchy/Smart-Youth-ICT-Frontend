import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// ─── Courses Hooks ────────────────────────────────────────────────────────────

/**
 * Fetch all published courses with optional filters. Results are cached by TanStack Query.
 */
export function useCourses(params = {}) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn:  () => api.get('/courses', { params }).then(res => res.data),
    staleTime: 1000 * 60 * 5, // 5-minute cache
  });
}

/**
 * Fetch a single course by slug.
 */
export function useCourse(slug) {
  return useQuery({
    queryKey:  ['course', slug],
    queryFn:   () => api.get(`/courses/${slug}`).then(res => res.data.data),
    enabled:   Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Fetch courses the current student is enrolled in.
 */
export function useEnrolledCourses() {
  return useQuery({
    queryKey: ['enrolledCourses'],
    queryFn:  () => api.get('/courses/enrolled').then(res => res.data.data),
    staleTime: 1000 * 60 * 2,
  });
}

// ─── Progress Hooks ───────────────────────────────────────────────────────────

/**
 * Fetch progress for a specific course.
 */
export function useCourseProgress(courseId) {
  return useQuery({
    queryKey:  ['progress', courseId],
    queryFn:   () => api.get(`/progress/${courseId}`).then(res => res.data.data),
    enabled:   Boolean(courseId),
    staleTime: 1000 * 30,
  });
}

/**
 * Fetch dashboard stats (enrollments, completed lessons, certificates).
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn:  () => api.get('/progress/dashboard/stats').then(res => res.data.data),
    staleTime: 1000 * 60,
  });
}

/**
 * Mutation to mark a lesson complete — automatically invalidates progress cache.
 */
export function useMarkLessonComplete(courseId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId) => api.put(`/progress/${courseId}/complete-lesson`, { lessonId }).then(res => res.data.data),
    onSuccess: (updatedProgress) => {
      queryClient.setQueryData(['progress', courseId], updatedProgress);
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
}

// ─── Lessons Hooks ────────────────────────────────────────────────────────────

/**
 * Fetch all lessons for a course.
 */
export function useLessons(courseId) {
  return useQuery({
    queryKey:  ['lessons', courseId],
    queryFn:   () => api.get('/lessons', { params: { courseId } }).then(res => res.data.data),
    enabled:   Boolean(courseId),
    staleTime: 1000 * 60 * 5,
  });
}
