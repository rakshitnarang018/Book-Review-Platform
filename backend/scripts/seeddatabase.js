const mongoose = require('mongoose');
const connectDB = require('../config/database');
const { seedDatabase } = require('../database/seeders');
require('dotenv').config();

const runSeeder = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    console.log('Starting database seeding process...');
    await seedDatabase();
    
    console.log('Seeding completed successfully!');
    
    // Get final stats
    const { User, Book, Review } = require('../models');
    const userCount = await User.countDocuments();
    const bookCount = await Book.countDocuments();
    const reviewCount = await Review.countDocuments();
    
    console.log('\n=== SEEDING SUMMARY ===');
    console.log(`Users created: ${userCount}`);
    console.log(`Books created: ${bookCount}`);
    console.log(`Reviews created: ${reviewCount}`);
    console.log('=======================\n');
    
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeder if called directly
if (require.main === module) {
  runSeeder();
}

module.exports = runseeder;