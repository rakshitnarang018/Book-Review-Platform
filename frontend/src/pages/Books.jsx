import React, { useState, useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';

const Books = () => {
  const [filters, setFilters] = useState({
    author: '',
    genre: '',
    sortBy: 'date',
    sortOrder: 'desc',
    page: 1
  });
  
  const { books, loading, error, pagination, refetchBooks } = useBooks();

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Other'];

  useEffect(() => {
    refetchBooks(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setFilters({
      author: '',
      genre: '',
      sortBy: 'date',
      sortOrder: 'desc',
      page: 1
    });
  };

  if (loading && books.length === 0) return <Loading message="Loading books..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Book Collection
          </h1>
          <p className="text-gray-600 text-xl">Discover and review amazing books</p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <span className="text-xl mr-2">🔍</span>
            <h2 className="text-lg font-semibold text-gray-800">Filter & Sort</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search by Author
              </label>
              <input
                type="text"
                value={filters.author}
                onChange={(e) => handleFilterChange('author', e.target.value)}
                placeholder="Enter author name..."
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              >
                <option value="date">Date Added</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-500/20 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="mr-2">🧹</span>
            Clear Filters
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
            <div className="flex items-center">
              <span className="mr-2 text-xl">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Results Info */}
        {pagination.totalBooks > 0 && (
          <div className="bg-blue-50/50 px-4 py-3 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-700 font-medium flex items-center">
              <span className="mr-2">📊</span>
              Showing {((pagination.currentPage - 1) * 10) + 1} - {Math.min(pagination.currentPage * 10, pagination.totalBooks)} of {pagination.totalBooks} books
            </p>
          </div>
        )}

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12 text-center hover:shadow-2xl transition-all duration-300">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Books Found</h3>
            <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-500/20 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="mr-2">⬅️</span>
              Previous
            </button>
            
            <div className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg">
              <span className="mr-2">📄</span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </div>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-500/20 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Next
              <span className="ml-2">➡️</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;