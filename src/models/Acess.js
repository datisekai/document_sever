import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Access = new Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("access", Access);
