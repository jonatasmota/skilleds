import mongoose, { Schema } from "mongoose";

const booksSchema = new Schema(
  {
    userId: { type: String, required: true },
    id: String,
    subject: String,
    title: String,
    author: String,
    description: String,
    link: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || mongoose.model("Book", booksSchema);

export default Book;
