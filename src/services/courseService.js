import api from '@/lib/api';

export const courseService = {
  getAll:    (params)     => api.get('/courses', { params }),
  getBySlug: (slug)       => api.get(`/courses/${slug}`),
  enroll:    (courseId)   => api.post(`/courses/${courseId}/enroll`),
  getMine:   ()           => api.get('/courses/enrolled'),
};
