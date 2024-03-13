import mongoose, { Schema } from "mongoose";

const coursesSchema = new Schema(
  {
    userId: { type: String, required: true },
    id: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    status: String,
  },
  {
    timestamps: true,
  }
);

const Course =
  mongoose.models.Course || mongoose.model("Course", coursesSchema);

export default Course;
