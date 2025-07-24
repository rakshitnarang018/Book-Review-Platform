const { seedUsers } = require('./userseeder');
const { seedBooks } = require('./bookseeder');
const { seedReviews } = require('./reviewseeder');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Seed in order due to dependencies
    console.log('1. Seeding users...');
    await seedUsers();
    
    console.log('2. Seeding books...');
    await seedBooks();
    
    console.log('3. Seeding reviews...');
    await seedReviews();
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
};

module.exports = {
  seedDatabase,
  seedUsers,
  seedBooks,
  seedReviews
};
