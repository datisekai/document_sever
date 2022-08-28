import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("ConnectDB success!");
  } catch (error) {
    console.log("ConnectDB failed!");
    process.exit(-1);
  }
};

export default connectDB;
