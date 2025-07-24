const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_text: {
    type: String,
    trim: true,
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
}, {
  timestamps: true
});

// Prevent duplicate reviews by same user for same book
reviewSchema.index({ reviewer: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);