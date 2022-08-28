import mongoose from "mongoose";

const Acess = new mongoose.Schema(
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

export default mongoose.model("acess", Acess);
