import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Feedback = new Schema(
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

export default mongoose.model("feedbacks", Feedback);
