import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Views = new Schema(
  {
    count: {
      type: Number,
      default: 0,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("views", Views);
