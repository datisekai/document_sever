import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comments = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    exam_id: {
      type: Schema.Types.ObjectId,
      ref: "exams",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comments", Comments);
