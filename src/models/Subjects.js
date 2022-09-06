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
    dep_id: {
      type: Schema.Types.ObjectId,
      ref: "departments",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

Subjects.index({ name: "text" });
const SubjectsModels = mongoose.model("Subjects", Subjects);
SubjectsModels.createIndexes({ name: "text" });

export default SubjectsModels;
