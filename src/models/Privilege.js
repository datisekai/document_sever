import mongoose, { Schema } from "mongoose";

const Privilege = new mongoose.Schema(
  {
    url_match: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "privilege-group",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("privilege", Privilege);
