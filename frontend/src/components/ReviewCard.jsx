import React from 'react';
import RatingStars from './RatingStars';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
            {review.reviewer.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{review.reviewer.username}</p>
            <RatingStars rating={review.rating} size="sm" />
          </div>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      {review.review_text && (
        <p className="text-gray-700 text-sm leading-relaxed">
          {review.review_text}
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
