import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Users = new Schema(
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
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", Users);
