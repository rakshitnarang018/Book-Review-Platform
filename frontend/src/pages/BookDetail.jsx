import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { booksAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import AddReviewForm from '../components/AddReviewForm';
import Loading from '../components/Loading';

const BookDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookData = async () => {
    try {
      setLoading(true);
      const response = await booksAPI.getBook(id);
      setBook(response.data.data.book);
      setReviews(response.data.data.reviews);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, [id]);

  const handleReviewAdded = () => {
    fetchBookData(); // Refresh data after adding review
  };

  if (loading) return <Loading message="Loading book details..." />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12 text-center max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12 text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Not Found</h2>
          <p className="text-gray-500 text-lg">The book you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Book Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Book Cover */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-8xl mb-6">📚</div>
                <p className="text-sm opacity-90 font-medium">Book Cover</p>
              </div>
            </div>
            
            {/* Book Info */}
            <div className="lg:w-2/3 space-y-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  {book.title}
                </h1>
                <p className="text-2xl text-gray-600 mb-4">by {book.author}</p>
                <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
                  <span className="mr-2">🏷️</span>
                  {book.genre}
                </span>
              </div>

              <div className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
                <RatingStars rating={book.averageRating} size="lg" />
                <span className="text-gray-600 font-medium">
                  ({book.reviewCount} {book.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>

              {book.description && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">📖</span>
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2">👤</span>
                  Added by: <span className="font-semibold ml-1">{book.addedBy?.username}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2">📅</span>
                  Date added: <span className="font-semibold ml-1">{new Date(book.createdAt).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Review Form */}
        {isAuthenticated && (
          <AddReviewForm bookId={id} onReviewAdded={handleReviewAdded} />
        )}

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                <span className="mr-3">💬</span>
                Reviews ({reviews.length})
              </h2>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12 text-center hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 text-lg">Be the first to review this book!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;