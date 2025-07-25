import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { reviewsAPI } from '../services/api';
import RatingStars from './RatingStars';

const schema = yup.object({
  rating: yup.number().required('Rating is required').min(1).max(5),
  review_text: yup.string().max(500, 'Review must be less than 500 characters')
});

const AddReviewForm = ({ bookId, onReviewAdded }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await reviewsAPI.addReview(bookId, data);
      reset();
      setSelectedRating(0);
      onReviewAdded();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <span className="text-2xl">✏️</span>
          <span>Add Your Review</span>
        </h3>
        <p className="text-gray-600 mt-1">Share your thoughts about this book</p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Rating *
            </label>
            <div className="flex items-center space-x-4">
              <RatingStars 
                rating={selectedRating} 
                interactive 
                onRatingChange={handleRatingChange}
                size="lg"
              />
              {selectedRating > 0 && (
                <span className="text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded-full">
                  {selectedRating} star{selectedRating !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <input 
              type="hidden" 
              {...register('rating')} 
              value={selectedRating}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm flex items-center space-x-1">
                <span>⚠️</span>
                <span>{errors.rating.message}</span>
              </p>
            )}
          </div>

          {/* Review Text Section */}
          <div className="space-y-3">
            <label htmlFor="review_text" className="block text-sm font-semibold text-gray-700">
              Review (Optional)
            </label>
            <div className="relative">
              <textarea
                id="review_text"
                {...register('review_text')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                placeholder="Share your thoughts about this book... What did you love? What could be better?"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                Max 500 characters
              </div>
            </div>
            {errors.review_text && (
              <p className="text-red-500 text-sm flex items-center space-x-1">
                <span>⚠️</span>
                <span>{errors.review_text.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting || selectedRating === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>📝</span>
                <span>Submit Review</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewForm;