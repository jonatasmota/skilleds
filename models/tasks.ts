import mongoose, { Schema } from "mongoose";

const tasksSchema = new Schema(
  {
    userId: { type: String, required: true },
    section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    title: String,
    content: String,
    position: Number,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", tasksSchema);

export default Task;
