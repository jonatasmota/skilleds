import mongoose, { Schema } from "mongoose";

const boardsSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    position: Number,
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.models.Board || mongoose.model("Board", boardsSchema);

export default Board;
