import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./src/models/book.model.js";

dotenv.config();

// NOTE: I am using hardcoded, valid MongoDB ObjectIds here.
// This ensures that the seeded data is consistent and predictable
// for manual testing and Postman usage.

const sampleBooks = [
  {
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishDate: "1925-04-10",
    description: "A novel about the American dream and the roaring twenties.",
  },
  {
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishDate: "1960-07-11",
    description:
      "A story of racial injustice and childhood innocence in the South.",
  },
  {
    name: "1984",
    author: "George Orwell",
    publishDate: "1949-06-08",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
  },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    publishDate: "1997-06-26",
    description: "A young wizard discovers his magical heritage.",
  },
  {
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    publishDate: "1937-09-21",
    description: "A fantasy novel about the adventures of Bilbo Baggins.",
  },
  {
    name: "Pride and Prejudice",
    author: "Jane Austen",
    publishDate: "1813-01-28",
    description: "A romantic novel of manners.",
  },
  {
    name: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publishDate: "1951-07-16",
    description: "A story about teenage angst and alienation.",
  },
  {
    name: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    publishDate: "1998-07-02",
    description: "Harry returns to Hogwarts for his second year.",
  },
  {
    name: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    publishDate: "1954-07-29",
    description: "Epic high fantasy novel.",
  },
  {
    name: "Animal Farm",
    author: "George Orwell",
    publishDate: "1945-08-17",
    description:
      "An allegorical novella reflecting events leading to the Russian Revolution.",
  },
  {
    name: "Clean Code",
    author: "Robert C. Martin",
    publishDate: "2008-08-01",
    description: "A handbook of agile software craftsmanship.",
  },
  {
    name: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    publishDate: "2008-05-01",
    description: "Unearthing the best features of JavaScript.",
  },
  {
    name: "The Pragmatic Programmer",
    author: "Andy Hunt",
    publishDate: "1999-10-20",
    description: "Your journey to mastery in software development.",
  },
  {
    name: "Design Patterns",
    author: "Erich Gamma",
    publishDate: "1994-10-21",
    description: "Elements of Reusable Object-Oriented Software.",
  },
  {
    name: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    publishDate: "2009-07-31",
    description: "A comprehensive guide to algorithms.",
  },
  {
    name: "Node.js Design Patterns",
    author: "Mario Casciaro",
    publishDate: "2014-07-18",
    description: "Master best practices for building Node.js applications.",
  },
  {
    name: "Rich Dad Poor Dad",
    description:
      "A personal finance classic that contrasts two perspectives on money, investing, and financial education, emphasizing assets, financial independence, and mindset over traditional employment.",
    author: "Robert T. Kiyosaki",
    publishDate: "1997-04-01",
  },
];

const seedDatabase = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to Database...");

    // Clear and Insert
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);

    console.log(" Seed Success!");
    process.exit(0);
  } catch (error) {
    console.error(" Seed Failed:", error);
    process.exit(1);
  }
};

seedDatabase();
