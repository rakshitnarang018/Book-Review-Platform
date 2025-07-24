const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const sampleUsers = [
  {
    username: 'bookworm123',
    password: 'password123'
  },
  {
    username: 'readerlover',
    password: 'password123'
  },
  {
    username: 'literaturefan',
    password: 'password123'
  },
  {
    username: 'novelenthusiast',
    password: 'password123'
  },
  {
    username: 'bookcritique',
    password: 'password123'
  },
  {
    username: 'storyseeker',
    password: 'password123'
  },
  {
    username: 'pageturner',
    password: 'password123'
  },
  {
    username: 'biblio_addict',
    password: 'password123'
  }
];

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Create users with hashed passwords
    const users = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      users.push({
        username: userData.username,
        password: hashedPassword
      });
    }
    
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users seeded successfully`);
    
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

module.exports = { seedUsers, sampleUsers };
