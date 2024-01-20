import mongoose, { Schema } from "mongoose";

const booksSchema = new Schema(
  {
    id: String,
    subject: String,
    title: String,
    author: String,
    description: String,
    link: String,
    status: String,
    _id: String,
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || mongoose.model("Book", booksSchema);

export default Book;
