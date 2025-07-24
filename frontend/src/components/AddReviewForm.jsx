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
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <RatingStars 
            rating={selectedRating} 
            interactive 
            onRatingChange={handleRatingChange}
            size="lg"
          />
          <input 
            type="hidden" 
            {...register('rating')} 
            value={selectedRating}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="review_text" className="block text-sm font-medium text-gray-700 mb-2">
            Review (Optional)
          </label>
          <textarea
            id="review_text"
            {...register('review_text')}
            rows={4}
            className="input-field resize-none"
            placeholder="Share your thoughts about this book..."
          />
          {errors.review_text && (
            <p className="text-red-500 text-sm mt-1">{errors.review_text.message}</p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || selectedRating === 0}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
