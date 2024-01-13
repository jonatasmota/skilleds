import mongoose, { Schema } from "mongoose";

const coursesSchema = new Schema(
  {
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
