import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    dep: { type: String, unique: true },
    name: { type: String, required: true },
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

export default mongoose.model("departments", DepartmentSchema);
