import React from 'react';
import RatingStars from './RatingStars';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-md">
            {review.reviewer.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{review.reviewer.username}</p>
            <div className="mt-1">
              <RatingStars rating={review.rating} size="sm" />
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
             
      {review.review_text && (
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-gray-700 text-sm leading-relaxed italic">
            "{review.review_text}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;