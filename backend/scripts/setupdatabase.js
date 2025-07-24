const mongoose = require('mongoose');
const connectDB = require('../config/database');
const dbUtils = require('../database/utils/dbutils');
require('dotenv').config();

const setupDatabase = async () => {
  try {
    console.log('Setting up database...');
    
    // Connect to database
    await connectDB();
    
    // Check connection
    const isConnected = await dbUtils.checkConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }
    
    // Create indexes
    console.log('Creating database indexes...');
    await dbUtils.createIndexes();
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

// Run setup if called directly
if (require.main === module) {
  setupDatabase().then(() => {
    console.log('Setup script completed');
    process.exit(0);
  });
}

module.exports = setupdatabase;