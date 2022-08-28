import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Sliders = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("sliders", Sliders);
