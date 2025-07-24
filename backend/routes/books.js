const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Book = require('../models/Book');
const Review = require('../models/Review');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/books
// @desc    Get all books with filtering, sorting, and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('sortBy').optional().isIn(['rating', 'date', 'title']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const {
      author,
      genre,
      page = 1,
      limit = 10,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    // Build sort object
    let sortField;
    switch (sortBy) {
      case 'rating':
        sortField = 'averageRating';
        break;
      case 'date':
        sortField = 'createdAt';
        break;
      case 'title':
        sortField = 'title';
        break;
      default:
        sortField = 'createdAt';
    }

    const sortObj = {};
    sortObj[sortField] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get books with pagination
    const books = await Book.find(filter)
      .populate('addedBy', 'username')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Book.countDocuments(filter);

    res.json({
      success: true,
      data: books,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalBooks: total,
        hasNext: skip + books.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
});

// @route   GET /api/books/:id
// @desc    Get single book with all reviews
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'username');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get all reviews for this book
    const reviews = await Review.find({ book: req.params.id })
      .populate('reviewer', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        book,
        reviews
      }
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
});

// @route   POST /api/books
// @desc    Add a new book
// @access  Protected
router.post('/', authMiddleware, [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 100 })
    .withMessage('Author name cannot exceed 100 characters'),
  body('genre')
    .notEmpty()
    .withMessage('Genre is required')
    .isIn(['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Other'])
    .withMessage('Invalid genre'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, author, genre, description } = req.body;

    // Check if book already exists
    const existingBook = await Book.findOne({ 
      title: new RegExp(`^${title}$`, 'i'), 
      author: new RegExp(`^${author}$`, 'i') 
    });

    if (existingBook) {
      return res.status(400).json({ message: 'This book already exists' });
    }

    const book = new Book({
      title,
      author,
      genre,
      description,
      addedBy: req.user.id
    });

    await book.save();
    await book.populate('addedBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: book
    });
  } catch (error) {
    console.error('Add book error:', error);
    res.status(500).json({ message: 'Server error while adding book' });
  }
});

module.exports = router;