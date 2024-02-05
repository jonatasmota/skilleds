import mongoose, { Schema } from "mongoose";

const boardsSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: String,
    description: String,
    position: Number,
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.models.Board || mongoose.model("Board", boardsSchema);

export default Board;
