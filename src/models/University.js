import mongoose from "mongoose";

const Schema = mongoose.Schema;

const University = new Schema(
  {
    uni: {
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
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("university", University);
