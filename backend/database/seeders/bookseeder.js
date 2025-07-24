const { Book, User } = require('../../models');

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream."
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence in the American South."
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Fiction",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance."
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century."
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    description: "A controversial novel about teenage rebellion and alienation in 1950s America."
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    description: "The first book in the magical series about a young wizard's adventures at Hogwarts."
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description: "An epic high fantasy novel about the quest to destroy the One Ring and defeat the Dark Lord."
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Mystery",
    description: "A psychological thriller about a husband who becomes the prime suspect in his wife's disappearance."
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    description: "A mystery thriller involving secret societies, religious conspiracies, and ancient symbols."
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    description: "A science fiction epic set on the desert planet Arrakis, focusing on politics, religion, and ecology."
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Sci-Fi",
    description: "A comedic science fiction series following Arthur Dent's adventures through space."
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "Biography",
    description: "The definitive biography of Apple co-founder Steve Jobs, based on extensive interviews."
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    description: "A brief history of humankind, exploring how Homo sapiens came to dominate the world."
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    genre: "Self-Help",
    description: "A self-help book presenting an approach to being effective in attaining goals."
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "Non-Fiction",
    description: "A popular science book that discusses the nature of space and time, black holes, and the universe."
  }
];

const seedBooks = async () => {
  try {
    // Get users for random assignment
    const users = await User.find();
    if (users.length === 0) {
      throw new Error('No users found. Please seed users first.');
    }
    
    // Clear existing books
    await Book.deleteMany({});
    
    // Create books with random user assignment
    const books = sampleBooks.map(bookData => ({
      ...bookData,
      addedBy: users[Math.floor(Math.random() * users.length)]._id,
      averageRating: 0,
      reviewCount: 0
    }));
    
    const createdBooks = await Book.insertMany(books);
    console.log(`${createdBooks.length} books seeded successfully`);
    
    return createdBooks;
  } catch (error) {
    console.error('Error seeding books:', error);
    throw error;
  }
};

module.exports = { seedBooks, sampleBooks };