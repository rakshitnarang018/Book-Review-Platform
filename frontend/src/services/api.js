import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Automatically add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const booksAPI = {
  getBooks: (params) => API.get('/books', { params }),
  getBook: (id) => API.get(`/books/${id}`),
  addBook: (data) => API.post('/books', data), // 🔥 This line was missing
};

export const reviewsAPI = {
  addReview: (bookId, reviewData) => API.post(`/reviews/${bookId}`, reviewData),
};
