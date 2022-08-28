import mongoose, { Schema } from "mongoose";

const Sliders = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("sliders", Sliders);
