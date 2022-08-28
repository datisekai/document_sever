import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Exams = new Schema(
  {
    sub_id: {
      type: Schema.Types.ObjectId,
      ref: "subjects",
      required: true,
    },
    term: {
      type: Number,
      required: true,
    },
    year: {
      type: Schema.Types.ObjectId,
      ref: "years",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    urls: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("exams", Exams);
