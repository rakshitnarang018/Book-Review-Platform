import React from 'react';

const RatingStars = ({ rating, size = 'md', interactive = false, onRatingChange }) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const handleStarClick = (starRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className={`flex items-center ${sizes[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          disabled={!interactive}
          className={`${
            star <= Math.round(rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          } ${
            interactive 
              ? 'hover:text-yellow-400 cursor-pointer focus:outline-none' 
              : 'cursor-default'
          } transition-colors duration-150`}
        >
          ⭐
        </button>
      ))}
      {!interactive && (
        <span className="ml-1 text-gray-600 text-sm">
          {rating > 0 ? rating.toFixed(1) : 'No ratings'}
        </span>
      )}
    </div>
  );
};

export default RatingStars;