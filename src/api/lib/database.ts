import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  console.log("connectdb");
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
