import mongoose, { Schema } from "mongoose";

const Users = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
    mssv: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", Users);
