import mongoose, { Schema } from "mongoose";

const ideasSchema = new Schema(
  {
    userId: { type: String, required: true },
    id: String,
    subject: { type: String, required: true },
    title: { type: String, required: true },
    textarea: { type: String, required: true },
    imgUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.models.Idea || mongoose.model("Idea", ideasSchema);

export default Idea;
