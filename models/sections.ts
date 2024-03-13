import mongoose, { Schema } from "mongoose";

const sectionsSchema = new Schema(
  {
    userId: { type: String, required: true },
    order: { type: Number, required: true },
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    title: String,
  },
  {
    timestamps: true,
  }
);

const Section =
  mongoose.models.Section || mongoose.model("Section", sectionsSchema);

export default Section;
