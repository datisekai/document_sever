import mongoose, { Schema } from "mongoose";

const Years = new mongoose.Schema(
  {
    name: {
      type: String,
      ref: "users",
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

export default mongoose.model("years", Years);
