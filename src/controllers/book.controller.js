import Book from "../models/book.model.js";
import AppError from "../utils/AppError.js";

//         Controller to create a new book
export const createBook = async (req, res, next) => {
  try {
    const { name, author } = req.body;

    const existingBook = await Book.findOne({ name, author });
    if (existingBook) {
      return next(
        new AppError("Book with the same name and author already exists", 409),
      );
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

//          Get a single book by ID
export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return next(new AppError("Book not found", 404));
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// Helper function to prevent regex crashes with special characters
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//               Explore Books: search, filter, pagination, sorting

export const exploreBooks = async (req, res, next) => {
  try {
    const {
      search,
      author,
      from,
      to,
      page = 1,
      limit = 10,
      sortBy = "name",
      order = "asc",
    } = req.query;

    // 1. Pagination
    const pageLimit = Math.min(parseInt(limit) || 10, 50);
    const pageNumber = parseInt(page) || 1;

    if (pageNumber < 1) {
      return next(new AppError("Page must be greater than 0", 400));
    }

    const skip = (pageNumber - 1) * pageLimit;

    // 2. Filters
    const filter = {};

    if (search) {
      const safeSearch = escapeRegex(search);
      filter.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    if (author) {
      const safeAuthor = escapeRegex(author);
      filter.author = { $regex: `^${safeAuthor}$`, $options: "i" };
    }

    if (from || to) {
      filter.publishDate = {};
      if (from) filter.publishDate.$gte = new Date(from);
      if (to) filter.publishDate.$lte = new Date(to);
    }

    // 3. Sorting (whitelist to prevent abuse)
    const allowedSortFields = ["name", "author", "publishDate"];
    if (!allowedSortFields.includes(sortBy)) {
      return next(
        new AppError(
          "Invalid sortBy field. Allowed: name, author, publishDate",
          400,
        ),
      );
    }

    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrder };

    // 4. Query execution
    const totalBooks = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageLimit);

    // 5. Response
    res.status(200).json({
      total: totalBooks,
      page: pageNumber,
      limit: pageLimit,
      data: books,
    });
  } catch (error) {
    next(error); //  forwarded to global error handler
  }
};
