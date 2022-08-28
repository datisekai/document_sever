import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Saves = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
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

export default mongoose.model("saves", Saves);
