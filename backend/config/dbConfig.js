const dbConfig = {
  development: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/bookreviews_dev',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    }
  },
  production: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    }
  },
  test: {
    uri: process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/bookreviews_test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    }
  }
};

const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return dbConfig[env];
};

module.exports = {
  dbConfig,
  getCurrentConfig
};

// ===== MODELS/INDEX.JS =====
const User = require('./User');
const Book = require('./Book');
const Review = require('./Review');

module.exports = {
  User,
  Book,
  Review
};