import mongoose, { Schema } from "mongoose";

const Sliders = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("sliders", Sliders);
