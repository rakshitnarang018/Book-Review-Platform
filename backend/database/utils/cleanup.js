const { User, Book, Review } = require('../../models');

const cleanup = {
  // Remove all data from collections
  async clearAllData() {
    try {
      await Review.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});
      
      console.log('All data cleared from database');
    } catch (error) {
      console.error('Error clearing database:', error);
      throw error;
    }
  },

  // Remove orphaned reviews (reviews without valid book or user)
  async removeOrphanedReviews() {
    try {
      const reviews = await Review.find().populate('book reviewer');
      let removedCount = 0;
      
      for (const review of reviews) {
        if (!review.book || !review.reviewer) {
          await Review.findByIdAndDelete(review._id);
          removedCount++;
        }
      }
      
      console.log(`Removed ${removedCount} orphaned reviews`);
      return removedCount;
    } catch (error) {
      console.error('Error removing orphaned reviews:', error);
      throw error;
    }
  },

  // Remove books with no reviews (optional cleanup)
  async removeBooksWithoutReviews() {
    try {
      const books = await Book.find();
      let removedCount = 0;
      
      for (const book of books) {
        const reviewCount = await Review.countDocuments({ book: book._id });
        if (reviewCount === 0) {
          await Book.findByIdAndDelete(book._id);
          removedCount++;
        }
      }
      
      console.log(`Removed ${removedCount} books without reviews`);
      return removedCount;
    } catch (error) {
      console.error('Error removing books without reviews:', error);
      throw error;
    }
  }
};

module.exports = cleanup;