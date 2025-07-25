// src/components/RatingStars.jsx
import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0, size = 'md', interactive = false, onRatingChange }) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  const [hoveredRating, setHoveredRating] = useState(null);

  const displayRating = hoveredRating !== null ? hoveredRating : rating;

  const fullStars = Math.floor(displayRating);
  const halfStar = displayRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const handleClick = (val) => {
    if (interactive && onRatingChange) {
      onRatingChange(val);
    }
  };

  return (
    <div className={`flex items-center ${sizes[size]} space-x-0.5`}>
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        const isFull = starNumber <= Math.floor(displayRating);
        const isHalf = starNumber === Math.ceil(displayRating) && displayRating % 1 >= 0.5;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick(starNumber)}
            onMouseEnter={() => interactive && setHoveredRating(starNumber)}
            onMouseLeave={() => interactive && setHoveredRating(null)}
            className={`transition-colors duration-150 ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
          >
            {isFull ? (
              <FaStar className="text-yellow-400" />
            ) : isHalf ? (
              <FaStarHalfAlt className="text-yellow-300" />
            ) : (
              <FaRegStar className="text-gray-300" />
            )}
          </button>
        );
      })}

      {!interactive && (
        <span className="ml-1 text-gray-600 text-sm">
          {rating > 0 ? rating.toFixed(1) : 'No ratings'}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
