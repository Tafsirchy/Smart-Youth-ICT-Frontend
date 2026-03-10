import api from '@/lib/api';

export const paymentService = {
  initiateBkash:  (data) => api.post('/payments/bkash/initiate', data),
  initiateNagad:  (data) => api.post('/payments/nagad/initiate', data),
  initiateStripe: (data) => api.post('/payments/stripe/initiate', data),
  submitBank:     (data) => api.post('/payments/bank/submit', data),
  getHistory:     ()     => api.get('/payments/history'),
  getInstallments:(id)   => api.get(`/payments/installments/${id}`),
};
