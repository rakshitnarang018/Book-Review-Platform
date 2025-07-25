import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

const BookCard = ({ book }) => {
  // Generate a gradient based on genre
  const getGradient = (genre) => {
    const gradients = {
      'Romance': 'from-pink-400 to-rose-500',
      'Science Fiction': 'from-purple-400 to-blue-500',
      'Fantasy': 'from-green-400 to-teal-500',
      'Mystery': 'from-gray-600 to-gray-800',
      'Thriller': 'from-red-500 to-orange-500',
      'Fiction': 'from-indigo-400 to-purple-500',
      'Non-Fiction': 'from-yellow-400 to-orange-500',
      'Biography': 'from-blue-400 to-cyan-500',
    };
    return gradients[genre] || 'from-blue-500 to-purple-600';
  };

  return (
    <Link to={`/books/${book._id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Book Cover */}
        <div className={`h-48 bg-gradient-to-br ${getGradient(book.genre)} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-3">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="font-bold text-lg text-center line-clamp-2 mb-1">
              {book.title}
            </h3>
            <p className="text-sm opacity-90 text-center">by {book.author}</p>
          </div>
          
          {/* Genre Badge */}
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium">{book.genre}</span>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <RatingStars rating={book.averageRating} size="sm" />
            <span className="text-sm text-gray-500 flex items-center space-x-1">
              <span className="w-4 h-4 text-gray-400">👥</span>
              <span>{book.reviewCount}</span>
            </span>
          </div>
          
          {book.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {book.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 flex items-center space-x-1">
              <span>📅</span>
              <span>{new Date(book.createdAt).toLocaleDateString()}</span>
            </span>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;