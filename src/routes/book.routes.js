import express from "express";
import {
  createBook,
  getBookById,
  exploreBooks,
} from "../controllers/book.controller.js";
import validate from "../middlewares/validate.js";
import { createBookSchema } from "../validations/book.validation.js";
const router = express.Router();

// Create Book
router.post(
  "/",
  validate(createBookSchema), //  validation middleware
  createBook,
);

// Explore Books (search, filter, paginate, sort)
router.get("/", exploreBooks);

// Get Book by ID
router.get("/:id", getBookById);

export default router;
