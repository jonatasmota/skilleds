import mongoose, { Schema } from "mongoose";

const coursesSchema = new Schema(
  {
    userId: { type: String, required: true },
    id: String,
    title: String,
    description: String,
    link: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Course =
  mongoose.models.Course || mongoose.model("Course", coursesSchema);

export default Course;
