import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Sliders = new Schema(
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
