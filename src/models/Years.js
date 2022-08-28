import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Years = new Schema(
  {
    name: {
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

export default mongoose.model("years", Years);
