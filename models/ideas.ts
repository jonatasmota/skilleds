import mongoose, { Schema } from "mongoose";

const ideasSchema = new Schema(
  {
    userId: { type: String, required: true },
    id: String,
    subject: String,
    title: String,
    textarea: String,
    imgUrl: String,
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.models.Idea || mongoose.model("Idea", ideasSchema);

export default Idea;
