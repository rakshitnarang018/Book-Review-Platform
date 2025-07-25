import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// ✅ Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 📚 Books API
export const booksAPI = {
  getBooks: (params = {}) => api.get('/api/books', { params }),
  getBook: (id) => api.get(`/api/books/${id}`),
  addBook: (bookData) => api.post('/api/books', bookData),
};

// ✍️ Reviews API
export const reviewsAPI = {
  getReviews: (bookId) => api.get(`/api/reviews/${bookId}`),
  addReview: (bookId, reviewData) => api.post(`/api/reviews/${bookId}`, reviewData),
};

export default api;
