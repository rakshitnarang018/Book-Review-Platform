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
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Book Details */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-sm opacity-90">Book Cover</p>
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-2">by {book.author}</p>
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {book.genre}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <RatingStars rating={book.averageRating} size="lg" />
              <span className="text-gray-600">
                ({book.reviewCount} {book.reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {book.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <p>Added by: <span className="font-medium">{book.addedBy?.username}</span></p>
              <p>Date added: {new Date(book.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      {isAuthenticated && (
        <AddReviewForm bookId={id} onReviewAdded={handleReviewAdded} />
      )}

      {/* Reviews Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Reviews ({reviews.length})
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;