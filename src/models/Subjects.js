import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Subjects = new Schema(
  {
    sub: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    uni_id: {
      type: Schema.Types.ObjectId,
      ref: "university",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("subjects", Subjects);
