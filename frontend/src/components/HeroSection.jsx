import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 mb-12 rounded-3xl shadow-lg border border-gray-100">
      <div className="max-w-4xl mx-auto text-center px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-4xl text-white">📚</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Discover Your Next
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Great Read
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Share your thoughts, discover amazing books, and connect with fellow book lovers in our vibrant reading community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/books"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>Explore Books</span>
          </Link>
          {isAuthenticated && (
            <Link
              to="/add-book"
              className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:shadow-md flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Add a Book</span>
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📖</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">1000+</div>
            <div className="text-gray-600">Books</div>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">5000+</div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">500+</div>
            <div className="text-gray-600">Readers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;