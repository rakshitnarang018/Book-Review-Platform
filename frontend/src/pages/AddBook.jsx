import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { booksAPI } from '../services/api';

const schema = yup.object({
  title: yup.string().required('Title is required').max(200, 'Title cannot exceed 200 characters'),
  author: yup.string().required('Author is required').max(100, 'Author cannot exceed 100 characters'),
  genre: yup.string().required('Genre is required'),
  description: yup.string().max(1000, 'Description cannot exceed 1000 characters')
});

const AddBook = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Other'];

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      const response = await booksAPI.addBook(data);
      navigate(`/books/${response.data.data._id}`);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to add book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">➕</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Add New Book
          </h1>
          <p className="text-gray-600 text-xl">Share a great book with the community</p>
        </div>

        {/* Add Book Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
          {/* Error Message */}
          {submitError && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-sm">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {submitError}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="mr-2">📚</span>
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                {...register('title')}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter book title"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">❌</span>
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="mr-2">✍️</span>
                Author *
              </label>
              <input
                type="text"
                id="author"
                {...register('author')}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Enter author name"
                disabled={isSubmitting}
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">❌</span>
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="mr-2">🏷️</span>
                Genre *
              </label>
              <select
                id="genre"
                {...register('genre')}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                disabled={isSubmitting}
              >
                <option value="">Select a genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              {errors.genre && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">❌</span>
                  {errors.genre.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="mr-2">📝</span>
                Description (Optional)
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={5}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Enter book description..."
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-1">❌</span>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/books')}
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-3 focus:ring-gray-500/20 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="mr-2">❌</span>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-3 focus:ring-blue-500/20 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Book...
                  </>
                ) : (
                  <>
                    <span className="mr-2">📖</span>
                    Add Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Help others discover great books! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddBook;