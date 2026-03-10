import api from '@/lib/api';

export const authService = {
  login:          (credentials)  => api.post('/auth/login', credentials),
  register:       (data)         => api.post('/auth/register', data),
  forgotPassword: (email)        => api.post('/auth/forgot-password', { email }),
  resetPassword:  (token, pass)  => api.post('/auth/reset-password', { token, password: pass }),
  getProfile:     ()             => api.get('/auth/me'),
  updateProfile:  (data)         => api.put('/auth/profile', data),
};
