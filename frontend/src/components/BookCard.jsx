import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const BookCard = ({ book }) => {
  return (
    <Link to={`/books/${book._id}`} className="block">
      <div className="card hover:scale-105 transform transition-all duration-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
          <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RatingStars rating={book.averageRating} size="sm" />
            <span className="text-sm text-gray-600">
              ({book.reviewCount} {book.reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(book.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        {book.description && (
          <p className="text-gray-700 text-sm mt-3 line-clamp-3">
            {book.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default BookCard;