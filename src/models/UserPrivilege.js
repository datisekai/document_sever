import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserPrivilege = new Schema(
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
    privilege: {
      type: Schema.Types.ObjectId,
      ref: "privilege",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("userPrivilege", UserPrivilege);
