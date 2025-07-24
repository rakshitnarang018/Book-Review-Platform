const mongoose = require('mongoose');
const { User, Book, Review } = require('../../models');

const dbUtils = {
  // Check database connection
  async checkConnection() {
    try {
      const state = mongoose.connection.readyState;
      const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
      };
      
      console.log(`Database connection state: ${states[state]}`);
      return state === 1;
    } catch (error) {
      console.error('Error checking database connection:', error);
      return false;
    }
  },

  // Get database statistics
  async getDatabaseStats() {
    try {
      const userCount = await User.countDocuments();
      const bookCount = await Book.countDocuments();
      const reviewCount = await Review.countDocuments();
      
      return {
        users: userCount,
        books: bookCount,
        reviews: reviewCount,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error getting database stats:', error);
      throw error;
    }
  },

  // Update all book ratings (utility function)
  async updateAllBookRatings() {
    try {
      const books = await Book.find();
      
      for (const book of books) {
        const reviews = await Review.find({ book: book._id });
        
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRating / reviews.length;
          
          await Book.findByIdAndUpdate(book._id, {
            averageRating: Math.round(averageRating * 10) / 10,
            reviewCount: reviews.length
          });
        }
      }
      
      console.log('All book ratings updated successfully');
    } catch (error) {
      console.error('Error updating book ratings:', error);
      throw error;
    }
  },

  // Create database indexes for performance
  async createIndexes() {
    try {
      // User indexes
      await User.collection.createIndex({ username: 1 }, { unique: true });
      
      // Book indexes
      await Book.collection.createIndex({ genre: 1 });
      await Book.collection.createIndex({ author: 1 });
      await Book.collection.createIndex({ averageRating: -1 });
      await Book.collection.createIndex({ createdAt: -1 });
      await Book.collection.createIndex({ title: 1, author: 1 });
      
      // Review indexes
      await Review.collection.createIndex({ book: 1 });
      await Review.collection.createIndex({ reviewer: 1 });
      await Review.collection.createIndex({ reviewer: 1, book: 1 }, { unique: true });
      await Review.collection.createIndex({ createdAt: -1 });
      
      console.log('Database indexes created successfully');
    } catch (error) {
      console.error('Error creating indexes:', error);
      throw error;
    }
  }
};

module.exports = dbUtils;