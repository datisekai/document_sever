import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PrivilegeGroup = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("privilege-group", PrivilegeGroup);
