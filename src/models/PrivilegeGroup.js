import mongoose from "mongoose";

const PrivilegeGroup = new mongoose.Schema(
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
      type: Number,
      required: true,
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
