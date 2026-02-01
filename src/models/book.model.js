import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      index: true,      //for Author based search
    },

    publishDate: {
      type: Date,
      index: true,    // for date range filters
    },
  },
  {
    timestamps: true,
  },
);

// text index for search on name and description
bookSchema.index({
  name: "text",
  description: "text",
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
