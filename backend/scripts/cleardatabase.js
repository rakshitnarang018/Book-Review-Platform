const mongoose = require('mongoose');
const connectDB = require('../config/database');
const cleanup = require('../database/utils/cleanup');
require('dotenv').config();

const clearDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    console.log('Clearing all data from database...');
    await cleanup.clearAllData();
    
    console.log('Database cleared successfully!');
  } catch (error) {
    console.error('Failed to clear database:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

// Run cleaner if called directly
if (require.main === module) {
  clearDatabase();
}

module.exports = cleardatabase;