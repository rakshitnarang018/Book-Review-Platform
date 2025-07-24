import { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

export const useBooks = (filters = {}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchBooks = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await booksAPI.getBooks({ ...filters, ...params });
      setBooks(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error, pagination, refetchBooks: fetchBooks };
};
