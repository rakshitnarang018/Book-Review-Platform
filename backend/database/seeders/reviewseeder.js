const { Review, Book, User } = require('../../models');

const sampleReviewTexts = [
  "An absolutely fantastic read! Couldn't put it down.",
  "This book changed my perspective on life. Highly recommended!",
  "Well-written and engaging from start to finish.",
  "A masterpiece of literature. Every page is worth reading.",
  "Decent book, but not as good as I expected.",
  "The author's writing style is captivating and unique.",
  "A bit slow at the beginning but picks up nicely.",
  "One of the best books I've read this year!",
  "Interesting concept but could have been executed better.",
  "A thrilling page-turner that keeps you guessing.",
  "Beautiful prose and well-developed characters.",
  "Not my cup of tea, but I can see why others might enjoy it.",
  "Exceptional storytelling with deep emotional impact.",
  "A classic that deserves all the praise it gets.",
  "Thought-provoking and intellectually stimulating.",
  "Great for a quick, entertaining read.",
  "The plot twists are incredible and unexpected.",
  "A bit predictable but still enjoyable overall."
];

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
const getRandomReviewText = () => {
  // 30% chance of no review text (rating only)
  if (Math.random() < 0.3) return '';
  return sampleReviewTexts[Math.floor(Math.random() * sampleReviewTexts.length)];
};

const seedReviews = async () => {
  try {
    // Get all users and books
    const users = await User.find();
    const books = await Book.find();
    
    if (users.length === 0 || books.length === 0) {
      throw new Error('No users or books found. Please seed users and books first.');
    }
    
    // Clear existing reviews
    await Review.deleteMany({});
    
    const reviews = [];
    
    // Create 2-5 reviews per book
    for (const book of books) {
      const numReviews = Math.floor(Math.random() * 4) + 2; // 2-5 reviews
      const reviewersForThisBook = [];
      
      for (let i = 0; i < numReviews && reviewersForThisBook.length < users.length; i++) {
        // Pick a random user who hasn't reviewed this book yet
        let randomUser;
        do {
          randomUser = users[Math.floor(Math.random() * users.length)];
        } while (reviewersForThisBook.includes(randomUser._id.toString()));
        
        reviewersForThisBook.push(randomUser._id.toString());
        
        reviews.push({
          rating: getRandomRating(),
          review_text: getRandomReviewText(),
          reviewer: randomUser._id,
          book: book._id,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
        });
      }
    }
    
    const createdReviews = await Review.insertMany(reviews);
    console.log(`${createdReviews.length} reviews seeded successfully`);
    
    // Update book ratings and review counts
    for (const book of books) {
      const bookReviews = createdReviews.filter(review => 
        review.book.toString() === book._id.toString()
      );
      
      if (bookReviews.length > 0) {
        const totalRating = bookReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / bookReviews.length;
        
        await Book.findByIdAndUpdate(book._id, {
          averageRating: Math.round(averageRating * 10) / 10,
          reviewCount: bookReviews.length
        });
      }
    }
    
    console.log('Book ratings updated successfully');
    return createdReviews;
  } catch (error) {
    console.error('Error seeding reviews:', error);
    throw error;
  }
};

module.exports = { seedReviews };